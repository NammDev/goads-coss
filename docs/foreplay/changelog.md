# Foreplay Redesign — Changelog

## Foundation

| File | Change |
|------|--------|
| `fonts/index.ts` | Inter with `axes: ["opsz"]` — enables optical size for Inter Display |
| `globals.css` | `.foreplay` scope: full neutral + solid palettes, `--font-display`, `--fp-alpha-*`, `--fp-solid-*` |
| `(foreplay)/layout.tsx` | Body wrapper, font-optical-sizing:none (global), header + footer |

## Reusable Atoms

| Component | Foreplay Class | Variants | Used In |
|-----------|---------------|----------|---------|
| `foreplay-cta-button.tsx` | `.button-dark`, `.button-light` | nav, hero, secondary, ghost, light-primary | Header, Hero, Product, CTA, Sharing |
| `foreplay-nav-link.tsx` | `.navlink` | — | Header |
| `foreplay-hero-content.tsx` | `.home-hero-content` | — | Hero |
| `foreplay-section-head.tsx` | `.section-head` | dark/light variant, h2/h3 titleSize, m/l descSize, subtitle | Winning, Product x5, Collab, Features, CTA |
| `foreplay-section-container.tsx` | `.container.section-container` | section/wide/footer/navbar | Every section |
| `foreplay-section-white-block.tsx` | `.section-white-block` | — | Winning, Collab |
| `foreplay-dot-bg.tsx` | `.dot-bg` | — | Hero |
| `foreplay-winning-card.tsx` | `.home-winning-card` | light/dark (isDark) | Before/After |
| `foreplay-carousel-arrows.tsx` | `.slide-arrows` + `.carousel-arrow` | canPrev/canNext, 36px fixed, SVG 18px | Carousel |
| `foreplay-footer.tsx` | `footer.u-footer` | — | Layout |

## Organisms

| Component | Foreplay Class | Description |
|-----------|---------------|-------------|
| `foreplay-header.tsx` | `.navigation` | Sticky, z-100, blur(24px), bg #020308eb |
| `foreplay-home-hero.tsx` | `.home-hero` | Scroll animation + sticky + video |
| `foreplay-home-hero-bottom.tsx` | `.home-hero-bottom` | Overline + 14 logo grid |
| `foreplay-home-hero-video.tsx` | `.home-hero-middle` | Video + gradient overlays |
| `foreplay-home-winning.tsx` | `.home-winning` | Section head + Before/After cards |
| `foreplay-home-product-showcase.tsx` | `.home-product` | **REUSABLE** — sidebar + tabs + figure. Used 5x |
| `foreplay-home-chrome-extension.tsx` | `.home-extension` | Chrome logo + stats + CTA |
| `foreplay-home-collab.tsx` | `.home-collab` | Section head + enrichment placeholder + sharing |
| `foreplay-home-sharing.tsx` | `.home-sharing` | Tabs + CTA cards + image pane |
| `foreplay-home-features-grid.tsx` | `.lens-security` | 3-col card grid with images + CTAs |
| `foreplay-home-cta.tsx` | `.home-cta` | Final CTA + banner image |

## Data Files

| File | Content |
|------|---------|
| `data/foreplay-hero-logos.tsx` | 14 SVG client logos |
| `data/foreplay-product-tabs.tsx` | Tab data: swipeFile, spyder, discovery, lens, briefs |

## Source Files

| File | Purpose |
|------|---------|
| `docs/foreplay/html/foreplay-homepage-latest.html` | Full homepage HTML (338KB, latest) |
| `docs/foreplay/foreplay-source.css` | Full CSS (483KB) |
| `docs/foreplay/extract-css.sh` | Extract CSS by class name |

## Page Composition (`(foreplay)/home/page.tsx`)

