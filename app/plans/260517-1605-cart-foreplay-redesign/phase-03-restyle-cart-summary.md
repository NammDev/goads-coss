# Phase 03 — Restyle cart-summary.tsx

**Context:** plan.md · phase-01 spec · `app/src/components/cart-summary.tsx` (103L)
**Priority:** High · **Status:** planned · Depends on P1 spec.

## Overview
Restyle payment-method cards (Crypto/Wise), Total row, and "Order via Telegram"
CTA to Foreplay. Keep `onPaymentChange`/`onOrder`/state logic & props.

## Key insights
- CTA "Order via Telegram" → **reuse `foreplay-cta-button` / light-primary
  classes** (DRY; do NOT rebuild). It's an action `<button>` not nav → reuse
  classes verbatim like wiring phase-04 `CartBuyButton` (cite that pattern).
- Payment cards: Foreplay selectable-card style — selected = clear ring/border
  per spec; replace ad-hoc `primary/5` with `--fp-*` tokens.
- Total row: larger Foreplay typographic emphasis (Inter Display number).
- Lives in dark panel zone OR island per P1 decision — apply matching contrast.

## Requirements
- Functional: payment toggle, total, order trigger unchanged.
- Non-functional: zero hex; tokens only; keep ≤103L.

## Steps
1. Restyle payment card buttons (default/hover/selected) to P1 spec tokens.
2. Restyle Total row (label, USD, amount) — Foreplay scale.
3. Swap order CTA to reuse foreplay light-primary classes (keep `onOrder`, Send icon).
4. tsc + ESLint.

## Related code files
- Modify: `src/components/cart-summary.tsx`
- Read: P1 spec, `foreplay-cta-button.tsx`, `foreplay-light-primary-button.tsx`

## Todo
- [ ] Payment cards restyled (3 states)
- [ ] Total row restyled
- [ ] CTA reuses foreplay light-primary classes
- [ ] ESLint/tsc clean

## Success criteria
- Selected payment visually unambiguous; CTA matches Foreplay buttons elsewhere.
- No hex/inline color.

## Risk
- Reusing wrong button (nav `<a>`) → semantics break. Mitigate: classes only.

## Security
- None (Telegram URL build unchanged in cart-popover).

## Next
- Consumed by CartBody (P4). Parallel-safe with P2.
