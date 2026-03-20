import { eq, desc, count, sum, sql, and } from "drizzle-orm";
import { db } from "@/lib/db";
import { orders, orderItems, deliveredItems, users } from "@/lib/db/schema";
import { dateRangeWhere, type DateRangeParams } from "./date-range-utils";

export type RevenueByProductType = {
  productType: string;
  itemCount: number;
  revenue: string;
};

export type TopCustomer = {
  id: string;
  name: string;
  email: string;
  orderCount: number;
  totalSpent: string;
};

export type OrderStatusCount = {
  status: string;
  count: number;
};

/** Revenue grouped by product type via delivered items joined to order items */
export async function getRevenueByProductType(dateRange?: DateRangeParams): Promise<RevenueByProductType[]> {
  const dateFilter = dateRange ? dateRangeWhere(deliveredItems.createdAt, dateRange) : undefined;

  const rows = await db
    .select({
      productType: deliveredItems.productType,
      itemCount: count(),
      revenue: sum(sql<number>`${orderItems.unitPrice} * ${orderItems.quantity}`),
    })
    .from(deliveredItems)
    .innerJoin(orderItems, eq(deliveredItems.orderItemId, orderItems.id))
    .where(dateFilter)
    .groupBy(deliveredItems.productType)
    .orderBy(desc(sum(sql<number>`${orderItems.unitPrice} * ${orderItems.quantity}`)));

  return rows.map((r) => ({
    productType: r.productType,
    itemCount: r.itemCount,
    revenue: r.revenue ?? "0",
  }));
}

/** Top N customers by total order spend */
export async function getTopCustomers(limit: number, dateRange?: DateRangeParams): Promise<TopCustomer[]> {
  const dateFilter = dateRange ? dateRangeWhere(orders.createdAt, dateRange) : undefined;

  const rows = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      orderCount: count(),
      totalSpent: sum(orders.totalAmount),
    })
    .from(orders)
    .innerJoin(users, eq(orders.customerId, users.id))
    .where(dateFilter)
    .groupBy(users.id, users.name, users.email)
    .orderBy(desc(sum(orders.totalAmount)))
    .limit(limit);

  return rows.map((r) => ({
    id: r.id,
    name: r.name,
    email: r.email,
    orderCount: r.orderCount,
    totalSpent: r.totalSpent ?? "0",
  }));
}

/** Count of orders per status */
export async function getOrderStatusBreakdown(dateRange?: DateRangeParams): Promise<OrderStatusCount[]> {
  const dateFilter = dateRange ? dateRangeWhere(orders.createdAt, dateRange) : undefined;

  const rows = await db
    .select({
      status: orders.status,
      count: count(),
    })
    .from(orders)
    .where(dateFilter)
    .groupBy(orders.status)
    .orderBy(desc(count()));

  return rows.map((r) => ({
    status: r.status,
    count: r.count,
  }));
}

export type RevenueByMonth = {
  month: string;
  revenue: number;
};

/** Monthly revenue grouped by order creation month, filtered by date range (defaults to last 12 months) */
export async function getRevenueByMonth(dateRange?: DateRangeParams): Promise<RevenueByMonth[]> {
  const dateFilter = dateRange
    ? dateRangeWhere(orders.createdAt, dateRange)
    : sql`${orders.createdAt} >= now() - interval '12 months'`;

  const rows = await db
    .select({
      month: sql<string>`to_char(${orders.createdAt}, 'Mon YYYY')`,
      monthSort: sql<string>`to_char(${orders.createdAt}, 'YYYY-MM')`,
      revenue: sum(orders.totalAmount),
    })
    .from(orders)
    .where(dateFilter)
    .groupBy(
      sql`to_char(${orders.createdAt}, 'Mon YYYY')`,
      sql`to_char(${orders.createdAt}, 'YYYY-MM')`
    )
    .orderBy(sql`to_char(${orders.createdAt}, 'YYYY-MM')`);

  return rows.map((r) => ({
    month: r.month,
    revenue: parseFloat(r.revenue ?? "0"),
  }));
}
