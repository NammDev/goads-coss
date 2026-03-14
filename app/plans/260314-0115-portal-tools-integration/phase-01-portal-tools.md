# Phase 1 — Portal Tools Integration

## Context Links
- Plan: [plan.md](./plan.md)
- Tools registry: `src/data/tools-registry.ts`
- Portal nav: `src/data/portal-nav.ts`
- Dashboard sidebar: `src/components/dashboard/dashboard-sidebar.tsx`
- Tool page shell: `src/app/tools/layout.tsx` (exports `ToolPageShell`)
- Tools sidebar: `src/components/tools-sidebar.tsx`
- Portal shell: `src/app/portal/portal-shell.tsx`

## Overview
- **Priority**: Medium
- **Status**: ⏳
- **Description**: Bring all 20 marketing tools into portal via context-based shell adaptation + thin page wrappers + sidebar nav restructuring

## Key Insights
- Each tool has `page.tsx` (metadata) + `*-content.tsx` (client component wrapping `ToolPageShell`)
- `ToolPageShell` adds `ToolsSidebar` (desktop) — must skip in portal since dashboard sidebar handles nav
- `ToolsSidebarMobile` inside content components — must also skip in portal
- Portal sidebar uses `NavGroup > NavItem > NavSubItem` with `CollapsibleNavItem` for children
- 20 tools across 3 categories: Security (3), Data Processing (6), Utilities (12)
- Existing portal tools page = BM extension download guide → moves to `/portal/tools/extensions`

## Requirements

### Functional
- All 20 tools accessible at `/portal/tools/{slug}`
- Tool UI identical to marketing version (same content components)
- Portal sidebar: "Tools" group with 3 category collapsibles + Extensions
- Existing BM extension page preserved at `/portal/tools/extensions`
- Tools hub page at `/portal/tools` showing all tools grid (reuse `ToolsHubContent`)

### Non-functional
- No changes to existing marketing tool pages
- Minimal code duplication (thin wrappers only)
- No new shared components — leverage existing `ToolPageShell` + context

## Architecture

### React Context Pattern
```
src/lib/tool-context.tsx (NEW)
  - createContext<'marketing' | 'portal'>('marketing')
  - ToolContextProvider component
  - useToolContext() hook

src/app/tools/layout.tsx (MODIFY)
  - ToolPageShell checks useToolContext()
  - portal → skip ToolsSidebar, render children directly
  - marketing → keep current behavior

src/components/tools-sidebar.tsx (MODIFY)
  - ToolsSidebarMobile checks useToolContext()
  - portal → return null
  - marketing → keep current behavior
```

### Portal Tools Layout
```
src/app/portal/tools/layout.tsx (NEW)
  - Wraps children in <ToolContextProvider value="portal">
  - No other markup needed (portal layout already provides dashboard chrome)
```

### Portal Tool Pages (20 thin wrappers)
```
src/app/portal/tools/2fa/page.tsx
  import { TwoFaContent } from '@/app/tools/2fa/two-fa-content'
  export default function Page() { return <TwoFaContent /> }

src/app/portal/tools/filter/page.tsx
  import { FilterContent } from '@/app/tools/filter/filter-content'
  export default function Page() { return <FilterContent /> }

... (same pattern for all 20)
```

### Sidebar Nav Structure
```
portal-nav.ts (MODIFY)
  - Remove flat Tools NavItem
  - Return tools as separate NavGroup with label "Tools"
  - 3 category NavItems with children:
    Security (3 children)
    Data Processing (6 children)
    Utilities (12 children)
    Extensions (1 child: BM Extension)

portal-shell.tsx (MODIFY)
  - Add tools NavGroup to navGroups array passed to DashboardSidebar
```

### Tools Hub in Portal
```
src/app/portal/tools/page.tsx (MODIFY existing)
  - Replace BM extension content with ToolsHubContent (same grid as marketing)
  - Or show filtered/simplified version without hero
```

## Related Code Files

### Files to Create
- `src/lib/tool-context.tsx` — React context provider
- `src/app/portal/tools/layout.tsx` — Portal tools layout with context
- `src/app/portal/tools/2fa/page.tsx` — 2FA wrapper
- `src/app/portal/tools/batch-watermark/page.tsx`
- `src/app/portal/tools/bookmarklets/page.tsx`
- `src/app/portal/tools/check-content/page.tsx`
- `src/app/portal/tools/check-duplicates/page.tsx`
- `src/app/portal/tools/check-ip/page.tsx`
- `src/app/portal/tools/check-uid/page.tsx`
- `src/app/portal/tools/cookie/page.tsx`
- `src/app/portal/tools/fake-id/page.tsx`
- `src/app/portal/tools/fb-icons/page.tsx`
- `src/app/portal/tools/filter/page.tsx`
- `src/app/portal/tools/filter-text/page.tsx`
- `src/app/portal/tools/find-fb-id/page.tsx`
- `src/app/portal/tools/merge/page.tsx`
- `src/app/portal/tools/mini-tools/page.tsx`
- `src/app/portal/tools/notepad/page.tsx`
- `src/app/portal/tools/random-face/page.tsx`
- `src/app/portal/tools/remove-duplicates/page.tsx`
- `src/app/portal/tools/split-data/page.tsx`
- `src/app/portal/tools/extensions/page.tsx` — moved from current tools page

