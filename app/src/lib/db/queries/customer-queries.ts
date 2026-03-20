import { eq, inArray, count, sum, and } from "drizzle-orm";
import { db } from "@/lib/db";
import { users, orders } from "@/lib/db/schema";
import type { InferSelectModel } from "drizzle-orm";
import { dateRangeWhere, type DateRangeParams } from "./date-range-utils";

export type User = InferSelectModel<typeof users>;
type Order = InferSelectModel<typeof orders>;

export type CustomerWithStats = User & {
  orderCount: number;
  totalSpent: string;
};

export type CustomerDetail = User & { orders: Order[] };

/** Get all users with role='customer', including order count and total spent */
export async function getAllCustomers(dateRange?: DateRangeParams): Promise<CustomerWithStats[]> {
  const dateFilter = dateRange ? dateRangeWhere(users.createdAt, dateRange) : undefined;
  const whereClause = dateFilter
    ? and(eq(users.role, "customer"), dateFilter)
    : eq(users.role, "customer");

  const customers = await db
    .select()
    .from(users)
    .where(whereClause);

  if (customers.length === 0) return [];

  const customerIds = customers.map((c) => c.id);

  const stats = await db
    .select({
      customerId: orders.customerId,
      orderCount: count(),
      totalSpent: sum(orders.totalAmount),
    })
    .from(orders)
    .where(inArray(orders.customerId, customerIds))
    .groupBy(orders.customerId);

  const statsMap = new Map(stats.map((s) => [s.customerId, s]));

  return customers.map((c) => {
    const s = statsMap.get(c.id);
    return {
      ...c,
      orderCount: s?.orderCount ?? 0,
      totalSpent: s?.totalSpent ?? "0",
    };
  });
}

/** Get a single customer with their orders */
export async function getCustomerById(
  id: string,
): Promise<CustomerDetail | null> {
  const customerRows = await db
    .select()
    .from(users)
    .where(eq(users.id, id));

  if (!customerRows[0]) return null;

  const customerOrders = await db
    .select()
    .from(orders)
    .where(eq(orders.customerId, id));

  return { ...customerRows[0], orders: customerOrders };
}

/** Get staff members (role = staff or super_admin) */
export async function getStaffMembers(): Promise<User[]> {
  return db
    .select()
    .from(users)
    .where(inArray(users.role, ["staff", "super_admin"]));
}
