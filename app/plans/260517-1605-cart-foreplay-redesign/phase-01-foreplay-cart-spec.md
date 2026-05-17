# Phase 01 — Pin Foreplay cart visual spec

**Context:** plan.md · clone-foreplay SKILL · `app/src/app/globals.css` (`--fp-*`)
**Priority:** High · **Status:** planned · Foundation for P2–P4.

## Overview
Define the cart visual language ONCE so P2–P4 just apply it. No code change here
(spec doc only) — extract real Foreplay white-card/island CSS so sizing/radius/
shadow are exact, not guessed.

## Key insights
- Surface model (user): cart panel = **dark** (`--fp-solid-800/900` bg,
  `--fp-alpha-*` borders & secondary text); **white "island"** block inside
  (`--fp-solid-0` bg, `--fp-solid-900` text) for primary content.
- "Mọi thứ to" = Foreplay generous scale: larger padding, Inter Display headings,
  `rounded-[10px]`+ radii, bigger hit targets.
- No new tokens — `--fp-solid-*` / `--fp-alpha-*` already in globals.css.

## Steps
1. `docs/foreplay/extract-css.sh` on a Foreplay white card/panel class (e.g.
   pricing card / feature block) → capture exact padding, border-radius,
   box-shadow, gap, font-size/weight/line-height.
2. Map extracted CSS → Tailwind EXACT (clone-foreplay Step 3 table). No rounding.
3. Produce `visuals/cart-foreplay-spec.md` (in this plan dir) — token table:
   - Panel (dark): bg, border, radius, padding, shadow
   - Island (white): bg, text, radius, padding, divider
   - Typography: title (Inter Display), body, price, label
   - Buttons: reuse `foreplay-cta-button` / `light-primary` classes (cite which)
   - Trigger button (floating cart icon) style
4. Decide WHICH region is the white island (recommend: items-list scroll area
   OR the total/summary block — pick one, document rationale; KISS = one island).

## Related code files
- Read: `globals.css`, `foreplay-cta-button.tsx`, `foreplay-light-primary-button.tsx`,
  `foreplay-typography.tsx`, `docs/foreplay/foreplay-source.css`
- Create: `plans/260517-1605-cart-foreplay-redesign/visuals/cart-foreplay-spec.md`

## Todo
- [ ] Extract white-card CSS via extract-css.sh
- [ ] Tailwind-map exact values
- [ ] Write cart-foreplay-spec.md
- [ ] Pick + document the island region

## Success criteria
- Spec doc lists exact Tailwind for every cart surface/text/button.
- Zero hex; all colors map to `--fp-*` / semantic tokens.

## Risk
- Wrong source class → wrong scale. Mitigate: verify nesting (clone-foreplay Step 2).

## Security
- None (static styling).

## Next
- Unblocks P2, P3, P4 (all consume the spec).
