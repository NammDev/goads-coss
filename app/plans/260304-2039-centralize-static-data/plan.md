---
title: "Centralize ALL static data into src/data/"
description: "Move every hardcoded const/array/object from components and pages into organized, typed src/data/ files"
status: pending
priority: P1
effort: 6h
branch: main
tags: [refactor, data-centralization, DRY, maintainability]
created: 2026-03-04
---

# Centralize Static Data

## Overview

Audit found ~25 component/page files with hardcoded static data. 5 data files already exist in `src/data/`. Goal: extract ALL remaining inline data into organized, typed `src/data/` files (each <200 lines, kebab-case, grouped by page/section).

## Phases

| # | Phase | Status | Effort | Files |
|---|-------|--------|--------|-------|
| 1 | [Navigation & Layout Data](./phase-01-navigation-layout-data.md) | pending | 1h | 5 |
| 2 | [Landing Page Block Data](./phase-02-landing-block-data.md) | pending | 2h | 12 |
| 3 | [Page-Level Data (About, Pricing, Agency, BM)](./phase-03-page-level-data.md) | pending | 1.5h | 6 |
| 4 | [Chart & Widget Data (DRY dedup)](./phase-04-chart-widget-data.md) | pending | 1h | 4 |
| 5 | [README + Cleanup](./phase-05-readme-cleanup.md) | pending | 0.5h | 2 |

## Key Dependencies

- Phase 4 deduplicates chart data shared between `chart-total-sales.tsx` and `sales-growth-card.tsx`
- Phase 1 must complete before Phase 2 (nav data files referenced by multiple blocks)
- Phase 5 runs last (README documents final structure)

## Constraints

- Every new file: <200 lines, kebab-case, TypeScript types exported alongside data
- Organize by page/section, NOT by data type
- DO NOT extract: CSS classes, animation configs, layout constants, icon mappings, component structure
- DO extract: text content, arrays of objects used as content, URLs, pricing data, FAQ data, review data, avatar lists, chart datasets

## New Data Files to Create (15 files)

```
src/data/
  README.md                          # Phase 5
  nav-links.ts                       # Phase 1 (from nav-mega-menu-data + nav-mobile-drawer + site-header)
  nav-mega-menu-products.ts          # Phase 1 (split from nav-mega-menu-data.tsx)
  nav-mega-menu-resources.ts         # Phase 1 (split from nav-mega-menu-data.tsx)
  nav-mega-menu-tools.ts             # Phase 1 (split from nav-mega-menu-data.tsx)
  landing-hero.ts                    # EXISTS - update with hero-section-39 data
  landing-stats.ts                   # EXISTS - no changes
  landing-bento.ts                   # EXISTS - no changes
  landing-bento-19.ts                # Phase 2 (bento-grid-19 block data)
  landing-bento-10.ts                # Phase 2 (bento-grid-10 block data)
  landing-bento-13.ts                # Phase 2 (bento-grid-13 block data)
  landing-cta.ts                     # Phase 2 (CTA section content)
  landing-footer.ts                  # Phase 2 (footer links + social links)
  landing-faq.ts                     # EXISTS - no changes
  landing-reviews-pricing-faq.ts     # EXISTS - no changes
  page-about.ts                      # Phase 3 (about page data)
  page-pricing.ts                    # Phase 3 (pricing page plans + FAQ)
  page-agency-ad-account.ts          # Phase 3 (agency page avatars + reviews + FAQ)
  page-bm.ts                         # Phase 3 (split from bm-page-data.tsx, <200 lines each)
  page-bm-categories.ts              # Phase 3 (bmCategories from bm-page-data.tsx)
  pricing-catalog-products.ts        # Phase 3 (split from pricing-catalog-data.tsx)
  pricing-catalog-upsells.ts         # Phase 3 (split from pricing-catalog-data.tsx)
  chart-shared.ts                    # Phase 4 (deduplicated chart data + configs)
  widget-product-insights.ts         # Phase 4 (product insights chart data)
```

## Files to Delete After Migration

- `src/components/nav-mega-menu-data.tsx` (moved to `src/data/nav-mega-menu-*.ts`)
- `src/app/bm/bm-page-data.tsx` (moved to `src/data/page-bm*.ts`)
- `src/app/pricing/pricing-catalog-data.tsx` (moved to `src/data/pricing-catalog-*.ts`)