```
Section 0: Hero (dark + dot grid + scroll animation + video)
Section 1: Winning (white) + Swipe File + Spyder + Discovery + Chrome Extension
Section 2: Collab (white) + enrichment + sharing tabs
Section 3: Features grid (dark) — 3 cards
Final CTA: "Ready to ship more winning ads?" + banner image
Footer (in layout)
```

## Product Page Atoms (Phase 3)

| Component | Foreplay Class | Description |
|-----------|---------------|-------------|
| `foreplay-product-hero.tsx` | `.product-hero` | Sticky scroll animation + 256x256 icon + gradient title + monitor preview w/ dual video |
| `foreplay-product-page-solution-before-after.tsx` | `.product-page-solution` | White block Before/After cards in 2-col grid |
| `foreplay-product-use-case-carousel.tsx` | `.product-carousel` | Horizontal slide cards + prev/next arrow nav |
| `foreplay-product-page-feature-tabs.tsx` | `.product-page-tabs` | 3-col tab grid + full-width screenshot below |
| `foreplay-product-page-feature-grid-cards.tsx` | `.product-page-feature-grid-new` | 3-col (2col tablet, 1col mobile) feature card grid |
| `foreplay-product-page-testimonial.tsx` | `.home-testimonial-wrapper` | Centered blockquote + logo + avatar + laurel decorations |
| `foreplay-product-page-cta-card.tsx` | `.cta-block` | Gradient bg card, CTA left + video/icon right |
| `foreplay-product-page-faq-accordion.tsx` | `.faq` | Expandable Q&A accordion with chevron animation |

## Product Page Data

| File | Content |
|------|---------|
| `data/foreplay-swipe-file-page-data.ts` | All text, images, FAQ items for /swipe-file |
| `app/foreplay/swipe-file/tab-icons.tsx` | Save/Tag/Share SVG icons for feature tabs |

## Product Page Composition (`foreplay/swipe-file/page.tsx`)

```
Section 1: Product Hero (wide container, dot grid, sticky scroll animation, dual video, 256px icon)
Section 2: Before/After Solution (white block)
Section 3: Use Cases Carousel (horizontal cards + 36px arrows)
Section 4: Core Features Tabs (3 tabs + screenshot) + Chrome Extension banner
--- Testimonial 1 (Matthew Williams / Affiliate World) — px-10 wrapper between sections ---
Section 5-8: All in ONE section-container (1216px):
  ├── Feature Grid 1 (6 cards, 3x2)
  ├── Testimonial 1 (inside section-container, px-10 wrapper)
  ├── Feature Grid 2 (6 cards, 3x2)
  └── Testimonial 2 (Tim Keen, inside section-container, px-10 wrapper)
Section 9: Product CTA Card (whitespace-pre-line for \n\n line breaks)
Section 10: FAQ Accordion (wide container 1440px, .faq siblings: section-head + faq-block-container + faq-buttons)
Section 11: Final CTA (wide container, reuse ForeplayHomeCta)
Footer (in layout)
```

## Source Files (Phase 3)

| File | Purpose |
|------|---------|
| `docs/foreplay/html/swipe-file.html` | Full swipe-file page HTML |
| `docs/foreplay/phase-3-product-pages.md` | Build plan for all product pages |

## Footer (Phase 3 — Rewrite)

| Component | Foreplay Class | Description |
|-----------|---------------|-------------|
| `foreplay-footer.tsx` | `footer.u-footer` | Main footer: products + company + links + ad count + AI + social |
| `footer/foreplay-footer-company-reviews.tsx` | `.footer-company` | Logo SVG + Chrome/G2 review badges |
| `footer/foreplay-footer-link-columns.tsx` | `.footer-links` | 5-col grid + ad count + ask AI buttons |
| `footer/foreplay-footer-social-and-legal.tsx` | `.footer-foot` | Copyright + Privacy/Terms + 6 social SVGs |
| `footer/foreplay-logo-svg.tsx` | `#sprite-foreplay-logo` | Exact logo from source sprite (icon + text gradient) |
| `foreplay-footer-product-nav.tsx` | `.footer-products` | 5 product badges with sprite bg-image icons (per-product bgSize) |
| `foreplay-carousel-arrows.tsx` | `.slide-arrows` | Reusable prev/next carousel navigation |

