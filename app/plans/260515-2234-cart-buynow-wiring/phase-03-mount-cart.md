# Phase 03 — Mount CartPopover in new chrome

**Status:** planned

## Problem
`<CartPopover />` is only in legacy SiteHeader → invisible on new site. Pricing page
uses `(marketing)/layout.tsx` (ForeplayHeader/Footer). Cart must render there but NOT
on docs/help/admin/portal.

## Approach
- Mount `<CartPopover />` inside the new marketing chrome only:
  option A — render it in `ForeplayHeader` (a cart icon/trigger in the nav), or
  option B — render `<CartPopover />` once in `app/src/app/(marketing)/layout.tsx`
  (fixed/portal-positioned; opened programmatically via `openCart()` from phase 2,
  hover-trigger optional).
- Recommended: **B** for minimal surface — popover controlled purely by `openCart()`;
  no need to redesign ForeplayHeader. Cart still has its own close (X / overlay).
- Confirm it does NOT leak into `(documentation)` / admin / portal (those use other
  layouts — mounting in `(marketing)/layout.tsx` scopes it correctly).

## Files
- Edit `app/src/app/(marketing)/layout.tsx`: render `<CartPopover />` (client component;
  layout is server — wrap or ensure CartPopover is `'use client'`, which it is).

## Success criteria
- `/pricing` (and other marketing routes) can show the cart popover when `openCart()` fires.
- `/docs`, `/help`, `/admin`, `/portal`, `/sign-in` do NOT render the new cart.
- No hydration errors; build passes.

## Risk
- CartPopover may assume header context/positioning. Verify standalone render
  (fixed position) looks acceptable; if broken, fall back to option A (header trigger).
