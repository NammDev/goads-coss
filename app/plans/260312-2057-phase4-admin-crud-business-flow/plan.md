---
title: "Phase 4: Admin CRUD & Business Flow"
description: "Wallet system, admin customer/order creation, credential delivery, portal wallet view"
status: pending
priority: P1
effort: 12h
branch: main
tags: [admin, wallet, orders, crud, business-flow]
created: 2026-03-12
---

# Phase 4: Admin CRUD & Business Flow

## Business Flow

```
Customer browses web -> Telegram chat -> Consultation -> Money transfer
-> Admin confirms payment -> Topups balance -> Creates order (auto-deduct)
-> Fills credentials -> Customer sees on Portal
```

## Phases

| # | Phase | Effort | Status | File |
|---|-------|--------|--------|------|
| 4A | DB Schema: Wallet tables + balance field | 1h | pending | [phase-4a](./phase-4a-db-schema-wallet.md) |
| 4B | Admin: Create Customer | 1.5h | pending | [phase-4b](./phase-4b-admin-create-customer.md) |
| 4C | Admin: Topup Balance | 2h | pending | [phase-4c](./phase-4c-admin-topup-balance.md) |
| 4D | Admin: Create Order (auto-deduct) | 3h | pending | [phase-4d](./phase-4d-admin-create-order.md) |
| 4E | Admin: Deliver Order (credentials) | 2.5h | pending | [phase-4e](./phase-4e-admin-deliver-order.md) |
| 4F | Portal: Wallet View | 2h | pending | [phase-4f](./phase-4f-portal-wallet-view.md) |

## Dependencies

```
4A -> 4B (need balance field on user)
4A -> 4C (need wallet_transaction table)
4A -> 4D (need balance + wallet_transaction)
4D -> 4E (need orders to deliver)
4A + 4C -> 4F (need wallet data to display)
```

## Key Patterns (from codebase)

- Auth guard: `requireRole('super_admin', 'staff')` in layout.tsx
- Queries: `src/lib/db/queries/` barrel-exported via index.ts
- Tables: `src/lib/db/schema/` barrel-exported via index.ts
- Admin pages: server component fetches data, passes to client table component
- AdminDataTable: generic table with sorting/search/pagination/expansion
- Credentials: Zod schemas in `credential-schemas.ts`, per product type
- IDs: text primary keys (nanoid/cuid pattern)
- Migrations: `npx drizzle-kit generate` + `npx drizzle-kit push`

## Conventions

- Server Actions for all mutations (`"use server"`)
- Drizzle ORM with postgres-js driver
- Better Auth for user management
- kebab-case file naming, files < 200 lines
- shadcn/ui components
