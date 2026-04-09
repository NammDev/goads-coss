# Foreplay Clone Workflow

## Header Clone — 4 Prompts (recommended)

Header phức tạp với mega-menu dropdowns → tách 4 prompts để tránh context bloat và miss detail.

### Preparation (cào dữ liệu trước)

**Cần cào 3 thứ:**

```bash
# 1. HTML (nếu chưa có) — header giống nhau trên mọi page, pick 1
curl -sL https://www.foreplay.co/ > docs/foreplay/html/foreplay-homepage-latest.html

# 2. Screenshot mega-menu expanded states (không tự chụp được qua curl)
#    → Dùng browser DevTools: mở menu "Product", "Solutions", "Resources"
#    → Screenshot từng state, lưu vào docs/foreplay/screenshots/
#    → Paste vào prompt khi cần

# 3. Icon images cho mega-menu (nếu chưa có)
#    Đã có sẵn trong app/public/foreplay/: footer_1-5.webp (Swipe File, Discovery, Spyder, Lens, Briefs)
#    Còn thiếu: chrome-extension icon, mobile-app icon, API icon, "What is Foreplay?" video thumbnail
#    → Inspect DOM trên foreplay.co → copy URL → curl về
```

**CSS đã có sẵn**: `docs/foreplay/html/foreplay-source.css` — dùng `extract-css.sh` để pull class CSS.

---

### Prompt 1: Audit + Skeleton Nav Bar (no dropdowns)

```
/ck-plan --fast

Audit header foreplay.co và clone skeleton nav bar (KHÔNG dropdown):

1. Đọc docs/foreplay/html/foreplay-homepage-latest.html
2. Tìm DOM của .navigation, .nav-dropdown, .nav-inner, .nav-cta
3. Extract CSS:
   docs/foreplay/html/extract-css.sh "navigation" "nav-inner" "nav-dropdown" "navlink" "new-button" "new-button-navbar"
4. List tất cả nav items + mega-menu triggers (Product, Solutions, Resources, Pricing, Book a Demo)
5. Clone SKELETON vào app/src/components/foreplay/foreplay-header.tsx:
   - .navigation: sticky, z-100, backdrop-blur-24, bg #020308eb
   - Logo foreplay bên trái
   - 5 nav items GIỮA: Product (chevron), Solutions (chevron), Resources (chevron), Pricing, Book a Demo
   - Sign in + "Start free trial" CTA bên phải
   - TEXT-ONLY — không dropdown, không hover state mega-menu yet
6. Verify compile, test sticky + blur

Output: skeleton nav bar + list CSS classes/components cần cho Prompt 2-4
```

---

### Prompt 2: Product Mega-Menu (biggest — 80% effort)

```
/clone-foreplay

Clone "Product" mega-menu dropdown ở header.

## Input cần thiết
- HTML: paste đoạn DOM của Product dropdown từ docs/foreplay/html/foreplay-homepage-latest.html
- Screenshot: ảnh mega-menu Product expanded (tôi sẽ paste)
- Icons: /foreplay/footer_1-5.webp (Swipe File, Discovery, Spyder, Lens, Briefs)

## DOM structure (expected)
div.nav-dropdown (relative, group, hover trigger)
  button.navlink.chevron "Product"
  div.dropdown-menu (absolute top-full, backdrop-blur, border, rounded, show on hover/focus)
    div.dropdown-inner (grid layout)
      section RESEARCH (label + 3 items: Swipe File, Discovery, Spyder)
        .nav-item: icon 40px + title + description
      section "ANALYTICS & PRODUCTION" (label + 2 items: Lens, Briefs)
      section EXTEND (label + 3 items: Chrome Extension, Mobile App, API — smaller icons)
    div.dropdown-right ("What is Foreplay?" video card with play button)

## Quy trình
1. Extract CSS: dropdown-menu, dropdown-inner, nav-section-label, nav-item, nav-item-icon, nav-item-title, nav-item-desc, dropdown-video-card
2. Clone với Radix NavigationMenu HOẶC custom hover-to-open (useState + onMouseEnter/Leave + delay)
3. Reuse /foreplay/footer_*.webp cho 5 product icons
4. Dùng CSS vars --fp-*, không [] arbitrary
5. Transition: show/hide smooth 200ms

## Rules
- DOM 100% match source
- Hover trigger: show dropdown khi hover vào button HOẶC dropdown-menu (không flicker)
- Click outside: close
- Keyboard: ESC close, Tab navigate
- Desktop-only, note mobile values trong comment
```

