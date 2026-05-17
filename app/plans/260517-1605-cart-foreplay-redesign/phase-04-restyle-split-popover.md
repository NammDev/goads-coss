# Phase 04 — Restyle + split cart-popover.tsx

**Context:** plan.md · P1 spec · `app/src/components/cart-popover.tsx` (234L)
**Priority:** High · **Status:** planned · Depends on P1; integrates P2+P3.

## Overview
Restyle the cart shell to Foreplay (**dark panel + white island**) AND split the
234L file so each file <200L (modularization rule). Logic preserved exactly.

## Key insights
- Currently 234L → over 200L limit. Split by concern:
  - `cart-popover.tsx` — orchestrator (state, render Popover/Sheet) <130L
  - `cart-popover-trigger.tsx` — foreplay floating trigger button atom
  - `cart-popover-utils.ts` — `useHoverIntent`, `useHeaderGap`,
    `buildTelegramMessage`, `TELEGRAM_URL` (pure/hook, no JSX)
- `CartBody` stays in orchestrator (thin) — composes P2 rows + P3 summary.
- Visual model: outer panel = dark (`--fp-solid-800/900` + `--fp-alpha` border);
  inner content region = white island per P1. Header (title + count badge)
  on dark; island wraps items/summary.
- Mobile `Sheet` + desktop `Popover` SHARE CartBody → restyle once, test both.
- DO NOT change: `cart:item-added` listener, persist-open behaviour,
  hover-intent timing, `handleOrder` (clearCart + Telegram).

## Requirements
- Functional: open/close, auto-open on add, mobile/desktop parity, order flow.
- Non-functional: every split file <200L; zero hex; tokens only.

## Steps
1. Extract `useHoverIntent`,`useHeaderGap`,`buildTelegramMessage`,`TELEGRAM_URL`
   → `cart-popover-utils.ts`; import back.
2. Extract trigger `<Button>` → `cart-popover-trigger.tsx` (foreplay style,
   props: `ref`, `totalItems`, hover handlers).
3. Restyle Popover/Sheet shell: dark panel + white island region per P1.
4. Restyle header (title Inter Display, count badge) for dark surface.
5. Verify line counts; tsc + ESLint all new/changed files.

## Related code files
- Modify: `src/components/cart-popover.tsx`
- Create: `src/components/cart-popover-trigger.tsx`, `src/components/cart-popover-utils.ts`
- Read: P1 spec, `cart-item.tsx`, `cart-summary.tsx`

## Todo
- [ ] utils extracted, imports rewired
- [ ] trigger atom extracted + foreplay-styled
- [ ] shell restyled (dark panel + white island)
- [ ] header restyled
- [ ] all files <200L, ESLint/tsc clean

## Success criteria
- cart-popover.tsx <200L; helper files <200L.
- Desktop Popover + mobile Sheet both Foreplay-styled, fully functional.
- Auto-open on add + persist-open + Telegram order all intact.

## Risk
- Split breaking listener/timing → regress. Mitigate: move logic verbatim, no rewrite.
- Dark/white contrast errors → P5 visual QA.

## Security
- None (no logic change).

## Next
- Feeds P5 verify.
