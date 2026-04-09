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

## Reviews Page (Phase 4a — DONE ✅)

| Component | Description |
|-----------|-------------|
| `senja-review-card.tsx` | Senja-style review card: avatar(42px) + name + platform icon + stars(5x20px) + content(line-clamp-10) + date |
| `senja-review-masonry-grid.tsx` | CSS columns masonry (4 cols), Load More pagination (initialCount, loadMoreCount) |

### Reviews Data

| File | Content |
|------|---------|
| `data/goads-reviews-data.ts` | 20 reviews (10 original Chrome Web Store + 10 mixed: Google, Telegram, Facebook) |

### Reviews Page Composition (`foreplay/reviews/page.tsx`)

```
Section 1: Hero Header (section-container, dark)
Section 2: Review Cards (white block, masonry grid, 10 initial + Load More)
Section 3: Final CTA (reuse ForeplayHomeCta)
```

## Book Demo Page (Phase 4b — DONE ✅)

| Component | Description |
|-----------|-------------|
| `foreplay-demo-hero.tsx` | Hero: overline + h2 title (Inter Display 2.75rem) + description + Cal.com embed + logo grid |
| `foreplay-cal-embed.tsx` | Cal.com inline embed (`@calcom/embed-react`), dark theme, month_view layout |
| `foreplay-demo-social-proof.tsx` | 2-col grid: section-head left + 3 rating badges right (G2, Chrome, Capterra) |

### Book Demo Composition (`foreplay/book-demo/page.tsx`)

```
Section 1: Demo Hero (dark bg + dot grid)
  ├── Overline "Book a Demo" + h2 + description
  ├── Cal.com inline embed (nam-khanh-nguyen-dhpuv7/30min)
  └── Logo grid (reuse ForeplayHomeHeroBottom)
Section 2: Social Proof + Reviews (white block)
  ├── 2-col: section-head left + G2/Chrome/Capterra badges right
  └── Review cards masonry (8 initial + Load More)
```

### Dependencies Added

- `@calcom/embed-react` — Cal.com inline booking embed

## GoAds Content Swap (Phase 4c — DONE ✅)

### Home Page Text Replacements

| Component | Old (Foreplay) | New (GoAds) |
|-----------|---------------|-------------|
| Hero title | "The Complete Winning Ad Workflow" | "Unlimited Scaling\nWinning Ad Infrastructure" |
| Hero CTA | "Start Free Trial" → `/sign-up` | "Contact Us" → `/talk-to-sales` |
| Trust badge | "Powering +10,000 Social Ad Teams" | "TRUSTED BY 1000+ ADVERTISERS WORLDWIDE" |
| Winning | "Your new secret weapon for ads" | "Built to last, made to scale" |
| Chrome ext | "Save ads from Meta, TikTok & LinkedIn" | "Bypass BM invites. Login by cookie." |
| Chrome stats | 30,000 Users / 4.8/5 Stars | 2,000+ Users / 5/5 Stars |
| Collab → Promise | "Collaboration" + sharing tabs | "OUR PROMISE" + 3 promise tabs |
| Features → Community | "Miles beyond the status quo" | "Stay connected, stay ahead" |
| CTA | "Ready to ship more winning ads?" | "Your next winning campaign starts here" |

### Product Showcase Tab Labels

| Showcase | Old Tabs | New Tabs |
|----------|----------|----------|
| Assets | Save & Organize, Automate Transcription, Share & Collaborate | Meta Assets, TikTok Assets |
| Solutions | 24/7 Ad Library Scraper, Analyze Creative Tests | Unban & Recovery, Verified Services |
| Agency Accounts | Smart Search, AI Creative Analysis | Facebook, TikTok, Google |
| Technology | Creative Test Analysis, Build & Share Reports, Compare Themes | GoAds Extensions, All Tools |
| Service | Storyboard & Script | 24/7 support, Quick replacements |

## Blog Pages (Phase 5 — DONE ✅)

### Shared Blog Components

