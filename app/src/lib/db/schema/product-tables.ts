import {
  pgTable,
  text,
  timestamp,
  boolean,
  integer,
  numeric,
} from "drizzle-orm/pg-core";
import { productTypeEnum } from "./enums";

/** Products — GoAds service catalog (agency accounts, BMs, etc.) */
export const products = pgTable("product", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  type: productTypeEnum("type").notNull(),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  currency: text("currency").notNull().default("USD"),
  description: text("description"),
  inventoryCount: integer("inventoryCount").notNull().default(0),
  isActive: boolean("isActive").notNull().default(true),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});
