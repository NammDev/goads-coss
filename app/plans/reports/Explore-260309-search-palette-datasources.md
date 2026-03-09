# Command+K Search Palette Data Sources - Complete Catalog

**Date:** March 9, 2026  
**Project:** GoAds COSS Tools  
**Scope:** All searchable data sources for command+K feature  
**Thoroughness Level:** Medium (comprehensive catalog of all data sources)

---

## Executive Summary

Found **9 primary data files** containing searchable content across:
- **Tools:** 19 items across 3 categories
- **Pages/Routes:** 41 marketing routes + docs dynamic routes
- **Blog Posts:** 5 published articles with sections
- **FAQs:** 9 main items + 4 tabbed categories with subsections
- **Documentation:** 3 articles with nested navigation
- **Navigation:** 5 main menu categories with 25+ links
- **Pricing:** 3 pricing plans with feature descriptions
- **Testimonials:** 3 review cards with details

---

## 1. Tools Registry (19 Tools)

**File:** `/Users/nammdev/Documents/Code/goads-coss-tools/app/src/data/tools-registry.ts`  
**Type:** `ToolItem[]` with `ToolCategory` enum  
**Categories:** Security, Data Processing, Utilities  

### All Tools (Searchable)

| Slug | Title | Category | Featured | Description |
|------|-------|----------|----------|-------------|
| `2fa` | 2FA Generator | Security | Yes | Generate TOTP codes from your 2FA secrets |
| `cookie` | Log In by Cookie | Security | Yes | Convert JSON cookies to UID\|Pass\|Cookie format |
| `filter` | Account Filter | Data | Yes | Parse & reformat account data with flexible output |
| `split-data` | Split Data Profile | Data | Yes | Split text by delimiter into separate columns |
| `remove-duplicates` | Remove Duplicates | Data | No | Remove or highlight duplicate lines from text |
| `merge` | Filter & Merge | Data | No | Combine multiple text sources and merge by key |
| `notepad` | Online Notepad | Utility | No | Quick notes saved in your browser |
| `check-ip` | IP Checker | Utility | Yes | View your public IP address and location info |
| `batch-watermark` | Batch Watermark | Utility | No | Add watermark to multiple images at once |
| `check-duplicates` | Check Duplicates | Data | No | Report duplicate lines without removing them |
| `find-fb-id` | Find Facebook ID | Utility | No | Extract numeric IDs from Facebook profile URLs |
| `fb-icons` | Facebook Icons | Utility | No | Copy unicode emoji icons for social media marketing |
| `filter-text` | Filter Text | Data | No | Filter lines by keyword or length conditions |
| `check-content` | Check Content | Utility | No | Analyze text: word count, emails, URLs, and more |
| `mini-tools` | All Tools | Utility | No | Browse all available tools in one place |
| `bookmarklets` | Bookmarklet Scripts | Utility | No | Useful JS bookmarklets for ad account management |
| `check-uid` | Check Live UID | Security | No | Check if Facebook UIDs are live or dead accounts |
| `fake-id` | Fake ID Generator | Utility | No | Generate fictional ID card images for testing purposes |
| `random-face` | Random Face Generator | Utility | No | Generate random avatar photos instantly |
| `getnada` | Quick Read Getnada | Utility | No | Read your temporary Getnada inbox without leaving the page |

**Exportable Functions:**
- `getToolsByCategory(category: ToolCategory): ToolItem[]`
- `getFeaturedTools(): ToolItem[]`
- `getToolBySlug(slug: string): ToolItem | undefined`

---

## 2. Blog Posts (5 Articles)

**File:** `/Users/nammdev/Documents/Code/goads-coss-tools/app/src/data/blog-posts.ts`  
**Type:** `BlogPost[]`  
**Search Fields:** `slug`, `title`, `description`, `category`, `author`, `sections[].title`, `sections[].content`

### Blog Posts with Sections

1. **"How to Scale Facebook Ads with Agency Accounts"**
   - Category: Facebook Ads
   - Author: GoAds Team
   - Date: March 5, 2026
   - Read Time: 8 min
   - Sections: "Why Agency Accounts Matter", "Optimal Account Structure", "Budget Scaling Strategies"

