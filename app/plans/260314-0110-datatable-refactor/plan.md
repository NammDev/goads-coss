# DataTable Refactor — Unified Dashboard Tables

**Branch:** wt-a
**Status:** Planning
**Priority:** Medium

## Goal

Consolidate all dashboard tables (admin + portal) to use `AdminDataTable` with consistent patterns: separated column files, status filters, unified layout.

## Phases

| # | Phase | Status | Files |
|---|-------|--------|-------|
| 1 | [Cleanup legacy columns](./phase-01-cleanup-legacy-columns.md) | Todo | 4 files delete |
| 2 | [Standardize portal orders](./phase-02-standardize-portal-orders.md) | Todo | 2 files |
| 3 | [Add filters across tables](./phase-03-add-filters.md) | Todo | 3 files |
| 4 | [Admin products table](./phase-04-admin-products-table.md) | Todo | 3 files |

## Architecture

```
src/components/dashboard/
├── admin-data-table.tsx          # Shared DT5-style table (DONE)
├── status-badge.tsx              # Shared status badge
└── columns/
    ├── admin-order-columns.tsx    # ✓ Active
    ├── admin-customer-columns.tsx # ✓ Active
    ├── admin-product-columns.tsx  # Phase 4 — NEW
    ├── portal-order-columns.tsx   # Phase 2 — rewrite (currently inline)
    ├── portal-product-columns.tsx # ✓ Active
    └── portal-wallet-columns.tsx  # ✓ Active (not in scope)

src/app/admin/
├── orders/orders-table.tsx        # ✓ Thin wrapper
├── customers/customers-table.tsx  # ✓ Thin wrapper
└── products/[type]/products-table.tsx  # Phase 4 — NEW

src/app/portal/
├── orders/portal-orders-table.tsx  # Phase 2 — extract inline columns
└── products/[type]/portal-products-table.tsx  # ✓ OK
```

## Standard Pattern (all table pages)

```tsx
// page.tsx (server)
const data = await fetchData()
return <XxxTable data={data} />

// xxx-table.tsx (client)
'use client'
import { AdminDataTable } from '@/components/dashboard/admin-data-table'
import { xxxColumns } from '@/components/dashboard/columns/xxx-columns'

export function XxxTable({ data }) {
  return (
    <AdminDataTable
      data={data}
      columns={xxxColumns}
      searchPlaceholder="Search..."
      filterColumns={['status']}        // where applicable
      renderExpandedRow={(row) => ...}   // where applicable
    />
  )
}
```

## Dependencies

- `AdminDataTable` with DT5 layout + `filterColumns` — DONE (this session)
- `ColumnMeta.filterVariant` declaration — DONE
