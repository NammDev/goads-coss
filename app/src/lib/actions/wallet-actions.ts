"use server";

import { revalidatePath } from "next/cache";
import { eq, sql } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";

import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { users, walletTransactions } from "@/lib/db/schema";
import { topupSchema } from "@/lib/validators/wallet-schemas";
import { createNotification } from "@/lib/actions/notification-actions";
import { ensureCurrentUserSynced } from "@/lib/auth/ensure-current-user-synced";

type TopupResult =
  | { success: true; newBalance: string }
  | { success: false; error: string };

export async function topupBalance(formData: FormData): Promise<TopupResult> {
  // Role guard
  const { userId } = await auth();
  if (!userId) return { success: false, error: "Unauthorized" };

  const user = await currentUser();
  const role = (user?.publicMetadata?.role as string) ?? "customer";
  if (role !== "super_admin" && role !== "staff") {
    return { success: false, error: "Unauthorized" };
  }

  // Validate input
  const raw = {
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    note: formData.get("note") || undefined,
  };

  const parsed = topupSchema.safeParse(raw);
  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message ?? "Validation failed";
    return { success: false, error: firstError };
  }

  const { customerId, amount, note } = parsed.data;
  const adminId = userId;

  // Ensure the acting admin exists in the `user` table before it is referenced
  // by wallet_transaction.createdBy (Clerk→DB webhook may not have synced them,
  // e.g. in local dev). Prevents a 23503 foreign_key_violation.
  await ensureCurrentUserSynced();

  try {
    const newBalance = await db.transaction(async (tx) => {
      // Lock the user row to prevent concurrent topup race conditions
      const rows = await tx.execute(
        sql`SELECT balance FROM "user" WHERE id = ${customerId} FOR UPDATE`
      );

      const currentRow = (rows as unknown as { balance: string }[])[0];
      if (!currentRow) throw new Error("Customer not found");

      const currentBalance = parseFloat(currentRow.balance ?? "0");
      const updated = parseFloat((currentBalance + amount).toFixed(2));
      const updatedStr = updated.toFixed(2);

      await tx
        .update(users)
        .set({ balance: updatedStr })
        .where(eq(users.id, customerId));

      await tx.insert(walletTransactions).values({
        id: createId(),
        customerId,
        type: "topup",
        amount: amount.toFixed(2),
        balanceAfter: updatedStr,
        note: note ?? null,
        createdBy: adminId,
      });

      return updatedStr;
    });

    revalidatePath(`/admin/customers/${customerId}`);
    revalidatePath("/admin/customers");

    // Non-blocking notification for customer
    createNotification({
      userId: customerId,
      type: "balance_topup",
      title: "Balance topped up",
      message: `$${amount.toFixed(2)} has been added to your wallet.`,
      linkUrl: "/portal/wallet",
    }).catch(() => {});

    return { success: true, newBalance };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";

    // Surface the real root cause in server logs (was fully swallowed before,
    // which made every DB/transaction failure look like the same generic error).
    console.error("[topupBalance] failed:", {
      customerId,
      amount,
      message,
      // Postgres driver attaches a numeric code (e.g. 42703 undefined_column)
      code: (err as { code?: string })?.code,
      detail: (err as { detail?: string })?.detail,
    });

    if (message === "Customer not found") {
      return { success: false, error: "Customer not found" };
    }

    // In dev, bubble the real reason to the UI so it can be diagnosed quickly.
    const isProd = process.env.NODE_ENV === "production";
    return {
      success: false,
      error: isProd ? "Failed to process topup" : `Topup failed: ${message}`,
    };
  }
}