2. **"Understanding Meta Business Manager Limits and How to Work Around Them"**
   - Category: Agency Accounts
   - Author: GoAds Team
   - Date: February 28, 2026
   - Read Time: 12 min
   - Sections: "Business Manager Limits Overview", "Spending Thresholds Explained", "Best Practices for BM Management"

3. **"Google Whitelisted Accounts Explained: What They Are and Why You Need One"**
   - Category: Google Ads
   - Author: GoAds Team
   - Date: February 20, 2026
   - Read Time: 10 min
   - Sections: "What Is a Whitelisted Account?", "Key Benefits", "How to Get a Whitelisted Account"

4. **"Getting Started with TikTok Verified Ad Accounts"**
   - Category: TikTok Ads
   - Author: GoAds Team
   - Date: February 15, 2026
   - Read Time: 9 min
   - Sections: "The TikTok Advertising Opportunity", "Account Setup Guide", "Scaling on TikTok"

5. **"7 Proven Strategies to Avoid Facebook Ad Account Bans"**
   - Category: Facebook Ads
   - Author: GoAds Team
   - Date: February 8, 2026
   - Read Time: 11 min
   - Sections: "Common Reasons for Account Bans", "Prevention Strategies", "What to Do If You Get Banned"

**Exportable Functions:**
- `getBlogPost(slug: string): BlogPost | undefined`

---

## 3. Documentation / Knowledge Base

**File:** `/Users/nammdev/Documents/Code/goads-coss-tools/app/src/data/docs-navigation.ts`  
**Type:** `DocsTab[]` with hierarchical `DocsNavItem[]`

### Documentation Structure (5 Tabs)

#### Tab 1: Getting Started
- What is an Agency Account? (`what-is-agency-account`)
- How GoAds Works (`how-goads-works`)
- First Purchase Guide (`first-purchase-guide`)

#### Tab 2: Meta / Facebook
- **Ad Accounts**
  - Setup Guide (`setup-guide`)
  - Spending Limits (`spending-limits`)
- **Business Manager**
  - BM Overview (`overview`)
  - Adding Assets (`adding-assets`)
- **Troubleshooting**
  - Account Disabled (`account-disabled`)
  - Policy Violations (`policy-violations`)

#### Tab 3: Google Ads
- **Whitelisted Accounts**
  - What is Whitelisting? (`what-is-whitelisting`)
  - Setup Guide (`setup-guide`)
- **Troubleshooting**
  - Suspension Issues (`suspension-issues`)

#### Tab 4: TikTok Ads
- **Verified Accounts**
  - Account Types (`account-types`)
  - Setup Guide (`setup-guide`)

#### Tab 5: Billing & Support
- Warranty Policy (`warranty-policy`)
- Payment Methods (`payment-methods`)
- Contact Support (`contact-support`)

**Searchable Doc Articles:** 3 implemented (in `docs-articles.tsx`)
1. "What is an Agency Ad Account?" (getting-started/what-is-agency-account)
2. "Setting Up Your Meta Ad Account" (meta/ad-accounts/setup-guide)
3. "Warranty & Refund Policy" (billing/warranty-policy)

**Exportable Functions:**
- `getTabBySlug(slug: string): DocsTab | undefined`
- `getFlatDocs(): FlatDocItem[]` — flattens hierarchy for search/nav

---

## 4. FAQ Data

**File:** `/Users/nammdev/Documents/Code/goads-coss-tools/app/src/data/landing-faq.ts`  
**Type:** `FAQItem[]` + `FAQTab[]`

### Main FAQ Items (9 Questions)

1. What is an agency ad account?
2. How does the 7-day warranty work?
3. How fast is delivery?
4. What payment methods do you accept?
5. Can I use these accounts with anti-detect browsers?
6. What is a Business Manager (BM)?
7. Do you offer bulk discounts?
8. How do I get support?
9. What makes GoAds different from other providers?

### Tabbed FAQ (4 Categories)

1. **Products & Services**
   - General product overview
2. **Warranty Policy**
   - Detailed warranty terms with use cases and conditions
3. **Billing & Payments**
   - Payment methods overview
4. **Support**
   - Support channels (Telegram, WhatsApp, email)

---

## 5. Navigation Menu Data

**File:** `/Users/nammdev/Documents/Code/goads-coss-tools/app/src/components/nav-mega-menu-data.tsx`  
**Type:** Exported arrays of navigation items

