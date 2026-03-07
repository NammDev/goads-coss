# Phase 3: Page-Level Data (About, Pricing, Agency, BM)

## Context Links
- [plan.md](./plan.md) | [Phase 1](./phase-01-navigation-layout-data.md) | [Phase 2](./phase-02-landing-block-data.md)
- Source: `src/app/about/page.tsx` (lines 12-134)
- Source: `src/app/pricing/page.tsx` (lines 17-150)
- Source: `src/app/pricing/pricing-catalog-data.tsx` (278 lines)
- Source: `src/app/agency-ad-account/page.tsx` (lines 19-161)
- Source: `src/app/bm/bm-page-data.tsx` (269 lines)

## Overview
- **Priority:** P2
- **Status:** pending
- Move page-level data from `app/` route files into `src/data/`
- Split oversized files (pricing-catalog-data at 278 lines, bm-page-data at 269 lines)

## New Data Files

### 1. `src/data/page-about.ts` (~130 lines)

Extract from `src/app/about/page.tsx`:

**`aboutUsData` object** (lines 12-73):
```ts
export interface AboutTab {
  value: string; label: string; content: ReactNode  // Note: JSX content
}
export interface AboutUsData {
  contentTitle: string; contentDescription: string; tabs: AboutTab[]
}
export const ABOUT_US_DATA: AboutUsData
```

**`teamMembers` array** (lines 77-134):
```ts
export interface TeamMember {
  image: string; name: string; role: string; description: string
  socialLinks: { icon: ComponentType; href: string }[]
}
export const TEAM_MEMBERS: TeamMember[]
```

**Note:** `aboutUsData.tabs` contains JSX (React elements). Options:
- Option A: Keep JSX in page file, only extract string fields. Recommended if JSX is complex.
- Option B: Extract as string arrays and render via mapping in page. Preferred for pure text.
- Decision: Use Option A for tabs (they contain `<p>`, `<ul>` elements). Extract `contentTitle`, `contentDescription`, and `teamMembers` only.

### 2. `src/data/page-pricing.ts` (~140 lines)

Extract from `src/app/pricing/page.tsx`:

**`plans` array** (lines 17-67):
```ts
// Reuse PricingPlan type from landing-reviews-pricing-faq.ts
// or define page-specific type if structure differs
export interface PricingPagePlan {
  name: string; price: string; period: string
  description: string; buttonText: string
  isPopular?: boolean; features: string[]
}
export const PRICING_PAGE_PLANS: PricingPagePlan[]
```

**`faqTabsData` array** (lines 71-150):
```ts
// Import FAQTab type from landing-faq.ts (reuse)
import type { FAQTab } from './landing-faq'
export const PRICING_FAQ_TABS: FAQTab[]
```

### 3. `src/data/pricing-catalog-products.ts` (~150 lines)

Extract from `src/app/pricing/pricing-catalog-data.tsx` (lines 1-200 approx):
```ts
export interface PricingProduct {
  name: string; price: number; originalPrice?: number
  badge?: string; features: string[]
}
export interface ProductCategory {
  id: string; label: string; icon: ComponentType
  products: PricingProduct[]
}

export const AGENCY_ACCOUNTS_CATEGORY: ProductCategory
export const BUSINESS_MANAGERS_CATEGORY: ProductCategory
export const FACEBOOK_PAGES_CATEGORY: ProductCategory
export const FACEBOOK_PROFILES_CATEGORY: ProductCategory
```

### 4. `src/data/pricing-catalog-upsells.ts` (~100 lines)

Extract from `src/app/pricing/pricing-catalog-data.tsx` (remaining lines):
```ts
export const GOOGLE_ADS_CATEGORY: ProductCategory
export const TIKTOK_ADS_CATEGORY: ProductCategory

export interface PricingUpsell {
  title: string; description: string; price: string; icon: ComponentType
}
export const PRICING_UPSELLS: PricingUpsell[]

// Convenience: all categories array
export const PRICING_CATEGORIES: ProductCategory[]
```

### 5. `src/data/page-agency-ad-account.ts` (~130 lines)

Extract from `src/app/agency-ad-account/page.tsx`:

