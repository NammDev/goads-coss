import { pgTable, text, timestamp, boolean } from "drizzle-orm/pg-core";
import { users } from "./auth-tables";

/**
 * Extension tokens — authenticate Chrome extension with GoAds portal.
 * Token is a random 64-char hex string, valid for 90 days.
 * One active token per user (generating new one revokes old).
 */
export const extensionToken = pgTable("extension_token", {
  id: text("id").primaryKey(), // cuid2
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  token: text("token").notNull().unique(),
  name: text("name").default("Default"),
  lastUsedAt: timestamp("last_used_at"),
  expiresAt: timestamp("expires_at").notNull(),
  isRevoked: boolean("is_revoked").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
