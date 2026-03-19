"use server";

import { randomBytes } from "crypto";
import { createId } from "@paralleldrive/cuid2";
import { eq, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";

import { db } from "@/lib/db";
import { extensionToken } from "@/lib/db/schema";

type ActionResult<T = unknown> =
  | { success: true; data: T }
  | { success: false; error: string };

/** Get current user's active token status */
export async function getExtensionTokenStatus(): Promise<
  ActionResult<{
    hasToken: boolean;
    id?: string;
    lastUsedAt?: Date | null;
    expiresAt?: Date;
    createdAt?: Date;
  }>
> {
  const { userId } = await auth();
  if (!userId) return { success: false, error: "Unauthorized" };

  const [active] = await db
    .select({
      id: extensionToken.id,
      lastUsedAt: extensionToken.lastUsedAt,
      expiresAt: extensionToken.expiresAt,
      createdAt: extensionToken.createdAt,
    })
    .from(extensionToken)
    .where(
      and(
        eq(extensionToken.userId, userId),
        eq(extensionToken.isRevoked, false)
      )
    )
    .limit(1);

  if (!active || active.expiresAt < new Date()) {
    return { success: true, data: { hasToken: false } };
  }

  return {
    success: true,
    data: {
      hasToken: true,
      id: active.id,
      lastUsedAt: active.lastUsedAt,
      expiresAt: active.expiresAt,
      createdAt: active.createdAt,
    },
  };
}

/** Generate a new extension token (revokes existing) */
export async function generateExtensionToken(): Promise<
  ActionResult<{ token: string; id: string; expiresAt: Date }>
> {
  const { userId } = await auth();
  if (!userId) return { success: false, error: "Unauthorized" };

  // Revoke existing active tokens
  await db
    .update(extensionToken)
    .set({ isRevoked: true })
    .where(
      and(
        eq(extensionToken.userId, userId),
        eq(extensionToken.isRevoked, false)
      )
    );

  // Generate new 64-char hex token, 90-day expiry
  const token = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000);

  const [created] = await db
    .insert(extensionToken)
    .values({
      id: createId(),
      userId,
      token,
      expiresAt,
    })
    .returning({
      id: extensionToken.id,
      expiresAt: extensionToken.expiresAt,
    });

  revalidatePath("/portal/tools/extensions");
  return { success: true, data: { token, id: created.id, expiresAt: created.expiresAt } };
}

/** Revoke an extension token by ID */
export async function revokeExtensionToken(
  tokenId: string
): Promise<ActionResult<null>> {
  const { userId } = await auth();
  if (!userId) return { success: false, error: "Unauthorized" };

  const [updated] = await db
    .update(extensionToken)
    .set({ isRevoked: true })
    .where(
      and(
        eq(extensionToken.id, tokenId),
        eq(extensionToken.userId, userId)
      )
    )
    .returning({ id: extensionToken.id });

  if (!updated) return { success: false, error: "Token not found" };

  revalidatePath("/portal/tools/extensions");
  return { success: true, data: null };
}