### Menu Sections (5 Categories)

#### Agency Accounts (3 items)
- Facebook Agency Accounts → `/agency-ad-account`
- Google Agency Accounts → `/google-agency`
- TikTok Agency Accounts → `/tiktok-agency`

#### Products — Assets (4 items)
- Business Managers → `/bm`
- Facebook Profiles → `/profiles`
- Facebook Pages → `/pages`
- TikTok Assets → `/tiktok-accounts`

#### Products — Services (2 items)
- Unban Meta Assets → `/unban`
- Blue Verification → `/blue-verification`

#### Resources — Company (3 items)
- About Us → `/about`
- Milestones → `/milestones`
- Partner Offers → `/partners`

#### Resources — Learn (4 items)
- Blog → `/blog`
- Documentation → `/docs`
- Reviews → `/reviews`
- FAQ → `/faq`

#### Resources — Support (3 items)
- Help Center → `/help`
- Payment Methods → `/payment`
- Talk to Sales → `/talk-to-sales`

#### Tools (9 featured items)
- 2FA Generator → `/tools/2fa`
- Cookie Converter → `/tools/cookie`
- Account Filter → `/tools/filter`
- Split Data → `/tools/split-data`
- Remove Duplicates → `/tools/remove-duplicates`
- Filter & Merge → `/tools/merge`
- Online Notepad → `/tools/notepad`
- IP Checker → `/tools/check-ip`
- Batch Watermark → `/tools/batch-watermark`

---

## 6. Pricing Plans

**File:** `/Users/nammdev/Documents/Code/goads-coss-tools/app/src/data/landing-reviews-pricing-faq.ts`  
**Type:** `PricingPlan[]`

### Pricing Tiers (3 Plans)

1. **Advanced Setup** — $250
   - 1x BM3 Verified
   - 2x Premium Profiles
   - 1x Aged Reinstated Page
   - 14-Day Warranty

2. **Premium Setup** — $650 (Popular)
   - 1x BM5 Verified ($250 limit)
   - 1x BM3 Verified
   - 4x Premium Profiles
   - 3x Aged Reinstated Pages
   - 14-Day Warranty

3. **Elite Setup** — $890 (Highlighted)
   - 2x BM5 Verified ($250 limit each)
   - 6x Premium Profiles
   - 3x Aged Reinstated Pages
   - 1x 10,000 Followers Page
   - 14-Day Warranty

---

## 7. Testimonials / Reviews

**File:** `/Users/nammdev/Documents/Code/goads-coss-tools/app/src/data/landing-reviews-pricing-faq.ts`  
**Type:** `ReviewCard[]`

### 3 Customer Reviews

1. **Daniel Carter** — Performance Marketing Lead
   - Rating: 5/5
   - Message: "Working with GoAds has been one of the best decisions..."

2. **Michael Torres** — Media Buying Manager
   - Rating: 5/5
   - Message: "GoAds has been incredibly reliable for our campaigns..."

3. **Sarah Mitchell** — E-commerce Growth Manager
   - Rating: 5/5
   - Message: "We've worked with several providers before, but GoAds stands out..."

---

## 8. Landing Page / Hero Data

**File:** `/Users/nammdev/Documents/Code/goads-coss-tools/app/src/data/landing-hero.ts`  
**Type:** Static arrays of platforms, brands, and messaging

**Searchable Content:**
- Rotate Words: "Scaling", "Growing", "Winning", "Profiting"
- Typewriter Words: "Media Buyers", "Agencies", "E-commerce Brands", "Dropshippers", "Lead Gen Teams"
- Hero Section Words: "Meta", "Google", "TikTok"
- Platform Logos: Meta, Google Ads, TikTok, Facebook, Instagram
- Brand Logos: Same as above (12 items with URLs)

---

## 9. Landing Page Stats & Bento

**File:** `/Users/nammdev/Documents/Code/goads-coss-tools/app/src/data/landing-stats.ts`  
**Type:** `StatItem[]`

### 4 Key Stats

1. 4,000+ Agency Ad Accounts Delivered
2. $25M+ Ad Spend Powered
3. 98.5% Account Stability Rate
4. 600+ Advertisers & Agencies

**Additional Content** (from `landing-bento.ts`):
- Chat testimonials (8 items)
- Growth card data
- Stay informed notifications (6 items)

