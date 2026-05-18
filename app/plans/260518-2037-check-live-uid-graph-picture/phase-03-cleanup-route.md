# Phase 03 — Remove unused /api/check-uid route

**Context:** plan.md · phase-01/02 · `src/app/api/check-uid/route.ts`
**Priority:** Medium · **Status:** planned · Depends on P1 (client no longer
calls it).

## Overview
After P1, nothing calls `/api/check-uid`. Delete the route to avoid dead code
(YAGNI). Verify no other importer.

## Steps
1. Grep repo for `/api/check-uid` and `api/check-uid` — confirm only the tool
   referenced it (now removed in P1) and no other route/test/page uses it.
2. Delete `src/app/api/check-uid/route.ts` (and the empty `check-uid` dir if
   left).
3. Confirm `tools-registry.ts` / header tools menu point to the PAGE
   (`/tools/check-uid`), not the API — unaffected (separate path).
4. tsc/eslint/build to ensure nothing references the removed module.

## Related files
- Delete: `src/app/api/check-uid/route.ts`
- Read-only verify: tool component, tools-registry, header tools menu

## Todo
- [ ] Grep confirms zero remaining references
- [ ] Route file deleted
- [ ] build/tsc clean (no missing-module)

## Success criteria
- `/api/check-uid` gone; build green; `/tools/check-uid` page still works
  (uses client probe now).

## Risk
- If a future server fallback is wanted, restore from git history (documented
  in plan open-questions).

## Next
- Phase 4 full verify.
