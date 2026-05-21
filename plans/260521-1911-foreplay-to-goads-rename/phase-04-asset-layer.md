# Phase 04 — Asset Layer

**Status:** TODO
**Priority:** Highest external-break risk — references in CMS/DB/social previews may exist
**Estimated files touched:** ~155 (folder rename + 591 src ref updates across 154 files)

## Overview

Rename `app/public/foreplay/` → `app/public/goads/` and update every `src="/foreplay/..."` reference. The folder also has a nested `/foreplay/goads/` subdir (legacy partial rename) — flatten that into the new structure.

## Folder structure changes

### Before
```
app/public/foreplay/
  ├── BM.svg
  ├── PAGES.svg
  ├── PROFILES.svg
  ├── META.svg
  ├── TIKTOK.svg
  ├── goads/                      ← nested partial rename — flatten upward
  │   ├── goads-meta-assets.webp
  │   ├── goads-unban-extension.webp
  │   ├── goads-verified-services.webp
  │   ├── goads-agency-ad-account.webp
  │   ├── goads-all-tools.webp
  │   ├── goads-extension-launcher.webp
  │   ├── goads-service-support.webp
  │   ├── goads-service-replacements.webp
  │   ├── goads-blue-verification-badge.webp
  │   ├── goads-blue-verification-multiplatform.webp
  │   ├── goads-unban-enterprise.webp
  │   └── goads-unban-recovery.webp
  ├── logo/goads-mark.png
  ├── solutions_test1_avt.webp   ← founder avatars
  ├── solutions_test2_avt.webp
  └── ... (~50 other Foreplay-era assets — sprite sheets, screenshots, etc.)
```

### After
```
app/public/goads/
  ├── BM.svg
  ├── PAGES.svg
  ├── PROFILES.svg
  ├── META.svg
  ├── TIKTOK.svg
  ├── goads-meta-assets.webp       ← flattened from /goads/
  ├── goads-unban-extension.webp
  ├── ... (all assets formerly in nested /goads/ subdir)
  ├── logo/goads-mark.png
  ├── solutions_test1_avt.webp
  └── ... (all other assets)
```

**Rationale for flatten:** `/public/foreplay/goads/goads-meta-assets.webp` was a transitional path; once the parent rename completes, `/goads/goads-meta-assets.webp` reads awkwardly. Flattening gives clean `/goads/meta-assets.webp` URLs (also strip the redundant `goads-` filename prefix in the same operation — see below).

## Filename prefix cleanup (optional but recommended)

Files inside the new `/goads/` folder that have a redundant `goads-` prefix should drop it:

| Before (after folder rename) | After (prefix stripped) |
|------------------------------|------------------------|
| `/goads/goads-meta-assets.webp` | `/goads/meta-assets.webp` |
| `/goads/goads-unban-extension.webp` | `/goads/unban-extension.webp` |
| `/goads/goads-verified-services.webp` | `/goads/verified-services.webp` |
| `/goads/goads-agency-ad-account.webp` | `/goads/agency-ad-account.webp` |
| `/goads/goads-all-tools.webp` | `/goads/all-tools.webp` |
| `/goads/goads-extension-launcher.webp` | `/goads/extension-launcher.webp` |
| ... (~12 total) | ... |

**If this is too risky** (cms refs, external URLs), skip the prefix cleanup and just rename the parent folder. Decide in phase 01.

## Src ref updates (591 hits across 154 files)

Mechanical pattern per consumer file:
- `src="/foreplay/BM.svg"` → `src="/goads/BM.svg"`
- `src="/foreplay/goads/goads-meta-assets.webp"` → `src="/goads/meta-assets.webp"` (with flatten + prefix-strip)
- `iconSrc: "/foreplay/PROFILES.svg"` → `iconSrc: "/goads/PROFILES.svg"`
- `avatarSrc: "/foreplay/solutions_test1_avt.webp"` → `avatarSrc: "/goads/solutions_test1_avt.webp"`
- Background images in inline styles: `style={{ backgroundImage: 'url(/foreplay/...)' }}`
- Open Graph metadata: `images: [{ url: "/foreplay/og-...png" }]`

