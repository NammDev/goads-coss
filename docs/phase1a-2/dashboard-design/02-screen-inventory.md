# Screen Inventory

## Admin Panel — `/(admin)`

| # | Screen | Route | Layout | Key Components |
|---|--------|-------|--------|----------------|
| 1 | Dashboard | `/(admin)` | Stats + Charts + Recent Orders | stats-cards, chart-weekly-overview, chart-conversion-rate, datatable (recent 5) |
| 2 | Order List | `/(admin)/orders` | Table + Filters | datatable-order, status-badges, date-range filter, search |
| 3 | Order Detail | `/(admin)/orders/[id]` | Detail view + Actions | order-info card, status-update dropdown, ship-product dialog, timeline |
| 4 | Customer List | `/(admin)/customers` | Table + Search | datatable-customer, total-spend column, search |
| 5 | Customer Detail | `/(admin)/customers/[id]` | Profile + History | customer-info card, order-history table, notes textarea |
| 6 | Product List | `/(admin)/products` | Table + Inventory | datatable-product, inventory-count badge, type filter |
| 7 | Product Form | `/(admin)/products/new` | Form | create/edit product form, type selector, BM ID input |
| 8 | Finance | `/(admin)/finance` | Charts + Reports | revenue-chart, chart-project-timeline, export button. **super_admin only** |
| 9 | Staff | `/(admin)/staff` | Table + Invite | staff-table, role-badge, invite-dialog. **super_admin only** |
| 10 | Settings | `/(admin)/settings` | Form sections | system-config forms. **super_admin only** |

## Customer Portal — `/(portal)`

| # | Screen | Route | Layout | Key Components |
|---|--------|-------|--------|----------------|
| 1 | Dashboard | `/(portal)` | Welcome + Stats + Recent | welcome-header, stats-cards (3), recent-orders list |
| 2 | Orders | `/(portal)/orders` | Card list | order-cards with status-badge + timeline-preview |
| 3 | Order Detail | `/(portal)/orders/[id]` | Timeline + Info | status-timeline (full), product-list, order-info |
| 4 | Products | `/(portal)/products` | Card grid | product-cards with type-badge, status-badge |
| 5 | Product Detail | `/(portal)/products/[id]` | Detail + Actions | BM ID (copy), invite-link (copy), status, instructions |
| 6 | Tools | `/(portal)/tools` | Guide layout | BM Extension install guide, step-by-step instructions |
| 7 | Profile | `/(portal)/profile` | Form | personal-info form, password-change form |

## Route Groups

```
app/
├── (admin)/
│   ├── layout.tsx          ← Admin sidebar + header + role guard
│   ├── page.tsx            ← Admin dashboard
│   ├── orders/
│   │   ├── page.tsx        ← Order list
│   │   └── [id]/page.tsx   ← Order detail
│   ├── customers/
│   │   ├── page.tsx
│   │   └── [id]/page.tsx
│   ├── products/
│   │   ├── page.tsx
│   │   └── new/page.tsx
│   ├── finance/page.tsx
│   ├── staff/page.tsx
│   └── settings/page.tsx
├── (portal)/
│   ├── layout.tsx          ← Portal sidebar + header + auth guard
│   ├── page.tsx            ← Portal dashboard
│   ├── orders/
│   │   ├── page.tsx
│   │   └── [id]/page.tsx
│   ├── products/
│   │   ├── page.tsx
│   │   └── [id]/page.tsx
│   ├── tools/page.tsx
│   └── profile/page.tsx
└── (auth)/
    ├── login/page.tsx
    └── register/page.tsx
```
