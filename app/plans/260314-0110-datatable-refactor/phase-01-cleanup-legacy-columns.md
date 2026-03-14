# Phase 1: Cleanup Legacy Column Files

**Status:** Todo
**Priority:** High (unblock clarity)

## Overview

Delete unused legacy column files that reference mock data. These were replaced by real DB-backed column defs.

## Files to Delete

- [x] `src/components/dashboard/columns/order-columns.tsx` — replaced by `admin-order-columns.tsx`
- [x] `src/components/dashboard/columns/customer-columns.tsx` — replaced by `admin-customer-columns.tsx`
- [x] `src/components/dashboard/columns/product-columns.tsx` — replaced by `portal-product-columns.tsx`
- [x] `src/components/dashboard/columns/portal-order-columns.tsx` — unused, portal orders use inline columns (Phase 2 will rewrite this file)

## Verification

1. Grep for imports of each file to confirm zero usage
2. Delete files
3. `npx tsc --noEmit` must pass

## Success Criteria

- No legacy mock column files remain
- TypeScript compiles clean
- No runtime errors on admin/portal pages
