# Phase 4: Chart & Widget Data (DRY Dedup)

## Context Links
- [plan.md](./plan.md)
- Source: `src/components/shadcn-studio/blocks/chart-total-sales.tsx` (lines 16-103)
- Source: `src/components/shadcn-studio/blocks/bento-grid-13/sales-growth-card.tsx` (lines 14-86)
- Source: `src/components/shadcn-studio/blocks/widget-product-insights.tsx` (lines 12-41)
- Source: `src/components/shadcn-studio/blocks/bento-grid-01/features.tsx` (inline data)

## Overview
- **Priority:** P2
- **Status:** pending
- **Key insight:** `chart-total-sales.tsx` and `sales-growth-card.tsx` contain DUPLICATE `chartData` (12 identical time/uv/pv entries) and identical `totalEarningChartConfig`. DRY violation.
- Extract chart data to single shared source, deduplicate

## New Data Files

### 1. `src/data/chart-shared.ts` (~80 lines)

**DEDUP** from `chart-total-sales.tsx` (lines 16-88) AND `sales-growth-card.tsx` (lines 14-86):

```ts
import type { ChartConfig } from '@/components/ui/chart'

export interface ChartDataPoint {
  time: string
  uv: number
  pv: number
}
export const TOTAL_SALES_CHART_DATA: ChartDataPoint[]  // 12 entries

export const TOTAL_SALES_CHART_CONFIG: ChartConfig  // { uv, pv with labels + colors }
```

From `chart-total-sales.tsx` only (lines 90-103):
```ts
export interface StoreSalesData {
  platform: string
  sales: number
  fill: string
}
export const STORE_SALES_DATA: StoreSalesData[]  // Online Store, Offline Store
```

### 2. `src/data/widget-product-insights.ts` (~50 lines)

Extract from `widget-product-insights.tsx` (lines 12-41):
```ts
import type { ChartConfig } from '@/components/ui/chart'

export interface MonthlyChartPoint { month: string; value: number }

export const PRODUCT_REACH_DATA: MonthlyChartPoint[]  // 5 entries
export const PRODUCT_REACH_CONFIG: ChartConfig

export const ORDER_PLACED_DATA: MonthlyChartPoint[]  // 5 entries
export const ORDER_PLACED_CONFIG: ChartConfig
```

### 3. `src/data/landing-features.ts` (~100 lines) -- NEW

Extract from `bento-grid-01/features.tsx` (hardcoded card content):
```ts
export interface FeatureCard {
  title: string
  description: string
  imageUrl?: string
  stat?: string
  comingSoon?: boolean
}
export const FEATURES_CARDS: FeatureCard[]

export interface FrameworkLogo { src: string; alt: string }
export const FRAMEWORK_LOGOS: FrameworkLogo[]  // Next.js, Vite, Tailwind, etc.
```

## Component Files to Modify

| File | Action |
|------|--------|
| `chart-total-sales.tsx` | Remove `chartData`, `totalEarningChartConfig`, `data`; import from `@/data/chart-shared` |
| `bento-grid-13/sales-growth-card.tsx` | Remove `chartData`, `totalEarningChartConfig`; import from `@/data/chart-shared` |
| `widget-product-insights.tsx` | Remove 4 data consts; import from `@/data/widget-product-insights` |
| `bento-grid-01/features.tsx` | Remove inline card data; import from `@/data/landing-features` |

## Implementation Steps

1. Create `src/data/chart-shared.ts` with deduplicated chart data
2. Update `chart-total-sales.tsx` - remove data, import from `@/data/chart-shared`
3. Update `sales-growth-card.tsx` - remove data, import from `@/data/chart-shared`
4. Create `src/data/widget-product-insights.ts`
5. Update `widget-product-insights.tsx`
6. Create `src/data/landing-features.ts`
7. Update `bento-grid-01/features.tsx`
8. Compile check

## Todo List

- [ ] Create `chart-shared.ts` (dedup chart data)
- [ ] Update `chart-total-sales.tsx`
- [ ] Update `sales-growth-card.tsx`
- [ ] Create `widget-product-insights.ts`
- [ ] Update `widget-product-insights.tsx`
- [ ] Create `landing-features.ts`
- [ ] Update `features.tsx`
- [ ] Compile check

## Success Criteria
- Chart duplication eliminated - single source of truth
- 3 new data files, each <200 lines
- Both chart components render identically
- No TypeScript compile errors

## Risk Assessment
- Verify chart data is truly identical between `chart-total-sales.tsx` and `sales-growth-card.tsx` before merging
- `features.tsx` at 345 lines has significant JSX structure mixed with data. Only extract the content strings/URLs, leave JSX layout in component
- ChartConfig type import path must match existing usage
