# Phase 0 — Dashboard Shell Overhaul (on main)

## Overview
- **Priority:** Critical (blocks all WTs)
- **Status:** ⏳
- **Effort:** 1-2 days
- **Branch:** main (NOT a worktree)

## Goal
Port shell components from [shadcn-dashboard-landing-template](https://github.com/shadcnstore/shadcn-dashboard-landing-template/tree/main/nextjs-version) to GoAds. Pixel-perfect match for: sidebar, header, footer, layout, stats cards, table shell. GoAds only changes content/data.

## Source Template
- **Repo:** `shadcnstore/shadcn-dashboard-landing-template` (nextjs-version)
- **Stack match:** Next.js 16, React 19, Tailwind 4, shadcn/ui, OKLch, Sonner — identical to GoAds
- **License:** Check before porting

---

## Step 0: Clone Template Locally

```bash
git clone https://github.com/shadcnstore/shadcn-dashboard-landing-template.git /tmp/shadcn-dashboard-template
```

Reference path: `/tmp/shadcn-dashboard-template/nextjs-version/src/`

---

## Step 1: Port Layout Shell

### Source → Target Mapping

| Template File | GoAds Target | Action |
|--------------|-------------|--------|
| `app/(dashboard)/layout.tsx` | `app/src/app/admin/layout.tsx` + `portal/layout.tsx` | Adapt structure (keep GoAds auth) |
| `components/app-sidebar.tsx` | `app/src/components/dashboard/app-sidebar.tsx` | Copy + adapt nav data |
| `components/nav-main.tsx` | `app/src/components/dashboard/nav-main.tsx` | Copy (handles collapsible groups) |
| `components/nav-user.tsx` | `app/src/components/dashboard/nav-user.tsx` | Copy + wire Clerk user data |
| `components/site-header.tsx` | `app/src/components/dashboard/site-header.tsx` | Copy + wire GoAds search |
| `components/site-footer.tsx` | `app/src/components/dashboard/site-footer.tsx` | Copy |
| `components/command-search.tsx` | `app/src/components/dashboard/command-search.tsx` | Copy + wire GoAds search action |

### Files to DELETE (replaced):
- `app/src/components/dashboard/dashboard-sidebar.tsx`
- `app/src/components/dashboard/dashboard-header.tsx`
- `app/src/components/dashboard/dashboard-breadcrumb.tsx`
- `app/src/app/admin/admin-shell.tsx`
- `app/src/app/portal/portal-shell.tsx`

### Files to UPDATE (imports only):
- `app/src/app/admin/layout.tsx` — use new shell
- `app/src/app/portal/layout.tsx` — use new shell
- `app/src/data/admin-nav.ts` — adapt to template nav format
- `app/src/data/portal-nav.ts` — adapt to template nav format

---

## Step 2: Adapt Navigation Data

### Template nav format:
```typescript
{
  label: "Group Name",
  items: [
    { title: "Page", url: "/path", icon: IconComponent },
    {
      title: "Section", url: "#", icon: Icon,
      items: [{ title: "Sub", url: "/sub" }]  // collapsible
    },
  ]
}
```

### GoAds Admin Nav → Template Format:
```
Dashboards
  └── Dashboard        → /admin

Management
  ├── Customers        → /admin/customers
  ├── Orders           → /admin/orders
  ├── Products         → /admin/products (collapsible by type)
  └── Staff            → /admin/staff

Finance
  └── Finance          → /admin/finance

Settings
  └── Settings         → /admin/settings
```

### GoAds Portal Nav → Template Format:
```
Main
  ├── Shop             → /portal
  ├── Orders           → /portal/orders
  ├── Products         → /portal/products (tabs, not sidebar subs)
  └── Wallet           → /portal/wallet

Account
  └── Profile          → /portal/profile

Tools
  └── Tools            → /portal/tools
```

---

## Step 3: Wire GoAds Data into Shell

### Header
- Search: wire to existing `SearchDialog` (Cmd+K with real DB search)
- Notifications: keep `NotificationDropdown` in header
- Profile: wire `nav-user.tsx` to Clerk `useUser()` data
- Remove template's "Blocks", "Landing Page", "GitHub" links
- Add GoAds-specific links if needed

### Sidebar
- Logo: GoAds logo + "Admin Dashboard" / "Customer Portal"
- Nav groups: from GoAds nav data files
- Footer: Clerk user info + sign out

### Footer
- Simple copyright footer matching template style

---

## Step 4: Port Stats Cards

### Source:
- `users/components/stat-cards.tsx` — 4-card grid with icon, value, growth badge

### Adapt for GoAds:
- Admin: Total Revenue, Customers, Orders, Products
- Portal: Balance, Orders, Products Delivered, Pending

### Keep GoAds queries — only change the card UI component.

---

## Step 5: Verify & Clean Up

### Checklist:
- [ ] Admin dashboard renders with new shell
- [ ] Portal dashboard renders with new shell
- [ ] Sidebar: correct nav items, active state highlights current route
- [ ] Sidebar: collapsible sections work (Products sub-items)
- [ ] Sidebar: mobile responsive (Sheet on small screens)
- [ ] Header: search (Cmd+K) works
- [ ] Header: notifications bell works
- [ ] Header: profile dropdown with Clerk data
- [ ] Header: theme toggle (dark/light)
- [ ] Footer: renders at bottom
- [ ] Stats cards: real data from DB
- [ ] All existing pages still render correctly inside new shell
- [ ] No TypeScript errors (`pnpm build` passes)
- [ ] Dark mode works throughout

### Delete leftovers:
- [ ] Remove old shell components
- [ ] Remove unused imports
- [ ] Clean up any template-specific code (theme customizer, upgrade button)

---

## Step 6: Push & Notify

1. Commit: `feat(dashboard): port shell from shadcn-dashboard-template`
2. Push to main
3. All WTs fetch main before starting

---

## Risk Assessment

| Risk | Mitigation |
|------|-----------|
| Template UI components differ from GoAds shadcn/ui versions | Both use same shadcn/ui — should be compatible |
| Template sidebar component API differs | Check `components/ui/sidebar.tsx` — may need to update GoAds version |
| Clerk integration breaks in new shell | Keep auth logic in layout.tsx (server component), pass data to client shell |
| Dark mode colors mismatch | GoAds uses custom oklch palette — override template defaults with GoAds CSS vars |

## What NOT to Port
- Theme customizer overlay (`theme-customizer.tsx`)
- Upgrade to Pro button
- Sidebar notification popup
- Landing page components
- Mail/Chat/Calendar/Tasks app pages
- Auth pages (using Clerk)
- `use-theme-manager.ts` (GoAds has own theme system)
- `use-circular-transition.ts`
