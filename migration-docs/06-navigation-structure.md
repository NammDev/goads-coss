# GoAds Navigation & Site Structure

> Complete routing, navigation, and page hierarchy for the new project.

---

## Primary Navigation

| Label | Path | Type |
|-------|------|------|
| Home | / | Link |
| Products | /products | Dropdown |
| Pricing | /pricing | Link |
| Blog | /blog | Link |
| Contact | /contact | Link |
| **Get Started** | /products | CTA Button |

---

## Products Dropdown Menu

| Category | Path | Description |
|----------|------|-------------|
| Meta Agency | /products/meta-agency | Agency ad accounts for Facebook/Instagram |
| Google Whitelisted | /products/google-agency | Whitelisted accounts for Search, Display, YouTube |
| TikTok Verified | /products/tiktok-agency | Agency accounts for TikTok |
| Business Managers | /products/business-managers | BM1-BM5 verified BMs |
| Profiles & Pages | /products/meta-assets | Aged profiles and pages |
| Pixel Bank | /products/bm-standard | Dedicated BM for pixels |

---

## Route Structure

```
/                           → Homepage (19 sections)
├── /products               → All products listing
│   ├── /products/meta-agency
│   ├── /products/google-agency
│   ├── /products/tiktok-agency
│   ├── /products/business-managers
│   ├── /products/meta-assets
│   ├── /products/bm-standard
│   ├── /products/bm-verified
│   ├── /products/profiles-aged
│   ├── /products/pages
│   ├── /products/basic-pack
│   ├── /products/advanced-setup
│   ├── /products/premium-bulletproof
│   └── /products/elite-bulletproof
├── /pricing                → Pricing page (4 tiers)
├── /blog                   → Blog listing page
│   └── /blog/[slug]        → Individual blog posts
├── /contact                → Enterprise contact form
└── /about                  → About page (optional)
```

---

## Footer Navigation

### Column 1: Products
- Meta Agency Accounts
- Google Whitelisted
- TikTok Verified
- Business Managers
- Profiles & Pages

### Column 2: Resources
- Blog
- Getting Started Guide
- Pricing
- FAQ

### Column 3: Company
- About
- Contact
- Terms of Service
- Privacy Policy

### Column 4: Connect
- Telegram: @goads_official
- WhatsApp: +84 865 717 497
- Email: info@goads.shop

---

## Page Sections Order (Homepage)

1. Header (fixed, black, 68px)
2. Hero (black bg, full viewport)
3. Feature Cards (white, horizontal scroll)
4. Product Showcase (3D rotating platforms)
5. Bento Grid (white, 14 benefit cards)
6. Logo Partners (light gray)
7. Use Cases / GoAds Advantage (white, 7 items)
8. Pricing (light gray, 4 tiers)
9. Process / How It Works (gray break)
10. Big Picture / About (white, stats carousel)
11. Client Showcase (white)
12. Enterprise Contact (white, form)
13. Testimonials (white, 12 quotes)
14. Meta Assets / Product Catalog (gray, filterable)
15. Blog Preview (white)
16. Custom Training (white)
17. Community (light gray)
18. FAQ (white, 7 items)
19. CTA Banner (dark, final conversion)
20. Footer

---

## Internal Link Strategy

| From | To | Anchor Text |
|------|----|-------------|
| Hero CTA | /products | "Get Started" |
| Hero CTA | /pricing | "See Pricing" |
| Feature Cards | /products/[category] | "Get Started" |
| Use Cases | /products | "Get Started" |
| Pricing Cards | /products/[pack] | "View Pack" |
| Meta Assets | /products | "View All Products" |
| Blog Preview | /blog | "View All" |
| Community | /products | "Join Our Telegram" |
| CTA Banner | /products | "Get Started" |
| Contact Form | (submit) | "Get Custom Quote" |
