# Phase 2: Redesign Tables

## Overview
- **Priority:** High
- **Status:** TODO
- **Description:** Restructure orders + delivered_items to support multi-product orders, JSONB credentials, public share links, partial delivery

## Current Schema Problems
1. `orders` has single `productId` + `quantity` — can't hold mixed products (3 BM + 2 Profile)
2. `delivered_items` has hardcoded `bmId`, `inviteLink`, `credentials` columns — not flexible
3. No `order_items` table — needed for multi-product orders
4. No public share link for orders
5. `shipDate` should be `deliveredAt`

## Target Schema

### orders table
```ts
orders = pgTable("order", {
  id: text("id").primaryKey(),
  orderNumber: serial("orderNumber"),
  customerId: text("customerId").notNull().references(() => users.id),
  totalAmount: numeric("totalAmount", { precision: 10, scale: 2 }).notNull(),
  currency: text("currency").notNull().default("USD"),
  paymentMethod: paymentMethodEnum("paymentMethod"),
  status: orderStatusEnum("status").notNull().default("pending"),
  shareToken: text("shareToken").unique(),  // NEW: public link token
  notes: text("notes"),
  paymentDate: timestamp("paymentDate"),
  deliveredAt: timestamp("deliveredAt"),    // RENAMED from shipDate
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});
```

**Removed:** `productId`, `quantity` (moved to order_items)
**Added:** `shareToken` (for public links)
**Renamed:** `shipDate` → `deliveredAt`

### order_items table (NEW)
```ts
orderItems = pgTable("order_item", {
  id: text("id").primaryKey(),
  orderId: text("orderId").notNull().references(() => orders.id, { onDelete: "cascade" }),
  productId: text("productId").notNull().references(() => products.id),
  quantity: integer("quantity").notNull().default(1),
  unitPrice: numeric("unitPrice", { precision: 10, scale: 2 }).notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});
```

### delivered_items table (REDESIGNED)
```ts
deliveredItems = pgTable("delivered_item", {
  id: text("id").primaryKey(),
  orderId: text("orderId").notNull().references(() => orders.id, { onDelete: "cascade" }),
  orderItemId: text("orderItemId").references(() => orderItems.id),
  productType: productTypeEnum("productType").notNull(),
  uid: text("uid"),                                        // common field, indexed
  credentials: text("credentials"),                        // ENCRYPTED JSONB string
  status: deliveredItemStatusEnum("status").notNull().default("active"),
  warrantyUntil: timestamp("warrantyUntil"),
  deliveredAt: timestamp("deliveredAt").notNull().defaultNow(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});
```

**Removed:** `label`, `bmId`, `inviteLink`, `metadata` (all moved into `credentials` JSONB)
**Added:** `orderItemId` (link to specific line item), `uid` (separate indexed field), `warrantyUntil`
**Changed:** `credentials` = encrypted JSON string (not separate columns)

## Related Files
- Modify: `src/lib/db/schema/order-tables.ts`
- Check: `src/lib/db/seed.ts` (references old schema)
- Check: any API routes using old field names

## Implementation Steps
1. Rewrite `src/lib/db/schema/order-tables.ts` with new schema
2. Remove `productId`, `quantity` from orders
3. Add `order_items` table
4. Simplify `delivered_items` to uid + credentials pattern
5. Add `shareToken` to orders

## Todo
- [ ] Rewrite order-tables.ts
- [ ] Add order_items table
- [ ] Redesign delivered_items (uid + credentials JSONB)
- [ ] Add shareToken to orders
- [ ] Grep for old field references and update

## Risk
- Breaking change — all existing order data lost (acceptable: fresh DB)
- Encryption flow changes: now encrypt/decrypt entire JSON string instead of individual fields
