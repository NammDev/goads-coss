import { pgTable, text, timestamp, numeric } from "drizzle-orm/pg-core";
import { users } from "./auth-tables";
import { orders } from "./order-tables";
import { walletTransactionTypeEnum } from "./enums";

/** Wallet transactions — records every topup/deduct for audit trail */
export const walletTransactions = pgTable("wallet_transaction", {
  id: text("id").primaryKey(),
  customerId: text("customerId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  type: walletTransactionTypeEnum("type").notNull(),
  amount: numeric("amount", { precision: 12, scale: 2 }).notNull(),
  balanceAfter: numeric("balanceAfter", { precision: 12, scale: 2 }).notNull(),
  orderId: text("orderId").references(() => orders.id),
  note: text("note"),
  createdBy: text("createdBy")
    .notNull()
    .references(() => users.id),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});
