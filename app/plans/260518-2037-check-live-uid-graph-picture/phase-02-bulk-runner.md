# Phase 02 — Bulk runner: concurrency pool + progress

**Context:** plan.md · phase-01 · `foreplay-check-uid-tool.tsx`
**Priority:** High · **Status:** planned · Depends on P1.

## Overview
Current bulk path runs uids via `.map(checkUid)` (all parallel) or sequential.
Direct client calls to FB at high parallelism → rate-limit/temporary IP block.
Add a small concurrency pool + light throttle + 1 retry, keep existing
progress chip + result rendering.

## Key insight
Client-side spreads load across each user's own IP, but a single big paste
still bursts from one IP → cap concurrency and add jitter.

## Implementation (in foreplay-check-uid-tool.tsx run handler)
- Pool size ~5 concurrent (constant `CONCURRENCY = 5`).
- Tiny jitter delay (e.g. 80–150ms) before each request.
- 1 retry on transient: `!res.ok` 429/5xx or network throw → wait ~600ms,
  retry once; still failing → DEAD (user can re-run; keep 2-state).
- Update `progress {done,total}` after each settle (chip already exists).
- Preserve order in `results` (map by index, not completion order).

Pseudocode:
```ts
const CONCURRENCY = 5
async function runPool(uids: string[], onDone: (r: UIDResult)=>void) {
  let i = 0
  await Promise.all(Array.from({length: CONCURRENCY}, async () => {
    while (i < uids.length) {
      const idx = i++
      await sleep(80 + Math.random()*70)
      onDone(await checkUidWithRetry(uids[idx], idx))
    }
  }))
}
```

## Related files
- Modify: `src/components/foreplay/foreplay-check-uid-tool.tsx` (run handler +
  add `runPool`/`checkUidWithRetry`/`sleep` helpers; keep file <300L —
  extract helpers to a sibling `check-uid-runner.ts` if it grows past ~280L)

## Todo
- [ ] Concurrency pool (CONCURRENCY=5) preserving result order
- [ ] Jitter + 1 retry on transient
- [ ] Progress chip updates per settle
- [ ] tsc/eslint; file size check (extract if >~280L)

## Success criteria
- Paste 30+ mixed UIDs → all resolve, progress advances, order kept, no mass
  failure from self-inflicted rate-limit (re-run yields same).

## Risk
- Big lists (500+) still slow / partial block → acceptable; document, user
  can chunk. No server fallback (YAGNI per scope).

## Next
- Phase 3 removes the dead server route.
