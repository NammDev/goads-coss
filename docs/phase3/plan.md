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
- 2-col layout: Order Summaries (Top Products card-list style) + Billing (icon cards)
- Delivered Items: product-type tabs + AdminDataTable + expandable rows
- Share Link (admin) / View All Products (portal) in toolbar
- Reused components between admin and portal (DRY)

### Portal Shop Redesign ✅
- StatsCard-style product cards, 4-col grid, pill tabs, search
- Buy Now + Ask (Telegram) buttons per card
- $0 prices → "Contact us"

### Products Sync ✅
- Shared ProductTypeTabs component with basePath prop
- Both admin/portal use identical layout (title + tabs + table)
- Portal redirect /products → /products/bm

### Sidebar Polish ✅
- Admin: Products as flat link (no dropdown), tab-based navigation on page
- Portal: Shop → Orders → Products | Tools (Popular always-open + All collapsible)
- Wallet moved to user dropdown
- Profile removed from sidebar (in user dropdown)
- Fixed active state: exact match for root paths, sub-item match for collapsible groups

### Bug Fixes ✅
- NavUser: useClerk SSR → SignOutButton
- EmptyState: icon serialization (server/client boundary)
- NavMain: children/items compat, duplicate keys
- Sidebar active state: double-blue highlight
- Tab text visibility (Customer Insights)
- Tool textarea border visibility

---

## Remaining

| # | Task | Priority | Status |
|---|------|----------|--------|
| 1 | Vercel deploy not showing code | Critical | ⏳ |
| 2 | Sign In button `/auth/login` → `/sign-in` | Critical | ⏳ |
| 3 | Clerk webhook: sync role to publicMetadata | Critical | ⏳ |
| 4 | Username+password login (Clerk Dashboard config) | Critical | ⏳ |
| 10 | Toast/notification audit | Medium | ⏳ |
| 11 | Error messages (balance=0) | Medium | ⏳ |

---

## Dependencies

```
Remaining bugs (1-4)  ──BLOCKS──→ Production launch
Toast/errors (10-11)  ──NO DEPS── can do anytime
```
