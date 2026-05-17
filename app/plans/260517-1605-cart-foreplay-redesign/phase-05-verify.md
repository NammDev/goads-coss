# Phase 05 — Verify

**Context:** plan.md · P2–P4 outputs
**Priority:** High · **Status:** planned · Final gate.

## Overview
Confirm Foreplay redesign correct, build green, scope not leaked, flow intact.

## Steps
1. `npm run build` → exit 0; `npx tsc --noEmit` → 0; ESLint cart files clean.
2. Line-count gate: `cart-popover.tsx` & helpers all <200L; cart-item/-summary <100/≤103L.
3. Grep cart files for hex / inline `style={{color}}` → must be ZERO.
4. Dev server: open `/pricing` → click "Buy Now":
   - cart = dark Foreplay panel + visible WHITE ISLAND block, large sizing
   - item row, stepper, remove, payment cards, total, CTA all render correctly
   - persist-open (no auto-close), close via X / outside
5. Mobile viewport: Sheet variant restyled & functional.
6. Scope-leak check: `/docs`, `/help` → cart absent (still marketing-scoped).
7. Telegram order: message built + clearCart fires (logic unchanged — smoke only).

## Todo
- [ ] build/tsc/ESLint green
- [ ] line-count + zero-hex gates pass
- [ ] /pricing desktop visual + functional QA
- [ ] mobile Sheet QA
- [ ] scope-leak check (/docs /help clean)
- [ ] Telegram flow smoke

## Success criteria
- All gates green; cart visually Foreplay (dark panel + white island, large).
- Zero scope leak; order flow unbroken.

## Risk
- Visual-only sign-off needs human eyes → list residual items for user.

## Security
- Confirm Telegram URL/message logic untouched vs pre-redesign.

## Next
- Report → `/ck:journal` → commit `feat(cart): foreplay redesign` (separate from
  wiring commit 978a436) on `feat/pre-launch-polish`. Push on user approval.
