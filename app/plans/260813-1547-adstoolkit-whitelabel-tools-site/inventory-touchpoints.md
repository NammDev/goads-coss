# AdsToolkit — GOADS touchpoint inventory (Phase 0)

Total files matching "goads" in `app/src`: **162** — but only ~32 are on surfaces AdsToolkit
renders. The other **~138** (marketing / blog / portal / product pages) are **not routed on the
AdsToolkit domain → left untouched**.

## Surface AdsToolkit actually ships (~32 files)

### A. Shared chrome — `app/src/components/layout/` (12)  → mostly *swap whole component*
- `header.tsx`, `header-product-menu.tsx`, `header-resources-menu.tsx`, `header-tools-menu.tsx`
- `nav-menu-items.tsx`, `nav-banner-3d-logo.tsx`, `nav-progress.tsx`
- `goads-mark.tsx` (the logo mark), `footer/logo-svg.tsx`
- `footer-product-nav.tsx`, `footer/footer-social-and-legal.tsx`, `footer/footer-company-reviews.tsx`

Plan: for AdsToolkit render a new `AdsToolkitHeader` / minimal footer (tools-only nav), chosen by
`brand.key`. GOADS chrome files stay as-is.

### B. Tools pages — `app/src/app/(marketing)/tools/` (8)  → swap "GOADS" copy → brand.name
- `tools/page.tsx` (list), `(panel)/layout.tsx`
- `(panel)/{2fa,bookmark,check-ip,check-uid,split-data}/page.tsx`
- `(panel)/goads-extension/page.tsx` → **GOADS-specific; hide for AdsToolkit** (decision pending)

### C. Bookmarklets — `bookmarklets/` (12)  → the hard part, Phase 2
- Shared: `shared/goads-shell.js`, `shared/goads-shell-css.js`, `shared/goads-icons.js`,
  `shared/goads-fb-session.js`, `shared/goads-totp.js`
- Tools: `goads-bm-{invite,acceptlink,approve,checklive,remove-admins,2fa}.js`
- Build: `build-bookmarklets.mjs`
- Brand baked into payloads: logo panda SVG, `goadsagency.com` (~48 hits), `t.me/goadsagency` (~20).
  Plan: parametrise the 4 shared brand constants + logo, emit two payload sets, registry picks by brand.

## Current GOADS brand values (captured for `brand.ts`)
- name `GOADS` · url `https://goadsagency.com`
- title `GOADS | Agency Ad Accounts & Meta Assets | 24/7 Support`
- telegram `https://t.me/goadsagency` · OG `/og-image.png`
- Source of `SITE_*`: `app/src/app/layout.tsx` (inline consts — Phase 1 points them at `brand`).

## Phase 0 output
- `src/config/brand.ts` — goads (default) + adstoolkit. Not imported yet → **zero runtime impact**.
