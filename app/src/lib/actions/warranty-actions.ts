"use server";

import { revalidatePath } from "next/cache";
import { eq, and } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";
import { auth, currentUser } from "@clerk/nextjs/server";

import { db } from "@/lib/db";
import { warrantyClaims, deliveredItems, orders } from "@/lib/db/schema";
import { getWarrantyClaimByDeliveredItemId } from "@/lib/db/queries/warranty-queries";

type ActionResult = { success: true } | { success: false; error: string };

/** Customer: submit a warranty claim for a delivered item */
export async function submitWarrantyClaim(
  formData: FormData,
): Promise<ActionResult> {
  const { userId } = await auth();
  if (!userId) return { success: false, error: "Unauthorized" };

  const user = await currentUser();
  const role = (user?.publicMetadata?.role as string) ?? "customer";
  if (role !== "customer") {
    return { success: false, error: "Only customers can submit warranty claims" };
  }

  const deliveredItemId = formData.get("deliveredItemId") as string;
  const reason = formData.get("reason") as string;

  if (!deliveredItemId || !reason) {
    return { success: false, error: "Missing required fields" };
  }
  if (reason.trim().length < 10) {
    return { success: false, error: "Reason must be at least 10 characters" };
  }

  try {
    // Verify the item belongs to this customer (join through orders)
    const [item] = await db
      .select({
        id: deliveredItems.id,
        warrantyUntil: deliveredItems.warrantyUntil,
        orderId: deliveredItems.orderId,
      })
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

    // Validate warranty is still active
    if (!item.warrantyUntil || item.warrantyUntil < new Date()) {
      return { success: false, error: "Warranty has expired for this item" };
    }

    // Validate no existing claim
    const existingClaim = await getWarrantyClaimByDeliveredItemId(deliveredItemId);
    if (existingClaim) {
      return { success: false, error: "A warranty claim already exists for this item" };
    }

    await db.insert(warrantyClaims).values({
      id: createId(),
      deliveredItemId,
      customerId: userId,
      reason: reason.trim(),
      status: "pending",
    });

    revalidatePath(`/portal/orders/${item.orderId}`);
    revalidatePath("/portal/orders");
    revalidatePath("/admin/orders");

    return { success: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("submitWarrantyClaim error:", message);
    return { success: false, error: "Failed to submit warranty claim" };
  }
}

/** Admin: update claim status and optional note */
export async function updateWarrantyClaimStatus(
  claimId: string,
  status: "pending" | "approved" | "rejected" | "replaced",
  adminNote?: string,
): Promise<ActionResult> {
  const { userId } = await auth();
  if (!userId) return { success: false, error: "Unauthorized" };

  const user = await currentUser();
  const role = (user?.publicMetadata?.role as string) ?? "customer";
  if (role !== "super_admin" && role !== "staff") {
    return { success: false, error: "Unauthorized" };
  }

  try {
    await db
      .update(warrantyClaims)
      .set({
        status,
        adminNote: adminNote ?? null,
        updatedAt: new Date(),
      })
      .where(eq(warrantyClaims.id, claimId));

    revalidatePath("/admin/orders");

    return { success: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("updateWarrantyClaimStatus error:", message);
    return { success: false, error: "Failed to update claim status" };
  }
}

/** Admin: link a replacement delivered item to a claim */
export async function linkReplacementItem(
  claimId: string,
  replacementItemId: string,
): Promise<ActionResult> {
  const { userId } = await auth();
  if (!userId) return { success: false, error: "Unauthorized" };

  const user = await currentUser();
  const role = (user?.publicMetadata?.role as string) ?? "customer";
  if (role !== "super_admin" && role !== "staff") {
    return { success: false, error: "Unauthorized" };
  }

  try {
    await db
      .update(warrantyClaims)
      .set({
        replacementItemId,
        status: "replaced",
        updatedAt: new Date(),
      })
      .where(eq(warrantyClaims.id, claimId));

    revalidatePath("/admin/orders");

    return { success: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("linkReplacementItem error:", message);
    return { success: false, error: "Failed to link replacement item" };
  }
}