---

### Prompt 3: Solutions + Resources Dropdowns

```
/clone-foreplay

Clone 2 dropdowns còn lại ở header: Solutions, Resources.

## Input
- HTML: paste DOM của Solutions + Resources dropdowns
- Screenshot: 2 ảnh mega-menu expanded

## Scope
- Solutions dropdown: layout khác Product (ít items hơn, có thể chỉ 1 col)
- Resources dropdown: blog + guides + community links
- Pricing: static link, no dropdown
- Book a Demo: static link, no dropdown

## Reuse từ Prompt 2
- Dùng lại cấu trúc nav-dropdown, dropdown-menu, nav-item
- Chỉ khác data (content) và layout minor (columns, sizing)

## Rules
- Extract CSS cho bất kỳ class mới (solution-specific, resource-specific)
- Nếu layout giống Product mega-menu → tách generic NavDropdown atom, reuse
- Commit prompt 2 trước khi bắt đầu prompt 3
```

---

### Prompt 4: Mobile Hamburger + Drawer + Responsive

```
/clone-foreplay

Clone mobile variant header: hamburger + slide-in drawer menu.

## Input
- HTML: paste DOM mobile header state (xem foreplay.co viewport 375px)
- Screenshot: ảnh mobile menu opened
- Breakpoints: max-md (≤991px), max-sm (≤767px)

## Scope
- Hamburger icon (show khi ≤991px, hide desktop nav)
- Slide-in drawer từ phải HOẶC full-screen overlay
- Nested accordion cho mega-menu items (Product → collapse Research/Analytics/Extend)
- Close button + backdrop click to close
- Scroll lock khi mở
- Logo + Start free trial CTA visible trong drawer header

## Rules
- Dùng Radix Dialog hoặc shadcn Sheet cho drawer
- State management: useState open/close + body scroll lock
- Animation: slide-in 300ms
- DOM match source mobile variant
- Close on route change (Next.js pathname change → auto close)
```

---

## Generic Page Clone Workflow — 2 Prompts

Cho page thường (không phải header/footer), dùng 2 prompts.

### Prompt 1: Audit

```
/ck-plan --fast

Audit trang https://www.foreplay.co/{route} trước khi clone.

1. Download HTML: curl -sL https://www.foreplay.co/{route} > docs/foreplay/html/{route-name}.html
2. Phân tích HTML → list TẤT CẢ sections (class names + mô tả visual)
3. Với MỖI section, đánh giá:
   - shadcn/ui component nào match? (Table, Tabs, Accordion, Card, Dialog, Tooltip, Collapsible, etc.)
   - Reuse foreplay component nào đã có? (SectionHead, CtaButton, SectionContainer, FaqAccordion, HomeCta, etc.)
   - Phải clone custom từ HTML?
4. Output: bảng mapping — Section | shadcn | Reuse | Custom
5. Lên plan clone với strategy "shadcn-first, reuse-second, clone-last"
```

### Prompt 2: Clone

```
/clone-foreplay

Clone trang https://www.foreplay.co/{route} theo plan đã audit.

## Source Files
- HTML: docs/foreplay/html/{route-name}.html
- CSS: docs/foreplay/html/foreplay-source.css
- Extract: docs/foreplay/html/extract-css.sh
- Audit plan: plans/{plan-dir}/plan.md

## Quy trình
1. Đọc design-guideline.md (đặc biệt "CSS Token Standards" + "Reuse Checklist")
2. Theo audit plan: shadcn components trước → reuse atoms → clone custom cuối
3. Clone skeleton trước (khung ngoài 4-5 div), detail sau
4. Extract CSS cho TỪNG class, không guess
5. Dùng CSS vars `var(--fp-*)`, KHÔNG dùng `[]` arbitrary values
6. Data tách ra file `data/foreplay-{route}-page-data.ts` hoặc `data/goads-{route}-page-data.ts` nếu đã swap content
7. Build → verify compile

## Rules bắt buộc
- Đọc docs/foreplay/design-guideline.md TRƯỚC KHI code
- DOM nested phải 100% match source HTML
- shadcn components: dùng nguyên, chỉ override style qua className
- Reuse foreplay components có sẵn (xem Reuse Checklist bên dưới)
- Desktop-only, note responsive values trong comments
- Mỗi component < 150 lines, tách data ra file riêng
- Radix Portal → dùng raw hex + font-sans antialiased
- Commit khi xong mỗi section lớn

## Skeleton-first approach
Lần 1: Clone khung ngoài 4-5 div sâu, {/* TODO */} cho inner content
Lần 2: Tôi sẽ paste HTML từng section cho bạn fill detail
```

