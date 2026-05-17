---
name: cart-buynow-wiring
status: planned
created: 2026-05-15
branch: feat/pre-launch-polish
blockedBy: []
blocks: []
---

# Wire legacy cart into new pricing "Buy Now"

Goal: on the new site's pricing comparison table, clicking a "Buy Now" cell adds
the corresponding product to the (existing, legacy) cart and opens the cart
popover; checkout = Telegram (already built). Reuse the old cart UI as-is.

## Confirmed scope (user)
- ONLY the pricing comparison table Buy Now cells (not product pages / not site-wide).
- Reuse `cart-popover` / `cart-summary` legacy UI verbatim (no restyle this pass).
- Products derived from existing /pricing + /bm data (auto-discovered) — NO DB changes.
- "Sync legacy product DB to new pricing" = SEPARATE follow-up, OUT OF SCOPE here.

## Key findings (grounding)
- `useCart()` (src/lib/cart-context.tsx) exposes `addItem(Product)`, `items`,
  `removeItem`, `updateQuantity`, `clearCart`, `totalItems`, `subtotal`.
  **No open/close API** — cart open state is LOCAL `useState` inside `CartPopover`.
- `Product` type (src/components/product-catalog.tsx:13):
  `{ name; description?; price: number | 'contact'; unit?; purchased?; isPopular?; badge? }`
- `CartPopover` is **NOT mounted anywhere in the new site** (only legacy SiteHeader).
  Must be mounted in the new chrome to be visible.
- Cart is client-only: localStorage (`goads-cart`) + checkout opens
  `t.me/GoAdsSupport?text=<message>` (cart-popover `buildTelegramMessage`). No DB.
- Pricing table: `foreplay-pricing-comparison-table.tsx` → cells with value
  `"Add to Cart"` render a pill labeled "Buy Now" (currently `href="/book-demo"`).
  Consumed via `foreplay-pricing-comparison.tsx`; page `(marketing)/pricing/page.tsx`.
- Price/tier data source NOT yet pinned — candidates: `goads-pricing-setups-data.ts`,
  `pricing-plans-data.ts`, `pricing-catalog-data.tsx`, `foreplay-pricing-page-data.ts`
  (whatever `foreplay-pricing-comparison.tsx` feeds the table). Phase 1 resolves this.

## Phases
| # | Phase | File |
|---|-------|------|
| 1 | Pin product/price data + map plans→Product | phase-01-data-mapping.md |
| 2 | SKIPPED — `cart:item-added` event already auto-opens popover (KISS) | phase-02-cart-open-api.md |
| 3 | Mount CartPopover in new chrome | phase-03-mount-cart.md |
| 4 | Wire pricing table Buy Now → addItem + openCart | phase-04-wire-buynow.md |
| 5 | Verify (build, flow, Telegram message) | phase-05-verify.md |

## Risks
- Cart-popover is shadcn-styled (old) → visually off vs foreplay (accepted by user this pass).
- Plan/column → Product mapping ambiguity if pricing data lacks explicit price per cell
  (some cells = "Add to Cart" without a numeric price). Phase 1 must resolve price source
  or fall back to `price: 'contact'`.
- Mounting CartPopover globally must not appear on docs/help/admin/portal (scope to
  marketing chrome only).

## Out of scope (separate plan later)
- Reconciling Postgres product/order tables + portal/admin catalog with new /bm,/pricing.
- Restyling cart UI to foreplay design system.

## Unresolved questions
- Exact price values per pricing plan/column (data file TBD in phase 1; if absent,
  use `'contact'` and Telegram message carries plan name only).
- Should adding an item navigate/scroll or just open popover? (assume: just open.)
