# WT4: Dashboard UI/UX Design

> **Status: COMPLETED & IMPLEMENTED**
> Branch: `phase-2/dashboard` (merged into main branch)
> Output: Docs + Full Implementation (Admin Panel + Customer Portal)

## Scope

Research, define, and document the complete UI/UX spec for admin panel + customer portal. This spec becomes the blueprint for WT5 (admin) and WT6 (portal) in Round 2.

## File Ownership

- `docs/phase1a-2/dashboard-design/` — all output files

**DO NOT touch:** any source code, CSS, components, or config files

## Deliverables — ALL COMPLETED

### 1. Layout Structure — **Status: IMPLEMENTED**

Both admin and customer portal implemented with:
- [x] Navigation: Collapsible sidebar (SidebarProvider pattern)
- [x] Sidebar content: Logo, nav items (role-aware), user footer widget
- [x] Header: Breadcrumbs, search (⌘K), notifications, user avatar/menu
- [x] Content area: `max-w-7xl`, responsive padding, main scrolls with sticky header/sidebar
- [x] Mobile strategy: Admin desktop-only (MobileWarning on <768px), Portal fully responsive

### 2. Screen Inventory — **Status: IMPLEMENTED**

#### Admin Panel Screens — 11 routes

| # | Screen | Route | Status |
|----|--------|-------|--------|
| 1 | Dashboard | `/admin` | ✅ Implemented (stats, charts, recent orders) |
| 2 | Order List | `/admin/orders` | ✅ Implemented (paginated table, filters) |
| 3 | Order Detail | `/admin/orders/[id]` | ✅ Implemented (info card, status update) |
| 4 | Customer List | `/admin/customers` | ✅ Implemented (search, pagination) |
| 5 | Customer Detail | `/admin/customers/[id]` | ✅ Implemented (profile, order history) |
| 6 | Product List | `/admin/products` | ✅ Implemented (table, inventory) |
| 7 | Product Form | `/admin/products/new` | ✅ Implemented (create/edit form) |
| 8 | Finance | `/admin/finance` | ✅ Implemented (super_admin only, revenue charts) |
| 9 | Staff | `/admin/staff` | ✅ Implemented (super_admin only, staff table) |
| 10 | Settings | `/admin/settings` | ✅ Implemented (super_admin only, system config) |

#### Customer Portal Screens — 7 routes

| # | Screen | Route | Status |
|----|--------|-------|--------|
| 1 | Dashboard | `/portal` | ✅ Implemented (welcome, stats, recent orders) |
| 2 | Orders | `/portal/orders` | ✅ Implemented (order cards with status badges) |
| 3 | Order Detail | `/portal/orders/[id]` | ✅ Implemented (timeline, product list) |
| 4 | Products | `/portal/products` | ✅ Implemented (delivered items grid) |
| 5 | Product Detail | `/portal/products/[id]` | ✅ Implemented (BM ID, invite link, copy buttons) |
| 6 | Tools | `/portal/tools` | ✅ Implemented (BM Extension guide) |
| 7 | Profile | `/portal/profile` | ✅ Implemented (personal info, password change) |

### 3. Component Inventory — **Status: IMPLEMENTED**

All components built using shadcn/ui + shadcn studio Dashboard Shell 9:

- [x] **Data tables** — `datatable-user.tsx` template adapted for orders, customers, products, staff
- [x] **Forms** — Product form at `/admin/products/new`, profile form at `/portal/profile`
- [x] **Stats cards** — `stats-card.tsx` (46 LOC) on admin/portal dashboards
- [x] **Status badges** — `status-badge.tsx` (55 LOC) with color map for 8 statuses
- [x] **Timeline** — `order-timeline.tsx` (85 LOC) on portal order detail
- [x] **Sidebar nav** — SidebarProvider + `dashboard-sidebar.tsx` (142 LOC), role-aware nav groups
- [x] **Breadcrumbs** — `dashboard-breadcrumb.tsx` (81 LOC) route-based
- [x] **Dialogs/sheets** — `dialog-activity.tsx`, `dialog-search.tsx` from shell-09
- [x] **Charts** — 4 charts from shell-09: weekly-overview, performance, conversion-rate, project-timeline
- [x] **Empty states** — `empty-state.tsx` (28 LOC) for no results
- [x] **Copy button** — `copy-button.tsx` (42 LOC) for BM ID, invite links
- [x] **Avatar + dropdown** — `dropdown-profile.tsx` from shell-09

