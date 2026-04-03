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
| `foreplay-section-container.tsx` | `.container.section-container` | section/footer/navbar | Every section |
| `foreplay-section-white-block.tsx` | `.section-white-block` | — | Winning, Collab |
| `foreplay-dot-bg.tsx` | `.dot-bg` | — | Hero |
| `foreplay-winning-card.tsx` | `.home-winning-card` | light/dark (isDark) | Before/After |
| `foreplay-carousel-arrows.tsx` | `.slide-arrows` + `.carousel-arrow` | canPrev/canNext, 36px/44px | Carousel |
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
| `foreplay-product-hero.tsx` | `.product-hero` | Icon + overline + title + CTA + monitor preview w/ video |
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
Section 1: Product Hero (dark + dot grid + icon + monitor mockup w/ video)
Section 2: Before/After Solution (white block)
Section 3: Use Cases Carousel (horizontal cards + arrows)
Section 4: Core Features Tabs (3 tabs + screenshot) + Chrome Extension banner
Section 5: All Features Grid 1 (6 cards, 3x2)
Section 6: Testimonial 1 (Matthew Williams)
Section 7: Feature Grid 2 (6 cards, 3x2)
Section 8: Testimonial 2 (Tim Keen)
Section 9: Product CTA Card (gradient + video + icon)
Section 10: FAQ Accordion (11 items)
Section 11: Final CTA (reuse ForeplayHomeCta)
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
| `foreplay-footer-product-nav.tsx` | `.footer-products` | 5 product badges with local icons |
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

## Remaining TODO

- [ ] Lens + Briefs product showcase images/videos
- [ ] Enrichment illustration (Venn diagram SVG)
- [ ] Convert content from Foreplay to GoAds
- [ ] Responsive breakpoints
- [ ] Convert .foreplay hex tokens to oklch
