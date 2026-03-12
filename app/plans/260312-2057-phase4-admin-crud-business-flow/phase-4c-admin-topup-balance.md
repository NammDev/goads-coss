# Phase 4C: Admin Topup Balance

## Context Links
- [Plan overview](./plan.md)
- [Customer detail page](../../src/app/admin/customers/[id]/page.tsx)
- [Wallet tables](./phase-4a-db-schema-wallet.md)

## Overview
- **Priority:** P1
- **Status:** pending
- **Effort:** 2h
- **Depends on:** Phase 4A

Admin tops up a customer's wallet balance. Creates wallet_transaction record and updates user.balance atomically.

## Requirements

### Functional
- Topup form: amount (positive number), note (optional)
- Shown on customer detail page (`/admin/customers/[id]`)
- Balance card displays current balance
- Transaction happens atomically (update balance + insert transaction)
- Balance displayed on customers table too

### Non-functional
- Single DB transaction for atomicity
- Amount must be positive, max reasonable limit (e.g., 999999)
- Revalidate page after topup

## Architecture

```
Customer detail page shows:
  [Balance card: $X.XX]  [Topup button]

Topup button -> Dialog with amount + note
-> Server action topupBalance(customerId, amount, note)
-> DB transaction:
   1. SELECT balance FROM user WHERE id = customerId FOR UPDATE
   2. newBalance = currentBalance + amount
   3. UPDATE user SET balance = newBalance
   4. INSERT wallet_transaction (type=topup, amount, balanceAfter=newBalance)
-> revalidatePath
```

## Related Code Files

### Create
- `src/lib/actions/wallet-actions.ts` — server action `topupBalance`
- `src/lib/db/queries/wallet-queries.ts` — `getWalletTransactions`, `getBalance`
- `src/lib/validators/wallet-schemas.ts` — Zod schema for topup
- `src/app/admin/customers/[id]/topup-dialog.tsx` — dialog component
- `src/app/admin/customers/[id]/balance-card.tsx` — balance display card

### Modify
- `src/app/admin/customers/[id]/page.tsx` — add balance card + topup button + recent transactions
- `src/lib/db/queries/index.ts` — export wallet queries
- `src/lib/db/queries/customer-queries.ts` — include balance in CustomerWithStats

## Implementation Steps

1. Create `src/lib/validators/wallet-schemas.ts`:
   ```ts
   import { z } from "zod";
   export const topupSchema = z.object({
     customerId: z.string().min(1),
     amount: z.coerce.number().positive("Must be positive").max(999999),
     note: z.string().optional(),
   });
   ```

2. Create `src/lib/db/queries/wallet-queries.ts`:
   - `getWalletTransactions(customerId)` — ordered by createdAt desc
   - `getCustomerBalance(customerId)` — returns balance from user table

3. Export from `src/lib/db/queries/index.ts`.

4. Create `src/lib/actions/wallet-actions.ts`:
   ```ts
   "use server"
   // requireRole('super_admin', 'staff')
   // parse with topupSchema
   // db.transaction:
   //   - read current balance (use sql`FOR UPDATE` for row lock)
   //   - calculate newBalance
   //   - update user.balance
   //   - insert walletTransactions row (type: topup, balanceAfter: newBalance)
   // revalidatePath('/admin/customers/[id]')
   ```
   Use `nanoid()` or `crypto.randomUUID()` for transaction ID.

5. Create `balance-card.tsx` — simple card showing formatted balance.

6. Create `topup-dialog.tsx`:
   - Dialog with amount (number input) + note (textarea)
   - useTransition for pending state
   - Close on success, toast on error

7. Update `customers/[id]/page.tsx`:
   - Fetch balance + recent transactions
   - Add balance card with topup button
   - Show recent wallet transactions below stats

8. Update `customer-queries.ts`:
   - Add `balance` to `CustomerWithStats` type
   - Include balance in `getAllCustomers` query

## Todo List
- [ ] Create wallet-schemas.ts
- [ ] Create wallet-queries.ts + export from index
- [ ] Create wallet-actions.ts with topupBalance
- [ ] Create balance-card.tsx
- [ ] Create topup-dialog.tsx
- [ ] Update customer detail page with balance + topup
- [ ] Update CustomerWithStats to include balance
- [ ] Test: topup increases balance correctly
- [ ] Test: wallet_transaction created with correct balanceAfter
- [ ] Test: concurrent topups don't cause race conditions

## Success Criteria
- Balance card shows on customer detail page
- Topup creates atomic transaction (balance + record)
- balanceAfter is accurate
- CustomerWithStats shows balance in table
- Revalidation works (page refreshes with new balance)

## Risk Assessment
- **Race condition on balance:** Use `FOR UPDATE` row lock in transaction. Drizzle supports raw SQL for this.
- **Floating point:** Using `numeric(12,2)` in DB + string representation in JS. Parse with `parseFloat` only for display.
- **Large topup amounts:** Capped at 999999 via Zod validation.

## Security Considerations
- Only super_admin/staff can topup
- Amount validated server-side (positive, max limit)
- createdBy field tracks which admin performed topup
