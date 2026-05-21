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

After the rename, add a `lint:no-foreplay` script that fails CI if `Foreplay` appears in new code:

```json
// package.json
{
  "scripts": {
    "lint:no-foreplay": "! grep -rn 'Foreplay\\|--fp-\\|foreplay' src/ --include='*.ts' --include='*.tsx' --include='*.css' || (echo 'Foreplay reference detected'; exit 1)"
  }
}
```

Add to CI pipeline. Allow specific paths (comments) via grep `--exclude` flags as needed.

## Todo

- [ ] Run all grep verification commands — every one returns expected count (0 or allowed exclusions)
- [ ] Typecheck clean
- [ ] Build clean
- [ ] Lint clean
- [ ] Dev server boots, all routes render
- [ ] Floating widget expands with correct colors
- [ ] No 404s in Network tab on asset requests
- [ ] Add `lint:no-foreplay` CI guard
- [ ] Commit: `chore: add no-foreplay lint guard`
- [ ] Deploy to staging, do same smoke pass with real OG/social previews
- [ ] Add `next.config.js` redirect `/foreplay/:path*` → `/goads/:path*` (30 days, then remove) — see phase-04 risk

## Success criteria

- All grep counts at 0 (or documented exclusions only)
- Build + lint + typecheck all clean
- Visual smoke: all 25 routes render identical to baseline
- Floating widget fully functional
- Zero broken asset URLs in Network tab
- CI guard prevents reintroduction

## Rollback plan

Each phase = one commit. If verify fails:
- Identify failing phase
- `git revert <phase-commit>` (or `git reset --hard <pre-phase>` if not yet pushed)
- Diagnose, retry that phase

If multiple phases pushed and prod broken:
- Revert ALL rename commits as a chain
- Add `next.config.js` redirect from new paths back to old as emergency hotfix while diagnosing

## Unresolved questions

- [ ] **Cal.com event title rename** — `🚀 Foreplay Demo & Action Plan` is still pulled from Cal.com. Coordinate with user to update in Cal.com dashboard separately from this code rename.
- [ ] **Redirect TTL** — how long to keep `/foreplay/:path*` → `/goads/:path*` redirect? Default suggestion: 30 days, then remove.
- [ ] **CI integration** — does the project have CI yet? If yes, where to add `lint:no-foreplay`. If no, skip the CI step (manual discipline only).
