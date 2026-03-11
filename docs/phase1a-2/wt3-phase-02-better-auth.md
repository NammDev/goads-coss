# WT3 Phase 2: Better Auth Integration

> Priority: **Critical** | Status: ✅ Complete | Depends on: Phase 1 (DB Setup)

## Overview

Configure Better Auth with Drizzle adapter for email/password authentication. Setup server config, client helpers, and API route handler.

## Key Insights

- Better Auth uses Drizzle adapter to read/write auth tables directly
- Server config (`auth.ts`) defines providers, plugins, and database connection
- Client config (`auth-client.ts`) provides React hooks for sign-in/sign-up/session
- API handler catches all `/api/auth/*` requests
- `nextCookies()` plugin needed for server-side session access in Next.js
- Custom `role` field added to user via `additionalFields` in Better Auth config

## Requirements

### Functional
- Email/password sign-up and sign-in
- Session management (cookie-based)
- Server-side session access (for middleware + server components)
- Client-side auth hooks (for login forms)
- Custom `role` field on user (default: `customer`)
- `telegramId` and `notes` fields on user

### Non-functional
- Session persists across page reloads
- Secure cookies (httpOnly, sameSite)
- Type-safe auth API on both server and client

## Architecture

```
Browser (Client)
    ↕ auth-client.ts (useSession, signIn, signUp, signOut)
    ↕ fetch /api/auth/*
API Route Handler (route.ts)
    ↕ auth.ts (Better Auth server instance)
    ↕ Drizzle adapter
    ↕ Supabase PostgreSQL
```

## Related Code Files

### Create
- `src/lib/auth/auth.ts` — server-side Better Auth config
- `src/lib/auth/auth-client.ts` — client-side auth helpers
- `src/app/api/auth/[...all]/route.ts` — API catch-all handler

### Modify
- `.env.local` — add BETTER_AUTH_SECRET, BETTER_AUTH_URL

## Implementation Steps

### 1. Add Environment Variables
```env
# .env.local (DO NOT commit)
BETTER_AUTH_SECRET="generate-a-32-char-random-string"
BETTER_AUTH_URL="http://localhost:3000"  # production: https://www.goads.shop
```

Generate secret: `openssl rand -base64 32`

### 2. Create `src/lib/auth/auth.ts`
```ts
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { db } from "@/lib/db";
import * as schema from "@/lib/db/schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "customer",
        input: false, // not settable by user during sign-up
      },
      telegramId: {
        type: "string",
        required: false,
        input: false,
      },
      notes: {
        type: "string",
        required: false,
        input: false,
      },
    },
  },
  plugins: [nextCookies()],
});

// Export type for client usage
export type Session = typeof auth.$Infer.Session;
```

### 3. Create `src/lib/auth/auth-client.ts`
```ts
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
});

export const {
  signIn,
  signUp,
  signOut,
  useSession,
  getSession,
} = authClient;
```

### 4. Create `src/app/api/auth/[...all]/route.ts`
```ts
import { auth } from "@/lib/auth/auth";
import { toNextJsHandler } from "better-auth/next-js";

export const { GET, POST } = toNextJsHandler(auth);
```

### 5. Add Public Environment Variable
Add to `.env.local`:
```env
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 6. Verify Auth Endpoints
Start dev server and test:
- `GET /api/auth/get-session` — should return null (no session)
- `POST /api/auth/sign-up/email` — create test account
- `POST /api/auth/sign-in/email` — login
- `GET /api/auth/get-session` — should return session + user

## Todo List

- [x] Add BETTER_AUTH_SECRET to `.env.local`
- [x] Add BETTER_AUTH_URL to `.env.local`
- [x] Add NEXT_PUBLIC_APP_URL to `.env.local`
- [x] Create `src/lib/auth/auth.ts` (server config)
- [x] Create `src/lib/auth/auth-client.ts` (client helpers)
- [x] Create `src/app/api/auth/[...all]/route.ts` (API handler)
- [x] Run `pnpm dev` — verify no compile errors
- [x] Test sign-up endpoint via curl/Postman
- [x] Test sign-in endpoint
- [x] Test get-session endpoint
- [x] Verify user record in Supabase dashboard with role='customer'
- [x] Run `pnpm build` — no errors

## Success Criteria

- Sign-up creates user in DB with role='customer'
- Sign-in returns session cookie
- get-session returns user data with role field
- Sign-out clears session
- Build passes

## Risk Assessment

| Risk | Mitigation |
|------|-----------|
| Better Auth schema mismatch with Drizzle | Use same schema file for both — single source of truth |
| Cookie not persisting | Ensure `nextCookies()` plugin is added |
| CORS issues in dev | BETTER_AUTH_URL must match dev server URL |

## Security

- BETTER_AUTH_SECRET must be strong (32+ chars, random)
- Passwords auto-hashed by Better Auth (bcrypt)
- Session cookies: httpOnly, secure (in production), sameSite=lax
- Role field `input: false` — users cannot self-assign roles
- Never expose BETTER_AUTH_SECRET to client
