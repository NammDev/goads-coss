# GoAds Product Pages — Content Brief for Justin

## Context

We have 4 product routes that share the same layout template:
- `/profiles` ✅ (done — use as reference)
- `/bm` (Business Manager)
- `/pages` (Facebook Pages)
- `/tiktok-accounts` (TikTok Assets)

Each page uses the **exact same UI layout** — only **text content** changes per product. Images, logos, icons, CSS, layout all stay identical.

## Reference: `/profiles` page (completed)

File: `app/src/data/goads-profiles-page-data.ts`

---

## Template: What to write for each product

For each route (`/bm`, `/pages`, `/tiktok-accounts`), create a data file following this exact structure. **Only fill in the text fields.** Do NOT change any `imageSrc`, `logoSrc`, `authorImageSrc`, `decorationLeftSrc`, `decorationRightSrc` values.

### SECTION 1: Hero

```
overline: [Product category, e.g. "BUSINESS MANAGER"]
title: [Main headline, e.g. "Buy Verified Business Managers"]
description: [1-2 sentences describing the product value]
ctaLabel: "Get Started"
ctaHref: "/talk-to-sales"
```

**Example (from /profiles):**
- overline: "Facebook Profiles"
- title: "Buy Aged Facebook Profiles"
- description: "Run ads without interruptions. Pre-tested, ID-verified, and backed by warranty. The foundation every serious advertiser needs."

---

### SECTION 2: Comparison Table

This section uses the **shared pricing comparison table** — no text needed. Same across all product pages.

---

### SECTION 3: Feature Grid 1 — "All Products" (6 cards)

```
subtitle: [Tag, e.g. "ALL PRODUCTS"]
title: [Headline]
description: [Subheadline]

Card 1: { title: "...", description: "..." }
Card 2: { title: "...", description: "..." }
Card 3: { title: "...", description: "..." }
Card 4: { title: "...", description: "..." }
Card 5: { title: "...", description: "..." }
Card 6: { title: "...", description: "..." }
```

**Example (from /profiles):**
- subtitle: "ALL PRODUCTS"
- title: "Everything You Need to Scale"
- description: "From stable assets to recovery services. Built for advertisers who need reliability."
- Cards: Business Manager, Facebook Pages, Unban Service, Verified Badge, TikTok Assets, Free Tools

**NOTE:** These 6 cards are the same across all product pages (cross-selling). You can reuse the same text or customize per page to highlight the current product differently.

---

### SECTION 4: Testimonial 1

```
quote: [Customer quote about this specific product]
authorName: [Name]
authorRole: [Role, Company/Country]
```

**Example:** "Telegram sellers nearly killed my business. Constant bans, zero support. Switched to GoAds, haven't looked back. Profiles run, support replies, life is good." — Stefan M., Agency Owner, Germany

---

### SECTION 5: Feature Grid 2 — "Resources" (6 blog cards)

```
Card 1: { title: "...", description: "..." }
Card 2: { title: "...", description: "..." }
Card 3: { title: "...", description: "..." }
Card 4: { title: "...", description: "..." }
Card 5: { title: "...", description: "..." }
Card 6: { title: "...", description: "..." }
```

**Each card = a blog article idea related to this product.** Title = article headline, Description = 1-sentence summary.

**Example (from /profiles):**
1. "How to Warm Up Facebook Profiles" — Step-by-step guide...
2. "BM1 vs BM5: Which One Do You Need?" — Breaking down...
3. "Why Your Ad Account Keeps Getting Banned" — Common mistakes...
4. "Aged Profiles vs Fresh Accounts" — Why aged profiles survive...
5. "How to Bypass Facebook Verification" — Stuck on selfie...
6. "Facebook Ads in 2026: What's Changed" — Platform updates...

---

### SECTION 6: Testimonial 2

```
quote: [Another customer quote]
authorName: [Name]
authorRole: [Role, Company/Country]
```

**Example:** "Bought 20 profiles over 3 months. Only 1 needed replacement and they handled it in under an hour. That's the service I pay for." — Ryan D., Media Buyer, US

---

### SECTION 7: FAQ (8-12 items)

```
title: [FAQ headline, e.g. "Questions about Business Managers?"]
description: [Subtitle, e.g. "Most frequent questions about buying and using verified BMs."]

Q1: { question: "...", answer: "..." }
Q2: { question: "...", answer: "..." }
...
Q10: { question: "...", answer: "..." }
```

**Example (from /profiles — 10 items):**
1. What is a reinstated profile? → A profile that was disabled by Meta...
2. How long do profiles last? → With proper warmup...
3. What if my profile gets banned? → Instant replacement within warranty...
...

---

### SECTION 8: Final CTA

**Same across all pages — no text needed.** Already uses:
- "Your next winning campaign starts here"
- "Join 500+ advertisers who trust GoAds..."

---

## Products to write content for

### 1. `/bm` — Business Manager

GoAds product: Verified Business Managers (BM1 to BM5)
- Key selling points: verified, multiple spend limits, instant delivery
- Target audience: media buyers, agencies running Meta ads
- FAQ topics: BM levels, spend limits, verification, adding ad accounts, what happens if BM gets restricted

### 2. `/pages` — Facebook Pages

GoAds product: Aged Facebook Pages with followers
- Key selling points: aged, has followers, ready for ads, builds trust
- Target audience: advertisers who need pages to run ads
- FAQ topics: page age, follower count, can I rename, what niche, how to warm up

### 3. `/tiktok-accounts` — TikTok Assets

