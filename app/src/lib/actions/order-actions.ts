"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { eq, sql, inArray } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";

import { auth } from "@/lib/auth/auth";
import { db } from "@/lib/db";
import { users, orders, orderItems, walletTransactions, customerPrices, products } from "@/lib/db/schema";
import { createOrderSchema } from "@/lib/validators/order-schemas";

type CreateOrderResult =
  | { success: true; orderId: string }
  | { success: false; error: string };

export async function createOrder(formData: FormData): Promise<CreateOrderResult> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (
    !session ||
    (session.user.role !== "super_admin" && session.user.role !== "staff")
  ) {
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
  const adminId = session.user.id;

  try {
    const orderId = await db.transaction(async (tx) => {
      // Lock user row and get balance
      const rows = await tx.execute(
        sql`SELECT balance FROM "user" WHERE id = ${customerId} FOR UPDATE`
      );
      const customerRow = (rows as unknown as { balance: string }[])[0];
      if (!customerRow) throw new Error("Customer not found");

      const productIds = items.map((i) => i.productId);

      // Fetch all products in one query
      const productRows = await tx
        .select()
        .from(products)
        .where(inArray(products.id, productIds));

      const productMap = new Map(productRows.map((p) => [p.id, p]));

      // Fetch customer-specific prices
      const priceRows = await tx
        .select()
        .from(customerPrices)
        .where(
          sql`${customerPrices.customerId} = ${customerId} AND ${customerPrices.productId} = ANY(${productIds})`
        );
      const priceMap = new Map(priceRows.map((p) => [p.productId, p.price]));

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
    return { success: false, error: "Failed to create order" };
  }
}
