# Phase 02 — Add open API to cart-context

**Status:** planned · Small contained change to `src/lib/cart-context.tsx` + `cart-popover.tsx`.

## Problem
Cart open state lives as local `useState` inside `CartPopover` (+ hover intent).
A pricing Buy Now button (different component tree) cannot open it.

## Approach (minimal, KISS)
Lift an open signal into cart-context:
- Add to `CartContextValue`: `isOpen: boolean`, `openCart(): void`, `closeCart(): void`
  (module-level state + subscribe/emit, same pattern as existing cart state — keeps
  SSR snapshot approach consistent).
- `CartPopover`: replace local `open` useState with context `isOpen` / `openCart` /
  `closeCart` (keep hover-intent: hover still calls openCart/closeCart with delay).
  Behavior unchanged for existing hover/click users.

## Files
- Edit `src/lib/cart-context.tsx`: add open state to module store + context value.
- Edit `src/components/cart-popover.tsx`: consume context open API instead of local state.

## Success criteria
- Existing cart-popover hover/click behavior unchanged.
- `useCart().openCart()` callable from any component opens the popover.
- `npx tsc --noEmit` 0; existing cart usages (legacy product-card, shop-catalog) still compile.

## Risk
- Legacy consumers (`product-card`, `shop-catalog`, `cart-button-wrapper`) import
  useCart — adding fields is additive, non-breaking. Verify no name clash.

## SKIPPED (2026-05-15)
addItem() already dispatches window CustomEvent("cart:item-added"); cart-popover
useEffect listens and setOpen(true). No open API needed. Just mount popover (P3) +
call addItem (P4).