### Files to Modify
- `src/app/tools/layout.tsx` — ToolPageShell uses context
- `src/components/tools-sidebar.tsx` — ToolsSidebarMobile uses context
- `src/data/portal-nav.ts` — Add tools NavGroup with categories
- `src/app/portal/portal-shell.tsx` — Pass tools NavGroup to sidebar
- `src/app/portal/tools/page.tsx` — Replace with tools hub grid

## Implementation Steps

### Step 1: Create ToolContext
1. Create `src/lib/tool-context.tsx`
2. Export `ToolContextProvider` and `useToolContext()`
3. Default value: `'marketing'`

### Step 2: Adapt ToolPageShell
1. Read `src/app/tools/layout.tsx`
2. Import `useToolContext` in `ToolPageShell`
3. If portal: return `<div className="min-w-0 flex-1">{children}</div>` (no sidebar, no section wrapper)
4. If marketing: keep existing behavior

### Step 3: Adapt ToolsSidebarMobile
1. Read `src/components/tools-sidebar.tsx`
2. Import `useToolContext` in `ToolsSidebarMobile`
3. If portal: return `null`
4. If marketing: keep existing behavior

### Step 4: Create Portal Tools Layout
1. Create `src/app/portal/tools/layout.tsx`
2. Wrap children in `<ToolContextProvider value="portal">`

### Step 5: Create 20 Portal Tool Pages
1. For each tool slug, create `src/app/portal/tools/{slug}/page.tsx`
2. Each imports the `*-content.tsx` component from `src/app/tools/{slug}/`
3. Each just renders `<ToolContent />`

### Step 6: Migrate BM Extension Page
1. Move current `src/app/portal/tools/page.tsx` content to `src/app/portal/tools/extensions/page.tsx`
2. Update `src/app/portal/tools/page.tsx` to show tools hub grid

### Step 7: Update Portal Sidebar Nav
1. Update `src/data/portal-nav.ts`:
   - Import tool icons from tools-registry or lucide
   - Build tools NavGroup with 3 categories + Extensions
   - Each category = NavItem with children (NavSubItem per tool)
2. Update `src/app/portal/portal-shell.tsx` to pass tools NavGroup

### Step 8: Update Tools Hub for Portal
1. Modify `src/app/portal/tools/page.tsx`
2. Show simplified tools grid (reuse `ToolsHubContent` or tools-registry data)
3. Links point to `/portal/tools/{slug}` instead of `/tools/{slug}`

## Todo List
- [ ] Create `tool-context.tsx`
- [ ] Modify `ToolPageShell` to check context
- [ ] Modify `ToolsSidebarMobile` to check context
- [ ] Create portal tools `layout.tsx`
- [ ] Create 20 portal tool page wrappers
- [ ] Move BM extension to `/portal/tools/extensions`
- [ ] Update portal tools hub page
- [ ] Update `portal-nav.ts` with tools categories
- [ ] Update `portal-shell.tsx` to pass tools NavGroup
- [ ] Verify all tools render correctly in portal
- [ ] Verify marketing tools still work unchanged

## Success Criteria
- All 20 tools accessible and functional at `/portal/tools/{slug}`
- Portal sidebar shows Tools group with 3 collapsible categories
- Marketing tools pages completely unaffected
- BM extension page accessible at `/portal/tools/extensions`
- No duplicate logic — all tools share single content component source

## Risk Assessment
- **ToolPageShell is exported from layout.tsx**: Need to ensure it becomes a client component or context is handled correctly. Since content components are already `'use client'`, and ToolPageShell is called inside them, this should work.
- **Links inside tools**: Some tools may have hardcoded `/tools/` links (e.g., sidebar nav links). These will point to marketing — acceptable since portal sidebar handles portal nav.
- **IP Checker external API**: Uses ipinfo.io — works same in portal, no auth needed.

## Security Considerations
- Portal tools are behind Clerk auth (portal routes are protected in middleware)
- All tools are client-side only (no server-side data exposure)
- No additional permissions needed — tools are utility functions
