# Plan: Content for `/foreplay/bm` route

**Date**: 2026-04-11
**Constraint**: 100% preserve UI / HTML / CSS / logos / SVGs / images. Only text content may change. Pricing table: reorder to put Business Manager category on top.

## Scope (Text-Only Swaps)

The page at `app/src/app/foreplay/bm/page.tsx` is currently a raw clone of `/foreplay/profiles` importing shared data from `goads-profiles-page-data.ts`. We must NOT edit that shared file (would break profiles page). Instead:

1. Create `app/src/data/goads-bm-page-data.ts` — BM-focused content for all 6 slots:
   - `bmHero` — overline, title, description, CTA (same asset paths)
   - `bmFeatureGrid1` — subtitle, title, description, 6 card titles/descs (same `bento1_*.webp` images)
   - `bmFeatureGrid1Testimonial` — quote/authorName/authorRole (same images/decorations)
   - `bmFeatureGrid2` — 6 resource card titles/descs (same `bento2_*.webp` images)
   - `bmFeatureGrid2Testimonial` — quote/authorName/authorRole (same images/decorations)
   - `bmFaq` — title, description, 10 Q/A items focused on BM product

2. Update `app/src/app/foreplay/bm/page.tsx`:
   - Swap imports `goads-profiles-page-data` → `goads-bm-page-data`
   - Inline reorder `catalogCategories` so **Business Manager** is first (slice + spread)
   - Keep all JSX / component composition / className / section order IDENTICAL

## Content Copy Direction (BM Focus)

**Hero**
- Overline: "Business Managers"
- Title: "Buy Verified Meta Business Managers"
- Description: Trust-signal copy emphasizing verified status, DSL tiers, WhatsApp API add-on

**Feature Grid 1 (All Products)** — keep 6 cards, reorder so BM card is card 1 (other 5 stay similar order). Same images.

**Testimonial 1** — adapt quote to BM pain (ad account disabled, BM banned, wasted spend)

**Feature Grid 2 (Resources)** — 6 blog titles pivoted to BM topics:
  1. BM1 vs BM3 vs BM5 — which do I need?
  2. Unlimited DSL vs $250 DSL — how to choose
  3. How to add ad accounts to a verified BM
  4. BM10 / BM50 / BM100 — enterprise scaling guide
  5. WhatsApp Business API setup in BM
  6. Why verified BMs survive 10× longer than unverified

**Testimonial 2** — adapt to BM bulk-purchase story (scaled from BM3 → BM5 → BM10)

**FAQ** — 10 BM-specific Q/A (verified vs unverified, DSL limits, warranty, recovery, replacement, daily spend caps, etc.)

## Table Reorder (Single Change)

In `bm/page.tsx`:
```ts
const bmFirstCategories = [
  catalogCategories.find(c => c.name === "Business Manager")!,
  ...catalogCategories.filter(c => c.name !== "Business Manager"),
]
```
Pass `bmFirstCategories` to `ForeplayPricingComparison`. `defaultExpanded={[0]}` already points to first item → BM row opens by default. No changes to pricing table component or data file.

## Files Touched

| File | Action |
|---|---|
| `app/src/data/goads-bm-page-data.ts` | **CREATE** (~200 lines) |
| `app/src/app/foreplay/bm/page.tsx` | **EDIT** (swap imports + reorder table) |

Files NOT touched (constraint):
- All component files under `app/src/components/foreplay/*`
- `goads-profiles-page-data.ts`
- `goads-product-catalog-table-data.ts`
- Any CSS, SVG, image, or layout file

## Acceptance Criteria

- [ ] `/foreplay/bm` renders with BM-focused copy throughout
- [ ] Pricing table shows Business Manager category first, expanded by default
- [ ] All images / videos / SVGs / layout / className identical to `/foreplay/profiles`
- [ ] `/foreplay/profiles` unchanged (no shared-data regression)
- [ ] TypeScript passes (`pnpm tsc --noEmit`)

## Out of Scope

- No component refactor
- No new routes or assets
- No change to `/foreplay/tiktok-accounts` (separate task)
- No layout / spacing / color / font change
