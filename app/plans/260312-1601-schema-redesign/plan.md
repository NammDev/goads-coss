# Schema Redesign — Business Flow Alignment

> Redesign DB schema to match updated business-flow: single delivered_item table with JSONB credentials, customer pricing, public share links, updated enums.

## Status

| Phase | Status | Description |
|-------|--------|-------------|
| 1 | DONE | Update enums |
| 2 | DONE | Redesign product + order + delivered_item tables |
| 3 | DONE | Add customer pricing table |
| 4 | DONE | Zod credential schemas |
| 5 | DONE | Migration + seed |

## Key Decisions

- **Single table** for all delivered items (JSONB credentials per product_type)
- **`uid` as separate column** — common field, needs index/search
- **`shipped` → `delivered`** in order status
- **Remove `bank_transfer`** from payment methods
- **Public share link** per order (token-based, no auth required)
- **Customer pricing** — per-customer price overrides per product
- **Partial delivery** supported

## Dependencies

- `docs/business-flow.md` (source of truth)
- Supabase PostgreSQL (existing DB with auth tables)
- Drizzle ORM + drizzle-kit for migrations
- Existing encryption module (`src/lib/db/encryption.ts`)

## Phase Files

- [Phase 1: Update Enums](./phase-01-update-enums.md)
- [Phase 2: Redesign Tables](./phase-02-redesign-tables.md)
- [Phase 3: Customer Pricing](./phase-03-customer-pricing.md)
- [Phase 4: Zod Credential Schemas](./phase-04-zod-credentials.md)
- [Phase 5: Migration + Seed](./phase-05-migration-seed.md)
