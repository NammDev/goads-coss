# WT3 Phase 1: Database Setup (Supabase + Drizzle + Schema)

> Priority: **Critical** | Status: ✅ Complete | Depends on: Nothing

## Overview

Setup Supabase PostgreSQL, Drizzle ORM, define all table schemas, and configure DB scripts. This is the foundation — everything else depends on it.

## Key Insights

- Supabase provides PostgreSQL with connection pooling (Transaction mode port 6543, Session mode port 5432)
- Drizzle ORM has native Supabase support via `postgres` driver
- **CRITICAL:** `prepare: false` required for Supabase Transaction pool mode — prepared statements not supported
- Better Auth requires specific table structures (user, session, account, verification) — define them in Drizzle so we control the schema
- Better Auth v1.5 uses **scrypt** for password hashing (not bcrypt)
- Use `cuid2` for IDs (shorter than UUID, URL-safe, collision-resistant)

## Requirements

### Functional
- PostgreSQL database accessible from Next.js app
- All 5 table groups defined: users, session/account/verification, products, orders, delivered_items
- Enums for: user role, product type, order status, payment method, item status
- Relations defined between tables
- DB push/migrate/studio scripts working

### Non-functional
- Connection pooling enabled (Supabase Transaction mode)
- Type-safe queries via Drizzle
- Schema changes trackable via migrations

## Architecture

```
Supabase PostgreSQL
    ↕ (connection string via .env.local)
postgres driver (npm)
    ↕
Drizzle ORM (type-safe queries)
    ↕
Next.js App (server components, API routes)
```

## Related Code Files

### Create
- `drizzle.config.ts` — Drizzle CLI configuration
- `src/lib/db/index.ts` — Drizzle client singleton
- `src/lib/db/schema/index.ts` — re-export all schemas
- `src/lib/db/schema/enums.ts` — all pgEnum definitions
- `src/lib/db/schema/auth-tables.ts` — Better Auth tables (user, session, account, verification)
- `src/lib/db/schema/product-tables.ts` — products table
- `src/lib/db/schema/order-tables.ts` — orders + delivered_items tables

### Modify
- `app/package.json` — add dependencies + db scripts
- `.env.local` — add DATABASE_URL (DO NOT commit)
- `.gitignore` — ensure .env.local is ignored

## Implementation Steps

### 1. Create Supabase Project
- Go to supabase.com → New Project
- Copy connection string (Transaction pooling, port 6543)
- Add to `.env.local`:
  ```
  DATABASE_URL="postgresql://postgres.[ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres"
  ```

### 2. Install Dependencies
```bash
cd app
pnpm add better-auth drizzle-orm postgres @paralleldrive/cuid2
pnpm add -D drizzle-kit
```

### 3. Create `drizzle.config.ts`
```ts
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/lib/db/schema/index.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
```

### 4. Create `src/lib/db/index.ts`
```ts
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL!;

// Connection pool — use single instance in dev to avoid hot-reload leaks
const globalForDb = globalThis as unknown as {
  conn: postgres.Sql | undefined;
};

const conn = globalForDb.conn ?? postgres(connectionString, {
  prepare: false, // CRITICAL: required for Supabase Transaction pool mode
});
if (process.env.NODE_ENV !== "production") globalForDb.conn = conn;

export const db = drizzle({ client: conn, schema });
```

### 5. Create Schema Files

#### `src/lib/db/schema/enums.ts`
```ts
import { pgEnum } from "drizzle-orm/pg-core";

export const userRoleEnum = pgEnum("user_role", [
  "super_admin", "staff", "customer"
]);

export const productTypeEnum = pgEnum("product_type", [
  "agency_account", "bm", "profile", "google_agency",
  "tiktok_agency", "tiktok_account", "blue_verification",
  "unban", "other"
]);

export const orderStatusEnum = pgEnum("order_status", [
  "pending", "paid", "processing", "shipped", "completed", "cancelled"
]);

export const paymentMethodEnum = pgEnum("payment_method", [
  "bank_transfer", "crypto", "other"
]);

export const deliveredItemStatusEnum = pgEnum("delivered_item_status", [
  "active", "inactive", "banned", "expired"
]);
```

#### `src/lib/db/schema/auth-tables.ts`
Better Auth tables with extended user fields (role, telegramId, notes).

#### `src/lib/db/schema/product-tables.ts`
Products table with type enum, price, inventory.

#### `src/lib/db/schema/order-tables.ts`
Orders + delivered_items with FK relations, encrypted fields.

#### `src/lib/db/schema/index.ts`
Re-export all schemas for Drizzle client.

### 6. Add DB Scripts to `package.json`
```json
{
  "db:push": "drizzle-kit push",
  "db:migrate": "drizzle-kit migrate",
  "db:generate": "drizzle-kit generate",
  "db:studio": "drizzle-kit studio",
  "db:seed": "tsx src/lib/db/seed.ts"
}
```

### 7. Push Schema to Supabase
```bash
pnpm db:push
```

### 8. Verify via Drizzle Studio
```bash
pnpm db:studio
```

## Todo List

- [x] Create Supabase project + get connection string
- [x] Add DATABASE_URL to `.env.local`
- [x] Install deps: `better-auth drizzle-orm postgres @paralleldrive/cuid2 drizzle-kit`
- [x] Create `drizzle.config.ts`
- [x] Create `src/lib/db/index.ts` (Drizzle client)
- [x] Create `src/lib/db/schema/enums.ts`
- [x] Create `src/lib/db/schema/auth-tables.ts`
- [x] Create `src/lib/db/schema/product-tables.ts`
- [x] Create `src/lib/db/schema/order-tables.ts`
- [x] Create `src/lib/db/schema/index.ts`
- [x] Add db scripts to package.json
- [x] Run `pnpm db:push` — verify tables in Supabase dashboard
- [x] Run `pnpm db:studio` — verify schema
- [x] Run `pnpm build` — no compile errors

## Success Criteria

- All tables visible in Supabase dashboard
- Drizzle Studio connects and shows schema
- `pnpm build` passes
- No secrets in git

## Risk Assessment

| Risk | Mitigation |
|------|-----------|
| Supabase connection pooling issues | Use Transaction mode (port 6543) for serverless |
| Hot-reload DB connection leaks in dev | Global singleton pattern in db/index.ts |
| Schema drift between Drizzle and DB | Use `db:push` for dev, `db:migrate` for prod |

## Security

- DATABASE_URL in `.env.local` only — never commit
- Supabase Row Level Security (RLS) disabled — we handle auth at app level via Better Auth
- Connection string uses SSL by default on Supabase
