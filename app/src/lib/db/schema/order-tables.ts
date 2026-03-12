import {
  pgTable,
  text,
  timestamp,
  integer,
  numeric,
  serial,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { users } from "./auth-tables";
import { products } from "./product-tables";
import {
  orderStatusEnum,
  paymentMethodEnum,
  productTypeEnum,
  deliveredItemStatusEnum,
} from "./enums";

/** Orders — customer purchases tracked through lifecycle */
export const orders = pgTable("order", {
  id: text("id").primaryKey(),
  orderNumber: serial("orderNumber"),
  customerId: text("customerId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  totalAmount: numeric("totalAmount", { precision: 10, scale: 2 }).notNull(),
  currency: text("currency").notNull().default("USD"),
  paymentMethod: paymentMethodEnum("paymentMethod"),
  status: orderStatusEnum("status").notNull().default("pending"),
  shareToken: text("shareToken").unique(),
  notes: text("notes"),
  paymentDate: timestamp("paymentDate"),
  deliveredAt: timestamp("deliveredAt"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

/** Order line items — what was ordered (product + quantity + price) */
export const orderItems = pgTable("order_item", {
  id: text("id").primaryKey(),
  orderId: text("orderId")
    .notNull()
    .references(() => orders.id, { onDelete: "cascade" }),
  productId: text("productId")
    .notNull()
    .references(() => products.id),
  quantity: integer("quantity").notNull().default(1),
  unitPrice: numeric("unitPrice", { precision: 10, scale: 2 }).notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});

/**
 * Delivered items — actual credentials delivered to customer.
 * credentials field = ENCRYPTED JSON string (schema varies by productType).
 * uid is separate for indexing/search across all product types.
 */
export const deliveredItems = pgTable("delivered_item", {
  id: text("id").primaryKey(),
  orderId: text("orderId")
    .notNull()
    .references(() => orders.id, { onDelete: "cascade" }),
  orderItemId: text("orderItemId")
    .references(() => orderItems.id),
  productType: productTypeEnum("productType").notNull(),
  uid: text("uid"),
  credentials: text("credentials"), // ENCRYPTED JSON string
  status: deliveredItemStatusEnum("status").notNull().default("active"),
  warrantyUntil: timestamp("warrantyUntil"),
  deliveredAt: timestamp("deliveredAt").notNull().defaultNow(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

/** Customer-specific pricing — agencies see their own prices */
export const customerPrices = pgTable(
  "customer_price",
  {
    id: text("id").primaryKey(),
    customerId: text("customerId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    productId: text("productId")
      .notNull()
      .references(() => products.id, { onDelete: "cascade" }),
    price: numeric("price", { precision: 10, scale: 2 }).notNull(),
    currency: text("currency").notNull().default("USD"),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt").notNull().defaultNow(),
  },
  (table) => [
    uniqueIndex("customer_product_idx").on(table.customerId, table.productId),
  ],
);
