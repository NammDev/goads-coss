# Phase 2: Landing Page Block Data

## Context Links
- [plan.md](./plan.md) | [Phase 1](./phase-01-navigation-layout-data.md)
- Existing: `src/data/landing-hero.ts`, `landing-stats.ts`, `landing-bento.ts`

## Overview
- **Priority:** P1
- **Status:** pending
- Extract hardcoded data from 12 landing page block components
- Create 4 new data files, update 1 existing file

## New/Updated Data Files

### 1. UPDATE `src/data/landing-hero.ts` (~120 lines, currently 64)

Add data from:

**`hero-section-39/hero-section-39.tsx`** (lines 179-182 + inline text):
```ts
export const HERO39_PARTNER_LOGOS: string[]  // ['Rho', 'Deel', 'Framer', ...]
export const HERO39_BADGE_TEXT: string  // "New ... Agency Ad Accounts..."
export const HERO39_PLATFORMS: string[]  // ['Meta', 'Google', 'TikTok', 'Shopify']
export const HERO39_SOCIAL_PROOF = { bmsSold: '3,242+', rating: '4.9' }
```

**`hero-clone/word-rotate.tsx`** (lines 7-12):
```ts
export const WORD_WIDTHS: Record<string, number>
// { Templates: 251, Pages: 136, Kits: 101, Components: 295 }
```

**`hero-section-36/hero-section-36.tsx`** (inline text + URLs):
```ts
export const HERO36_BADGE_TEXT: string
export const HERO36_HEADING: string
export const HERO36_DESCRIPTION: string
export const HERO36_BRAND_LOGOS: { src: string; alt: string; darkSrc?: string }[]
export const HERO36_MARQUEE_LOGOS: { src: string; alt: string; darkSrc?: string }[]
```

**`hero-section-36/card-stack.tsx`** (lines 15-56):
```ts
export interface HeroCard { id: number; img: string; alt?: string }
export const HERO36_INITIAL_CARDS: HeroCard[]
```

### 2. `src/data/landing-bento-19.ts` (~120 lines) -- NEW

Extract from `bento-grid-19/` components:

**`bento-grid-19/bento-grid-19.tsx`** (section header + 7 card descriptors):
```ts
export const BENTO19_SECTION = {
  label: string, heading: string, description: string
}
export interface BentoCardMeta { title: string; description: string }
export const BENTO19_CARDS: BentoCardMeta[]  // 7 items
```

**`bento-grid-19/user-analytics.tsx`** (lines 12-53):
```ts
export interface AnalyticsAvatar {
  src: string; alt: string; fallback: string
  delay: number; startX: number; startY: number
}
export const BENTO19_ANALYTICS_AVATARS: AnalyticsAvatar[]
```

**`bento-grid-19/turn-viewers-to-orders.tsx`** (inline marquee data):
```ts
export interface ViewerItem { name: string; date: string; avatar: string }
export interface PurchaseItem { name: string; price: string; avatar: string }
export const BENTO19_VIEWERS: ViewerItem[]
export const BENTO19_PURCHASES: PurchaseItem[]
```

**`bento-grid-19/enterprise-collaboration.tsx`** (orbiting logos):
```ts
export interface OrbitLogo { src: string; darkSrc: string; alt: string }
export const BENTO19_ORBIT_LOGOS: OrbitLogo[]  // 8 items
```

### 3. `src/data/landing-bento-10.ts` (~100 lines) -- NEW

Extract from `bento-grid-10/bento-grid-10.tsx`:

```ts
export const BENTO10_SECTION = {
  label: string, heading: string, description: string
}

export interface OrbitLogoItem { src: string; darkSrc?: string; alt: string }
export const BENTO10_ORBIT_LOGOS: OrbitLogoItem[]  // React, Vite, Figma, etc.

export interface CommitEntry { date: string; message: string }
export const BENTO10_COMMITS: CommitEntry[]

export const BENTO10_FIGMA_ITEMS: string[]  // ['Authentication', 'Desktop size', 'Payments']

// Card-level text
export interface BentoCardContent { title: string; description: string }
export const BENTO10_CARD_LEFT: BentoCardContent
export const BENTO10_CARD_RIGHT: BentoCardContent
```

### 4. `src/data/landing-bento-13.ts` (~100 lines) -- NEW

Extract from `bento-grid-13/` components:

