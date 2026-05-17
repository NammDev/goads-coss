# Phase 04 — Wire pricing table Buy Now → addItem + openCart

**Status:** planned · Core change.

## Goal
Clicking a "Buy Now" cell (currently the `"Add to Cart"` value rendered at
`foreplay-pricing-comparison-table.tsx:~129`, today an `href="/book-demo"` pill)
adds the mapped Product to cart and opens the popover.

## Steps
1. In `foreplay-pricing-comparison-table.tsx`, the cell rendering `ACTION_VALUES`
   ("Add to Cart"/"Contact"): replace the static link for "Add to Cart" with a
   button that calls `useCart().addItem(product)` then `openCart()`.
   - Component becomes (or already is) a client component (`useState` present → it is).
   - Needs the per-column/plan Product from phase-01 `pricing-cart-products.ts`.
   - Pass product identity into the table via props (the consumer
     `foreplay-pricing-comparison.tsx` supplies the map), OR resolve by column/plan
     key inside the cell. Prefer prop-injection to keep table generic.
2. "Contact" action value → keep as Telegram/contact link (unchanged) — only
   "Add to Cart" wires to cart.
3. Plan footer CTAs (Basic/Workflow/Agency/Enterprise → /sign-up,/book-demo):
   LEAVE AS-IS (scope = Buy Now cells only, not plan CTAs) unless phase-01 mapping
   says a plan column itself is a buyable product.
4. Keep `ForeplayCtaButton` visual for the pill (reuse existing styling — render as
   button variant instead of anchor; do not invent new UI).

## Files
- Edit `src/components/foreplay/foreplay-pricing-comparison-table.tsx`
- Edit `src/components/foreplay/foreplay-pricing-comparison.tsx` (pass product map)
- New `src/data/pricing-cart-products.ts` (from phase 1)

## Success criteria
- Click "Buy Now" → item appears in cart, popover opens, count increments.
- Telegram checkout message contains the correct product name(s) (+ price or "contact").
- Non-cart cells/links unchanged; tsc 0; eslint clean.

## Risk
- Table is generic/data-driven; injecting product mapping must not break other
  tables using the same component. Gate cart behavior behind presence of a product
  map prop (absent → keep old link behavior).
