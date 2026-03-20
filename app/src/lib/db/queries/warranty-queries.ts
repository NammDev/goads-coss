import { eq, and, gte, lte, isNull, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { warrantyClaims, deliveredItems } from "@/lib/db/schema";
import type { InferSelectModel } from "drizzle-orm";

export type WarrantyClaim = InferSelectModel<typeof warrantyClaims>;

export type WarrantyClaimWithItem = WarrantyClaim & {
  itemUid: string | null;
  itemProductType: string;
  orderId: string;
};

/** Get all warranty claims for a customer (portal) */
export async function getWarrantyClaimsByCustomerId(
  customerId: string,
): Promise<WarrantyClaimWithItem[]> {
  const rows = await db
    .select({
      claim: warrantyClaims,
      itemUid: deliveredItems.uid,
      itemProductType: deliveredItems.productType,
      orderId: deliveredItems.orderId,
    })
    .from(warrantyClaims)
    .innerJoin(deliveredItems, eq(warrantyClaims.deliveredItemId, deliveredItems.id))
    .where(eq(warrantyClaims.customerId, customerId));

  return rows.map((r) => ({
    ...r.claim,
    itemUid: r.itemUid,
    itemProductType: r.itemProductType,
    orderId: r.orderId,
  }));
}

/** Check if a claim already exists for a delivered item */
export async function getWarrantyClaimByDeliveredItemId(
  deliveredItemId: string,
): Promise<WarrantyClaim | null> {
  const [row] = await db
    .select()
    .from(warrantyClaims)
    .where(eq(warrantyClaims.deliveredItemId, deliveredItemId))
    .limit(1);
  return row ?? null;
}

/** Get all warranty claims for an order (admin order detail) */
export async function getWarrantyClaimsByOrderId(
  orderId: string,
): Promise<WarrantyClaimWithItem[]> {
  const rows = await db
    .select({
      claim: warrantyClaims,
      itemUid: deliveredItems.uid,
      itemProductType: deliveredItems.productType,
      orderId: deliveredItems.orderId,
    })
    .from(warrantyClaims)
    .innerJoin(deliveredItems, eq(warrantyClaims.deliveredItemId, deliveredItems.id))
    .where(eq(deliveredItems.orderId, orderId));

  return rows.map((r) => ({
    ...r.claim,
    itemUid: r.itemUid,
    itemProductType: r.itemProductType,
    orderId: r.orderId,
  }));
}

/** Get all warranty claims with optional status filter (admin list) */
export async function getAllWarrantyClaims(
  filters?: { status?: string },
): Promise<WarrantyClaimWithItem[]> {
  const rows = await db
    .select({
      claim: warrantyClaims,
      itemUid: deliveredItems.uid,
      itemProductType: deliveredItems.productType,
      orderId: deliveredItems.orderId,
    })
    .from(warrantyClaims)
    .innerJoin(deliveredItems, eq(warrantyClaims.deliveredItemId, deliveredItems.id))
    .where(
      filters?.status
        ? eq(
            warrantyClaims.status,
            filters.status as "pending" | "approved" | "rejected" | "replaced",
          )
        : undefined,
    );

  return rows.map((r) => ({
    ...r.claim,
    itemUid: r.itemUid,
    itemProductType: r.itemProductType,
    orderId: r.orderId,
  }));
}

/** Get delivered items with warranty expiring within N days and no existing claim (cron) */
export async function getItemsWithExpiringWarranty(
  daysBeforeExpiry: number,
): Promise<InferSelectModel<typeof deliveredItems>[]> {
  const now = new Date();
  const future = new Date(now.getTime() + daysBeforeExpiry * 24 * 60 * 60 * 1000);

  const claimedItemIds = db
    .select({ id: warrantyClaims.deliveredItemId })
    .from(warrantyClaims);

  return db
    .select()
    .from(deliveredItems)
    .where(
      and(
        gte(deliveredItems.warrantyUntil, now),
        lte(deliveredItems.warrantyUntil, future),
        sql`${deliveredItems.id} NOT IN (${claimedItemIds})`,
      ),
    );
}
