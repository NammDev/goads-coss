# Phase 02 — Builder dialog + 4th pricing card

Goal: the customer-facing builder, wired to a new "Build your own" card.

Depends on Phase 01 (`SetupTopologyDiagram`, `custom-setup-data.ts`).

## Files to create

- `src/components/pricing/custom-setup-dialog.tsx` ("use client")
  - Reuse the dark flat dialog shell of `setup-configurator-dialog.tsx` (Radix
    Dialog, `site` scope, `bg-background`, `border-white/12`, close X).
  - State: `quantities: Record<itemId, number>` (seeded from a template),
    `template` (seed picker), `pixelBank: boolean`.
  - Top: template picker (Advanced / Premium / Elite / blank) → resets quantities.
  - Body: stepper rows grouped by category (BM, Profiles, Pages, Extras); each row
    shows label, icon, unit price, `− qty +`. Reuse chip/label styling tokens.
  - Right/below: live `<SetupTopologyDiagram topology={buildTopology(...)} />`.
  - Pixel-bank toggle: shown only when BM count >= 2; feeds `buildTopology`.
  - `validate(quantities)` → render warnings; disable CTA when `!canCheckout`.
  - Footer: live total = `applyDiscount(computeTotal(quantities))`; "Add to cart".
  - Add-to-cart: for each item with qty > 0, `addItem({ name, price: unitPrice,
    ... })` qty times (or pass qty if cart supports it — check `cart-context`).

## Files to modify

- `src/components/pricing/card.tsx`
  - Add an optional `variant`/flag for the builder card OR a dedicated prop
    `onBuildYourOwn`. Simplest: a new `isBuilder` data flag that renders an
    outline/dashed card whose CTA opens `CustomSetupDialog` instead of add-to-cart.
- Pricing section that renders `goadsSetupCards` (find the consumer of
  `goadsSetupCards`) — add the 4th builder card entry/element.

## 4-card layout decision (resolve here)

The setups row uses `first | middle | last` variants sized for a 3-column bar.
Two options:

- **A (recommended, low risk):** keep the 3-preset bar untouched; render the
  "Build your own" card as a separate full-width outline CTA panel BELOW the bar
  ("Need something different? Build your own setup →"). No grid rework.
- **B:** make it a true 4th column — rework the first/middle/last variants +
  container widths to a 4-up grid. More layout churn, higher regression risk.

Pick A unless the design explicitly needs 4 equal columns.

## Validation

- `npx tsc --noEmit` passes.
- Manual: open builder, switch template, change steppers → total + diagram update;
  pixel-bank toggle appears at 2+ BMs and redraws bridge; warnings behave;
  add-to-cart produces correct individual cart lines with right prices.

## Risks

- Cart line duplication: confirm whether `addItem` merges same-name items or
  needs a qty field; adjust so quantities are represented correctly.
- Keep the builder static/no heavy effects (consistent with the LCP-safe work).
