# Phase 03 — Build static UI (pixel-match)

**Context:** plan.md · phase-01 spec · phase-02 architecture
**Priority:** High · **Status:** planned · Depends on 1 & 2.

## Overview
Implement the components from phase 2 using exact spec values. Static only —
no open/close logic yet (always-open for visual dev). Goal: render matches
both screenshots.

## Steps (build order)
1. `support-widget.tokens.ts` — palette + dimension consts from spec
   (gradient stops, radius 24px, shadow, paddings, colors, sizes).
2. `support-widget-icons.tsx` — 5 SVGs from spec (close, send, external,
   Home, Messages) as `{className,size}` components.
3. `support-widget-panel.tsx` — shell: width min(400px,…), max-height 704px,
   radius 24px, overflow hidden, box-shadow, white body bg.
4. `support-widget-header.tsx` — gradient `linear-gradient(117.67deg,#fff,
   #528bff)` block (height/clip per spec), logo (placeholder asset), close X
   (top-right, white), `support-widget-avatar-stack.tsx` (overlap + white
   ring), big white title "How can we help?".
5. `support-widget-action-row.tsx` ×2 (Send us a message + sub; Book a Demo
   ext-link) — white card, radius, divider/gap, trailing icon per spec.
6. `support-widget-highlight-card.tsx` — tinted card, heading, paragraph,
   black "Send Feedback" button.
7. `support-widget-tab-bar.tsx` — Home (active dark) / Messages (gray
   rgb(108,111,116)), icon over label, border-top.
8. `support-widget-launcher.tsx` — collapsed round near-black button + icon.
9. Assemble in `support-widget.tsx` (panel forced open for now).
10. Use placeholder images (logo/avatars) — `/images/placeholder` paths;
    real assets are user's to swap (per clone convention).
11. Compile check after each file (tsc/eslint), keep <200L.

## Related files
- Create: all files from phase-02 list
- Read: phase-01 spec

## Todo
- [ ] tokens + icons
- [ ] panel + header + avatar stack
- [ ] action rows + highlight card
- [ ] tab bar + launcher
- [ ] assembled, tsc/eslint clean, each <200L

## Success criteria
- Static render visually matches screenshot 1 (open) + screenshot 2
  (launcher). Zero Intercom classnames. Placeholder assets only.

## Risk
- Gradient/curve of header region — replicate via spec; refine in phase 5.

## Next
- Phase 4 adds behavior/animation.
