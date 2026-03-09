# Phase 3: Header + Layout Integration

## Context Links
- [Phase 2: Command Menu Component](./phase-02-command-menu-component.md)
- Site header: `src/components/site-header.tsx`
- Root layout: `src/app/layout.tsx`

## Overview
- **Priority:** P1
- **Status:** pending
- **Description:** Mount `CommandMenu` in root layout and enhance the existing search button in SiteHeader to open the command palette with a visible keyboard shortcut badge.

## Key Insights
- SiteHeader already has a search button (lines 44-48) — just needs onClick + badge
- `CommandMenu` manages its own open state via `useState` — need to expose `setOpen` or use a shared mechanism
- Simplest approach: export a `useCommandMenu` context or just let the button trigger the same Cmd+K keyboard event programmatically
- Even simpler: move `open` state up or use a custom event

## Requirements

### Functional
- Search button in header shows `⌘K` badge (or `Ctrl+K` on Windows)
- Clicking search button opens command palette
- `CommandMenu` renders once in root layout (not per-page)

### Non-functional
- No layout shift when adding CommandMenu
- Minimal changes to existing files

## Architecture

Two approaches for button-to-dialog communication:

**Option A (Recommended): Programmatic keyboard event**
- Button onClick dispatches a synthetic `Cmd+K` keydown event
- CommandMenu's existing listener picks it up
- Zero coupling, no context needed

**Option B: Shared context**
- Create CommandMenuContext with `open` + `setOpen`
- Wrap in layout, consume in header + command-menu
- More boilerplate

**Go with Option A** — KISS.

## Related Code Files
- **Modify:** `src/components/site-header.tsx` — update search button
- **Modify:** `src/app/layout.tsx` — add `<CommandMenu />`
- **Read:** `src/components/command-menu.tsx` (created in Phase 2)

## Implementation Steps

### 1. Update `src/app/layout.tsx`

Add `CommandMenu` import and render inside `ThemeProvider`:

```diff
+ import { CommandMenu } from "@/components/command-menu"

  <ThemeProvider>
    <TooltipProvider>
      <ScrollToTop />
+     <CommandMenu />
      {children}
    </TooltipProvider>
  </ThemeProvider>
```

### 2. Update `src/components/site-header.tsx`

Replace the existing search button (lines 44-48) with an enhanced version:

```tsx
{/* Search — triggers Cmd+K */}
<Button
  variant="outline"
  size="sm"
  className="relative h-9 w-9 px-0 sm:w-auto sm:px-3 sm:pr-10 hover:bg-primary/15 hover:text-foreground dark:hover:bg-primary/15"
  onClick={() => {
    document.dispatchEvent(
      new KeyboardEvent("keydown", { key: "k", metaKey: true })
    )
  }}
>
  <Search className="sm:mr-2" />
  <span className="hidden sm:inline-flex text-sm text-muted-foreground">Search...</span>
  <kbd className="pointer-events-none absolute right-1.5 hidden h-5 select-none items-center gap-0.5 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground sm:flex">
    <span className="text-xs">⌘</span>K
  </kbd>
</Button>
```

- On mobile: icon-only button (same as current)
- On sm+: shows "Search..." text + ⌘K badge
- onClick dispatches synthetic keyboard event to open CommandMenu

### 3. SiteHeader becomes client component

Since we need onClick, SiteHeader must be `"use client"`. Check if it already is — if not, add the directive. Currently it imports other client components but doesn't have `"use client"` itself since it uses no hooks. The onClick handler with `document.dispatchEvent` requires client-side JS.

**Alternative:** Extract just the search button into a tiny `SearchTrigger` client component to avoid making the whole header a client component.

Recommended: Create `src/components/search-trigger.tsx` (~20 lines):
```tsx
"use client"

import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SearchTrigger() {
  return (
    <Button
      variant="outline"
      size="sm"
      className="relative h-9 w-9 px-0 sm:w-auto sm:px-3 sm:pr-10 hover:bg-primary/15 hover:text-foreground dark:hover:bg-primary/15"
      onClick={() => {
        document.dispatchEvent(
          new KeyboardEvent("keydown", { key: "k", metaKey: true })
        )
      }}
    >
      <Search className="sm:mr-2" />
      <span className="hidden sm:inline-flex text-sm text-muted-foreground">Search...</span>
      <kbd className="pointer-events-none absolute right-1.5 hidden h-5 select-none items-center gap-0.5 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground sm:flex">
        <span className="text-xs">⌘</span>K
      </kbd>
    </Button>
  )
}
```

Then in `site-header.tsx`, replace the search Button block with `<SearchTrigger />`.

## Todo List
- [ ] Create `src/components/search-trigger.tsx` (client component)
- [ ] Replace search button in `site-header.tsx` with `<SearchTrigger />`
- [ ] Add `<CommandMenu />` to `layout.tsx`
- [ ] Verify Cmd+K opens from both keyboard and button click
- [ ] Verify no layout shift or hydration issues
- [ ] Test on mobile (icon-only) and desktop (with badge)

## Success Criteria
- Search button shows ⌘K badge on desktop
- Clicking button opens command palette
- Cmd+K keyboard shortcut still works
- CommandMenu available on every page (mounted in root layout)
- No hydration mismatches or console errors
- Mobile view: compact icon-only search button

## Risk Assessment
- **Synthetic keyboard event may not trigger** — `document.dispatchEvent` with `KeyboardEvent` works in all modern browsers; cmdk listener uses `metaKey` check which synthetic events support
- **Server component issue** — mitigated by extracting SearchTrigger as separate client component
