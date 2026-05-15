# Phase 02 — Legacy Quarantine

**Priority:** Critical · **Status:** pending · **Risk:** R1 (tools collision)

## Goal
Remove old site from routing WITHOUT deleting code, freeing root URLs for the new site.

## Approach
Next.js App Router excludes folders prefixed `_` from routing (private folders). Move:
- `app/src/app/(marketing)/`  → `app/src/app/_legacy/marketing/`
- `app/src/app/tools/`        → `app/src/app/_legacy/tools/`  (R1: frees `/tools`)
EXCEPT the phase-01 carve-out list (legal/sales/share) — those stay routable; handled in phase-06.

## Steps
1. Stop `next dev` (Windows file lock) — kill listener on :3000.
2. `git mv "app/src/app/(marketing)" app/src/app/_legacy-marketing` (use a name without parens to avoid group semantics; `_legacy-marketing` is private + not a route group). Same for `tools` → `_legacy-tools`.
   - NOTE: a folder named `_legacy` containing `(marketing)` would still NOT route (parent `_` wins) — acceptable; choose `_legacy/marketing` for tidiness, verify no route emitted.
3. Carve-outs: move `talk-to-sales`, `privacy-policy`, `terms-of-service`, `refund-policy`, `share` OUT of the legacy move (keep them under a routed location per phase-06 decision) — do NOT bury them in `_legacy`.
4. Imports: legacy files import `@/components/*`, `@/data/*` — still resolve (alias unaffected). Do not rewrite legacy internals.
5. Restart dev; confirm old URLs now 404 (except carve-outs) and `/tools` is free.

## Related files
- Move: `app/src/app/(marketing)/**`, `app/src/app/tools/**`
- Keep routed (carve-out): 5 routes from phase-01.

## Success criteria
- `npx tsc --noEmit` 0 errors (legacy code still compiles or is excluded — verify tsconfig include).
- Old root URLs (`/about`, `/blog`, `/bm` old) → 404. `/tools` → 404 (pre-promotion).
- Carve-out URLs still 200.

## Risks / mitigation
- tsconfig may type-check `_legacy`; if legacy code has stale errors, exclude `app/src/app/_legacy*` in tsconfig `exclude` (note in plan, get user ok).
- Hidden imports FROM legacy INTO shared code are fine; imports FROM active code INTO legacy must be 0 — grep `_legacy` references after move.
