"use server";

import { revalidatePath } from "next/cache";
import { eq, sql, inArray } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";

import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { users, orders, orderItems, walletTransactions, customerPrices, products } from "@/lib/db/schema";
import { createOrderSchema } from "@/lib/validators/order-schemas";

/** Generate a public share token for an order (admin only) */
export async function generateShareToken(orderId: string): Promise<{ success: boolean; token?: string; error?: string }> {
  const { userId } = await auth();
  if (!userId) return { success: false, error: "Unauthorized" };

  const user = await currentUser();
  const role = (user?.publicMetadata?.role as string) ?? "customer";
  if (role !== "super_admin" && role !== "staff") {
    return { success: false, error: "Unauthorized" };
  }

  const token = createId();
  await db.update(orders).set({ shareToken: token }).where(eq(orders.id, orderId));
  revalidatePath(`/admin/orders/${orderId}`);
  return { success: true, token };
}

/** Revoke (remove) the share token for an order (admin only) */
export async function revokeShareToken(orderId: string): Promise<{ success: boolean; error?: string }> {
  const { userId } = await auth();
  if (!userId) return { success: false, error: "Unauthorized" };

  const user = await currentUser();
  const role = (user?.publicMetadata?.role as string) ?? "customer";
  if (role !== "super_admin" && role !== "staff") {
    return { success: false, error: "Unauthorized" };
  }

  await db.update(orders).set({ shareToken: null }).where(eq(orders.id, orderId));
  revalidatePath(`/admin/orders/${orderId}`);
  return { success: true };
}

type CreateOrderResult =
  | { success: true; orderId: string }
  | { success: false; error: string };

export async function createOrder(formData: FormData): Promise<CreateOrderResult> {
  const { userId } = await auth();
  if (!userId) return { success: false, error: "Unauthorized" };

  const user = await currentUser();
  const role = (user?.publicMetadata?.role as string) ?? "customer";
  if (role !== "super_admin" && role !== "staff") {
    return { success: false, error: "Unauthorized" };
  }

  // Parse items JSON from form
  const raw = {
    customerId: formData.get("customerId"),
    items: (() => {
      try {
        return JSON.parse(formData.get("items") as string);
      } catch {
        return [];
      }
    })(),
    notes: formData.get("notes") || undefined,
  };

  const parsed = createOrderSchema.safeParse(raw);
  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message ?? "Validation failed";
    return { success: false, error: firstError };
  }

  const { customerId, items, notes } = parsed.data;
  const adminId = userId;

  try {
    const productIds = items.map((i) => i.productId);

    // Pre-fetch products and customer prices outside the transaction
    const productRows = await db
      .select()
      .from(products)
      .where(inArray(products.id, productIds));

    const productMap = new Map(productRows.map((p) => [p.id, p]));

    // Fetch customer-specific prices (optional — may have no rows)
    let priceMap = new Map<string, string>();
    try {
      const priceRows = await db
        .select()
        .from(customerPrices)
        .where(
          sql`${customerPrices.customerId} = ${customerId} AND ${customerPrices.productId} IN ${productIds}`
        );
      priceMap = new Map(priceRows.map((p) => [p.productId, p.price]));
    } catch {
      // customer_price table issue — use default product prices
    }

    const orderId = await db.transaction(async (tx) => {
      // Lock user row and get balance
      const rows = await tx.execute(
        sql`SELECT balance FROM "user" WHERE id = ${customerId} FOR UPDATE`
      );
      const customerRow = (rows as unknown as { balance: string }[])[0];
      if (!customerRow) throw new Error("Customer not found");

      // Calculate total and build line items
      let total = 0;
      const lineItems: Array<{ productId: string; quantity: number; unitPrice: string }> = [];

      for (const item of items) {
        const product = productMap.get(item.productId);
        if (!product) throw new Error(`Product not found: ${item.productId}`);

        const unitPrice = parseFloat(priceMap.get(item.productId) ?? product.price);
        total += unitPrice * item.quantity;
        lineItems.push({
          productId: item.productId,
          quantity: item.quantity,
          unitPrice: unitPrice.toFixed(2),
        });
      }

      const totalStr = total.toFixed(2);
      const currentBalance = parseFloat(customerRow.balance ?? "0");

      if (currentBalance < total) {
        throw new Error(`Insufficient balance. Required: $${totalStr}, available: $${currentBalance.toFixed(2)}`);
      }

      const newBalance = (currentBalance - total).toFixed(2);

      // Deduct balance
      await tx
        .update(users)
        .set({ balance: newBalance })
        .where(eq(users.id, customerId));

      // Create order
      const newOrderId = createId();
      await tx.insert(orders).values({
        id: newOrderId,
        customerId,
        totalAmount: totalStr,
        status: "paid",
        paymentDate: new Date(),
        notes: notes ?? null,
      });

      // Create order items
      await tx.insert(orderItems).values(
        lineItems.map((li) => ({
          id: createId(),
          orderId: newOrderId,
          productId: li.productId,
          quantity: li.quantity,
          unitPrice: li.unitPrice,
        }))
      );

      // Create wallet deduction transaction
      await tx.insert(walletTransactions).values({
        id: createId(),
        customerId,
        type: "deduct",
        amount: totalStr,
        balanceAfter: newBalance,
        orderId: newOrderId,
        note: notes ?? null,
        createdBy: adminId,
      });

      return newOrderId;
    });

    revalidatePath("/admin/orders");
    revalidatePath(`/admin/customers/${customerId}`);
    return { success: true, orderId };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    if (message === "Customer not found") return { success: false, error: "Customer not found" };
    if (message.startsWith("Insufficient balance")) return { success: false, error: message };
    if (message.startsWith("Product not found")) return { success: false, error: message };
    console.error("[createOrder] unexpected error:", message);
    return { success: false, error: `Failed to create order: ${message}` };
  }
}
