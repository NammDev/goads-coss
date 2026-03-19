import { randomBytes } from "crypto";
import { createId } from "@paralleldrive/cuid2";
import { eq, and } from "drizzle-orm";

import { db } from "@/lib/db";
import { extensionToken } from "@/lib/db/schema";
import { requireRole } from "@/lib/auth/require-role";
import { handleOptions, jsonResponse } from "../cors";

export const OPTIONS = handleOptions;

/** POST /api/extension/token — Generate new extension token (customer only) */
export async function POST() {
  try {
    const { user } = await requireRole("customer");

    // Revoke any existing active tokens for this user
    await db
      .update(extensionToken)
      .set({ isRevoked: true })
      .where(
        and(
          eq(extensionToken.userId, user.id),
          eq(extensionToken.isRevoked, false)
        )
      );

    // Generate new token (64-char hex)
    const token = randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000); // 90 days

    const [created] = await db
      .insert(extensionToken)
      .values({
        id: createId(),
        userId: user.id,
        token,
        expiresAt,
      })
      .returning({ id: extensionToken.id, expiresAt: extensionToken.expiresAt });

    return jsonResponse({ token, id: created.id, expiresAt: created.expiresAt });
  } catch {
    return jsonResponse({ error: "Unauthorized" }, 401);
  }
}

/** GET /api/extension/token — Get current token status (customer only) */
export async function GET() {
  try {
    const { user } = await requireRole("customer");

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
          eq(extensionToken.userId, user.id),
          eq(extensionToken.isRevoked, false)
        )
      )
      .limit(1);

    if (!active || active.expiresAt < new Date()) {
      return jsonResponse({ hasToken: false });
    }

    return jsonResponse({
      hasToken: true,
      id: active.id,
      lastUsedAt: active.lastUsedAt,
      expiresAt: active.expiresAt,
      createdAt: active.createdAt,
    });
  } catch {
    return jsonResponse({ error: "Unauthorized" }, 401);
  }
}
