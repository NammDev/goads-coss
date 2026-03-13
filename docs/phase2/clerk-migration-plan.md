# Clerk Migration Plan — Better Auth to Clerk

> Pre-production big-bang migration. No incremental/trickle needed.

## Current State Audit

### Better Auth Touchpoints (28 files total)

**Core Auth Files (DELETE after migration)**
| File | Purpose |
|------|---------|
| `src/lib/auth/auth.ts` | betterAuth() server config, Drizzle adapter, emailAndPassword, user additionalFields (role, balance, telegramId, notes) |
| `src/lib/auth/auth-client.ts` | createAuthClient() — exports signIn, signUp, signOut, useSession |
| `src/lib/auth/require-role.ts` | Server-side role guard — calls auth.api.getSession(), redirects on fail |
| `src/proxy.ts` | Middleware-like auth proxy — checks session, redirects to /login |
| `src/app/api/auth/[...all]/route.ts` | Better Auth catch-all API handler |

**Auth Layout & Pages (MODIFY)**
| File | Purpose |
|------|---------|
| `src/app/(auth)/layout.tsx` | Centered layout for login/unauthorized |
| `src/app/(auth)/login/page.tsx` | Custom login form using signIn.email() |
| `src/app/(auth)/unauthorized/page.tsx` | Access denied page (keep, no auth deps) |

**Route Group Layouts (MODIFY — requireRole calls)**
| File | Current Auth Pattern |
|------|---------------------|
| `src/app/(admin)/layout.tsx` | `await requireRole("staff", "super_admin")` |
| `src/app/(admin)/staff/layout.tsx` | `await requireRole("super_admin")` |
| `src/app/(admin)/finance/layout.tsx` | `await requireRole("super_admin")` |
| `src/app/(admin)/settings/layout.tsx` | `await requireRole("super_admin")` |
| `src/app/(portal)/layout.tsx` | `await requireRole("customer", "staff", "super_admin")` |
| `src/app/admin/layout.tsx` | `await requireRole('super_admin', 'staff')` — also reads session.user.name, session.user.role |
| `src/app/portal/layout.tsx` | `await requireRole('customer')` — reads session.user.id, session.user.name |

**Portal Pages (MODIFY — requireRole + session.user.id/name)**
| File | Auth Usage |
|------|-----------|
| `src/app/portal/page.tsx` | requireRole('customer'), session.user.id, session.user.name |
| `src/app/portal/orders/page.tsx` | requireRole('customer'), session.user.id |
| `src/app/portal/orders/[id]/page.tsx` | requireRole('customer'), session.user.id (ownership check) |
| `src/app/portal/wallet/page.tsx` | requireRole('customer'), session.user.id |
| `src/app/portal/profile/page.tsx` | requireRole('customer'), session.user.name, session.user.email |
| `src/app/portal/products/[type]/page.tsx` | requireRole('customer'), session.user.id |
| `src/app/portal/products/[type]/[id]/page.tsx` | requireRole('customer'), session.user.id |

**Server Actions (MODIFY — auth.api.getSession + role check)**
| File | Auth Pattern |
|------|-------------|
| `src/lib/actions/order-actions.ts` | getSession → role check → session.user.id as adminId |
| `src/lib/actions/delivery-actions.ts` | getSession → role check |
| `src/lib/actions/wallet-actions.ts` | getSession → role check → session.user.id as adminId |
| `src/lib/actions/customer-actions.ts` | getSession → role check + auth.api.signUpEmail() for user creation |

**Other**
| File | Auth Usage |
|------|-----------|
| `src/lib/db/seed.ts` | auth.api.signUpEmail() to create admin/customer users |
| `src/lib/db/schema/auth-tables.ts` | users, sessions, accounts, verifications tables |
| `src/lib/db/schema/index.ts` | Re-exports auth-tables |
| `src/components/shadcn-studio/blocks/dropdown-profile.tsx` | LogOut icon (static, no auth wired yet) |

### DB Schema (Better Auth-managed)
- `user` table — BA owns id/name/email/emailVerified/image/createdAt/updatedAt. Custom: role, balance, telegramId, notes
- `session` table — BA session management (DELETE after migration)
- `account` table — BA provider accounts (DELETE after migration)
- `verification` table — BA email/password tokens (DELETE after migration)
- Roles: `user_role` enum — super_admin, staff, customer

### Auth Patterns Summary
- **Server getSession:** `auth.api.getSession({ headers: await headers() })` — used in 6 files
- **Server signUpEmail:** `auth.api.signUpEmail({ body: {...} })` — used in 2 files (customer-actions, seed)
- **Client signIn:** `signIn.email({ email, password })` — used in 1 file (login page)
- **Client exports:** signIn, signUp, signOut, useSession — only signIn used currently
- **Role guard:** requireRole() — used in 10 layout/page files
- **Middleware:** proxy.ts — custom, no standard middleware.ts

