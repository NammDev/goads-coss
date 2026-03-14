# Phase 2: Standardize Portal Orders Table

**Status:** Todo
**Priority:** High

## Overview

Portal orders table has column definitions inline in `portal-orders-table.tsx`. Extract to separate file for consistency with all other tables.

## Current State

- `src/app/portal/orders/portal-orders-table.tsx` — contains inline `portalOrderColumns` + `PortalOrderExpandedRow`
- No separate column file (old `portal-order-columns.tsx` was deleted in Phase 1)

## Implementation Steps

1. Create `src/components/dashboard/columns/portal-order-columns.tsx`
   - Move `portalOrderColumns` array from `portal-orders-table.tsx`
   - Move `PortalOrderExpandedRow` component
   - Export `SerializedOrder` type (or import from shared types)

2. Update `portal-orders-table.tsx`
   - Import columns + expanded row from new file
   - Keep as thin wrapper only

3. Add `filterColumns={['status']}` + `meta: { filterVariant: 'select' }` on status column

## Related Files

- Modify: `src/app/portal/orders/portal-orders-table.tsx`
- Create: `src/components/dashboard/columns/portal-order-columns.tsx`

## Success Criteria

- Portal orders page renders identical to current
- Column defs in dedicated file
- Status filter dropdown works
- `npx tsc --noEmit` passes
