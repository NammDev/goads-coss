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

## Pre-WT: Dashboard Shell Overhaul (on main)
→ [phase-00-dashboard-shell-overhaul.md](./phase-00-dashboard-shell-overhaul.md)

**MUST complete before creating worktrees.** Shell = foundation for all WTs.

**Source:** [shadcn-dashboard-landing-template](https://github.com/shadcnstore/shadcn-dashboard-landing-template) — pixel-perfect port of shell components.

| Step | Task | Scope |
|------|------|-------|
| 0 | Clone template locally | `/tmp/shadcn-dashboard-template` |
| 1 | Port layout shell | `app-sidebar`, `site-header`, `site-footer`, `nav-main`, `nav-user`, dashboard layout |
| 2 | Adapt nav data | Convert GoAds admin/portal nav to template format |
| 3 | Wire GoAds data | Search, notifications, Clerk user, real DB stats |
| 4 | Port stats cards | 4-card grid with icon, value, growth badge |
| 5 | Verify & clean up | Build check, dark mode, responsive, delete old components |
| 6 | Push main | All WTs fetch main before starting |

**Files to DELETE:** `admin-shell.tsx`, `portal-shell.tsx`, `dashboard-sidebar.tsx`, `dashboard-header.tsx`, `dashboard-breadcrumb.tsx`
**Files to CREATE:** `app-sidebar.tsx`, `nav-main.tsx`, `nav-user.tsx`, `site-header.tsx`, `site-footer.tsx`, `command-search.tsx`

**After done:** push main → all WTs (including wt-d máy khác) fetch main mới trước khi bắt đầu.

---

## Worktree Strategy

4 parallel worktrees, no file overlap. **Start AFTER shell overhaul merged to main.**

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
Pre-WT (shell)  ──ON MAIN── must finish first
                            ↓ push main
WT-A (auth)     ──NO DEPS── start after shell merged
WT-B (logic)    ──NO DEPS── start after shell merged
WT-C (nav)      ──NO DEPS── start after shell merged
WT-D (UI)       ──NO DEPS── start after shell merged (máy khác fetch main)

All WTs merged  ──BLOCKS──→ Final QA + Roadmap update
```

---

## Post-Merge

After all 4 WTs merged:
1. Update `docs/development-roadmap.md` (renumber phases)
2. Full E2E manual test (admin + customer flows)
3. Vercel production deploy