---

## Migration Phases

### Phase 1: Install & Configure Clerk
**Effort:** 30min

**Steps:**
- [ ] `cd app && pnpm add @clerk/nextjs @clerk/ui`
- [ ] Add env vars to `.env.local`:
  ```
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
  CLERK_SECRET_KEY=sk_test_...
  NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
  NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
  ```
- [ ] Wrap `<body>` children in `<ClerkProvider>` in `src/app/layout.tsx`
  - Import `shadcn` theme from `@clerk/ui/themes`
  - Add `@import '@clerk/ui/themes/shadcn.css'` to `globals.css`
- [ ] Configure Clerk dashboard: enable email/password, disable social login (for now)
- [ ] In Clerk dashboard: create custom user metadata field `role` (public metadata)

**Files to modify:**
- `src/app/layout.tsx` — add ClerkProvider + shadcn theme
- `src/app/globals.css` — add Clerk shadcn CSS import
- `.env.local` — add Clerk keys

**Before:**
```tsx
// layout.tsx
<ThemeProvider>
  <CartProvider>
    <TooltipProvider>{children}</TooltipProvider>
  </CartProvider>
</ThemeProvider>
```

**After:**
```tsx
import { ClerkProvider } from '@clerk/nextjs'
import { shadcn } from '@clerk/ui/themes'

<ClerkProvider appearance={{ theme: shadcn }}>
  <ThemeProvider>
    <CartProvider>
      <TooltipProvider>{children}</TooltipProvider>
    </CartProvider>
  </ThemeProvider>
</ClerkProvider>
```

---

### Phase 2: Middleware — Replace proxy.ts with clerkMiddleware
**Effort:** 30min

**Steps:**
- [ ] Create `src/middleware.ts` (Next.js standard location)
- [ ] Delete `src/proxy.ts`
- [ ] Define route matchers for admin + portal routes

**File to create: `src/middleware.ts`**
```typescript
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isAdminRoute = createRouteMatcher(['/admin(.*)'])
const isPortalRoute = createRouteMatcher(['/portal(.*)'])
const isProtectedRoute = createRouteMatcher(['/admin(.*)', '/portal(.*)'])

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect()
  }
})

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.svg$|.*\\.ico$|.*\\.jpg$|.*\\.jpeg$|.*\\.webp$).*)',
  ],
}
```

**File to delete:** `src/proxy.ts`

---

### Phase 3: Auth Helpers — Replace require-role + getSession
**Effort:** 1h

**Strategy:** Clerk stores `role` in `publicMetadata`. Replace `requireRole()` with a new helper using Clerk's `auth()`.

**Steps:**
- [ ] Rewrite `src/lib/auth/require-role.ts` to use Clerk
- [ ] Delete `src/lib/auth/auth.ts`
- [ ] Delete `src/lib/auth/auth-client.ts`

**File: `src/lib/auth/require-role.ts` (rewrite)**
```typescript
import { auth, currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

type Role = 'super_admin' | 'staff' | 'customer'

/**
 * Server-side role guard. Redirects to /sign-in if no session,
 * /unauthorized if role not allowed. Returns user data.
 */
export async function requireRole(...allowedRoles: Role[]) {
  const { userId } = await auth()

  if (!userId) {
    redirect('/sign-in')
  }

  const user = await currentUser()
  if (!user) redirect('/sign-in')

  const role = (user.publicMetadata.role as Role) ?? 'customer'

  if (!allowedRoles.includes(role)) {
    redirect('/unauthorized')
  }

  return {
    user: {
      id: userId,
      name: user.firstName
        ? `${user.firstName} ${user.lastName ?? ''}`.trim()
        : user.emailAddresses[0]?.emailAddress ?? 'User',
      email: user.emailAddresses[0]?.emailAddress ?? '',
      role,
      image: user.imageUrl,
    },
  }
}
```

**Why keep requireRole wrapper:** 10+ files use it — minimizes changes downstream. Return shape stays compatible: `session.user.id`, `session.user.name`, `session.user.email`, `session.user.role`.

---

### Phase 4: Server Actions — Replace auth.api.getSession
**Effort:** 1h

**Steps:**
- [ ] Update all 4 server action files to use Clerk's `auth()` instead of `auth.api.getSession()`

**Files to modify:**
1. `src/lib/actions/order-actions.ts`
2. `src/lib/actions/delivery-actions.ts`
3. `src/lib/actions/wallet-actions.ts`
4. `src/lib/actions/customer-actions.ts`

**Pattern — Before (all 4 files):**
```typescript
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
// ...
const session = await auth.api.getSession({ headers: await headers() });
if (!session || (session.user.role !== "super_admin" && session.user.role !== "staff")) {
  return { success: false, error: "Unauthorized" };
}
const adminId = session.user.id;
```

