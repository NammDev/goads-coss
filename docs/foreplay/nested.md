# Foreplay Blog Clone — DOM Nesting Reference

Source: `https://www.foreplay.co/blog` + `https://www.foreplay.co/post/[slug]`
HTML: `docs/foreplay/html/blog.html` + `docs/foreplay/html/blog-post-detail.html`

---

## Route 1: `/blog` (Blog Listing Page)

### Page Sections (top → bottom)

```
section#product-hero-section.section.relative
  canvas#product-hero-canvas.product-hero-canvas        ← particle/gradient bg
  div.fireside-hero
    div.container.section-container
      div.product-hero-content
        div.hero-text
          div
            h1.text-overline.text-white-68              ← "Blog"
          h2.text-display-h1.hero-title                  ← "Free insights and guides for better ad creative"
      div.section-content-main
        div.w-layout-grid.blog-header-grid               ← 2-col grid: featured left + popular right
          div.featured-blog-wrapper                      ← LEFT: featured post
            a.featured-blog-link
              div.featured-blog-cover
                img.featured-blog-image
              div.featured-blog-content
                h2.text-display-h3.mobile-landscape-text-display-h4
                p.text-body-m                            ← excerpt
                div.blog-feed-author                     ← author avatar + name + read time
          div                                            ← RIGHT: popular blogs list
            div.blog-related-head
              h3.text-display-h5                         ← "Popular Blogs"
            div.blog-feed-wrapper                        ← vertical list of 4 post links
              a.blog-feed-link
                div.blog-feed-content
                  h4.text-label-m.line-clamp-2           ← title
                  div.blog-feed-subttext                 ← author name + read time

section.section                                          ← Blog listing section
  div.container.section-container
    div.blog-categories                                  ← horizontal scrollable category chips
      a.blog-tag                                         ← per-category link (15 categories)
    div.blog-list-wrapper.w-dyn-list
      div.blog-list.w-dyn-items                          ← 2-col grid of post cards
        div.block-list-item.w-dyn-item
          a.blog-list-card
            div.blog-carousel-card-cover
              img.blog-carousel-card-image               ← thumbnail (rounded)
            div.blog-carousel-card-content
              div.blog-carousel-card-author
                img.blog-carousel-card-author-avatar     ← author avatar (32px circle)
                div.blog-carousel-card-text
                  a.blog-thumbnail-author-link
                    div.text-label-xs                     ← author name
                  div.text-body-xs.text-alpha-68          ← read time
              h3.text-display-h5.line-clamp-2            ← title
              p.text-body-s.line-clamp-3                 ← excerpt
    div.blog-pagination.w-pagination-wrapper             ← pagination
      span.w-page-count.page-count                       ← "1 / 8"
      a                                                  ← "Next" button (→ ?page=2)

section.section                                          ← CTA (reuse HomeCta)
  div.home-cta
    div.container.section-container
      div.section-head.is-large
        h2.section-head_title                            ← "Ready to ship more winning ads?"
        p.section-head_paragraph.is-large                ← "Unlock the power..."
        div.main-cta-buttons
          a.button-dark.button-primary                   ← "Start free trial"
          a.button-dark.button-secondary                 ← "View Pricing"
      div.home-cta-image-wrapper
        img.home-cta-image                               ← hero image
```

### Key Layout Details

| Element | Value |
|---------|-------|
| Hero grid | `w-layout-grid blog-header-grid` — 2-col (featured 60% + popular 40%) |
| Category chips | `blog-tag` — horizontal scroll, dark bg, pill shape |
| Card grid | `blog-list w-dyn-items` — 2 columns, gap ~24px |
| Card image | `blog-carousel-card-image` — rounded-xl, aspect-video |
| Card author | 32px circle avatar + name + read time |
| Card title | `text-display-h5 line-clamp-2` |
| Card excerpt | `text-body-s line-clamp-3` |
| Pagination | page count "1 / 8" + Next button with `?page=N` |
| Categories (15) | SAAS Operators Podcast, Behind the Bootstraps, Spyder, AD&P, Foreplay Ships, TikTok Creative Center, Facebook Ad Library, Ad Briefs, Ad Inspiration, Swipe File, Google Ads, LinkedIn Ads, Creative Strategy, TikTok Ads, Meta Ads |

---

## Route 2: `/blog/[slug]` (Blog Post Detail)

