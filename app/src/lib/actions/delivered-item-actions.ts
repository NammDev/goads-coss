"use server";

import { revalidatePath } from "next/cache";
import { eq, and } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";

import { db } from "@/lib/db";
import { deliveredItems, orders } from "@/lib/db/schema";

type ActionResult = { success: true } | { success: false; error: string };

const MAX_CUSTOMER_NOTE = 2000;

/**
 * Customer: save/update their own free-text note on a delivered item.
 * Ownership is enforced by joining through orders — a customer can only edit
 * notes on items belonging to their own orders.
 */
export async function updateCustomerNote(
  deliveredItemId: string,
  note: string,
): Promise<ActionResult> {
  const { userId } = await auth();
  if (!userId) return { success: false, error: "Unauthorized" };

  const trimmed = note.trim().slice(0, MAX_CUSTOMER_NOTE);

  try {
    // Verify the item belongs to this customer (join through orders)
    const [item] = await db
      .select({ id: deliveredItems.id, orderId: deliveredItems.orderId })
      .from(deliveredItems)
      .innerJoin(orders, eq(deliveredItems.orderId, orders.id))
      .where(
        and(
          eq(deliveredItems.id, deliveredItemId),
          eq(orders.customerId, userId),
        ),
      )
      .limit(1);

    if (!item) {
      return { success: false, error: "Item not found or access denied" };
    }

    await db
      .update(deliveredItems)
      .set({ customerNote: trimmed || null, updatedAt: new Date() })
      .where(eq(deliveredItems.id, deliveredItemId));

    revalidatePath("/portal/products");

    return { success: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("updateCustomerNote error:", message);
    return { success: false, error: "Failed to save note" };
  }
}
