# Phase 1: Controlled Mode + Pointer Interception

## Context Links

- [navigation-menu.tsx](/app/src/components/ui/navigation-menu.tsx) -- Viewport wrapper with bridge div
- [nav-mega-menu.tsx](/app/src/components/nav-mega-menu.tsx) -- NavMegaMenu root component
- [site-header.tsx](/app/src/components/site-header.tsx) -- Sticky header container
- [Radix NavigationMenu API](https://www.radix-ui.com/primitives/docs/components/navigation-menu)
- [Radix issue #1549](https://github.com/radix-ui/primitives/issues/1549) -- pointer intent polygon (open)
- [Radix discussion #1999](https://github.com/radix-ui/primitives/discussions/1999) -- hide duration

## Overview

- **Priority:** P1 -- UX regression, users cannot reach dropdown content
- **Status:** pending
- **Description:** Switch NavigationMenu to controlled mode (`value`/`onValueChange`) and intercept pointer events on the viewport wrapper div so the gap area cancels the close timer.

## Root Cause Analysis (with Radix source evidence)

### How Radix closes the menu

Radix NavigationMenu does NOT use safe-triangle/pointer-intent polygons (that feature is tracked in issue #1549, still unimplemented). Instead it uses a **timer-based system**:

```
Trigger.onPointerLeave → context.onTriggerLeave() → startCloseTimer() (150ms)
Content.onPointerEnter → context.onContentEnter() → clearTimeout(closeTimer)
Content.onPointerLeave → context.onContentLeave() → startCloseTimer() (150ms)
```

The `startCloseTimer` sets `setValue('')` after 150ms. If the pointer enters Content within that window, the timer is cleared.

### Why the bridge div fails

The invisible bridge `<div className="absolute -top-4 left-0 h-6 w-full" />` sits **outside** both the Trigger and the Viewport primitive. Radix only attaches `onPointerEnter` cancel logic to `NavigationMenuPrimitive.Viewport` and `NavigationMenuPrimitive.Content`. The bridge div is a plain HTML element -- entering it does NOT call `context.onContentEnter()`, so the 150ms timer keeps ticking and expires.

### Why previous fixes failed

| Attempt | Why it failed |
|---------|--------------|
| `pt-2` padding on wrapper | Padding is outside Viewport primitive; Radix ignores it |
| `skipDelayDuration={500}` | Only affects re-open delay after recent close, not the close timer |
| `delayDuration={0}` | Only affects open delay, not close |
| Invisible bridge div | Plain div, no Radix pointer handlers attached |
| `mt-2` instead of `pt-2` | Same dead zone -- margin is empty space |
| `useHoverIntent` debounce | Can't intercept Radix internal `setValue('')` |

## Viable Approaches

### Approach A: Controlled mode + onPointerEnter/Leave interception (RECOMMENDED)

Switch to controlled mode. Wrap the viewport area in a div that intercepts `onPointerEnter`/`onPointerLeave` and manages the value with a custom close delay.

**Pros:**
- Full control over open/close timing
- Works regardless of gap size
- No CSS hacks, no Radix source patches
- Radix officially supports controlled mode

**Cons:**
- Slightly more code in navigation-menu.tsx
- Must handle edge cases (Escape key, click outside, link navigation)

### Approach B: CSS `::before` pseudo-element on Viewport

Add a `::before` pseudo on the Viewport primitive itself (not a wrapper div) that extends upward into the gap.

**Pros:**
- Pure CSS, no JS changes
- Pseudo-element is part of the Viewport DOM node, so Radix pointer events fire on it

**Cons:**
- Uncertain -- Radix checks `event.currentTarget` vs `event.target`; pseudo-elements don't generate separate pointer events, they fire on the parent element. This SHOULD work but needs testing.
- Fragile if Radix changes internal event handling
- Cannot extend beyond the element's bounding box without absolute positioning tricks

### Approach C: Remove gap entirely, fake it visually

Set `mt-0` on Viewport, use `box-shadow` or `border-top: 8px solid transparent` to create visual gap.

**Pros:**
- No dead zone at all -- Viewport starts immediately at trigger bottom
- Simple CSS

**Cons:**
- Viewport border-radius and border styling may look wrong
- Box-shadow approach may not match design exactly
- Transparent border adds to element dimensions, shifts content

## Recommended Approach: A (Controlled Mode)

This is the only approach that is **guaranteed** to work regardless of Radix internals, because we take full control of the open/close state.

## Architecture

```
NavMegaMenu (controlled: value + onValueChange)
  └── NavigationMenu (value={value} onValueChange={onValueChange})
        └── NavigationMenuViewport wrapper div
              ├── onPointerEnter → cancel close timer
              ├── onPointerLeave → start close timer (150ms)
              └── NavigationMenuPrimitive.Viewport (mt-2 visual gap)
```

The key insight: we don't fight Radix's internal timer. We **replace** it with our own by using controlled mode. Radix's internal `startCloseTimer` calls `setValue('')`, but in controlled mode `setValue` just calls our `onValueChange` callback -- we decide whether to actually close.

## Related Code Files

### Files to modify
- `src/components/ui/navigation-menu.tsx` -- NavigationMenuViewport: add pointer event interception via `::before` pseudo (Approach B as bonus layer)
- `src/components/nav-mega-menu.tsx` -- Switch to controlled mode with custom close delay

### Files to create
- None

### Files to delete
- None

## Implementation Steps

### Step 1: Make NavMegaMenu controlled

In `nav-mega-menu.tsx`:

1. Add state: `const [value, setValue] = useState('')`
2. Add ref: `const closeTimerRef = useRef<ReturnType<typeof setTimeout>>(0)`
3. Create handlers:
   ```tsx
   const handleValueChange = (newValue: string) => {
     // Clear any pending close
     clearTimeout(closeTimerRef.current)
     setValue(newValue)
   }
   ```
4. Pass to NavigationMenu: `<NavigationMenu value={value} onValueChange={handleValueChange} ...>`

### Step 2: Add pointer interception on viewport wrapper

In `navigation-menu.tsx`, modify NavigationMenuViewport:

1. Accept new props: `onPointerEnter`, `onPointerLeave` forwarded to the wrapper div
2. OR better: export the wrapper div's event handling via a context/callback pattern

**Simpler approach:** Do it all in `nav-mega-menu.tsx` by NOT using the default `<NavigationMenuViewport>` and instead rendering a custom viewport wrapper inline. But this breaks the component abstraction.

**Best approach:** Pass `onGapEnter` and `onGapLeave` callbacks through the NavigationMenu component to NavigationMenuViewport. But this couples the UI primitive to business logic.

**Pragmatic approach:** Add pointer event handlers directly in `NavigationMenuViewport` that use a React context from a wrapper provider. Too complex.

**SIMPLEST approach (chosen):** Add `::before` pseudo-element on the Viewport wrapper div (CSS-only, Approach B as a bonus), AND use controlled mode in NavMegaMenu. The controlled mode is the primary fix; the pseudo-element is defense-in-depth.

### Step 3: CSS pseudo-element bridge (defense-in-depth)

In `navigation-menu.tsx`, on the Viewport wrapper div:

```tsx
<div
  className={cn(
    "absolute top-full left-1/2 isolate z-50 flex -translate-x-1/2 justify-center",
    // Pseudo-element extends hit area upward into the gap
    "before:absolute before:-top-3 before:left-0 before:h-5 before:w-full before:content-['']"
  )}
>
```

Remove the old invisible bridge `<div>` -- replace with the `::before` pseudo which IS part of the wrapper's DOM node and will fire pointer events on the wrapper.

### Step 4: Wire up the close delay in controlled mode

In `nav-mega-menu.tsx`:

```tsx
const CLOSE_DELAY = 200 // ms, slightly more than Radix's 150ms

const startCloseTimer = useCallback(() => {
  clearTimeout(closeTimerRef.current)
  closeTimerRef.current = setTimeout(() => setValue(''), CLOSE_DELAY)
}, [])

const cancelCloseTimer = useCallback(() => {
  clearTimeout(closeTimerRef.current)
}, [])

const handleValueChange = (newValue: string) => {
  cancelCloseTimer()
  setValue(newValue)
}
```

### Step 5: Intercept viewport pointer events

The challenge: we need `onPointerEnter`/`onPointerLeave` on the viewport wrapper, but it's rendered inside `NavigationMenuViewport` in navigation-menu.tsx.

**Solution:** Modify `NavigationMenuViewport` to accept optional `onPointerEnter` and `onPointerLeave` props for the wrapper div:

```tsx
function NavigationMenuViewport({
  className,
  onWrapperPointerEnter,
  onWrapperPointerLeave,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Viewport> & {
  onWrapperPointerEnter?: React.PointerEventHandler<HTMLDivElement>
  onWrapperPointerLeave?: React.PointerEventHandler<HTMLDivElement>
}) {
  return (
    <div
      onPointerEnter={onWrapperPointerEnter}
      onPointerLeave={onWrapperPointerLeave}
      className={cn(
        "absolute top-full left-1/2 isolate z-50 flex -translate-x-1/2 justify-center",
        "before:absolute before:-top-3 before:left-0 before:h-5 before:w-full before:content-['']"
      )}
    >
      <NavigationMenuPrimitive.Viewport ... />
    </div>
  )
}
```

Then in `NavigationMenu`, pass callbacks down:

```tsx
function NavigationMenu({
  viewport = true,
  onViewportPointerEnter,
  onViewportPointerLeave,
  ...
}) {
  return (
    <NavigationMenuPrimitive.Root ...>
      {children}
      {viewport && (
        <NavigationMenuViewport
          onWrapperPointerEnter={onViewportPointerEnter}
          onWrapperPointerLeave={onViewportPointerLeave}
        />
      )}
    </NavigationMenuPrimitive.Root>
  )
}
```

Then in `nav-mega-menu.tsx`:

```tsx
<NavigationMenu
  value={value}
  onValueChange={handleValueChange}
  onViewportPointerEnter={cancelCloseTimer}
  onViewportPointerLeave={startCloseTimer}
  viewport={true}
  className="static"
  delayDuration={0}
  skipDelayDuration={500}
>
```

### Step 6: Handle edge cases

1. **Escape key**: Radix fires `onValueChange('')` -- our handler sets value to `''`, works fine
2. **Click outside**: Same -- Radix fires `onValueChange('')`
3. **Link click**: NavigationMenuLink sets value to `''` via Radix internals, which calls our `onValueChange`
4. **Cleanup**: Add `useEffect` cleanup to clear timer on unmount
5. **Touch devices**: `onPointerEnter`/`onPointerLeave` for mouse only -- use `whenMouse` check (pointer type !== "touch")

### Step 7: Remove old bridge div

Delete the line in NavigationMenuViewport:
```tsx
{/* invisible hover bridge — keeps pointer inside Radix's DOM tree while crossing the 8px gap */}
<div className="absolute -top-4 left-0 h-6 w-full" />
```

Replaced by the `::before` pseudo-element on the wrapper.

## Todo List

- [ ] Add `useState` + `useRef` for controlled value and close timer in `nav-mega-menu.tsx`
- [ ] Create `handleValueChange`, `startCloseTimer`, `cancelCloseTimer` handlers
- [ ] Add `onViewportPointerEnter`/`onViewportPointerLeave` props to `NavigationMenu` component
- [ ] Add `onWrapperPointerEnter`/`onWrapperPointerLeave` props to `NavigationMenuViewport`
- [ ] Replace bridge div with `::before` pseudo-element on viewport wrapper
- [ ] Wire controlled mode props in `NavMegaMenu`
- [ ] Add `useEffect` cleanup for timer
- [ ] Add touch-device guard (ignore pointer events from touch)
- [ ] Test: slow mouse from trigger to dropdown -- must stay open
- [ ] Test: park mouse in gap indefinitely -- must stay open
- [ ] Test: move mouse away from both trigger and dropdown -- must close after 200ms
- [ ] Test: Escape key closes menu
- [ ] Test: click outside closes menu
- [ ] Test: click link inside menu closes menu + navigates
- [ ] Test: switch between menu items (hover "Tools" then "Resources") -- correct panel shows
- [ ] Test: dark mode visual gap appearance unchanged

## Success Criteria

1. Mouse can travel from trigger to dropdown at ANY speed without dropdown closing
2. Parking mouse in the 8px gap keeps dropdown open indefinitely
3. Moving mouse away from both trigger and dropdown closes menu within 200ms
4. All existing functionality preserved (Escape, click outside, link navigation, item switching)
5. Visual gap remains 8px between header border and dropdown
6. No flickering or janky open/close behavior
7. Touch devices unaffected

## Risk Assessment

| Risk | Impact | Mitigation |
|------|--------|------------|
| Controlled mode breaks Radix animations | Medium | Test data-state attributes still toggle; Radix animations rely on data-state which controlled mode still sets |
| Timer race with Radix internal timer | Low | In controlled mode, Radix's internal `setValue` calls our callback; we own the state |
| Item switching feels laggy | Low | `handleValueChange` immediately sets new value (no delay on open, only on close) |
| Future Radix update breaks controlled API | Very low | Controlled mode is documented, stable API |

## Fallback Approach

If controlled mode introduces unexpected issues (animation glitches, item switching bugs):

**Fallback: CSS-only `::before` pseudo + increased gap bridge**

1. Keep uncontrolled mode
2. Replace bridge div with `::before` pseudo on wrapper (fires events on parent)
3. Make the pseudo taller: `before:-top-4 before:h-6` (covers full gap + overlap)
4. Add `pointer-events: auto` explicitly on pseudo
5. Test if Radix's `onPointerEnter` on Content fires when pointer enters via pseudo on the wrapper

This is less certain but zero-JS and worth trying first as a quick test before implementing controlled mode.

## Security Considerations

None -- pure UI/UX change, no data handling.

## Next Steps

1. Implement Phase 1
2. Manual QA across Chrome, Firefox, Safari
3. Test on trackpad (slow movement) and mouse
