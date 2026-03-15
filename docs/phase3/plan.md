---
status: in-progress
created: 2026-03-14
branch: main
---

# Phase 3 — Polish & Launch-Ready

> Goal: Fix all bugs, polish UI/UX, make app production-ready before market launch.

---

## Completed (2026-03-14 ~ 2026-03-15)

### Dashboard Shell Overhaul ✅
- Ported shell from shadcnstore template (sidebar, header, footer, nav)
- Twitter theme (#1e9df1), radius 1rem, floating sidebar, icon collapse
- Stats cards, area chart, pie chart, recent transactions, top products, customer insights
- ModeToggle, SidebarNotification, SearchTrigger

### Table UI Overhaul ✅
- Column visibility (Customize Columns dropdown)
- Template-style pagination (Rows per page + Page X of Y + nav buttons)
- Row action menus on all tables
- Rounded border table container, bg-muted header row
- Toolbar: search + filters left, customize + action buttons right

### Order Detail Redesign ✅
- 2-col layout: Order Summaries (Top Products card-list style) + Billing (icon cards with warranty)
- Delivered Items: product-type tabs + AdminDataTable + expandable rows
- Share Link (admin) / View All Products (portal) in toolbar
- Reused components between admin and portal (DRY)

### Portal Shop Redesign ✅
- StatsCard-style product cards, 4-col grid, search
- Buy Now + Ask (Telegram) buttons per card
- $0 prices → "Contact us"

### Products Sync ✅
- Shared ProductTypeTabs component with basePath prop (DRY)
- Both admin/portal use identical layout (title + tabs + table)
- Default shadcn Tabs with Badge counts (primary color)

### Sidebar Polish ✅
- Admin: Products flat link, tab navigation on page
- Portal: Shop → Orders → Products | Tools (Popular always-open + All collapsible)
- Wallet + Profile in user dropdown
- Extensions always-open, All Tools = non-popular only
- Fixed: active state, duplicate keys, parent never active for collapsible

### Toast & Notifications ✅
- All server actions have toast.success/toast.error feedback
- Insufficient balance: actionable error with current balance
- Notification deep links: order_created + item_delivered → /portal/orders/{orderId}

### Bug Fixes ✅
- Sign In button: /auth/login → /sign-in (Clerk)
- NavUser: useClerk SSR → SignOutButton
- EmptyState: icon serialization (server/client boundary)
- NavMain: children/items compat, alwaysOpen support
- Sidebar active state: exact match for root paths
- Tab standardization: default shadcn TabsList/TabsTrigger everywhere
- Border/input colors: darker (#cfd9de) for visibility

### Skeletons ✅
- All routes have loading.tsx: admin (7) + portal (6) + marketing (1)
- Order detail skeleton matches new 2-col layout

---

## Remaining

| # | Task | Priority | Status | Notes |
|---|------|----------|--------|-------|
| 1 | Vercel deploy | Critical | ⏳ | Check build config, env vars, root dir |
| 3 | Clerk webhook publicMetadata | Critical | ⏳ | Code + Clerk Dashboard config |
| 4 | Username+password login | Critical | ⏳ | Clerk Dashboard: enable username, email optional |

---

## Dependencies

```
Remaining (1, 3, 4)  ──BLOCKS──→ Production launch
All UI/UX work       ──DONE──
```
