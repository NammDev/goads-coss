# Phase 4F: Portal Wallet View

## Context Links
- [Plan overview](./plan.md)
- [Portal layout](../../src/app/portal/layout.tsx)
- [Portal nav](../../src/data/portal-nav.ts)
- [Wallet queries](./phase-4c-admin-topup-balance.md) (created in 4C)

## Overview
- **Priority:** P2
- **Status:** pending
- **Effort:** 2h
- **Depends on:** Phase 4A, 4C

Customer portal page showing current wallet balance and transaction history.

## Requirements

### Functional
- Balance card at top with current balance
- Transaction history table with: date, type (topup/deduct), amount, balance after, order link (if deduct), note
- Sorted by most recent first
- Wallet nav item in portal sidebar

### Non-functional
- Customer can only see own transactions
- Read-only (no actions)
- Pagination for large transaction lists

## Architecture

```
/portal/wallet page:
  [Balance Card: $X,XXX.XX]

  [Transaction History Table]
  | Date       | Type   | Amount   | Balance After | Order    | Note     |
  | 12/03/2026 | Topup  | +$500.00 | $500.00       | —        | Initial  |
  | 12/03/2026 | Deduct | -$50.00  | $450.00       | #ORD-123 | —        |

Data flow:
  layout.tsx: requireRole('customer') -> session
  page.tsx: getWalletTransactions(session.user.id) + getBalance
  WalletTable: client component with AdminDataTable
```

## Related Code Files

### Create
- `src/app/portal/wallet/page.tsx` — server component
- `src/app/portal/wallet/wallet-table.tsx` — client component
- `src/components/dashboard/columns/portal-wallet-columns.tsx` — column defs

### Modify
- `src/data/portal-nav.ts` — add Wallet nav item
- `src/app/portal/layout.tsx` — no change needed (auth already handled)
- `src/app/portal/portal-stats.tsx` — add balance to dashboard stats (if exists)

## Implementation Steps

1. Update `src/data/portal-nav.ts`:
   - Import `WalletIcon` from lucide-react
   - Add wallet nav item:
     ```ts
     { icon: WalletIcon, label: 'Wallet', href: '/portal/wallet' },
     ```
   - Place after Orders in nav order

2. Create `src/components/dashboard/columns/portal-wallet-columns.tsx`:
   ```ts
   // ColumnDef for wallet transactions:
   // - createdAt: formatted date
   // - type: badge (green for topup, red for deduct)
   // - amount: +/- formatted
   // - balanceAfter: formatted
   // - orderId: link to /portal/orders/[id] if exists, else "—"
   // - note: truncated text
   ```

3. Create `src/app/portal/wallet/wallet-table.tsx`:
   ```ts
   'use client'
   // Use AdminDataTable with wallet columns
   // searchPlaceholder: "Search transactions..."
   ```

4. Create `src/app/portal/wallet/page.tsx`:
   ```ts
   // Server component
   // requireRole('customer') via layout (already done)
   // const session = await auth... (or use requireRole return)
   // Actually: portal layout already guards, but we need session.user.id
   // Use auth.api.getSession to get user ID
   // Fetch: getWalletTransactions(userId), user.balance
   // Render: Balance card + WalletTable
   ```
   Note: portal layout already calls `requireRole('customer')` but page needs userId. Options:
   - Import `auth` and call `getSession` in page (same pattern as other portal pages)
   - Or pass userId through context/layout. Simpler: call auth in page directly.

5. Optionally update portal dashboard stats to show balance:
   - Modify `portal-stats.tsx` to accept + display balance

## Todo List
- [ ] Add Wallet to portal-nav.ts
- [ ] Create portal-wallet-columns.tsx
- [ ] Create wallet-table.tsx
- [ ] Create wallet/page.tsx
- [ ] Optionally add balance to portal dashboard stats
- [ ] Test: customer sees only own transactions
- [ ] Test: topup shows as green/positive, deduct as red/negative
- [ ] Test: order link works for deductions
- [ ] Test: pagination works with many transactions

## Success Criteria
- Wallet page accessible from portal sidebar
- Balance card shows accurate current balance
- Transaction history displays all customer transactions
- Topup/deduct visually distinguished
- Order links work for deduction transactions
- Customer can only see own data

## Risk Assessment
- **Auth in page vs layout:** Portal layout already guards with `requireRole('customer')`. Page needs userId — call `auth.api.getSession` directly. Pattern used by other portal pages. Low risk.
- **Empty state:** Show "No transactions yet" when no wallet_transactions exist. Easy.
- **Balance display type:** Balance stored as `numeric` (string in JS). Use `formatUSD` helper. Already used elsewhere.

## Security Considerations
- Customer can only see own wallet transactions (filtered by customerId in query)
- Read-only page, no mutations
- Auth guard at layout level
