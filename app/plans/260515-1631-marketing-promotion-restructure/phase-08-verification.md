# Phase 08 — Verification

**Priority:** Critical · **Status:** pending

## Goal
Prove the cutover is complete and nothing regressed before commit.

## Checks
1. **Build/type:** `npx tsc --noEmit` → 0 errors. `npx eslint` on all changed files → clean.
2. **Production build:** `npm run build` succeeds (catches route-collision / RSC errors that
   dev hides). Critical — restructure must pass a real build.
3. **Route audit (HTTP 200):**
   - Root promoted: `/`, `/bm`, `/pricing`, `/partners`, `/aboutus`, `/blog`,
     `/agency-ad-account`, `/google-agency`, `/tiktok-agency`, `/blue-verification`,
     `/profiles`, `/tiktok-accounts`, `/unban`, `/contact`, `/payment`, `/book-demo`,
     `/community`, `/reviews`, `/tempmail`, `/tools`, `/tools/2fa`.
   - `/help`, `/help/getting-started`, `/help/<cat>/<article>`, `/docs`.
   - Carve-out: `/talk-to-sales`, `/privacy-policy`, `/terms-of-service`, `/refund-policy`.
   - Demo retained: `/foreplay/pages`, `/foreplay/university`, `/foreplay/swipe-file`,
     `/foreplay/industries`, `/foreplay/page/<slug>`.
4. **Negative:** old promoted `/foreplay/bm` etc → 404 (or 301 if phase-07 redirects).
   `_legacy` paths unrouted (`/_legacy-marketing/...` 404).
5. **Link integrity:** crawl/grep — 0 dead `/foreplay/<promoted>` hrefs; 0 imports broken;
   0 references into `_legacy` from active code.
6. **Visual smoke:** `/`, `/bm`, `/help`, `/docs`, a demo page, a legal page — header/footer
   correct per surface (foreplay chrome vs docs shell vs none).
7. **Asset integrity:** spot-check images still load (`/foreplay/*.webp` untouched).

## Exit criteria
All green. Produce migration summary (old→new URL table) in plan dir. Then commit on
`feat/resources-pages` (or dedicated branch) — user confirms before push.

## Rollback
All moves via `git mv`; restructure is one commit. Rollback = `git revert`/reset that
commit. Keep dev server reproducible. No data migrations → low rollback risk.
