---
type: brainstormer
date: 2026-03-13
slug: admin-datatable-v2-adaptation
status: complete
---

# AdminDataTable v2 — DataTable 5 Adaptation Plan

## Problem Statement

Current `AdminDataTable` (257 lines, 7 consumers) works but has basic styling. DataTable 5 (`datatable-invoice.tsx`) has superior UI patterns (header styling, pagination, page-size selector, keyboard-accessible sorting) but is hardcoded to invoice data. Need to merge best of both into one reusable generic component.

## Decision Summary

| Aspect | Decision |
|--------|----------|
| Approach | Rewrite `admin-data-table.tsx` in-place, adopting DT5 styling + keeping current props API |
| Checkbox column | REMOVE — no consumer needs it |
| Invoice columns/data | REMOVE — columns come from props |
| Expandable rows | KEEP — 3 consumers depend on it |
| Page-size selector | ADD — new optional prop |
| Faceted filter | DEFER — unnecessary complexity for current consumers (none use it) |
| Filter component | SKIP — keep simple search input, no faceted filter |

---

## 1. Props API (Final)

```typescript
type AdminDataTableProps<T> = {
  data: T[]
  columns: ColumnDef<T, unknown>[]
  renderExpandedRow?: (row: T) => ReactNode        // KEEP
  searchPlaceholder?: string                         // KEEP
  searchColumn?: string                              // KEEP
  pageSize?: number                                  // KEEP (default: 10)
  pageSizeOptions?: number[]                         // NEW (default: [10, 25, 50])
  toolbar?: ReactNode                                // KEEP
  emptyState?: ReactNode                             // KEEP
}
```

**Only 1 new prop**: `pageSizeOptions`. Minimal API change, zero breaking changes for existing consumers.

---

## 2. Layout — Toolbar Row

### Current layout:
```
[Search input          ] [toolbar slot]
```

### New layout (adapted from DT5):
```
[PageSize selector] [toolbar slot]          [Search input        ]
```

**Rationale**: DT5 puts page-size + action button on LEFT, search on RIGHT. This groups "table controls" (page size) with "actions" (toolbar), and keeps search as a filter on the right. Matches DT5 layout.

### Implementation:
```tsx
<div className="flex items-center justify-between gap-4 p-4">
  {/* LEFT: page-size + toolbar */}
  <div className="flex items-center gap-3">
    {pageSizeOptions && (
      <div className="flex items-center gap-2">
        <Label htmlFor="page-size-select" className="text-muted-foreground text-sm font-normal max-sm:sr-only">
          Show
        </Label>
        <Select value={...} onValueChange={...}>
          <SelectTrigger id="page-size-select" className="w-fit whitespace-nowrap">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {pageSizeOptions.map(size => <SelectItem .../>)}
          </SelectContent>
        </Select>
      </div>
    )}
    {toolbar}
  </div>

  {/* RIGHT: search */}
  <div className="relative w-full max-w-xs">
    <SearchIcon className="..." />
    <Input className="pl-9" ... />
  </div>
</div>
```

**Note**: If no `pageSizeOptions` provided and no `toolbar`, only search shows — layout degrades gracefully. Search stays on right even alone (flex justify-between with `ml-auto` on search div).

---

## 3. What to ADOPT from DataTable 5

### 3a. Table wrapper
- **Current**: `<div className="rounded-md border">`
- **DT5**: `<div className="border-b">` (no rounded border — card already provides it)
- **Decision**: Keep `rounded-md border`. AdminDataTable is NOT inside a Card in most consumers. The DT5 was inside `<Card>`. Our table stands alone.

### 3b. Header row
- **Current**: `<TableRow className="h-12">`
- **DT5**: `<TableRow className="h-14 border-t">`
- **Adopt**: `h-14 border-t` — taller header, top border separates from toolbar

### 3c. Header cell styling
- **Current**: basic `text-muted-foreground` + cursor-pointer
- **DT5**: `first:pl-4 last:px-4 last:text-center` + keyboard support
- **Adopt**:
  - Add `first:pl-4 last:px-4` for consistent padding
  - Add `onKeyDown` handler for keyboard accessibility (Enter/Space triggers sort)
  - Add `tabIndex={0}` on sortable headers
  - Use `justify-between` in sort header flex (DT5 pattern) instead of `gap-1`

