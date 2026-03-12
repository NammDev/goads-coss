# Phase 4A: DB Schema - Wallet System

## Context Links
- [Brainstorm](../reports/brainstorm-260312-2046-phase4-admin-crud-business-flow.md)
- [Existing enums](../../src/lib/db/schema/enums.ts)
- [Auth tables](../../src/lib/db/schema/auth-tables.ts)
- [Order tables](../../src/lib/db/schema/order-tables.ts)

## Overview
- **Priority:** P1 (blocks all other phases)
- **Status:** pending
- **Effort:** 1h

Add `balance` field to user table and create `wallet_transaction` table with enum.

## Requirements

### Functional
- User has a `balance` field (numeric, default 0)
- Wallet transactions record every topup/deduct with balanceAfter
- Deductions link to orderId for traceability
- createdBy tracks which admin performed the action

### Non-functional
- All balance operations must be transactional (no partial updates)
- numeric(12,2) precision for all money fields

## Architecture

```
user table
  + balance: numeric(12,2) default 0

wallet_transaction_type enum: topup | deduct

wallet_transaction table:
  id (text PK)
  customerId -> user.id
  type: wallet_transaction_type
  amount: numeric(12,2)
  balanceAfter: numeric(12,2)
  orderId? -> order.id (null for topup)
  note? text
  createdBy -> user.id (admin who did it)
  createdAt: timestamp
```

## Related Code Files

### Modify
- `src/lib/db/schema/enums.ts` — add `walletTransactionTypeEnum`
- `src/lib/db/schema/auth-tables.ts` — add `balance` field to `users`
- `src/lib/db/schema/index.ts` — export new table
- `src/lib/auth/auth.ts` — register `balance` as additionalField (readonly)

### Create
- `src/lib/db/schema/wallet-tables.ts` — `walletTransactions` table

## Implementation Steps

1. Add to `enums.ts`:
   ```ts
   export const walletTransactionTypeEnum = pgEnum("wallet_transaction_type", ["topup", "deduct"]);
   ```

2. Add `balance` to `users` table in `auth-tables.ts`:
   ```ts
   balance: numeric("balance", { precision: 12, scale: 2 }).notNull().default("0"),
   ```
   Import `numeric` from `drizzle-orm/pg-core`.

3. Create `wallet-tables.ts`:
   ```ts
   import { pgTable, text, timestamp, numeric } from "drizzle-orm/pg-core";
   import { users } from "./auth-tables";
   import { orders } from "./order-tables";
   import { walletTransactionTypeEnum } from "./enums";

   export const walletTransactions = pgTable("wallet_transaction", {
     id: text("id").primaryKey(),
     customerId: text("customerId").notNull().references(() => users.id, { onDelete: "cascade" }),
     type: walletTransactionTypeEnum("type").notNull(),
     amount: numeric("amount", { precision: 12, scale: 2 }).notNull(),
     balanceAfter: numeric("balanceAfter", { precision: 12, scale: 2 }).notNull(),
     orderId: text("orderId").references(() => orders.id),
     note: text("note"),
     createdBy: text("createdBy").notNull().references(() => users.id),
     createdAt: timestamp("createdAt").notNull().defaultNow(),
   });
   ```

4. Export from `schema/index.ts`:
   ```ts
   export * from "./wallet-tables";
   ```

5. Add `balance` to Better Auth additionalFields in `auth.ts`:
   ```ts
   balance: { type: "string", required: false, defaultValue: "0", input: false },
   ```

6. Run migration:
   ```bash
   npx drizzle-kit generate
   npx drizzle-kit push
   ```

7. Verify migration applied correctly via psql.

## Todo List
- [ ] Add `walletTransactionTypeEnum` to enums.ts
- [ ] Add `balance` field to users table
- [ ] Create `wallet-tables.ts`
- [ ] Export from schema/index.ts
- [ ] Register balance in Better Auth additionalFields
- [ ] Generate and push Drizzle migration
- [ ] Verify DB schema in psql

## Success Criteria
- `balance` column exists on `user` table with default 0
- `wallet_transaction` table created with all columns + FKs
- `wallet_transaction_type` enum created
- Drizzle schema matches DB
- App compiles without errors

## Risk Assessment
- **Better Auth compatibility:** balance field added as readonly additionalField; BA ignores it on signup. Low risk.
- **Migration on existing data:** default 0 is safe for existing users. No risk.
- **Circular import:** wallet-tables imports from auth-tables and order-tables (same pattern as order-tables importing auth-tables). No risk.
