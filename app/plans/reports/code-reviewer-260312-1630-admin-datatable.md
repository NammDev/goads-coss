# Code Review: Admin DataTable Upgrade

**Date:** 2026-03-12
**Files:** 9 (5 new, 4 modified) | **LOC:** 753 total
**Build:** TypeScript clean, ESLint 0 errors (1 known TanStack/React Compiler warning)

## Overall Assessment

Good refactor. Extracted a reusable generic `AdminDataTable<T>` that all 4 admin pages now share. Column definitions properly separated into dedicated files. DRY principle well applied.

## Critical Issues

None.

## High Priority

### 1. Missing React Fragment key (admin-data-table.tsx:151)

**Bug.** The `<>` fragment wrapping each table row + expanded row has no `key`. React will warn in dev and may mishandle reconciliation when rows are reordered/filtered.

```tsx
// Line 151: bare fragment
<>
  <TableRow key={row.id} ...>
```

**Fix:** Replace `<>` with `<Fragment key={row.id}>` and remove `key` from inner `TableRow`:
```tsx
import { Fragment } from 'react'
// ...
<Fragment key={row.id}>
  <TableRow data-state={...} ...>
```

### 2. File size violation (admin-data-table.tsx = 251 LOC)

Project rule is 200 LOC max. Extract the pagination section (lines 189-248) into a `DataTablePagination` sub-component in a separate file, or inline-extract within the same file as a named function component above `AdminDataTable`.

### 3. Duplicated `formatVND` utility

Defined identically in `order-columns.tsx`, `customer-columns.tsx`, and `product-columns.tsx`.

**Fix:** Extract to `src/lib/format.ts`:
```ts
export const formatVND = (amount: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount)
```

## Medium Priority

### 4. Dead code: `colCount` variable (admin-data-table.tsx:93)

```ts
const colCount = columns.length + (renderExpandedRow ? 0 : 0)
```

This always equals `columns.length`. The ternary adds 0 either way. Remove and use `columns.length` directly on line 179.

### 5. Hardcoded colors in column files (theme violation)

Per project rules, use semantic tokens not Tailwind color utilities:
- `customer-columns.tsx:62-63` -- `bg-emerald-100 text-emerald-800` / `bg-gray-100 text-gray-600`
- `staff-columns.tsx:24-25` -- `bg-blue-100 text-blue-800` / `bg-gray-100 text-gray-700`
- `staff-columns.tsx:68-69` -- `bg-emerald-500` / `bg-gray-300 dark:bg-gray-600`
- `product-columns.tsx:39` -- `text-red-600 dark:text-red-400`
- `status-badge.tsx` -- all status colors are hardcoded (pre-existing, not new)

**Note:** `status-badge.tsx` predates this PR so the colors there are pre-existing debt. But the new column files should ideally use semantic tokens or at minimum be consistent with the existing badge approach.

### 6. Search input missing `aria-label` (admin-data-table.tsx:101-112)

The search `<Input>` has a `placeholder` but no `<label>` or `aria-label`. Screen readers won't announce its purpose.

**Fix:** Add `aria-label={searchPlaceholder}` to the Input.

### 7. Sortable header missing keyboard accessibility (admin-data-table.tsx:130)

Sort is triggered by `onClick` on `<TableHead>` but `<th>` elements are not focusable by default. Keyboard users cannot sort columns.

**Fix:** Add `role="button" tabIndex={0}` and an `onKeyDown` handler for Enter/Space on sortable headers. Or wrap the header content in a `<button>`.

### 8. StaffMember type defined in column file

`StaffMember` type is defined in `staff-columns.tsx` and exported. When real data comes from the DB, this type should live in a shared types/data file (like `MockOrder` lives in `mock-orders.ts`). Acceptable for now since staff data is inline, but note for future.

## Low Priority

### 9. Customer expanded row imports full `mockOrders` at module level

`customer-columns.tsx:9` imports `mockOrders` which means the entire orders dataset is bundled into the customers page. When data moves to API calls, this coupling will break. Fine for mock phase but flag for cleanup.

### 10. Staff invite form does nothing

`handleInvite` in `staff/page.tsx` just closes the dialog without collecting form data. Acceptable as placeholder UI, but the form inputs are uncontrolled and `Select` has no `name` attribute, so even a future `FormData` extraction won't capture the role.

### 11. Row click expands even when clicking links

In `order-columns.tsx` and `customer-columns.tsx`, links call `e.stopPropagation()` which is correct. No issue here, just confirming it was handled.

## Positive Observations

- Clean generic typing on `AdminDataTable<T>` -- no `any` usage
- Column definitions well-separated from table logic
- `searchColumn` prop allows per-column or global filter flexibility
- Proper `enableSorting: false` on non-sortable columns
- `e.stopPropagation()` on clickable links within expandable rows
- Page components are minimal (19-90 LOC), clean delegation

## Recommended Actions (priority order)

1. **Fix Fragment key bug** -- will cause React warnings and potential row state bugs
2. **Extract formatVND** to `src/lib/format.ts` -- DRY violation across 3 files
3. **Remove dead `colCount`** -- trivial cleanup
4. **Add aria-label to search input** -- accessibility gap
5. **Split admin-data-table.tsx** to get under 200 LOC -- extract pagination
6. **Add keyboard sort support** -- accessibility for power users

## Metrics

| Metric | Value |
|--------|-------|
| TypeScript errors | 0 |
| ESLint errors | 0 |
| ESLint warnings | 1 (known TanStack/Compiler compat) |
| Files over 200 LOC | 1 (`admin-data-table.tsx` = 251) |
| Hardcoded colors | ~8 instances across column files |
| DRY violations | 1 (`formatVND` x3) |

## Unresolved Questions

- Will staff data eventually come from the auth/RBAC system (Better Auth)? If so, `StaffMember` type should align with the user schema early.
- Should the expanded row animation be added (e.g., collapse/expand transition)?
