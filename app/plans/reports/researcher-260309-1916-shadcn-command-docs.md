# shadcn/ui Command Component Research Report

**Date:** March 9, 2026 | **Status:** Research Complete

## Executive Summary

shadcn/ui Command component (`cmdk`-based) provides a composable command palette system suitable for implementing Cmd+K search interfaces. Both Command and Dialog components are **already installed and configured** in the GoAds project with project-specific styling applied.

---

## 1. Command Component Architecture

### Core Dependencies
- **cmdk** (`^1.1.1`) - Primitive command/search component library
- **@radix-ui** - Dialog integration via Radix UI
- **lucide-react** - Icons (SearchIcon for input)

### Component Hierarchy

```
Command (container)
├── CommandInput (search field with icon)
├── CommandList (scrollable results container, max-h-[300px])
│   ├── CommandGroup (categorized sections)
│   │   ├── CommandItem (individual selectable option)
│   │   └── CommandItem
│   ├── CommandSeparator (visual divider)
│   └── CommandEmpty (no results fallback)
└── CommandShortcut (keyboard shortcut label)
```

### Key Features
- **Keyboard navigation**: Built into cmdk primitive (arrow keys, enter to select)
- **Filtering**: cmdk handles value-based filtering automatically
- **Accessibility**: data-selected/data-disabled attributes for state management
- **Data slots**: All components use `data-slot="command-*"` for style targeting

---

## 2. Component API Reference

### Command
**Base container, wraps cmdk Command primitive**

```typescript
<Command className={cn(...)}>
  {children}
</Command>
```

Props: Passes through to cmdk `Command` (React.ComponentProps)
- Default styling: `rounded-md bg-popover text-popover-foreground`

### CommandDialog
**Preset wrapper combining Dialog + Command for modal Cmd+K search**

```typescript
<CommandDialog
  open={open}
  onOpenChange={setOpen}
  title="Command Palette"        // DialogTitle (sr-only)
  description="Search for..."    // DialogDescription (sr-only)
  showCloseButton={true}         // Toggle close (X) button
  className=""                   // Additional Command className
>
  {children}
</CommandDialog>
```

**Props:**
- `title` (string): Dialog title for a11y (hidden visually)
- `description` (string): Dialog description for a11y (hidden visually)
- `showCloseButton` (boolean): Show/hide top-right close button. Default: `true`
- `className` (string): Applied to inner Command wrapper
- Inherits Dialog root props (open, onOpenChange, etc.)

### CommandInput
**Search/filter input with SearchIcon**

```typescript
<CommandInput
  placeholder="Search commands..."
  className=""
/>
```

Default styling:
- Wrapper height: `h-12` (inside CommandDialog) or `h-9` (standalone)
- Input styling: `bg-transparent py-3 text-sm outline-hidden`
- Icon: SearchIcon (size-4, opacity-50)
- Border: `border-b` separator

### CommandList
**Scrollable container for results**

```typescript
<CommandList className="">
  {items}
</CommandList>
```

Default: `max-h-[300px] overflow-y-auto scroll-py-1`

### CommandGroup
**Categorized section with optional heading**

```typescript
<CommandGroup heading="Quick Actions">
  <CommandItem>Action 1</CommandItem>
  <CommandItem>Action 2</CommandItem>
</CommandGroup>
```

Props: `heading` (string) - rendered as group title
Default styling: `p-1`, heading has `px-2 py-1.5 text-xs font-medium text-muted-foreground`

### CommandItem
**Selectable list item**

```typescript
<CommandItem value="id-or-searchable-text">
  <IconComponent />
  <span>Label</span>
  <CommandShortcut>⌘K</CommandShortcut>
</CommandItem>
```

Props: `value` - search/filter identifier
Default states:
- `data-selected="true"`: `bg-accent text-accent-foreground`
- `data-disabled="true"`: `opacity-50 pointer-events-none`

### CommandEmpty
**Fallback when no results match**

```typescript
<CommandEmpty>No results found.</CommandEmpty>
```

Default: `py-6 text-center text-sm`

