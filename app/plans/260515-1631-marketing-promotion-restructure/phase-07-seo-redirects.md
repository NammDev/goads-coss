# Phase 07 — SEO: sitemap, robots, redirects

**Priority:** High · **Status:** pending · **Risk:** R4

## Goal
Keep search/indexing correct after URL cutover; avoid broken inbound links.

## Steps
1. `app/src/app/sitemap.ts`: regenerate from new root routes. Remove `/foreplay/<promoted>`
   entries; keep demo `/foreplay/*` only if they should be indexed (likely `noindex` demo).
2. `app/src/app/robots.ts`: ensure new root allowed; consider `Disallow: /foreplay/`
   (demo/reference) and `/_legacy` not routed anyway.
3. Redirects (decision from phase-01 Q3):
   - If 301 wanted: add `redirects()` in `next.config` mapping notable old URLs → new
     (`/foreplay/bm` → `/bm`, plus old-site URL equivalences if SEO continuity matters).
   - If hard cutover: skip; old URLs 404 (acceptable per user if no SEO concern).
4. Metadata: promoted pages — verify `metadata` titles/canonical no longer say `/foreplay`.
   Help/docs canonical correct.
5. `not-found.tsx` still valid at root.

## Related files
- `app/src/app/sitemap.ts`, `app/src/app/robots.ts`, `next.config.*`, page `metadata` exports.

## Success criteria
- sitemap lists root marketing URLs, excludes promoted `/foreplay/*` duplicates.
- robots sane; no accidental `Disallow: /`.
- (If chosen) 301s resolve old → new with curl `-I`.

## Unresolved
- 301 vs hard cutover (phase-01 Q3).
- Should demo `/foreplay/*` be `noindex`? (recommended yes — reference only).
