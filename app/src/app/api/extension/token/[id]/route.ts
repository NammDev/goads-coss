import { eq, and } from "drizzle-orm";

import { db } from "@/lib/db";
import { extensionToken } from "@/lib/db/schema";
import { requireRole } from "@/lib/auth/require-role";
import { handleOptions, jsonResponse } from "../../cors";

export const OPTIONS = handleOptions;

/** DELETE /api/extension/token/[id] — Revoke token (customer only, own token) */
export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { user } = await requireRole("customer");
    const { id } = await params;

    const [updated] = await db
      .update(extensionToken)
      .set({ isRevoked: true })
      .where(
        and(
          eq(extensionToken.id, id),
          eq(extensionToken.userId, user.id)
        )
      )
      .returning({ id: extensionToken.id });

    if (!updated) {
      return jsonResponse({ error: "Token not found" }, 404);
    }

    return jsonResponse({ success: true });
  } catch {
    return jsonResponse({ error: "Unauthorized" }, 401);
  }
}
