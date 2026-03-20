import { eq, desc, count, sum, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { orders, orderItems, deliveredItems, users, products } from "@/lib/db/schema";
import { dateRangeWhere, type DateRangeParams } from "./date-range-utils";
import type { InferSelectModel } from "drizzle-orm";

export type Order = InferSelectModel<typeof orders>;
export type OrderItem = InferSelectModel<typeof orderItems>;
export type DeliveredItem = InferSelectModel<typeof deliveredItems>;

export type OrderWithCustomer = Order & { customerName: string };

export type OrderItemWithProduct = OrderItem & {
  productName: string;
  productType: string;
};

export type OrderDetail = Order & {
  customerName: string;
  items: OrderItemWithProduct[];
  deliveredItems: DeliveredItem[];
};

export type OrderStats = {
  totalOrders: number;
  totalRevenue: string;
  pendingCount: number;
  productCount: number;
};

/** Get all orders with customer name */
export async function getAllOrders(dateRange?: DateRangeParams): Promise<OrderWithCustomer[]> {
  const dateFilter = dateRange ? dateRangeWhere(orders.createdAt, dateRange) : undefined;

  const rows = await db
    .select({
      order: orders,
      customerName: users.name,
    })
    .from(orders)
    .leftJoin(users, eq(orders.customerId, users.id))
    .where(dateFilter)
    .orderBy(desc(orders.createdAt));

  return rows.map((r) => ({
    ...r.order,
    customerName: r.customerName ?? "Unknown",
  }));
}

/** Get orders for a specific customer */
export async function getOrdersByCustomerId(
  customerId: string,
): Promise<Order[]> {
  return db
    .select()
    .from(orders)
    .where(eq(orders.customerId, customerId))
    .orderBy(desc(orders.createdAt));
}

/** Get a single order with items, delivered items, and customer name */
export async function getOrderById(id: string): Promise<OrderDetail | null> {
  const orderRows = await db
    .select({ order: orders, customerName: users.name })
    .from(orders)
    .leftJoin(users, eq(orders.customerId, users.id))
    .where(eq(orders.id, id));

  if (!orderRows[0]) return null;

  const [itemRows, deliveredRows] = await Promise.all([
    db
      .select({ item: orderItems, productName: products.name, productType: products.type })
      .from(orderItems)
      .leftJoin(products, eq(orderItems.productId, products.id))
      .where(eq(orderItems.orderId, id)),
    db.select().from(deliveredItems).where(eq(deliveredItems.orderId, id)),
  ]);

  return {
    ...orderRows[0].order,
    customerName: orderRows[0].customerName ?? "Unknown",
    items: itemRows.map((r) => ({
      ...r.item,
      productName: r.productName ?? "Unknown",
      productType: r.productType ?? "other",
    })),
    deliveredItems: deliveredRows,
  };
}

/** Get the latest N orders with customer name */
export async function getRecentOrders(
  limit: number,
): Promise<OrderWithCustomer[]> {
  const rows = await db
    .select({ order: orders, customerName: users.name })
    .from(orders)
    .leftJoin(users, eq(orders.customerId, users.id))
    .orderBy(desc(orders.createdAt))
    .limit(limit);

  return rows.map((r) => ({
    ...r.order,
    customerName: r.customerName ?? "Unknown",
  }));
}

/** Get order items with product info for given order IDs */
export async function getOrderItemsByOrderIds(
  orderIds: string[],
): Promise<OrderItemWithProduct[]> {
  if (orderIds.length === 0) return [];

  const rows = await db
    .select({ item: orderItems, productName: products.name, productType: products.type })
    .from(orderItems)
    .leftJoin(products, eq(orderItems.productId, products.id))
    .where(
      orderIds.length === 1
        ? eq(orderItems.orderId, orderIds[0])
        : sql`${orderItems.orderId} = ANY(${orderIds})`,
    );

  return rows.map((r) => ({
    ...r.item,
    productName: r.productName ?? "Unknown",
    productType: r.productType ?? "other",
  }));
}

/** Get order items with product info for a customer (via JOIN, no sequential fetch) */
export async function getOrderItemsByCustomerId(
  customerId: string,
): Promise<OrderItemWithProduct[]> {
  const rows = await db
    .select({ item: orderItems, productName: products.name, productType: products.type })
    .from(orderItems)
    .innerJoin(orders, eq(orderItems.orderId, orders.id))
    .innerJoin(products, eq(orderItems.productId, products.id))
    .where(eq(orders.customerId, customerId));

  return rows.map((r) => ({
    ...r.item,
    productName: r.productName ?? "Unknown",
    productType: r.productType ?? "other",
  }));
}

/** Get a single order by share token (public — no auth required) */
export async function getOrderByShareToken(token: string): Promise<OrderDetail | null> {
  const orderRows = await db
    .select({ order: orders, customerName: users.name })
    .from(orders)
    .leftJoin(users, eq(orders.customerId, users.id))
    .where(eq(orders.shareToken, token));

  if (!orderRows[0]) return null;

  const orderId = orderRows[0].order.id;
  const [itemRows, deliveredRows] = await Promise.all([
    db
      .select({ item: orderItems, productName: products.name, productType: products.type })
      .from(orderItems)
      .leftJoin(products, eq(orderItems.productId, products.id))
      .where(eq(orderItems.orderId, orderId)),
    db.select().from(deliveredItems).where(eq(deliveredItems.orderId, orderId)),
  ]);

  return {
    ...orderRows[0].order,
    customerName: orderRows[0].customerName ?? "Unknown",
    items: itemRows.map((r) => ({
      ...r.item,
      productName: r.productName ?? "Unknown",
      productType: r.productType ?? "other",
    })),
    deliveredItems: deliveredRows,
  };
}

/** Get count of pending orders */
export async function getPendingOrderCount(): Promise<number> {
  const [result] = await db
    .select({ count: count() })
    .from(orders)
    .where(eq(orders.status, "pending"));
  return result?.count ?? 0;
}

/** Get aggregate order stats for admin dashboard */
export async function getOrderStats(): Promise<OrderStats> {
  const [totals] = await db
    .select({ totalOrders: count(), totalRevenue: sum(orders.totalAmount) })
    .from(orders);

  const [pending] = await db
    .select({ pendingCount: count() })
    .from(orders)
    .where(eq(orders.status, "pending"));

  const [productCount] = await db.select({ productCount: count() }).from(products);

  return {
    totalOrders: totals?.totalOrders ?? 0,
    totalRevenue: totals?.totalRevenue ?? "0",
    pendingCount: pending?.pendingCount ?? 0,
    productCount: productCount?.productCount ?? 0,
  };
}
