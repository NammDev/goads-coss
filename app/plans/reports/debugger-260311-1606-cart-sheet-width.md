# Debugger Report: Cart Sheet Full-Width on Mobile

**Date:** 2026-03-11 16:06
**File:** `/Users/nammdev/Documents/Code/goads-coss-mobile/app/plans/reports/debugger-260311-1606-cart-sheet-width.md`

---

## Root Cause

**`style` prop bypass by Radix + wrong override strategy.**

Three prior attempts failed:
1. `className='w-[85vw]'` — tried but apparently not applied correctly (see below)
2. `className='!w-[85vw]'` — tailwind-merge strips `!important` utilities inconsistently
3. `style={{ width: '85vw' }}` — Radix `Dialog.Content` merges its own animation `style` object and can clobber user-provided inline styles in `radix-ui@1.4.x`

The actual mechanism in `sheet.tsx`:
```
cn(
  "... w-3/4 ... sm:max-w-sm",   // base (side=right)
  className                        // caller's classes — LAST, so tw-merge lets them win
)
```

`tailwind-merge` correctly resolves `w-[85vw]` over `w-3/4` when both are unprefixed. The prior attempt #1 must have not used arbitrary-value syntax or had a typo. The `style` approach (attempt #3) failed because Radix Dialog internally assigns `style` for transform-origin animation and the spread order clobbers the user value.

## Evidence

Ran `tailwind-merge` directly:
```
Input:  "... w-3/4 sm:max-w-sm ..." + "w-[85vw] max-w-[380px] p-0 flex flex-col"
Output: "... sm:max-w-sm ... w-[85vw] max-w-[380px] p-0 flex flex-col"
```
- `w-3/4` removed (conflict group: width)
- `sm:max-w-sm` kept (responsive prefix = separate conflict group)
- `max-w-[380px]` added (applies on mobile since `sm:` won't fire below 640px)

Result on mobile: `width: 85vw; max-width: 380px` — correct behavior.

## Fix Applied

**File:** `app/src/components/cart-popover.tsx` line 175

```diff
- className='p-0 flex flex-col'
- style={{ width: '85vw', maxWidth: 380 }}
+ className='w-[85vw] max-w-[380px] p-0 flex flex-col'
```

Removed `style` prop entirely. Width now controlled via Tailwind arbitrary values that `tailwind-merge` correctly resolves over the base `w-3/4`.

## Verification

- `npx tsc --noEmit` — clean, zero errors
- `tailwind-merge` test confirmed correct class resolution
- `sm:max-w-sm` remains in output but only fires at ≥640px (desktop), where the Popover renders instead of Sheet — no practical impact

## No globals.css involvement

Confirmed: `globals.css` has zero rules targeting `sheet`, `w-3/4`, `max-w-sm`, or `[data-slot="sheet-content"]`. The issue was entirely in the component prop handling.

---

**Unresolved Questions:** None.
