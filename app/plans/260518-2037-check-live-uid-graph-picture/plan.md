---
name: check-live-uid-graph-picture
status: completed
created: 2026-05-18
completed: 2026-05-18
branch: nammdev-may18
blockedBy: []
blocks: []
---

# Check Live UID — switch to Graph picture endpoint (client-side)

Replace the fragile server HTML-scrape with the public, CORS-open Graph
picture endpoint, called **directly from the browser** (same approach as
timuid.com — `origin` cross-site, `access-control-allow-origin: *`).

## Confirmed scope (user)
- Fetch: **client-side direct** to `https://graph.facebook.com/{uid}/picture?redirect=false`
  ("làm theo bên kia" = timuid.com). No server proxy, no auth token.
- Classification: **2-state LIVE/DEAD**, keep current UI (Active/Disabled).
- No avatar thumbnail in results — UI stays as-is.

## Endpoint behaviour (from user-captured response)
- `GET https://graph.facebook.com/{uid}/picture?redirect=false`
- 200 → `{"data":{"height":N,"is_silhouette":bool,"url":"...","width":N}}`
- CORS: `access-control-allow-origin: *` → callable from browser cross-site.
- Invalid/nonexistent UID → error JSON / non-200 (e.g. `{"error":{...}}`).
- **Rule:** has `data.url` (HTTP ok) ⇒ **LIVE** (incl. `is_silhouette:true` —
  silhouette ≠ dead). `error`/non-ok/parse-fail ⇒ **DEAD**.

## Current state
- `foreplay-check-uid-tool.tsx` (282L): bulk textarea → per-uid
  `fetch('/api/check-uid?uid=')` (sequential map) → LIVE/DEAD list + copy/export.
- `app/api/check-uid/route.ts`: scrapes `facebook.com/{uid}` HTML for dead
  markers. Becomes unused after this change.

## Phases
| # | Phase | File |
|---|-------|------|
| 1 | Client-side Graph probe + 2-state classify | phase-01-client-probe.md |
| 2 | Bulk runner: concurrency pool + progress, keep UI/labels | phase-02-bulk-runner.md |
| 3 | Remove now-unused /api/check-uid route + refs | phase-03-cleanup-route.md |
| 4 | Verify (build/lint/tsc + live/dead/bulk/rate-limit manual) | phase-04-verify.md |

## Risks
- FB IP rate-limit/temporary block on bulk → mitigate: small concurrency
  pool (~5) + tiny jitter delay + 1 retry on transient failure; per-user IP
  (client-side) distributes load (main reason to go client-side).
- Graph may change error shape → classify by "valid data.url present" not by
  exact error text (robust).
- CORS could be tightened by FB later → document; server fallback is a known
  escape hatch (not built now, YAGNI).
- No token = subject to unauthenticated rate limits; acceptable per user.

## Success criteria
- Live UID → Active; disabled/fake UID → Disabled; bulk list works with
  progress; no `/api/check-uid` dependency; build/lint/tsc clean.
- UI unchanged visually (same cards, Active/Disabled, copy/export).

## Open questions
- Keep `/api/check-uid/route.ts` as dormant fallback vs delete? Plan = delete
  (YAGNI, avoid dead code); revert from git if a fallback is later needed.
