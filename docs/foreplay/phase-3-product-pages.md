# Phase 3: Product Pages — Detailed Plan

> Build `/swipe-file` first as template, then replicate pattern for other product pages.

## Swipe File Page (`/swipe-file`) — 12 Sections

### Section Map

| # | Section Name | Foreplay Class | Reuse? | New Atom? |
|---|-------------|---------------|--------|-----------|
| 1 | Product Hero | `.product-hero` | ❌ NEW | `foreplay-product-hero.tsx` |
| 2 | Before/After (white) | `.home-winning` | ✅ REUSE | `ForeplayHomeWinning` (different text) |
| 3 | Use Cases Carousel | `.use-cases` | ❌ NEW | `foreplay-use-case-carousel.tsx` |
| 4 | Core Features Tabs | `.core-features` | ❌ NEW | `foreplay-feature-tabs-fullwidth.tsx` |
| 5 | Feature Grid 3x2 | `.all-features` | ❌ NEW | `foreplay-feature-grid-cards.tsx` |
| 6 | Testimonial | `.testimonial` | ❌ NEW | `foreplay-testimonial.tsx` |
| 7 | Feature Grid 3x2 (dark) | `.all-features` | ~70% REUSE | Extend `FeatureGridCards` with dark variant |
| 8 | Product CTA | `.product-cta` | ❌ NEW | `foreplay-product-cta-card.tsx` |
| 9 | FAQ Accordion | `.faq` | ❌ NEW | `foreplay-faq-accordion.tsx` |
| 10 | Final CTA | `.home-cta` | ✅ REUSE | `ForeplayHomeCta` |
| 11 | Product Nav Bar | `.product-nav` | ❌ NEW | `foreplay-product-nav-bar.tsx` |
| 12 | Footer | `footer.u-footer` | ✅ REUSE | In layout |

### Build Order (atoms first → organisms → compose)

#### Task 1: Product Hero (`foreplay-product-hero.tsx`)
- **Priority**: HIGH — every product page starts with this
- **Structure**: icon image + `ForeplaySectionHead` (overline + title + desc) + `ForeplayCtaButton` + full-width screenshot
- **CSS**: Extract from source HTML `.product-hero-*` classes
- **Reuse**: `ForeplaySectionHead`, `ForeplayCtaButton`, `ForeplayDotBg`
- **Props**: `icon`, `overline`, `title`, `description`, `ctaLabel`, `ctaHref`, `screenshotSrc`
- **Estimated effort**: Small — mostly composition of existing atoms

#### Task 2: Use Case Carousel (`foreplay-use-case-carousel.tsx`)
- **Priority**: HIGH — appears on all product pages
- **Structure**: `ForeplaySectionHead` + horizontal scroll container + cards (image + title + desc) + nav arrows
- **New atoms needed**: `foreplay-use-case-card.tsx` (image top + title + desc below, border ring)
- **CSS**: `.use-case-grid`, `.use-case-card`
- **Props**: `subtitle`, `title`, `description`, `cards[]` (image, title, desc)
- **Estimated effort**: Medium — new scroll behavior + card atom

#### Task 3: Feature Tabs Full-Width (`foreplay-feature-tabs-fullwidth.tsx`)
- **Priority**: HIGH — reusable across products
- **Structure**: `ForeplaySectionHead` + horizontal tab links (icon + label) + large screenshot below
- **Difference from home sharing**: tabs are horizontal row (not vertical sidebar), image is full-width below (not side-by-side)
- **CSS**: `.core-features-tabs`, `.core-features-tab-link`, `.core-features-image`
- **Props**: `subtitle`, `title`, `description`, `tabs[]` (icon, label, image)
- **Estimated effort**: Medium — similar pattern to product showcase tabs

#### Task 4: Feature Grid Cards (`foreplay-feature-grid-cards.tsx`)
- **Priority**: HIGH — used twice on swipe-file (light + dark variants), reusable across products
- **Structure**: `ForeplaySectionHead` + 3-col grid (2 rows) + cards (image top + title + desc)
- **Card**: rounded, image area (h ~200px) + text area below
- **Variants**: dark card (neutral bg, white text) + light card (same but with dark images)
- **CSS**: `.features-grid`, `.feature-card`, `.feature-card-image`
- **Props**: `subtitle`, `title`, `description`, `cards[]` (image, title, desc), `variant: "light" | "dark"`
- **Estimated effort**: Medium — new card layout

