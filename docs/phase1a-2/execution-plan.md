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

### WT2: Dark Mode + Lighthouse

- **Branch:** `phase-1a/dark-mode-lighthouse`
- **Scope:** Dark mode audit + Lighthouse performance/accessibility
- **File ownership:** Theme CSS, color tokens, image optimization, a11y
- **Tasks:**
  - [ ] Audit all pages in dark mode
  - [ ] Fix contrast, missing dark variants, border visibility
  - [ ] Run Lighthouse on key pages (home, products, blog, tools)
  - [ ] Fix performance issues (image sizes, lazy loading, CLS)
  - [ ] Fix accessibility issues (aria labels, focus states, color contrast)
  - [ ] Target: Lighthouse > 90 on all categories

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

### WT4: Dashboard UI/UX Design — **STATUS: IMPLEMENTED**

- **Branch:** `phase-2/dashboard-design` → merged into `phase-2/dashboard`
- **Scope:** Research + wireframes + component selection (docs only, no code)
- **File ownership:** Design docs in `docs/phase1a-2/`
- **Output:**
  - [x] Admin panel layout (sidebar collapsible, SidebarProvider pattern)
  - [x] Customer portal layout (responsive sidebar)
  - [x] Component inventory (tables, forms, charts, status badges)
  - [x] shadcn blocks selection for admin + portal (Dashboard Shell 9)
  - [x] Color/typography decisions (same as marketing: Geist + JetBrains Mono, oklch tokens)
  - [x] Language decision (Vietnamese labels, English technical terms)
  - [x] Wireframes for key screens (all documented with actual routes)
  - [x] Responsive strategy (admin desktop-only with warning, portal fully responsive)

---

## Round 2 — 3 Worktrees (After Round 1 merge + design approved)

### WT5: Admin Panel — **STATUS: IMPLEMENTED**

- **Branch:** `phase-2/dashboard` (merged)
- **Scope:** Admin dashboard, order/customer/product management
- **File ownership:** `app/admin/*`, `components/dashboard/*`
- **Depends on:** WT3 (auth), WT4 (design spec)
- **Tasks:**
  - [x] Admin layout (sidebar nav, header, breadcrumbs)
  - [x] Dashboard overview (stats cards, recent orders, charts)
  - [x] Order management (list, filter, search, status update)
  - [x] Order detail + ship flow (product info card, status dropdown)
  - [x] Customer management (list, search, view history)
  - [x] Product management (CRUD, inventory)
  - [x] Super admin: revenue overview (/admin/finance), staff management (/admin/staff), settings (/admin/settings)

### WT6: Customer Portal — **STATUS: IMPLEMENTED**

- **Branch:** `phase-2/dashboard` (merged)
- **Scope:** Customer dashboard, orders, delivered products, profile
- **File ownership:** `app/portal/*`, `components/dashboard/*`
- **Depends on:** WT3 (auth), WT4 (design spec)
- **Tasks:**
  - [x] Portal layout (sidebar nav, header, responsive on mobile)
  - [x] Order history with status timeline (/portal/orders, /portal/orders/[id])
  - [x] Delivered products view (/portal/products, /portal/products/[id] with BM ID, invite link, copy)
  - [x] BM Extension install section (/portal/tools with step-by-step guide)
  - [x] Profile page (/portal/profile with personal info, password change)

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
