# GoAds Business Context Package

> Portable context file for designing GoAds landing pages in external projects.

## Business Identity

| Field | Value |
|-------|-------|
| **Name** | GoAds |
| **Domain** | goads.shop |
| **Type** | B2B — Meta/Facebook ad infrastructure provider |
| **Tagline** | "Stop Losing Accounts. Start Scaling." |
| **Audience** | Media buyers, affiliate marketers, e-commerce advertisers, agencies |

## Products & Services

| Product | Description |
|---------|-------------|
| Meta Agency Accounts | Whitelisted ad accounts with spending limits |
| Facebook Profiles | Verified profiles for ad management (7-day warranty) |
| Business Managers (BMs) | Pre-configured BM1-BM10, verified & standard (72h warranty) |
| Google Whitelisted | Google Ads agency accounts |
| TikTok Verified & Agency | TikTok advertising assets |
| Blue Verification | Meta verified badge service |
| Facebook Pages | Pre-built, aged, reinstated pages |
| Unban Service | Account recovery/suspension reversal |

## Pricing Tiers

| Tier | Price/mo | Includes |
|------|----------|----------|
| Advanced | $250 | 1x BM3, 2x Profiles, 1x Page |
| **Premium** (Popular) | $650 | 1x BM5, 1x BM3, 4x Profiles, 3x Pages |
| Elite | $890 | 2x BM5, 6x Profiles, 3x Pages, 1x 10k Page |
| Customize | Custom | Enterprise needs |

## Key Differentiators

- **7-day warranty** — full replacement, no refunds
- **<2h support** — Telegram-first (@GoAdsSupport)
- **5+ years** in business
- **600+ active advertisers & agencies**
- **4,000+ ad accounts delivered**
- **$25M+ ad spend powered**
- **98.5% account stability rate**

## Social Proof

- Daniel Carter (Performance Marketing Lead): "Stable assets, fast delivery, responsive support"
- Michael Torres (Media Buying Manager): "Well-prepared accounts, quick support team"
- Sarah Mitchell (E-commerce Growth Manager): "Consistent and reliable, genuinely helpful"

## User Personas

1. **Solo Media Buyer** — Individual running Facebook ads, needs reliability
2. **Agency Owner** — Managing multiple client accounts, needs bulk orders
3. **E-commerce Seller** — Running product ads at scale, needs verified accounts
4. **Affiliate Marketer** — Performance campaigns, needs quick replacement

## Brand Design System

### Colors (from Branding Kit)

| Token | Light Mode | Dark Mode | Role |
|-------|-----------|-----------|------|
| **Primary** | `#0f1419` (Light Black) | `#f0f3f4` (near-white) | Text, headings, logo |
| **Accent** | `#3B52D9` (Blue) | `#3B52D9` (Blue) | CTAs, links, highlights |
| **Accent BG** | `#E3ECF6` (Light Blue) | `#061622` (Dark Blue) | Backgrounds, cards |
| **Neutral** | `#6B7280` (Gray) | `#9CA3AF` (Light Gray) | Muted text, borders |
| **Background** | `#FFFFFF` (White) | `#0f1419` (Near-black) | Page background |

**Light Grey theme also available** — same structure with `#F5F7FA` background.

> **Note:** Current codebase uses `#1e9df1` as primary (sky blue) — this diverges from branding kit where blue is accent, not primary. New designs should follow branding kit.

### Typography (from Branding Kit)

| Role | Font | Weight | Notes |
|------|------|--------|-------|
| **Display/Headlines** | **Sono** | Medium/Bold | Monospace-inspired, brand anchor, high-impact |
| **Body/UI** | **Inter** | Regular/Medium | Clean sans-serif for readability |

**Type Scale:**
- Display: Sono Medium — hero headlines (largest)
- H1: Sono Medium — page titles
- H2: Sono Regular — section headers
- H3: Inter Medium — subsection headers
- Body: Inter Regular — paragraph text
- Whitespace/Leading: generous spacing (Display ~100%, H1 ~60/30px)

> **Note:** Current codebase uses Geist (sans) + JetBrains Mono (mono). New designs should use Sono + Inter per branding kit.

### Logo

- Bear icon + "goads" wordmark (G-Bear symbol)
- Black on light, white on dark
- Minimum safe zone of 0.5x logo height
- Sub-brands: G SECURITY, G CONTENT, G ACTIONS

### Patterns

- Grid/blueprint patterns derived from technical precision theme
- Low opacity overlays for subtle backgrounds
- Inspired by digital grid systems and technical blueprints

## Landing Page Structure (Current)

```
1. Hero — Rotating/typewriter headline + CTA
2. Bento Grid — Feature showcase cards
3. Stats — 4,000+ accounts | $25M spend | 98.5% stability | 600+ users
4. Feature Highlights — Additional bento grid
5. Pricing — 3 tiers + custom
6. Testimonials — Client reviews with 5-star ratings
7. FAQ — Tabbed: Products, Warranty, Billing, Support
```

### Layout Rules

- Container: `max-width: 1416px`, `padding: 0 16px` (lg: 24px)
- Section dividers between blocks
- Decorative grid lines at container edges
- Section padding: desktop `py-24`, mobile `py-8`

## Marketing Pages

`/about` `/agency-ad-account` `/pricing` `/profiles` `/bm` `/blue-verification` `/pages` `/google-agency` `/tiktok-accounts` `/help` `/faq` `/community` `/blog` `/milestones` `/partners` `/payment` `/refund-policy` `/privacy-policy`

## Support Channels

- Telegram: @GoAdsSupport (primary)
- Cal.com booking for consultation
- Community forum
