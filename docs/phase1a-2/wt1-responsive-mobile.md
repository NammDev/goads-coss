# WT1: Mobile Responsive + Cart Fix

> Branch: `phase-1a/responsive-mobile`

## Scope

Audit + fix all pages at 4 breakpoints. Fix cart mobile UX.

## File Ownership

- `src/app/(marketing)/**/*.tsx` — page-level layout fixes
- `src/components/nav-*.tsx` — mobile nav
- `src/components/product-*.tsx` — product cards/pages
- `src/components/blog-*.tsx` — blog layouts
- `src/components/shadcn-studio/blocks/**` — block responsive fixes
- `src/app/globals.css` — responsive utility classes only (no theme changes)

**DO NOT touch:** theme colors, dark mode, `lib/`, `middleware.ts`, auth files

## Breakpoints

| Size | Device | Width |
|------|--------|-------|
| xs | Mobile | 375px |
| sm | Tablet | 768px |
| md | Laptop | 1024px |
| lg | Desktop | 1440px |

## Pages to Audit (Priority Order)

### Critical (product/revenue pages)

1. `/` — Homepage (hero, features, CTA blocks)
2. `/agency-ad-account` — Product page
3. `/bm` — Product page
4. `/profiles` — Product page
5. `/payment` — Payment flow
6. `/pricing` — Pricing table

### High

7. `/blog` — Blog listing (sidebar + grid)
8. `/blog/[slug]` — Blog detail (TOC sidebar + prose)
9. `/talk-to-sales` — Contact
10. `/docs/[[...slug]]` — Knowledge base (3-panel layout)

### Medium

11. `/about` — Team section
12. `/reviews` — Testimonials
13. `/partners` — Partner logos
14. `/milestones` — Timeline
15. `/help` — Help center
16. All other product pages (google-agency, tiktok-*, blue-verification, unban)

### Low

17. `/tools/*` — 19 tool pages
18. Legal pages (ToS, Privacy, Refund)

## Tasks

### Cart Mobile Fix (Priority 1)

- [ ] Audit cart overlay/drawer on 375px
- [ ] Fix touch targets (min 44px)
- [ ] Fix cart item layout (image, name, quantity, price)
- [ ] Fix payment form on mobile (input sizes, button placement)
- [ ] Test full flow: add to cart → review → payment page

### Navigation (Priority 1)

- [ ] Audit `nav-mobile-drawer.tsx` at 375px
- [ ] Fix mega menu overflow on tablet (768px)
- [ ] Test `command-menu.tsx` (search modal) on mobile
- [ ] Fix floating contact button position on mobile

### Homepage (Priority 1)

- [ ] Hero section: text sizing, CTA button stack
- [ ] Feature grid: stack to single column on mobile
- [ ] Product catalog: card sizing + grid columns
- [ ] CTA sections: padding, text alignment

### Product Pages (Priority 2)

- [ ] `ProductPageTemplate` responsive layout
- [ ] Product cards in catalog grids
- [ ] Pricing tables: horizontal scroll or stack on mobile
- [ ] Trust signals section layout

### Blog (Priority 2)

- [ ] Blog listing: sidebar collapses on mobile
- [ ] Blog detail: TOC becomes dropdown/drawer on mobile
- [ ] Blog hero: image + text sizing

### Docs (Priority 2)

- [ ] 3-panel layout → single panel on mobile
- [ ] Sidebar becomes drawer
- [ ] Article content max-width
- [ ] Mobile sidebar toggle

### Tools (Priority 3)

- [ ] Tool page layouts at 375px
- [ ] Input/output areas responsive
- [ ] Tool grid on `/tools` listing

## Success Criteria

- [ ] No horizontal scroll on any page at 375px
- [ ] All touch targets >= 44px
- [ ] All text readable without zoom
- [ ] Cart flow works end-to-end on mobile
- [ ] Navigation accessible on all breakpoints
- [ ] No layout shifts (CLS < 0.1)
