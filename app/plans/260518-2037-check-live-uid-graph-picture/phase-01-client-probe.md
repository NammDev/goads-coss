# Phase 01 — Client-side Graph probe + 2-state classify

**Context:** plan.md · `src/components/foreplay/foreplay-check-uid-tool.tsx`
**Priority:** Critical · **Status:** planned · Core of the feature.

## Overview
Replace the `/api/check-uid` call inside the tool with a direct browser fetch
to the Graph picture endpoint + a robust 2-state classifier.

## Key insight
CORS is open (`access-control-allow-origin: *`) so the browser can call it
cross-site (proven by timuid.com). No token, no proxy.

## Implementation (in foreplay-check-uid-tool.tsx)
Replace the existing `checkUid(uid)` (the `fetch('/api/check-uid?...')` one)
with:

```ts
async function checkUid(uid: string): Promise<UIDResult> {
  if (!/^\d{6,20}$/.test(uid)) return { uid, status: "DEAD" }
  try {
    const res = await fetch(
      `https://graph.facebook.com/${encodeURIComponent(uid)}/picture?redirect=false`,
      { method: "GET", signal: AbortSignal.timeout(10000), cache: "no-store" },
    )
    if (!res.ok) return { uid, status: "DEAD" }            // 400 = error/nonexistent
    const json = await res.json().catch(() => null)
    const url = json?.data?.url
    return { uid, status: url ? "LIVE" : "DEAD" }           // silhouette=true still LIVE
  } catch {
    return { uid, status: "DEAD" }                          // network/CORS/timeout
  }
}
```

- Keep the `UIDStatus = "LIVE" | "DEAD"` + `UIDResult` types unchanged.
- Keep `extractUid`, labels (`Active`/`Disabled`), result UI untouched.

## Related files
- Modify: `src/components/foreplay/foreplay-check-uid-tool.tsx` (only the
  `checkUid` fn + drop the `/api/check-uid` reference/comment)

## Todo
- [ ] Swap `checkUid` to direct Graph fetch
- [ ] uid regex guard before fetch (skip wasted call)
- [ ] 2-state classify by `data.url` presence
- [ ] tsc/eslint the file

## Success criteria
- Single known-live UID → LIVE; fake/disabled → DEAD. No `/api/check-uid` hit
  (verify Network tab → request goes to graph.facebook.com).

## Risk
- FB transient 4xx under load → handled in phase 2 (retry/throttle).

## Next
- Phase 2 wraps this in a throttled bulk runner.
