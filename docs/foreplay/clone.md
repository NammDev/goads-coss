# Foreplay Clone Workflow — 2 Prompts

## Prompt 1: Audit (chạy trước, review output, rồi mới clone)

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

---

## Prompt 2: Clone (sau khi review audit)

```
/clone-foreplay

Clone trang https://www.foreplay.co/{route} theo plan đã audit.

## Source Files
- HTML: docs/foreplay/html/{route-name}.html
- CSS: docs/foreplay/foreplay-source.css
- Extract: docs/foreplay/extract-css.sh
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
