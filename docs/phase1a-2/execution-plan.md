# Phase 1A + 2 Execution Plan

> Worktree-based parallel execution across 3 rounds.

---

## Round 1 — 4 Worktrees (Parallel)

### WT1: Mobile Responsive + Cart Fix

- **Branch:** `phase-1a/responsive-mobile`
- **Scope:** Mobile responsive audit + cart mobile UI fix
- **Breakpoints:** 375px, 768px, 1024px, 1440px
- **File ownership:** Existing page layouts, responsive CSS, cart components
- **Tasks:**
  - [ ] Audit all marketing pages at all breakpoints
  - [ ] Fix layout breaks, overflow, spacing
  - [ ] Fix cart UI/UX on mobile viewports
  - [ ] Test navigation + search modal on mobile

### WT2: Dark Mode + Lighthouse ✅ DONE

- **Branch:** `phase-1a/dark` (actual branch name)
- **Scope:** Dark mode audit + Lighthouse performance/accessibility
- **File ownership:** Theme CSS, color tokens, image optimization, a11y
- **Status:** Completed — 18 files modified across 5 phases
- **Results:** Lighthouse A11y 100, BP 96-100, SEO 100
- **Tasks:**
  - [x] Audit all pages in dark mode
  - [x] Fix contrast, missing dark variants, border visibility
  - [x] Run Lighthouse on key pages (home, about, blog)
  - [x] Fix performance issues (image sizes, lazy loading, CLS)
  - [x] Fix accessibility issues (aria labels, focus states, color contrast)
  - [x] Target: Lighthouse > 90 on all categories

### WT3: Auth Infrastructure

- **Branch:** `phase-2a/auth-infra`
- **Scope:** PostgreSQL + Better Auth + RBAC middleware
- **File ownership:** `lib/auth/*`, `lib/db/*`, `middleware.ts`, DB config, env
- **Tasks:**
  - [ ] PostgreSQL schema (users, orders, products, delivered_items)
  - [ ] Better Auth setup (email/password)
  - [ ] RBAC: super_admin, staff, customer roles
  - [ ] Auth middleware for route protection
  - [ ] Seed super_admin accounts (nammdev, justin)
  - [ ] Sensitive field encryption (BM ID, invite links)

### WT4: Dashboard UI/UX Design

- **Branch:** `phase-2/dashboard-design`
- **Scope:** Research + wireframes + component selection (docs only, no code)
- **File ownership:** Design docs in `docs/phase1a-2/`
- **Output:**
  - [ ] Admin panel layout (sidebar? top nav? structure)
  - [ ] Customer portal layout
  - [ ] Component inventory (tables, forms, charts, status badges)
  - [ ] shadcn blocks selection for admin + portal
  - [ ] Color/typography decisions (admin vs customer)
  - [ ] Language decision (English only? Bilingual?)
  - [ ] Wireframes for key screens:
    - Admin: dashboard, order list, order detail, customer list, product list
    - Customer: dashboard, order history, delivered products, profile
  - [ ] Responsive strategy for dashboard (mobile admin? or desktop-only?)

---

## Round 2 — 3 Worktrees (After Round 1 merge + design approved)

### WT5: Admin Panel

- **Branch:** `phase-2b/admin-panel`
- **Scope:** Admin dashboard, order/customer/product management
- **File ownership:** `app/(admin)/*`, `components/admin/*`
- **Depends on:** WT3 (auth), WT4 (design spec)
- **Tasks:**
  - [ ] Admin layout (sidebar nav, header, breadcrumbs)
  - [ ] Dashboard overview (stats cards, recent orders)
  - [ ] Order management (list, filter, search, status update)
  - [ ] Order detail + ship flow (confirm payment, attach product info)
  - [ ] Customer management (list, create account, view history)
  - [ ] Product management (CRUD, inventory)
  - [ ] Super admin: revenue overview, staff management

### WT6: Customer Portal

- **Branch:** `phase-2c/customer-portal`
- **Scope:** Customer dashboard, orders, delivered products, profile
- **File ownership:** `app/(portal)/*`, `components/portal/*`
- **Depends on:** WT3 (auth), WT4 (design spec)
- **Tasks:**
  - [ ] Portal layout (sidebar nav, header)
  - [ ] Order history with status timeline
  - [ ] Delivered products view (BM ID, invite link, copy, status)
  - [ ] BM Invite Extension section (install link, guide)
  - [ ] Profile page (personal info, order summary, settings)

### WT7: Cal.com Embed

- **Branch:** `phase-1a/cal-embed`
- **Scope:** Cal.com scheduling widget on `/talk-to-sales`
- **File ownership:** `app/(marketing)/talk-to-sales/*`
- **Tasks:**
  - [ ] Integrate Cal.com embed component
  - [ ] Style to match GoAds theme

---

## Round 3 — Post-merge Integration

After merging WT5 + WT6 + WT7:

- [ ] Telegram bot integration (cart form → bot, status notifications)
- [ ] End-to-end testing (order flow: cart → admin → ship → customer sees)
- [ ] Cross-role testing (super_admin, staff, customer permissions)
- [ ] Update docs (system-architecture, codebase-summary)

---

## Merge Strategy

```
main
 ├── Round 1: WT1 + WT2 + WT3 merge → main (WT4 = docs only)
 ├── Round 2: WT5 + WT6 + WT7 merge → main
 └── Round 3: Integration + Telegram bot → main
```

## RBAC Reference

| Role | Who | Access |
|------|-----|--------|
| Super Admin | nammdev, justin | Full |
| Staff | ~3 employees | Orders, customers, ship |
| Customer | buyers | Own data only |