---

## Clone Progress

### Pages Cloned (7 pages)

| Route | Status | Page File | Data File | HTML Source |
|-------|--------|-----------|-----------|-------------|
| `/home` | ✅ Done + GoAds content | `foreplay/home/page.tsx` | `goads-home-content.ts` | `html/foreplay-homepage-latest.html` |
| `/swipe-file` | ✅ Done | `foreplay/swipe-file/page.tsx` | `foreplay-swipe-file-page-data.ts` | `html/swipe-file.html` |
| `/pricing` | ✅ Done | `foreplay/pricing/page.tsx` | `foreplay-pricing-page-data.ts` | `html/pricing.html` |
| `/reviews` | ✅ Done + native cards | `foreplay/reviews/page.tsx` | `goads-reviews-data.ts` | `html/reviews.html` |
| `/book-demo` | ✅ Done + Cal.com | `foreplay/book-demo/page.tsx` | — (inline) | `html/book-demo.html` |
| `/profiles` | ✅ Done + GoAds content | `foreplay/profiles/page.tsx` | `goads-profiles-page-data.ts` + `goads-product-catalog-table-data.ts` | — |
| `/industries/ecommerce` | ✅ Done | `foreplay/industries/ecommerce/page.tsx` | `foreplay-ecommerce-solution-page-data.ts` | `html/industries-ecommerce.html` |
| `/university/classes` | ✅ Done | `foreplay/university/classes/page.tsx` | `foreplay-university-classes-page-data.ts` | `html/university-classes.html` |

> All page files relative to `app/src/app/`, data files relative to `app/src/data/`
> Note: `/university` = `/university/classes` (identical pages on foreplay.co)

### Remaining Foreplay Routes (NOT cloned yet)

