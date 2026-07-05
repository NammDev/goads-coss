# Custom Setup Builder

Let customers build their own setup: seed from a preset, adjust quantities with
steppers, see a live topology diagram + smart validation, then add each item to
cart as its own line. Volume discount is deferred to a later phase.

## Status

- State: PLANNED (not started)
- Branch: justinhome-75
- Owner decisions locked (see below)

## Locked decisions

- **UX:** template + tweak. Seed from a preset, +/- steppers, live topology.
- **Pricing v1:** plain à-la-carte sum (no discount). Leave a `applyDiscount(total)`
  hook that is identity in v1 so the later discount phase is a drop-in.
- **Cart output:** each selected product added as its own line item (with qty).
- **Placement:** a 4th "Build your own" card on the pricing setups row.
- **Buildable SKUs** (unit price sourced from the catalog, single source of truth):
  - BM: BM1 $80, BM3 $180, BM5 $340, BM10 $999
  - Profiles: Premium Asia Reinstated $40, Premium USA Reinstated $50
  - Pages: Aged Reinstated Facebook Page $35
  - Extras: Verification Badge (Facebook Page / Instagram) $600
  - (Unban intentionally excluded.)
- **Starting template:** default seed = Premium; picker for Advanced / Premium /
  Elite / blank.

## Reuse (already in codebase)

- Prices: `src/data/product-catalog-table-data.ts` (do not re-hardcode).
- Cart: `src/lib/cart-context.tsx` → `useCart().addItem`.
- Topology model + rendering: `src/components/pricing/setup-blueprint-dialog.tsx`
  (`SetupTopology`, Pod/AssetChip/BridgeArrow).
- Dialog shell + dark flat theme: `src/components/pricing/setup-configurator-dialog.tsx`.

## Phases

1. `phase-01-foundations.md` — extract shared topology diagram + builder data/logic module.
2. `phase-02-builder-and-card.md` — builder dialog + 4th pricing card wiring.

Phase 2 depends on Phase 1.

## Acceptance criteria

- 4th "Build your own" card opens the builder dialog.
- Dialog seeds from Premium; picker switches the seed.
- Steppers change quantities; subtotal updates live from catalog prices.
- Topology diagram updates live; pixel-bank toggle appears when BM count >= 2 and
  redraws the pixel bridge.
- Validation warnings show (profiles < BMs; no page while BM present); add-to-cart
  disabled until >= 1 BM.
- Add-to-cart adds each chosen product as its own cart line with correct qty/price.
- `npx tsc --noEmit` passes; blueprint popup visual unchanged after the refactor.

## Open items

- Volume discount tiers + mechanism (total-based vs item-count) — later phase.
- 4-card layout: pricing row uses first/middle/last variants sized for 3 columns.
  Decide during Phase 2 whether the builder card joins the bar (needs grid rework)
  or sits as a distinct outline card below the 3 presets. See phase-02 risks.
