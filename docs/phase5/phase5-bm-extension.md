# Phase 5 — BM Extension ✅

> Chrome extension for BM invite on Facebook with GoAds token auth and portal integration.

## Status: All Complete


| #   | Phase                                  | Status |
| --- | -------------------------------------- | ------ |
| 0   | Setup                                  | ✅      |
| 1   | UI/UX redesign                         | ✅      |
| 2   | Auth integration (backend + extension) | ✅      |
| 3   | Portal wiring (token management UI)    | ✅      |


---

## What Was Done

### Phase 0 — Setup

- Created `/extension/` folder with MV3 Chrome extension structure

### Phase 1 — UI/UX Redesign

- Content script overlay (not popup) — persists when user interacts with FB
- 660px 2-column layout: form + sidebar
- 4-step loading UI with progress bar
- Random `@cvlmail.net` email generation + "Open Mail" button
- GoAds branding, scoped CSS (`goads-` prefix), backdrop + Escape close

### Phase 2 — Auth Integration

- **DB**: `extension_token` table (90-day expiry, auto-revoke on regenerate)
- **API generate** (`POST /api/extension/token`): Clerk-protected, customer only
- **API validate** (`POST /api/extension/auth`): public (no Clerk), returns user info
- **API revoke** (`DELETE /api/extension/token/[id]`): customer only, soft delete
- **API status** (`GET /api/extension/token`): returns active token info
- **CORS**: `cors.ts` helper, allows all origins for extension access
- **Middleware**: `/api/extension/auth` added to public routes
- **Extension auth screen**: login form, token validation, connected state in sidebar, disconnect
- **Background handlers**: `validateGoAdsToken`, `getStoredAuth`, `clearAuth` with offline fallback
- **DB migration**: ran in Supabase SQL Editor (idempotent script)

### Phase 3 — Portal Token Management UI

- Server component page fetches token status on load
- Client component `ExtensionTokenCard`: generate/copy/revoke with toast notifications
- Token shown once with amber warning + copy button
- Active/No Token badge, created/expires/lastUsed display
- Revoke confirmation dialog
- Existing download + install guide preserved

---

## Files

### Extension (`/extension/`)


| File            | Purpose                                            |
| --------------- | -------------------------------------------------- |
| `manifest.json` | MV3, FB + GoAds host permissions                   |
| `background.js` | FB tokens, BM detect, invite API, GoAds auth       |
| `content.js`    | Overlay: auth screen, invite form, loading, status |
| `content.css`   | Scoped styles, auth screen, sidebar user info      |


### Portal (Next.js)


| File                                               | Purpose                          |
| -------------------------------------------------- | -------------------------------- |
| `api/extension/token/route.ts`                     | Generate + status endpoints      |
| `api/extension/auth/route.ts`                      | Validate token (public)          |
| `api/extension/token/[id]/route.ts`                | Revoke endpoint                  |
| `api/extension/cors.ts`                            | CORS helper                      |
| `portal/tools/extensions/page.tsx`                 | Server component, fetches status |
| `portal/tools/extensions/extension-token-card.tsx` | Token mgmt UI (client)           |
| `lib/actions/extension-actions.ts`                 | Server actions                   |
| `lib/db/schema/extension-tables.ts`                | DB schema                        |


---

## Manual UI Testing

### 1. Portal — Token Management

1. Login as customer at `goads.shop/portal/tools/extensions`
2. Click **"Generate Token"** → token appears with copy button + amber warning
3. Copy token (verify clipboard has 64-char hex string)
4. Refresh page → status shows Active, created/expires dates
5. Click **"Revoke"** → confirm dialog → badge shows "No Token"
6. Click **"Regenerate Token"** → old token revoked, new one shown

### 2. Extension — Auth Flow

1. Load extension: `chrome://extensions` → Developer mode → Load unpacked → `/extension/`
2. Open `business.facebook.com` (must be logged in to FB)
3. Click extension icon → overlay shows **auth screen** (🔑 Connect to GoAds)
4. Paste invalid token → error "Invalid token"
5. Paste valid token from portal → proceeds to FB init loading
6. Close + reopen overlay → auto-validates stored token (no login screen)
7. Click **"Disconnect"** in sidebar → returns to auth screen

### 3. Extension — BM Invite (after auth)

1. Open a Business Manager page on `business.facebook.com`
2. Click extension icon → loading steps (cookie → tokens → verify → detect BM)
3. BM detected → main form with BM ID in status pill
4. Generate email → `@cvlmail.net` auto-filled
5. Click **"Send Invite"** → success alert with "Open Mail" link

### 4. Edge Cases

- Revoke token from portal → extension shows auth screen on next open
- Expired token → extension shows auth screen
- No FB login → error "Not logged in to Facebook"
- No BM page open → BM pill "Not detected" (yellow)
- Browser restart → token persists (chrome.storage)

