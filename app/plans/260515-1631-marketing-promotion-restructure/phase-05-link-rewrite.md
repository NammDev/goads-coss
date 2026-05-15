# Phase 05 — Internal Link + Data Rewrite

**Priority:** Critical · **Status:** pending · **Risk:** R3 (asset/import false positives)

## Goal
Rewrite route hrefs `/foreplay/<promoted>` → `/<route>` everywhere, WITHOUT touching
public asset paths or component import specifiers.

## Rewrite scope — INCLUDE
- `href="/foreplay/<promoted>"` and template literals in: `Link`, `<a>`, CTA components.
- Nav/footer data: `foreplay-header-resources-menu.tsx`, `foreplay-header*.tsx`,
  `foreplay-footer-links-data.ts`, mobile menus.
- Page-data files `src/data/goads-*-page-data.ts`, `goads-home-content.ts`: `ctaHref`,
  link fields containing `/foreplay/<promoted>`.

## Rewrite scope — EXCLUDE (must NOT change)
- Public assets: `/foreplay/*.png|webp|svg|jpg|css|mp4|woff*` (e.g. `/foreplay/bento1_1.webp`,
  `/foreplay/university_bghero.png`) — these live in `public/foreplay/`, unrelated to routing.
- Import specifiers: `@/components/foreplay/...`, `from "@/components/foreplay"`.
- Demo route links: keep `/foreplay/pages`, `/foreplay/page`, `/foreplay/page/<slug>`,
  `/foreplay/university`, `/foreplay/swipe-file`, `/foreplay/industries`.
- `/foreplay/help` → `/help`; `/foreplay/contact` → `/contact` (promoted).

## Method
1. Build promoted-slug list from decision-sheet.
2. Targeted regex per slug: `(["'`])/foreplay/(bm|pricing|partners|...)(/|\1|\?|#)` → `$1/$2$3`.
   Do NOT use a blanket `/foreplay/` → `/` (would corrupt assets/imports/demo).
3. Exclude file globs: skip `*.css`; for `.ts/.tsx` rely on the slug-list regex (asset paths
   end in extensions / demo slugs not in promote list, so they won't match).
4. Manual review diff for any `/foreplay/` survivors: classify each (asset/import/demo = keep).
5. Special: `/foreplay/page/privacy-policy` etc — DEFER to phase-06 (legal carve-out decides
   whether these become `/privacy-policy` or stay).

## Related files
- High-traffic: `foreplay-header-resources-menu.tsx`, `foreplay-footer-links-data.ts`,
  `goads-*-page-data.ts`, `goads-home-content.ts`, `foreplay-home-cta.tsx`,
  `foreplay-product-page-cta-card.tsx`.

## Success criteria
- Grep `"/foreplay/<promotedSlug>"` across `src/` = 0 (only assets/imports/demo remain).
- All promoted pages’ internal nav resolves at root; click-through smoke test on `/`, `/bm`,
  `/pricing`, `/partners`, `/help`.
- `npx tsc --noEmit` 0; ESLint clean.

## Risks
- Backtick template hrefs (`/foreplay/${slug}`) — audit dynamic link builders manually.
- Sitemap/robots may hardcode `/foreplay/*` → handled phase-07.
