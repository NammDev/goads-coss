import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { users } from "./auth-tables";
import { deliveredItems } from "./order-tables";
import { warrantyClaimStatusEnum } from "./enums";

/** Warranty claims — customer-submitted claims on delivered items */
export const warrantyClaims = pgTable("warranty_claim", {
  id: text("id").primaryKey(),
  deliveredItemId: text("deliveredItemId")
    .notNull()
    .references(() => deliveredItems.id, { onDelete: "cascade" }),
  customerId: text("customerId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  reason: text("reason").notNull(),
  status: warrantyClaimStatusEnum("status").notNull().default("pending"),
  adminNote: text("adminNote"),
  replacementItemId: text("replacementItemId").references(
    () => deliveredItems.id,
  ),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});
