# Phase 01 — Pin product/price data + map plans→Product

**Status:** planned · No code (analysis + a mapping module spec).

## Goal
Determine the authoritative product/price data the pricing table uses, and define
how each "Buy Now" cell maps to a `Product` ({name, price, unit?, badge?}).

## Steps
1. Open `src/components/foreplay/foreplay-pricing-comparison.tsx` — see which data
   file/props it passes into `foreplay-pricing-comparison-table.tsx`.
2. Trace that data file (candidate: `goads-pricing-setups-data.ts` /
   `pricing-plans-data.ts` / `pricing-catalog-data.tsx`). Identify per plan/column:
   name, price (numeric? "contact"?), unit, badge/popular.
3. Cross-check /bm pricing (`goads-bm-page-data.ts` + any BM tier/price source) since
   user said /bm products are canonical.
4. Define `pricingProductMap`: for each table column/plan with an "Add to Cart" cell →
   the `Product` to add. If no numeric price exists → `price: 'contact'`.
5. Output: `src/data/pricing-cart-products.ts` SPEC (exported map keyed by
   plan/column id → Product). Do not implement yet — phase 4 wires it.

## Deliverable
Decision note appended here: data source file, exact plan→Product table, price strategy.

## Success criteria
- Every "Add to Cart"/"Buy Now" cell in the pricing table has a defined Product.
- Price strategy explicit (numeric vs 'contact').

## Unresolved
- If pricing data has no machine-readable price (only marketing copy), confirm with
  user: use 'contact' (Telegram negotiates) vs hardcode prices from /bm.

## DECISION (resolved 2026-05-15)
- Data source = `src/data/goads-product-catalog-table-data.ts` (`catalogCategories`),
  rendered by `ForeplayPricingComparison` on `/pricing` Section 2.
- Each `feature` row IS a product: `name`, `basic` = "$NN" price (or `false`),
  `workflow` = "Add to Cart" | "Contact".
- NO separate `pricing-cart-products.ts` (DRY). Derive `Product` inline:
  `{ name: row.name, price: parsePrice(row.basic) /* "$80"→80; false→'contact' */ }`.
- Only rows with `workflow === "Add to Cart"` become cart buttons.
  `"Contact"` rows stay contact-only (Telegram link, unchanged).
