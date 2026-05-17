# Phase 05 — Verify

**Status:** planned

## Checks
1. `npx tsc --noEmit` → 0 errors. `npx eslint` changed files → clean.
2. `npm run build` exit 0 (no RSC/client boundary issues from CartPopover in layout).
3. Manual flow on `/pricing`:
   - Click a "Buy Now" cell → cart popover opens, item listed with correct
     name + price/"contact", count badge increments.
   - Add 2 different → both in cart, subtotal/quantity correct.
   - "Order via Telegram" → opens `t.me/GoAdsSupport?text=...` with the items in the
     message body.
   - Reload page → cart persists (localStorage `goads-cart`).
4. Regression: legacy cart users still compile/work (product-card, shop-catalog,
   cart-button-wrapper) — at minimum tsc/build green.
5. Scope check: cart does NOT render on `/docs`, `/help`, `/admin`, `/portal`,
   `/sign-in`. Renders on marketing routes.

## Exit
All green → commit on `feat/pre-launch-polish` (conventional, no AI refs),
report. Push only when user confirms.

## Rollback
Single feature on a branch; revert the commit. No DB/data migration → low risk.