## Solutions Page Atoms (Phase 3b)

| Component | Foreplay Class | Description |
|-----------|---------------|-------------|
| `foreplay-solution-hero.tsx` | `.industries-icon` + `.section-head` | Icon + section head + CTA buttons |
| `foreplay-solution-logo-carousel.tsx` | `.industries-carousel-container` | Infinite scroll brand logos with fade overlay |
| `foreplay-solution-testimonial-card.tsx` | `.industries-testimonial` | Large quote card with bg image (different from product testimonial) |
| `foreplay-solution-examples-grid.tsx` | `.industries-examples-grid` | 3-col case study cards |

## Solutions Page Data

| File | Content |
|------|---------|
| `data/foreplay-ecommerce-solution-page-data.ts` | All text for /industries/ecommerce |

## Solutions Page Composition (`foreplay/industries/ecommerce/page.tsx`)

```
Section 1: Solution Hero (icon + CTA) + Logo Carousel (infinite scroll)
Section 2: Testimonials (3 large cards with bg images)
Section 3: Product Tabs (5 products — TODO: adapt HomeProductShowcase)
Section 4: Examples Grid (3 case study cards)
Section 5: Final CTA (reuse ForeplayHomeCta)
Footer (in layout)
```

## Source Files (Phase 3b)

| File | Purpose |
|------|---------|
| `docs/foreplay/html/industries-ecommerce.html` | Full ecommerce page HTML (194KB) |

## Webflow Global Defaults (discovered)

- `ul { margin-bottom: 10px }` — Webflow adds mb-2.5 to ALL `<ul>` elements by default
- `.w-list-unstyled { padding-left: 0; list-style: none }` — reset for nav/footer lists
- `.w-inline-block { display: inline-block; max-width: 100% }` — wrapper for `<a>` tags

## Session 2026-04-03 — Pixel-Perfect Fixes

| Area | Fix |
|------|-----|
| Footer product icons | `<img>` → `<div>` with `background-image` sprite system, per-product `bgSize` |
| Footer icon swap | SwipeFile ↔ Discovery images swapped to correct positions |
| FAQ nesting | `.faq-buttons` moved from child of `.faq-block-container` to sibling |
| FAQ container | `variant="wide"` (1440px) per Foreplay `.container` |
| CTA card `.text-white` | Added `flex-1` (hidden Webflow property) |
| CTA card `.text-alpha-100` | Added `flex-1` |
| CTA card responsive text | `mobile-landscape-text-display-h4` + `mobile-landscape-text-body-n` |
| CTA card `.no-cc-required` | Set `hidden` (source: `display: none`) |
| CTA card description | `whitespace-pre-line` for `\n\n` line breaks |
| CTA card description | `ReactNode` type (was `string`) |
| CTA card animation | Fixed `inset` from `-50% -25% -50% auto` to `-50% -25% 0% auto` |
| Testimonial logo | Fixed to `w-24 max-h-10` (96px/40px) — last CSS definition wins |
| Testimonial container | Inside `section-container` (1216px) + `px-10` wrapper, not separate `wide` |
| Testimonial 1 | Added between Core Features and All Features Grid with real assets |
| Section container | Added `variant="wide"` (1440px) for `.container` base usage |
| Hero container | `variant="wide"` (was `"section"` = 1216px) |
| Hero sticky animation | Added IntersectionObserver scroll animation (same as home hero) |
| Hero icon | 256x256 fixed size + mt-[-40px] mb-[-24px] (was padding-based) |
| Hero title | Added gradient text + `text-wrap:balance` + responsive sizes |
| Hero `.hero-text` | Added wrapper div with `flex col gap-4 max-w-[900px] items-center` |
| Hero preview | Added `perspective:1000px`, `transform-origin:50%`, overlay gradient |
| Hero dual video | Added `previewBgVideoSrc` + `previewBgVideoPoster` props |
| Carousel arrows | Fixed to 36px fixed (removed `md:size-11`), SVG explicit 18x18 |
| Final CTA | `variant="wide"` container |

