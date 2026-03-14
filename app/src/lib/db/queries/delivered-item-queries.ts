import { eq, sql, getTableColumns } from "drizzle-orm";
import { db } from "@/lib/db";
import { deliveredItems, orders } from "@/lib/db/schema";
import type { InferSelectModel } from "drizzle-orm";
import type { ProductType } from "./product-queries";

type DeliveredItem = InferSelectModel<typeof deliveredItems>;

/** Get all delivered items for a specific order */
export async function getDeliveredItemsByOrderId(
  orderId: string,
): Promise<DeliveredItem[]> {
  return db
    .select()
    .from(deliveredItems)
    .where(eq(deliveredItems.orderId, orderId));
}

/** Get all delivered items for a customer (single JOIN query, no N+1) */
export async function getDeliveredItemsByCustomerId(
  customerId: string,
): Promise<DeliveredItem[]> {
  return db
    .select(getTableColumns(deliveredItems))
    .from(deliveredItems)
    .innerJoin(orders, eq(deliveredItems.orderId, orders.id))
    .where(eq(orders.customerId, customerId));
}

/** Get delivered items for a customer filtered by product type */
export async function getDeliveredItemsByType(
  customerId: string,
  type: ProductType,
): Promise<DeliveredItem[]> {
  const all = await getDeliveredItemsByCustomerId(customerId);
  return all.filter((item) => item.productType === type);
}

/** Count delivered items per product type for a customer */
export async function getProductCountsByCustomerId(
  customerId: string,
): Promise<Record<string, number>> {
  const rows = await db
    .select({
      productType: deliveredItems.productType,
      count: sql<number>`count(*)::int`,
    })
    .from(deliveredItems)
    .innerJoin(orders, eq(deliveredItems.orderId, orders.id))
    .where(eq(orders.customerId, customerId))
    .groupBy(deliveredItems.productType);

  const counts: Record<string, number> = {};
  for (const row of rows) {
    counts[row.productType] = row.count;
  }
  return counts;
}

/** Count all delivered items per product type (admin) */
export async function getAllProductCounts(): Promise<Record<string, number>> {
  const rows = await db
    .select({
      productType: deliveredItems.productType,
      count: sql<number>`count(*)::int`,
    })
    .from(deliveredItems)
    .groupBy(deliveredItems.productType);

  const counts: Record<string, number> = {};
  for (const row of rows) {
    counts[row.productType] = row.count;
  }
  return counts;
}
