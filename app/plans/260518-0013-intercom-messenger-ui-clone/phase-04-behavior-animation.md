# Phase 04 — Behavior + open/close animation

**Context:** plan.md · phase-03 static UI · `intercom.css` transition rule
**Priority:** Medium · **Status:** planned · Depends on phase 3.

## Overview
Add interaction: launcher toggles panel; close X / outside / Esc closes; tab
switch (Home active ↔ Messages placeholder). Match the open/close motion from
the sourced transition.

## Steps
1. `support-widget.tsx`: `open` state. Launcher click → open; close X +
   backdrop click + Esc → close. (No portal needed; fixed positioning per
   spec: bottom 84px / right 20px, launcher below it.)
2. Open/close animation from [SRC] transition:
   `transition: width 200ms, height 200ms, max-height 200ms,
   transform 300ms cubic-bezier(0,1.2,1,1), opacity 83ms ease-out`,
   `transform-origin: right bottom`. Implement via data-state + Tailwind
   arbitrary transition + scale/opacity (closed: scale-95 opacity-0
   pointer-events-none → open: scale-100 opacity-100).
3. Tab bar: local `tab` state; Home = the built screen; Messages = simple
   empty placeholder ("No messages" — YAGNI, static).
4. Launcher icon swap if needed (open shows chevron-down per screenshot 2;
   closed shows messenger icon) — per spec.
5. A11y: panel `role="dialog" aria-label`, close button labelled, Esc handler,
   focus not trapped aggressively (KISS — match Intercom feel, not full modal).
6. tsc/eslint; keep files <200L (extract a `use-support-widget-open` hook if
   `support-widget.tsx` grows).

## Related files
- Modify: `support-widget.tsx`, `support-widget-launcher.tsx`,
  `support-widget-tab-bar.tsx`
- Optional create: `use-support-widget-open.ts`

## Todo
- [ ] launcher toggle + close (X/outside/Esc)
- [ ] open/close transform+opacity animation per sourced curve
- [ ] tab switch (Home / Messages placeholder)
- [ ] a11y labels + Esc
- [ ] tsc/eslint clean, <200L

## Success criteria
- Click launcher → panel animates open from bottom-right (spring curve);
  close returns. Tabs switch. No console errors.

## Risk
- `cubic-bezier(0,1.2,1,1)` overshoot must not clip (panel overflow-hidden is
  internal; animate the wrapper).

## Next
- Phase 5 demo + visual QA.
