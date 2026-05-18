# Phase 04 — Verify

**Context:** plan.md · phases 1–3
**Priority:** High · **Status:** planned · Final gate.

## Steps
1. `npx tsc --noEmit` (ignore stale `.next/types`) + `npx eslint` on the tool
   file → clean. `npm run build` exit 0.
2. Route gone: `curl -s -o /dev/null -w '%{http_code}' /api/check-uid?uid=1`
   → 404. `/tools/check-uid` page → 200.
3. Manual (browser, /tools/check-uid):
   - Known LIVE uid → "Active". Network tab: request hits
     `graph.facebook.com/.../picture?redirect=false`, NOT `/api/check-uid`.
   - Fake/short/garbage uid → "Disabled".
   - `is_silhouette:true` real uid → still "Active" (not Disabled).
   - Bulk paste ~30 mixed (incl. profile-row text → auto-extract) → all
     resolve, progress chip advances, order preserved, copy/export work.
   - Re-run same bulk → consistent (no self-inflicted mass-DEAD from rate
     limit; if rate-limited, document observed behaviour).
4. Confirm UI unchanged visually (cards, Active/Disabled badge, bulk actions).

## Todo
- [ ] tsc/eslint/build green
- [ ] /api/check-uid 404, /tools/check-uid 200
- [ ] live/dead/silhouette/bulk manual pass
- [ ] request goes to graph.facebook.com (verified in devtools)
- [ ] UI visually unchanged

## Success criteria
- All gates pass; tool works purely client-side via Graph picture endpoint;
  no server route; UI intact.

## Risk / unresolved
- FB unauthenticated rate-limit threshold unknown → note real-world bulk
  ceiling observed during test for the user.

## Next
- Report + (user) commit on `nammdev-may18`.
