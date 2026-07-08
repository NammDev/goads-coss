import { eq, and, sql, getTableColumns, desc } from "drizzle-orm";
import { db } from "@/lib/db";
import { deliveredItems, orders, orderItems, products } from "@/lib/db/schema";
import type { InferSelectModel } from "drizzle-orm";
import type { ProductType } from "./product-queries";
import { dateRangeWhere, type DateRangeParams } from "./date-range-utils";
import { decrypt } from "@/lib/db/encryption";

type DeliveredItem = InferSelectModel<typeof deliveredItems>;

/**
 * Portal-facing delivered item row: credentials DECRYPTED to an object, product
 * name resolved via JOIN, and `note`/`checkLive` lifted out of the credentials
 * JSON (they are stored there — no dedicated DB columns). Used by the redesigned
 * BM / Profile / Page tabs.
 */
export type PortalDeliveredRow = {
  id: string;
  orderId: string;
  orderItemId: string | null;
  productType: string;
  productName: string | null;
  uid: string | null;
  credentials: Record<string, string>;
  note: string | null;
  customerNote: string | null;
  checkLive: string | null;
  status: string;
  warrantyUntil: Date | null;
  deliveredAt: Date;
};

/** Decrypt credentials JSON (falls back to plain JSON for dev / pre-encryption rows) */
function decryptCredentials(raw: string | null): Record<string, string> {
  if (!raw) return {};
  try {
    return JSON.parse(decrypt(raw)) as Record<string, string>;
  } catch {
    try {
      return JSON.parse(raw) as Record<string, string>;
    } catch {
      return {};
    }
  }
}

export type DeliveredItemSummary = {
  id: string;
  orderId: string;
  productType: string;
  uid: string | null;
  status: string;
  warrantyUntil: Date | null;
  deliveredAt: Date;
};

/** Get all delivered items for export (excludes credentials) */
export async function getAllDeliveredItems(dateRange?: DateRangeParams): Promise<DeliveredItemSummary[]> {
  const dateFilter = dateRange ? dateRangeWhere(deliveredItems.deliveredAt, dateRange) : undefined;

  return db
    .select({
      id: deliveredItems.id,
      orderId: deliveredItems.orderId,
      productType: deliveredItems.productType,
      uid: deliveredItems.uid,
      status: deliveredItems.status,
      warrantyUntil: deliveredItems.warrantyUntil,
      deliveredAt: deliveredItems.deliveredAt,
    })
    .from(deliveredItems)
    .where(dateFilter)
    .orderBy(desc(deliveredItems.deliveredAt));
}

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

/**
 * Portal delivered-item rows (fully shaped: product name resolved, credentials
 * decrypted, note/checkLive extracted). One JOIN query; optional productType.
 */
async function queryDeliveredDetailed(
  customerId: string,
  type?: ProductType,
): Promise<PortalDeliveredRow[]> {
  const whereClause = type
    ? and(eq(orders.customerId, customerId), eq(deliveredItems.productType, type))
    : eq(orders.customerId, customerId);

  const rows = await db
    .select({
      id: deliveredItems.id,
      orderId: deliveredItems.orderId,
      orderItemId: deliveredItems.orderItemId,
      productType: deliveredItems.productType,
      uid: deliveredItems.uid,
      credentials: deliveredItems.credentials,
      customerNote: deliveredItems.customerNote,
      status: deliveredItems.status,
      warrantyUntil: deliveredItems.warrantyUntil,
      deliveredAt: deliveredItems.deliveredAt,
      productName: products.name,
    })
    .from(deliveredItems)
    .innerJoin(orders, eq(deliveredItems.orderId, orders.id))
    .leftJoin(orderItems, eq(deliveredItems.orderItemId, orderItems.id))
    .leftJoin(products, eq(orderItems.productId, products.id))
    .where(whereClause)
    .orderBy(desc(deliveredItems.deliveredAt));

  return rows.map((r) => {
    const credentials = decryptCredentials(r.credentials);
    return {
      id: r.id,
      orderId: r.orderId,
      orderItemId: r.orderItemId,
      productType: r.productType,
      productName: r.productName ?? null,
      uid: r.uid,
      credentials,
      note: credentials.note ?? null,
      customerNote: r.customerNote ?? null,
      checkLive: credentials.checkLive ?? null,
      status: r.status,
      warrantyUntil: r.warrantyUntil,
      deliveredAt: r.deliveredAt,
    };
  });
}

/** Delivered items for one product type (detailed). */
export function getDeliveredItemsByTypeDetailed(customerId: string, type: ProductType) {
  return queryDeliveredDetailed(customerId, type);
}

/** ALL delivered items for a customer (detailed) — powers instant client tabs. */
export function getAllDeliveredItemsDetailedByCustomerId(customerId: string) {
  return queryDeliveredDetailed(customerId);
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

/** Product health overview — count items by status */
export type ProductHealthOverview = {
  status: string;
  count: number;
};

export async function getProductHealthOverview(): Promise<ProductHealthOverview[]> {
  return db
    .select({
      status: deliveredItems.status,
      count: sql<number>`count(*)::int`,
    })
    .from(deliveredItems)
    .groupBy(deliveredItems.status)
    .orderBy(deliveredItems.status);
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
