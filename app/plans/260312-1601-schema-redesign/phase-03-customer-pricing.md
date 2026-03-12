# Phase 3: Customer Pricing

## Overview
- **Priority:** Medium
- **Status:** TODO
- **Description:** Per-customer/agency price overrides so agencies see their own prices when logged in

## Design

### customer_prices table (NEW)
```ts
customerPrices = pgTable("customer_price", {
  id: text("id").primaryKey(),
  customerId: text("customerId").notNull().references(() => users.id, { onDelete: "cascade" }),
  productId: text("productId").notNull().references(() => products.id, { onDelete: "cascade" }),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  currency: text("currency").notNull().default("USD"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});
// unique constraint: (customerId, productId)
```

### Pricing Resolution Logic
```
1. Check customer_prices for (customerId, productId)
2. If found → use customer price
3. If not found → use product.price (retail)
```

## Related Files
- Create: new table in `src/lib/db/schema/order-tables.ts` (or separate file if >200 lines)
- Future: API endpoint to resolve price per customer

## Implementation Steps
1. Add `customerPrices` table to schema
2. Add unique index on (customerId, productId)
3. Include in schema index export

## Todo
- [ ] Add customerPrices table
- [ ] Add unique composite index
- [ ] Export from schema/index.ts

## Risk
- Low — additive change, no breaking impact