### 3d. Sort indicator rendering
- **Current**: Two separate conditionals with `ChevronUpIcon` / `ChevronDownIcon`
- **DT5**: Object lookup `{{ asc: ..., desc: ... }[sortDir] ?? null}`
- **Adopt**: DT5 pattern — cleaner, single expression

### 3e. Body row styling
- **Current**: default hover (implied)
- **DT5**: `hover:bg-transparent`
- **Decision**: Do NOT adopt `hover:bg-transparent` globally. Expandable rows need hover feedback. Instead:
  - Non-expandable tables: `hover:bg-transparent`
  - Expandable tables: keep default hover (cursor-pointer already signals interactivity)
  - Implementation: conditionally apply based on `renderExpandedRow` prop existence

### 3f. Cell height
- **Current**: `h-12`
- **DT5**: `h-14`
- **Adopt**: `h-14` for cells, + `first:pl-4` for consistent left padding

### 3g. Pagination active page styling
- **Current**: Active page uses `variant="default"` (solid primary bg), inactive uses `variant="ghost"`
- **DT5**: Inactive uses `bg-primary/10 text-primary hover:bg-primary/20` (tinted), active uses default
- **Adopt**: DT5 pattern — softer inactive pages look better

### 3h. Pagination text
- **Current**: `<p className="text-muted-foreground text-sm whitespace-nowrap">`
- **DT5**: Same + `aria-live="polite"` for accessibility
- **Adopt**: Add `aria-live="polite"`

### 3i. Pagination buttons
- **Current**: `size="sm"` on prev/next
- **DT5**: No size specified (default), + `disabled:pointer-events-none disabled:opacity-50` + `aria-label`
- **Adopt**: Add `aria-label` on prev/next buttons. Keep `size="sm"`.

---

## 4. What to REMOVE from DataTable 5

| DT5 Feature | Why Remove |
|---|---|
| Checkbox select column | No consumer needs row selection |
| `Item` type definition | Columns come from props |
| Hardcoded `columns` array | Generic — props |
| `Avatar`, `Badge` imports | Not used by table component |
| `Filter` component | No consumer needs faceted filtering now |
| `RowActions` component | Actions defined in column defs by consumers |
| `DropdownMenu` imports | Part of RowActions — not needed |
| `Tooltip` imports | Consumers handle tooltips in their column defs |
| `ColumnMeta` declaration | Only needed for faceted filter variant |
| `getFacetedRowModel`, `getFacetedUniqueValues`, `getFacetedMinMaxValues` | Only needed for faceted filter |
| `ColumnFiltersState` | We use `globalFilter` or single column filter, not column filters array |
| "Create Invoice" button | Replaced by `toolbar` prop |

---

## 5. What to KEEP from Current AdminDataTable

| Feature | Details |
|---|---|
| Generic `<T>` type parameter | Core API |
| `data` + `columns` props | Core API |
| `renderExpandedRow` | 3 consumers: products (admin+portal), portal orders |
| `searchColumn` logic | Column-specific OR global filter |
| `globalFilter` state | Used when no `searchColumn` specified |
| `toolbar` slot | Used by customers page (CreateCustomerDialog) |
| `emptyState` slot | Custom empty states per consumer |
| `getExpandedRowModel` conditional | Only enable when `renderExpandedRow` provided |
| Expanded row rendering with `Fragment` | Works well |
| `usePagination` hook | Shared, works fine |
| `enableSortingRemoval: false` | Both codebases agree |

---

## 6. CSS Class Changes — Line by Line

### Toolbar row (was `<div className="flex items-center gap-3">`)
```
BEFORE: <div className="flex items-center gap-3">
AFTER:  <div className="flex items-center justify-between gap-4 border-b px-4 py-3">
```

### Search input container (was `<div className="relative max-w-sm flex-1">`)
```
BEFORE: <div className="relative max-w-sm flex-1">
AFTER:  <div className="relative w-full max-w-xs">
```
Moved from left to right side of toolbar.

### Table wrapper (stays same)
```
KEEP: <div className="rounded-md border">
```

### Header TableRow
```
BEFORE: <TableRow key={headerGroup.id} className="h-12">
AFTER:  <TableRow key={headerGroup.id} className="h-14 border-t">
```

