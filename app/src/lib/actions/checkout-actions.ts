"use server";

import { revalidatePath } from "next/cache";
import { eq, inArray, sql } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";

import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import {
  users,
  orders,
  orderItems,
  walletTransactions,
  customerPrices,
  products,
} from "@/lib/db/schema";
import { checkoutCartSchema, type CheckoutCartInput } from "@/lib/validators/checkout-schemas";
import { createNotification } from "@/lib/actions/notification-actions";

export type CheckoutResult =
  | { success: true; orderId: string }
  | {
      success: false;
      code:
        | "UNAUTHENTICATED"
        | "FORBIDDEN"
        | "VALIDATION"
        | "INSUFFICIENT_BALANCE"
        | "PRODUCT_NOT_FOUND"
        | "PRODUCT_INACTIVE"
        | "INTERNAL";
      message: string;
      required?: string;
      available?: string;
    };

/**
 * Customer self-serve checkout action.
 * Atomically validates cart, resolves server-side pricing, checks wallet balance,
 * deducts funds, and creates the order + line items + wallet transaction.
 *
 * Only callable by authenticated users with role = "customer".
 */
export async function checkoutCart(
  input: CheckoutCartInput,
): Promise<CheckoutResult> {
  // --- Auth guard ---
  const { userId } = await auth();
  if (!userId) {
    return { success: false, code: "UNAUTHENTICATED", message: "Please sign in to checkout." };
  }

  const user = await currentUser();
  const role = (user?.publicMetadata?.role as string) ?? "customer";
  if (role !== "customer") {
    return { success: false, code: "FORBIDDEN", message: "Only customers can use self-serve checkout." };
  }

  // --- Zod validation ---
  const parsed = checkoutCartSchema.safeParse(input);
  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message ?? "Invalid cart data";
    return { success: false, code: "VALIDATION", message: firstError };
  }

  const { items } = parsed.data;
  const productIds = items.map((i) => i.productId);

  // --- Pre-fetch products outside transaction ---
  const productRows = await db
    .select()
    .from(products)
    .where(inArray(products.id, productIds));

  const productMap = new Map(productRows.map((p) => [p.id, p]));

  // Validate all products exist and are active
  for (const item of items) {
    const product = productMap.get(item.productId);
    if (!product) {
      return {
        success: false,
        code: "PRODUCT_NOT_FOUND",
        message: `Product not found: ${item.productId}`,
      };
    }
    if (!product.isActive) {
      return {
        success: false,
        code: "PRODUCT_INACTIVE",
        message: `Product is no longer available: ${product.name}`,
      };
    }
  }

  // --- Pre-fetch customer-specific prices ---
  let priceMap = new Map<string, string>();
  try {
    const priceRows = await db
      .select()
      .from(customerPrices)
      .where(
        sql`${customerPrices.customerId} = ${userId} AND ${customerPrices.productId} IN ${productIds}`,
      );
    priceMap = new Map(priceRows.map((p) => [p.productId, p.price]));
  } catch {
    // customer_price table issue — fall back to default prices
  }

  // --- Atomic transaction ---
  try {
    const orderId = await db.transaction(async (tx) => {
      // Lock user row to serialize concurrent checkouts
      const rows = await tx.execute(
        sql`SELECT balance FROM "user" WHERE id = ${userId} FOR UPDATE`,
      );
      const customerRow = (rows as unknown as { balance: string }[])[0];
      if (!customerRow) throw new Error("CUSTOMER_NOT_FOUND");

      // Compute total from server-authoritative prices (client prices are ignored)
      let total = 0;
      const lineItems: Array<{
        productId: string;
        quantity: number;
        unitPrice: string;
      }> = [];

      for (const item of items) {
        const product = productMap.get(item.productId)!;
        const unitPrice = parseFloat(
          priceMap.get(item.productId) ?? product.price,
        );
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
        throw new Error(
          `INSUFFICIENT_BALANCE:${totalStr}:${currentBalance.toFixed(2)}`,
        );
      }

      const newBalance = (currentBalance - total).toFixed(2);

      // Deduct balance
      await tx
        .update(users)
        .set({ balance: newBalance })
        .where(eq(users.id, userId));

      // Create order
      const newOrderId = createId();
      await tx.insert(orders).values({
        id: newOrderId,
        customerId: userId,
        totalAmount: totalStr,
        status: "paid",
        paymentDate: new Date(),
      });

      // Create order items
      await tx.insert(orderItems).values(
        lineItems.map((li) => ({
          id: createId(),
          orderId: newOrderId,
          productId: li.productId,
          quantity: li.quantity,
          unitPrice: li.unitPrice,
        })),
      );

      // Create wallet deduction transaction
      await tx.insert(walletTransactions).values({
        id: createId(),
        customerId: userId,
        type: "deduct",
        amount: totalStr,
        balanceAfter: newBalance,
        orderId: newOrderId,
        createdBy: userId,
      });

      return newOrderId;
    });

    revalidatePath("/portal/orders");
    revalidatePath("/portal/wallet");

    // Non-blocking notification — failure must not roll back the order
    createNotification({
      userId,
      type: "order_created",
      title: "Order placed",
      message: `Your order #${orderId.slice(-6)} has been placed and paid.`,
      linkUrl: `/portal/orders/${orderId}`,
    }).catch(() => {});

    return { success: true, orderId };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";

    if (message.startsWith("INSUFFICIENT_BALANCE:")) {
      const [, required, available] = message.split(":");
      return {
        success: false,
        code: "INSUFFICIENT_BALANCE",
        message: `Insufficient balance. Required: $${required}, available: $${available}`,
        required,
        available,
      };
    }

    if (message === "CUSTOMER_NOT_FOUND") {
      return { success: false, code: "INTERNAL", message: "Customer account not found." };
    }

    console.error("[checkoutCart] unexpected error:", message);
    return { success: false, code: "INTERNAL", message: "Checkout failed. Please try again." };
  }
}
