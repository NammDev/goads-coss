import { NextRequest, NextResponse } from "next/server";
import { eq, sql } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";

import { db } from "@/lib/db";
import { topupRequests, walletTransactions, users } from "@/lib/db/schema";
import { verifyWiseWebhookSignature } from "@/lib/integrations/wise/signature";
import {
  getTopupRequestByGatewayId,
  getTopupRequestByReference,
} from "@/lib/db/queries/topup-queries";
import { createNotification } from "@/lib/actions/notification-actions";
import type { WiseWebhookEvent } from "@/lib/integrations/wise/types";

// Only POST is accepted
export async function GET() {
  return NextResponse.json({ error: "method_not_allowed" }, { status: 405 });
}

export async function POST(req: NextRequest) {
  // 1. Read raw body BEFORE JSON.parse so HMAC is over unmodified bytes
  const rawBody = await req.text();

  // 2. Verify signature
  const signatureHeader = req.headers.get("x-wise-signature");
  const secret = process.env.WISE_WEBHOOK_SECRET ?? "";

  if (!verifyWiseWebhookSignature(rawBody, signatureHeader, secret)) {
    console.warn("[wise-webhook] invalid signature");
    return NextResponse.json({ error: "invalid_signature" }, { status: 401 });
  }

  // 3. Parse JSON
  let event: WiseWebhookEvent;
  try {
    event = JSON.parse(rawBody) as WiseWebhookEvent;
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  // 4. Look up topup_request by gatewayPaymentId or reference
  const data = event.data;
  const topup =
    (await getTopupRequestByGatewayId(data.gatewayPaymentId)) ??
    (await getTopupRequestByReference(data.reference));

  if (!topup) {
    console.warn("[wise-webhook] unknown reference:", data.reference);
    return NextResponse.json({ error: "unknown_reference" }, { status: 404 });
  }

  // 5. Branch on event type
  if (event.type === "payment.completed") {
    // Idempotent replay
    if (topup.status === "completed") {
      return NextResponse.json({ ok: true, replay: true });
    }

    // Non-pending rows cannot be credited
    if (topup.status !== "pending") {
      return NextResponse.json({ error: "invalid_state" }, { status: 422 });
    }

    // Amount mismatch guard
    const reportedAmount = event.data.amount;
    const storedAmount = parseFloat(topup.amount);
    if (Math.abs(reportedAmount - storedAmount) > 0.001) {
      await db
        .update(topupRequests)
        .set({
          status: "failed",
          failureReason: `Amount mismatch: expected ${storedAmount}, got ${reportedAmount}`,
          updatedAt: new Date(),
        })
        .where(eq(topupRequests.id, topup.id));
      return NextResponse.json({ error: "amount_mismatch" }, { status: 422 });
    }

    // Credit the wallet in a transaction with row-level locks
    try {
      await db.transaction(async (tx) => {
        // Set lock timeout to avoid hanging — Wise will retry on 503
        await tx.execute(sql`SET LOCAL lock_timeout = '3s'`);

        // Lock topup_request row to prevent concurrent credits
        const [lockedTopup] = await tx
          .select({ id: topupRequests.id, status: topupRequests.status, customerId: topupRequests.customerId, amount: topupRequests.amount })
          .from(topupRequests)
          .where(eq(topupRequests.id, topup.id))
          .for("update");

        if (!lockedTopup || lockedTopup.status !== "pending") {
          // Already processed by a concurrent webhook delivery
          return;
        }

        // Lock user row
        const rows = await tx.execute(
          sql`SELECT balance FROM "user" WHERE id = ${lockedTopup.customerId} FOR UPDATE`,
        );
        const customerRow = (rows as unknown as { balance: string }[])[0];
        if (!customerRow) throw new Error("CUSTOMER_NOT_FOUND");

        const currentBalance = parseFloat(customerRow.balance ?? "0");
        const topupAmount = parseFloat(lockedTopup.amount);
        const newBalance = (currentBalance + topupAmount).toFixed(2);

        // Update user balance
        await tx
          .update(users)
          .set({ balance: newBalance })
          .where(eq(users.id, lockedTopup.customerId));

        // Insert wallet transaction
        await tx.insert(walletTransactions).values({
          id: createId(),
          customerId: lockedTopup.customerId,
          type: "topup",
          amount: lockedTopup.amount,
          balanceAfter: newBalance,
          topupRequestId: lockedTopup.id,
          note: `Wise top-up ref:${topup.reference}`,
          createdBy: lockedTopup.customerId,
        });

        // Mark topup as completed
        await tx
          .update(topupRequests)
          .set({ status: "completed", completedAt: new Date(), updatedAt: new Date() })
          .where(eq(topupRequests.id, lockedTopup.id));
      });

      // Non-blocking notification
      createNotification({
        userId: topup.customerId,
        type: "balance_topup",
        title: "Wallet topped up",
        message: `$${topup.amount} has been added to your wallet.`,
        linkUrl: "/portal/wallet",
      }).catch(() => {});

      return NextResponse.json({ ok: true });
    } catch (err) {
      const message = err instanceof Error ? err.message : "unknown";

      // Lock timeout — tell Wise to retry
      if (message.includes("lock_timeout") || message.includes("55P03")) {
        console.warn("[wise-webhook] lock timeout, returning 503 for retry");
        return NextResponse.json({ error: "retry" }, { status: 503 });
      }

      console.error("[wise-webhook] transaction error:", message);
      return NextResponse.json({ error: "retry" }, { status: 503 });
    }
  }

  if (event.type === "payment.failed") {
    if (topup.status === "pending") {
      await db
        .update(topupRequests)
        .set({
          status: "failed",
          failureReason: event.data.reason,
          updatedAt: new Date(),
        })
        .where(eq(topupRequests.id, topup.id));
    }
    return NextResponse.json({ ok: true });
  }

  if (event.type === "payment.expired") {
    if (topup.status === "pending") {
      await db
        .update(topupRequests)
        .set({ status: "expired", updatedAt: new Date() })
        .where(eq(topupRequests.id, topup.id));
    }
    return NextResponse.json({ ok: true });
  }

  // Unknown event type — log and acknowledge so Wise doesn't retry
  console.info("[wise-webhook] unknown event type:", (event as { type: string }).type);
  return NextResponse.json({ ok: true, ignored: true });
}
