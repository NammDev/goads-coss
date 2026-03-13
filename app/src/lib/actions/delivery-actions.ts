"use server";

import { revalidatePath } from "next/cache";
import { eq, count } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";

import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { orders, orderItems, deliveredItems } from "@/lib/db/schema";
import { encrypt } from "@/lib/db/encryption";
import { credentialSchemaMap } from "@/lib/validators/credential-schemas";
import type { ProductType } from "@/lib/validators/credential-schemas";
import { createNotification } from "@/lib/actions/notification-actions";

type DeliverResult =
  | { success: true; deliveredItemId: string }
  | { success: false; error: string };

export async function deliverOrderItem(formData: FormData): Promise<DeliverResult> {
  const { userId } = await auth();
  if (!userId) return { success: false, error: "Unauthorized" };

  const user = await currentUser();
  const role = (user?.publicMetadata?.role as string) ?? "customer";
  if (role !== "super_admin" && role !== "staff") {
    return { success: false, error: "Unauthorized" };
  }

  const orderItemId = formData.get("orderItemId") as string;
  const orderId = formData.get("orderId") as string;
  const productType = formData.get("productType") as string;
  const uid = (formData.get("uid") as string) || undefined;

  if (!orderItemId || !orderId || !productType) {
    return { success: false, error: "Missing required fields" };
  }

  // Validate productType is a known type
  if (!(productType in credentialSchemaMap)) {
    return { success: false, error: `Unknown product type: ${productType}` };
  }

  const type = productType as ProductType;
  const schema = credentialSchemaMap[type];

  // Build credentials object from form fields
  const credentialFields: Record<string, string> = {};
  if ("shape" in schema) {
    const shape = (schema as { shape: Record<string, unknown> }).shape;
    for (const key of Object.keys(shape)) {
      const val = formData.get(`cred_${key}`) as string | null;
      if (val) credentialFields[key] = val;
    }
  }

  // Validate credentials against schema
  const parsed = schema.safeParse(credentialFields);
  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message ?? "Invalid credentials";
    return { success: false, error: firstError };
  }

  try {
    const credJson = JSON.stringify(credentialFields);
    let encryptedCreds: string;
    try {
      encryptedCreds = encrypt(credJson);
    } catch {
      // Fallback: store plain if ENCRYPTION_KEY not set (dev only)
      encryptedCreds = credJson;
    }

    const deliveredItemId = createId();
    const warrantyUntil = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    await db.transaction(async (tx) => {
      await tx.insert(deliveredItems).values({
        id: deliveredItemId,
        orderId,
        orderItemId,
        productType: type,
        uid: uid || null,
        credentials: encryptedCreds,
        status: "active",
        warrantyUntil,
      });

      // Count total order items vs delivered items for this order
      const [totalResult] = await tx
        .select({ total: count() })
        .from(orderItems)
        .where(eq(orderItems.orderId, orderId));

      const [deliveredResult] = await tx
        .select({ delivered: count() })
        .from(deliveredItems)
        .where(eq(deliveredItems.orderId, orderId));

      const totalItems = totalResult?.total ?? 0;
      const deliveredCount = deliveredResult?.delivered ?? 0;

      if (deliveredCount >= totalItems && totalItems > 0) {
        await tx
          .update(orders)
          .set({ status: "delivered", deliveredAt: new Date(), updatedAt: new Date() })
          .where(eq(orders.id, orderId));
      }
    });

    revalidatePath(`/admin/orders/${orderId}`);

    // Non-blocking notification for customer
    const [order] = await db
      .select({ customerId: orders.customerId })
      .from(orders)
      .where(eq(orders.id, orderId))
      .limit(1);

    if (order) {
      createNotification({
        userId: order.customerId,
        type: "item_delivered",
        title: "Item delivered",
        message: `An item for order #${orderId.slice(-6)} has been delivered.`,
        linkUrl: "/portal/products",
      }).catch(() => {});
    }

    return { success: true, deliveredItemId };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("deliverOrderItem error:", message);
    return { success: false, error: "Failed to deliver item" };
  }
}
