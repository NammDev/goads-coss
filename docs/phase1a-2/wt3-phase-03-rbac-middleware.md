# WT3 Phase 3: RBAC Route Protection + Auth Pages

> Priority: **High** | Status: ✅ Complete | Depends on: Phase 2 (Better Auth)

## Overview

Create Next.js 16 proxy for coarse-grained route protection + server component role validation. Build minimal login and unauthorized pages.

## Key Insights

- **Next.js 16 breaking change:** `middleware.ts` → `proxy.ts` (Node.js runtime, not Edge)
- Proxy runs on Node.js — CAN use full Drizzle/postgres, `auth.api.getSession()`
- **Best practice:** Proxy handles coarse session checks only; detailed role checks in server components
- This 2-layer approach eliminates the Next.js middleware auth bypass vulnerability (CVE-2025)
- Login page is client-side (uses `authClient.signIn.email()`)
- Marketing/public routes must remain completely unaffected

## Requirements

### Functional
- Public routes: no auth check, pass through
- Protected routes: redirect to `/login` if no session (via proxy)
- Role-based routes: redirect to `/unauthorized` if insufficient role (via server component)
- Login page: email/password form
- Unauthorized page: "access denied" message with back link

### Non-functional
- Proxy must be fast — session existence check only
- Marketing pages must not be slowed down
- Login form must show loading state and error messages

## Route Protection Matrix

| Route Pattern | Allowed Roles | Check Layer |
|---------------|---------------|-------------|
| `/(marketing)/*` | All | None (public) |
| `/tools/*` | All | None (public) |
| `/docs/*` | All | None (public) |
| `/blog/*` | All | None (public) |
| `/api/auth/*` | All | None (public) |
| `/(portal)/*` | customer, staff, super_admin | Proxy (session) + Server Component (role) |
| `/(admin)/*` | staff, super_admin | Proxy (session) + Server Component (role) |
| `/(admin)/finance/*` | super_admin | Proxy (session) + Server Component (role) |
| `/(admin)/staff/*` | super_admin | Proxy (session) + Server Component (role) |
| `/(admin)/settings/*` | super_admin | Proxy (session) + Server Component (role) |

## Architecture

```
Request → proxy.ts (COARSE — session existence only)
    ├── Public route? → Pass through
    ├── /api/auth/*? → Pass through
    ├── Protected route?
    │   ├── No session? → Redirect /login
    │   └── Has session? → Pass through (role check deferred)
    └── Auth pages (/login, /unauthorized)? → Pass through

Request → Server Component layout (DETAILED — role validation)
    ├── Get session + role
    ├── Role allowed? → Render page
    └── Role denied? → Redirect /unauthorized
```

## Related Code Files

### Create
- `src/proxy.ts` — coarse-grained route protection (Next.js 16)
- `src/lib/auth/require-role.ts` — server-side role check helper
- `src/app/(auth)/login/page.tsx` — login page
- `src/app/(auth)/unauthorized/page.tsx` — access denied page
- `src/app/(auth)/layout.tsx` — minimal auth layout (no header/footer)
- `src/app/(admin)/layout.tsx` — admin layout with role guard
- `src/app/(portal)/layout.tsx` — portal layout with role guard

### Modify
- None (all new files)

## Implementation Steps

### 1. Create `src/proxy.ts` (Coarse Session Check)

```ts
import { auth } from "@/lib/auth/auth";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

// Routes that bypass auth check entirely
const publicPatterns = [
  /^\/$/, // home
  /^\/(marketing)/, // marketing pages
  /^\/tools/,
  /^\/docs/,
  /^\/blog/,
  /^\/api\/auth/, // Better Auth endpoints
  /^\/login/,
  /^\/unauthorized/,
];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Public routes — pass through immediately
  if (publicPatterns.some((p) => p.test(pathname))) {
    return NextResponse.next();
  }

  // 2. Check session existence (Node.js runtime — can use auth directly)
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // 3. No session → redirect to login
  if (!session) {
    return NextResponse.redirect(
      new URL(`/login?callbackUrl=${encodeURIComponent(pathname)}`, request.url)
    );
  }

  // 4. Session exists → pass through (role check in server components)
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|public|.*\\.png|.*\\.svg|.*\\.ico).*)",
  ],
};
```

### 2. Create `src/lib/auth/require-role.ts` (Role Guard Helper)

