# Phase 05 — Demo route + visual QA + build/lint

**Context:** plan.md · phases 3–4
**Priority:** High · **Status:** planned · Final gate.

## Overview
Ship a demo route to view the widget in isolation, visually compare to the two
screenshots, and verify build quality. No production mount (integration point
is an open question — out of scope).

## Steps
1. Demo route: `app/src/app/(marketing)/_demo/support-widget/page.tsx`
   (or a simple route) rendering `<SupportWidget />` on a neutral page so the
   launcher + open panel are inspectable. Mark clearly as demo/non-prod.
2. `npm run build` → exit 0; `npx tsc --noEmit` 0; ESLint clean on
   `support-widget/**`.
3. Line-count gate: every `support-widget/*` file <200L.
4. Visual QA: use `chrome-devtools` skill to screenshot the demo (launcher
   state + open state) and diff against the 2 user screenshots — list
   pixel/value deltas; fix [DERIVED] values that are off; re-shoot.
5. Confirm: no `intercom-*` hashed classnames, no Intercom script/network, no
   copied obfuscated CSS — only spec-derived literals in own components.
6. Update `visuals/intercom-spec.md` with any corrected DERIVED values.

## Todo
- [ ] demo route renders widget (launcher + open)
- [ ] build/tsc/eslint green
- [ ] line-count gate pass
- [ ] screenshot diff vs both references; deltas fixed
- [ ] no-Intercom-artifact check
- [ ] spec corrected

## Success criteria
- Demo visually matches screenshots (human sign-off). All gates green.
- Reusable `<SupportWidget />` ready; integration deferred to follow-up.

## Risk
- Visual parity is subjective → present side-by-side; iterate DERIVED values
  at most ~2 rounds, then surface residual deltas to user.

## Security / IP
- Own components only; no Intercom code/classes/script. Placeholder assets
  (user swaps logo/avatars). Document literals as design values, not copied code.

## Next
- Follow-up (separate plan): wire `<SupportWidget />` to real content / cart.