### CommandSeparator
**Visual divider between groups**

```typescript
<CommandSeparator />
```

Default: `-mx-1 h-px bg-border`

### CommandShortcut
**Keyboard shortcut hint (right-aligned label)**

```typescript
<CommandShortcut>⌘K</CommandShortcut>
```

Default: `ml-auto text-xs tracking-widest text-muted-foreground`

---

## 3. Dialog Integration Pattern for Cmd+K

### Implementation Pattern

```typescript
// 1. State management
const [open, setOpen] = useState(false)

// 2. Global keyboard listener (Cmd+K / Ctrl+K)
useEffect(() => {
  const down = (e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault()
      setOpen(open => !open)
    }
  }
  document.addEventListener("keydown", down)
  return () => document.removeEventListener("keydown", down)
}, [])

// 3. CommandDialog wrapper
<CommandDialog open={open} onOpenChange={setOpen}>
  <CommandInput placeholder="Search..." />
  <CommandList>
    <CommandEmpty>No results.</CommandEmpty>
    <CommandGroup heading="Suggestions">
      <CommandItem value="dashboard" onSelect={() => setOpen(false)}>
        Dashboard
      </CommandItem>
    </CommandGroup>
  </CommandList>
</CommandDialog>
```

### Dialog Component Integration
- **DialogTrigger**: Optional (usually keyboard-driven, not button-triggered)
- **DialogContent**: Auto-configured inside CommandDialog (padding: p-0, overflow: hidden)
- **DialogOverlay**: Black/50% overlay, animated fade-in/out
- **DialogClose**: Top-right X button (controlled by `showCloseButton`)

### Closing Behavior
- ESC key: Closes via Dialog's native behavior
- Outside click: Closes via Dialog overlay
- Item selection: Manual close via `onSelect` callback → `setOpen(false)`

---

## 4. Project Configuration Status

### Already Installed
✅ **Component Files:**
- `/src/components/ui/command.tsx` (185 lines, fully implemented)
- `/src/components/ui/dialog.tsx` (159 lines, fully implemented)

✅ **Dependencies:**
- `cmdk@^1.1.1` - Already in package.json
- `@radix-ui/dialog` - Already via radix-ui
- `lucide-react@^0.577.0` - SearchIcon available

### Styling Integration
✅ **Theme System:**
- Uses GoAds oklch palette (light mode: dark blue-purple primary)
- Dark mode: Neutral grayscale via CSS variables
- `--popover` color for Command bg (light: oklch(1.00 0 0), dark: oklch(0.14 0 0))
- `--accent` for CommandItem selection (oklch(0.19 0.11 270.80 / 0.15))

✅ **Data-slot Attributes:**
All components use `data-slot="command-*"` for granular styling control

---

## 5. Design Considerations for GoAds

### Colors & Theming
- **Popover BG**: Uses CSS variable `--popover` (auto-applies light/dark)
- **Selected Item**: `--accent` (15% opacity tint of primary blue-purple)
- **Separator**: `--border` (light: oklch(0.93 0.01 261.82), dark: oklch(1.00 0 0 / 10%))
- **Muted Text**: `--muted-foreground` (secondary gray)

### Spacing & Sizing
- **CommandInput height**: `h-12` inside dialog (larger for mobile UX)
- **CommandList max-height**: `300px` (scrollable for long result sets)
- **Padding**: Command adjusts internal padding via cmdk selectors
- **Gap**: `gap-2` between icon and text in items

### Accessibility
- Dialog title/description hidden but present (sr-only) for screen readers
- `data-selected`/`data-disabled` attributes for state indication
- Keyboard nav built into cmdk (no custom implementation needed)
- Close button with sr-only "Close" label

### Responsive
- Dialog max-width: `sm:max-w-lg` (matches standard modal width)
- Mobile-friendly: Full-width with margins on small screens
- Touch-safe: Buttons/items have adequate tap targets (py-3 min)

---

## 6. Code Snippets for Cmd+K Implementation

### Minimal Cmd+K Search Palette

