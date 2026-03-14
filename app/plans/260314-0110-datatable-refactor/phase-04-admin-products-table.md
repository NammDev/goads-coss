# Phase 4: Admin Products Table

**Status:** Todo
**Priority:** Low (depends on admin product CRUD being implemented)

## Overview

Admin products pages (`/admin/products/[type]`) currently have no table implementation. Create column defs + table wrapper following the standard pattern.

## Context

- Admin has product pages per type (meta-agency, google-whitelisted, tiktok-verified, etc.)
- DB schema: `products` table with fields like id, name, type, status, price, createdAt
- Need to check actual DB queries available before implementing

## Implementation Steps

1. Check existing DB queries in `src/lib/db/queries/` for admin product listing
2. Create `src/components/dashboard/columns/admin-product-columns.tsx`
   - Columns: ID, Name, Type, Status, Price, Created
   - Status column with `meta: { filterVariant: 'select' }`
3. Create `src/app/admin/products/[type]/products-table.tsx`
   - Thin client wrapper
   - `filterColumns={['status']}`
4. Update `src/app/admin/products/[type]/page.tsx` to use new table

## Prerequisites

- Phase 1-3 completed
- Admin product DB queries exist
- Product CRUD actions available

## Success Criteria

- Admin product pages show data in AdminDataTable
- Status filter works
- Consistent with all other dashboard tables
