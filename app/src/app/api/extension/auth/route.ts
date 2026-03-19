import { eq, and } from "drizzle-orm";

import { db } from "@/lib/db";
import { extensionToken, users } from "@/lib/db/schema";
import { handleOptions, jsonResponse } from "../cors";

export const OPTIONS = handleOptions;

/** POST /api/extension/auth — Validate extension token (no Clerk session needed) */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { token } = body;

    if (!token || typeof token !== "string") {
      return jsonResponse({ valid: false, error: "Token required" }, 400);
    }

    // Look up token — must be active and not expired
    const [record] = await db
      .select({
        id: extensionToken.id,
        userId: extensionToken.userId,
        expiresAt: extensionToken.expiresAt,
        isRevoked: extensionToken.isRevoked,
      })
      .from(extensionToken)
      .where(eq(extensionToken.token, token))
      .limit(1);

    if (!record) {
      return jsonResponse({ valid: false, error: "Invalid token" }, 401);
    }

    if (record.isRevoked) {
      return jsonResponse({ valid: false, error: "Token revoked" }, 401);
    }

    if (record.expiresAt < new Date()) {
      return jsonResponse({ valid: false, error: "Token expired" }, 401);
    }

    // Update lastUsedAt
    await db
      .update(extensionToken)
      .set({ lastUsedAt: new Date() })
      .where(eq(extensionToken.id, record.id));

    // Fetch user info
    const [user] = await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
      })
      .from(users)
      .where(eq(users.id, record.userId))
      .limit(1);

    if (!user) {
      return jsonResponse({ valid: false, error: "User not found" }, 401);
    }

    return jsonResponse({
      valid: true,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch {
    return jsonResponse({ valid: false, error: "Server error" }, 500);
  }
}