## Pricing Page (Phase 3c — DONE ✅)

### Core Components Built

| Component | Foreplay Class | Description |
|-----------|---------------|-------------|
| `foreplay-pricing-tabs.tsx` | `.pricing-tabs` + `.pricing-tabs-menu` | Monthly/Annual toggle, renders PricingCards dynamically |
| `foreplay-pricing-card.tsx` | `.pricing-card-container` + `.pricing-card` | Fully styled pricing card with crown badge, monthly/annual prices, features list, CTA |
| `foreplay-pricing-footer.tsx` | `.pricing-footer` | Enterprise section with vertical divider + extra features list + custom CTA |
| `foreplay-pricing-comparison.tsx` | `.comparison` | White block wrapper for comparison table section |
| `foreplay-pricing-comparison-table.tsx` | `.comparison-table` | Full comparison grid: sticky header, collapsible accordion categories, product rows with sprite icons, "Need custom?" footer |
| `foreplay-comparison-tooltip-badge.tsx` | `.comparison-tooltip-badge` | Crown badge with Radix tooltip info icon + dynamic content |

### Pricing Page Data

| File | Content |
|------|---------|
| `data/foreplay-pricing-page-data.ts` | Monthly/annual pricing cards (6 tiers), FAQ items (6), comparison table features, custom features list |

### Pricing Page Features

- **Monthly/Annual toggle** — Tab switching with smooth transitions
- **Pricing cards** — Crown badges on top tier, responsive layout, CTA buttons
- **Comparison table** — Sticky header, accordion collapsing by category, product feature rows, sprite icon icons (16x16)
- **Tooltips** — Radix UI tooltip for info icons with custom styling
- **Accordion integration** — FAQ reuses ForeplayFaqAccordion with pricing items
- **CTA reuse** — Final CTA reuses ForeplayHomeCta

### Dependencies Added

- `@radix-ui/react-tooltip` — for comparison table info icons

### Pricing Page Composition (`foreplay/pricing/page.tsx`)

```
Section 1: Pricing Hero (section-container 1216px)
  ├── ForeplaySectionHead (h1, titleSize "display-h5")
  ├── PricingTabs (monthly/annual toggle + 3 cards per pane)
  └── PricingFooter (enterprise section + extra features)

Section 2: Comparison Table (white block → container 1440px)
  ├── ForeplaySectionHead (comparison title)
  └── PricingComparisonTable (sticky header, 7 categories, 12 product rows)

Section 3: FAQ (wide container 1440px)
  ├── ForeplaySectionHead (FAQ title)
  └── ForeplayFaqAccordion (6 pricing items + smooth height animation)

Section 4: Final CTA (section-container 1216px)
  └── ForeplayHomeCta (reuse)

Footer (in layout)
```

### Components Updated

| Component | Changes |
|-----------|---------|
| `foreplay-section-head.tsx` | Added h1 `titleTag` option, `titleSize` visual size control (display-h5), removed section div wrapper, fixed dark variant paragraph color |
| `foreplay-typography.ts` | Added `displayH5` typography constant for pricing title |

### Source Files (Phase 3c)

| File | Purpose |
|------|---------|
| `docs/foreplay/html/pricing.html` | Full pricing page HTML (296KB) |

## Remaining TODO

- [ ] Lens + Briefs product showcase images/videos
- [ ] Enrichment illustration (Venn diagram SVG)
- [ ] Convert content from Foreplay to GoAds
- [ ] Responsive breakpoints
- [ ] Convert .foreplay hex tokens to oklch