```typescript
"use client"

import { useState, useEffect } from "react"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"

export function SearchPalette() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const handleSelect = (value: string) => {
    console.log("Selected:", value)
    // Navigate or execute action
    setOpen(false)
  }

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput
        placeholder="Search documentation, features, or commands..."
        autoFocus
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Documentation">
          <CommandItem value="getting-started" onSelect={handleSelect}>
            Getting Started
          </CommandItem>
          <CommandItem value="api-reference" onSelect={handleSelect}>
            API Reference
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Settings">
          <CommandItem value="account" onSelect={handleSelect}>
            Account Settings
          </CommandItem>
          <CommandItem value="preferences" onSelect={handleSelect}>
            Preferences
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
```

### With Icons & Shortcuts

```typescript
import { FileTextIcon, SettingsIcon } from "lucide-react"

<CommandGroup heading="Docs">
  <CommandItem value="api" onSelect={handleSelect}>
    <FileTextIcon className="size-4" />
    <span>API Docs</span>
    <CommandShortcut>⌘D</CommandShortcut>
  </CommandItem>
</CommandGroup>

<CommandGroup heading="Settings">
  <CommandItem value="settings" onSelect={handleSelect}>
    <SettingsIcon className="size-4" />
    <span>Open Settings</span>
    <CommandShortcut>⌘,</CommandShortcut>
  </CommandItem>
</CommandGroup>
```

### Dynamic Search with Filtering

```typescript
import { useMemo, useState } from "react"

const allItems = [
  { id: "dashboard", label: "Dashboard", category: "Pages" },
  { id: "accounts", label: "Accounts", category: "Pages" },
  { id: "billing", label: "Billing", category: "Settings" },
]

export function DynamicSearchPalette() {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")

  const filtered = useMemo(() => {
    if (!search) return allItems
    return allItems.filter(
      (item) =>
        item.label.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase())
    )
  }, [search])

  const grouped = useMemo(() => {
    const groups: Record<string, typeof allItems> = {}
    filtered.forEach((item) => {
      if (!groups[item.category]) groups[item.category] = []
      groups[item.category].push(item)
    })
    return groups
  }, [filtered])

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput
        placeholder="Search..."
        value={search}
        onValueChange={setSearch}
        autoFocus
      />
      <CommandList>
        <CommandEmpty>No results for "{search}"</CommandEmpty>
        {Object.entries(grouped).map(([category, items]) => (
          <CommandGroup key={category} heading={category}>
            {items.map((item) => (
              <CommandItem
                key={item.id}
                value={item.id}
                onSelect={() => setOpen(false)}
              >
                {item.label}
              </CommandItem>
            ))}
          </CommandGroup>
        ))}
      </CommandList>
    </CommandDialog>
  )
}
```

---

## 7. Migration Notes for GoAds

### Current State
- Command & Dialog components already present and styled
- Project uses oklch theme variables (light + dark mode ready)
- Data-slot attributes enable granular CSS customization

### Recommended for Implementation
1. Create a persistent `useCommandPalette` hook for global state
2. Export command data structure (links, settings, docs pages) as constant
3. Implement keyboard listener as layout-level component
4. Link CommandItem onSelect to Next.js router navigation

### No Additional Dependencies Needed
- All styling uses existing CSS variables
- cmdk already provides keyboard navigation
- Dialog already handles modal behavior
- No extra packages required

---

## 8. Key Takeaways

| Aspect | Details |
|--------|---------|
| **Status** | ✅ Ready to use (both components installed) |
| **Base Library** | cmdk v1.1.1 (handles all keyboard logic) |
| **Dialog Integration** | CommandDialog preset combines Dialog + Command seamlessly |
| **Styling** | Data-slot attributes + oklch CSS variables (light/dark auto) |
| **Default Sizes** | Input: h-12, List: max-h-300px (easily customizable) |
| **Accessibility** | Keyboard nav built-in, hidden labels for screen readers |
| **Responsive** | Dialog max-width adapts to viewport, full-width on mobile |

---

## Unresolved Questions

None. Components are installed, documented, and styled. Ready for implementation of Command Palette feature.