#### Task 5: Testimonial (`foreplay-testimonial.tsx`)
- **Priority**: MEDIUM — reusable, appears on most product pages
- **Structure**: decoration (laurel wreath image/SVG) + blockquote + avatar + name + title
- **CSS**: `.testimonial-*`
- **Props**: `quote`, `author`, `role`, `avatarSrc`, `decorationSrc?`
- **Estimated effort**: Small — simple layout

#### Task 6: Product CTA Card (`foreplay-product-cta-card.tsx`)
- **Priority**: MEDIUM — reusable across products
- **Structure**: rounded border card, left side (title + desc + `ForeplayCtaButton`) + right side (3D icon image)
- **CSS**: `.product-cta-*`
- **Props**: `title`, `description`, `ctaLabel`, `ctaHref`, `imageSrc`
- **Estimated effort**: Small — simple 2-col card

#### Task 7: FAQ Accordion (`foreplay-faq-accordion.tsx`)
- **Priority**: MEDIUM — reusable across products
- **Structure**: `ForeplaySectionHead` + accordion items (question + chevron toggle + answer panel)
- **Interaction**: click to expand/collapse, one-at-a-time or multi
- **CSS**: `.faq-*`, `.faq-item`, `.faq-question`, `.faq-answer`
- **Props**: `subtitle`, `title`, `description`, `items[]` (question, answer)
- **Estimated effort**: Medium — needs client-side state for toggle

#### Task 8: Product Nav Bar (`foreplay-product-nav-bar.tsx`)
- **Priority**: LOW — appears between CTA and footer
- **Structure**: horizontal row of icon + label links (SwipeFile, Discovery, Spyder, Lens, Briefs)
- **CSS**: `.product-nav-*`
- **Props**: `products[]` (icon, label, href, active?)
- **Estimated effort**: Small — simple flex row

---

## Reuse Across Product Pages

Once Swipe File is done, other product pages reuse **ALL** new atoms:

| Atom | Swipe File | Discovery | Spyder | Lens |
|------|-----------|-----------|--------|------|
| ProductHero | ✅ | ✅ | ✅ | ✅ |
| UseCaseCarousel | ✅ | ✅ | ✅ | ✅ |
| FeatureTabsFullWidth | ✅ | ✅ | ✅ | ✅ |
| FeatureGridCards | ✅ | ✅ | ✅ | ✅ |
| Testimonial | ✅ | ✅ | ✅ | ✅ |
| ProductCtaCard | ✅ | ✅ | ✅ | ✅ |
| FaqAccordion | ✅ | ✅ | ✅ | ✅ |
| ProductNavBar | ✅ | ✅ | ✅ | ✅ |

**Swipe File = template page. Other pages = same components, different props (text, images, tab data).**

---

## Execution Plan

### Session 1: Atoms (Tasks 1-4)
```
1. curl swipe-file HTML → docs/foreplay/html/swipe-file.html
2. Build ProductHero
3. Build UseCaseCard + UseCaseCarousel
4. Build FeatureTabsFullWidth
5. Build FeatureGridCards (light + dark)
```

### Session 2: Atoms (Tasks 5-8) + Compose
```
1. Build Testimonial
2. Build ProductCtaCard
3. Build FaqAccordion
4. Build ProductNavBar
5. Compose /swipe-file/page.tsx
6. Add all images/videos
```

### Session 3: Other Product Pages
```
1. curl discovery/spyder/lens HTML
2. Create /discovery/page.tsx (reuse atoms, different props)
3. Create /spyder/page.tsx
4. Create /lens/page.tsx
5. Update changelog + barrel exports
```

## Prep Checklist

- [ ] Download swipe-file HTML: `curl -sL foreplay.co/swipe-file > docs/foreplay/html/swipe-file.html`
- [ ] Download product page CSS (may be same stylesheet)
- [ ] Identify exact Foreplay class names for each new section
- [ ] Collect 3D icon images for each product
- [ ] Collect screenshot images for each tab/feature
