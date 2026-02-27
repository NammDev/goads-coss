# GoAds → shadcn-studio Migration Mapping

> How GoAds content maps to shadcn-studio's structure. Reference for the new project.

---

## shadcn-studio Tech Stack

| Component | Version |
|-----------|---------|
| Next.js | 15.3.3 |
| React | 19 |
| Tailwind CSS | 4.1 |
| UI Library | Radix UI + shadcn/ui |
| Styling | CSS Modules + Tailwind |
| Content | registry.json + local files |
| Fonts | Geist Sans + Geist Mono |
| Deployment | Vercel |

---

## Key Differences

| Aspect | krea-v4 (current) | shadcn-studio (target) |
|--------|-------------------|----------------------|
| Framework | Next.js 16.1 | Next.js 15.3 |
| CSS | Tailwind v4 | Tailwind v4.1 |
| Fonts | Suisse Intl | Geist Sans + Geist Mono |
| UI Components | Custom from scratch | shadcn/ui + Radix UI |
| Content | MDX files (gray-matter) | registry.json + code files |
| Color System | primary-0 to primary-1000 | shadcn default (customize) |
| Animations | Custom (animation-config.ts) | Framer Motion |

---

## Page-to-Page Mapping

### shadcn-studio Pages → GoAds Equivalents

| shadcn-studio Page | GoAds Equivalent | Content Source |
|-------------------|------------------|---------------|
| Homepage (/) | Homepage (/) | `02-homepage-content.md` |
| Blocks library | Products (/products) | `04-product-catalog.md` |
| Pricing (/pricing) | Pricing (/pricing) | `04-product-catalog.md` → Pricing Packs |
| Blog (/blog) | Blog (/blog) | `03-blog-content.md` |
| Blog Post (/blog/[slug]) | Blog Post (/blog/[slug]) | `03-blog-content.md` |
| Docs (if any) | Getting Started / Guides | Blog posts tagged "Getting Started" |

---

## Content Migration Steps

### Step 1: Replace Brand Identity
1. Replace shadcn-studio logo with GoAds logo
2. Update `metadata` in `layout.tsx` with GoAds info (see `05-seo-metadata.md`)
3. Replace color tokens (see `01-brand-identity.md` → Full Token Scale)
4. Replace font references: Geist → Suisse Intl (or keep Geist if preferred)

### Step 2: Replace Homepage Sections
Map shadcn-studio homepage sections to GoAds content:

| shadcn-studio Section | Replace With | Source |
|----------------------|-------------|--------|
| Hero | GoAds Hero | `02-homepage-content.md` → Section 2 |
| Feature showcase | Feature Cards (5 cards) | `02-homepage-content.md` → Section 3 |
| Testimonials | 12 Testimonials | `02-homepage-content.md` → Section 11 |
| Pricing | 4 Pricing Packs | `02-homepage-content.md` → Section 8 |
| FAQ | 7 FAQ Items | `02-homepage-content.md` → Section 17 |
| CTA | CTA Banner | `02-homepage-content.md` → Section 18 |
| Footer | GoAds Footer | `06-navigation-structure.md` → Footer |

### Step 3: Set Up Blog
1. Create blog posts from `03-blog-content.md`
2. Adapt frontmatter to shadcn-studio's blog format
3. Set up category filtering (5 categories)
4. Configure featured posts (3 featured)

### Step 4: Set Up Products/Pricing
1. Create product pages from `04-product-catalog.md`
2. Set up pricing section with 4 pack tiers
3. Add individual product listings
4. Set up contact form from `02-homepage-content.md` → Section 12

### Step 5: Configure SEO
1. Add meta tags from `05-seo-metadata.md`
2. Set up JSON-LD schemas (Organization, Product, FAQ, BlogPosting)
3. Configure Open Graph tags
4. Set up sitemap

### Step 6: Configure Navigation
1. Set up header navigation from `06-navigation-structure.md`
2. Set up products dropdown
3. Set up footer columns
4. Set up internal linking

---

## shadcn-studio Features to Keep

These shadcn-studio features are valuable and should be preserved:

1. **Component registry system** — Adapt for product catalog display
2. **Dark/light mode toggle** — GoAds uses light mode primarily, but dark mode is nice-to-have
3. **Blog system** — Reuse for GoAds blog posts
4. **Responsive layout** — Keep the responsive grid system
5. **shadcn/ui components** — Use for buttons, cards, forms, etc.
6. **Search functionality** — Adapt for product/blog search
7. **Code block styling** — Useful for setup guides in blog

---

## shadcn-studio Features to Modify

| Feature | Current (shadcn) | Target (GoAds) |
|---------|-----------------|----------------|
| Homepage hero | Code/component showcase | Product-focused hero with trust badge |
| Registry/blocks | Component library | Product catalog |
| Sidebar | Component categories | Product categories |
| Documentation | Component docs | Setup guides / blog |
| Code preview | Live component preview | Product feature preview |

---

## New Sections to Add (Not in shadcn-studio)

These GoAds sections need to be built new:

1. **Feature Cards carousel** — Horizontal scroll, 5 platform cards
2. **Bento Grid** — 14-card benefit grid (complex layout)
3. **Use Cases accordion** — 7 benefits with expand/collapse
4. **Testimonials bento** — 12 testimonials in masonry grid
5. **Meta Assets catalog** — Filterable product grid with sidebar
6. **Enterprise contact form** — Multi-field form with dropdowns
7. **Guarantee cards** — 4-column guarantee section
8. **Community section** — Stats + Telegram CTA
9. **CTA Banner** — Dark full-width conversion section
10. **Scrolling marquees** — Logo/trust/payment marquees

---

## Color Token Mapping (shadcn → GoAds)

If shadcn-studio uses default shadcn colors, map them:

| shadcn Token | GoAds Token | Hex |
|-------------|-------------|-----|
| background | primary-0 | #FFFFFF |
| foreground | primary-1000 | #000000 |
| muted | primary-100 | #F5F5F5 |
| muted-foreground | primary-500 | #737373 |
| border | primary-200 | #E5E5E5 |
| ring | accent-600 | #2563EB |
| primary | primary-1000 | #000000 |
| primary-foreground | primary-0 | #FFFFFF |

---

## Priority Order for Migration

1. **Brand swap** (logo, colors, fonts, metadata) — 2 hours
2. **Homepage content** (hero, features, pricing) — 4 hours
3. **Blog system** (12 posts, categories, listing) — 3 hours
4. **Product pages** (catalog, individual products) — 4 hours
5. **Contact form** (enterprise quote form) — 1 hour
6. **SEO setup** (schemas, meta tags, sitemap) — 2 hours
7. **Additional sections** (testimonials, FAQ, guarantees) — 4 hours
8. **Polish & responsive** (mobile testing, animations) — 4 hours

**Total estimated:** ~24 hours of work
