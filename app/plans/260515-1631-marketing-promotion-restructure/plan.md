---
name: marketing-promotion-restructure
status: completed
created: 2026-05-15
blockedBy: []
blocks: []
---

# Marketing Site Promotion ("Đại phẫu")

Promote the new redesigned site (currently `app/foreplay/(marketing)/*` at `/foreplay/*`)
to be THE live site at root URLs. Quarantine the old site (current `app/(marketing)/*`
+ old `app/tools/*`) into an unrouted `_legacy` folder. Keep pure Foreplay-demo routes
under `/foreplay/*`.

## Decisions (CONFIRMED — final)
- New "our" pages → **root URLs**; drop `/foreplay` prefix.
- Old site → **deleted from routing into `_legacy`** (kept in repo only).
- `aboutus` slug → **renamed to `/about`** on promote.
- **Cutover = HARD: old URLs return 404. NO 301 redirects.** (sitemap/robots updated only.)
- Legal: `page/{privacy-policy,terms-of-service,refund-policy}` **flattened** to root
  `/privacy-policy`, `/terms-of-service`, `/refund-policy`; `page` route deleted.
- `/talk-to-sales` (absent in new site) → repoint all links to `/book-demo`.
- `share/[token]` (absent in new site) → **port** old route to root `/share/<token>`.
- **Demo-only (stay `/foreplay/*`):** industries, pages, university, swipe-file.
- **Promote to root:** home(→`/`), bm, partners, pricing, about(was aboutus), blog,
  agency-ad-account, google-agency, tiktok-agency, blue-verification, profiles,
  tiktok-accounts, unban, contact, payment, book-demo, community, reviews, tempmail,
  tools, privacy-policy, terms-of-service, refund-policy, share; help(→`/help`);
  docs (already root).
- Old homepage: discarded (legacy). Old `app/tools`: legacy. portal/admin import fallout:
  user will handle separately (accepted risk, do not block on it).

## Critical risks (see phase files)
- R1 `app/tools/` (old) collides with promoted new tools at `/tools` → old → `_legacy`.
- R2 New site has NO `talk-to-sales` and NO `share/[token]`, but code links `/talk-to-sales`
  & `/share/`. Legal IS covered (promoted `page`). Remaining gap = talk-to-sales + share.
- R3 Link rewrite must hit route hrefs only — NOT `/foreplay/*` public assets nor
  `@/components/foreplay` imports.
- R4 Old root `/` replaced by new `home`; hard 404 cutover (no redirects, per user).

## Phases
| # | Phase | Status | Risk |
|---|-------|--------|------|
| 1 | [Pre-flight + decisions](phase-01-preflight-decisions.md) | pending | — |
| 2 | [Legacy quarantine](phase-02-legacy-quarantine.md) | pending | R1 |
| 3 | [Promote new site to root](phase-03-promote-new-site.md) | pending | R4 |
| 4 | [Promote help; keep demo under /foreplay](phase-04-help-and-demo.md) | pending | — |
| 5 | [Internal link + data rewrite](phase-05-link-rewrite.md) | pending | R3 |
| 6 | [Carve-out: legal / sales / share](phase-06-carveout-pages.md) | pending | R2 |
| 7 | [SEO: sitemap, robots, redirects](phase-07-seo-redirects.md) | pending | R4 |
| 8 | [Verification](phase-08-verification.md) | pending | — |

## Key constraints
- DO NOT touch `app/(admin)`, `app/(auth)`, `app/(portal)`, `app/admin`, `app/portal`,
  `app/api`, `app/keystatic` — out of scope (app sections, not marketing).
- Windows + running `next dev` locks dirs on `git mv`; stop dev server before moves.
- Verify after every phase: `npx tsc --noEmit` (0 errors) + key route HTTP 200.

## Unresolved questions
See end of phase-01.