**Pattern — After:**
```typescript
import { auth, currentUser } from '@clerk/nextjs/server'
// remove: import { headers } from "next/headers"
// ...
const { userId } = await auth()
if (!userId) return { success: false, error: "Unauthorized" }

const user = await currentUser()
const role = (user?.publicMetadata?.role as string) ?? 'customer'
if (role !== 'super_admin' && role !== 'staff') {
  return { success: false, error: "Unauthorized" }
}
const adminId = userId
```

**Special case — `customer-actions.ts`:**
- Currently uses `auth.api.signUpEmail()` to create customers via Better Auth
- Replace with Clerk Backend API: `clerkClient.users.createUser()`

```typescript
import { createClerkClient } from '@clerk/nextjs/server'

const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY! })

// Replace auth.api.signUpEmail
const clerkUser = await clerk.users.createUser({
  emailAddress: [email],
  password,
  firstName: name,
  publicMetadata: { role: 'customer' },
})

// Then insert/update local DB user row
await db.insert(users).values({
  id: clerkUser.id,
  name,
  email,
  role: 'customer',
  telegramId: telegramId ?? null,
  notes: notes ?? null,
}).onConflictDoNothing()
```

---

### Phase 5: UI — Replace Login Page with Clerk Components
**Effort:** 30min

**Steps:**
- [ ] Replace custom login page with Clerk `<SignIn />` component
- [ ] Create sign-up page with `<SignUp />` (optional, admin-created users for now)
- [ ] Update (auth) layout routes: `/sign-in`, `/sign-up`

**Files to modify:**
- `src/app/(auth)/login/page.tsx` — DELETE (or redirect to /sign-in)
- Create `src/app/(auth)/sign-in/[[...sign-in]]/page.tsx`
- Create `src/app/(auth)/sign-up/[[...sign-up]]/page.tsx` (optional)

**File: `src/app/(auth)/sign-in/[[...sign-in]]/page.tsx`**
```tsx
import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return <SignIn />
}
```

**File: `src/app/(auth)/sign-up/[[...sign-up]]/page.tsx`**
```tsx
import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
  return <SignUp />
}
```

- [ ] Update unauthorized page link: `/login` -> `/sign-in`
- [ ] Update `(auth)/layout.tsx` metadata title if needed

---

### Phase 6: DB Schema — User Table + Webhook Sync
**Effort:** 1.5h

**Key decision:** Keep local `user` table. Clerk is auth provider; local DB stores business data (role, balance, telegramId, notes). Sync via webhook.

**Steps:**
- [ ] Update `user` table: change `id` to store Clerk user ID (string, e.g. `user_2x...`)
- [ ] Remove `emailVerified`, `image` columns from local table (Clerk owns these)
- [ ] DROP `session`, `account`, `verification` tables
- [ ] Create webhook endpoint for Clerk → local DB sync
- [ ] Update seed.ts to use Clerk Backend API

**File: `src/lib/db/schema/auth-tables.ts` (rewrite)**
```typescript
import { pgTable, text, timestamp, numeric } from "drizzle-orm/pg-core";
import { userRoleEnum } from "./enums";

/**
 * Users table — synced from Clerk via webhook.
 * Clerk owns: authentication, email, name, image, sessions.
 * Local DB owns: role, balance, telegramId, notes (business data).
 */
export const users = pgTable("user", {
  id: text("id").primaryKey(), // Clerk user ID (user_2x...)
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  role: userRoleEnum("role").notNull().default("customer"),
  balance: numeric("balance", { precision: 12, scale: 2 }).notNull().default("0"),
  telegramId: text("telegramId"),
  notes: text("notes"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

// DELETE: sessions, accounts, verifications tables
```

**File: `src/app/api/webhooks/clerk/route.ts` (create)**
```typescript
import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { db } from '@/lib/db'
import { users } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET
  if (!WEBHOOK_SECRET) throw new Error('Missing CLERK_WEBHOOK_SECRET')

  const headerPayload = await headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  const body = await req.text()
  const wh = new Webhook(WEBHOOK_SECRET)
  const evt = wh.verify(body, {
    'svix-id': svix_id!,
    'svix-timestamp': svix_timestamp!,
    'svix-signature': svix_signature!,
  }) as { type: string; data: Record<string, unknown> }

  if (evt.type === 'user.created' || evt.type === 'user.updated') {
    const { id, first_name, last_name, email_addresses, public_metadata } = evt.data as any
    const email = email_addresses?.[0]?.email_address
    const name = [first_name, last_name].filter(Boolean).join(' ') || 'User'
    const role = public_metadata?.role ?? 'customer'

    await db.insert(users).values({
      id, name, email, role,
    }).onConflictDoUpdate({
      target: users.id,
      set: { name, email, role, updatedAt: new Date() },
    })
  }

  if (evt.type === 'user.deleted') {
    const { id } = evt.data as any
    // Soft delete or cascade — depends on business logic
    // For now, just log it
    console.log(`Clerk user deleted: ${id}`)
  }

  return new Response('OK', { status: 200 })
}
```