**`avatars`** (lines 19-40):
```ts
export const AGENCY_AVATARS: { src: string; fallback: string; name: string }[]
```

**`reviews`** (lines 44-78):
```ts
import type { ReviewCard } from '@/components/shadcn-studio/blocks/testimonials-component-22/review-stack'
export const AGENCY_REVIEWS: ReviewCard[]
```

**`faqTabsData`** (lines 82-161):
```ts
import type { FAQTab } from './landing-faq'
export const AGENCY_FAQ_TABS: FAQTab[]
```

### 6. `src/data/page-bm.ts` (~130 lines)

Extract from `src/app/bm/bm-page-data.tsx` (269 lines - split):

```ts
export const BM_AVATARS: { src: string; fallback: string; name: string }[]
export const BM_REVIEWS: ReviewCard[]
export const BM_FAQ_TABS: FAQTab[]
export const BM_UPSELLS: PricingUpsell[]
```

### 7. `src/data/page-bm-categories.ts` (~130 lines)

Extract from `src/app/bm/bm-page-data.tsx`:
```ts
export const BM_CATEGORIES: ProductCategory[]  // bmCategories array
```

## Component/Page Files to Modify

| File | Action |
|------|--------|
| `src/app/about/page.tsx` | Remove data (lines 12-134), import from `@/data/page-about` |
| `src/app/pricing/page.tsx` | Remove data (lines 17-150), import from `@/data/page-pricing` |
| `src/app/pricing/pricing-catalog-data.tsx` | DELETE - moved to `src/data/pricing-catalog-*` |
| `src/app/pricing/` (any file importing pricing-catalog-data) | Update imports to `@/data/pricing-catalog-*` |
| `src/app/agency-ad-account/page.tsx` | Remove data (lines 19-161), import from `@/data/page-agency-ad-account` |
| `src/app/bm/bm-page-data.tsx` | DELETE - moved to `src/data/page-bm*` |
| `src/app/bm/page.tsx` | Update imports from `./bm-page-data` to `@/data/page-bm*` |

## Implementation Steps

1. Create `src/data/page-about.ts` - extract `teamMembers` + string fields from `aboutUsData`
2. Update `src/app/about/page.tsx` - keep tab JSX content inline, import extracted data
3. Create `src/data/page-pricing.ts` - extract plans + FAQ
4. Update `src/app/pricing/page.tsx`
5. Create `src/data/pricing-catalog-products.ts` + `pricing-catalog-upsells.ts`
6. Update all pricing page imports, delete `pricing-catalog-data.tsx`
7. Create `src/data/page-agency-ad-account.ts`
8. Update `src/app/agency-ad-account/page.tsx`
9. Create `src/data/page-bm.ts` + `page-bm-categories.ts`
10. Update `src/app/bm/page.tsx`, delete `bm-page-data.tsx`
11. Compile check all modified files

## Todo List

- [ ] Create `page-about.ts`
- [ ] Update `about/page.tsx`
- [ ] Create `page-pricing.ts`
- [ ] Update `pricing/page.tsx`
- [ ] Create `pricing-catalog-products.ts` + `pricing-catalog-upsells.ts`
- [ ] Update pricing imports, delete old file
- [ ] Create `page-agency-ad-account.ts`
- [ ] Update `agency-ad-account/page.tsx`
- [ ] Create `page-bm.ts` + `page-bm-categories.ts`
- [ ] Update `bm/page.tsx`, delete old file
- [ ] Compile check

## Success Criteria
- 7 new data files, each <200 lines
- 2 old data files deleted (`pricing-catalog-data.tsx`, `bm-page-data.tsx`)
- All page routes render identically
- No TypeScript compile errors

## Risk Assessment
- `aboutUsData.tabs` contains JSX - cannot fully extract to plain data file. Keep tab JSX content in `about/page.tsx`, extract only `contentTitle`, `contentDescription`, `teamMembers`
- FAQTab type reuse: `landing-faq.ts` exports `FAQTab` type. Pricing and agency pages define similar but possibly different FAQ structures - verify type compatibility before reusing
- `pricing-catalog-data.tsx` may be imported by multiple files in `src/app/pricing/` - check all imports before deleting
