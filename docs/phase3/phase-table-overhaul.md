# Table UI Overhaul — Port shadcnstore Data Table to GoAds

## Overview
- **Priority:** High
- **Status:** ⏳
- **Effort:** 2-3 days
- **Scope:** 4 tables (admin orders, admin products, portal orders, portal products)

## Goal
Replace GoAds table UI with shadcnstore's data table UI while keeping GoAds column definitions and data. Pixel-perfect match for: checkboxes, column visibility, pagination, status badges, action menus.

## Source
- Template: `/tmp/shadcn-dashboard-template/nextjs-version/src/app/(dashboard)/dashboard/components/data-table.tsx` (1089 lines)
- Also reference: `users/components/data-table.tsx` (536 lines — simpler, better fit)

## Current State
GoAds has `AdminDataTable` (148 lines) with: sorting, global search, per-column filters, pagination, expandable rows. Missing: checkboxes, column visibility, action menu.

---

## Strategy: Enhance AdminDataTable (NOT replace)

Don't copy the 1089-line template wholesale. Instead, add missing features to existing `AdminDataTable`:

### Phase 1: Core AdminDataTable Enhancements

**File:** `app/src/components/dashboard/admin-data-table.tsx`

Add these features:

| Feature | Template Reference | Implementation |
|---------|-------------------|----------------|
| Row checkboxes | `select` column with Checkbox | Add `enableRowSelection` + checkbox column |
| Column visibility | `Customize Columns` dropdown | Add DropdownMenuCheckboxItem toolbar |
| Row action menu | `actions` column with DropdownMenu | Make optional via `actionColumn` prop |
| Pagination upgrade | `Rows per page` + `Page X of Y` + 4 nav buttons | Match template pagination exactly |
| Toolbar layout | Search left + Customize/Actions right | Match template toolbar layout |

### Phase 2: Column Definitions Update (per table)

Update column definitions to use template UI patterns:

#### Admin Orders (`columns/admin-order-columns.tsx`)
| Column | Keep | Enhance |
|--------|------|---------|
| Order ID | ✅ | Link + monospace font |
| Customer | ✅ | Avatar initials + name |
| Total | ✅ | Dollar format |
| Status | ✅ | Template-style Badge (Done/In Process icons) |
| Created | ✅ | Relative time |
| Actions | NEW | View, Edit Status, Cancel |

#### Admin Products (`columns/portal-product-columns.tsx` shared)
| Column | Keep | Enhance |
|--------|------|---------|
| # | ✅ | Row number |
| Name | ✅ | — |
| Status | ✅ | Template-style Badge |
| Credentials | ✅ | Dynamic per product type |
| Note | ✅ | — |
| Actions | NEW | View, Copy All, Warranty |

#### Portal Orders (`columns/portal-order-columns.tsx`)
| Column | Keep | Enhance |
|--------|------|---------|
| Order ID | ✅ | Link |
| Total | ✅ | Dollar format |
| Status | ✅ | Template-style Badge |
| Created | ✅ | Relative time |
| Actions | NEW | View Detail, Share Link |

#### Portal Products (same as admin products minus admin actions)

### Phase 3: Apply to All Table Pages

Update 4 table wrapper files to pass new props:
- `admin/orders/orders-table.tsx`
- `admin/products/[type]/products-table.tsx`
- `portal/orders/portal-orders-table.tsx`
- `portal/products/[type]/portal-products-table.tsx`

---

## Implementation Steps

### Step 1: Upgrade AdminDataTable Component
1. Add `columnVisibility` state + `setColumnVisibility` to useReactTable
2. Add `rowSelection` state + `enableRowSelection: true`
3. Add toolbar section: left (search + filters), right (Customize Columns dropdown)
4. Upgrade pagination to template style: `Rows per page [select]` + `Page X of Y` + `«‹›»` buttons
5. Add optional `renderActions` prop for row action column

### Step 2: Create Shared UI Pieces
- `table-column-visibility.tsx` — Customize Columns dropdown component
- `table-pagination.tsx` — Template-style pagination component
- `table-row-actions.tsx` — Generic row action dropdown (View, Edit, Delete)

### Step 3: Update Column Definitions
For each table's columns file:
1. Add checkbox select column at position 0
2. Update Status column to use template Badge style
3. Add actions column at last position
4. Set `enableHiding: false` on ID and Status columns

### Step 4: Update Table Wrapper Components
Pass new props to AdminDataTable from each wrapper.

### Step 5: Build & Test
- `pnpm build` passes
- All 4 tables render correctly
- Checkboxes, column visibility, actions work
- Pagination matches template

---

## What NOT to Do
- ❌ Don't add drag-and-drop (no use case in GoAds)
- ❌ Don't add inline editing (not needed yet)
- ❌ Don't add tabs (each table is its own page)
- ❌ Don't add drawer detail view (keep expandable rows)
- ❌ Don't copy the 1089-line template file wholesale

## Files to Modify
- `components/dashboard/admin-data-table.tsx` — major enhancement
- `components/dashboard/columns/*.tsx` — all column files
- `admin/orders/orders-table.tsx`
- `admin/products/[type]/products-table.tsx`
- `portal/orders/portal-orders-table.tsx`
- `portal/products/[type]/portal-products-table.tsx`

## Files to Create
- `components/dashboard/table-column-visibility.tsx`
- `components/dashboard/table-pagination.tsx`
- `components/dashboard/table-row-actions.tsx`