**`bento-grid-13/bento-grid-13.tsx`** (lines 29-54 + lines 366-464):
```ts
export interface VisitorData {
  product: string; percentage: number; amount: string
  trend: 'up' | 'down'; heightClass: string; color: string
}
export const BENTO13_VISITOR_DATA: VisitorData[]

export interface CustomerPayment {
  name: string; avatar: string; time: string; amount: string
}
export const BENTO13_CUSTOMER_PAYMENTS: CustomerPayment[]
```

**`bento-grid-13/regular-updates-card.tsx`** (lines 30-55):
```ts
export interface NotificationItem {
  id: string; productName: string; productImage: string
  productAlt: string; percentageChange: string
  stats: { label: string; value: string }[]
}
export const BENTO13_NOTIFICATIONS: NotificationItem[]
```

### 5. `src/data/landing-cta.ts` (~30 lines) -- NEW

Extract from `cta-section-05/cta-section-05.tsx`:
```ts
export const CTA_CONTENT = {
  badge: 'Get in touch',
  heading: 'Ready to Scale Your Ads?',
  description: '...',
  primaryButton: { label: string, href: string, icon: string },
  secondaryButton: { label: string, href: string, icon: string }
}
```

## Component Files to Modify (12 files)

| File | Action |
|------|--------|
| `hero-section-39/hero-section-39.tsx` | Remove inline data, import from `@/data/landing-hero` |
| `hero-clone/word-rotate.tsx` | Remove `WORD_WIDTHS`, import from `@/data/landing-hero` |
| `hero-section-36/hero-section-36.tsx` | Remove inline text/URLs, import from `@/data/landing-hero` |
| `hero-section-36/card-stack.tsx` | Remove `initialCards`, import from `@/data/landing-hero` |
| `bento-grid-19/bento-grid-19.tsx` | Remove card text, import from `@/data/landing-bento-19` |
| `bento-grid-19/user-analytics.tsx` | Remove `avatars`, import from `@/data/landing-bento-19` |
| `bento-grid-19/turn-viewers-to-orders.tsx` | Remove inline data, import from `@/data/landing-bento-19` |
| `bento-grid-19/enterprise-collaboration.tsx` | Remove logo URLs, import from `@/data/landing-bento-19` |
| `bento-grid-10/bento-grid-10.tsx` | Remove inline data, import from `@/data/landing-bento-10` |
| `bento-grid-13/bento-grid-13.tsx` | Remove `visitorData` + payment data, import from `@/data/landing-bento-13` |
| `bento-grid-13/regular-updates-card.tsx` | Remove `notificationsList`, import from `@/data/landing-bento-13` |
| `cta-section-05/cta-section-05.tsx` | Remove inline text, import from `@/data/landing-cta` |

## Implementation Steps

1. Update `src/data/landing-hero.ts` with hero-39, hero-36, word-rotate data
2. Update `hero-section-39.tsx`, `hero-section-36.tsx`, `card-stack.tsx`, `word-rotate.tsx` imports
3. Create `src/data/landing-bento-19.ts`
4. Update 4 bento-grid-19 components
5. Create `src/data/landing-bento-10.ts`
6. Update `bento-grid-10.tsx`
7. Create `src/data/landing-bento-13.ts`
8. Update `bento-grid-13.tsx` and `regular-updates-card.tsx`
9. Create `src/data/landing-cta.ts`
10. Update `cta-section-05.tsx`
11. Compile check all modified files

## Todo List

- [ ] Update `landing-hero.ts` (hero-39, hero-36, word-rotate data)
- [ ] Update hero-39, hero-36, card-stack, word-rotate components
- [ ] Create `landing-bento-19.ts`
- [ ] Update 4 bento-grid-19 components
- [ ] Create `landing-bento-10.ts`
- [ ] Update bento-grid-10 component
- [ ] Create `landing-bento-13.ts`
- [ ] Update bento-grid-13 + regular-updates-card components
- [ ] Create `landing-cta.ts`
- [ ] Update cta-section-05 component
- [ ] Compile check

## Success Criteria
- 4 new data files + 1 updated, each <200 lines
- 12 component files updated with clean imports
- No TypeScript compile errors
- Landing page renders identically

## Risk Assessment
- `landing-hero.ts` may exceed 200 lines after adding hero-36 + hero-39 data. If so, split into `landing-hero-36.ts` and `landing-hero-39.ts`
- `bento-grid-10.tsx` at 360 lines needs significant refactoring beyond just data extraction. Consider splitting the component itself (out of scope for this plan, but note it)
- Some bento blocks use inline JSX content (not just string data). Only extract string/object data, leave JSX structure in components
- `blog-hero.tsx` has minimal hardcoded text (label, heading, description) - extract to `landing-hero.ts` or leave as-is since it's only 42 lines