### Files with the highest hit counts (worth eyeballing)

- `app/src/data/goads-bm-page-data.ts` — 22 hits
- `app/src/data/goads-google-agency-page-data.ts` — 31 hits
- `app/src/data/goads-tiktok-agency-page-data.ts` — 31 hits
- `app/src/data/foreplay-swipe-file-page-data.ts` — 31 hits
- `app/src/data/foreplay-ecommerce-solution-page-data.ts` — 24 hits
- `app/src/data/goads-profiles-page-data.ts` — 18 hits
- `app/src/data/goads-tiktok-accounts-page-data.ts` — 9 hits
- `app/src/data/goads-blue-verification-page-data.ts` — 3 hits

## Execution

```bash
# Step 1 — flatten nested goads/ subdir up into parent /foreplay/ (still under old name)
mv app/public/foreplay/goads/* app/public/foreplay/
rmdir app/public/foreplay/goads

# Step 2 — strip redundant goads- prefix from flattened files (only if user approves prefix cleanup)
cd app/public/foreplay
for f in goads-*.webp goads-*.png goads-*.svg; do
  [ -e "$f" ] && git mv "$f" "${f#goads-}"
done
cd -

# Step 3 — rename parent folder
git mv app/public/foreplay app/public/goads

# Step 4 — mass replace src refs (mind the order: flatten + prefix-strip BEFORE folder rename)
# After all 3 path patterns:
git ls-files 'app/src/**/*.{ts,tsx,css,mdoc}' | xargs sed -i 's|/foreplay/goads/goads-|/goads/|g'   # flatten + prefix strip
git ls-files 'app/src/**/*.{ts,tsx,css,mdoc}' | xargs sed -i 's|/foreplay/|/goads/|g'              # parent rename

# Step 5 — verify
grep -rn "/foreplay/" app/src/ app/public/
grep -rn "/foreplay/" app/src/content/   # markdoc files
```

## Files to read for context

- `app/src/data/` — most asset refs live here (page-data files)
- `app/src/components/goads/` (post-phase-03) — atoms with hardcoded asset paths (logos, sprites)
- `app/src/content/docs/` — markdoc content may reference assets
- `app/src/app/layout.tsx` — OG image metadata path

## Todo

- [ ] Decision: flatten + prefix-strip OR just folder rename? (set in phase 01)
- [ ] Flatten nested `/foreplay/goads/` subdir (if approved)
- [ ] Strip `goads-` filename prefix (if approved)
- [ ] git mv `app/public/foreplay/` → `app/public/goads/`
- [ ] Sed replace `/foreplay/goads/goads-` → `/goads/`
- [ ] Sed replace `/foreplay/` → `/goads/`
- [ ] Grep verify zero `/foreplay/` hits in `app/src/` and `app/public/`
- [ ] Dev server boot — visual smoke: home, pricing, product pages render with images (no broken thumbnails)
- [ ] Commit: `refactor(assets): rename /public/foreplay/ → /public/goads/ + update 591 src refs`

## Success criteria

- All images load on home, pricing, agency-ad-account, profiles, pages, tiktok-accounts pages
- Calendar popup founder avatar loads (`/goads/solutions_test1_avt.webp`)
- `grep -rn "/foreplay/" app/` → 0 hits (excluding deliberate `docs/foreplay/` if kept per phase 01)

## Risks

- **External references break silently:**
  - Social previews (Open Graph cards) cached on Facebook/Twitter
  - Email templates with hardcoded `https://goads.shop/foreplay/...` URLs
  - DB rows / CMS entries pointing to old paths
  - Sitemap entries
  - Mitigation: add temporary `next.config.js` redirect `/foreplay/:path*` → `/goads/:path*` for 30 days
- **Markdoc / MDX content** — `app/src/content/docs/` files reference images; sed sweep MUST include them
- **Hardcoded URLs in tests / Cypress** — sweep includes test files
- **Case-sensitive filesystems** — Linux production may differ from Windows dev case; standardize on lowercase
- **Asset filenames with `Foreplay` substring** (e.g. screenshot filenames) — separate concern, address case-by-case

## Next

→ phase-05-copy-and-cleanup.md
