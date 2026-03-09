# Code Review: Command+K Search Palette

**Score: 8/10**

## Scope
- Files: 5 (2 new, 2 modified, 1 UI primitive reviewed for compat)
- LOC: 409 total (all under 200-line limit)
- TypeScript: compiles clean (`tsc --noEmit` passes)
- No hardcoded colors -- uses semantic tokens throughout

## Overall Assessment

Clean, well-structured implementation. Good separation of concerns (data index / UI component / trigger / integration). Follows YAGNI/KISS. No security concerns for a static client-side search. A few minor issues to address.

## Critical Issues

None.

## High Priority

### H1. SearchTrigger dispatches synthetic `metaKey` -- breaks on Windows/Linux

`search-trigger.tsx` line 14 dispatches `new KeyboardEvent("keydown", { key: "k", metaKey: true })`. On Windows/Linux, the listener checks `e.metaKey || e.ctrlKey`, but the trigger only sends `metaKey`. This works but couples trigger to implementation detail.

**Better approach:** Lift `setOpen` to a shared context or simply pass an `onOpen` callback. Alternatively, at minimum keep it working but add a comment noting the synthetic event approach.

**Verdict:** Works correctly today since both trigger and listener run client-side. Not a bug, but fragile coupling. Medium-high concern.

### H2. FAQ items all navigate to `/#faq` -- poor UX for disambiguation

`search-index.ts` line 134: All FAQ items point to `/#faq`. If a user searches "refund" and selects an FAQ result, they land at the FAQ section but the specific answer isn't highlighted or scrolled to. Consider adding unique anchors per FAQ item (e.g., `/#faq-0`, `/#faq-1`) if the FAQ component supports it.

## Medium Priority

### M1. `useMemo` for `grouped` has empty dependency array -- correct but unclear intent

`command-menu.tsx` line 43: `useMemo(() => {...}, [])` -- deps are empty because `SEARCH_INDEX` is a module constant. This is correct but could confuse future devs. A brief comment like `// SEARCH_INDEX is module-level constant` would clarify.

### M2. Missing `aria-label` on SearchTrigger button

`search-trigger.tsx`: The button has visible "Search..." text on desktop but on mobile it's icon-only (`sm:inline-flex` hides the text). No `aria-label` is provided for the mobile case.

**Fix:** Add `aria-label="Search"` to the Button.

### M3. Docs flattening skips parent categories

`search-index.ts` lines 103-107: `flattenDocs` only adds leaf nodes. If a docs category has both `items` (children) AND is itself navigable, it gets skipped. Verify this matches the docs navigation structure (likely fine if parent slugs are just groupings).

### M4. `CommandMenu` placed outside any layout wrapper

`layout.tsx` line 40: `<CommandMenu />` is rendered directly in body, outside the page content flow. This is fine for a portal-based dialog (Dialog uses portals), but worth noting it sits outside any `<main>` landmark.

## Low Priority

### L1. `description.slice(0, 120)` / `.slice(0, 100)` magic numbers

`search-index.ts` lines 87, 133: Description truncation uses bare numbers. Consider extracting a constant or adding a brief comment.

### L2. `navLinkClass` defined but unused in site-header.tsx

Line 16: `const navLinkClass` is defined but never referenced in the component. Dead code -- remove it.

### L3. `search-trigger.tsx` not in plan's file list

The plan lists 4 files but `search-trigger.tsx` is a 5th file. Plan should be updated to include it.

## Positive Observations

- Module-level constants for search index (no re-computation per render)
- `useMemo` for grouping prevents unnecessary work
- Clean type definitions with `SearchCategory` union and `SearchItem` interface
- `cmdk` handles filtering via `value` prop -- no custom search logic needed
- Proper cleanup of event listener in `useEffect`
- No hardcoded colors -- all semantic tokens (`text-muted-foreground`, `bg-muted`, etc.)
- `hover:bg-primary/15` matches GoAds hover consistency convention
- All files well under 200 lines
- `CommandDialog` in `ui/command.tsx` has sr-only DialogTitle/Description (accessibility)

## Recommended Actions

1. **Add `aria-label="Search"` to SearchTrigger button** (accessibility, quick fix)
2. **Remove unused `navLinkClass` from site-header.tsx** (dead code)
3. **Consider FAQ anchors** for better search-to-content UX (future enhancement)
4. **Update plan.md** to include `search-trigger.tsx` in file list
5. **(Optional)** Replace synthetic KeyboardEvent dispatch with shared state or callback

## Metrics

- Type Coverage: 100% (tsc clean)
- Test Coverage: N/A (no tests for UI components in this project)
- Linting Issues: 1 (unused variable `navLinkClass`)
- File Size: All pass (<200 lines)
- Design Compliance: Pass (oklch semantic tokens, no hardcoded colors)

## Unresolved Questions

1. Does the FAQ section support anchor scrolling to individual items? If not, H2 is a known limitation.
2. Is `navLinkClass` intentionally kept for future nav links, or truly dead code?
