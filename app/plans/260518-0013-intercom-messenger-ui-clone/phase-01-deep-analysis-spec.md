# Phase 01 — Deep analysis → complete visual spec

**Context:** plan.md · `intercom.html` · `intercom.css` · 2 screenshots ·
reference.md
**Priority:** Critical · **Status:** planned · Foundation — everything else
depends on this. No component code yet; output = ONE spec doc.

## Overview
`intercom.css` is only 6 hashed rules; `intercom.html` is structure only.
Produce a SINGLE authoritative spec listing every value needed to rebuild,
each tagged **[SRC]** (from css/html) or **[DERIVED]** (measured/sampled from
screenshot — lower confidence, build must eyeball).

## Steps
1. **Parse `intercom.html`** → final element tree (ignore hashed classnames,
   keep semantic roles + data-testid):
   - panel > header(gradient+logo+avatarStack+closeX) > body(action rows +
     highlight card) > tab bar(Home active / Messages)
   - Extract the 5 inline **SVG path `d=` strings** verbatim (close-X, send
     arrow, external-link, Home icon+mask, Messages icon+mask) → spec as
     reusable icon assets.
2. **Catalog `intercom.css` [SRC] values** exactly:
   - launcher panel: fixed, bottom 84px, right 20px, width min(400px,…),
     max-height 704px, radius 24px, overflow hidden,
     box-shadow `rgba(9,14,21,.16) 0 5px 40px`, transform-origin right bottom,
     transition (width/height 200ms, transform 300ms cubic-bezier(0,1.2,1,1),
     opacity 83ms ease-out)
   - header gradient: `linear-gradient(117.67deg,#fff,#528bff)`, h 236px,
     z-index -1, fixed top
   - tab item: flex:1, col, items-center, padding 18px 3px, color
     rgb(108,111,116) (inactive); active = dark (sample from screenshot)
   - scroll body: col, padding 0 20px, min-height 100%
3. **Derive missing [DERIVED] from screenshots** (measure px ratios off the
   provided images, sample hex with eyedropper reasoning):
   - panel total width/height, header content padding, logo size,
     avatar size (~40px per reference) + overlap + white ring width,
     title font-size/weight/line-height/color (white),
     action card: bg white, radius, padding, gap, shadow, divider,
     row title vs sub color/size, trailing icon size/color,
     highlight card bg tint + "Send Feedback" button (black, radius, height,
     text), tab bar height/border-top/active color/icon size/label size,
     collapsed launcher: size, bg (near-black), icon, shadow, position.
4. Write `visuals/intercom-spec.md` (this plan dir): one table per region with
   columns Property | Value | SRC/DERIVED | Tailwind-equivalent.
5. List all colors as a small palette (gradient stops, text, button, tab,
   launcher) — literal hex, NOT foreplay tokens (per plan decision).

## Related files
- Read: `intercom.html`, `intercom.css`, both screenshots, reference.md
- Create: `plans/260518-0013-intercom-messenger-ui-clone/visuals/intercom-spec.md`

## Todo
- [ ] HTML tree + 5 SVG paths extracted
- [ ] css [SRC] values cataloged exactly
- [ ] screenshot [DERIVED] values measured + flagged
- [ ] intercom-spec.md written (region tables + palette)

## Success criteria
- Spec covers every visible element; each value tagged SRC/DERIVED.
- Build phase can implement without re-opening html/css/screenshots.

## Risk
- DERIVED values approximate → mark clearly; phase 5 visual QA corrects.

## Next
- Unblocks phase 2 (architecture) + phase 3 (build).
