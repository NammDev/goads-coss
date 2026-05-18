"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";

import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { topupRequests, users } from "@/lib/db/schema";
import { topupSchemaForEnv, cancelTopupSchema, getTopupSchema } from "@/lib/validators/topup-schemas";
import { getTopupRequestById } from "@/lib/db/queries/topup-queries";
import { getCustomerBalance } from "@/lib/db/queries/wallet-queries";
import { getWiseClient, WiseGatewayError } from "@/lib/integrations/wise/client";

// ─── Types ────────────────────────────────────────────────────────────────────

export type TopupRequestStatus = "pending" | "completed" | "failed" | "expired" | "cancelled";

export type CreateTopupResult =
  | { success: true; topupRequestId: string; qrCodeData: string; expiresAt: string }
  | {
      success: false;
      code: "FORBIDDEN" | "VALIDATION" | "GATEWAY" | "INTERNAL";
      message: string;
    };

export type CancelTopupResult =
  | { success: true }
  | {
      success: false;
      code: "NOT_FOUND" | "FORBIDDEN" | "INVALID_STATE" | "INTERNAL";
      message: string;
    };

export type GetTopupResult =
  | {
      success: true;
      status: TopupRequestStatus;
      amount: string;
      expiresAt: string;
      completedAt: string | null;
      newBalance?: string;
    }
  | { success: false; code: "NOT_FOUND" | "FORBIDDEN"; message: string };

// ─── Helpers ──────────────────────────────────────────────────────────────────

async function getAuthenticatedCustomer() {
  const { userId } = await auth();
  if (!userId) return null;
  const user = await currentUser();
  const role = (user?.publicMetadata?.role as string) ?? "customer";
  if (role !== "customer") return null;
  return userId;
}

// ─── Actions ──────────────────────────────────────────────────────────────────

/**
 * Create a new topup request and generate a Wise payment QR code.
 * Only callable by authenticated customers.
 */
export async function createTopupRequest(input: {
  amount: number;
}): Promise<CreateTopupResult> {
  const userId = await getAuthenticatedCustomer();
  if (!userId) {
    return { success: false, code: "FORBIDDEN", message: "Only customers can create top-up requests." };
  }

  const schema = topupSchemaForEnv();
  const parsed = schema.safeParse(input);
  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message ?? "Invalid amount";
    return { success: false, code: "VALIDATION", message: firstError };
  }

  const { amount } = parsed.data;
  const expiryMinutes = Number(process.env.TOPUP_EXPIRY_MINUTES ?? 30);
  const expiresAt = new Date(Date.now() + expiryMinutes * 60 * 1000);
  const id = createId();
  const reference = createId();

  // Insert pending row first so a row always exists for any reference Wise sees
  await db.insert(topupRequests).values({
    id,
    customerId: userId,
    amount: amount.toFixed(2),
    currency: "USD",
    status: "pending",
    reference,
    expiresAt,
  });

  // Call Wise gateway outside any DB transaction
  try {
    const wiseClient = getWiseClient();
    const result = await wiseClient.createPayment({
      reference,
      amount,
      currency: "USD",
      expiresAt,
    });

    // Update row with gateway data
    await db
      .update(topupRequests)
      .set({
        gatewayPaymentId: result.gatewayPaymentId,
        paymentUrl: result.paymentUrl,
        qrCodeData: result.qrCodeData,
        updatedAt: new Date(),
      })
      .where(eq(topupRequests.id, id));

    return {
      success: true,
      topupRequestId: id,
      qrCodeData: result.qrCodeData,
      expiresAt: expiresAt.toISOString(),
    };
  } catch (err) {
    const message = err instanceof WiseGatewayError
      ? err.message
      : "Payment gateway error. Please try again.";

    // Mark row as failed so it doesn't linger as pending
    await db
      .update(topupRequests)
      .set({ status: "failed", failureReason: message, updatedAt: new Date() })
      .where(eq(topupRequests.id, id));

    console.error("[createTopupRequest] gateway error:", err);
    return { success: false, code: "GATEWAY", message };
  }
}

/**
 * Cancel a pending topup request.
 * Only the owning customer can cancel, and only while status is "pending".
 */
export async function cancelTopupRequest(input: {
  topupRequestId: string;
}): Promise<CancelTopupResult> {
  const userId = await getAuthenticatedCustomer();
  if (!userId) {
    return { success: false, code: "FORBIDDEN", message: "Unauthorized." };
  }

  const parsed = cancelTopupSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, code: "FORBIDDEN", message: "Invalid request." };
  }

  const row = await getTopupRequestById(parsed.data.topupRequestId);
  if (!row) {
    return { success: false, code: "NOT_FOUND", message: "Topup request not found." };
  }
  if (row.customerId !== userId) {
    return { success: false, code: "FORBIDDEN", message: "You do not own this topup request." };
  }
  if (row.status !== "pending") {
    return {
      success: false,
      code: "INVALID_STATE",
      message: `Cannot cancel a topup request with status "${row.status}".`,
    };
  }

  try {
    await db
      .update(topupRequests)
      .set({ status: "cancelled", updatedAt: new Date() })
      .where(eq(topupRequests.id, row.id));

    // Best-effort gateway cancellation — log on failure, don't surface to user
    if (row.gatewayPaymentId) {
      getWiseClient()
        .cancelPayment(row.gatewayPaymentId)
        .catch((err) => console.warn("[cancelTopupRequest] gateway cancel failed:", err));
    }

    revalidatePath("/portal/wallet");
    return { success: true };
  } catch (err) {
    console.error("[cancelTopupRequest] error:", err);
    return { success: false, code: "INTERNAL", message: "Failed to cancel topup request." };
  }
}

/**
 * Read-only fetch of a topup request status.
 * Only the owning customer can read their own requests.
 * When status is "completed", also returns the customer's current balance.
 */
export async function getTopupRequest(input: {
  topupRequestId: string;
}): Promise<GetTopupResult> {
  const userId = await getAuthenticatedCustomer();
  if (!userId) {
    return { success: false, code: "FORBIDDEN", message: "Unauthorized." };
  }

  const parsed = getTopupSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, code: "FORBIDDEN", message: "Invalid request." };
  }

  const row = await getTopupRequestById(parsed.data.topupRequestId);
  if (!row) {
    return { success: false, code: "NOT_FOUND", message: "Topup request not found." };
  }
  if (row.customerId !== userId) {
    return { success: false, code: "FORBIDDEN", message: "You do not own this topup request." };
  }

  // Check if expired (best-effort local transition — cron handles the authoritative update)
  if (row.status === "pending" && row.expiresAt < new Date()) {
    await db
      .update(topupRequests)
      .set({ status: "expired", updatedAt: new Date() })
      .where(eq(topupRequests.id, row.id))
      .catch(() => {}); // ignore race with cron
    return {
      success: true,
      status: "expired",
      amount: row.amount,
      expiresAt: row.expiresAt.toISOString(),
      completedAt: null,
    };
  }

  let newBalance: string | undefined;
  if (row.status === "completed") {
    const balance = await getCustomerBalance(userId);
    newBalance = balance ?? undefined;
  }

  return {
    success: true,
    status: row.status as TopupRequestStatus,
    amount: row.amount,
    expiresAt: row.expiresAt.toISOString(),
    completedAt: row.completedAt?.toISOString() ?? null,
    newBalance,
  };
}