- [ ] Install svix: `pnpm add svix`
- [ ] Add `CLERK_WEBHOOK_SECRET` to `.env.local`
- [ ] Configure webhook in Clerk dashboard: URL = `{domain}/api/webhooks/clerk`, events: user.created, user.updated, user.deleted

**Seed script update (`src/lib/db/seed.ts`):**
- Replace `auth.api.signUpEmail()` with `clerk.users.createUser()` + direct DB insert
- Or: manually create users in Clerk dashboard, then seed business data only

---

### Phase 7: Cleanup — Remove Better Auth
**Effort:** 30min

**Steps:**
- [ ] `pnpm remove better-auth`
- [ ] Delete files:
  - `src/lib/auth/auth.ts`
  - `src/lib/auth/auth-client.ts`
  - `src/app/api/auth/[...all]/route.ts`
  - `src/proxy.ts`
  - `src/app/(auth)/login/page.tsx` (replaced by /sign-in)
- [ ] Remove from schema: sessions, accounts, verifications table exports
- [ ] Remove `NEXT_PUBLIC_APP_URL` env var (Clerk doesn't need it for auth)
- [ ] Clean up unused imports across all modified files
- [ ] Run `pnpm build` to verify no broken imports

**DB cleanup (run via psql or migration):**
```sql
DROP TABLE IF EXISTS "session" CASCADE;
DROP TABLE IF EXISTS "account" CASCADE;
DROP TABLE IF EXISTS "verification" CASCADE;
ALTER TABLE "user" DROP COLUMN IF EXISTS "emailVerified";
ALTER TABLE "user" DROP COLUMN IF EXISTS "image";
```

---

### Phase 8: Testing & Verification
**Effort:** 1h

**Manual test checklist:**
- [ ] Visit `/sign-in` — Clerk UI renders, shadcn theme applied
- [ ] Sign in with email/password — redirects to `/portal`
- [ ] Visit `/admin` as customer — redirects to `/unauthorized`
- [ ] Visit `/admin` as super_admin — renders admin shell with name + role
- [ ] Visit `/portal` as customer — shows dashboard with correct data
- [ ] Create customer from admin panel — user appears in Clerk + local DB
- [ ] Topup balance — wallet action works, adminId correct
- [ ] Create order — order action works
- [ ] Deliver order item — delivery action works
- [ ] Portal profile page — shows Clerk user data
- [ ] Sign out — clears session, redirects to home
- [ ] Webhook: create user in Clerk dashboard → appears in local DB
- [ ] Protected routes without session → redirect to /sign-in
- [ ] Public routes (/, /blog, /tools, /docs) — no auth overhead
- [ ] `pnpm build` — zero errors

---

## File Change Summary

| Action | Count | Files |
|--------|-------|-------|
| DELETE | 5 | auth.ts, auth-client.ts, proxy.ts, api/auth/[...all]/route.ts, login/page.tsx |
| CREATE | 4 | middleware.ts, sign-in page, sign-up page, webhook route |
| REWRITE | 2 | require-role.ts, auth-tables.ts |
| MODIFY | 15 | layout.tsx (root), globals.css, 4 server actions, 4 admin layouts, 6 portal pages |
| MODIFY (config) | 3 | .env.local, package.json (deps), seed.ts |

**Total: ~29 file changes**

## New Dependencies
- `@clerk/nextjs` — main SDK
- `@clerk/ui` — shadcn theme
- `svix` — webhook verification

## Removed Dependencies
- `better-auth` — entire package

---

## Risk Assessment

| Risk | Impact | Mitigation |
|------|--------|------------|
| Clerk user IDs differ from Better Auth IDs | HIGH — all FK references break | Pre-production, no real data. Fresh DB with Clerk IDs from start |
| Role not in Clerk metadata | HIGH — RBAC breaks | Set publicMetadata.role on user creation. Webhook syncs to local DB |
| Missing `await` on `auth()` | HIGH — runtime error | Grep audit after migration, TypeScript catches most |
| Webhook endpoint not public | MEDIUM — user sync fails | Add webhook URL to Clerk dashboard. Verify with svix test event |
| seed.ts breaks | LOW — dev tooling only | Update to use Clerk Backend API or manual creation |

## Decisions (2026-03-13)

1. **Sign-up:** Both — admin creates customers + customers can self-register via Clerk sign-up
2. **DB:** Fresh DB. Drop all existing data, start clean with Clerk IDs
3. **Social login:** Enable Google + Facebook OAuth in Clerk dashboard
4. **MFA:** Enable for all accounts (Clerk built-in, toggle in dashboard)
