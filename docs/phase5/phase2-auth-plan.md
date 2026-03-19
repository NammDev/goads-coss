# Phase 2 — Extension Auth Integration

> Goal: Customers authenticate extension with GoAds portal via API token. Token valid 90 days, revocable.

---

## Overview

| Item | Detail |
|------|--------|
| Priority | Critical |
| Status | ⏳ Not started |
| Dependencies | Phase 1 ✅ (UI/UX done), GoAds app running |
| Branch | `feature/bm-extension` |

---

## Auth Flow

```
Portal                          Extension                      API
  │                                │                             │
  │ 1. Customer clicks             │                             │
  │    "Generate Token"            │                             │
  │────────────────────────────►   │                             │
  │    POST /api/extension/token   │                             │
  │                                │                             │
  │ 2. Shows token + copy btn      │                             │
  │    (token shown ONCE)          │                             │
  │                                │                             │
  │                                │ 3. User pastes token        │
  │                                │    into extension            │
  │                                │                             │
  │                                │ 4. Extension validates      │
  │                                │────────────────────────────►│
  │                                │  POST /api/extension/auth   │
  │                                │                             │
  │                                │ 5. { valid, user }          │
  │                                │◄────────────────────────────│
  │                                │                             │
  │                                │ 6. Store token in           │
  │                                │    chrome.storage.local     │
```

---

## Tasks

| # | Task | Priority | Files | Est |
|---|------|----------|-------|-----|
| 1 | DB: `extension_token` table | Critical | `schema/extension-tables.ts`, `db/index.ts` | S |
| 2 | API: Token generate endpoint | Critical | `api/extension/token/route.ts` | S |
| 3 | API: Token validate endpoint | Critical | `api/extension/auth/route.ts` | S |
| 4 | Portal: Token management UI | Critical | `portal/tools/extensions/page.tsx` | M |
| 5 | Extension: Auth screen + flow | Critical | `content.js`, `content.css`, `background.js` | M |
| 6 | API: Token revoke endpoint | High | `api/extension/token/[id]/route.ts` | S |
| 7 | Middleware: Protect extension API | High | `middleware.ts` | S |

S = Small (<30 LOC), M = Medium (30-100 LOC)

---

## Task 1 — DB: `extension_token` Table

### Schema

```ts
// app/src/lib/db/schema/extension-tables.ts
export const extensionToken = pgTable("extension_token", {
  id: text("id").primaryKey().$defaultFn(() => createId()),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  token: text("token").notNull().unique(),       // crypto.randomUUID() or nanoid
  name: text("name").default("Default"),          // optional label
  lastUsedAt: timestamp("last_used_at"),
  expiresAt: timestamp("expires_at").notNull(),   // 90 days from creation
  isRevoked: boolean("is_revoked").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});
```

### Files
- CREATE: `app/src/lib/db/schema/extension-tables.ts`
- MODIFY: `app/src/lib/db/index.ts` — export new table

---

## Task 2 — API: Token Generate

### Endpoint
`POST /api/extension/token`

### Logic
1. `requireRole("customer")` — only customers can generate
2. Check if user already has active (non-revoked, non-expired) token
3. If yes → revoke old one
4. Generate new token: `crypto.randomBytes(32).toString("hex")`
5. Insert into `extension_token` with `expiresAt = now + 90 days`
6. Return `{ token, expiresAt }` — token shown ONCE, never retrievable again

### Files
- CREATE: `app/src/app/api/extension/token/route.ts`

---

## Task 3 — API: Token Validate

### Endpoint
`POST /api/extension/auth`

### Logic
1. Receive `{ token }` in body
2. Look up token in DB — check not revoked, not expired
3. Update `lastUsedAt`
4. Return `{ valid: true, user: { id, name, email } }` or `{ valid: false, error }`
5. NO Clerk session needed — token IS the auth

### Headers
- CORS: Allow extension origin (`chrome-extension://*`)
- No rate limit initially (add in Phase 3 if needed)

### Files
- CREATE: `app/src/app/api/extension/auth/route.ts`

---

## Task 4 — Portal: Token Management UI

### Update `/portal/tools/extensions` page

**Current state:** Static card with download button (no handler)

**New UI:**
- "Generate Token" button → calls POST /api/extension/token
- Show token ONCE in a modal with copy button
- Show token status: Active / Expired / None
- Show `lastUsedAt` timestamp
- "Revoke Token" button (destructive action, confirm dialog)
- Keep existing download + installation guide

### Server Actions
- `generateExtensionToken()` — create token
- `revokeExtensionToken(id)` — soft delete
- `getExtensionTokenStatus(userId)` — check current status

### Files
- MODIFY: `app/src/app/portal/tools/extensions/page.tsx`
- CREATE: `app/src/lib/actions/extension-actions.ts`
- CREATE: `app/src/lib/db/queries/extension-queries.ts`

---

## Task 5 — Extension: Auth Screen + Flow

### New screens in content.js overlay

**Login screen** (shown when no token stored):
- Token input field
- "Connect" button → validate via API
- Link to portal: "Get your token at goads.shop/portal"

**Connected state** (shown in sidebar):
- User name from API response
- "Connected" pill (green)
- "Disconnect" button → clear chrome.storage

### Flow
1. On extension init: check `chrome.storage.local` for `goads_token`
2. If found → validate via POST /api/extension/auth
3. If valid → show main UI with user info
4. If invalid/expired → show login screen
5. If no token → show login screen

### Files
- MODIFY: `extension/content.js` — add auth screen + flow
- MODIFY: `extension/content.css` — auth screen styles
- MODIFY: `extension/background.js` — add `validateToken` handler

---

## Task 6 — API: Token Revoke

### Endpoint
`DELETE /api/extension/token/[id]`

### Logic
1. `requireRole("customer")` — only token owner can revoke
2. Set `isRevoked = true`
3. Return `{ success: true }`

### Files
- CREATE: `app/src/app/api/extension/token/[id]/route.ts`

---

## Task 7 — Middleware: Protect Extension API

### Update `middleware.ts`
- Add `/api/extension/*` routes as public (no Clerk session required)
- Extension auth uses token, not Clerk session
- Keep `/api/webhooks/*` public as before

### CORS Headers
- Allow `chrome-extension://*` origin
- Allow `Content-Type: application/json`

### Files
- MODIFY: `app/src/middleware.ts`
- CREATE: `app/src/app/api/extension/cors.ts` — shared CORS helper

---

## Execution Order

```
Task 1 (DB schema)
  ↓
Task 2 + 3 (API endpoints) — parallel
  ↓
Task 7 (Middleware)
  ↓
Task 4 (Portal UI)
  ↓
Task 5 (Extension auth)
  ↓
Task 6 (Revoke endpoint)
```

---

## Security Considerations

- Token is a random 64-char hex string — no JWT, no payload to decode
- Token stored hashed in DB? → No, plaintext is fine for v1 (not a password)
- CORS restricted to extension + goads.shop origins
- Rate limiting on `/api/extension/auth` — defer to Phase 3
- Token expiry: 90 days, auto-revoke on new token generation
- No sensitive data returned from API (no credentials, no invite links)

---

## Success Criteria

- [ ] Customer can generate token from portal
- [ ] Token shown once, copyable
- [ ] Extension shows login screen when no token
- [ ] Extension validates token and shows user info
- [ ] Token revocation works from portal
- [ ] Expired tokens are rejected
- [ ] Extension works after browser restart (token persisted)
