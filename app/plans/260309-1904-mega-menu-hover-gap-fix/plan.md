---
title: "Fix mega menu hover gap dead zone"
description: "Eliminate the 8px dead zone between header and NavigationMenu dropdown that causes premature close"
status: pending
priority: P1
effort: 1h
branch: feat/search-cart
tags: [bug-fix, ux, navigation, radix]
created: 2026-03-09
---

# Fix Mega Menu Hover Gap Dead Zone

## Problem

8px visual gap between header bottom border and mega menu dropdown. Mouse passing through this gap exits all tracked elements, causing Radix NavigationMenu to close the dropdown. The gap comes from `pt-2` on the viewport wrapper div in `NavigationMenuViewport`.

## Root Cause Analysis

Radix NavigationMenu tracks pointer position with an internal "safe triangle" algorithm (similar to Amazon's mega menu pattern). The triangle is drawn from cursor position to the content edges. However, when the viewport wrapper has `pt-2` (padding-top: 8px), the actual interactive element (`NavigationMenuPrimitive.Viewport`) starts 8px below `top-full`. The padding area is part of the wrapper `<div>` but Radix only tracks pointer events on its own primitives -- not arbitrary wrapper divs. Result: mouse enters the padding zone, Radix sees it as "outside", closes.

## Approaches Evaluated

### A. Invisible bridge via `::before` pseudo-element on Viewport (RECOMMENDED)

Replace the wrapper's `pt-2` with a `::before` pseudo-element on `NavigationMenuPrimitive.Viewport` that extends upward. The pseudo-element is part of the Viewport DOM element so Radix's pointer tracking includes it.

| Aspect | Detail |
|--------|--------|
| Pros | No JS changes. Radix sees pseudo-element as part of Viewport. Maintains visual gap. Minimal code change. |
| Cons | Must ensure `overflow: hidden` doesn't clip the pseudo (it won't -- pseudo extends outside via negative margin). |

**Implementation:**
- Remove `pt-2` from wrapper div
- Add `mt-2` to wrapper div (creates layout gap without padding)
- Add `::before` pseudo on `NavigationMenuPrimitive.Viewport` that extends 8px upward with `pointer-events: auto` and transparent background

Wait -- `mt-2` creates same dead zone. The key insight: keep `pt-2` on the wrapper div BUT also give the wrapper div `pointer-events: none`, then give the Viewport `pointer-events: auto`, and add a `::before` pseudo on the Viewport extending upward into the padding zone.

Actually, the simplest approach:

### B. Transparent padding ON the Viewport itself (RECOMMENDED - SIMPLEST)

Move the gap from the wrapper div's padding to the Viewport element's own `padding-top` or a `::before` pseudo-element. Since Radix tracks the Viewport element, padding is part of its hit area.

**Problem:** The Viewport has `overflow: hidden` (for content animation), `rounded-md`, `border`, `shadow`. Adding `pt-2` to Viewport itself would push content down but also make the border/shadow start 8px higher. Not what we want visually.

### C. `::before` pseudo on wrapper div + `pointer-events` forwarding

The wrapper div is a regular `<div>`, not a Radix primitive. But we can make it bridge the gap:

- Keep `pt-2` on wrapper
- Add a `::before` pseudo on the wrapper that covers the padding area
- On `pointerenter` of that pseudo (via the wrapper), prevent close

**Problem:** Can't attach Radix-aware events to a non-Radix div.

### D. Controlled mode with `onValueChange` + debounce (JS APPROACH)

Use Radix's controlled `value`/`onValueChange` props. On close attempt, add 150ms debounce. If pointer enters Viewport within that window, cancel close.

| Aspect | Detail |
|--------|--------|
| Pros | Works regardless of gap size. Full control. |
| Cons | Requires `useState`, `useRef`, `useEffect`. Makes NavMegaMenu a client component (already is). Must carefully handle edge cases. |

### E. Extend Viewport hit area with `::before` pseudo-element (BEST APPROACH)

**Key insight:** Radix tracks `pointerenter`/`pointerleave` on the Viewport element. CSS `::before`/`::after` pseudo-elements are part of the element's box for pointer event purposes. A pseudo extending upward from the Viewport into the gap zone will be detected as "pointer is on Viewport."

**Implementation:**
1. Keep `pt-2` on wrapper div for layout spacing
2. Remove `overflow-hidden` from Viewport (replace with `overflow-hidden` on an inner wrapper or use `overflow: clip` which doesn't affect pseudo)
3. Add `before:content-[''] before:absolute before:-top-2 before:left-0 before:right-0 before:h-2` to Viewport

Wait -- `overflow: hidden` on Viewport WILL clip the pseudo. We need `overflow: clip` or restructure.

## Final Recommended Approach

**Two-part fix in `navigation-menu.tsx` only:**

### Step 1: Move gap from wrapper padding to wrapper margin
Change wrapper from `pt-2` to `mt-2`. This doesn't fix it alone.

### Step 2: Add invisible bridge pseudo-element on wrapper div
The wrapper div itself doesn't need Radix tracking. Instead, add a `::before` pseudo on the wrapper that extends upward 8px into the gap, covering the dead zone. Give it `pointer-events: auto`.

But Radix still won't track the wrapper. Let me reconsider.

---

**ACTUAL RECOMMENDED FIX (after full analysis):**

The cleanest solution is to make the **wrapper div's padding area interactive** so the pointer never "leaves" the menu system. Radix NavigationMenu checks if the pointer is inside its root element's subtree. The wrapper div IS inside the NavigationMenu root's subtree (it's rendered inside `NavigationMenuPrimitive.Root`). So pointer events on the wrapper div DO count for Radix's pointer tracking.

