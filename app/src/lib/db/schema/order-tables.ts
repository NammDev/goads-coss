import {
  pgTable,
  text,
  timestamp,
  integer,
  numeric,
  serial,
  jsonb,
} from "drizzle-orm/pg-core";
import { users } from "./auth-tables";
import { products } from "./product-tables";
import {
  orderStatusEnum,
  paymentMethodEnum,
  deliveredItemStatusEnum,
} from "./enums";

/** Orders — customer purchases tracked through lifecycle */
export const orders = pgTable("order", {
  id: text("id").primaryKey(),
  orderNumber: serial("orderNumber"), // human-readable #001, #002...
  customerId: text("customerId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  productId: text("productId")
    .notNull()
    .references(() => products.id),
  quantity: integer("quantity").notNull().default(1),
  totalAmount: numeric("totalAmount", { precision: 10, scale: 2 }).notNull(),
  currency: text("currency").notNull().default("USD"),
  paymentMethod: paymentMethodEnum("paymentMethod"),
  status: orderStatusEnum("status").notNull().default("pending"),
  notes: text("notes"),
  paymentDate: timestamp("paymentDate"),
  shipDate: timestamp("shipDate"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

/**
 * Delivered items — actual products shipped to customer.
 * Sensitive fields (bmId, inviteLink, credentials) are ENCRYPTED at rest.
 */
export const deliveredItems = pgTable("delivered_item", {
  id: text("id").primaryKey(),
  orderId: text("orderId")
    .notNull()
    .references(() => orders.id, { onDelete: "cascade" }),
  productType: text("productType").notNull(),
  label: text("label").notNull(), // e.g. "Agency Account #1"
  bmId: text("bmId"), // ENCRYPTED
  inviteLink: text("inviteLink"), // ENCRYPTED
  credentials: text("credentials"), // ENCRYPTED (JSON: uid/pass/2fa/cookie)
  status: deliveredItemStatusEnum("status").notNull().default("active"),
  metadata: jsonb("metadata"), // flexible extra data
  deliveredAt: timestamp("deliveredAt").notNull().defaultNow(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});
