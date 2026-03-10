# WT3: Auth Infrastructure

> Branch: `phase-2a/auth-infra`

## Scope

PostgreSQL database + Better Auth + RBAC middleware. Foundation for admin panel + customer portal.

## File Ownership

- `src/lib/auth/` — Better Auth config, client, server
- `src/lib/db/` — Drizzle ORM schema, migrations, client
- `src/middleware.ts` — route protection
- `drizzle.config.ts` — Drizzle config
- `.env.local` — DB connection string, auth secrets (DO NOT commit)
- `package.json` — new dependencies only

**DO NOT touch:** existing components, pages, CSS, theme files

## Stack Decision

| Layer | Choice | Why |
|-------|--------|-----|
| Database | PostgreSQL (Neon/Supabase) | Relational, encrypted fields, RBAC |
| ORM | Drizzle | Type-safe, lightweight, good DX with Better Auth |
| Auth | Better Auth | Self-hosted, email/password, role-based, Next.js native |
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

### Middleware Logic

```
1. Check route pattern
2. If public route → pass through
3. If protected route → check session
4. No session → redirect to /login
5. Has session → check role against route
6. Insufficient role → redirect to /unauthorized
```

## Implementation Steps

### Step 1: Dependencies

```bash
pnpm add better-auth drizzle-orm @neondatabase/serverless
pnpm add -D drizzle-kit
```

### Step 2: Database Setup

- [ ] Create Neon project (or local PostgreSQL)
- [ ] Add `DATABASE_URL` to `.env.local`
- [ ] Create `drizzle.config.ts`
- [ ] Create `src/lib/db/index.ts` — Drizzle client
- [ ] Create `src/lib/db/schema.ts` — all table schemas

### Step 3: Better Auth

- [ ] Create `src/lib/auth/auth.ts` — server-side auth config
- [ ] Create `src/lib/auth/auth-client.ts` — client-side auth
- [ ] Create `src/app/api/auth/[...all]/route.ts` — API handler
- [ ] Add `BETTER_AUTH_SECRET` to `.env.local`
- [ ] Configure Better Auth with Drizzle adapter
- [ ] Add role field to user schema

### Step 4: RBAC Middleware

- [ ] Create `src/middleware.ts`
- [ ] Define route matchers for public/protected/admin routes
- [ ] Implement session check + role validation
- [ ] Create `/login` page (email/password form)
- [ ] Create `/unauthorized` page

### Step 5: Encryption Utility

- [ ] Create `src/lib/db/encryption.ts`
- [ ] AES-256-GCM encrypt/decrypt functions
- [ ] Add `ENCRYPTION_KEY` to `.env.local`
- [ ] Use in delivered_items schema hooks

### Step 6: Seed Data

- [ ] Create seed script `src/lib/db/seed.ts`
- [ ] Seed super_admin: nammdev, justin
- [ ] Seed sample products (match existing product pages)
- [ ] Add `pnpm db:seed` script

### Step 7: DB Scripts

- [ ] `pnpm db:push` — push schema to DB
- [ ] `pnpm db:migrate` — run migrations
- [ ] `pnpm db:studio` — Drizzle Studio for debugging
- [ ] `pnpm db:seed` — seed initial data

## Success Criteria

- [ ] PostgreSQL connected + schema pushed
- [ ] Better Auth login/logout works (email/password)
- [ ] 3 roles created and enforced via middleware
- [ ] Public routes unaffected
- [ ] Protected routes redirect to login
- [ ] Role-based access working (admin vs customer routes)
- [ ] Sensitive fields encrypted/decrypted correctly
- [ ] Super admin accounts seeded
- [ ] No auth secrets committed to git