| Route | Foreplay URL | Notes |
|-------|-------------|-------|
| `/discovery` | foreplay.co/discovery | Product page — reuse swipe-file components + different data |
| `/spyder` | foreplay.co/spyder-ad-spy | Product page — same pattern |
| `/lens` | foreplay.co/lens-creative-analytics | Product page — same pattern |
| `/briefs` | foreplay.co/briefs | Product page — same pattern |
| `/blog` | foreplay.co/blog | Blog listing — GoAds already has blog at `app/src/app/blog/` |
| `/blog/[slug]` | foreplay.co/blog/* | Blog detail — GoAds already has this |
| `/industries/*` | foreplay.co/industries/* | Other industry solutions (DTC, Agency, etc.) |

---

## Component Inventory (54 components, ~4700 LOC)

### Layout & Shared Atoms (16 reusable)

| # | Component | Description |
|---|-----------|-------------|
| 1 | `ForeplaySectionHead` | Section headers (subtitle + title + desc, light/dark variant) |
| 2 | `ForeplayCtaButton` | CTA buttons (5 variants: nav, hero, secondary, ghost, light-primary) |
| 3 | `ForeplaySectionContainer` | Containers (4 variants: section, wide, footer, navbar) |
| 4 | `ForeplaySectionWhiteBlock` | White rounded block wrapper |
| 5 | `ForeplayDotBg` | Dot grid background overlay |
| 6 | `ForeplayCarouselArrows` | Prev/next navigation arrows |
| 7 | `ForeplayNavLink` | Header nav links |
| 8 | `ForeplayHeroContent` | Hero title + subtitle with gradient text |
| 9 | `ForeplayWinningCard` | Light/dark card with children slot |
| 10 | `fpText.*` | Typography constants (13 styles) |
| 11 | `ForeplayHeader` | Sticky header, z-100, blur(24px) |
| 12 | `ForeplayFooter` | Full footer (products + links + ad count + AI + social) |
| 13 | `ForeplayFooterProductNav` | Footer product badges (5 icons) |
| 14 | `ForeplayFooterCompanyReviews` | Logo + Chrome/G2 badges |
| 15 | `ForeplayFooterLinkColumns` | 5-col link grid |
| 16 | `ForeplayFooterSocialAndLegal` | Social icons + copyright |

### Product Page Components (8 reusable — dùng cho tất cả product pages)

| # | Component | Description |
|---|-----------|-------------|
| 17 | `ForeplayProductHero` | Product hero with icon video + monitor mockup |
| 18 | `ForeplayProductPageSolution` | Before/After white block cards |
| 19 | `ForeplayProductUseCaseCarousel` | Horizontal slide cards + arrows |
| 20 | `ForeplayProductPageFeatureTabs` | 3-col tab grid + screenshot |
| 21 | `ForeplayProductPageFeatureGridCards` | 3-col feature card grid |
| 22 | `ForeplayProductPageTestimonial` | Centered quote + laurel decorations |
| 23 | `ForeplayProductPageCtaCard` | Gradient card with CTA + video |
| 24 | `ForeplayProductPageFaqAccordion` | Expandable Q&A accordion |

### Pricing Components (6)

| # | Component | Description |
|---|-----------|-------------|
| 25 | `ForeplayPricingTabs` | Monthly/annual toggle with grid panes |
| 26 | `ForeplayPricingCard` | Fully styled pricing tier card |
| 27 | `ForeplayPricingFooter` | Enterprise section + extra features |
| 28 | `ForeplayPricingComparison` | White block wrapper |
| 29 | `ForeplayPricingComparisonTable` | Comparison grid with accordion |
| 30 | `ForeplayComparisonTooltipBadge` | Crown badge + tooltip |

### Home Page Components (8)

| # | Component | Description |
|---|-----------|-------------|
| 31 | `ForeplayHomeHero` | Hero with scroll animation + video |
| 32 | `ForeplayHomeHeroVideo` | Hero video embed |
| 33 | `ForeplayHomeHeroBottom` | Logo grid (trust badges) |
| 34 | `ForeplayHomeWinning` | Before/After winning cards |
| 35 | `ForeplayHomeProductShowcase` | Product tabs (5 products) |
| 36 | `ForeplayHomeChromeExtension` | Chrome extension banner |
| 37 | `ForeplayHomeCollab` | Collaboration section |
| 38 | `ForeplayHomeFeaturesGrid` | 3-col feature cards |
| 39 | `ForeplayHomeCta` | Final CTA banner |
| 40 | `ForeplayHomeSharing` | Sharing tabs section |

### Reviews & Demo Components (5)

| # | Component | Description |
|---|-----------|-------------|
| 41 | `SenjaReviewCard` | Review card (avatar, stars, content, date, platform) |
| 42 | `SenjaReviewMasonryGrid` | Masonry grid with Load More |
| 43 | `ForeplayDemoHero` | Demo/booking hero with Cal.com embed |
| 44 | `ForeplayDemoSocialProof` | Social proof badges (G2, Chrome, Capterra) |
| 45 | `ForeplayCalEmbed` | Cal.com inline embed |

### Solution Page Components (4)

| # | Component | Description |
|---|-----------|-------------|
| 46 | `ForeplaySolutionHero` | Solution hero with gradient |
| 47 | `ForeplaySolutionLogoCarousel` | Client logo carousel |
| 48 | `ForeplaySolutionTestimonialCard` | Testimonial with photo |
| 49 | `ForeplaySolutionExamplesGrid` | Examples grid layout |

### University Page Components (4)

| # | Component | Description |
|---|-----------|-------------|
| 50 | `ForeplayUniversityHero` | FU logo + title + bg image + carousel slot |
| 51 | `ForeplayUniversityCourseCard` | Active/coming-soon course card with shine effect |
| 52 | `ForeplayUniversityCourseCarousel` | Horizontal card layout with opacity variants |
| 53 | `ForeplayUniversityFeatureRow` | Left-right alternating image+text row |

### GoAds-Specific Components (1)

| # | Component | Description |
|---|-----------|-------------|
| 54 | `GoAdsProductCatalogTable` | Product catalog table (reuses PricingComparison) |

---

## shadcn/ui Components thường match với Foreplay

| Foreplay Pattern            | shadcn/ui Component     | Notes                              |
| --------------------------- | ----------------------- | ---------------------------------- |
| Tab toggle (Monthly/Annual) | `Tabs`                  | Custom trigger styling             |
| FAQ accordion               | `Accordion`             | Smooth height animation            |
| Comparison table            | `Table` + `Collapsible` | Sticky header + accordion rows     |
| Tooltip (info icon)         | `Tooltip`               | Radix-based, needs Portal font fix |
| Pricing cards               | `Card`                  | Structure reuse, custom content    |
| Modal/popup                 | `Dialog`                | Exit-intent popup                  |
| Dropdown nav                | `NavigationMenu`        | Header mega menu                   |
| Toggle group                | `ToggleGroup`           | Filter tabs                        |
| Carousel                    | `Carousel`              | Use case horizontal scroll         |
| Masonry review grid         | — (CSS columns)         | `SenjaReviewMasonryGrid` + Load More |

---

## Data Files

## Blog Clone Reference (`/blog` + `/blog/[slug]`)

### Source HTML
- Listing: `docs/foreplay/html/blog.html`
- Detail: `docs/foreplay/html/blog-post-detail.html`
- DOM nesting: `docs/foreplay/nested.md` (full tree)

### Existing GoAds blog components (CẦN RESTYLE)
- `BlogHero` (41 lines) — cần rebuild theo Foreplay layout
- `BlogListing` (115 lines) — cần rebuild theo Foreplay 2-col card grid
- `BlogDetailHeader` (106 lines) — cần rebuild với breadcrumb + author + featured image
- `BlogDetailContent` (123 lines) — cần rebuild với TOC sidebar
- `BlogMarkdocContent` — giữ nguyên (rich text renderer)
- `src/data/blog-posts.ts` (224 lines, 5 posts) — extend thêm fields

### `/blog` — Page Sections

| # | Section | Foreplay Class | Component | Strategy |
|---|---------|---------------|-----------|----------|
| 1 | Hero (title + subtitle) | `fireside-hero > product-hero-content > hero-text` | **Rebuild BlogHero** | Custom — dark bg + canvas gradient |
| 2 | Featured Post (left 60%) | `featured-blog-wrapper > featured-blog-link` | **BlogFeaturedCard** (new) | Clone — large image + excerpt + author |
| 3 | Popular Blogs (right 40%) | `blog-related-head + blog-feed-wrapper` | **BlogPopularSidebar** (new) | Clone — vertical list 4 text-only links |
| 4 | Category Bar | `blog-categories > a.blog-tag` | **BlogCategoryBar** (new) | Clone — horizontal scroll pills |
| 5 | Post Card Grid | `blog-list.w-dyn-items > blog-list-card` | **BlogCard** (new, shared) | Clone — 2-col grid, image + author + title + excerpt |
| 6 | Pagination | `blog-pagination > page-count + Next` | **BlogPagination** (new) | Clone — "1 / 8" + Next link |
| 7 | Bottom CTA | `home-cta` | **Reuse ForeplayHomeCta** | ✅ Already cloned |

### `/blog/[slug]` — Page Sections

| # | Section | Foreplay Class | Component | Strategy |
|---|---------|---------------|-----------|----------|
| 1 | Breadcrumb | `blog-breadcrumb > blog-breadcrumb-link` | **BlogBreadcrumb** (new) | Clone — Blog > Category > Title |
| 2 | Post Header | `blog-head > h1 + blog-author + blog-cover` | **Rebuild BlogDetailHeader** | Clone — title + author (48px avatar + name + title + social) + featured image |
| 3 | TOC Sidebar (sticky left) | `blog-toc-wrapper > blog-toc > blog-toc-list` | **BlogTOC** (new) | Clone — auto-gen from h2s, IntersectionObserver scroll-sync, `.is-active` |
| 4 | Article Body (right) | `blog-body > blog-rtb.w-richtext` | **Rebuild BlogDetailContent** | Clone — prose styling, h2/p/blockquote/figure/embed |
| 5 | Inline CTA | `blog-cta > blog-cta-content` | **BlogInlineCTA** (new) | Adapt — "30 Second Summary" → GoAds CTA |
| 6 | Related Carousel | `blog-related > blog-carousel-card` | **BlogRelatedCarousel** (new) | Clone — horizontal scroll, reuse BlogCard |
| 7 | Bottom CTA | `home-cta` | **Reuse ForeplayHomeCta** | ✅ Already cloned |

### Shared Blog Card Component

Dùng chung cho listing grid + related carousel + popular sidebar (featured variant riêng).

```
a.blog-carousel-card
  div.blog-carousel-card-cover
    img.blog-carousel-card-image               ← thumbnail (rounded-xl, aspect-video)
  div.blog-carousel-card-content
    div.blog-carousel-card-author
      img.blog-carousel-card-author-avatar     ← 32px circle
      div.blog-carousel-card-text
        div.text-label-xs                      ← author name
        div.text-body-xs.text-alpha-68         ← read time
    h3.text-display-h5.line-clamp-2            ← title
    p.text-body-s.line-clamp-3                 ← excerpt
```

### Data Extension Cần Thiết

```ts
// Extend BlogPost type in src/data/blog-posts.ts
interface BlogPost {
  // existing fields...
  category: string         // "Meta Ads", "Google Ads", etc.
  categorySlug: string     // "meta-ads", "google-ads"
  author: {
    name: string
    avatar: string         // image URL
    title?: string         // "Head of Marketing"
    socials?: { linkedin?: string; twitter?: string }
  }
  readTime: string         // "10 min read"
  featured?: boolean       // pin to hero featured slot
  popular?: boolean        // show in "Popular Blogs" sidebar
}
```

### GoAds Blog Categories (thay Foreplay categories)
Meta Ads, Google Ads, TikTok Ads, Account Tips, Scaling Strategy, Case Studies, Industry News, Tutorials

### Typography Mapping

| Foreplay Class | GoAds Token | Usage |
|---------------|-------------|-------|
| `text-overline` | `text-xs font-semibold uppercase tracking-widest` | "Blog" label |
| `text-display-h1 hero-title` | `text-4xl/tight font-semibold lg:text-5xl/tight` | hero subtitle |
| `text-display-h3` | `text-2xl font-semibold lg:text-3xl` | featured post title |
| `text-display-h5` | `text-lg font-semibold` | card title, "Popular Blogs" |
| `text-body-m` | `text-base text-muted-foreground` | featured excerpt |
| `text-body-s` | `text-sm text-muted-foreground` | card excerpt |
| `text-body-xs` | `text-xs` | read time |
| `text-label-m` | `text-sm font-medium` | author name (detail) |
| `text-label-xs` | `text-xs font-medium` | author name (card) |
| `text-alpha-68` | `opacity-68` or `text-muted-foreground` | muted text |

### Build Order

1. **BlogCard** — shared card component (dùng ở 3 chỗ)
2. **BlogCategoryBar** — category filter pills
3. **BlogHero** — hero + featured post + popular sidebar (depends on BlogCard variant + BlogFeedItem)
4. **BlogPagination** — simple pagination
5. **Blog listing page** — compose BlogHero + BlogCategoryBar + BlogCard grid + BlogPagination + HomeCta
6. **BlogBreadcrumb** — simple breadcrumb
7. **BlogAuthor** — author block with social links
8. **BlogTOC** — sticky sidebar TOC with scroll-sync
9. **BlogContent** — rich text prose styling
10. **BlogRelatedCarousel** — horizontal carousel (reuse BlogCard)
11. **Blog detail page** — compose all detail components + HomeCta

---

## Data Files

| File | Route | Content |
|------|-------|---------|
| `goads-home-content.ts` | `/home` | GoAds home page content (swapped) |
| `goads-reviews-data.ts` | `/reviews` | GoAds review cards |
| `goads-profiles-page-data.ts` | `/profiles` | Hero, FAQ, feature grids, testimonials |
| `goads-product-catalog-table-data.ts` | `/profiles` | Product catalog categories + columns |
| `foreplay-swipe-file-page-data.ts` | `/swipe-file` | Original foreplay data |
| `foreplay-pricing-page-data.ts` | `/pricing` | Original foreplay pricing data |
| `foreplay-ecommerce-solution-page-data.ts` | `/industries/ecommerce` | E-Commerce solution data |
| `foreplay-university-classes-page-data.ts` | `/university/classes` | Hero, course cards, feature rows |
| `foreplay-footer-links-data.ts` | Footer | Footer link columns |

---

## HTML Source Files

| File | Route |
|------|-------|
| `foreplay-homepage-latest.html` | `/home` |
| `swipe-file.html` | `/swipe-file` |
| `pricing.html` | `/pricing` |
| `reviews.html` | `/reviews` |
| `book-demo.html` | `/book-demo` |
| `industries-ecommerce.html` | `/industries/ecommerce` |
| `foreplay-source.html` | Original full source |
| `hero.html` | Hero section extract |
| `home-hero-bototm.html` | Hero bottom extract |
| `university-classes.html` | `/university/classes` |
| `university.html` | `/university` (identical to classes) |

---

## Notes

### Product pages chỉ cần data mới
Tất cả 8 product page components đã reusable — clone thêm `/discovery`, `/spyder`, `/lens`, `/briefs` chỉ cần:
1. Download HTML source
2. Extract data → `foreplay-{route}-page-data.ts`
3. Compose page từ existing components + different props

### GoAds content swap pattern
Pages đã swap: `/home`, `/reviews`, `/profiles`
Pattern: tạo `goads-{route}-page-data.ts` → import thay foreplay data → giữ nguyên component structure

### Blog
GoAds blog (`app/src/app/blog/`) đã có sẵn — chỉ cần đánh giá xem có cần Foreplay layout version không
