# WT3: Auth Infrastructure — Implementation Plan

> Branch: `phase-2a/auth-infra` | DB: Supabase (PostgreSQL) | ORM: Drizzle | Auth: Better Auth v1.5

## Phases Overview

| Phase | File | Status | Description |
|-------|------|--------|-------------|
| 1 | [wt3-phase-01-db-setup.md](./wt3-phase-01-db-setup.md) | ✅ | Supabase + Drizzle + Schema + DB Scripts |
| 2 | [wt3-phase-02-better-auth.md](./wt3-phase-02-better-auth.md) | ✅ | Better Auth config + API route + client |
| 3 | [wt3-phase-03-rbac-middleware.md](./wt3-phase-03-rbac-middleware.md) | ✅ | Proxy (route protection) + role guards + auth pages |
| 4 | [wt3-phase-04-encryption-seed.md](./wt3-phase-04-encryption-seed.md) | ✅ | Encryption utility + seed data + finalize |

## Dependencies

```
Phase 1 (DB) → Phase 2 (Auth) → Phase 3 (Proxy + Role Guards)
                                       ↗
Phase 4 (Encryption + Seed) ──────────┘ (can start after Phase 1)
```

## File Ownership

```
src/lib/db/              — Drizzle client, schema, encryption, seed
src/lib/auth/            — Better Auth server + client config + role helpers
src/app/api/auth/        — Better Auth API handler
src/app/(auth)/          — Login, unauthorized pages
src/app/(admin)/         — Admin layouts with role guards
src/app/(portal)/        — Portal layouts with role guards
src/proxy.ts             — Coarse route protection (Next.js 16)
drizzle.config.ts        — Drizzle CLI config
.env.local               — Secrets (DO NOT commit)
```

## Stack Decision (Updated)

| Layer | Choice | Why |
|-------|--------|-----|
| Database | **Supabase** (PostgreSQL) | Free tier, dashboard, connection pooling |
| ORM | **Drizzle** | Type-safe, lightweight, Better Auth adapter |
| Auth | **Better Auth v1.5** | Self-hosted, email/password, scrypt hashing, Next.js native |
| Driver | **postgres** (postgres.js) | Pure JS, `prepare: false` for Supabase pooling |
| Route Protection | **proxy.ts** (Next.js 16) | Node.js runtime, replaces middleware.ts |
| Auth Pattern | **2-layer** | Proxy (session check) + Server Component (role validation) |
| Encryption | `node:crypto` AES-256-GCM | Encrypt sensitive fields at rest |

## Key Research Findings

- **Next.js 16:** `middleware.ts` renamed to `proxy.ts`, runs Node.js (not Edge)
- **Supabase:** `prepare: false` required for Transaction pool mode (port 6543)
- **Better Auth v1.5:** `nextCookies()` plugin must be LAST in plugins array
- **Security:** 2-layer auth (proxy + server component) eliminates middleware bypass CVE
- **Password hashing:** Better Auth uses scrypt (not bcrypt)
- Research report: [plans/reports/researcher-260311-1235-auth-infra-stack.md](../plans/reports/researcher-260311-1235-auth-infra-stack.md)

## Success Criteria

- [x] Supabase PostgreSQL connected + schema pushed
- [x] Better Auth login/logout works (email/password)
- [x] 3 roles created and enforced (proxy + server component)
- [x] Public routes unaffected
- [x] Protected routes redirect to login
- [x] Role-based access working (admin vs portal vs super_admin-only)
- [x] Sensitive fields encrypted/decrypted correctly
- [x] Super admin accounts seeded (2 users + 8 products)
- [x] No auth secrets committed to git
- [x] `pnpm build` passes without errors
