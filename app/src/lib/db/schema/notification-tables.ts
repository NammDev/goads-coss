import { pgTable, text, timestamp, boolean } from "drizzle-orm/pg-core";
import { users } from "./auth-tables";
import { notificationTypeEnum } from "./enums";

/** In-app notifications — bell icon dropdown in dashboard */
export const notifications = pgTable("notification", {
  id: text("id").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  type: notificationTypeEnum("type").notNull(),
  title: text("title").notNull(),
  message: text("message").notNull(),
  linkUrl: text("linkUrl"),
  read: boolean("read").notNull().default(false),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});
