# WT3: Auth Infrastructure

> Branch: `phase-2a/backend` | Status: ✅ All 4 phases complete

## Scope

PostgreSQL database + Better Auth + RBAC proxy + encryption. Foundation for admin panel + customer portal.

## File Ownership

- `src/lib/auth/` — Better Auth server config (`auth.ts`), client (`auth-client.ts`), role guard (`require-role.ts`)
- `src/lib/db/` — Drizzle client, schema (enums, auth/product/order tables), encryption, seed
- `src/proxy.ts` — coarse route protection (Next.js 16, Node.js runtime)
- `src/app/api/auth/[...all]/route.ts` — Better Auth API handler
- `src/app/(auth)/` — login + unauthorized pages
- `src/app/(admin)/` — admin layouts with role guards (staff, super_admin)
- `src/app/(portal)/` — portal layout with role guard (all authenticated)
- `drizzle.config.ts` — Drizzle CLI config
- `.env.local` — DB connection string, auth secrets (DO NOT commit)

**DO NOT touch:** existing components, pages, CSS, theme files

## Stack Decision (Final)

| Layer | Choice | Why |
|-------|--------|-----|
| Database | **Supabase** (PostgreSQL) | Free tier, dashboard, connection pooling |
| ORM | **Drizzle** | Type-safe, lightweight, Better Auth adapter |
| Driver | **postgres** (postgres.js) | Pure JS, `prepare: false` for Supabase pooling |
| Auth | **Better Auth v1.5** | Self-hosted, email/password, scrypt hashing, Next.js native |
| Route Protection | **proxy.ts** (Next.js 16) | Node.js runtime, replaces middleware.ts |
| Auth Pattern | **2-layer** | Proxy (session check) + Server Component (role validation) |
| Encryption | `node:crypto` AES-256-GCM | Encrypt BM IDs, invite links at rest |

## Database Schema

### users (managed by Better Auth + extended)

```
id              text PK
name            text
email           text UNIQUE
emailVerified   boolean
image           text?
role            enum('super_admin', 'staff', 'customer') DEFAULT 'customer'
telegramId      text?
notes           text?          -- internal admin notes
createdAt       timestamp
updatedAt       timestamp
```

### session + account + verification (Better Auth standard tables)

Better Auth auto-creates these. Do not modify.

### products

```
id              text PK (cuid2)
name            text
slug            text UNIQUE
type            enum('agency_account', 'bm', 'profile', 'google_agency',
                     'tiktok_agency', 'tiktok_account', 'blue_verification',
                     'unban', 'other')
price           decimal(10,2)
currency        text DEFAULT 'USD'
description     text?
inventoryCount  integer DEFAULT 0
isActive        boolean DEFAULT true
createdAt       timestamp
updatedAt       timestamp
```

### orders

```
id              text PK (cuid2)
orderNumber     serial        -- human-readable #001, #002...
customerId      text FK → users.id
productId       text FK → products.id
quantity        integer DEFAULT 1
totalAmount     decimal(10,2)
currency        text DEFAULT 'USD'
paymentMethod   enum('bank_transfer', 'crypto', 'other')
status          enum('pending', 'paid', 'processing', 'shipped', 'completed', 'cancelled')
notes           text?          -- admin notes
paymentDate     timestamp?
shipDate        timestamp?
createdAt       timestamp
updatedAt       timestamp
```

### delivered_items

```
id              text PK (cuid2)
orderId         text FK → orders.id
productType     text           -- mirrors products.type
label           text           -- display name (e.g. "Agency Account #1")
bmId            text?          -- ENCRYPTED
inviteLink      text?          -- ENCRYPTED
credentials     text?          -- ENCRYPTED (JSON: uid/pass/2fa/cookie)
status          enum('active', 'inactive', 'banned', 'expired')
metadata        jsonb?         -- flexible extra data
deliveredAt     timestamp
createdAt       timestamp
updatedAt       timestamp
```

## RBAC

### Roles

