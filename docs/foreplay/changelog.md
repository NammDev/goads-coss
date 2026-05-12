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
| `blog/blog-pagination.tsx` | `.w-pagination-wrapper.blog-pagination` + `.div-block-344` + `.page-count` + `.w-pagination-next/previous` | Webflow-style pagination: `1 / N` count + `Previous`/`Next` buttons using `.button-dark.button-secondary` styling + 12×12 chevron SVG; conditionally renders prev/next based on currentPage |
| `blog/blog-featured-card.tsx` | `.featured-blog-wrapper` + `.featured-blog-link` | Large hero card: cover (rounded-[20px], border grey-stroke) + `text-display-h3` title + excerpt + author |
| `blog/blog-popular-sidebar.tsx` | `.blog-feed-wrapper` + `.blog-feed-link` | Text-only list: title (`text-label-m`) + excerpt (`text-body-s line-clamp-2`) + author/read time |
| `blog/blog-inline-cta.tsx` | `.blog-cta` | GoAds adaptation: bg neutral-700, rounded-xl, CTA with pricing + sales links |
| `blog/blog-related-carousel.tsx` (REBUILT) | Mirrors `/foreplay/agency-ad-account` "Use Cases" section pattern: `ForeplaySectionHead variant="light"` + carousel cards rounded-28 / w-[39vw] max-w-[576px] / shadow ring `#1b1c21`, translateX slide 800ms cubic-bezier, cards wrapped in Link to blog detail |
| `blog/blog-related-head.tsx` | `.blog-related-head` | "Explore More Blogs" intro: `text-heading-l` title + `text-body-m` description (alpha-100), flex col gap-2 |
| `blog/blog-detail-cta-sidebar.tsx` | `.blog-cta` + `.blog-cta-content` | Sticky right-rail CTA card on detail pages: `bg-[#ffffff1a]` rounded-12, optional image + title (`labelL`) + description (`bodyS` alpha-100) + `ForeplayCtaButton` |
| `blog/blog-detail-author.tsx` | `.blog-author` | Author block inside `.blog-head`: 48px avatar w/ border ring + flex-1(name in alpha-25 / title in alpha-200) + `.blog-author-links` (social icons + "More Articles" ghost button) |
| `blog/blog-author-social-icon.tsx` | `.blog-author-social-link > .icon-24` | Exact 24×24 SVG paths from Foreplay source for: website (globe), linkedin, twitter, instagram, youtube, facebook, tiktok |

### Rebuilt Components

