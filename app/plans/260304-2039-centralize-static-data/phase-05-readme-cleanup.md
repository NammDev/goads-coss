# Phase 5: README + Cleanup

## Context Links
- [plan.md](./plan.md) | Phases [1](./phase-01-navigation-layout-data.md) [2](./phase-02-landing-block-data.md) [3](./phase-03-page-level-data.md) [4](./phase-04-chart-widget-data.md)

## Overview
- **Priority:** P3
- **Status:** pending
- Create `src/data/README.md` documenting the data directory structure
- Final cleanup: verify no orphan imports, no remaining inline data

## Files to Create

### `src/data/README.md`

```markdown
# src/data/ - Static Data Registry

All static content data (text, arrays, objects) lives here.
Components import from these files - never hardcode content inline.

## Naming Convention

- `landing-*.ts` - Landing page (/) section data
- `page-*.ts` - Route-specific page data (about, pricing, bm, agency)
- `nav-*.ts` - Navigation data (mega menu, mobile drawer, links)
- `pricing-catalog-*.ts` - Product catalog data
- `chart-*.ts` - Chart datasets and configs
- `widget-*.ts` - Widget/dashboard data

## File Index

| File | Provides | Used By |
|------|----------|---------|
| `landing-hero.ts` | Hero text, avatars, logos, word rotate | Hero blocks |
| `landing-stats.ts` | Stats section numbers | Stats block |
| `landing-bento.ts` | Bento grid shared data | Bento-10, 19 cards |
| `landing-bento-10.ts` | Bento-10 block data | bento-grid-10 |
| `landing-bento-13.ts` | Bento-13 block data | bento-grid-13 |
| `landing-bento-19.ts` | Bento-19 block data | bento-grid-19 |
| `landing-cta.ts` | CTA section content | cta-section-05 |
| `landing-faq.ts` | FAQ tabs data | faq-component-08 |
| `landing-features.ts` | Feature cards content | bento-grid-01 |
| `landing-footer.ts` | Footer links, social | footer-component-02 |
| `landing-reviews-pricing-faq.ts` | Reviews, pricing plans | testimonials, pricing |
| `nav-links.ts` | Nav links, social links | site-header, mobile-drawer |
| `nav-mega-menu-products.ts` | Product menu items | nav-mega-menu |
| `nav-mega-menu-resources.ts` | Resource menu items | nav-mega-menu |
| `nav-mega-menu-tools.ts` | Tool menu items | nav-mega-menu |
| `page-about.ts` | About page content | /about |
| `page-agency-ad-account.ts` | Agency page data | /agency-ad-account |
| `page-bm.ts` | BM page data | /bm |
| `page-bm-categories.ts` | BM product categories | /bm |
| `page-pricing.ts` | Pricing page plans/FAQ | /pricing |
| `pricing-catalog-products.ts` | Product categories | pricing catalog |
| `pricing-catalog-upsells.ts` | Upsells + all categories | pricing catalog |
| `chart-shared.ts` | Shared chart data (DRY) | chart blocks |
| `widget-product-insights.ts` | Product insight charts | widget block |

## Rules

1. Every file <200 lines
2. Export TypeScript types alongside data
3. kebab-case file names
4. Group by page/section, not data type
5. No React/JSX in data files (string content only)
6. Icons: export icon name as string, map to component in consumer
```

## Cleanup Checklist

- [ ] Grep for remaining hardcoded arrays/objects in `src/components/shadcn-studio/blocks/`
- [ ] Grep for remaining hardcoded arrays/objects in `src/app/`
- [ ] Verify all deleted files have no remaining imports
- [ ] Verify no circular imports in `src/data/`
- [ ] Run full TypeScript compile
- [ ] Visual regression test: check all pages render correctly

## Files to Delete (confirm from previous phases)

| File | Replaced By |
|------|-------------|
| `src/components/nav-mega-menu-data.tsx` | `src/data/nav-mega-menu-*.ts` |
| `src/app/bm/bm-page-data.tsx` | `src/data/page-bm*.ts` |
| `src/app/pricing/pricing-catalog-data.tsx` | `src/data/pricing-catalog-*.ts` |

## Success Criteria
- README.md accurately documents all data files
- Zero inline static data remaining in components (verified by grep)
- No orphan imports
- Full compile passes
- All pages render correctly

## Remaining Items NOT Extracted (by design)

These contain structural/layout constants, NOT content data:
- `section-header.tsx` VARIANT_CONFIG - layout variant definitions
- `mode-switcher.tsx` - UI toggle, no data
- All `ui/*` components - shadcn primitives
- CSS variables in `globals.css`
- Animation configs (delays, durations, easing)
- Icon component mappings (keep near consuming component)
- `blog-hero.tsx` - only 42 lines with 3 text strings; extraction overhead > benefit
