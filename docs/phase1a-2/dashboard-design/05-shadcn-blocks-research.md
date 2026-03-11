# shadcn Studio Blocks Research

## Dashboard Shell 9 — INSTALLED & INTEGRATED

Block ID: `@ss-blocks/dashboard-shell-09` ✅ Integrated

### Files Used — ACTIVE

| File | Type | Used For |
|------|------|----------|
| `chart-conversion-rate.tsx` | Chart | ✅ `/admin/finance` conversion funnel |
| `chart-performance.tsx` | Chart | ✅ `/admin` dashboard performance |
| `chart-project-timeline.tsx` | Chart | ✅ `/admin/finance` timeline |
| `chart-weekly-overview.tsx` | Chart | ✅ `/admin` dashboard weekly volume |
| `datatable-user.tsx` | DataTable | ✅ Base template for all admin tables |
| `dialog-search.tsx` | Dialog | ✅ Header command palette (⌘K) |
| `dropdown-notification.tsx` | Dropdown | ✅ Header notifications |
| `dropdown-profile.tsx` | Dropdown | ✅ Header user menu |
| `widget-upgrade-your-plan.tsx` | Widget | ✅ Adapted: sidebar pending approvals |

### Files NOT Used — REMOVED

| File | Reason |
|------|--------|
| `dialog-activity.tsx` | Not needed for GoAds scope |
| `dropdown-language.tsx` | Single language (Vietnamese only) |

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

## Adaptations Implemented ✅

1. ✅ **Max-width**: Kept `max-w-7xl` in content area (dashboard pattern)
2. ✅ **Removed**: `dropdown-language.tsx` import
3. ✅ **Removed**: `dialog-activity.tsx` import
4. ✅ **Extracted**: Nav items to `src/data/admin-nav.ts` (46 LOC) and `src/data/portal-nav.ts` (24 LOC)
5. ✅ **Role-aware**: Sidebar filters nav groups by `user.role` (super_admin sees Finance/Staff/Settings)
6. ✅ **Breadcrumb**: Added `dashboard-breadcrumb.tsx` (81 LOC) route-based
7. ✅ **Footer**: Custom copyright in layout (no widget)
8. ✅ **Layout**: Shell extracted to `admin/layout.tsx` + `portal/layout.tsx`

## Components NOT from shadcn Studio (Build with Primitives)

| Component | Built From | Complexity |
|-----------|-----------|------------|
| `stats-card.tsx` | `Card` + icon + trend | Low |
| `status-badge.tsx` | `Badge` + color map | Low |
| `order-timeline.tsx` | `div` + CSS flex/grid | Medium |
| `copy-button.tsx` | `Button` + clipboard API | Low |
| `empty-state.tsx` | `Card` + icon + text | Low |
| `mobile-warning.tsx` | Fixed div | Low |
