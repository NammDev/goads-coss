---
name: cart-foreplay-redesign
status: completed
created: 2026-05-17
completed: 2026-05-17
branch: feat/pre-launch-polish
blockedBy: [260515-2234-cart-buynow-wiring]   # satisfied — wiring committed 978a436
blocks: []
---

# Redesign cart UI in Foreplay style

Goal: restyle the **new marketing cart** (floating CartPopover on /pricing etc.)
to Foreplay's visual language — dark panel chrome + a **white "island" block**
inside, larger Foreplay sizing/typography. Logic untouched.

## Confirmed scope (user)
- ONLY new marketing cart: `cart-popover.tsx`, `cart-item.tsx`, `cart-summary.tsx`.
- SKIP legacy `cart-button-wrapper.tsx` + old `site-header.tsx` / `dashboard/site-header.tsx`.
- `cart-context.tsx` = logic only, **NOT touched** (state/localStorage/`cart:item-added`/Telegram).
- **Surface:** cart panel = dark (foreplay `--fp-solid-800/900`); a white island
  block (`--fp-solid-0`, dark text `--fp-solid-900`) inside for key content.
- Structure: **restyle cart-* in place** (keep filenames/imports) + split
  `cart-popover.tsx` (234L) → <200L per file.
- `clone-foreplay` = STYLE methodology (exact token→Tailwind mapping, no hex,
  semantic tokens, Inter/Inter Display). foreplay.co has no real cart to clone
  pixel-perfect → mine white-card/island specs from existing foreplay source.

## Key findings (grounding)
- Tokens already in `globals.css`: `--fp-solid-0..900` (#fff→#090a0e),
  `--fp-alpha-0..900` (white-on-dark), `--fp-py-section`. No new tokens needed.
- Reusable foreplay atoms exist — **reuse, don't rebuild** (DRY):
  `foreplay-cta-button.tsx`, `foreplay-light-primary-button.tsx`,
  `foreplay-light-ghost-action.tsx`, `foreplay-typography` (`fpText`).
- Cart markup/props stay; only className/structure-for-style change.
  `cart:item-added` auto-open + persist (no auto-close) already correct.
- `cart-popover.tsx` 234L → split: main + trigger atom + utils (hooks/helpers).
- clone-foreplay sources: `docs/foreplay/html/foreplay-homepage-latest.html`,
  `docs/foreplay/foreplay-source.css`, `docs/foreplay/extract-css.sh`.

## Phases
| # | Phase | File |
|---|-------|------|
| 1 | Pin Foreplay cart visual spec (extract white-island/card CSS, token map) | phase-01-foreplay-cart-spec.md |
| 2 | Restyle `cart-item.tsx` (item row + empty state) | phase-02-restyle-cart-item.md |
| 3 | Restyle `cart-summary.tsx` (payment cards + total + CTA) | phase-03-restyle-cart-summary.md |
| 4 | Restyle + split `cart-popover.tsx` (dark panel + white island, <200L) | phase-04-restyle-split-popover.md |
| 5 | Verify (build, ESLint, visual QA /pricing, scope-leak check) | phase-05-verify.md |

## Risks
- Dark-panel + white-island contrast must keep text/icon tokens correct (no
  hardcoded color) — easy to leave dark-on-dark or white-on-white.
- Popover/Sheet share `CartBody` — restyle once, verify BOTH desktop & mobile.
- Split must not break `cart:item-added` listener / hover-intent timing.
- foreplay-cta-button is `<a>`-styled; cart CTA is an action `<button>` — reuse
  classes, not the nav component (same lesson as wiring phase-04).

## Success criteria
- /pricing cart: dark foreplay panel, white island block, large foreplay sizing.
- Zero hex / inline color in cart JSX — semantic / `--fp-*` tokens only.
- `npm run build` exit 0, tsc 0, ESLint clean. cart-popover.tsx <200L.
- Desktop Popover + mobile Sheet both restyled & functional.
- /docs /help unaffected (cart still marketing-scoped). Telegram flow intact.
