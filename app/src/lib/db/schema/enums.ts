import { pgEnum } from "drizzle-orm/pg-core";

/** User roles for RBAC — super_admin, staff, customer */
export const userRoleEnum = pgEnum("user_role", [
  "super_admin",
  "staff",
  "customer",
]);

/** Product types matching GoAds service catalog */
export const productTypeEnum = pgEnum("product_type", [
  "agency_account",
  "bm",
  "profile",
  "page",
  "google_agency",
  "tiktok_agency",
  "tiktok_account",
  "blue_verification",
  "unban",
  "other",
]);

/** Order lifecycle status — digital products use "delivered" not "shipped" */
export const orderStatusEnum = pgEnum("order_status", [
  "pending",
  "paid",
  "processing",
  "delivered",
  "completed",
  "cancelled",
]);

/** Supported payment methods */
export const paymentMethodEnum = pgEnum("payment_method", [
  "crypto",
  "wise",
  "paypal",
  "other",
]);

/** Wallet transaction types */
export const walletTransactionTypeEnum = pgEnum("wallet_transaction_type", [
  "topup",
  "deduct",
]);

/** Delivered item health status */
export const deliveredItemStatusEnum = pgEnum("delivered_item_status", [
  "active",
  "inactive",
  "banned",
  "expired",
]);
