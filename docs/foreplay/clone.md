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
6. Data tách ra file `data/foreplay-{route}-page-data.ts`
7. Build → verify compile

## Rules bắt buộc
- Đọc docs/foreplay/design-guideline.md TRƯỚC KHI code
- DOM nested phải 100% match source HTML
- shadcn components: dùng nguyên, chỉ override style qua className
- Reuse foreplay components có sẵn (SectionHead, CtaButton, SectionContainer, etc.)
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

| Route | Status | Page File | Plan |
|-------|--------|-----------|------|
| `/home` | ✅ Done + GoAds content | `app/src/app/foreplay/home/page.tsx` | — |
| `/reviews` | ✅ Done + native review cards | `app/src/app/foreplay/reviews/page.tsx` | — |
| `/book-demo` | ✅ Done + Cal.com embed | `app/src/app/foreplay/book-demo/page.tsx` | `plans/260407-1543-clone-book-demo/` |
| `/pricing` | ✅ Done (earlier) | `app/src/app/foreplay/pricing/page.tsx` | — |
| `/blog` | 🔜 Next | — | — |
| `/blog/[slug]` | 🔜 Next | — | — |

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

## Reuse Checklist (check TRƯỚC khi tạo mới)

1. `ForeplaySectionHead` — section headers (subtitle + title + desc)
2. `ForeplayCtaButton` — CTA buttons (5 variants: nav, hero, secondary, ghost, light-primary)
3. `ForeplaySectionContainer` — containers (4 variants: section, wide, footer, navbar)
4. `ForeplaySectionWhiteBlock` — white rounded sections
5. `ForeplayProductPageFaqAccordion` — FAQ sections (pass different items)
6. `ForeplayHomeCta` — final CTA sections
7. `fpText.*` — typography constants (13 styles)
8. `ForeplayDotBg` — dot grid background
9. `ForeplayCarouselArrows` — prev/next navigation
10. `ForeplayProductHero` — product page hero with scroll animation
11. `ForeplayHomeHeroBottom` — logo grid (trust badges)
12. `SenjaReviewCard` — review card (avatar, stars, content, date, platform icon)
13. `SenjaReviewMasonryGrid` — masonry grid with Load More (initialCount, loadMoreCount)
14. `ForeplayDemoHero` — demo/booking hero with Cal.com embed
15. `ForeplayDemoSocialProof` — social proof badges (G2, Chrome, Capterra)
16. `ForeplayCalEmbed` — Cal.com inline embed component

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