| Component | Foreplay Class | Description |
|-----------|---------------|-------------|
| `blog/blog-card.tsx` | `.blog-list-card` + `.blog-carousel-card-*` | Shared card: cover image + author (28px avatar) + title (`text-label-l`) + excerpt (`text-body-m`) |
| `blog/blog-category-bar.tsx` | `.blog-categories` + `.blog-tag` | Horizontal pills: ring neutral-700, rounded-[10px], active invert |
| `blog/blog-pagination.tsx` | `.blog-pagination` + `.page-count` | Page count "1 / N" + prev/next chevron buttons |
| `blog/blog-featured-card.tsx` | `.featured-blog-wrapper` + `.featured-blog-link` | Large hero card: cover (rounded-[20px], border grey-stroke) + `text-display-h3` title + excerpt + author |
| `blog/blog-popular-sidebar.tsx` | `.blog-feed-wrapper` + `.blog-feed-link` | Text-only list: title (`text-label-m`) + excerpt (`text-body-s line-clamp-2`) + author/read time |
| `blog/blog-inline-cta.tsx` | `.blog-cta` | GoAds adaptation: bg neutral-700, rounded-xl, CTA with pricing + sales links |
| `blog/blog-related-carousel.tsx` | `.blog-related` + `.blog-related-list` | Horizontal scroll carousel, snap-x, BlogCard reuse, ForeplayCarouselArrows |

### Rebuilt Components

| Component | Changes |
|-----------|---------|
| `blog-hero.tsx` | Rebuilt: overline "Blog" + gradient h1 + 2-col grid (featured 3fr + popular 2fr) |
| `blog-listing.tsx` | Rebuilt: BlogCategoryBar + 3-col BlogCard grid + BlogPagination, client-side filtering |
| `blog-detail-header.tsx` | Rebuilt: breadcrumb + h1 + author (48px avatar + name + title + social) + cover image. Accepts both string and object author format |
| `blog-detail-content.tsx` | Rebuilt: 3-col grid (TOC left sticky + prose center + spacer right), removed CtaSidebar |

### Blog Data

| File | Content |
|------|---------|
| `data/blog-posts.ts` | Extended type: `BlogAuthor` object, `categorySlug`, `coverImage`, `featured`, `popular`. 5 posts, 5 categories. Helper functions: `getFeaturedPost`, `getPopularPosts`, `getBlogPostsByCategory` |

### Blog Page Compositions

**`/foreplay/blog/page.tsx`** (listing):
```
BlogHero (overline + gradient title + featured card + popular sidebar)
BlogListing (category bar + 3-col card grid + pagination)
ForeplayHomeCta (reuse)
```

**`/foreplay/blog/[slug]/page.tsx`** (detail):
```
BlogDetailHeader (breadcrumb + title + author + cover)
BlogDetailContent (TOC sidebar + prose body)
BlogInlineCta (GoAds CTA)
BlogRelatedCarousel (horizontal scroll + carousel arrows)
ForeplayHomeCta (reuse)
```

### Source Files (Phase 5)

| File | Purpose |
|------|---------|
| `docs/foreplay/html/blog.html` | Full blog listing HTML |
| `docs/foreplay/html/blog-post-detail.html` | Full blog post detail HTML |
| `docs/foreplay/nested.md` | Complete DOM nesting reference for both pages |
| `docs/foreplay/clone.md` | Blog clone reference with section audit + typography mapping |

## University Page (Phase 5 — DONE ✅)

| Component | Foreplay Class | Description |
|-----------|---------------|-------------|
| `foreplay-university-hero.tsx` | `.fireside-hero` | FU logo + title + bg image overlay + carousel slot |
| `foreplay-university-course-card.tsx` | `.course-card` | Active (bg image + wordmark + "Watch Now" hover) / Coming Soon variants |
| `foreplay-university-course-carousel.tsx` | `.university-classes-carousel` | Horizontal card layout with opacity variants (_2=50%, _3=25%) |
| `foreplay-university-feature-row.tsx` | `.left-right-section` | Alternating image+text rows with optional CTA |

### University Data

| File | Content |
|------|---------|
| `data/foreplay-university-classes-page-data.ts` | Hero, 5 course cards, 2 feature rows |

### University Page Composition (`foreplay/university/classes/page.tsx`)

```
Section 1: University Hero (logo + title + bg)
  └── Course Cards Carousel (5 cards: 1 active, 4 coming-soon)
Section 2: Left-Right Feature Rows (2 rows, alternating)
  ├── Row 1: FU icon + "Welcome to Your Campus" + campus photo
  └── Row 2: "Become a Professor" + professor graphic + "Apply Now" CTA
Section 3: Final CTA (reuse ForeplayHomeCta)
Footer (in layout)
```

### CSS Notes (from extract-css.sh)

| Class | Key CSS |
|-------|---------|
| `.fireside-hero` | flex col, center, pt-80px pb-80px (desktop), pt/pb-40px (tablet/mobile) |
| `.course-card` | 250x375, bg-cover, rounded-10px, shadow `0 0 0 1px #ffffff26` |
| `.course-card.coming-soon` | bg `#ffffff1f`, dimmed avatar bg |
| `.fu-card-shine` | 125x125 circle, blur(70px), opacity 0.31 (active), 0.09 hidden (coming-soon) |
| `.cards-wrapper-new._2` | opacity 0.5 |
| `.cards-wrapper-new._3` | opacity 0.25 |
| `.left-right-section-wrapper` | flex col, gap-80px |
| `.left-right-section` | flex, gap-24px, items-center |
| `.left-right-section-image` | rounded-20px |
| `.foreplay-university-hero-brackground` | absolute, top-0, inset-x-0, h-50vh, z--1, opacity 0.56, bg cover |