| Component | Changes |
|-----------|---------|
| `blog-hero.tsx` | Rebuilt: overline "Blog" + gradient h1 + `.blog-header-grid` exact replica — desktop 6×1fr grid w/ 50px col-gap, featured col-span-4, sidebar col-span-2; mobile flex-col w/ sidebar `mt-25 + border-t + pt-25` |
| `blog/blog-popular-sidebar.tsx` (FIX) | Replaced `divide-y` with `.collection-list-5` 40px gap (no dividers); fixed `.blog-feed-author` spacing using inline 7px margins (matches Foreplay's `.text-seperator mx-7` + `.thumbnail-author-avatar mr-7`) |
| `blog/blog-featured-card.tsx` (FIX) | Avatar 24→25px (per `.thumbnail-author-avatar`); `mr-[7px]` instead of parent gap; nested author link wraps avatar+name |
| `blog-listing.tsx` | Wrapped in `.blog-feed` (flex col gap-9 pb-[120px]); prepended `BlogRelatedHead` ("Explore More Blogs" + subtitle); category bar now includes "Topics & Categories:" prefix via `BlogCategoryBar.titleLabel` |
| `blog/blog-category-bar.tsx` (UPDATE) | Added `.categories-title` label prefix ("Topics & Categories:" via `titleLabel` prop); now wraps tags in `.collection-list-6` flex-wrap container; mobile flex-col, desktop flex-row |
| `blog-detail-header.tsx` | Narrow hero (`.blog-container` max-w-[832px]): breadcrumb + h1 (`text-display-h4` 28px) + description + `.blog-line` separator. Author block + cover image MOVED into content. |
| `blog-detail-content.tsx` | Full-width 3-col grid `[1fr minmax(0,752px) 1fr]` gap-9: TOC (sticky, with "Table of contents" header) + main column (author + inline cover image + `.blog-rtb` prose) + sticky CTA sidebar on right. |
| `globals.css` (ADD) | New `.blog-rtb` scope — Foreplay-exact rich-text styling: 16px/24px body @ `#ffffffd6`, Inter Display headings (h2 28px → h6 16px) with exact margins, flex-col lists w/ 12px gap, blockquote with ::before 3px white bar (no border-l), `hr` 48px margin, `img` rounded-20 + 1px white ring, `a` weight-500 white w/ hover underline, code/pre styling. Replaces the prose plugin on detail pages. |

### Blog Data

| File | Content |
|------|---------|
| `data/blog-posts.ts` | Extended type: `BlogAuthor` object, `categorySlug`, `coverImage`, `featured`, `popular`. **17 posts** (5 detailed + 12 filler for pagination demo), 5 categories. Helper functions: `getFeaturedPost`, `getPopularPosts`, `getBlogPostsByCategory` |

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

## Header Dropdown Fixes (2026-04-10)

| File | Change |
|------|--------|
| `globals.css` | Registered `--fp-border-nav: #2a2b30` token in `.foreplay` scope |
| `foreplay-header-resources-menu.tsx` | 100% nested DOM rewrite matching source HTML. Fixed: Earn list `grid-cols-5` (was 3), added `whitespace-nowrap` on `.u-nav-banner-title`, added `flex-1` on `.text-white` wrapper (hidden Webflow CSS), added `justify-center` on `.u-nav-link-content`, video `preload="auto"`, merch description `text-left` per `.u-nav-merch-link-description` |
| `foreplay-header-product-menu.tsx` | Replaced `#2a2b30` → `var(--fp-border-nav)` |
| `foreplay-header-solutions-menu.tsx` | Replaced `#2a2b30` → `var(--fp-border-nav)` |
| `foreplay-header-mobile-menu.tsx` | Replaced all `#2a2b30` → `var(--fp-border-nav)` |

## Header Full Refactor — 100% Nested DOM (2026-04-10) ✅

Complete header rewrite to achieve pixel-perfect parity with foreplay.co source. Root cause analysis of width/positioning bugs + consolidated dropdown shell.

### Critical architecture fixes

| File | Change |
|------|--------|
| `foreplay-header.tsx` | Corrected `.container.navbar-container` — `max-w-[1440px]` + `px-10` (was wrong `max-w-[1340px]` + `px-2` which are mobile-only). Corrected `.nav-stack` → `p-4` (was wrong `py-3 px-4 h-[72px]` which are mobile-only). Removed `relative z-[5]` from navbar-container (mobile-only). Added `static flex-1` to `nav.nav-menu` for source match. Added explicit `h-8 transition` wrapper for `.u-nav-brand-logo`. Removed `gap-10 items-center` from `.nav-menu-inner` (flex justify-between only per source). |
| `foreplay-header-dropdown-base.tsx` | Shared shell for all 3 dropdowns. `.nav-dropdown` wrapper changed from `relative` → `static` (Foreplay override of Webflow's `.w-dropdown` default relative) — enables nav positioning context escape to `.nav-stack`. Added source-exact CSS: `top-full right-0 left-0 mt-[-5px] block min-w-full bg-transparent`. Open state: `z-[5] opacity-100 transform-none`. Button content wrapped in `.text-navlink` + `.icon-20` nested divs. |
| `foreplay-nav-link.tsx` | Text children wrapped in `<div class="text-navlink">` to match source DOM. |
| `foreplay-header-product-menu.tsx` | Consolidated to use `ForeplayHeaderDropdownBase` (removed 40+ lines duplicate state/effect/button code). Full DOM refactor per 100% source nesting. |

### Root cause findings

1. **CSS cascade — media query context matters.** Initial extraction was naive about media queries. For `.container.navbar-container`:
   - Desktop: `.container { max-width:1440px; padding:0 40px }` wins (comes after `.navbar-container { max-width:1340px }` in source)
   - Mobile (`@media ≤991px`): `.container.navbar-container { padding:0 8px }` applies
   - Box model at 1800px viewport: `1440 − 80 = 1360px` content width ✓ (matches DevTools)

2. **Positioning context escape mechanism.** Foreplay overrides `.nav-dropdown { position: static }` (Webflow default is `position: relative`). This makes the absolute `nav.nav-dropdown-menu` anchor to `.nav-stack` (nearest positioned ancestor) instead of the narrow button wrapper. Result: dropdown appears below ENTIRE header row, spans full nav-stack width, not just under the button.

3. **Banner visibility breakpoint.** `.nav-product-menu-banner { display: none }` on desktop base, only `display: flex` at `@media min-width: 1280px`. → Tailwind `hidden xl:flex`. This fixed the layout collapse bug on narrow viewports where banner was incorrectly shown, squeezing research items to single-character width.

### Token registration

| CSS var | Value | Usage |
|---|---|---|
| `--fp-border-nav` | `#2a2b30` | Nav dropdown border, section separators in all 3 menus |

### Product dropdown DOM (100% nested match)

```
.nav-product-menu-banner                hidden w-[384px] max-w-[364px] flex-none flex-col xl:flex
└─ .nav-product-banner-video            flex-col flex-1 items-center justify-start gap-5 min-h-[204px]
                                         px-6 pt-20 border-l
   ├─ .nav-banner-content                relative z-[2] flex-col items-center max-w-[200px] text-center
   │  └─ .text-white (flex:1)            flex-1 text-foreground
   │     └─ .u-nav-banner-title          flex items-center gap-[5px] whitespace-nowrap
   │        ├─ .icon-20 > .svg.w-embed   size-5 > w-embed > svg
   │        └─ .text-label-s
   └─ a.nav-lightbox.w-inline-block      relative w-full max-w-[240px] overflow-hidden rounded-[10px]
      └─ .hero-video-thumb               relative z-[3] flex h-[150px] w-full items-center justify-center
         ├─ <video>                       autoplay loop muted playsInline absolute inset-0 z-[-100]
         │                                object-cover (source: /video/...FOREPLAY_V6_mp4.mp4)
         └─ .div-block-356                size-[50px] rounded-full bg-white/50 backdrop-blur-[10px]
            └─ .icon-20.w-embed > svg
```

### Sprite CSS for nav-badges (Research + Analytics)

Converted `<img>` tag → CSS background sprite to match source. Each sprite sheet is N frames × 160×160, container is 88×88, applied `background-size: (N×88)px 100%` for uniform scaling.

| Badge | File | Frames | Source bg-size |
|---|---|---|---|
| Swipe File | `/foreplay/footer_2.webp` (8640×160) | 54 | `4752px 100%` |
| Discovery | `/foreplay/footer_1.webp` (9920×160) | 62 | `5456px 100%` |
| Spyder | `/foreplay/footer_3.webp` (4960×160) | 31 | `2728px 100%` |
| Lens | `/foreplay/footer_4.webp` (3360×160) | 21 | `1848px 100%` |
| Briefs | `/foreplay/footer_5.webp` (8800×160) | 55 | `4840px 100%` |

**Note:** `footer_1` and `footer_2` mapping swapped from previous (wrong) assignment — verified by frame count matching source CSS.

### Misc fixes

- **Extend descriptions visible on desktop.** `.nav-text-link-description.u-nav-text-secondary { display: none }` is mobile-only (`@media ≤991px`). Removed `hidden` from EXTEND descriptions ("Save ads from anywhere." etc.)
- **`.nav-badge-gradient` blue glow mechanism.** Blue glow on hover is `.nav-badge-gradient` div (blurred gradient, opacity 0 → group-hover:60). Source triggers via JS (data-frames attr), our clone uses pure CSS `group-hover:opacity-60`.
- **Line-height 20px for `.u-nav-sub-link` text.** Removed `flex-1` from `.text-white` and `.nav-text-link-description` wrappers inside `.u-nav-content` (source has flex:1 but it spreads text vertically inside 44px icon-box container — deviation intentional for visual tightness).
- **Video element.** Replaced placeholder with actual video file `/video/62a4...FOREPLAY_V6_mp4.mp4`. Video: `autoplay loop muted playsInline preload="auto" absolute inset-0 z-[-100] size-full object-cover`.

### DRY consolidation

All 3 dropdowns (Product/Solutions/Resources) now share `ForeplayHeaderDropdownBase`:
- Removed duplicate state/effect/button code from Product menu (used to have its own copy)
- Shared: positioning context escape, button with `.text-navlink + .icon-20`, nav animation, ESC/outside-click handling
- Each menu only provides its own `.nav-dropdown-menu-inner` content

### Verified DOM nesting for `.nav-product-menu-banner`

```
.nav-product-menu-banner
└─ .nav-product-banner-video (container for both children)
   ├─ .nav-banner-content (title "What is Foreplay?")
   └─ a.nav-lightbox (video)
```

**NOT** the incorrect sibling arrangement tried earlier. Verified via HTML closing-tag count: 4 closes after `"What is Foreplay?</div>"` → closes `[text-label-s, u-nav-banner-title, text-white, nav-banner-content]`, leaving stack `[banner, video]` → `<a>` opens as child of `video`.

## Tempmail Page (Phase 6 — UI-only) ✅

### Route
- `app/src/app/foreplay/tempmail/page.tsx` — 4 sections (Hero / Mail Viewer white block / FAQ / CTA)

### New Atom
- `foreplay-tempmail-viewer.tsx` — light-theme mail viewer for white block
  - Header: `ForeplaySectionHead variant="dark"` — title `var(--fp-solid-700)`, description `var(--fp-solid-600)`
  - Input row: naked layout, no wrapper card
  - Buttons: `rounded-[10px] p-2 fpText.headingM` (NOT pills)
    - Load = `bg-background text-foreground` (`.button-light.button-primary` pattern)
    - Random/Copy = white bg + `shadow-[0_0_0_1px_var(--fp-solid-50)]` ring
    - "Xóa tất cả" = red outline (`text-red-500` + ring `currentColor`)
  - Body grid 4/8: MailBox aside + Content section
    - `bg-[var(--fp-solid-25)] rounded-[20px]` (pricing-card radius)
    - `shadow-[0_0_0_1px_var(--fp-solid-50)]` ring border
    - Aside internal divider: `border-b border-[var(--fp-solid-50)]`
  - Reuses: `fpText.headingM/bodyM/bodyS/labelS`, `ForeplaySectionHead`
  - Standards refs: `docs/foreplay/design-guideline.md` (Buttons table, Color Palettes, CSS Token Standards) + `/foreplay/pricing` page

### Data
- `app/src/data/foreplay-tempmail-page-data.ts` — `tempmailHero` / `tempmailViewer` / `tempmailFaq` (7 items)

## Hero Refactor — KPI-Only Strip (no logos, no video)

Goal: replace original Foreplay hero's partner-logo grid + product demo video with a focused 6-stat KPI strip. Hero now ends after the KPI strip — no `.home-hero-middle` visual below.

### Modified
- `foreplay-home-hero-bottom.tsx` — `.home-hero-bottom` wrapper kept (relative + flex col + gap-10 + text-center + balance). Removed overline header entirely. Grid swapped 7-col × 2-row logo grid → **6-stat KPI grid** responsive `grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4`. Each cell: `fpText.displayH4` value (`text-foreground`) + `fpText.bodyS` label (`text-[var(--fp-alpha-50)]`), padding p-3 mirrors `.home-hero-logo-wrapper`. KPIs: `$50M+ Ad spend powered` · `99.8% Account uptime` · `<2hr Account delivery` · `1000+ Active agencies` · `24/7 Live support` · `47 Countries served`.
- `foreplay-home-hero.tsx` — removed `<ForeplayHomeHeroVideo />` from organism. Removed import. Parent class `pt-16 pb-0` → `pt-16 pb-20` (restored Foreplay rule0 80px bottom padding since video bleed gone). Updated header comment.

### Deleted
- `foreplay-home-hero-video.tsx` — `.home-hero-middle` wrapper no longer needed (no video, no bleed-down visual).
- `foreplay-account-dashboard-mockup.tsx` — short-lived dashboard mockup (rejected — too busy visually).

### Index
- Removed `ForeplayHomeHeroVideo` and `ForeplayAccountDashboardMockup` exports from `components/foreplay/index.ts`.

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
