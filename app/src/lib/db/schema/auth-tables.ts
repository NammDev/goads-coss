import { pgTable, text, timestamp, numeric } from "drizzle-orm/pg-core";
import { userRoleEnum } from "./enums";

/**
 * Users table — auth managed by Clerk, extended with business fields.
 * id = Clerk user ID (e.g. "user_2abc..."), synced via webhook.
 * Custom fields: role, balance, telegramId, notes
 */
export const users = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  role: userRoleEnum("role").notNull().default("customer"),
  balance: numeric("balance", { precision: 12, scale: 2 })
    .notNull()
    .default("0"),
  /** Unique URL-safe username for public profile (e.g. /community/user/johndoe) */
  username: text("username").unique(),
  /** Short bio for community profile */
  bio: text("bio"),
  /** Avatar URL — falls back to Clerk avatar if null */
  avatarUrl: text("avatarUrl"),
  telegramId: text("telegramId"),
  notes: text("notes"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});