### 4. Design Decisions — **Status: IMPLEMENTED**

- [x] **Color scheme**: Same oklch tokens as marketing (no separate admin palette)
- [x] **Typography**: Geist (sans) + JetBrains Mono (mono) — same as marketing
- [x] **Language**: Vietnamese labels, English technical terms (BM, Agency Account, etc.)
- [x] **Density**: Compact tables (`py-2`, `text-sm`) vs relaxed cards (`p-6`) hybrid
- [x] **Admin mobile**: Desktop-only with `MobileWarning` banner on <768px
- [x] **Customer portal mobile**: Fully responsive (sidebar → Sheet on mobile)

### 5. shadcn Studio Blocks Research — **Status: COMPLETED**

Installed & adapted Dashboard Shell 9 (`@ss-blocks/dashboard-shell-09`):
- [x] Sidebar layouts — SidebarProvider + nav groups + footer widget
- [x] Dashboard overview — stats cards + charts + recent orders table
- [x] Data table blocks — `datatable-user.tsx` template for all tables
- [x] Form blocks — shadcn primitives (Input, Select, Label, Button)
- [x] Profile/settings blocks — `dropdown-profile.tsx`, profile form

**Files reused from shell-09:**
- `chart-conversion-rate.tsx`, `chart-performance.tsx`, `chart-project-timeline.tsx`, `chart-weekly-overview.tsx`
- `datatable-user.tsx`, `dialog-search.tsx`, `dropdown-notification.tsx`, `dropdown-profile.tsx`
- `widget-upgrade-your-plan.tsx` (adapted to "Pending Approvals")

**Files built from scratch:**
- `stats-card.tsx`, `status-badge.tsx`, `order-timeline.tsx`, `copy-button.tsx`, `empty-state.tsx`, `mobile-warning.tsx`
- Admin/portal layouts, page routes, mock data

### 6. Wireframes — **Status: IMPLEMENTED & SUPERSEDED**

Wireframes documented in detailed ASCII format. Actual implementation is live:

**Admin routes implemented:**
- `/admin` — Dashboard with stats + 2 charts + recent orders table
- `/admin/orders` — Paginated orders table with status filters
- `/admin/orders/[id]` — Order detail with product info + status update
- `/admin/customers` — Customer list with search + pagination
- `/admin/customers/[id]` — Customer profile + order history
- `/admin/products` — Product list with inventory
- `/admin/products/new` — Product form
- `/admin/finance` — Revenue charts (super_admin only)
- `/admin/staff` — Staff table (super_admin only)
- `/admin/settings` — System config form (super_admin only)

**Portal routes implemented:**
- `/portal` — Dashboard with welcome message + stats + recent orders
- `/portal/orders` — Order cards with status badges + timeline preview
- `/portal/orders/[id]` — Full order detail with status timeline
- `/portal/products` — Delivered products grid
- `/portal/products/[id]` — Product detail with BM ID + invite link copy buttons
- `/portal/tools` — BM Extension install guide with steps
- `/portal/profile` — Personal info + password change forms

**Mobile layouts:**
- Admin: Warning banner on <768px (desktop-only)
- Portal: Sidebar → Sheet overlay, content stacks vertically on <768px

## Research Tasks

- [ ] Review shadcn studio admin/dashboard blocks (via MCP)
- [ ] Review similar SaaS admin panels for inspiration (Stripe, Linear, Vercel)
- [ ] Evaluate sidebar vs top-nav for GoAds context
- [ ] Check shadcn/ui data table component capabilities

## Success Criteria — ALL MET

- [x] Complete screen inventory with 18 routes (11 admin + 7 portal)
- [x] Component inventory: 6 custom built + 4 charts + 1 datatable template reused
- [x] All design decisions documented (color, typography, language, density, responsive)
- [x] Wireframes for all key screens documented in ASCII format
- [x] shadcn studio Dashboard Shell 9 blocks identified and reused
- [x] Mobile strategy defined (admin desktop-only, portal responsive)
- [x] Full implementation completed and merged to `phase-2/dashboard`
