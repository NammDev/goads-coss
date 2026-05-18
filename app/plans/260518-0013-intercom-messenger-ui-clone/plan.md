---
name: intercom-messenger-ui-clone
status: completed
created: 2026-05-18
completed: 2026-05-18
branch: feat/prelaunch-polish-thanh
blockedBy: []
blocks: []
---

# Rebuild Intercom Messenger UI (visual 100% from screenshots)

Goal: reconstruct the Foreplay Intercom messenger **look** (open panel +
collapsed launcher) as our own React/Tailwind components — pixel-matching the
two screenshots. Own code, own components; NOT embedding Intercom, NOT reusing
Intercom's hashed classes.

## Sources (user-provided)
- `intercom.html` — rendered DOM hierarchy of the OPEN Home screen (structure +
  exact icon SVG paths: close-X, send, external-link, Home, Messages).
- `intercom.css` — 6 grabbed hashed rules (panel wrapper geometry, gradient,
  tab item, scroll body) — partial, must infer the rest from screenshots.
- 2 screenshots: open messenger (gradient header, logo+2 avatars, title, 3
  cards, tab bar) + collapsed launcher (black round button, chevron).
- `plans/260518-0006-intercom-ui-language/reference.md` — layout language.

## Key decision
- **Exact Intercom visual values** (literal px/colors), NOT foreplay tokens —
  user wants 100% identical → this is a DISTINCT surface, intentionally off the
  foreplay design system. Document every literal in the spec (phase 1).
- CSS file is partial/random → phase 1 must DERIVE missing values from the
  screenshots (measured ratios + sampled colors), not guess.

## Phases
| # | Phase | File |
|---|-------|------|
| 1 | Deep analysis → complete visual spec (HTML+CSS+screenshots) | phase-01-deep-analysis-spec.md |
| 2 | Component architecture + file plan (atoms, kebab-case, <200L) | phase-02-component-architecture.md |
| 3 | Build static UI — pixel-match both screenshots | phase-03-build-static-ui.md |
| 4 | Behavior + open/close animation (cubic-bezier, launcher toggle) | phase-04-behavior-animation.md |
| 5 | Demo route + visual QA vs screenshots + build/lint | phase-05-mount-demo-verify.md |

## Out of scope (flag)
- Real chat backend / messaging (static UI only; tabs are visual).
- Wiring this widget to the CART content = SEPARATE follow-up (user's stated
  end goal earlier). This plan delivers the reusable UI shell only.

## Risks
- `intercom.css` is incomplete → spec must mark which values are SOURCED vs
  DERIVED-from-screenshot (lower confidence) so build knows what to eyeball.
- Iframe-rendered original → some effects (backdrop, launcher transition) only
  inferable from screenshots, not the CSS snippets.
- "100%" is visual sign-off by human → phase 5 needs side-by-side compare.

## Success criteria
- Open panel + collapsed launcher render pixel-close to screenshots.
- Self-contained components, own tokens/literals, kebab-case, each <200L.
- build exit 0, ESLint clean. Demo route shows both states.
- No Intercom script, no Intercom hashed class names, no copied obfuscated code.

## Open questions
1. Where does it ultimately mount (cart vs global widget)? — deferred; phase 5
   ships a demo route only.
2. Tab "Messages" content — blank placeholder ok? (assume yes, YAGNI).
