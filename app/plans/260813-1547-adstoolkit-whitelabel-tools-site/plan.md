# AdsToolkit — white-label tools-only site

**Goal:** a brand-new, neutral tools website ("AdsToolkit") containing all tools + tempmail,
with **zero GOADS branding** (logo, `goadsagency.com`, `t.me/goadsagency`) anywhere — including
**inside the bookmarklet modals**. Built as a **white-label of the same repo**, deployed to a
separate domain, so tool fixes ship to both sites from one codebase.

- Brand name: **AdsToolkit** (neutral, Meta-ads-tools themed; not goads, not uproas)
- Scope: `/tools*` (2FA, bookmark library, check-ip, check-uid, split-data, …) + `/tempmail`
- Approach: **white-label, one repo, two brands** via `NEXT_PUBLIC_BRAND` + `src/config/brand.ts`
- Owner: uproas (internal); public brand is neutral AdsToolkit

## Why white-label (not copy/fork)
Branding is spread across ~162 files + ~48 `goadsagency.com` + ~20 telegram/logo spots inside
`bookmarklets/`. A fork means hunting all of them and re-doing every future tool fix twice.
White-label gathers brand into **one config**; the neutral brand sets logo/socials/domain to
AdsToolkit values, and the AdsToolkit **domain serves only tools+tempmail** (middleware) so the
~162 marketing files are never touched or shipped.

## Phases

### Phase 0 — Inventory + brand config  *(status: DONE)*
- `git grep -in "goads\|goadsagency\|t\.me/goads"` over `app/src` chrome/tools + `bookmarklets/`;
  list the touchpoints that AdsToolkit actually renders (chrome + tools + tempmail + bookmarklets).
- `src/config/brand.ts`: `{ key, name, domain, logo, telegram, socials, metadata }`.
  Default `goads` = today's values. `adstoolkit` = neutral (new logo/wordmark, empty socials,
  adstoolkit domain, no telegram).
- Resolve active brand from `NEXT_PUBLIC_BRAND` (build-time) — fallback `goads`.

### Phase 1 — Brand-aware chrome  *(DONE)*
- Header, footer, logo (`goads-mark`, `footer/logo-svg`, `nav-banner-3d-logo`, `logo-link`),
  metadata/OG → read from `brand.ts`. AdsToolkit: new wordmark/logo, tools-only nav, no GOADS strings.
- Tools pages: swap any hardcoded "GOADS" copy for the brand name. Hide/neutralise the
  `tools/goads-extension` page for AdsToolkit (GOADS-specific).

### Phase 2 — Bookmarklet white-label  *(DONE)*  ← the hard part
- Parametrise `bookmarklets/shared/` — `BRAND_HOST`, `TELEGRAM_URL`, `WEBSITE_URL`, `LOGO_SVG`
  (the panda) → read from a brand map, not hardcoded.
- `build-bookmarklets.mjs`: emit **two payload sets** (goads + adstoolkit). AdsToolkit payloads:
  new logo/wordmark, **no** `t.me/goadsagency`, **no** `goadsagency.com`.
- `data/bookmarklets/index.ts` registry: pick payload set by active brand.

### Phase 3 — Route scoping + de-GOADS tools copy  *(DONE)*
- `middleware.ts`: `brand.toolsOnly` gate → on the AdsToolkit build, non-tools routes (and
  `/tools/goads-extension`) redirect to `/tools`; home → `/tools`. No-op on GOADS.
- Tools copy brand-aware: `tools/page.tsx` (bookmark + extension names, marketing CTA hidden on
  toolsOnly), `bookmark/page.tsx` + 5 panel pages (`| ${brand.name} Tools`), registry descriptions
  (`${brand.name}-built`), `extension.tsx` (name, zip `/downloads/${brand.name}-Extension.zip`,
  "Built by ${brand.name}", install steps). Extension is SHOWN on AdsToolkit, rebranded neutral.
- Residual: route slug stays `/tools/goads-extension` (renaming would change the GOADS URL); the
  neutral extension zip `/downloads/AdsToolkit-Extension.zip` must be provided for the download to work.
- Residual (not user-visible): `"goads:bookmark-nav"` event name, tool root element ids `goads-bk`.
- **tempmail backend**: `api/tempmail` proxies to `TEMP_MAIL_WORKER_ORIGIN` (fallback
  `mail-api.goadsagency.com`). The AdsToolkit deploy MUST set `TEMP_MAIL_WORKER_ORIGIN` to its own
  mail worker so tempmail doesn't hit GOADS infra.

### Phase 4 — Deploy + verify  *(pending)*
- Second deploy (Vercel project / domain) with `NEXT_PUBLIC_BRAND=adstoolkit`; goads deploy unchanged.
- `next build` green for both brands; visual pass on tools + a bookmarklet modal (no GOADS traces).

## Open dependencies (need from user)
1. **Domain** for AdsToolkit (site + tempmail must live there).
2. **Logo/wordmark** for AdsToolkit — or approve a simple text wordmark for now.
3. tempmail backend: is `/tempmail` a static page or does it call a GOADS API? (affects Phase 3).
4. `tools/goads-extension`: hide for AdsToolkit, or ship a neutral extension page?

## Success criteria
- AdsToolkit domain shows all tools + tempmail, zero GOADS logo/`goadsagency.com`/`t.me/goadsagency`
  on pages **and inside every bookmarklet modal**.
- GOADS site unchanged. One codebase; a tool fix ships to both with one build.
