import { currentUser } from "@clerk/nextjs/server";

import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import type { UserRole } from "@/lib/db/schema/enums";

/**
 * Guarantees the currently authenticated Clerk user has a matching row in the
 * `user` table, inserting one on demand if missing.
 *
 * Why this exists: user rows are normally created by the Clerk → DB webhook
 * (`/api/webhooks/clerk`). Webhooks can't reach `localhost` during local dev,
 * so an admin who signs in never gets synced. Any write that references that
 * user via a foreign key — e.g. `wallet_transaction.createdBy` — then fails
 * with a 23503 foreign_key_violation. Calling this before such writes
 * self-heals the missing row instead of hard-failing.
 *
 * Uses onConflictDoNothing so an already-synced user is never overwritten.
 */
export async function ensureCurrentUserSynced(): Promise<void> {
  const user = await currentUser();
  if (!user) return;

  const email =
    user.emailAddresses.find((e) => e.id === user.primaryEmailAddressId)
      ?.emailAddress ??
    user.emailAddresses[0]?.emailAddress ??
    "";
  const name =
    [user.firstName, user.lastName].filter(Boolean).join(" ") || "User";
  const role = (user.publicMetadata?.role as UserRole) ?? "customer";

  await db
    .insert(users)
    .values({ id: user.id, name, email, role })
    .onConflictDoNothing();
}
