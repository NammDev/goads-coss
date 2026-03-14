# Phase 3: Add Filters Across Tables

**Status:** Todo
**Priority:** Medium

## Overview

Add `filterColumns` + `meta.filterVariant` to all tables that have categorical data (status, role).

## Changes

### Admin Customers
- File: `src/components/dashboard/columns/admin-customer-columns.tsx`
  - Add `meta: { filterVariant: 'select' }` to `role` column
- File: `src/app/admin/customers/customers-table.tsx`
  - Add `filterColumns={['role']}`

### Portal Orders
- Already handled in Phase 2 (status filter)

### Portal Products
- File: `src/components/dashboard/columns/portal-product-columns.tsx`
  - Add `meta: { filterVariant: 'select' }` to `status` column in builder
- File: `src/app/portal/products/[type]/portal-products-table.tsx`
  - Add `filterColumns={['status']}`

## Success Criteria

- All tables with categorical columns have dropdown filters
- Filters work correctly with faceted unique values
- `npx tsc --noEmit` passes