### Header TableHead
```
BEFORE: <TableHead className={cn('text-muted-foreground', header.column.getCanSort() && 'cursor-pointer select-none')} onClick={...}>
AFTER:  <TableHead className="text-muted-foreground first:pl-4 last:px-4">
```
Sort click handler moves to inner div (DT5 pattern).

### Header sort div
```
BEFORE: <div className="flex items-center gap-1">
AFTER:  <div className={cn(
          header.column.getCanSort() && 'flex h-full cursor-pointer items-center justify-between gap-2 select-none'
        )}
        onClick={header.column.getToggleSortingHandler()}
        onKeyDown={e => {
          if (header.column.getCanSort() && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault()
            header.column.getToggleSortingHandler()?.(e)
          }
        }}
        tabIndex={header.column.getCanSort() ? 0 : undefined}>
```

### Sort icon rendering
```
BEFORE: {header.column.getIsSorted() === 'asc' && (<ChevronUpIcon .../>)}
        {header.column.getIsSorted() === 'desc' && (<ChevronDownIcon .../>)}
AFTER:  {{ asc: <ChevronUpIcon .../>, desc: <ChevronDownIcon .../> }
          [header.column.getIsSorted() as string] ?? null}
```

### Body TableRow
```
BEFORE: <TableRow data-state={...} className={cn(renderExpandedRow && 'cursor-pointer', ...)}>
AFTER:  <TableRow data-state={...} className={cn(
          renderExpandedRow ? 'cursor-pointer' : 'hover:bg-transparent',
          row.getIsExpanded() && 'bg-muted/50'
        )}>
```

### Body TableCell
```
BEFORE: <TableCell key={cell.id} className="h-12">
AFTER:  <TableCell key={cell.id} className="h-14 first:pl-4">
```

### Pagination active page button
```
BEFORE: variant={page === currentPage ? 'default' : 'ghost'}
AFTER:  className={cn(
          !isActive && 'bg-primary/10 text-primary hover:bg-primary/20 focus-visible:ring-primary/20 dark:focus-visible:ring-primary/40'
        )}
        aria-current={isActive ? 'page' : undefined}
```

### Pagination info text
```
BEFORE: <p className="text-muted-foreground text-sm whitespace-nowrap">
AFTER:  <p className="text-muted-foreground text-sm whitespace-nowrap" aria-live="polite">
```

---

## 7. New Imports Needed

```typescript
// ADD:
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

// REMOVE: nothing — all current imports still needed
```

---

## 8. File Size Estimate

Current: 257 lines. After changes: ~290 lines. Over 200-line guideline but acceptable for a single reusable component with table+pagination+search+expansion. Splitting would create artificial boundaries. The component is cohesive.

---

## 9. Consumer Impact

**Zero breaking changes.** All 7 consumers work as-is because:
- No props removed
- No props renamed
- `pageSizeOptions` is optional (defaults to `undefined` = no selector shown)
- Layout shift (search moves right) is visual only, no API change

Consumers that want page-size selector just add `pageSizeOptions={[10, 25, 50]}`.

---

## 10. Risk Assessment

| Risk | Mitigation |
|---|---|
| Layout shift breaks consumer UX | Visual-only change; search is still prominent |
| `border-t` on header conflicts with `rounded-md border` wrapper | Test visually — may need `overflow-hidden` on wrapper div |
| Keyboard sorting handler on non-sortable columns | Guarded by `header.column.getCanSort()` check |
| Page-size selector resets pagination | Already handled — `setPagination` updates `pageSize` and TanStack resets `pageIndex` |

---

## Unresolved Questions

1. **Should the table wrapper change from `rounded-md border` to no border?** DT5 uses `border-b` only because it sits in a Card. If any consumer wraps AdminDataTable in a Card, we'd get double borders. Current consumers don't use Card wrapper, so keeping `rounded-md border` is safe for now.

2. **Should `pageSizeOptions` default to `[10, 25, 50]` or `undefined`?** Recommending `undefined` (no selector shown) to avoid surprising existing consumers. Opt-in per consumer.

3. **Toolbar position**: Currently toolbar is on the right of search. New layout puts it on the left next to page-size selector. The only consumer using toolbar is `admin/customers` (CreateCustomerDialog button). Confirm this visual change is acceptable.
