# Phase 5: Migration + Seed

## Overview
- **Priority:** High
- **Status:** TODO
- **Description:** Generate Drizzle migration, push to Supabase, update seed script

## Pre-requisites
- Phase 1-4 complete (schema files updated)
- DATABASE_URL in .env
- ENCRYPTION_KEY in .env (for seed credentials)

## Migration Strategy
DB is fresh (only test accounts) → **drop all + recreate** is safe.

```bash
# Option A: Push directly (dev only, no migration files)
npx drizzle-kit push

# Option B: Generate migration files (recommended for tracking)
npx drizzle-kit generate
npx drizzle-kit migrate
```

## Seed Script Updates

Current seed creates: super_admins + sample products.
Need to add: sample order with delivered_items to verify schema works.

```ts
// Updated seed additions:
// 1. Create test customer (test@gmail.com already exists)
// 2. Create sample order with shareToken
// 3. Create order_items (mixed products)
// 4. Create delivered_items with encrypted credentials
// 5. Create customer_price for test agency
```

## drizzle.config.ts Fix
Current config reads `.env.local` but DATABASE_URL is in `.env`. Fix:
```ts
config({ path: ".env" }); // or remove and let it auto-detect
```

## Implementation Steps
1. Fix drizzle.config.ts to read correct .env file
2. Run `npx drizzle-kit push` to sync schema to Supabase
3. Update `src/lib/db/seed.ts` with sample order + delivered items
4. Run seed: `npx tsx src/lib/db/seed.ts`
5. Verify via psql: tables, columns, data

## Todo
- [ ] Fix drizzle.config.ts env path
- [ ] Push schema to DB
- [ ] Update seed script
- [ ] Run seed and verify
- [ ] Test encrypt/decrypt credentials round-trip

## Risk
- **Data loss**: push will drop existing tables — acceptable for dev
- **ENCRYPTION_KEY**: needed for seed, must be in .env before running