| Foreplay Route Group | Số routes | GoAds Idea | Priority |
|---------------------|-----------|-----------|----------|
| Solutions (`/industries/*`) — ecommerce, agencies, mobile-apps, b2b-saas, freelancers | 5+ | 💡 `/solutions/*` — vertical landing pages | P1 |
| Comparison (`/comparison/*`) — vs motion, atria, superads... | 9 | 💡 GoAds vs competitors (SEO) | P1 |
| Affiliates (`/affiliates`) | 1 | 💡 Affiliate program | P2 |
| University (`/university/classes`) | 1 | ✅ Cloned | P2 |
| Watch Demo (`/watch-demo`) | 1 | 💡 Product demo video | P2 |
| Changelog (`/ships`) | 1 | 💡 GoAds changelog | P3 |
| Careers (`/careers/*`) | 2 | 💡 Hiring page | P3 |
| Media Kit (`/media-kit`) | 1 | 💡 Press / brand assets | P3 |
| Experts (`/experts`, `/experts/[slug]`) | 2 | 💡 GoAds certified partners? | P3 |
| Events (`/fireside`, `/events/[slug]`) | 2 | 💡 Webinar / event landing | P3 |
| Agency Directory (`/agency-directory`, `/agencies/[slug]`) | 2 | 💡 Partner agency listing | P3 |
| Chrome Extension (`/chrome-extension`) | 1 | ❌ GoAds ko có extension | — |
| Mobile App (`/mobile-app`) | 1 | ❌ GoAds ko có app | — |
| API (`/api`) | 1 | ❌ Dùng `/docs` thay | — |
| Bounties (`/bounties`) | 1 | ❌ Community bounty program | — |
| Work With Brands (`/work-with-brands`) | 1 | ❌ Brand partnership apply | — |
| **EXTERNAL (subdomain / 3rd party)** |
| Feature Requests (`featurebase.app/en`) | 1 | 💡 GoAds feature voting board | P2 |
| Public Roadmap (`featurebase.app/en/roadmap`) | 1 | 💡 GoAds product roadmap | P2 |
| Changelog (`featurebase.app/en/changelog`) | 1 | 💡 GoAds changelog (= `/ships`) | P3 |
| Knowledge Base (`help.foreplay.co/en/help`) | 1 | ✅ Đã match → `/docs/*` | — |

### Page Sections (top → bottom)

```
section.section.relative                                 ← Post header
  div.container.section-container
    div.blog-breadcrumb                                  ← Blog > Category > Title
      a.blog-breadcrumb-link                             ← "Blog" link
      div.blog-breadcrumb-separator                      ← "/"
      a.blog-breadcrumb-link                             ← category link
      div.blog-breadcrumb-separator
      span                                               ← current title (truncated)
    div.blog-head
      h1.text-display-h1                                 ← post title
      div.blog-author
        div.blog-author-avatar-border
          img.blog-author-avatar-image                   ← author avatar (48px)
        div
          div.text-label-m                               ← author name
          div.text-body-s.text-alpha-68                  ← author title (e.g. "Head of Marketing")
        div.blog-author-links                            ← social icons (LinkedIn, Twitter, etc.)
    div.blog-cover
      div.blog-image-border
        img.blog-image                                   ← featured image (full-width, rounded-2xl)

section.section                                          ← Post body + TOC sidebar
  div.container.section-container
    div.blog-main-wrapper                                ← 2-col: TOC sidebar + content
      div.blog-toc-wrapper                               ← LEFT: sticky TOC sidebar
        div.blog-toc
          ul.blog-toc-list.w-list-unstyled
            li
              a.blog-toc-h2                              ← TOC link (auto-generated from h2s)
              a.blog-toc-h2.is-active                    ← active state via IntersectionObserver
      div.blog-body                                      ← RIGHT: article content
        div.blog-rtb.w-richtext                          ← rich text block
          h2                                             ← section headings (targets for TOC)
          p                                              ← paragraphs
          blockquote                                     ← quotes (3px left border white)
          figure                                         ← images
          div.w-embed                                    ← YouTube embeds
        div.blog-line                                    ← separator line

section.section                                          ← Blog inline CTA
  div.blog-cta
    div.blog-cta-content
      div.blog-cta-text
        h3                                               ← "30 Second Summary"
        p                                                ← AI summary link
      a.blog-cta-lightbox-link                           ← video lightbox
        img.blog-cta-lightbox-thumbnail
        div.blog-cta-lightbox-play                       ← play icon overlay

section.section                                          ← Related articles carousel
  div.container.section-container
    div.blog-related-head
      h3.text-display-h4                                 ← "Related Articles"
    div.blog-related                                     ← horizontal scroll carousel
      div.blog-related-list.w-dyn-items
        div.blog-related-collection-item.w-dyn-item
          a.blog-carousel-card                           ← same card as listing page
            div.blog-carousel-card-cover
              img.blog-carousel-card-image
            div.blog-carousel-card-content
              div.blog-carousel-card-author
                img.blog-carousel-card-author-avatar
                div.blog-carousel-card-text
                  div.text-label-xs                      ← author name
                  div.text-body-xs.text-alpha-68          ← read time
              h3.text-display-h5.line-clamp-2
              p.text-body-s.line-clamp-3

section.section                                          ← CTA (same HomeCta as listing)
```

