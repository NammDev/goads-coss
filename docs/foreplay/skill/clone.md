# Foreplay Clone Workflow

## Case Study: Header Clone ✅ DONE (2026-04-10/11)

Header mega-menu đã clone hoàn chỉnh với 3 dropdowns (Product/Solutions/Resources) + mobile menu. **Không cần clone lại** — nhưng đây là case study phức tạp nhất, reference cho khi clone các components có state + positioning context + responsive breakpoints.

### Học từ header clone — key architectural lessons

**1. Positioning context escape (Webflow `.w-dropdown` override)**
- Source override `.nav-dropdown { position: static }` (Webflow default: relative)
- Absolute child `nav.nav-dropdown-menu` → escape lên ancestor gần nhất có position:relative (= `.nav-stack`)
- Kết quả: dropdown xuất hiện dưới cả header row, full nav-stack width thay vì chỉ dưới button
- Apply cho clone: wrapper dùng `className="static"`, KHÔNG `relative`

**2. CSS cascade with media query context — CRITICAL**
- Naive extraction tool dumps tất cả rules không phân biệt `@media` → áp dụng nhầm mobile values cho desktop
- **Bug thực tế:** `.navbar-container { max-width: 1340px }` (desktop) bị override bởi `.container { max-width: 1440px }` (desktop, declared SAU trong CSS) → final desktop = 1440
- `.container.navbar-container { padding: 0 8px }` nằm trong `@media ≤991px` → MOBILE ONLY, không apply desktop
- `.nav-stack { padding-top: 12px; height: 72px }` cũng mobile only, desktop là `padding: 16px` + content-driven height
- **Fix pattern:** brace-walk Python script để xác định media query context của từng rule. Xem `docs/foreplay/design-guideline.md` → "CSS Cascade with Media Queries"

**3. DOM nesting verification — count closing tags carefully**
- Trong source HTML không có indent: `...?</div></div></div></div><a class="...">` — số `</div>` quyết định parent của next element
- **Bug thực tế:** tôi placed `a.nav-lightbox` làm sibling của `.nav-product-banner-video` thay vì child — vì đếm nhầm `</div>`
- **Fix pattern:** đếm từng `</div>`, trace stack `[banner, video, content, text-white, title]`, pop lần lượt khi gặp close tag, xác định chính xác parent của element mới

**4. Hidden Webflow utility classes**
- `.text-white` không chỉ `color: #fff` — còn có `flex: 1` → ảnh hưởng flex layout
- `.w-inline-block` = `display: inline-block; max-width: 100%`
- **Rule:** TRƯỚC KHI dùng Webflow utility class, run `extract-css.sh` để check hidden properties

**5. Responsive breakpoint discipline**
- `.nav-product-menu-banner { display: none }` on desktop base, `display: flex` chỉ trong `@media (min-width: 1280px)`
- → Tailwind `hidden xl:flex` (xl = 1280px default)
- **Bug thực tế:** render banner ở mọi viewport → grid collapse dưới 1280px vì content quá dense cho 818px nav-stack

**6. Sprite animation — CSS `steps()` timing function**
- Source sprite sheets: N frames × 88px wide (scaled to container 88×88)
- `background-size: (N×88)px 100%; background-position: 0px 0px` (frame 0)
- Hover: `background-position: -(N-1)×88px 0px` (last frame)
- Transition: `background-position 1s steps(N-1)` → frame-by-frame jump animation
- **Ours:** React state `hovered` + inline style (Tailwind không support dynamic arbitrary values)

**7. Hover effects — translate + opacity combo**
- `.nav-badge-gradient` base: `opacity:0; transform:translateY(50%)` (pushed down, invisible)
- Hover: `opacity:1; transform:translateY(0%)` → slides UP + fades IN → overlays icon
- Duration 800ms, cubic-bezier(.19,1,.22,1)
- **Ours:** `group-hover:translate-y-0 group-hover:opacity-100`

### Files from header clone (reference patterns)

| File | Pattern |
|---|---|
| `app/src/components/foreplay/foreplay-header.tsx` | Static header với container + nav-stack positioning context |
| `app/src/components/foreplay/foreplay-header-dropdown-base.tsx` | Shared dropdown shell: state, animation, positioning escape |
| `app/src/components/foreplay/foreplay-header-product-menu.tsx` | Complex mega-menu: grid 10-col, sprite animation, banner xl-only |
| `app/src/components/foreplay/foreplay-header-resources-menu.tsx` | Simpler mega-menu: 12-col grid with Merch video banner |
| `app/src/components/foreplay/foreplay-header-solutions-menu.tsx` | Simplest mega-menu: single 3-col grid |
| `app/src/components/foreplay/foreplay-header-mobile-menu.tsx` | Mobile hamburger + accordion drawer (Radix Sheet) |
| `app/src/components/foreplay/foreplay-nav-link.tsx` | Atom: `.navlink > .text-navlink` wrapper |

Full refactor analysis + root cause findings: `docs/foreplay/changelog.md` → "Header Full Refactor — 100% Nested DOM (2026-04-10) ✅"

