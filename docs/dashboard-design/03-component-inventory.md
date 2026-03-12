# Component Inventory — Status: IMPLEMENTED

## From Dashboard Shell 9 — REUSED

| Component | File | Reused For |
|-----------|------|-----------|
| Data Table Template | `datatable-user.tsx` (466 LOC) | Orders, customers, products, staff tables |
| Charts (4 types) | `chart-*.tsx` | `chart-weekly-overview.tsx`, `chart-performance.tsx`, `chart-conversion-rate.tsx`, `chart-project-timeline.tsx` |
| Search Dialog | `dialog-search.tsx` | Command palette (⌘K) in header |
| Notifications Dropdown | `dropdown-notification.tsx` | Header notifications bell |
| Profile Dropdown | `dropdown-profile.tsx` | Header user menu (profile, logout, theme) |
| Pending Widget | `widget-upgrade-your-plan.tsx` | Adapted to sidebar footer "Pending Approvals" |
| Pagination | `pagination.tsx` | Table pagination controls |
| Checkbox | `checkbox.tsx` | Table row selection

## From shadcn/ui Primitives (ALREADY INSTALLED)

| Component | Package | Usage |
|-----------|---------|-------|
| `Badge` | `@/components/ui/badge` | Status badges, role badges, type badges |
| `Card` | `@/components/ui/card` | Stats cards, info cards, product cards |
| `Table` | `@/components/ui/table` | Base for all data tables |
| `Tabs` | `@/components/ui/tabs` | Order detail sections, settings tabs |
| `Select` | `@/components/ui/select` | Status update, filters |
| `Input` | `@/components/ui/input` | Search, form fields |
| `Label` | `@/components/ui/label` | Form labels |
| `Separator` | `@/components/ui/separator` | Section dividers |
| `Skeleton` | `@/components/ui/skeleton` | Loading states |
| `Tooltip` | `@/components/ui/tooltip` | Icon tooltips |
| `Checkbox` | `@/components/ui/checkbox` | Table row selection |
| `Pagination` | `@/components/ui/pagination` | Table pagination |
| `Sheet` | `@/components/ui/sheet` | Mobile sidebar, quick edit panels |
| `Dialog` | `@/components/ui/dialog` | Confirm actions, ship product flow |
| `Breadcrumb` | `@/components/ui/breadcrumb` | Route-based breadcrumbs |
| `Avatar` | `@/components/ui/avatar` | User avatars |

## Custom Components Built — Using shadcn Primitives

| Component | LOC | Location | Description |
|-----------|-----|----------|-------------|
| `stats-card.tsx` | 46 | `src/components/dashboard/` | Stats card: number + label + trend % |
| `status-badge.tsx` | 55 | `src/components/dashboard/` | Color-coded status (8 statuses: pending, confirmed, paid, processing, shipped, completed, cancelled, refunded) |
| `order-timeline.tsx` | 85 | `src/components/dashboard/` | Timeline: Ordered → Confirmed → Paid → Shipped → Done |
| `copy-button.tsx` | 42 | `src/components/dashboard/` | Copy-to-clipboard button (BM ID, invite links, shows checkmark on success) |
| `empty-state.tsx` | 28 | `src/components/dashboard/` | Empty state placeholder with icon + message + optional CTA |
| `mobile-warning.tsx` | 13 | `src/components/dashboard/` | Fixed banner: "Sử dụng máy tính để có trải nghiệm tốt nhất" on admin <768px |
| `dashboard-sidebar.tsx` | 142 | `src/components/dashboard/` | Sidebar with role-aware nav groups + pending widget |
| `dashboard-header.tsx` | 79 | `src/components/dashboard/` | Header with trigger, search, notifications, profile |
| `dashboard-breadcrumb.tsx` | 81 | `src/components/dashboard/` | Route-based breadcrumbs |

## Status Badge Color Map

```typescript
const ORDER_STATUS_COLORS = {
  pending:    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
  confirmed:  'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  paid:       'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400',
  processing: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
  shipped:    'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  completed:  'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400',
  cancelled:  'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  refunded:   'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400',
} as const
```

## Mock Data Files

| File | LOC | Purpose |
|------|-----|---------|
| `src/data/mock-orders.ts` | 196 | 45 sample orders with products, customers, status |
| `src/data/mock-customers.ts` | 147 | 12 sample customers with contact info, spending |
| `src/data/mock-products.ts` | 89 | 6 product types (Agency, BM, Google, TikTok, Meta Asset) |
| `src/data/mock-delivered-items.ts` | 201 | Delivered products per customer |
| `src/data/admin-nav.ts` | 46 | Admin navigation items (role-aware) |
| `src/data/portal-nav.ts` | 24 | Portal navigation items |

## Dependencies — All Available

| Package | Status | Used For |
|---------|--------|----------|
| `@tanstack/react-table` | ✅ Installed | Data tables (orders, customers, products, staff) |
| `lucide-react` | ✅ Installed | Icons throughout |
| `recharts` | ✅ Installed | Charts (weekly, performance, conversion, timeline) |
| `date-fns` | ✅ Installed | Date formatting, relative time |
| `sonner` | ✅ Installed | Toast notifications (copy success) |