---

## 10. All Routes (41 Marketing + Dynamic Docs)

**File Locations:** `/app/src/app/` (page.tsx in each directory)

### Marketing Routes (41)

```
(marketing)/
├── index (/)
├── about
├── agency-ad-account
├── blog
├── blog/[slug] (dynamic)
├── blue-verification
├── bm
├── faq
├── google-agency
├── help
├── milestones
├── pages
├── partners
├── payment
├── pricing
├── profiles
├── reviews
├── talk-to-sales
├── tiktok-accounts
├── tiktok-agency
├── unban
```

### Tools Routes (21)

```
tools/
├── index (tools hub)
├── 2fa
├── batch-watermark
├── bookmarklets
├── check-content
├── check-duplicates
├── check-ip
├── check-uid
├── cookie
├── fake-id
├── fb-icons
├── filter
├── filter-text
├── find-fb-id
├── getnada
├── merge
├── mini-tools
├── notepad
├── random-face
├── remove-duplicates
├── split-data
```

### Documentation Routes

```
docs/
├── [[...slug]] (dynamic catch-all for docs hierarchy)
└── Supports nested routes like:
    - /docs/getting-started/what-is-agency-account
    - /docs/meta/ad-accounts/setup-guide
    - /docs/billing/warranty-policy
    - etc.
```

---

## Data File Sizes & Density

| File | Lines | Items | Type |
|------|-------|-------|------|
| `tools-registry.ts` | 219 | 19 tools | TypeScript |
| `blog-posts.ts` | 225 | 5 posts (25 sections) | TypeScript |
| `landing-faq.ts` | 117 | 13 FAQ items | TypeScript |
| `docs-navigation.ts` | 150 | 28 doc pages | TypeScript |
| `nav-mega-menu-data.tsx` | 190 | 28 nav items | TypeScript/JSX |
| `landing-hero.ts` | 64 | 54 strings/brands | TypeScript |
| `docs-articles.tsx` | 202 | 3 articles | TypeScript/JSX |
| `landing-reviews-pricing-faq.ts` | 105 | 6 items (pricing/reviews) | TypeScript |
| `landing-stats.ts` | 19 | 4 stats | TypeScript |
| `landing-bento.ts` | 73 | 14 data items | TypeScript |

**Total Searchable Items:** ~270+ items across all sources

---

## Search Palette Implementation Recommendations

### High-Priority Sources
1. **Tools** (19 items) — User-centric, frequently accessed
2. **Routes** (41 marketing + 21 tools) — Navigation backbone
3. **Blog Posts** (5 articles, 25 sections) — Educational content
4. **Documentation** (28 pages) — How-to reference

### Medium-Priority Sources
5. **Navigation Menu** (28 items) — Duplicate routes, lower priority
6. **FAQ** (13 items) — Customer support, searchable questions
7. **Pricing Plans** (3 items) — Product comparison

### Lower-Priority Sources
8. **Reviews** (3 items) — Social proof, limited search value
9. **Stats/Hero Data** (50+ items) — Marketing copy, less searchable

### Data Organization for Search

**Suggested Search Index Structure:**
```typescript
interface SearchIndex {
  tools: ToolItem[]
  pages: PageRoute[]
  articles: BlogPost[]
  docs: FlatDocItem[]
  faq: FAQItem[]
  pricing: PricingPlan[]
}

// Each item includes:
// - id/slug
// - title/name
// - description
// - category/type
// - url/href
// - tags (optional)
// - keywords (optional)
```

---

## Unresolved Questions

1. **Search Ranking:** Should featured tools/products be weighted higher in results?
2. **Dynamic Content:** Will docs articles support search, or just navigation metadata?
3. **Blog Sections:** Should blog posts be indexed at section level or post level only?
4. **URL Structure:** Will search redirect to `/tools/[slug]` or `/tools/[slug]#page`?
5. **Excluded Content:** Any pages/content that should NOT be searchable (pricing, reviews)?
6. **Keyboard Shortcut:** Confirmed as Cmd+K (or Ctrl+K on Windows)?
7. **Search History:** Should palette cache recent searches per user?
8. **Autocomplete:** Integration with existing autocomplete library, or custom?

---

**Report Generated:** March 9, 2026  
**Report Status:** Complete & Ready for Implementation
