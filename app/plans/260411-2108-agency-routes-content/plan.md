# Plan: Content for 3 Agency Routes

**Date**: 2026-04-11
**Constraint**: 100% preserve UI / HTML / CSS / images / videos / SVGs / icons. Only TEXT changes.

## Targets

| Route | Product Focus |
|---|---|
| `/foreplay/agency-ad-account` | Facebook Agency Ad Accounts (Meta via agency partnership) |
| `/foreplay/google-agency` | Google Ads via Agency (whitelisted accounts) |
| `/foreplay/tiktok-agency` | TikTok Ads via Agency |

All 3 pages are currently 100% clones of `/foreplay/swipe-file` importing from shared `foreplay-swipe-file-page-data.ts` (read-only for us — must NOT modify).

## Strategy

Create 3 new data files (one per route) with the SAME shape as `foreplay-swipe-file-page-data.ts` but agency-focused copy. Keep all asset paths (images, videos, SVG decorations) identical. Each data file is self-contained — no re-exports from shared file.

Then swap `import from "@/data/foreplay-swipe-file-page-data"` → agency-specific file in each page.tsx.

## Data Shape (11 exports each)

Each new file exports:
1. `Hero` — overline, title, description (same video/icon assets)
2. `Solution` — before/after copy
3. `UseCases` — 3 use case cards (same image)
4. `CoreFeaturesSection` — section head text
5. `CoreFeatureTabs` — 3 tab labels (SaveIcon, TagIcon, ShareIcon stay)
6. `FeatureGrid1` — 6 card titles/descs (same bento1 images)
7. `Testimonial1` — Stefan-style quote, adapted
8. `FeatureGrid2` — 6 card titles/descs (same bento2 images)
9. `Testimonial2` — Ryan-style quote, adapted
10. `ProductCta` — title, description (same video/icon)
11. `Faq` — subtitle, title, description, 10 Q/A items

## Content Direction Per Route

### `/foreplay/agency-ad-account` — Facebook Agency
- Hero: "Facebook Agency Ad Accounts" / "Unlimited spend, whitelist status, zero disable risk"
- Solution: Before (burned BMs, disabled accounts) → After (agency partnership, unlimited spend)
- Use Cases: Scale DTC, Bypass policy, Enterprise agencies
- Core Features: High trust score, instant top-up, dedicated rep, daily spend uncapped
- FAQ: Pricing model, % fee, onboarding, payment methods, replacements

### `/foreplay/google-agency` — Google Ads Agency
- Hero: "Google Ads Agency Accounts" / "Whitelisted, MCC-managed, risk-free scaling"
- Solution: Before (Google suspensions, manual appeals) → After (managed agency, whitelisted industries)
- Use Cases: Affiliate/gambling/crypto industries, e-commerce scaling, white-label agencies
- Core Features: Whitelist status, MCC access, $100K+ daily spend, Google rep support
- FAQ: Accepted industries, setup timeline, MCC structure, compliance review, billing

### `/foreplay/tiktok-agency` — TikTok Agency
- Hero: "TikTok Ads Agency Accounts" / "Direct TikTok partner, full catalog access"
- Solution: Before (Shop rejections, ad disapprovals) → After (TikTok-partnered agency, direct review)
- Use Cases: Shop Ads, Spark Ads, GMV scaling
- Core Features: Partner status, direct TikTok rep, Shop Ads unlocked, higher CPM caps
- FAQ: Onboarding, TikTok Shop integration, regions supported, billing, rep availability

## Files Touched

| File | Action |
|---|---|
| `app/src/data/goads-agency-ad-account-page-data.ts` | **CREATE** (~170 LOC) |
| `app/src/data/goads-google-agency-page-data.ts` | **CREATE** (~170 LOC) |
| `app/src/data/goads-tiktok-agency-page-data.ts` | **CREATE** (~170 LOC) |
| `app/src/app/foreplay/agency-ad-account/page.tsx` | **EDIT** (swap imports) |
| `app/src/app/foreplay/google-agency/page.tsx` | **EDIT** (swap imports) |
| `app/src/app/foreplay/tiktok-agency/page.tsx` | **EDIT** (swap imports) |

## NOT touched

- `foreplay-swipe-file-page-data.ts` (shared — `/swipe-file` route depends on it)
- All components under `app/src/components/foreplay/*`
- `tab-icons.tsx` (SaveIcon / TagIcon / ShareIcon stay)
- All CSS, SVG, image, video, layout files

## Acceptance Criteria

- [ ] Each route renders with its own agency-specific copy
- [ ] Assets, icons, JSX, classNames, section order 100% identical to `/foreplay/swipe-file`
- [ ] `/foreplay/swipe-file` still works (no shared-data regression)
- [ ] `pnpm tsc --noEmit` passes

## Out of Scope

- No component refactor
- No new assets
- No new routes
- Pricing table / catalog — these pages don't use ForeplayPricingComparison (unlike /bm, /tiktok-accounts)
