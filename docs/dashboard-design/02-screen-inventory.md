# Screen Inventory — Status: IMPLEMENTED

## Admin Panel — 11 Routes

| # | Screen | Route | Status | Key Components |
|---|--------|-------|--------|----------------|
| 1 | Dashboard | `/admin` | ✅ Live | stats-cards, 2 charts, recent orders table |
| 2 | Order List | `/admin/orders` | ✅ Live | datatable, status filters, pagination, search |
| 3 | Order Detail | `/admin/orders/[id]` | ✅ Live | order-info card, status-update dropdown |
| 4 | Customer List | `/admin/customers` | ✅ Live | datatable, search, total-spend column |
| 5 | Customer Detail | `/admin/customers/[id]` | ✅ Live | customer-info, order-history table |
| 6 | Product List | `/admin/products` | ✅ Live | datatable, inventory-count, type filter |
| 7 | Product Form | `/admin/products/new` | ✅ Live | form: name, type, price, description, stock |
| 8 | Finance | `/admin/finance` | ✅ Live | 4 stats cards + 2 charts (super_admin only) |
| 9 | Staff | `/admin/staff` | ✅ Live | staff table, role badges (super_admin only) |
| 10 | Settings | `/admin/settings` | ✅ Live | config form sections (super_admin only) |

## Customer Portal — 7 Routes

| # | Screen | Route | Status | Key Components |
|---|--------|-------|--------|----------------|
| 1 | Dashboard | `/portal` | ✅ Live | welcome msg, 3 stats cards, recent orders |
| 2 | Orders | `/portal/orders` | ✅ Live | order cards with status badges + timeline |
| 3 | Order Detail | `/portal/orders/[id]` | ✅ Live | status-timeline, product list, order-info |
| 4 | Products | `/portal/products` | ✅ Live | product card grid with status badges |
| 5 | Product Detail | `/portal/products/[id]` | ✅ Live | BM ID + invite link copy buttons |
| 6 | Tools | `/portal/tools` | ✅ Live | BM Extension guide with 5 steps |
| 7 | Profile | `/portal/profile` | ✅ Live | personal-info form, password-change form |

## File Structure — IMPLEMENTED

```
app/src/app/
├── admin/
│   ├── layout.tsx                    ← SidebarProvider + DashboardSidebar + DashboardHeader
│   ├── page.tsx                      ← Dashboard (stats + charts)
│   ├── orders/
│   │   ├── page.tsx                  ← Order list (table + pagination)
│   │   └── [id]/page.tsx             ← Order detail
│   ├── customers/
│   │   ├── page.tsx                  ← Customer list
│   │   └── [id]/page.tsx             ← Customer detail
│   ├── products/
│   │   ├── page.tsx                  ← Product list
│   │   └── new/page.tsx              ← Product form
│   ├── finance/page.tsx              ← Finance dashboard (super_admin)
│   ├── staff/page.tsx                ← Staff table (super_admin)
│   └── settings/page.tsx             ← Settings form (super_admin)
├── portal/
│   ├── layout.tsx                    ← Portal-specific layout + responsive sidebar
│   ├── page.tsx                      ← Portal dashboard
│   ├── orders/
│   │   ├── page.tsx                  ← Orders list
│   │   └── [id]/page.tsx             ← Order detail
│   ├── products/
│   │   ├── page.tsx                  ← Products grid
│   │   └── [id]/page.tsx             ← Product detail
│   ├── tools/page.tsx                ← BM Extension guide
│   └── profile/page.tsx              ← Profile form
```

**Key Notes:**
- No route groups `(admin)` or `(portal)` — direct routes `/admin/*` and `/portal/*`
- Shared layout components in `src/components/dashboard/`
- Mock data in `src/data/` — admin-nav.ts, portal-nav.ts, mock-*.ts files
