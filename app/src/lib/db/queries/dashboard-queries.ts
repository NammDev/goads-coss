import { eq, count, sum, inArray } from "drizzle-orm";
import { db } from "@/lib/db";
import { orders, users, products, deliveredItems } from "@/lib/db/schema";

export type AdminStats = {
  totalOrders: number;
  totalRevenue: string;
  totalCustomers: number;
  totalProducts: number;
  pendingOrders: number;
  activeDeliveredItems: number;
};

export type PortalStats = {
  totalOrders: number;
  totalSpent: string;
  activeItems: number;
  pendingOrders: number;
};

/** Aggregate stats for the admin dashboard */
export async function getAdminStats(): Promise<AdminStats> {
  const [orderTotals, customerCount, productCount, pendingCount, activeItems] =
    await Promise.all([
      db
        .select({ totalOrders: count(), totalRevenue: sum(orders.totalAmount) })
        .from(orders),
      db
        .select({ totalCustomers: count() })
        .from(users)
        .where(eq(users.role, "customer")),
      db.select({ totalProducts: count() }).from(products),
      db
        .select({ pendingOrders: count() })
        .from(orders)
        .where(eq(orders.status, "pending")),
      db
        .select({ activeDeliveredItems: count() })
        .from(deliveredItems)
        .where(eq(deliveredItems.status, "active")),
    ]);

  return {
    totalOrders: orderTotals[0]?.totalOrders ?? 0,
    totalRevenue: orderTotals[0]?.totalRevenue ?? "0",
    totalCustomers: customerCount[0]?.totalCustomers ?? 0,
    totalProducts: productCount[0]?.totalProducts ?? 0,
    pendingOrders: pendingCount[0]?.pendingOrders ?? 0,
    activeDeliveredItems: activeItems[0]?.activeDeliveredItems ?? 0,
  };
}

/** Aggregate stats for a customer's portal dashboard */
export async function getPortalStats(customerId: string): Promise<PortalStats> {
  const customerOrders = await db
    .select({ id: orders.id })
    .from(orders)
    .where(eq(orders.customerId, customerId));

  const orderIds = customerOrders.map((o) => o.id);

  const [orderTotals, pendingCount] = await Promise.all([
    db
      .select({ totalOrders: count(), totalSpent: sum(orders.totalAmount) })
      .from(orders)
      .where(eq(orders.customerId, customerId)),
    db
      .select({ pendingOrders: count() })
      .from(orders)
      .where(eq(orders.customerId, customerId)),
  ]);

  let activeItems = 0;
  if (orderIds.length > 0) {
    const [activeCount] = await db
      .select({ activeItems: count() })
      .from(deliveredItems)
      .where(
        inArray(deliveredItems.orderId, orderIds),
      );
    activeItems = activeCount?.activeItems ?? 0;
  }

  return {
    totalOrders: orderTotals[0]?.totalOrders ?? 0,
    totalSpent: orderTotals[0]?.totalSpent ?? "0",
    activeItems,
    pendingOrders: pendingCount[0]?.pendingOrders ?? 0,
  };
}