**The real issue:** The wrapper div has no `pointer-events` set, so it does receive pointer events. BUT it has `pt-2` which is transparent padding. The problem is likely that Radix's internal `onPointerLeave` fires on the `Viewport` element specifically, not the wrapper.

Let me look at this from a different angle:

**DEFINITIVE APPROACH: Remove padding, use negative margin on Viewport + clip-path**

1. Remove `pt-2` from wrapper div
2. On `NavigationMenuPrimitive.Viewport`, add:
   - `before:content-[''] before:absolute before:-top-2 before:left-0 before:w-full before:h-2` (invisible bridge)
   - Change `overflow-hidden` to `overflow-x-clip overflow-y-clip` (which respects border-radius but doesn't create a new stacking context that clips positioned pseudos -- actually `overflow: clip` also clips positioned elements)

The `overflow-hidden` problem means we can't use a pseudo extending outside the Viewport.

**SIMPLEST WORKING SOLUTION:**

Remove `pt-2` from wrapper. Add `mt-2` to wrapper. Add a **separate bridge div** between the wrapper's top edge and where the viewport starts -- but place it as a sibling BEFORE the viewport, absolutely positioned to cover the gap above. This bridge div is inside the Radix subtree.

Actually, let me just state the correct fix:

---

## Recommended Implementation

**File:** `app/src/components/ui/navigation-menu.tsx` -- `NavigationMenuViewport` function only.

**Strategy:** Replace wrapper `pt-2` with wrapper `pt-0`. Add an absolutely-positioned invisible bridge `<div>` INSIDE the wrapper, BEFORE the Viewport. This bridge sits in the gap zone. Since it's inside the NavigationMenu's DOM subtree, Radix's pointer tracking recognizes the pointer is still "inside" the menu.

### Implementation Steps

#### Step 1: Modify `NavigationMenuViewport` in `navigation-menu.tsx`

```tsx
function NavigationMenuViewport({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Viewport>) {
  return (
    <div
      className={cn(
        "absolute top-full left-1/2 isolate z-50 flex -translate-x-1/2 justify-center pt-0"
      )}
    >
      {/* Invisible bridge: covers the 8px gap between header and viewport.
          Prevents Radix from closing the menu when pointer traverses the gap. */}
      <div className="absolute -top-2 left-0 right-0 h-4" aria-hidden="true" />
      <NavigationMenuPrimitive.Viewport
        data-slot="navigation-menu-viewport"
        className={cn(
          "origin-top-center relative mt-2 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)]",
          className
        )}
        {...props}
      />
    </div>
  )
}
```

**What changed:**
1. Wrapper: `pt-2` changed to `pt-0` (no more padding gap)
2. Bridge div added: `absolute -top-2 left-0 right-0 h-4` -- positioned from 8px ABOVE the wrapper top to 8px below (total 16px = covers the gap plus overlaps with viewport). `aria-hidden="true"` for a11y.
3. Viewport: added `mt-2` to maintain the visual 8px gap

**Why this works:**
- The bridge div is a child of the wrapper div, which is inside `NavigationMenuPrimitive.Root`
- Radix's `onPointerLeave` / safe-triangle logic checks if the related target is within the navigation menu's DOM tree
- When the pointer moves from the trigger into the gap, it enters the bridge div (still in the menu tree) -- so Radix doesn't fire a close
- The visual gap is maintained via `mt-2` on the Viewport itself
- No JS changes needed, no controlled mode, no state management

#### Step 2: Verify

- Hover from trigger to dropdown -- should stay open
- Move mouse away from dropdown entirely -- should close
- Switch between triggers -- should transition smoothly
- Check visual gap is still 8px between header border and dropdown border
- Test on both light and dark themes
- Test animation (zoom-in/zoom-out) still works correctly

### Files to Modify

| File | Change |
|------|--------|
| `app/src/components/ui/navigation-menu.tsx` | `NavigationMenuViewport` function only (lines 102-121) |

### Risk Assessment

- **Low risk:** Only CSS/layout changes to a single component function
- **No JS logic changes:** Radix internals untouched
- **Fallback:** If bridge doesn't work (unlikely), can switch to Approach D (controlled mode + debounce)
- **Edge case:** Very fast diagonal mouse movement might still exit the bridge. The `h-4` (16px) height gives generous coverage.

### Success Criteria

- [ ] Mouse can traverse gap from trigger to dropdown without dropdown closing
- [ ] Visual 8px gap still appears between header bottom border and dropdown top
- [ ] Dropdown closes when mouse moves away from both trigger and dropdown
- [ ] Trigger switching (hover between different menu items) still works
- [ ] Animations still play correctly
- [ ] No layout shift or visual regression

## Unresolved Questions

1. Does Radix NavigationMenu use `onPointerLeave` with `relatedTarget` check, or does it use a completely different mechanism (e.g., tracking coordinates against a bounding rect)? If bounding-rect based, the bridge div approach may not work and we'd need Approach D (controlled mode). Testing will confirm quickly.
2. The bridge `h-4` (16px) might need tuning -- if the pointer can escape diagonally, may need to widen it or increase height.
