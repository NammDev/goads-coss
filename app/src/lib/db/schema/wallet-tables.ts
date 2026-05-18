import { pgTable, text, timestamp, numeric, index } from "drizzle-orm/pg-core";
import { users } from "./auth-tables";
import { orders } from "./order-tables";
import { walletTransactionTypeEnum, topupRequestStatusEnum } from "./enums";

/**
 * Topup requests — tracks customer-initiated wallet top-ups via Wise.
 * Each row represents one payment intent; status transitions:
 * pending → completed | failed | expired | cancelled
 */
export const topupRequests = pgTable(
  "topup_request",
  {
    id: text("id").primaryKey(),
    customerId: text("customerId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    amount: numeric("amount", { precision: 12, scale: 2 }).notNull(),
    currency: text("currency").notNull().default("USD"),
    status: topupRequestStatusEnum("status").notNull().default("pending"),
    /** Unique reference echoed back by Wise — used for webhook lookup */
    reference: text("reference").notNull().unique(),
    /** Wise-side payment ID, populated after createPayment succeeds */
    gatewayPaymentId: text("gatewayPaymentId"),
    /** Wise hosted payment page URL */
    paymentUrl: text("paymentUrl"),
    /** Raw QR code payload rendered by the FE */
    qrCodeData: text("qrCodeData"),
    expiresAt: timestamp("expiresAt").notNull(),
    completedAt: timestamp("completedAt"),
    failureReason: text("failureReason"),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt").notNull().defaultNow(),
  },
  (table) => [
    index("topup_request_customer_status_idx").on(table.customerId, table.status),
    index("topup_request_gateway_idx").on(table.gatewayPaymentId),
  ],
);

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
  /** FK to topup_request for webhook-driven top-ups (nullable for admin top-ups) */
  topupRequestId: text("topupRequestId").references(() => topupRequests.id),
  note: text("note"),
  createdBy: text("createdBy")
    .notNull()
    .references(() => users.id),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});