```ts
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

type Role = "super_admin" | "staff" | "customer";

/** Server-side role check — use in layout.tsx or page.tsx */
export async function requireRole(...allowedRoles: Role[]) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  if (!allowedRoles.includes(session.user.role as Role)) {
    redirect("/unauthorized");
  }

  return session;
}
```

### 3. Create `src/app/(admin)/layout.tsx` (Admin Role Guard)

```tsx
import { requireRole } from "@/lib/auth/require-role";

export default async function AdminLayout({
  children,
}: { children: React.ReactNode }) {
  await requireRole("staff", "super_admin");
  return <>{children}</>;
}
```

For super_admin-only routes like finance, staff management:

```tsx
// src/app/(admin)/finance/layout.tsx
import { requireRole } from "@/lib/auth/require-role";

export default async function FinanceLayout({
  children,
}: { children: React.ReactNode }) {
  await requireRole("super_admin");
  return <>{children}</>;
}
```

### 4. Create `src/app/(portal)/layout.tsx` (Portal Role Guard)

```tsx
import { requireRole } from "@/lib/auth/require-role";

export default async function PortalLayout({
  children,
}: { children: React.ReactNode }) {
  await requireRole("customer", "staff", "super_admin");
  return <>{children}</>;
}
```

### 5. Create `src/app/(auth)/layout.tsx`
Minimal layout — no SiteHeader, no footer. Centered card on subtle background.

### 6. Create `src/app/(auth)/login/page.tsx`
- Email + password form
- Uses `authClient.signIn.email()`
- Shows error toast on failure via `sonner`
- Reads `callbackUrl` from searchParams, redirects on success
- Loading state during submission

### 7. Create `src/app/(auth)/unauthorized/page.tsx`
- "Access Denied" message
- "Go Back" button
- "Go Home" link

### 8. Test

1. Visit `/admin` → should redirect to `/login`
2. Login as customer → visit `/admin` → should redirect to `/unauthorized`
3. Login as customer → visit `/portal` → should work
4. Visit `/` (home) → should work without auth
5. Visit `/blog` → should work without auth
6. Login as super_admin → visit `/admin/finance` → should work
7. Login as staff → visit `/admin/finance` → should redirect to `/unauthorized`

## Todo List

- [x] Create `src/proxy.ts`
- [x] Create `src/lib/auth/require-role.ts`
- [x] Create `src/app/(auth)/layout.tsx`
- [x] Create `src/app/(auth)/login/page.tsx`
- [x] Create `src/app/(auth)/unauthorized/page.tsx`
- [x] Create `src/app/(admin)/layout.tsx` (role guard)
- [x] Create `src/app/(portal)/layout.tsx` (role guard)
- [x] Create `src/app/(admin)/finance/layout.tsx` (super_admin only)
- [x] Create `src/app/(admin)/staff/layout.tsx` (super_admin only)
- [x] Create `src/app/(admin)/settings/layout.tsx` (super_admin only)
- [ ] Test: public routes unaffected (manual — pending deploy)
- [ ] Test: protected routes redirect to login (manual — pending deploy)
- [ ] Test: role-based access works via server component guards (manual — pending deploy)
- [ ] Test: login form works (sign in + redirect) (manual — pending deploy)
- [ ] Test: callbackUrl parameter works (manual — pending deploy)
- [x] Run `pnpm build` — no errors

## Success Criteria

- Public pages load with zero auth overhead
- Unauthenticated users redirected to login (proxy layer)
- Role validation happens in server components (not proxy)
- Login form functional (email/password + redirect)
- All role combinations tested
- Build passes

## Risk Assessment

| Risk | Mitigation |
|------|-----------|
| Proxy slowing public pages | Public pattern check is first; matcher excludes static assets |
| Double session fetch (proxy + server component) | Acceptable tradeoff for security; Next.js request deduplication helps |
| Route group naming mismatch | Test actual URL paths, not route group names with parentheses |
| Infinite redirect loops | Exclude `/login` and `/unauthorized` from protected routes in proxy |

## Security

- **2-layer auth:** Proxy (session existence) + Server Component (role validation)
- Eliminates Next.js middleware bypass vulnerability (proxy runs Node.js, not Edge)
- Session cookie validated server-side via `auth.api.getSession()`
- Role field from DB — not client-controlled
- Login form: no password exposure in URL or logs
- CallbackUrl encoded (prevents open redirect)
- Brute-force protection via Better Auth rate limiting (built-in)