| Role | Value | Description |
|------|-------|-------------|
| Super Admin | `super_admin` | nammdev, justin — full access |
| Staff | `staff` | ~3 employees — orders, customers, ship |
| Customer | `customer` | buyers — own data only |

### Route Protection Matrix

| Route Pattern | Allowed Roles | Notes |
|---------------|---------------|-------|
| `/(marketing)/*` | Public | No change |
| `/tools/*` | Public | No change |
| `/docs/*` | Public | No change |
| `/blog/*` | Public | No change |
| `/api/auth/*` | Public | Better Auth endpoints |
| `/(portal)/*` | customer, staff, super_admin | Customer dashboard |
| `/(admin)/*` | staff, super_admin | Admin panel |
| `/(admin)/finance/*` | super_admin | Revenue, reports |
| `/(admin)/staff/*` | super_admin | Staff management |
| `/(admin)/settings/*` | super_admin | System settings |

### Route Protection (2-Layer Architecture)

```
Layer 1: proxy.ts (COARSE — session existence only)
  ├── Public route? → Pass through
  ├── /api/auth/*? → Pass through
  ├── Protected route + no session? → Redirect /login?callbackUrl=...
  └── Protected route + has session? → Pass through

Layer 2: Server Component layouts (DETAILED — role validation)
  ├── requireRole("staff", "super_admin") → admin routes
  ├── requireRole("super_admin") → finance/staff/settings routes
  └── requireRole("customer", "staff", "super_admin") → portal routes
```

This 2-layer approach eliminates the Next.js middleware auth bypass vulnerability (CVE-2025).

## Implementation Status

### Phase 1: Database Setup ✅

- [x] Supabase project created + connection string configured
- [x] `drizzle.config.ts` + `src/lib/db/index.ts` (singleton pattern)
- [x] Schema: `enums.ts`, `auth-tables.ts`, `product-tables.ts`, `order-tables.ts`, `index.ts`
- [x] DB scripts: `db:push`, `db:generate`, `db:migrate`, `db:studio`, `db:seed`

### Phase 2: Better Auth ✅

- [x] `src/lib/auth/auth.ts` — betterAuth + drizzleAdapter + nextCookies() plugin
- [x] `src/lib/auth/auth-client.ts` — createAuthClient + exported hooks
- [x] `src/app/api/auth/[...all]/route.ts` — toNextJsHandler
- [x] Custom fields: role (`input: false`), telegramId, notes

### Phase 3: RBAC Route Protection ✅

- [x] `src/proxy.ts` — coarse session check (Next.js 16 Node.js runtime)
- [x] `src/lib/auth/require-role.ts` — server-side role guard
- [x] `src/app/(auth)/login/page.tsx` — email/password form + sonner toasts
- [x] `src/app/(auth)/unauthorized/page.tsx` — access denied card
- [x] Admin/portal/finance/staff/settings layout guards

### Phase 4: Encryption + Seed ✅

- [x] `src/lib/db/encryption.ts` — AES-256-GCM encrypt/decrypt (random IV)
- [x] `src/lib/db/seed.ts` — 2 super_admins + 8 products (idempotent)
- [x] Script: `tsx --env-file=.env.local` for env injection before module load

## QA Results

- **TypeScript**: Zero errors (`tsc --noEmit`)
- **Next.js Build**: Compiled in 4.9s, 54 static pages
- **ESLint**: Auth files clean
- **Seed**: Idempotent verified (run twice = same result)

## Success Criteria

- [x] Supabase PostgreSQL connected + schema pushed
- [x] Better Auth login/logout works (email/password)
- [x] 3 roles defined and enforced (proxy + server component)
- [x] Public routes unaffected
- [x] Protected routes redirect to login
- [x] Role-based access via server component guards
- [x] AES-256-GCM encryption/decryption working
- [x] 2 super_admin accounts + 8 products seeded
- [x] No auth secrets committed to git
- [x] `pnpm build` passes without errors
