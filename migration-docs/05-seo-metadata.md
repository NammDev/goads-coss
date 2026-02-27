# GoAds SEO & Metadata

> All SEO data, meta tags, keywords, and schema markup for the new project.

---

## Target Keywords

| Priority | Keyword | Intent |
|----------|---------|--------|
| Primary | agency ad accounts | Transactional |
| Primary | meta agency ad accounts | Transactional |
| Primary | facebook business manager | Informational |
| Primary | buy facebook ad account | Transactional |
| Secondary | google agency ad accounts | Transactional |
| Secondary | tiktok agency ad accounts | Transactional |
| Secondary | facebook ad account banned | Problem-solve |
| Long-tail | buy verified facebook business manager | Transactional |
| Long-tail | aged facebook accounts for ads | Transactional |
| Branded | goads review | Research |
| Branded | goads agency | Navigation |

---

## Meta Tags

### Homepage
- **Title:** "Agency Ad Accounts | 7-Day Warranty + 24/7 Support | GoAds"
- **Description:** "Buy verified Business Managers & agency ad accounts. 3,242+ BMs sold, 7-day warranty, 24/7 support. Scale your Facebook ads without bans."

### Products Page
- **Title:** "Buy Facebook Business Managers BM1-BM5 | Verified | GoAds"
- **Description:** "Verified BMs from $80. Pre-tested, stable, 7-day replacement. 1,849+ BM5 sold. Fast delivery, real support."

### Blog Page
- **Title:** "GoAds Blog | Meta Ads Guides, Tips & Policy Updates"
- **Description:** "Learn to scale your Meta, Google, and TikTok advertising with guides from active advertisers. Tips, strategies, and policy updates."

### Contact Page
- **Title:** "Contact GoAds | Custom Quotes & Enterprise Solutions"
- **Description:** "Get a custom quote for bulk orders, reseller partnerships, or custom setups. Response within 24 hours."

---

## Schema Markup Types

| Schema | Where | Purpose |
|--------|-------|---------|
| Organization | Homepage | Company info, logo, contact |
| Product | Product pages | Price, availability, offers |
| FAQ | FAQ section, homepage | Rich snippets for FAQ |
| Review/Rating | Testimonials | Star ratings in search |
| BreadcrumbList | All pages | Navigation breadcrumbs |
| HowTo | Process section | Step-by-step rich results |
| BlogPosting | Blog post pages | Article rich snippets |
| SoftwareApplication | Homepage | App/service listing |

---

## SEO Tactics

| Tactic | Implementation |
|--------|---------------|
| Benefit-first titles | "Agency Ad Accounts \| 7-Day Warranty + Support \| GoAds" |
| Numbers everywhere | "3,242+ BM1 Sold", "500+ Clients", "50+ Countries" |
| Platform badges | Meta, Google, TikTok, Bing logos in hero |
| Social proof | Testimonials section, client logos |
| How it Works | 3-step process section |
| Tier comparison | Visual pricing grid |
| Power words in H1 | "Unlock", "Scale", "Stop Losing" |
| Scarcity | "Limited stock", "Fast-selling" (if true) |
| Case studies | Before/after stories |

---

## Open Graph / Social Sharing

```html
<meta property="og:title" content="GoAds - Agency Ad Accounts">
<meta property="og:description" content="Stop Losing Accounts. Start Scaling. 7-day warranty, 24/7 support.">
<meta property="og:image" content="/og-image.png">
<meta property="og:url" content="https://www.goads.shop">
<meta property="og:type" content="website">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="GoAds - Agency Ad Accounts">
```

---

## Sitemap Routes

```
/                     → Homepage
/products             → All products
/products/[category]  → Product category pages
/pricing              → Pricing page
/blog                 → Blog listing
/blog/[slug]          → Individual blog posts
/contact              → Contact / enterprise form
/about                → About page (if exists)
```

---

## Blog Post SEO Pattern

Each blog post should have:
- Title tag: `{Post Title} | GoAds Blog`
- Meta description: From frontmatter `description` field
- Canonical URL: `https://www.goads.shop/blog/{slug}`
- JSON-LD BlogPosting schema with: headline, description, datePublished, author, image
- Open Graph tags for social sharing
