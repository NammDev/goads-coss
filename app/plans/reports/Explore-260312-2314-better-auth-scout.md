# Better Auth Implementation Scout Report

**Date:** 2026-03-12 | **Focus:** Better Auth config, middleware, auth pages, RBAC

## Executive Summary

GoAds uses **Better Auth v1.5.4** with:
- Email/password authentication (no OAuth/social login)
- PostgreSQL via Drizzle adapter
- Role-based access control (RBAC): 3 roles (super_admin, staff, customer)
- Server-side session management + client-side auth client
- Protected layouts using `requireRole()` guard
- Separate admin (`/admin`) and portal (`/portal`) routes with distinct role requirements

---

## 1. Auth Configuration

**File:** `/Users/nammdev/Documents/Code/goads-coss/app/src/lib/auth/auth.ts`

### Key Details
- **Framework:** Better Auth v1.5.4 (in package.json)
- **Database Adapter:** Drizzle ORM with PostgreSQL
- **Authentication Method:** Email/password only
  - Min password length: 8 characters
  - No OAuth, social, or multi-factor auth enabled
- **Session Strategy:** Cookie-based (via `nextCookies()` plugin)
- **Trusted Origins:** `process.env.NEXT_PUBLIC_APP_URL` or `http://localhost:3000`

### Custom User Fields
Extended beyond Better Auth defaults with:
- `role` (string, default: "customer", NOT user-assignable)
- `balance` (numeric string, default: "0", wallet-managed only)
- `telegramId` (string, optional)
- `notes` (string, optional)

### Session Type
Exported as `Session` type from auth config for type-safe server component usage.

---

## 2. Auth Middleware & Session Handling

**Files:**
- Client: `/Users/nammdev/Documents/Code/goads-coss/app/src/lib/auth/auth-client.ts`
- Server guard: `/Users/nammdev/Documents/Code/goads-coss/app/src/lib/auth/require-role.ts`

### Server-Side Guard (`requireRole`)
```
Signature: requireRole(...allowedRoles: Role[])
- Accepts variable roles: "super_admin" | "staff" | "customer"
- Returns session if authorized
- Redirects to /login if no session
- Redirects to /unauthorized if role not allowed
- Use in server components (layout.tsx, page.tsx)
```

### Client-Side Auth Client
```
Exported methods: signIn, signUp, signOut, useSession
- baseURL: NEXT_PUBLIC_APP_URL or localhost:3000
- Client component only ("use client")
```

### No Middleware
**NO middleware.ts found** — auth is handled via:
1. Layout guards (`requireRole` in layout.tsx)
2. Client-side redirects after signin

---

## 3. Authentication Pages

**Login Page:** `/Users/nammdev/Documents/Code/goads-coss/app/src/app/(auth)/login/page.tsx`

### Features
- Simple email/password form
- `signIn.email()` from auth-client
- Callback URL support (query param `callbackUrl`, default: `/portal`)
- Toast error notifications (sonner)
- Loading state during sign-in
- Fallback loading skeleton (Suspense)
- No signup page found — admin-only user creation

### Unauthorized Page
- `/Users/nammdev/Documents/Code/goads-coss/app/src/app/(auth)/unauthorized/page.tsx`
- Shown when role check fails
- Directs to homepage

### Route Groups
- `(auth)` — public login/unauthorized pages
- `(admin)` — admin-only routes (protected by `requireRole('super_admin', 'staff')`)
- `(portal)` — customer-only routes (protected by `requireRole('customer')`)

---

## 4. Role-Based Access Control (RBAC)

**Enum:** `/Users/nammdev/Documents/Code/goads-coss/app/src/lib/db/schema/enums.ts`

### Roles
1. **super_admin** — Full system access
2. **staff** — Limited admin access (can access admin layout + specific pages)
3. **customer** — Portal customer access

### Implementation

| Route | Required Roles | Guard Location |
|-------|---|---|
| `/admin/*` | super_admin, staff | `/src/app/admin/layout.tsx` |
| `/portal/*` | customer | `/src/app/portal/layout.tsx` |

**Admin Layout Guard:**
```
requireRole('super_admin', 'staff')
Passes: roleLabel ('Super Admin' or 'Staff') to AdminShell
```

**Portal Layout Guard:**
```
requireRole('customer')
Fetches product counts by customer ID
```

---

## 5. Auth-Related API Routes

**File:** `/Users/nammdev/Documents/Code/goads-coss/app/src/app/api/auth/[...all]/route.ts`

### Catch-All Handler
- Delegates all auth requests to `auth.handler(request)`
- Handles GET and POST
- No custom endpoint logic

---

## 6. Database Schema

**File:** `/Users/nammdev/Documents/Code/goads-coss/app/src/lib/db/schema/auth-tables.ts`

### Tables
| Table | Ownership | Keys |
|-------|-----------|------|
| `user` | Hybrid (BA core + custom fields) | id, email (unique), role, balance, telegramId, notes, created/updated |
| `session` | Better Auth | id, token (unique), expiresAt, userId (FK), ipAddress, userAgent |
| `account` | Better Auth | id, providerId, userId (FK), accessToken, refreshToken, etc. |
| `verification` | Better Auth | id, identifier, value, expiresAt (for email verify, password reset) |

---

## Key Observations

### ✅ Strengths
- Clean separation: admin/portal role enforcement via layout guards
- Type-safe session handling (exported Session type)
- Custom fields (role, balance) stored in DB with field-level access control
- No role self-assignment (role is `input: false`)
- Wallet balance managed separately (not via user input)

### ⚠️ Gaps / Potential Issues
1. **No OAuth/social login** — email/password only
2. **No 2FA/MFA** — no second factor authentication
3. **No email verification enforcement** — `emailVerified` field exists but not checked on signin
4. **No signup page** — users must be created via admin or database
5. **No middleware** — auth state NOT prevalidated at server edge; checked at layout level only
6. **No password reset flow** — `verifications` table has schema, but no endpoint/page

### 🔒 Security Notes
- `role` and `balance` cannot be user-assigned (good)
- Sessions stored with ipAddress + userAgent (audit trail available)
- Min password 8 chars (consider longer minimum)
- No rate limiting visible on auth endpoints

---

## Files Summary

| File Path | Purpose | Lines |
|-----------|---------|-------|
| `lib/auth/auth.ts` | Better Auth config, DB adapter, role fields | 61 |
| `lib/auth/auth-client.ts` | Client-side auth exports (signIn, signUp, etc.) | 10 |
| `lib/auth/require-role.ts` | Server-side RBAC guard | 29 |
| `app/api/auth/[...all]/route.ts` | Auth handler catch-all | 10 |
| `lib/db/schema/auth-tables.ts` | Database schema (user, session, account, verification) | 71 |
| `app/(auth)/login/page.tsx` | Login form + submission | 114 |
| `app/(auth)/unauthorized/page.tsx` | Access denied page | 34 |
| `app/admin/layout.tsx` | Admin route guard + shell | 24 |
| `app/portal/layout.tsx` | Portal route guard + shell | 15 |

---

## Unresolved Questions

1. Is email verification enforced on login, or just stored in DB?
2. How are users created initially (admin panel, API, or manual DB)?
3. Is password reset implemented (no UI page found)?
4. Are there any pending OAuth/social login tasks on the roadmap?
5. Should session management be moved to middleware for edge-level auth?

