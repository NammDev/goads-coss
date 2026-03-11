# Layout Structure

## Navigation: Sidebar (Collapsible)

Based on Dashboard Shell 9 pattern — collapsible sidebar with icon-only mode.

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

- **Collapse behavior**: `collapsible='icon'` — shrinks to icon-only rail
- **Role-aware**: Management group hidden for non-super_admin
- **Active state**: `SidebarMenuButton` isActive prop
- **Badges**: Order count badge on Orders item

### Header

```
┌──────────────────────────────────────────────────────────┐
│ [☰] │ [Search... ⌘K]          │ [🔔] [👤 John Doe Admin] │
└──────────────────────────────────────────────────────────┘
```

- `SidebarTrigger` — toggle sidebar
- `SearchDialog` (command palette) — ⌘K shortcut
- Notification dropdown — bell icon with dot indicator
- Profile dropdown — avatar + name + role, links to profile/logout
- **NO** language switcher (Vietnamese-only UI labels)
- **NO** activity dialog (not needed for GoAds scope)

### Content Area

```tsx
<main className="flex-1 px-4 py-6 sm:px-6">
  <div className="mx-auto max-w-7xl">
    {/* Breadcrumbs */}
    {/* Page content */}
  </div>
</main>
```

- Max-width: `max-w-7xl` (1280px) inside main area
- Padding: `px-4 py-6 sm:px-6`
- Scrolling: main area scrolls, sidebar + header sticky

### Mobile Strategy

| Panel | Strategy |
|-------|----------|
| **Admin** | Desktop-only. Show warning banner on `< 768px`: "Use desktop for best experience" |
| **Portal** | Fully responsive. Sidebar → Sheet overlay on mobile. Content stacks vertically |

### Portal Sidebar (Simplified)

```
┌─────────────────────┐
│ GoAds Logo           │
├─────────────────────┤
│ Dashboard            │
│ Orders               │
│ Products             │
│ Tools                │
│ Profile              │
├─────────────────────┤
│ User avatar + name   │
└─────────────────────┘
```

- Fewer items, no management group
- No footer widget
- Mobile: sidebar becomes Sheet (slide-in from left)
