# shadcn Studio Blocks Research

## Installed: Dashboard Shell 9

Block ID: `@ss-blocks/dashboard-shell-09`

### Files Installed

| File | Type | Reuse Plan |
|------|------|-----------|
| `chart-conversion-rate.tsx` | Chart | Admin finance — revenue conversion funnel |
| `chart-performance.tsx` | Chart | Admin dashboard — performance overview |
| `chart-project-timeline.tsx` | Chart | Admin finance — timeline chart |
| `chart-weekly-overview.tsx` | Chart | Admin dashboard — weekly order volume |
| `datatable-user.tsx` | DataTable | Base template for ALL tables (orders, customers, products, staff) |
| `dialog-activity.tsx` | Dialog | Not used — remove in adaptation |
| `dialog-search.tsx` | Dialog | Global search (⌘K) — keep |
| `dropdown-language.tsx` | Dropdown | Not used — remove (single language) |
| `dropdown-notification.tsx` | Dropdown | Notifications — keep |
| `dropdown-profile.tsx` | Dropdown | Profile menu — keep |
| `widget-upgrade-your-plan.tsx` | Widget | Adapt to "Pending Approvals" widget |

### UI Primitives Updated/Added

| Component | Status |
|-----------|--------|
| `checkbox.tsx` | ✅ New |
| `pagination.tsx` | ✅ New |
| `button.tsx` | ⚠️ Updated (may need merge check) |
| `dialog.tsx` | ⚠️ Updated |
| `sheet.tsx` | ⚠️ Updated |
| `sidebar.tsx` | Skipped (already existed) |
| `chart.tsx` | Skipped (already existed) |

### Hooks

| Hook | Purpose |
|------|---------|
| `use-pagination.ts` | ✅ New — pagination logic for datatables |
| `use-mobile.ts` | Skipped (already existed) |

## Adaptation Needed (per GoAds Block Adaptation Protocol)

1. **Strip** `max-w-7xl` from header and main — use dashboard's own container
2. **Remove** `dropdown-language.tsx` import — not needed
3. **Remove** `dialog-activity.tsx` import — not needed
4. **Extract** sidebar nav items to data file: `src/data/admin-nav.ts` / `src/data/portal-nav.ts`
5. **Add** role-based menu filtering logic
6. **Add** breadcrumb component to header
7. **Replace** footer with GoAds copyright
8. **Extract** `DashboardShell` layout to `(admin)/layout.tsx` and `(portal)/layout.tsx`

## Components NOT from shadcn Studio (Build with Primitives)

| Component | Built From | Complexity |
|-----------|-----------|------------|
| `stats-card.tsx` | `Card` + icon + trend | Low |
| `status-badge.tsx` | `Badge` + color map | Low |
| `order-timeline.tsx` | `div` + CSS flex/grid | Medium |
| `copy-button.tsx` | `Button` + clipboard API | Low |
| `empty-state.tsx` | `Card` + icon + text | Low |
| `mobile-warning.tsx` | Fixed div | Low |
