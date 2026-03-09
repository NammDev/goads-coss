# Phase 2: Command Menu Component

## Context Links
- [Phase 1: Search Data Index](./phase-01-search-data-index.md)
- [Research: shadcn Command docs](../reports/researcher-260309-1916-shadcn-command-docs.md)

## Overview
- **Priority:** P1
- **Status:** pending
- **Description:** Build the `CommandMenu` component — a `"use client"` dialog that renders the search palette with grouped results, keyboard navigation, and Next.js router navigation.

## Key Insights
- `CommandDialog` from shadcn handles modal, overlay, ESC close, a11y
- `cmdk` handles keyboard nav (arrows, enter) and filtering by `value` prop automatically
- onSelect callback receives the item value — use router.push() to navigate
- Group results using `CommandGroup` with `heading` prop
- Show all groups when input empty; cmdk filters as user types

## Requirements

### Functional
- Global keyboard shortcut: Cmd+K (Mac) / Ctrl+K (Windows) toggles dialog
- Search input with placeholder "Search pages, tools, docs..."
- Results grouped by category (Pages, Tools, Blog, Docs, FAQ)
- Each result shows: icon + title + description (truncated)
- Selecting a result navigates to href and closes dialog
- Empty state: "No results found."
- Close on ESC, overlay click, or item selection

### Non-functional
- `"use client"` component
- File under 200 lines
- Uses GoAds oklch palette via CSS variables (no hardcoded colors)
- Accessible: sr-only dialog title/description

## Architecture

```
command-menu.tsx ("use client")
├── useState for open/close
├── useEffect for Cmd+K listener
├── useRouter for navigation
├── CommandDialog
│   ├── CommandInput
│   └── CommandList
│       ├── CommandEmpty
│       └── CommandGroup (per category)
│           └── CommandItem (per search item)
└── imports SEARCH_INDEX, SEARCH_CATEGORIES from search-index.ts
```

## Related Code Files
- **Read:** `src/components/ui/command.tsx` — CommandDialog, CommandGroup, CommandItem, etc.
- **Read:** `src/data/search-index.ts` (created in Phase 1)
- **Create:** `src/components/command-menu.tsx`

## Implementation Steps

1. Create `src/components/command-menu.tsx` with `"use client"` directive
2. Import `CommandDialog`, `CommandInput`, `CommandList`, `CommandEmpty`, `CommandGroup`, `CommandItem` from `@/components/ui/command`
3. Import `useRouter` from `next/navigation`
4. Import `SEARCH_INDEX`, `SEARCH_CATEGORIES` from `@/data/search-index`
5. Implement `CommandMenu` component:
   ```typescript
   export function CommandMenu() {
     const [open, setOpen] = useState(false)
     const router = useRouter()

     // Cmd+K / Ctrl+K listener
     useEffect(() => {
       const down = (e: KeyboardEvent) => {
         if ((e.metaKey || e.ctrlKey) && e.key === "k") {
           e.preventDefault()
           setOpen((prev) => !prev)
         }
       }
       document.addEventListener("keydown", down)
       return () => document.removeEventListener("keydown", down)
     }, [])

     // Navigate on select
     const handleSelect = (href: string) => {
       setOpen(false)
       router.push(href)
     }
     ...
   }
   ```
6. Group `SEARCH_INDEX` by category using `useMemo`:
   ```typescript
   const grouped = useMemo(() => {
     const groups: Record<string, SearchItem[]> = {}
     for (const item of SEARCH_INDEX) {
       if (!groups[item.category]) groups[item.category] = []
       groups[item.category].push(item)
     }
     return groups
   }, [])
   ```
7. Render `CommandDialog` with:
   - `title="Search GoAds"` (sr-only)
   - `description="Search pages, tools, blog posts, documentation, and FAQ"` (sr-only)
   - `showCloseButton={false}` — cleaner look, ESC suffices
8. Inside `CommandList`, iterate over `SEARCH_CATEGORIES` keys, render a `CommandGroup` per category:
   ```tsx
   {Object.entries(SEARCH_CATEGORIES).map(([key, { label }]) => {
     const items = grouped[key]
     if (!items?.length) return null
     return (
       <CommandGroup key={key} heading={label}>
         {items.map((item) => (
           <CommandItem
             key={item.id}
             value={item.keywords}
             onSelect={() => handleSelect(item.href)}
           >
             <item.icon />
             <div>
               <p>{item.title}</p>
               <p className="text-xs text-muted-foreground line-clamp-1">
                 {item.description}
               </p>
             </div>
           </CommandItem>
         ))}
       </CommandGroup>
     )
   })}
   ```
9. Add `CommandEmpty` with "No results found." message
10. Export the component as named export

## Todo List
- [ ] Create command-menu.tsx with "use client"
- [ ] Implement Cmd+K keyboard shortcut listener
- [ ] Import and group SEARCH_INDEX by category
- [ ] Render CommandDialog with CommandGroups
- [ ] Wire onSelect to router.push()
- [ ] Add CommandEmpty fallback
- [ ] Verify file under 200 lines
- [ ] Test keyboard navigation works (arrows, enter, ESC)

## Success Criteria
- Cmd+K opens the dialog on any page
- Typing filters results across all categories
- Selecting an item navigates to correct page
- ESC / overlay click closes dialog
- No console errors or hydration mismatches
- Follows GoAds theme (light + dark mode)

## Risk Assessment
- **Hydration mismatch** — mitigated by `"use client"` + `useEffect` for keyboard listener (no SSR side effects)
- **Too many items slow cmdk** — unlikely with ~70 items; cmdk handles thousands fine
- **value prop collision** — use `keywords` field which includes title + description + slug = unique enough