Architectural guidelines + DOM hierarchy + CSS cascade rules: `docs/foreplay/design-guideline.md` → "Header (.navigation)" section

---

## Privacy Policy Clone — 2 Prompts

Static legal pages (privacy, terms, cookies) rất đơn giản: hero title + rich text body. Chỉ cần 2 prompts.

### Preparation

```bash
# Download HTML source
curl -sL https://www.foreplay.co/page/privacy-policy > docs/foreplay/html/privacy-policy.html
```

### Prompt 1: Extract Content + Audit Layout

```
/clone-foreplay

Clone layout wrapper cho https://www.foreplay.co/page/privacy-policy (static legal page).

## Input
- HTML: docs/foreplay/html/privacy-policy.html
- CSS: docs/foreplay/html/foreplay-source.css
- Extract: docs/foreplay/html/extract-css.sh

## Scope
Privacy page = simple layout, KHÔNG cần clone 100% DOM như mega-menu:
1. Hero section (title "Privacy Policy" + last updated date)
2. Rich text content (h2/h3/p/ul/ol/a/blockquote)
3. Footer CTA (reuse ForeplayHomeCta nếu có)

## Quy trình
1. Đọc HTML, extract:
   - Hero class (.legal-hero / .page-hero / .hero-section)
   - Content class (.rich-text / .legal-content / .w-richtext)
   - Last updated date
2. Extract CSS của wrapper classes (hero padding, content max-width, prose styling)
3. Clone SKELETON wrapper vào app/src/app/foreplay/page/privacy-policy/page.tsx:
   - <ForeplayHeader /> (already in layout)
   - <section> Hero: title + date + subtitle (optional)
   - <section> Content: prose container (max-w 768-832px, @tailwindcss/typography)
   - <ForeplayHomeCta /> (reuse)
   - <ForeplayFooter /> (already in layout)
4. Content body: extract raw HTML từ .w-richtext → lưu vào src/data/foreplay-privacy-policy-content.ts as HTML string OR convert to MDX
5. Render content với `dangerouslySetInnerHTML` HOẶC MDX component

## Rules
- Tái sử dụng ForeplaySectionContainer (variant="section" = max-w-1216 px-10) cho wrapper
- Hero dùng fpText.displayH1 + fpText.bodyL
- Content container max-w-[832px] (theo blog-container)
- Apply `prose prose-invert` từ @tailwindcss/typography cho body text
- Typography override: match fpText.bodyM cho p, fpText.headingM cho h2/h3
- Zero hex arbitrary — dùng var(--fp-alpha-*) cho text colors
- Route: app/src/app/foreplay/page/privacy-policy/page.tsx (theo Foreplay URL pattern /page/*)
```

### Prompt 2: Populate Content + Verify

```
/clone-foreplay

Fill content và verify privacy policy page.

## Input
- Page file: app/src/app/foreplay/page/privacy-policy/page.tsx (skeleton từ Prompt 1)
- Content source: docs/foreplay/html/privacy-policy.html → .w-richtext section

## Quy trình
1. Paste raw HTML của .w-richtext vào src/data/foreplay-privacy-policy-content.ts
   export const privacyPolicyContent = {
     title: "Privacy Policy",
     lastUpdated: "Last updated: [date from source]",
     html: `<h2>...</h2><p>...</p>...`,
   }
2. Import + render trong page.tsx:
   - Hero: {title} + {lastUpdated}
   - Body: <div className="prose prose-invert ..." dangerouslySetInnerHTML={{ __html: html }} />
3. Verify prose styling khớp Foreplay:
   - h2: fpText.headingM size, mt-12 mb-4
   - h3: fpText.labelL size, mt-8 mb-3
   - p: fpText.bodyM, mb-4, color alpha-100
   - a: underline, color primary, hover opacity
   - ul/ol: pl-6, list-disc/list-decimal
4. Build → verify compile, check live render

## Rules
- Content must match source text 1:1 (don't paraphrase)
- Replace "Foreplay" brand references with "GoAds" if applicable
- Test responsive: desktop ≥1280px, tablet 768-991px, mobile ≤767px
- Links (email, URLs) phải clickable và mở đúng target
- Commit với message: "feat(foreplay): clone privacy policy page"
```

### Reusable pattern cho các legal pages khác

Sau khi clone xong `/page/privacy-policy`, các trang `/page/terms-of-service`, `/page/cookies`, `/page/gdpr` dùng **cùng component structure**, chỉ thay content data file:

```
app/src/app/foreplay/page/
├── privacy-policy/page.tsx    → import privacyPolicyContent
├── terms-of-service/page.tsx  → import termsOfServiceContent
├── cookies/page.tsx            → import cookiesContent
└── gdpr/page.tsx               → import gdprContent

src/data/
├── foreplay-privacy-policy-content.ts
├── foreplay-terms-of-service-content.ts
├── foreplay-cookies-content.ts
└── foreplay-gdpr-content.ts
```

Hoặc tách 1 component `ForeplayLegalPage` nhận props `{title, lastUpdated, html}` → tất cả 4 pages dùng chung → thêm page mới chỉ cần 1 data file + 5 dòng page.tsx.

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