### Note

`/university` and `/university/classes` serve identical HTML on foreplay.co. Page cloned at `/foreplay/university/classes`.

### Session 2026-04-09 — Pixel-Perfect Audit Fixes

Full DOM + CSS audit vs source. Fixes applied:

| Area | Issue | Fix |
|------|-------|-----|
| Hero DOM | Carousel nested inside `.university-hero-content` | Moved as sibling inside `.fireside-hero` |
| Hero DOM | Missing `.text-white` wrapper around h2 | Added `div.hero-text > div.text-white > h2` nesting |
| Hero CSS | `.hero-text` missing classes | Added `flex flex-col items-center justify-start gap-4 max-w-[900px]` |
| Hero bg | `-z-1` not valid Tailwind class | Changed to `-z-[1]` arbitrary |
| Hero bg | `z-index: -1` invisible (no stacking context) | Added `isolate` to parent section |
| Hero logo | Wrong size (h-10 = 40px) | Set exact `w-[191px] h-[51px]` from source `.fu-logo` |
| Card "Coming Soon" | Wrong text styles | Source = `opacity: .2` only, removed text-sm/font-medium/color |
| Feature row | `.section-head.is-align-left` missing max-w | Added `max-w-[720px]` |
| Feature row | Missing `.section-head_title` wrapper | Added outer `div.section-head_title > div.text-white > h2` |
| Feature row | Missing `.section-head_paragraph` wrapper | Added outer `div.section-head_paragraph > div.text-alpha-100 > p` |
| Feature row | `.text-white` + `.text-alpha-100` missing hidden `flex:1` | Added `flex-1` (Webflow hidden prop) |
| Feature row | Missing `.text-alpha-300` overline placeholder | Added empty `<div />` |
| Feature row | CTA `<a>` not wrapped in `<div>` | Added wrapper div |
| Feature row | `.left-right-section-content` had extra `flex-1` | Removed — source doesn't have it (natural width) |
| Feature row | Image stretching beyond 560px | Added `max-w-[560px]` to match `width="560" + max-width:100%` |
| Feature row | `.left-right-section-image-wrapper` missing w-full | Added `w-full` |

## Profiles Page (Phase 4d — DONE ✅)

| Component | Description |
|-----------|-------------|
| `goads-product-catalog-table.tsx` | Multi-category product catalog table with expandable rows, pricing, and order links |

### Profiles Data

| File | Content |
|------|---------|
| `data/goads-profiles-page-data.ts` | Hero, FAQ, feature grids, testimonials |
| `data/goads-product-catalog-table-data.ts` | Product catalog categories + columns |

### Additional Components

| Component | Description |
|-----------|-------------|
| `foreplay-reviews-widget.tsx` | Senja reviews embed wrapper (script-based) |
| `foreplay-solution-product-tabs.tsx` | Solution page product showcase tabs (5 products with comparison) |

## All Foreplay Routes (Current)

| Route | Status | Phase |
|-------|--------|-------|
| `/foreplay/home` | ✅ Done | 1-2 |
| `/foreplay/swipe-file` | ✅ Done | 3 |
| `/foreplay/pricing` | ✅ Done | 3c |
| `/foreplay/reviews` | ✅ Done | 4a |
| `/foreplay/book-demo` | ✅ Done | 4b |
| `/foreplay/profiles` | ✅ Done | 4d |
| `/foreplay/industries/ecommerce` | ✅ Done | 3b |
| `/foreplay/blog` | ✅ Done | 5 |
| `/foreplay/blog/[slug]` | ✅ Done | 5 |
| `/foreplay/university/classes` | ✅ Done | 5 |

## Remaining TODO

- [ ] Lens + Briefs product showcase images/videos
- [ ] Enrichment illustration (Venn diagram SVG)
- [ ] Responsive breakpoints (3 breakpoints: desktop/tablet/mobile)
- [ ] Convert .foreplay hex tokens to oklch
- [ ] Solution pages: `/industries/agencies`, `/industries/mobile-apps`, etc.
- [ ] Comparison pages: `/comparison/*`
- [x] Clone /blog page ✅
- [x] Clone /blog/[slug] page ✅
- [x] Clone /university/classes page ✅
