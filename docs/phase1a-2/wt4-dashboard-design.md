# WT4: Dashboard UI/UX Design

> Branch: `phase-2/dashboard-design`
> **Output: docs only — NO code implementation**

## Scope

Research, define, and document the complete UI/UX spec for admin panel + customer portal. This spec becomes the blueprint for WT5 (admin) and WT6 (portal) in Round 2.

## File Ownership

- `docs/phase1a-2/dashboard-design/` — all output files

**DO NOT touch:** any source code, CSS, components, or config files

## Deliverables

### 1. Layout Structure

Define for both admin and customer portal:
- [ ] Navigation type: sidebar (collapsible), top nav, or hybrid?
- [ ] Sidebar content: logo, nav items, user info, collapse behavior
- [ ] Header: breadcrumbs, search, notifications bell, user avatar/menu
- [ ] Content area: max-width, padding, scrolling behavior
- [ ] Mobile strategy: admin = desktop-only? portal = responsive?

### 2. Screen Inventory

#### Admin Panel Screens

| Screen | Route | Description |
|--------|-------|-------------|
| Dashboard | `/(admin)` | Stats cards, recent orders, quick actions |
| Order List | `/(admin)/orders` | Table with filters (status, date, customer) |
| Order Detail | `/(admin)/orders/[id]` | Full order info, status update, ship flow |
| Customer List | `/(admin)/customers` | Table with search, total spend |
| Customer Detail | `/(admin)/customers/[id]` | Profile, order history, notes |
| Product List | `/(admin)/products` | Table with inventory count |
| Product Form | `/(admin)/products/new` | Create/edit product |
| Finance* | `/(admin)/finance` | Revenue charts, reports (super_admin) |
| Staff* | `/(admin)/staff` | Staff list, invite (super_admin) |
| Settings* | `/(admin)/settings` | System config (super_admin) |

#### Customer Portal Screens

| Screen | Route | Description |
|--------|-------|-------------|
| Dashboard | `/(portal)` | Welcome, recent orders, quick stats |
| Orders | `/(portal)/orders` | Order list with status badges |
| Order Detail | `/(portal)/orders/[id]` | Status timeline, product info |
| Products | `/(portal)/products` | Delivered products list |
| Product Detail | `/(portal)/products/[id]` | BM ID, invite link, status |
| Tools | `/(portal)/tools` | BM Extension install + guide |
| Profile | `/(portal)/profile` | Personal info, password change |

### 3. Component Inventory

Identify which shadcn/ui + shadcn studio components needed:

- [ ] **Data tables** — sortable, filterable, paginated (orders, customers, products)
- [ ] **Forms** — create order, create customer, edit product, ship product
- [ ] **Stats cards** — numbers with icons (new orders, revenue, pending)
- [ ] **Status badges** — color-coded order status (pending=yellow, paid=blue, shipped=green, etc.)
- [ ] **Timeline** — order status progression (customer-facing)
- [ ] **Sidebar nav** — collapsible, role-aware (hide finance/staff for non-super_admin)
- [ ] **Breadcrumbs** — route-based
- [ ] **Dialogs/sheets** — confirm actions, quick edit
- [ ] **Charts** — revenue over time, order volume (super_admin only)
- [ ] **Empty states** — no orders yet, no products
- [ ] **Copy button** — for BM ID, invite links
- [ ] **Avatar + dropdown** — user menu (profile, logout, switch theme)

### 4. Design Decisions

- [ ] **Color scheme**: Same theme as marketing? Or distinct admin palette?
- [ ] **Typography**: Same Geist/JetBrains? Or different for data-heavy UI?
- [ ] **Language**: English only? Vietnamese? Bilingual toggle?
- [ ] **Density**: Compact tables (more data) vs relaxed (more whitespace)?
- [ ] **Admin mobile**: Support mobile admin? Or desktop-only with warning?
- [ ] **Customer portal mobile**: Must be responsive (customers use phones)

### 5. shadcn Studio Blocks Research

Research available dashboard/admin blocks in shadcn studio registry:
- [ ] Sidebar layouts
- [ ] Dashboard overview blocks
- [ ] Data table blocks
- [ ] Form blocks
- [ ] Profile/settings blocks
- [ ] List which blocks to adapt vs build from scratch

### 6. Wireframes

Create ASCII wireframes for key screens:

#### Admin Dashboard (example structure)

```
┌──────────┬──────────────────────────────────┐
│ SIDEBAR  │  HEADER (breadcrumb + user)       │
│          ├──────────────────────────────────┤
│ Logo     │                                   │
│ ──────── │  [Stats] [Stats] [Stats] [Stats]  │
│ Dashboard│                                   │
│ Orders   │  Recent Orders                    │
│ Customers│  ┌──────────────────────────────┐ │
│ Products │  │ Table with status, actions    │ │
│ ──────── │  │                              │ │
│ Finance* │  │                              │ │
│ Staff*   │  └──────────────────────────────┘ │
│ Settings*│                                   │
│          │  Quick Actions                    │
│ ──────── │  [+ New Order] [+ New Customer]   │
│ User     │                                   │
│ Logout   │                                   │
└──────────┴──────────────────────────────────┘
```

#### Customer Portal (example structure)

```
┌──────────┬──────────────────────────────────┐
│ SIDEBAR  │  HEADER (Welcome, User Name)      │
│          ├──────────────────────────────────┤
│ Logo     │                                   │
│ ──────── │  Your Orders                      │
│ Dashboard│  ┌──────────────────────────────┐ │
│ Orders   │  │ #001 Premium Setup            │ │
│ Products │  │ Status: ● Processing          │ │
│ Tools    │  │ ──────●──────○──────○──────   │ │
│ Profile  │  │ Ordered → Paid → Ship → Done  │ │
│          │  └──────────────────────────────┘ │
│          │  ┌──────────────────────────────┐ │
│          │  │ #002 Agency Account  ✓ Done   │ │
│          │  │ → View Products               │ │
│          │  └──────────────────────────────┘ │
└──────────┴──────────────────────────────────┘
```

- [ ] Wireframe all screens listed in Screen Inventory
- [ ] Include mobile layout for customer portal screens

## Research Tasks

- [ ] Review shadcn studio admin/dashboard blocks (via MCP)
- [ ] Review similar SaaS admin panels for inspiration (Stripe, Linear, Vercel)
- [ ] Evaluate sidebar vs top-nav for GoAds context
- [ ] Check shadcn/ui data table component capabilities

## Success Criteria

- [ ] Complete screen inventory with routes
- [ ] Component inventory matched to shadcn/ui primitives
- [ ] All design decisions documented with rationale
- [ ] Wireframes for all key screens (admin + portal)
- [ ] shadcn studio blocks identified for reuse
- [ ] Mobile strategy defined
- [ ] Document approved by user before Round 2 starts
