"use server";

import { revalidatePath } from "next/cache";
import { eq, and } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";
import { auth, currentUser } from "@clerk/nextjs/server";

import { db } from "@/lib/db";
import { deliveredItems, orders, warrantyClaims } from "@/lib/db/schema";
import { getWarrantyClaimByDeliveredItemId } from "@/lib/db/queries/warranty-queries";

type ActionResult = { success: true } | { success: false; error: string };

/** Admin: update a delivered item's health status (active/inactive/banned/expired) */
export async function updateDeliveredItemStatus(
  itemId: string,
  newStatus: "active" | "inactive" | "banned" | "expired",
): Promise<ActionResult> {
  const { userId } = await auth();
  if (!userId) return { success: false, error: "Unauthorized" };

  const user = await currentUser();
  const role = (user?.publicMetadata?.role as string) ?? "customer";
  if (role !== "super_admin" && role !== "staff") {
    return { success: false, error: "Unauthorized" };
  }

  try {
    // Fetch item with order info for customer notification
    const [item] = await db
      .select({
        id: deliveredItems.id,
        orderId: deliveredItems.orderId,
        uid: deliveredItems.uid,
        productType: deliveredItems.productType,
        warrantyUntil: deliveredItems.warrantyUntil,
        status: deliveredItems.status,
      })
      .from(deliveredItems)
      .where(eq(deliveredItems.id, itemId))
      .limit(1);

    if (!item) return { success: false, error: "Item not found" };

    // Update status
    await db
      .update(deliveredItems)
      .set({ status: newStatus, updatedAt: new Date() })
      .where(eq(deliveredItems.id, itemId));

    // Auto-create warranty claim if banned within warranty period
    if (newStatus === "banned" && item.warrantyUntil && item.warrantyUntil > new Date()) {
      const existingClaim = await getWarrantyClaimByDeliveredItemId(itemId);
      if (!existingClaim) {
        // Find the customer who owns this order
        const [order] = await db
          .select({ customerId: orders.customerId })
          .from(orders)
          .where(eq(orders.id, item.orderId))
          .limit(1);

        if (order) {
          await db.insert(warrantyClaims).values({
            id: createId(),
            deliveredItemId: itemId,
            customerId: order.customerId,
            reason: `Auto-claim: Item ${item.uid ?? item.id} detected as banned within warranty period.`,
            status: "pending",
          });
        }
      }
    }

    revalidatePath("/admin/orders");
    revalidatePath("/admin");

    return { success: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("updateDeliveredItemStatus error:", message);
    return { success: false, error: "Failed to update item status" };
  }
}
