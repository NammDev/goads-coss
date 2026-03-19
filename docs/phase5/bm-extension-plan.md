# BM Extension — Implementation Plan

> Goal: Chrome extension for BM invite — content script overlay on Facebook, GoAds auth, portal integration.

---

## Current State

Extension at `/extension/` — vanilla JS, content script overlay injected into Facebook pages.

**Architecture:** Click extension icon → inject overlay UI → FB cookie auth → detect BM → send invite.

**Files:**
```
extension/
├── manifest.json          # MV3, no popup (content script injection)
├── background.js          # Service worker: token fetch, BM detect, invite API, inject trigger
├── content.js             # Overlay UI: form, auth flow, status pills
├── content.css            # Scoped styles (goads- prefix, no FB conflict)
├── popup.html/popup.js    # Legacy (unused, kept for reference)
├── icon48.png
└── icon128.png
```

---

## Phase Overview

| # | Phase | Priority | Status | Scope |
|---|-------|----------|--------|-------|
| 0 | Setup | — | ✅ Done | Rename folder, project structure |
| 1 | UI/UX redesign | High | ✅ Done | Content script overlay, GoAds design, dark mode, email gen |
| 2 | Auth integration | Critical | ✅ Done | API token auth, DB, extension auth screen |
| 3 | Portal wiring | Medium | ✅ Done | Token management UI in portal |

---

## Phase 1 — UI/UX Redesign ✅

### Completed
- [x] Switched from popup to **content script overlay** (persists on page, not lost on click)
- [x] GoAds oklch color tokens
- [x] 2-column layout (form + sidebar) — 660px width, like easyme.pro reference
- [x] Dark mode toggle (footer, system preference default)
- [x] Step-by-step loading UI (4 steps with progress bar + percentage)
- [x] Email generation: random `@cvlmail.net` + "Open Mail" button
- [x] Role dropdown (Admin / Employee)
- [x] Status pills (Token: Valid, BM: ID)
- [x] Notes card in sidebar
- [x] GoAds branding header + footer with Telegram link
- [x] Backdrop overlay + close on Escape/backdrop click
- [x] Toggle show/hide on extension icon re-click
- [x] "Open Mail ↗" link in success alert for cvlmail.net emails

### Key Decisions
- **Content script over popup**: UI stays on page when user interacts with FB
- **No BM list**: Auto-detect BM from current tab (simpler than v9.5's full list)
- **Vanilla JS**: Kept for simplicity, no build step needed
- **CSS scoped**: All classes prefixed `goads-` to avoid Facebook CSS conflicts

---

## Phase 2 — Auth Integration 🔄

### Completed (Backend)
- [x] DB schema: `extension_token` table (`extension-tables.ts`)
- [x] API: `POST /api/extension/token` — generate token (customer only, 90-day expiry)
- [x] API: `POST /api/extension/auth` — validate token (public, no Clerk needed)
- [x] API: `GET /api/extension/token` — get token status
- [x] API: `DELETE /api/extension/token/[id]` — revoke token
- [x] Middleware: `/api/extension/auth` added to public routes
- [x] CORS helper: `cors.ts` with `corsHeaders()`, `jsonResponse()`, `handleOptions()`
- [x] Migration SQL generated (`drizzle/0001_fresh_the_call.sql`)

### Pending
- [x] DB migration: Run SQL in Supabase
- [x] Task 4: Portal token management UI
- [x] Task 5: Extension auth screen in content.js

### Files Created/Modified
```
NEW:  app/src/lib/db/schema/extension-tables.ts
NEW:  app/src/app/api/extension/cors.ts
NEW:  app/src/app/api/extension/token/route.ts
NEW:  app/src/app/api/extension/auth/route.ts
NEW:  app/src/app/api/extension/token/[id]/route.ts
MOD:  app/src/lib/db/schema/index.ts (added extension-tables export)
MOD:  app/src/middleware.ts (added /api/extension/auth to public routes)
MOD:  app/drizzle.config.ts (changed .env → .env.local)
```

### Auth Flow
```
Portal: Customer generates token → copies
Extension: Paste token → POST /api/extension/auth → validate → store in chrome.storage
On next open: auto-validate stored token
```

---

## Phase 3 — Portal Wiring ⏳

### Planned
- [ ] Update `/portal/tools/extensions` page with token management
- [ ] Generate/copy/revoke token UI
- [ ] Show token status (active/expired/none)
- [ ] Show `lastUsedAt` timestamp
- [ ] Keep existing download + installation guide

---

## Answered Questions

| Question | Answer |
|----------|--------|
| Vanilla JS or migrate? | Vanilla JS — keep simple |
| Token expiry? | 90 days |
| Extension show GoAds DB items? | No — extension is FB-only, no GoAds DB connection |
| Popup or content script? | Content script overlay (persists on page) |
| BM list or auto-detect? | Auto-detect from current tab (simpler) |
