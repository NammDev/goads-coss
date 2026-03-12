---
type: brainstorm
date: 2026-03-12
slug: phase4-admin-crud-business-flow
---

# Phase 4 Brainstorm: Admin CRUD & Business Flow

## Business Flow

```
Customer browses web → Chats on Telegram → Consultation → Transfers money
                                                              ↓
Admin confirms payment → Topups customer balance → Creates order (auto-deduct) → Fills credentials
                                                              ↓
                                              Customer sees on Portal (orders + products + balance)
```

## Decisions Made

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Registration | Self-register + Admin creates | Flexibility |
| Payment | Full manual + Telegram | All payments confirmed manually by admin |
| Wallet | Simple topup + deduct | No refund complexity needed |
| Cart | No cart on web | Orders created by admin after Telegram chat |
| Wallet DB | `balance` field on user + `wallet_transaction` table | KISS |
| Insufficient balance | Not possible | Admin always topups before creating order |
| Next step | Create detailed plan | — |

## DB Changes Required

### Add to `user` table
- `balance: numeric(12,2) default 0`

### New `wallet_transaction` table
- id (text PK)
- customerId (FK → user)
- type: enum(topup, deduct)
- amount: numeric(12,2)
- balanceAfter: numeric(12,2)
- orderId: text? (null for topup, FK → order for deduct)
- note: text?
- createdBy: text (FK → user, the admin who did it)
- createdAt: timestamp

## 6 Sub-Phases

| Phase | Scope | Effort |
|-------|-------|--------|
| 4A | DB: balance field + wallet_transaction table + enum | Small |
| 4B | Admin: Create Customer UI (server action + form) | Small |
| 4C | Admin: Topup Balance UI (server action + form) | Small |
| 4D | Admin: Create Order UI (select customer + products, auto-deduct) | Medium |
| 4E | Admin: Fill/Deliver Order UI (credential forms per product type) | Medium |
| 4F | Portal: Wallet balance + transaction history view | Small |

## Key Implementation Notes

- All mutations via Next.js Server Actions (`"use server"`)
- Admin-only actions guarded by `requireRole('super_admin', 'staff')`
- Credential forms use Zod schemas from `credential-schemas.ts`
- Topup + order creation in single DB transaction
- Order auto-deduct: create order → deduct balance → create wallet_transaction (all in 1 tx)
