# Component Inventory

## From Dashboard Shell 9 (REUSE)

| Component | Source File | Adapt For |
|-----------|------------|-----------|
| Sidebar + Collapsible Nav | `page.tsx` (inline) | Extract to shared layout, add role-filtering |
| Data Table (sortable, paginated) | `datatable-user.tsx` | Orders, Customers, Products, Staff tables |
| Search Dialog (⌘K) | `dialog-search.tsx` | Global search across orders/customers/products |
| Notification Dropdown | `dropdown-notification.tsx` | Order status change notifications |
| Profile Dropdown | `dropdown-profile.tsx` | User menu (profile, logout, theme toggle) |
| Charts (4 types) | `chart-*.tsx` | Revenue, order volume, conversion charts |
| Upgrade Plan Widget | `widget-upgrade-your-plan.tsx` | Pending approvals widget (sidebar footer) |

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

## Custom Components (BUILD — using shadcn primitives)

| Component | Base | Description |
|-----------|------|-------------|
| `stats-card.tsx` | `Card` + Lucide icon | Number + label + trend arrow + percentage. 4 per row on admin dashboard |
| `status-badge.tsx` | `Badge` | Color-coded order status mapping (see below) |
| `order-timeline.tsx` | Custom div + CSS | Horizontal step indicator: Ordered → Paid → Shipped → Done |
| `copy-button.tsx` | `Button` + `navigator.clipboard` | Click-to-copy for BM ID, invite links. Shows checkmark on success |
| `empty-state.tsx` | `Card` + Lucide icon | Centered icon + message + optional CTA button |
| `mobile-warning.tsx` | `Card` | Banner: "Use desktop for best experience" on admin < 768px |

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

## Dependency Summary

| Package | Already Installed? | Needed For |
|---------|-------------------|------------|
| `@tanstack/react-table` | ✅ Yes (via shell-09) | All data tables |
| `lucide-react` | ✅ Yes | Icons throughout |
| `recharts` | ✅ Yes (via chart) | All charts |
| `date-fns` | ❌ Need to add | Date formatting, relative time |
| `sonner` | ❌ Need to add | Toast notifications (copy success, status update) |