### Key Layout Details

| Element | Value |
|---------|-------|
| Breadcrumb | Blog > Category > Title — `blog-breadcrumb` |
| Author | 48px avatar + name + title + social links |
| Featured image | full-width, `blog-image-border` (rounded-2xl) |
| Content layout | 2-col: sticky TOC sidebar left + `blog-body` right |
| TOC | `blog-toc-list` — auto-generated from h2s, scroll-sync with IntersectionObserver, `.is-active` |
| Rich text | `blog-rtb w-richtext` — h2/h3/p/blockquote/figure/embed |
| Quote style | `border-left: 3px solid white`, left padding |
| Related articles | horizontal carousel with `blog-carousel-card` (same card component as listing) |
| Blog CTA | "30 Second Summary" + video lightbox (between content and related) |

---

## Shared Components

| Component | Used In | Foreplay Class |
|-----------|---------|----------------|
| Blog Card | listing grid + related carousel | `blog-carousel-card` + `blog-carousel-card-cover/content/author` |
| Category Chip | listing categories | `blog-tag` |
| Author Badge (small) | cards | `blog-carousel-card-author` (32px avatar + name + read time) |
| Author Badge (large) | post header | `blog-author` (48px avatar + name + title + social links) |
| Blog Feed Item | popular blogs sidebar | `blog-feed-link` (title + author + read time, no image) |
| HomeCta | listing + detail bottom | `home-cta` (already cloned) |
| TOC Sidebar | detail only | `blog-toc-wrapper` (sticky, scroll-sync) |
| Breadcrumb | detail only | `blog-breadcrumb` |

---

## Typography Classes

| Class | Usage |
|-------|-------|
| `text-overline` | "Blog" label in hero |
| `text-display-h1` | hero subtitle + post title |
| `text-display-h3` | featured post title |
| `text-display-h4` | "Related Articles" heading |
| `text-display-h5` | card titles + "Popular Blogs" |
| `text-label-m` | author name (detail) |
| `text-label-s` | nav items |
| `text-label-xs` | author name (card) |
| `text-body-m` | excerpt (featured) |
| `text-body-s` | excerpt (card) + author title |
| `text-body-xs` | read time |
| `text-alpha-68` | muted text (68% opacity) |
| `text-alpha-100` | full opacity text |
| `text-white-68` | white at 68% opacity |
| `line-clamp-2` | card title (max 2 lines) |
| `line-clamp-3` | card excerpt (max 3 lines) |

---

## GoAds Adaptation Notes

### Routes
| GoAds Route | Maps to Foreplay |
|-------------|-----------------|
| `/blog` | `/blog` (listing) |
| `/blog/[slug]` | `/post/[slug]` (detail) |
| `/blog/category/[slug]` | `/category/[slug]` (filtered listing) — optional, can use query param |

### What to reuse (already cloned)
- `HomeCta` — bottom CTA section
- `SectionHead` — heading pattern
- `container section-container` — GoAds container system
- Blog card component → new shared component for listing + related carousel

### What to clone new
1. **BlogHero** — hero with featured post + popular blogs sidebar (`blog-header-grid`)
2. **BlogCategoryBar** — horizontal scrollable category chips (`blog-categories`)
3. **BlogCard** — shared card for listing + related carousel (`blog-carousel-card`)
4. **BlogFeedItem** — text-only post link for popular sidebar (`blog-feed-link`)
5. **BlogPagination** — page count + next/prev (`blog-pagination`)
6. **BlogBreadcrumb** — detail page breadcrumb (`blog-breadcrumb`)
7. **BlogAuthor** — detail page author block with social links (`blog-author`)
8. **BlogTOC** — sticky sidebar TOC with scroll-sync (`blog-toc-wrapper`)
9. **BlogContent** — rich text wrapper with prose styling (`blog-rtb`)
10. **BlogRelatedCarousel** — horizontal related posts carousel (`blog-related`)
11. **BlogInlineCTA** — mid-article CTA with video lightbox (`blog-cta`) — adapt to GoAds

### Data
- `src/data/blog-posts.ts` — already exists (5 posts), extend with category, author avatar, read time
- Categories: adapt to GoAds topics (Meta Ads, Google Ads, TikTok Ads, Account Tips, Scaling, etc.)

### Canvas bg
- Hero has `canvas#product-hero-canvas` particle/gradient animation
- Can skip or replace with CSS gradient — low priority visual
