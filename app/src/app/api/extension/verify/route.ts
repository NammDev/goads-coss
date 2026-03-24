import { eq } from "drizzle-orm";
import { createClerkClient } from "@clerk/nextjs/server";

import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { handleOptions, jsonResponse } from "../cors";

const clerk = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY!,
});

export const OPTIONS = handleOptions;

/** POST /api/extension/verify — Verify Clerk session JWT from extension */
export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "");

    if (!token) {
      return jsonResponse({ valid: false, error: "Authorization header required" }, 401);
    }

    // Verify Clerk session JWT
    const payload = await clerk.verifyToken(token);

    if (!payload?.sub) {
      return jsonResponse({ valid: false, error: "Invalid session" }, 401);
    }

    // Look up user in DB by Clerk user ID
    const [user] = await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        role: users.role,
      })
      .from(users)
      .where(eq(users.id, payload.sub))
      .limit(1);

    if (!user) {
      return jsonResponse({ valid: false, error: "User not found" }, 401);
    }

    return jsonResponse({
      valid: true,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
  } catch {
    return jsonResponse({ valid: false, error: "Invalid or expired session" }, 401);
  }
}