GoAds product: TikTok Ad Accounts, Shops, Business Centers
- Key selling points: verified, ready to scale on TikTok, multiple asset types
- Target audience: TikTok advertisers, dropshippers, agencies
- FAQ topics: account types, ad spend limits, TikTok Shop eligibility, region restrictions

---

## Output Format

Output a **TypeScript data file** for each product. Copy the structure exactly from the reference file below and only change text values. **Do NOT change any `imageSrc`, `logoSrc`, `authorImageSrc`, `decorationLeftSrc`, `decorationRightSrc`, `previewImageSrc`, `previewVideoSrc`, `iconSrc`, `iconVideoSrc` values.**

### Reference file: `app/src/data/goads-profiles-page-data.ts`

```ts
// GoAds /bm page data — hero, feature grids, testimonials, FAQ
// IMPORTANT: Only text fields change. All image/logo/video sources stay identical.

export const bmHero = {
  iconSrc: "/foreplay/hero2_icon.webp",           // DO NOT CHANGE
  iconVideoSrc: "/foreplay/hero2_video.webm",     // DO NOT CHANGE
  overline: "BUSINESS MANAGER",                    // ← CHANGE THIS
  title: "Buy Verified Business Managers",         // ← CHANGE THIS
  description: "...",                              // ← CHANGE THIS
  previewImageSrc: "/foreplay/hero2_laptop.webp",  // DO NOT CHANGE
  previewVideoSrc: "/video/62a4ed18ddad95dde8b8bfa4_6833876c700d2cc61b273644_home-video-transcode.mp4", // DO NOT CHANGE
  ctaLabel: "Get Started",
  ctaHref: "/talk-to-sales",
}

export const bmFeatureGrid1 = {
  subtitle: "...",     // ← CHANGE
  title: "...",        // ← CHANGE
  description: "...",  // ← CHANGE
  cards: [
    { imageSrc: "/foreplay/bento1_1.webp", title: "...", description: "..." }, // imageSrc: DO NOT CHANGE
    { imageSrc: "/foreplay/bento1_2.webp", title: "...", description: "..." },
    { imageSrc: "/foreplay/bento1_3.webp", title: "...", description: "..." },
    { imageSrc: "/foreplay/bento1_4.webp", title: "...", description: "..." },
    { imageSrc: "/foreplay/bento1_5.webp", title: "...", description: "..." },
    { imageSrc: "/foreplay/bento1_6.webp", title: "...", description: "..." },
  ],
}

export const bmFeatureGrid1Testimonial = {
  logoSrc: "/foreplay/testimonial1_logo.webp",       // DO NOT CHANGE
  logoAlt: "GoAds client",
  quote: "...",          // ← CHANGE
  authorName: "...",     // ← CHANGE
  authorRole: "...",     // ← CHANGE
  authorImageSrc: "/foreplay/testimonial1_founder.webp", // DO NOT CHANGE
  decorationLeftSrc: "/foreplay/test_left.svg",          // DO NOT CHANGE
  decorationRightSrc: "/foreplay/test_right.svg",        // DO NOT CHANGE
}

export const bmFeatureGrid2 = {
  cards: [
    { imageSrc: "/foreplay/bento2_1.png", title: "...", description: "..." },  // imageSrc: DO NOT CHANGE
    { imageSrc: "/foreplay/bento2_2.webp", title: "...", description: "..." },
    { imageSrc: "/foreplay/bento2_3.webp", title: "...", description: "..." },
    { imageSrc: "/foreplay/bento2_4.webp", title: "...", description: "..." },
    { imageSrc: "/foreplay/bento2_5.webp", title: "...", description: "..." },
    { imageSrc: "/foreplay/bento2_6.webp", title: "...", description: "..." },
  ],
}

export const bmFeatureGrid2Testimonial = {
  logoSrc: "/foreplay/test_logo.jpg",                    // DO NOT CHANGE
  logoAlt: "GoAds client",
  quote: "...",          // ← CHANGE
  authorName: "...",     // ← CHANGE
  authorRole: "...",     // ← CHANGE
  authorImageSrc: "/foreplay/test_tim_keen_avatar.webp", // DO NOT CHANGE
  decorationLeftSrc: "/foreplay/test_left.svg",          // DO NOT CHANGE
  decorationRightSrc: "/foreplay/test_right.svg",        // DO NOT CHANGE
}

export const bmFaq = {
  title: "...",        // ← CHANGE
  description: "...",  // ← CHANGE
  items: [
    { question: "...", answer: "..." },  // ← CHANGE
    { question: "...", answer: "..." },
    // ... 8-12 items
  ],
}
```

### Naming convention

| Route | Data file name | Variable prefix |
|-------|---------------|-----------------|
| `/bm` | `goads-bm-page-data.ts` | `bm` |
| `/pages` | `goads-pages-page-data.ts` | `pages` |
| `/tiktok-accounts` | `goads-tiktok-accounts-page-data.ts` | `tiktokAccounts` |

### Workflow

1. Justin writes content → gives to Claude
2. Claude outputs `.ts` data file (following template above)
3. Justin gives `.ts` file to Nam
4. Nam tells Claude: "tạo route `/bm` giống `/profiles`, dùng data file `goads-bm-page-data.ts`"
5. Done in 1 minute — just swap imports in page.tsx

## Important Rules

1. **Tone:** Direct, confident, no fluff. Like talking to a fellow advertiser.
2. **Length:** Headlines short (5-8 words). Descriptions 1-2 sentences max.
3. **Testimonials:** Make them sound real. Include specific details (numbers, timeframes, pain points).
4. **FAQ answers:** Concise, practical. No marketing speak in answers.
5. **Blog card titles:** Should sound like actual article headlines someone would click.
