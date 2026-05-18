# Phase 02 — Component architecture + file plan

**Context:** plan.md · phase-01 spec
**Priority:** High · **Status:** planned · Depends on phase 1.

## Overview
Decompose the messenger into small own-components (kebab-case, <200L each),
mapping 1:1 to spec regions. No foreplay tokens — literal values from spec
(distinct surface). Decide folder + naming + props before building.

## Proposed structure (own namespace, not /foreplay)
`app/src/components/support-widget/`
| File | Role |
|---|---|
| `support-widget.tsx` | Orchestrator: launcher + open/close state + panel mount |
| `support-widget-launcher.tsx` | Collapsed round button (bottom-right) |
| `support-widget-panel.tsx` | Panel shell (geometry, radius, shadow, anim) |
| `support-widget-header.tsx` | Gradient header: logo + avatar stack + close X |
| `support-widget-avatar-stack.tsx` | Overlapping avatars atom |
| `support-widget-action-row.tsx` | Reusable row (title+sub+trailing icon) |
| `support-widget-highlight-card.tsx` | "Share your ideas" + CTA button |
| `support-widget-tab-bar.tsx` | Home/Messages bottom tabs |
| `support-widget-icons.tsx` | The 5 extracted SVG paths as components |
| `support-widget.config.ts` | Content data (rows, links, avatars, labels) |

## Steps
1. Confirm folder/name (`support-widget` — generic, reusable, not Intercom-
   branded). Avoid Intercom hashed class names entirely.
2. Define prop contracts (data-driven via config: rows[], links, avatars[],
   colors from spec palette as module constants).
3. Decide literal-value strategy: a `support-widget.tokens.ts` holding spec
   palette/dimensions as named consts (DRY; one source for build phase).
4. Confirm each file projected <200L; split if not.

## Related files
- Read: phase-01 `visuals/intercom-spec.md`
- Create (skeletons only this phase, or defer to phase 3): list above

## Todo
- [ ] Folder/namespace confirmed (`support-widget`)
- [ ] Component list + props finalized
- [ ] tokens.ts palette/dimension consts defined from spec
- [ ] Line-budget check per file

## Success criteria
- Clear 1:1 map: spec region → component. No file >200L projected. No Intercom
  class names. DRY token module.

## Risk
- Over-fragmentation → keep atoms only where reused (row, icons, avatar).

## Next
- Unblocks phase 3 build.
