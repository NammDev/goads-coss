# Layout Structure — Status: IMPLEMENTED

## Navigation: Sidebar (Collapsible)

Implemented using Dashboard Shell 9 pattern — collapsible sidebar with icon-only mode.

### Sidebar

```
┌─────────────────────┐
│ GoAds Logo           │  ← SidebarHeader: logo + "GoAds"
├─────────────────────┤
│ Dashboard            │  ← Main nav group
│ Orders          (5)  │  ← Badge = pending count
│ Customers            │
│ Products             │
├─────────────────────┤
│ MANAGEMENT *         │  ← super_admin only group
│ Finance              │
│ Staff                │
│ Settings             │
├─────────────────────┤
│ ┌─────────────────┐ │  ← SidebarFooter widget
│ │ Pending: 13     │ │     (pending approvals card)
│ │ ○○○○ avatars    │ │
│ └─────────────────┘ │
│ User avatar + name   │  ← Profile trigger
└─────────────────────┘
```

**Implementation:**
- **Component**: `dashboard-sidebar.tsx` (142 LOC) in `src/components/dashboard/`
- **Collapse**: `collapsible='icon'` mode works automatically
- **Role-aware**: Nav items filtered by `user.role` in sidebar component
- **Active state**: Route-based using Next.js router
- **Badges**: Pending count from mock data (displays on Orders item)

### Header

```
┌──────────────────────────────────────────────────────────┐
│ [☰] │ [Search... ⌘K]          │ [🔔] [👤 John Doe Admin] │
└──────────────────────────────────────────────────────────┘
```

**Implementation:**
- **Trigger**: `SidebarTrigger` from shell-09 (⌘K shortcut)
- **Search**: `dialog-search.tsx` from shell-09 (command palette)
- **Notifications**: `dropdown-notification.tsx` from shell-09
- **Profile**: `dropdown-profile.tsx` from shell-09 (theme toggle, logout)
- **Language**: None — Vietnamese-only UI
- **Components**: `dashboard-header.tsx` (79 LOC) wraps all header elements

### Content Area — IMPLEMENTED

```tsx
<main className="flex-1 px-4 py-6 sm:px-6">
  <div className="mx-auto max-w-7xl">
    <DashboardBreadcrumb /> {/* dashboard-breadcrumb.tsx */}
    {/* Page content */}
  </div>
</main>
```

- **Max-width**: `max-w-7xl` (1280px)
- **Padding**: `px-4 py-6 sm:px-6`
- **Scrolling**: Main scrolls, sidebar + header sticky (via SidebarProvider)
- **Breadcrumb**: `dashboard-breadcrumb.tsx` (81 LOC) route-based

### Mobile Strategy — IMPLEMENTED

| Panel | Strategy | Implementation |
|-------|----------|-----------------|
| **Admin** | Desktop-only warning on <768px | `mobile-warning.tsx` (13 LOC) — fixed banner |
| **Portal** | Fully responsive | Sidebar → Sheet on mobile, content stacks |

### Portal Sidebar (Simplified) — IMPLEMENTED

File: `/src/data/portal-nav.ts` (24 LOC)

```
Main routes:
  - Dashboard
  - Đơn hàng (Orders)
  - Sản phẩm (Products)
  - Công cụ (Tools)
  - Hồ sơ (Profile)
```

- Fewer items than admin, no management group
- No footer widget
- Mobile: Sheet overlay with swipe-to-close
- Responsive CSS via `md:` breakpoints
