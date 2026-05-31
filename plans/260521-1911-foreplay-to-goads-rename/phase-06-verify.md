# Phase 06 — Verify

**Status:** TODO
**Priority:** Definition of done — nothing ships without this gate

## Overview

End-to-end verification that the rename is complete and the app still works identically. Run after every preceding phase commit, plus a final full pass at the end.

## Verification checklist

### Mechanical (zero-leftover grep)

```bash
# Code identifiers
grep -rn "\bForeplay[A-Z]" app/src/                       # → 0 hits expected
grep -rn "\bfpText\b" app/src/                            # → 0 hits
grep -rn "\bFP_HERO_GRADIENT\b" app/src/                  # → 0 hits

# CSS tokens + scope
grep -rn "\-\-fp\-" app/src/                              # → 0 hits
grep -rn '"foreplay"' app/src/                            # → 0 hits in className context

# File names
git ls-files | grep "foreplay"                            # → 0 hits (or only docs/foreplay/ if kept per phase-01)

# Public assets
grep -rn "/foreplay/" app/src/ app/public/                # → 0 hits
ls app/public/foreplay/ 2>&1                              # → "No such file or directory"

# User-facing strings (deliberate exclusions OK — review hits manually)
grep -rn "Foreplay" app/src/                              # → only comments, font names allowed
```

### Build + types

```bash
cd app
npx tsc --noEmit                                          # clean
npm run build                                             # clean, no warnings about missing imports
npm run lint                                              # clean
```

### Dev server visual smoke

Boot dev server and walk every route — focus on visual diff vs pre-rename:

- [ ] `/` (home) — hero, product showcases, chrome extension banner, features grid, CTA
- [ ] `/pricing` — cards, comparison table, footer
- [ ] `/agency-ad-account` — product hero, feature tabs, use case carousel
- [ ] `/bm` — same as above
- [ ] `/profiles` — same
- [ ] `/pages` — same
- [ ] `/tiktok-accounts` — same
- [ ] `/blue-verification` — hero, feature rows, CTAs
- [ ] `/unban` — same
- [ ] `/book-demo` — hero, Cal.com embed, social proof, reviews
- [ ] `/free-action-plan` — placeholder div renders
- [ ] `/contact` — channels grid
- [ ] `/about` — team section
- [ ] `/community` — telegram CTA placeholder
- [ ] `/blog` + `/blog/[slug]` — listing + detail
- [ ] `/reviews` — masonry grid
- [ ] `/tools` + sub-routes — tool panels
- [ ] `/tempmail` — viewer
- [ ] `/payment` — payment methods
- [ ] `/partners` — partner logos
- [ ] `/privacy-policy`, `/terms-of-service`, `/refund-policy` — legal content

### Floating widget

- [ ] Calendar popup chip visible bottom-left on every route
- [ ] Click chip → expands action plan card with correct colors (not blank — confirms `--goads-*` tokens resolve)
- [ ] Founder avatar loads (`/goads/solutions_test1_avt.webp`)
- [ ] All 5 date pills render
- [ ] "Book a Call" navigates to `/book-demo`
- [ ] "Start Free Trial" navigates to `/sign-up`

### Layouts

- [ ] Marketing routes still use `.goads` scope class (renamed from `.foreplay`)
- [ ] Header dropdowns still themed correctly
- [ ] Footer product nav loads with new asset paths
- [ ] Mobile nav drawer opens

### Asset loads (Network tab spot-check)

- [ ] No 404s for `*.webp` / `*.svg` / `*.png` under `/foreplay/...`
- [ ] All requests go to `/goads/...`
- [ ] OG image loads (root metadata)

### External integrations (paranoid pass)

- [ ] Cal.com embed still renders on `/book-demo`
- [ ] Clerk auth still works (`/sign-in`, `/sign-up`)
- [ ] Stripe / payment flows unaffected
- [ ] Vercel Analytics, Speed Insights still report (verify in dashboard post-deploy)

## Regression guards

**Not applicable** — repo has no CI (`.github/workflows/` does not exist) and the app is not yet exposed to real users (production traffic still on the separate `goads.shop` site). Skip the `lint:no-foreplay` CI guard. Rely on manual grep verification during this rename and developer discipline thereafter.

## Todo

- [ ] Run all grep verification commands — every one returns expected count (0 or allowed exclusions)
- [ ] Typecheck clean
- [ ] Build clean
- [ ] Lint clean
- [ ] Dev server boots, all routes render
- [ ] Floating widget expands with correct colors
- [ ] No 404s in Network tab on asset requests
- [ ] Push to `main` → Vercel auto-deploys → smoke test the deployed URL

## Success criteria

- All grep counts at 0 (or documented exclusions only)
- Build + lint + typecheck all clean
- Visual smoke: all 25 routes render identical to baseline
- Floating widget fully functional
- Zero broken asset URLs in Network tab

## Rollback plan

Each phase = one commit. If verify fails:
- Identify failing phase
- `git revert <phase-commit>` (or `git reset --hard <pre-phase>` if not yet pushed)
- Diagnose, retry that phase

No production user impact concerns — the live `goads.shop` site is a separate codebase. Rollback is purely a dev-experience concern, not an incident response.

## Unresolved questions

_None._ All previously open items resolved:
- Cal.com event title — handled by user directly in Cal.com dashboard.
- Redirect `/foreplay/:path*` → `/goads/:path*` — **not needed**; app not yet exposed to real users (no SEO, no social cache, no backlinks to protect).
- CI integration — **not applicable**; repo has no CI configured.
