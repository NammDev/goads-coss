import { eq, and, lt, desc } from "drizzle-orm";
import { db } from "@/lib/db";
import { topupRequests } from "@/lib/db/schema";
import type { InferSelectModel } from "drizzle-orm";

export type TopupRequest = InferSelectModel<typeof topupRequests>;

/** Get a topup request by its primary key */
export async function getTopupRequestById(
  id: string,
): Promise<TopupRequest | null> {
  const [row] = await db
    .select()
    .from(topupRequests)
    .where(eq(topupRequests.id, id))
    .limit(1);
  return row ?? null;
}

/** Get a topup request by its unique reference (used for webhook lookup) */
export async function getTopupRequestByReference(
  reference: string,
): Promise<TopupRequest | null> {
  const [row] = await db
    .select()
    .from(topupRequests)
    .where(eq(topupRequests.reference, reference))
    .limit(1);
  return row ?? null;
}

/** Get a topup request by the gateway's payment ID (used for webhook lookup) */
export async function getTopupRequestByGatewayId(
  gatewayPaymentId: string,
): Promise<TopupRequest | null> {
  const [row] = await db
    .select()
    .from(topupRequests)
    .where(eq(topupRequests.gatewayPaymentId, gatewayPaymentId))
    .limit(1);
  return row ?? null;
}

/**
 * Find pending topup requests whose expiresAt is in the past.
 * Used by the cron job to batch-expire stale rows.
 */
export async function findExpiredPendingTopups(
  asOf: Date,
  limit: number,
): Promise<TopupRequest[]> {
  return db
    .select()
    .from(topupRequests)
    .where(
      and(
        eq(topupRequests.status, "pending"),
        lt(topupRequests.expiresAt, asOf),
      ),
    )
    .orderBy(desc(topupRequests.expiresAt))
    .limit(limit);
}

/** Get recent topup requests for a customer (for display in wallet page) */
export async function getTopupRequestsByCustomerId(
  customerId: string,
  limit = 10,
): Promise<TopupRequest[]> {
  return db
    .select()
    .from(topupRequests)
    .where(eq(topupRequests.customerId, customerId))
    .orderBy(desc(topupRequests.createdAt))
    .limit(limit);
}
