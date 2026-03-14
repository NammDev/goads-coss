---
status: pending
created: 2026-03-14
branch: main
---

# Phase 3 — Polish & Launch-Ready

> Goal: Fix all bugs, polish UI/UX, make app production-ready before market launch.

**Current Phase 3 (Extension/Community) → renamed Phase 4**
**Current Phase 4 (Growth/AI) → renamed Phase 5**

---

## Worktree Strategy

4 parallel worktrees, no file overlap.

### WT-A: `auth-bugs` (Code + Clerk config)

| # | Issue | Priority |
|---|-------|----------|
| 1 | Vercel deploy not showing code | Critical |
| 2 | Sign In button links `/auth/login` → `/sign-in` | Critical |
| 3 | Webhook: sync role to Clerk publicMetadata | Critical |
| 4 | Username+password login, email optional, keep Google | Critical |

**File ownership:** `site-header.tsx`, `api/webhooks/clerk/*`, `middleware.ts`, `require-role.ts`, `(auth)/*`

### WT-B: `portal-logic` (Code-heavy — DB, actions, queries)

| # | Issue | Priority |
|---|-------|----------|
| 6 | Order number: add serial `order_number` column + display `#001` | High |
| 10 | Toast audit: ensure all server actions have toast feedback | Medium |
| 11 | Error messages: balance=0, failed actions → clear actionable text | Medium |

**File ownership:** `lib/db/schema/order-tables.ts`, `lib/db/queries/order-queries.ts`, `lib/actions/*`, `notification-actions.ts`, `dropdown-notification.tsx`

### WT-C: `portal-nav` (Code + UI mix)

| # | Issue | Priority |
|---|-------|----------|
| 8 | Products: horizontal tab bar instead of sidebar collapsible | High |
| 9 | Tools: split into "Popular Tools" + "All Tools" sections | High |

**File ownership:** `data/portal-nav.ts`, `portal/products/[type]/page.tsx`, `portal/products/page.tsx`, `portal/tools/page.tsx`, sidebar nav components

### WT-D: `portal-ui` (Thuần UI — máy khác, chỉ JSX/CSS)

| # | Issue | Priority |
|---|-------|----------|
| 5 | Shop: remove hero, redesign cards, add Telegram "Questions?" button | High |
| 6 | Orders: match Products-style UI (layout/table style only, NOT order_number logic) | High |

**File ownership:** `portal/page.tsx` (Shop), `portal/orders/portal-orders-table.tsx`, product card components, CSS/Tailwind only

**WT-D rules:**
- NO DB schema, server actions, queries, middleware, auth changes
- Only JSX, Tailwind classes, layout, component structure
- Order number display (#001) will come from WT-B — WT-D just styles the table

---

## Dependencies

```
WT-A (auth)     ──NO DEPS── start immediately
WT-B (logic)    ──NO DEPS── start immediately
WT-C (nav)      ──NO DEPS── start immediately
WT-D (UI)       ──NO DEPS── start immediately (máy khác)

All WTs merged  ──BLOCKS──→ Final QA + Roadmap update
```

---

## Post-Merge

After all 4 WTs merged:
1. Update `docs/development-roadmap.md` (renumber phases)
2. Full E2E manual test (admin + customer flows)
3. Vercel production deploy
