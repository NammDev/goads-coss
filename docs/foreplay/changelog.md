# Foreplay Redesign — Changelog

## Fixes

| Date | File | Change |
|------|------|--------|
| 2026-08-14 | `product/hero.tsx` | Two additive props, both opt-in so every existing hero renders byte-identical. `actions?: ReactNode` takes the CTA slot inside `.product-hero-content` when a page needs more than the single default button (/rental ships 2 buttons + an escape-hatch pill); `hideCta` still wins over it. `description?` made OPTIONAL and conditionally rendered — leaving an empty `<p>` in `.hero-text` would still eat the block's 16px `grid-row-gap` under the headline. Verified against source: `.product-hero-content` gap 28px, `.hero-text` gap 16px/max-w 900px, `.product-hero` pt 10px, `.product-hero-icon` 256px w/ mt-40/mb-24 — all unchanged. |
| 2026-08-14 | `rental/rental-hero.tsx` | Bespoke centred hero → mounts `ProductHero` (text-only variant), so /rental opens like every other product page: Meta icon, overline, gradient `.text-display-h1.hero-title`, sticky scroll animation. No description (plan cards below carry the offer). Actions unchanged from the bespoke version via the new `actions` slot. Mount section dropped `overflow-hidden` — ProductHero is `position:sticky` and a clipping ancestor silently kills the animation. Measured vs /agency-ad-account: content gap 28px, pt 10px / pb 108px, overline 12px/16px w550 ls2px, title 60px/68px w600 ls-0.45px — identical on both. |
| 2026-08-14 | `(marketing)/rental/page.tsx` | Pulled the /agency-ad-account composition from the use-case carousel down to the final CTA onto /rental: `ProductUseCaseCarousel`, `ProductPageFeatureTabs` + `HomeChromeExtension`, 2× `ProductPageFeatureGridCards` + 2× `ProductPageTestimonial`, `ProductPageCtaCard`. `HomeCta` was brought over too then dropped — the page already closes on `ProductPageCtaCard` + the buy/rent `CrossLinkPanel`, so a third closer stacked three CTAs above the footer. Images referenced from `/public/agency-ad-account/` (not copied — one source of truth). Copy rewritten in `data/rental-showcase-data.ts`: the agency wording carries a $10K/mo minimum, provider-side top-ups and an open fee, all three contradict the plan table. Agency FAQ deliberately NOT brought over — /rental has its own, accurate to the tier data. |
| 2026-08-14 | `docs/foreplay/extract-css.sh` | Fixed two Windows breakages: hardcoded `python3` (resolves to the MS Store stub → exit 9009, no output) now probed from python3/python/py; `open()` without encoding (cp1252 → UnicodeDecodeError on the minified bundle) now explicit utf-8. |
| 2026-05-18 | `temp-mail-viewer.tsx` | /tempmail UI refine (Foreplay light, sits in always-white block). Email input: dropped literal `0/30 @ <domain>` suffix spans → domain now a placeholder hint `email@<domain>`; removed `dark:` variants on input wrapper (was flipping dark via global `.dark`/next-themes → root cause of "lúc bị lúc không" mismatch). Load/Random/Copy restyled to Foreplay spec: `h-12 rounded-[10px] px-5 font-[550] text-[0.9375rem] leading-5`, Load = solid-900/white, Random+Copy = solid-25 + solid-50 hairline. Logic untouched. Note: inbox sidebar/mail-list still carry ~40 `dark:` variants (out of scope — same theme-flash risk remains there). |
| 2026-05-15 | `foreplay-home-hero.tsx` | Hero copy → "Premium Meta Assets" / "Built for Winning Campaigns" (2-line hard break). Restored `.home-hero-top` `pb-20` (80px) to match Foreplay desktop base (was deviated to `pb-10`). |
| 2026-05-15 | `foreplay-hero-content.tsx` | `renderTitle()` — split string title on `\n` → `<br/>` so intentional line breaks survive HTML whitespace collapse. DOM/CSS unchanged. |
| 2026-05-15 | `foreplay-platform-logos.tsx` | Hero logo strip: `GoogleLogo`→`FacebookLogo` (simple-icons glyph, #1877F2), `TikTokLogo`→`InstagramLogo` (simple-icons glyph, official IG gradient). `MetaLogo` unchanged. Updated `index.ts` + `foreplay-home-hero-bottom.tsx`. Note: separate `assets/svg/ad-platform-logos.tsx` set untouched. |
| 2026-05-15 | `foreplay-home-cta.tsx` | Replaced Foreplay stock 2-people-laptop banner with custom GoAds cinematic image (`/foreplay/goads/goads-cta-command-center.webp`, AI-gen Nano Banana Pro, 3:2). Final: cute chibi GoAds panda mascot (lightning-bolt glasses) at Space Black MacBook, GoAds dashboard w/ KPIs. Color-graded black point to exactly `#020308` (`.foreplay` --background) so bleeding edges blend seamlessly — no seam. width/height 1440x966. |
| 2026-05-15 | `foreplay-home-sharing.tsx` | Fixed vertical whitespace imbalance: `py-20` → `pt-24` (matches original Foreplay `.home-sharing` base: padding-top 96px, NO padding-bottom). Removes extra ~80px bottom gap. iPad/content untouched. |
| 2026-05-15 | `foreplay-home-sharing.tsx` | Replaced Foreplay stock hands-iPad mockup with custom GoAds-branded floating tablet dashboard (`/foreplay/goads/goads-portal-tablet-mockup.webp`, AI-gen via Gemini Nano Banana Pro, 1:1). Re-rendered on PURE WHITE bg (no dark scene/bokeh) to blend into the `.section-white-block` Collab section like original asset. 59KB webp. Slot layout/aspect unchanged; same filename so no code edit on re-gen. `blog-detail-content.tsx` still uses old asset (intentional). |

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

## Docs Breadcrumb — Pixel-Perfect Pass (260514)

| File | Change |
|------|--------|
| `components/docs-breadcrumb.tsx` | SVG gets `className="secondary-svg"` (chevron now uses muted icon color, not inherited muted-foreground). Link className reordered to match Foreplay source verbatim + adds `dark:decoration-foreground/30`. **`<ol>` gets `sm:py-2`** to replicate Foreplay's global `@media (min-width: 640px) { ol { padding: .5rem 0 } }` (8px top/bottom on sm+). Local instead of global to avoid affecting markdoc `<ol>` in articles. |
| `app/globals.css` | New `.foreplay .secondary-svg` rule: `height/width: 1rem; color: hsl(var(--background-accent))`. Parent's `[&>svg]:size-3.5` overrides size → chevrons stay 14×14; color cascades to chevron `fill="currentColor"`. |

Verbatim spec (from user-provided Foreplay HTML, route `/docs/.../what-is-agency-account`):
```html
<div class="pb-6 md:pb-3">
  <nav class="!list-none !p-0" aria-label="breadcrumb">
    <ol class="flex truncate items-center !px-0 !list-none gap-1 break-words text-sm text-muted-foreground sm:gap-x-2">
      <a class="transition-colors hover:decoration-foreground/30 dark:decoration-foreground/30 decoration-foreground/30 !text-foreground/80 font-normal hover:text-foreground truncate max-w-20 md:max-w-none" href="/">Home</a>
      <li role="presentation" aria-hidden="true" class="[&>svg]:size-3.5 !m-0"><svg class="secondary-svg">…</svg></li>
      ...
      <li class="inline-flex !text-[13px] items-center gap-1.5 !m-0 truncate">
        <span role="link" aria-disabled="true" aria-current="page" class="!font-medium text-foreground truncate max-w-20 md:max-w-none">{title}</span>
      </li>
    </ol>
  </nav>
</div>
```

Component is used in 2 locations and propagates automatically:
- `app/docs/[[...slug]]/page.tsx:107` — tab index page (wrapper `pb-5`)
- `app/docs/[[...slug]]/page.tsx:253` — article page (wrapper `pb-6 md:pb-3`)

## Docs Article Body — `w-full installation-content` Wrap (260514)

| File | Change |
|------|--------|
| `app/docs/[[...slug]]/page.tsx:305` | Markdoc body wrapper class order swapped to `w-full installation-content` (matches Foreplay source verbatim). |
| `app/content/docs/what-is-agency-account/index.mdoc` | Heading hierarchy realigned: section names ("1. Research Products" etc.) promoted h3→h2; product names promoted from `**bold**` to `### h3`. Intro 3-item list changed from `-` (ul) to `1./2./3.` (ol) with **bold** keywords ("Research", "Analysis", "Production"). |
| `app/globals.css` | Missing `.installation-content` rules added to match Foreplay verbatim: |

Missing rules now present:
```css
/* p body text — relaxed line-height (was 1.5rem, now 1.625 unitless) */
.installation-content p { line-height: 1.625; }

/* Ordered list container */
.installation-content ol {
  padding-left: 2rem;
  padding-top: 0.75rem !important;
  padding-bottom: 0 !important;
  list-style-type: decimal;
}

/* Ordered list items — white text in dark mode (goads is dark-only) */
.installation-content ol li {
  font-size: 1rem;
  line-height: 1.5rem;
  color: hsl(var(--foreground));
}
```

Already in place (verified):
- `.installation-content > * { margin: 32px auto; }`
- `.installation-content > p + ol/ul { margin-top: -20px !important; }`
- `.installation-content h1..h6 { scroll-margin-top: 3rem !important; font-weight: 600; }`
- `.installation-content h2 { margin-top: 4rem; }`

Known gap (not addressed): Foreplay applies inline `color: rgb(8, 145, 178)` (cyan-600) to the bold keywords inside the intro `<ol>` via inline `<span>` styles. Markdown can't express inline color natively; would require a Markdoc tag or HTML passthrough. Structural bold via `**Research**` is present so editorial weight already shows.

## Docs Article — Critical Markdoc `<article>` Unwrap (260514)

**Root cause of broken Foreplay spacing:** Markdoc's default `document` node renders as `<article>` (see `@markdoc/markdoc/dist/index.js:7879` → `document = { render: "article" }`). This silently wrapped all content in an `<article>` element:

```html
<!-- Before fix — broken: -->
<div class="w-full installation-content">
  <article>                ← unwanted wrapper
    <h2>TLDR</h2>
    <p>Foreplay is...</p>  ← grandchild, not direct child!
    <ol>...</ol>
  </article>
</div>
```

Because `<p>`, `<ol>`, `<h2>`, etc. were grandchildren (not direct children) of `.installation-content`, the `.installation-content > * { margin: 32px auto }` selector only matched the `<article>` element — leaving every paragraph, list, and heading collapsed against its siblings with **zero block spacing**. DevTools confirmed: the `> *` rule was absent from `<p>` rule-cascade panels.

| File | Change |
|------|--------|
| `lib/markdoc-renderer.tsx` | `MarkdocRenderer` now detects the `<article>` wrapper returned by `Markdoc.renderers.react()` and unwraps it via `tree.props.children`. Resulting DOM matches Foreplay's verbatim: `.installation-content > p` direct child. |

```html
<!-- After fix — matches Foreplay: -->
<div class="w-full installation-content">
  <h2>TLDR</h2>
  <p>Foreplay is...</p>  ← direct child, 32px margin applies ✓
  <ol>...</ol>
</div>
```

This single 8-line renderer change unblocks every `.installation-content > *` rule (32px block spacing, heading→p tightening, p→ol pull-up, first/last-child margin reset) — they all now have something to match.

Foreplay's article body structure (verbatim from `/docs/getting-started/what-is-agency-account`):
```html
<div class="w-full installation-content">
  <h2 class="heading-with-copy">TLDR</h2>
  <p>...</p>
  <ol><li><p>...</p></li>...</ol>
  <h2>Foreplay's Apps & Products Overview</h2>
  <h2>1. Research Products</h2>
  <h3>Swipe File - Save ads from anywhere</h3>
  ...
</div>
```

## /foreplay/tools — Logo Carousel Animation Fix (260514)

**Bug:** The infinite logo marquee in `/foreplay/tools` hero stopped scrolling silently.

**Root cause:** `globals.css` keyframes used `var(--marquee-gap)` with no fallback:
```css
@keyframes marquee-horizontal {
  to { transform: translateX(calc(-100% - var(--marquee-gap))); }
}
```
When `--marquee-gap` is undefined (as in our carousel), `var(--marquee-gap)` resolves to an empty string → `calc(-100% - )` is **invalid CSS** → the entire `transform` declaration is dropped → animation has no end state → carousel doesn't move.

| File | Change |
|------|--------|
| `app/globals.css` | Both `marquee-horizontal` and `marquee-vertical` keyframes now use `var(--marquee-gap, 0px)` fallback. No more silent calc failure when gap is undefined. |
| `components/foreplay/foreplay-solution-logo-carousel.tsx` | Sets `--marquee-gap: 0px` + `--marquee-duration: ${props}s` via inline style so the values are guaranteed defined at the element. `aria-hidden="true"` on the duplicated logo row so screen readers don't announce each brand twice. `motion-safe:` prefix on animation so `prefers-reduced-motion: reduce` users get a static row. Empty `alt=""` on the duplicate row's images. |

Verbatim Foreplay carousel spec (verified from `foreplay-source.css`):
- `.industries-carousel-container`: `flex justify-between overflow-hidden pt-16 pb-6 relative`
- `.industries-carousel-logos`: `flex justify-around items-stretch min-w-full`
- `.industry-carousel-image`: `100×100`, `border 1px #ffffff29`, `rounded-[20px]` (desktop); scales to 65px tablet, 50px mobile
- `.industries-carousel-fade`: `linear-gradient(90deg, bg, transparent 15%, transparent 85%, bg)` overlay

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

- [x] Clone 404 / not-found page ✅ (`app/src/app/not-found.tsx` — reuses ForeplaySectionHead + ForeplayCtaButton; gradient 404, skittles video, Return Home; renders for all unmatched routes)
- [x] Re-clone contact-channel card (Telegram/WhatsApp/Email) to `.home-winning-card` spec ✅ (`foreplay-contact-channels.tsx` — rounded-[24px], `shadow-[0_0_0_1px_var(--fp-solid-50)]` hairline ring, p-6, gap-6, icon tile rounded-[12px] + alpha-600 border, cubic-bezier(.19,1,.22,1) transition)

- [x] Align /book-demo to Foreplay theme ✅ (260604) — DemoHero title → `siteText.displayH2` (responsive Inter Display scale); `.demo-hero` padding 64/80 → 120px (Foreplay) w/ 80 tablet / 64 mobile; `.demo-hero-top` pb-12 → pb-10 (≈logo-grid mt 40px); `.demo-socialproof` py-20 → py-16 (Foreplay 64px); Senja review card recolored to `--solid-*` tokens (border `--solid-100`, name `--solid-900`, body/date `--solid-700`/`--solid-400`) + Inter tracking `-0.01125em`. Content + marquee animation unchanged.

- [x] Refund/Warranty policy typography → Foreplay tokens ✅ (260605) — /refund-policy headings were oversized (h3 24px + h4 18px, semibold). Rescaled to Foreplay rich-text tokens: section h3 → headingL 1.125rem/leading-6/font-550, sub h4 → 1rem/leading-6/font-550, body/li 1rem, tracking -0.0144em/-0.01125em; tightened margins (p my-3, hr my-6). solid-900 for headings/strong/links.

- [x] Privacy Policy rewrite + Foreplay typography ✅ (260605) — replaced legacy Foreplay copy (hello@foreplay.co, Chrome-extension refs) with GOADS privacy policy (6 sections: Information We Collect, How We Use Information, Acceptable Use, Data Security & Retention, Policy Updates, Contact). Prose rescaled to match /refund-policy: h3 → headingL 1.125rem/font-550, body/li 1rem, hr separators, solid-900 headings/strong/links. Also removed /terms-of-service page + all its links (footer, sitemap).

- [x] Mobile menu CTA button height → Foreplay spec (260605) — "Contact Us" pill was rounded-[12px] px-4 py-3 (too tall). Set to .button-dark spec: rounded-[10px] p-2 font-semibold.

## Giveaway Route `/giveaway` — Foreplay MCP UI Clone (260616) ✅

Content-only clone of `foreplay.co/mcp` into a new marketing route (200 free aged Facebook pages). Pixel target: `Screenshot 2026-06-16 182639.png` (hero + tabs + 3-step grid) + `182650.png` (alternating feature rows).

### Source-of-truth note
- Vendored `foreplay-source.css` (bundle `be2f89f77`) PREDATED the MCP page → `.mcp-*`/`.tabs-2` classes absent. Pulled the LIVE bundle `foreplay-3-0.shared.4bb351b52.min.css` → saved as `docs/foreplay/html/foreplay-source-latest.css` (canonical going forward). Exact rules extracted to `plans/260616-1827-giveaway-route/research/researcher-03-exact-mcp-css.md`.

### New components (`app/src/components/giveaway/`)
| Component | Foreplay class | Notes |
|-----------|---------------|-------|
| `giveaway-hero.tsx` | `.product-hero` / `.api-hero-content` / `.mcp-tag` | Dedicated hero (tag pill + 2 CTAs, no preview). Reuses `useHeroScrollAnimation`. NOT extending ProductHero. |
| `giveaway-method-tabs.tsx` | `.mcp-tabs-menu` / `.mcp-tab-link` | Telegram/Discord segmented control. Active `.w--current` = `--alpha-700`; hover `--alpha-800`. Presentational, isolated (removable for single-grid). |
| `giveaway-claim-steps.tsx` | `.tabs-2` / `.mcp-steps-grid` / `.mcp-steps-wrapper` | Client; owns tab state; 3-step grid (same steps both panes) + urgency + progress. |
| `giveaway-step-chip.tsx` | `.mcp-steps-button` / `.div-block-362` | link chip (external + chevron) / copy chip (clipboard + "Copied!" 1.5s). |
| `giveaway-progress-bar.tsx` | (NEW — not in source) | Deterministic auto-increment `min(cap, base+floor(elapsedHours*rate))`, 60s tick, hydration-safe (base on first render). track `--alpha-700` / fill `foreground`. |
| `giveaway-feature-rows.tsx` | `.lens-gamification-grid/-content/-illustration` | 4 alternating rows (DOM-order flip), white block. Reuses SectionWhiteBlock/Container/Head + CtaButton `light-stroke`. |

### Token map (no hex in JSX)
`var(--_lens---neutral-700)`/`#ffffff1f` → `--alpha-700` (10%); `#ffffff14` → `--alpha-800` (6%); `#fff0` → transparent; white → `foreground`; subtitle/body muted → `--alpha-100` (68%).

### Reused atoms
`CtaButton` (hero/secondary/light-stroke), `SectionContainer` (wide/section), `SectionWhiteBlock`, `SectionHead` (left-align via className), `DotBg`, `useHeroScrollAnimation`, `siteText`/`SITE_HERO_GRADIENT`.

### Data + route
- `app/src/data/giveaway-page-data.ts` — all copy + links (`"#"` placeholders) + progress config.
- `app/src/app/(marketing)/giveaway/page.tsx` — composes Hero+Steps (dark) → FeatureRows (white) → HomeCta; metadata + canonical + OG.

### Modified
- `home/cta.tsx` — parametrized with OPTIONAL props (title/description/primary*/secondary*/imageSrc) defaulting to original literals; secondary CTA renders only when label provided. All 14 existing `<HomeCta />` usages unchanged.

### Deviations / placeholders (fine-tune later)
- KEPT the MCP tab switcher for fidelity, repurposed as Telegram/Discord (same 3 steps both panes).
- Telegram/Discord links = `"#"`; feature-row images = `/assets/giveaway/row-1..4.webp` placeholders; `ratePerHour: 1` (tune to giveaway window).

### Hero pixel-rebuild (260617) — `giveaway-hero.tsx` rewritten 1:1 vs `mcp-hero.css`
Source-of-truth = user-provided `docs/foreplay/html/mcp-hero.css` (focused exact CSS) + `mcp-hero.html` + `Screenshot 2026-06-16 182639.png`. Rebuilt the `.product-hero` block to match source DOM verbatim: `.product-hero` (pt-[10px] pb-0 col center) → `.product-hero-sticky` (sticky top-[100px]) → `.api-hero-content` (gap-7 pb-[42px]) → `.mcp-tag` (gap-1 rounded-full bg-[var(--alpha-700)] py-1.5 pr-2.5 pl-1.5 + icon-24 placeholder + label-m "MCP") + `.hero-text` (max-w-[900px] gap-4: displayH1 gradient title + max-w-[512px]/alpha-100 body-l subtitle) + `.main-cta-buttons` (z-[2] gap-3: CtaButton hero "Start now" + secondary "View Pricing"). Verified: `max-w-site`=1440px and `--alpha-700`=#ffffff1a=neutral-700 (exact). `.text-white-84` has NO CSS rule in bundle → subtitle correctly inherits alpha-100 (68%). **Original Foreplay copy kept temporarily for pixel verification — content swaps to giveaway next.** Build + lint clean.
- [x] /pricing legal disclaimer block → Foreplay tokens (260616) — added advertising-only liability notice below catalog table. Refined to spec: centered box max-w-[640px], px-8 py-6 (mobile px-5 py-5), rounded-2xl, border `--alpha-700` (10%), bg `--alpha-900` (3%); text `siteText.bodyS` leading-6 `--alpha-100` (68%), emphasis "ADVERTISING" font-550 `--alpha-25` (92%). Replaced ad-hoc hex with alpha tokens.

### BM5 upgrade configurator (260704) — /pricing setup upgrade flow
New dark-Foreplay dialog: Premium/Elite setups (include "BM5 Verified $250") open a configurator before add-to-cart to pick BM5 $250 vs **BM5 Verified Unlimited** (+$60 per BM5). Premium (1× BM5) = +$60 → $710; Elite (2× BM5) = +$120 → $1010.
| File | Role |
|------|------|
| `data/bm5-upgrade-data.ts` | `BM5_UNIT_UPCHARGE=60`, comparison rows ($250 vs Unlimited), option labels. Specs drafted, confirm with support. |
| `pricing/bm5-comparison-table.tsx` | 3-col grid (feature / $250 / Unlimited). Unlimited col emphasized: `--alpha-800` tint + full-white text + check dot on winning rows. Hairlines `#ffffff1a`/`#ffffff0f`. |
| `pricing/setup-configurator-dialog.tsx` | Radix Dialog (reuses `ui/dialog`), `sm:max-w-[680px]`, dark bg-background. 2 radio option cards + comparison + live total (strikethrough base when upgraded) + `CtaButton` hero confirm. |
Wiring: `pricing/card.tsx` — added `upgrade?: { bm5Count }` to `PricingCardData`; when present the CTA opens the dialog; confirm calls `addItem({ name: "<Plan> (BM5 Unlimited)", price: total })` (distinct cart line from base). Tokens: `siteText`, `--alpha-*`, `CtaButton`. tsc + lint clean (0 errors).
- Fix (260704): dialog portals to `<body>` outside `.site`, so Foreplay tokens (`--primary`, `--alpha-*`, `--background`) were undefined → hero "Add to cart" button turned blue+white-text and vanished on hover. Added `site` class to `DialogContent` (same pattern as `command-menu.tsx`) to re-scope tokens. Added "Stability" comparison row (Unlimited = stronger & more stable).
- Polish (260704): configurator popup was sinking into the near-black page. Recomposed from raw Radix (not ui/dialog) for backdrop control: darker+blurred backdrop (`bg-black/70 backdrop-blur-sm`) so the page recedes; ELEVATED panel surface (gradient `#14171f→#0c0e15`, one step lighter than page `#020308`) + `border-white/12` + soft shadow + faint `ring-white/4` top highlight. Kept `site` token scope + added top-right close X.
- Generalized (260704): setup upgrade configurator is now data-driven via `UpgradeOffer` (base/upgraded labels, per-unit upcharge, comparison rows) in `bm5-upgrade-data.ts`. Renamed `bm5-comparison-table.tsx` → `upgrade-comparison-table.tsx` (props-driven). Advanced Setup now offers BM3 Verified → BM5 Verified Unlimited (+$200); Premium/Elite keep BM5 $250 → Unlimited (+$60/BM). Card `upgrade` shape changed to `{ offer, count }`.
- Feature (260704): product detail drawer now supports an optional paid add-on (`ProductDetail.addon`). Both BM5 products (BM5 Verified $250 DSL and Unlimited DSL) offer "Original profile (the profile that created the BM)" for +$50, a checkbox card with benefit copy (backup if Meta rolls back the BM and kicks all admins, the original profile's admin remains). Toggling updates the cart total + line name.
- Feature (260704): setup configurator dialog now also offers the "Original profile" backup add-on (ORIGINAL_PROFILE_ADDON, $50 per included BM) on all 3 setups (Advanced/Premium/Elite), a checkbox card below the comparison. Total combines the BM upgrade + add-on; cart line name lists both tags (e.g. "Elite Setup (BM5 Unlimited, Original profile)"). Base price shown struck through whenever total exceeds it.
- Feature (260704): setup configurator dialogs now show live bundle savings vs à la carte. Each setup declares `retailPrice` (sum of item retail: profile $50, aged page $35, BM3 $180, BM5 $250 $340; Elite 10K page $110). Offers carry baseUnitRetail/upgradedUnitRetail; add-on carries unitRetail. Dialog computes alaCarte + savings live as upgrade/add-on toggle, renders a green "You save $X (Y%)" banner + strikethrough à la carte in the total. Base savings: Advanced $65, Premium $175, Elite $305.

## Portal (customer dashboard) — Foreplay admin-style redesign (260707)

Reference: `docs/foreplay/admin/` (Foreplay app dashboard). Signature = dark sidebar (fixed) + light/dark themeable content. Compact: radius 10px, Inter 14px, no Inter Display.

- **Design foundation** (`globals.css`): added `.portal` token scope — content tokens (light) + `.dark .portal` (dark) + sidebar tokens pinned dark (not redeclared in dark, so sidebar stays dark both themes). Primary = admin green `#009f6d`. Applied via `<div class="portal {fontInter.variable} font-sans">` in `portal/layout.tsx`. Reuse-first: token remap → existing shadcn components adopt the look (no new primitives).
- **Shell & nav**: `portal-nav.ts` reduced to 5 tabs (Orders · Wallet · BM · Profile · Page; BM/Profile/Page badge = delivered count). Removed old routes — deleted `portal/tools`, `portal/products/page.tsx`, `portal/products/[type]/[id]`; `/portal` → redirect Orders. Community route kept (admin links into it), removed from nav. In-page `ProductTypeTabs` removed from portal products layout.
- **Dense table**: `AdminDataTable` gained `dense` (tighter rows h-10 + subtle hover, base-table admin look) + `onRowClick` (row → detail). Enabled on all portal tables.
- **Data layer**: `getOrdersWithItemsByCustomerId` (PortalOrderRow: order + items[]), `getDeliveredItemsByTypeDetailed` (PortalDeliveredRow: product name JOIN, decrypted credentials, note/checkLive extracted). No DB migration — `note`/`checkLive` live in credentials JSON.
- **Orders tab**: 5 cols — Order Time · Order (list `Nx <name>`) · Revenue · Status · Delivered Time. Row click → detail.
- **BM/Profile/Page tabs**: per-type column specs (Profile: Check Live·Note·UID·Password·2FA; BM: Noted·Business Name·ID BM; Page: Note·Page Name·Page ID·Link) + Warranty + Copy kept. `credential-schemas` gained optional `note` (bm/profile/page) + `checkLive` (profile) → admin deliver dialog auto-renders these inputs. Shared `buildPortalProductColumns` gained `variant: 'portal' | 'admin'` (admin keeps status badge + all creds); row type unified to `SerializedDeliveredRow`.
- **Cleanup**: removed dead `data/mock-delivered-items.ts`. No hardcoded hex in portal JSX; theme via tokens.

## /pricing footer panel → service notice + warranty (261108)

`.pricing-footer` (`components/pricing/footer-cta.tsx`) repurposed from the agency-partner pitch to the service notice. DOM/layout untouched and re-verified against `foreplay-source.css`: `.pricing-footer` border 1px neutral-600 + radius 20, `.pricing-footer-enterprise` gap 20 / min-w 320 / max-w 368 / p 20-24-24, `.pricing-footer-extra` gap 40 / justify-between / p 32-24, `.pricing-footer-extra-list` gap 12, `.pricing-footer-extra-list-item` gap 8 + **align-items:center**.

- **Content**: left column `SERVICE UPDATE` overline + one line on native ad accounts being unstable → h4 "Every setup now runs on agency ad accounts" → `Talk to Sales`. Right column: 2-line lead, then one row per asset type carrying the warranty, then a disclaimer.
- **Warranty source**: rows read `GOADS_WARRANTY_TERMS` (`data/pricing-setups-data.ts`), shared with the page FAQ answer and the setup configurator's table, so the four numbers exist once.
- **Typography fixes** (text scale re-checked against source: `.text-overline` 12/550/16 + tracking .166667em, `.text-label-s` 14/500/20, `.text-body-s` 14/400/20, `.text-display-h5` Inter Display 24/600/32 — all match `siteText`):
  - Lead paragraph cut from 4 lines to 2. The slot is `.text-label-s`; at 4 lines of 500-weight it read as a wall and competed with the rows below.
  - Label:value rows use the system's own steps — asset `.text-label-s` + `text-foreground`, term `.text-body-s` + `--alpha-100` — replacing an invented `font-[550]`. Both are 14/20 so they share a baseline.
  - Restored `items-center` on list items per source CSS (an earlier `items-start` was a guess for wrapping that does not occur at this width).
  - Closing disclaimer dropped `.text-label-s` → `.text-body-xs`. Deliberate deviation: the source slot held a trust claim, this is fine print, and at label-s it tied with the lead paragraph. `.text-body-xs` is what the configurator already uses for the same job.
- **Tokens**: raw `#ffffff29` → `var(--alpha-600)` (identical value) across border + both dividers, and `text-white` → `text-foreground`. Matches the two sibling panels in the same stack (`CustomSetupCta`, `CrossLinkPanel`) and clears the no-hex-in-JSX rule.

## SectionHead badge + "New update" flag on /pricing (261108)

- **`SectionHead`** gained optional `badge` + `badgeHref`. Pill reuses the existing Meta-gradient highlight (`rental-plan-card` "Recommended", `CrossLinkPanel`) and `.text-overline` — the one scale step that owns uppercase — so it does not invent a letter-spacing. It sits on a centred flex row with the subtitle (`gap-2.5`, matching CrossLinkPanel's overline/badge pair), wrapping on narrow widths. Both props optional, so the 20+ existing `SectionHead` usages are untouched.
- **`/pricing`**: `badge="New update"` beside the `PRICING` overline, linking to `#service-update`. The notice panel is wrapped in `<div id="service-update" className="scroll-mt-24">` so the jump clears the sticky 72px header. The pill is a way into the explanation rather than decoration — a badge flagging news the visitor then cannot find is noise.
- **Token cleanup across the /pricing panel stack**: `CustomSetupCta` moved off raw `#ffffff29` onto `var(--alpha-600)` (identical value). All three panels in the stack — `CustomSetupCta`, `CrossLinkPanel`, `PricingFooterCta` — now paint their hairline from the same token.

> NOTE: /pricing now carries two gradient pills — "New update" in the section head and "New" on the `CrossLinkPanel` pointing at /rental. CrossLinkPanel's own doc warns that the badge stops meaning anything when it appears on both sides of a pair; the same dilution risk applies here. Left as-is pending a call on which one keeps the badge.

## /tools promo rail — rent vs buy (261108)

New `components/tools/promo-rail.tsx`, mounted by `ToolShell`, so every tool sub-route (`/tools/bookmark`, `/2fa`, `/check-ip`, `/check-uid`, `/split-data`, `/chrome-extension`) carries it. The `/tools` landing page has its own layout and is untouched.

- **Why there**: the free tools are the top of the funnel — someone on `/tools/bookmark` already runs Business Managers, which is exactly who needs ad accounts, and nothing on those pages said GOADS sells any. The rail fills the empty gutter beside the tool panel rather than interrupting the tool.
- **Two offers**, one card each: **Rent** → `/rental` (badged `New`, the less expected of the pair) and **Buy once** → `/pricing`.
- **Prices are derived, never typed**: `LOWEST_MONTHLY_FEE` (already existed in `rental-page-data.ts`) and a new `LOWEST_SETUP_PRICE` in `pricing-setups-data.ts`, computed as the min across `goadsSetupCards`. Mirrors the rental pattern, so a tier change cannot leave a stale "from $X".
- **Responsive**: `ToolsPromoRail` is a 280px sticky right rail at `xl+` (`top-28`, same offset as `ToolsSidebar`, so both rails hold position together). Below `xl` there is no room for a third column, so `ToolsPromoStacked` renders the same two cards under the tool instead — 2-up from `sm`, 1-up below. Neither disappears silently.
- **Brand gate**: both return `null` when `brand.toolsOnly` — the ToolFB/adstoolkit build is brand-neutral and must not carry GOADS product advertising.
- **Paint reuses the bordered dark card** from the `/rental` benefits grid (16px radius, `--alpha-700` hairline, `--alpha-900` fill), typography from `siteText` only (`overline` / `displayH5` for the price / `bodyS` / `labelS` / `labelL`), and the `New` pill is the same Meta gradient as the rental cards' "Recommended". No new visual language.

> Layout note: the rail sits at the right edge of the 1440px `max-w-site` container. On wider viewports the black area beyond that is the page gutter — content there would sit outside the design grid, so the rail stops at the container edge by design.

## Catalog tier cull + promo rail illustrations (261109)

- **Business Manager category trimmed to what is actually sold.** Removed `BM1 Verified` ($80) and `BM3 Verified` ($180) — both already flagged out of stock — plus the contact-only `BM100` and `BM2500` rows. `BM50` stays. Category is now BM5 Super Aged · BM3 WABA · BM10 Verified · BM50.
- Removed in lockstep so nothing points at a dead row: the `bm3` buildable in `custom-setup-data.ts` (its `catalogName` referenced a row that no longer exists, so the price-drift check it documents could never pass), the orphaned `BM1 Verified` / `BM3 Verified` entries in `product-details-data.ts`, and `bm3ToBm5UnlimitedOffer` in `bm5-upgrade-data.ts` (an offer to upgrade *from* a tier we do not sell).
- **Promo rail prices read `From $499 /mo` and `From $625 one-time`.** "From" is literal, not marketing — both are the minimum across their tiers via `LOWEST_MONTHLY_FEE` / `LOWEST_SETUP_PRICE`. Rendered in body-s alpha-100 on either side so the number stays the headline.
- **Promo cards gained illustrations**, reusing the `/rental` feature-grid art and its exact treatment: full-bleed 2:1 image, `group-hover:scale-[1.04]` over 600ms `cubic-bezier(0.19,1,0.22,1)`, plus the radial light sheen from the top. Border never changes on hover. Rent → `Fast Replacement SLA.webp` (a dimmed profile swapped for a live one, which is the same-day replacement the body promises). Buy once → `Multi-Account Structure.webp` (an admin profile with the accounts linked beneath it, i.e. the stack you own). No new assets added — both already ship in `public/`.

> Still open: `BM3 WABA 250 limit (WhatsApp API)` ($150, in stock) keeps "BM3" in its name even though the BM3 tier is gone. It is a different product (WhatsApp API), so it was left alone — rename or retire is a business call.

## Promo row on /tempmail + Elite topology correction (261109)

**Promo generalised.** `ToolsPromoStacked` → `ToolsPromoRow({ className, centered })`. Visibility and width are now the caller's call rather than baked in:

- `ToolShell` passes `className="xl:hidden"` — unchanged behaviour, the row only shows where the rail cannot fit.
- `/tempmail` has no rail (it is a full-width marketing page, not a `/tools/(panel)` route), so it renders the row as its own section between the mail viewer and the FAQ: `className="mx-auto max-w-[960px]" centered`. Capped at 960px because at full container width each 2:1 card image stands ~340px tall and starts reading as the page's main event instead of a footnote to it. `centered` matches the page's other section heads.
- Heading copy moved to `PROMO_TITLE` / `PROMO_BODY` consts so the rail and the row cannot drift.

**Elite Setup topology was wrong and is fixed.** It modelled two independent BMs with 2 ad accounts each. The real structure is a **pixel bank** (BM5 holding only profiles, whose job is to create and warm the pixel) feeding a **scaling BM** (the other BM5, carrying every ad account and page). The bank deliberately holds no ad account — that is what keeps the pixel clear of whatever happens to the account that spends.

- `pricing-setups-data.ts`: pods are now `Pixel Bank` (isBank, 2 profiles) + `Scaling` (2 profiles, 4 ad accounts, 2 pages) with `bridgeLabel: "pixel sharing"`. Card description, feature lines, intro and the four "how it works" steps rewritten to match.
- `custom-setup-data.ts`: the Elite preset seeds the same shape, so "Build your own setup" opens on the Elite the card describes.
- **Counts and prices unchanged**: 2 BM5 + 4 ad accounts + 4 profiles + 2 pages = $2,050 à la carte, $1,840 bundle, Save $210. Only the distribution across the two BMs changed.

## /tempmail adopts the tools shell layout (261109)

The promo first landed under the mail viewer as its own section, then briefly inside the white block with a light palette. Both were wrong: the ask was the **tools layout** — tool in a white panel, promo riding the dark page background beside it.

- `/tempmail` section 2 restructured to mirror `ToolShell`: `SectionContainer variant="wide"` → `flex gap-8` → `[white block + xl:hidden row]` and `ToolsPromoRail` as a dark sibling. Markup now matches `/tools/*` exactly (same rail `aside`, same `xl:hidden` fallback row, same 8 dark card instances).
- **The white block is contained now, not full-bleed.** There is no room for a rail beside an edge-to-edge block. Inner padding drops `py-[108px]` → `p-8 max-md:p-5`, the tool-panel rhythm, since a contained card does not need section-sized padding inside it.
- **The `light` tone added in the previous step was removed again.** With the promo back on the dark background it was never painted on white, and an unused second palette is just a second thing to keep in sync. `PromoTone` / `TONE` gone; cards are single-palette again.

> Note for the dark/light question if it ever returns: `SectionWhiteBlock` is always white and does **not** re-scope the token set, so `--alpha-*` (white at 3–10%) is invisible inside it. Anything placed in a white block has to be built from `--solid-*`.

## Catalog edits: BM10 $790, BM3 WABA + Monetized Page retired, BC30 $590 (261109)

| Change | Rows touched |
|---|---|
| `BM10 Verified (Unlimited DSL)` $999 → **$790** | catalog + builder `unitPrice` |
| `BM3 WABA 250 limit (WhatsApp API)` $150 | **removed** |
| `Monetized Page (10K Followers)` $300 | **removed** |
| `TikTok BC30 Verified (30 Warmed-Up Ad Accounts)` $490 → **$590** | catalog |

Removed in lockstep so nothing points at a dead row:

- `custom-setup-data.ts` — the `page-monetized` buildable, whose `catalogName` would otherwise reference a row that no longer exists. BM10's `unitPrice` moved with the catalog price for the same reason.
- `product-details-data.ts` — drawer entries for both retired products (18 entries remain, all matching live rows).
- `content/docs/facebook-fanpage/index.mdoc` — the `Monetized (10K) … $300` row in the page price table.
- `pages-page-content.ts` — the "which Page should I buy" FAQ recommended "Monetized or Verified"; the Monetized half is gone.

Business Manager category is now BM5 Super Aged $390 · BM10 Verified $790 · BM50 (contact).

Added a drift check (scratchpad, not committed) that asserts every builder `catalogName` resolves to a catalog row **and** quotes the same price — the invariant both file headers state but nothing enforced. Currently: 13/13 agree. Worth promoting to a real test.

> Left alone: the `/pages` resource card "Monetized Pages: Unlock Reels & Stars Revenue" and two `blog-posts.ts` mentions of a Monetized 10K Page. They are editorial, carry no price or Buy button, and rewriting published article copy is a content call. Flagging because GOADS no longer sells that page.

## Foreplay audit of the session's components (261109)

Every component touched this session re-checked against `foreplay-source.css`.

**Typography — clean.** All text in the new/changed components routes through `siteText`; no hardcoded font, no raw `text-[…]`/`font-[…]` bypassing the scale. Re-extracted and verified each step used: `.text-overline` 12/550/16 + tracking .166667em · `.text-label-s` 14/500/20 · `.text-label-l` 18/500 + tracking -.0144em · `.text-body-s` 14/400/20 · `.text-body-xs` 12/20 · `.text-display-h5` **Inter Display** 24/600/32 + tracking -.00667em + `font-optical-sizing:auto`. All match.

**Spacing — clean.** The `pt-[72px]` / `pb-[108px]` arbitrary values are Foreplay section tokens already used across the codebase, not scale slips; mobile steps already use the scale (`max-sm:pt-10 max-sm:pb-20`). Most arbitrary-value grep hits were inside doc comments, not JSX.

**Two real findings, both fixed:**

1. **Promo card was a hybrid.** It took its paint from the `/rental` benefits card (16px radius, `--alpha-700` hairline, `--alpha-900` fill) but then gained a full-bleed image, which structurally makes it `.product-page-feature-block-new`. Now built to that class's spec: `border 1px --solid-700`, `radius 20px`, `padding 0`, `overflow hidden`, hover changes the **fill** to `--solid-900` (never the border — a border-colour change on hover reads as a tacky outline, the same call `ProductPageFeatureGridCards` makes). Content moved to `.product-page-feature-content`'s 24px padding (was 20px). Image already matched `.product-page-feature-image` (`self-center w-full h-auto`).
2. **Raw hex in JSX** in `setup-configurator-dialog.tsx` (4 occurrences, including the warranty table edited earlier): `#ffffff1a` → `var(--alpha-700)`, `#ffffff0f` → `var(--alpha-800)`. Identical values, but the skill bans hex in JSX and these were the last ones in the pricing stack.

Verified on the live build: 8/8 card instances carry radius-20 + `--solid-700` + hover `--solid-900` + `p-6` content, zero 16px leftovers, and `/tools/bookmark` `/tempmail` `/pricing` `/rental` all 200.

## Closing the open items (261109)

**Warranty contradiction resolved — $1,000 of spend wins.** `refund-policy-content.ts` was the lone outlier, promising cover only "until the customer achieves successful advertising spend", i.e. ending at the first dollar. The catalog, the docs, the /pricing FAQ, the service-update panel and the setup configurator all say **$1,000**. The policy page now says the same, and the "native ad accounts are not covered" carve-out is replaced by a pointer to the agency-account terms below it.

**`qa-business-managers` docs rewritten against the live catalog.** It still listed BM1, BM3, BM5 $250 Limited, WABA 250 and WABA 2K as things GOADS provides, and described every tier by how many **native** ad accounts it includes — the exact framing the rest of the site has stopped using. Now: BM5 Super Aged · BM10 Verified · BM50+ on request, with a callout explaining why the low tiers went, the agency-account answer, and WABA reframed as available on request rather than as two catalog SKUs. Also removed a duplicated native-ad-account Q&A that the rewrite had superseded, so the page no longer answers the same question two different ways.

**Monetized Page claims removed from the blog.** Two spots listed it among the Pages GOADS supplies. The `/pages` resource card "Monetized Pages: Unlock Reels & Stars Revenue" stays — it is an article about monetization, not an offer.

**`/tools` hub gets the promo.** The sub-routes carry it as a rail; the hub has no rail, so it runs as a centred row under the tool grid, capped at 960px. `ToolsPromoRow` self-gates on `brand.toolsOnly`.

**Catalog drift is now enforced, not just documented.** Both data files state in their headers that builder prices MUST mirror the catalog; nothing checked it. `scripts/check-catalog-consistency.mjs` (`npm run check:catalog`) asserts:

1. every `BUILDABLE_ITEMS.catalogName` resolves to a catalog row
2. every `unitPrice` equals that row's price
3. every `SETUP_TEMPLATES` slot references an item that still exists
4. every `productDetails` key resolves to a catalog row — orphans silently fall back to generic drawer copy, so they look fine until you read one

Regex over the source rather than importing it: these are TS modules with path aliases, and a check that needs a build step is a check that stops being run. Verified by injecting a fake drift (builder $999 vs catalog $390) — caught and exit 1. Currently: 25 rows, 13 builder items, clean. Worth wiring into CI.

> The check found a gap in itself on first run: `id: AD_ACCOUNT_ID` is a const, not a string literal, so the item parsed as missing. Fixed by resolving exported `*_ID` consts.
