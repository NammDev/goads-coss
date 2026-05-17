# Phase 02 — Restyle cart-item.tsx

**Context:** plan.md · phase-01 spec · `app/src/components/cart-item.tsx` (80L)
**Priority:** High · **Status:** planned · Depends on P1 spec.

## Overview
Restyle `CartItemRow` + `CartEmpty` to Foreplay. Keep component API, props,
markup structure & cart logic (`useCart`, NumberField stepper) — class-only.

## Key insights
- Row sits inside the white island (per P1 decision) → text = `--fp-solid-900`,
  muted = `--fp-solid-400`, hover = subtle `--fp-solid-50` (not primary/5).
- Qty stepper +/- & remove: larger Foreplay hit targets, foreplay radii.
- `CartEmpty`: Foreplay-scale spacing + Inter Display sub-heading.
- DO NOT change `react-aria-components` NumberField wiring (a11y).

## Requirements
- Functional: stepper, remove, qty badge, price unchanged.
- Non-functional: zero hex; tokens only; keep <100L (atom rule).

## Steps
1. Apply P1 spec tokens to row container, thumbnail box, name/unit, price.
2. Restyle stepper Group + +/- AriaButtons + remove btn (foreplay neutral scale,
   not `bg-primary/10`); keep `slot`/`onChange` intact.
3. Restyle `CartEmpty` (icon, headline, sub) to Foreplay sizing.
4. tsc + ESLint the file.

## Related code files
- Modify: `src/components/cart-item.tsx`
- Read: P1 `visuals/cart-foreplay-spec.md`

## Todo
- [ ] CartItemRow restyled to spec
- [ ] Stepper + remove restyled, logic intact
- [ ] CartEmpty restyled
- [ ] ESLint/tsc clean, <100L

## Success criteria
- Renders on island bg with correct contrast; stepper/remove still work.
- No hex/inline color; file <100L.

## Risk
- Contrast: dark tokens on white island — verify visually in P5.

## Security
- None.

## Next
- Consumed by CartBody (P4). Parallel-safe with P3 (different file).
