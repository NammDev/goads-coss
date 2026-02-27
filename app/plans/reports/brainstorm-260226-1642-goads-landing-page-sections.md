# GoAds Landing Page - Section Template Brainstorm

## Problem Statement
GoAds needs a landing page built with shadcn/studio blocks. Need to define which sections to include and map them to available block categories for block selection.

## Business Context
- **GoAds**: Professional Meta/Facebook ad infrastructure provider
- **Products**: Agency ad accounts (Meta, Google, TikTok), Business Managers, Meta Assets
- **Target**: E-commerce brands, agencies, media buyers, affiliates
- **Tagline**: "Stop Losing Accounts. Start Scaling."
- **Key differentiators**: 7-day warranty, <2h support, 5+ years experience, 500+ clients

## Decision: Core Conversion (7 Sections)

Chose lean landing page focusing on conversion over comprehensiveness. Can always add sections later.

### Final Section Template

| # | Section | Shadcn Studio Category | Variants Available | Content Summary |
|---|---------|----------------------|-------------------|-----------------|
| 1 | **Hero** | Hero Section | 41 | Trust badge "🔥 New", h1 "Stop Losing Accounts. Start Scaling.", subtitle about agency-grade accounts, 2 CTAs (Get Started + View Pricing), social proof (500+ clients, 4.9 rating) |
| 2 | **Features** | Features Section | 29 | 5 product cards: Meta Agency Accounts, Google Whitelisted, TikTok Verified, Business Managers, Meta Assets. Each with icon, title, description, key benefit |
| 3 | **Pricing** | Pricing Component | 20 | 4 tiers: BM1 Basic ($90), BM1 Pro ($180), BM5 Standard ($550), BM5 Enterprise ($890). Features list, CTA per tier, popular badge |
| 4 | **Testimonials** | Testimonials Component | 24 | 12 client quotes with name, role, company. Masonry or carousel layout. Focus on reliability, support speed, account stability |
| 5 | **FAQ** | FAQ Component | 19 | 7 questions: What is agency account?, Warranty policy?, How to get started?, Payment methods?, Support hours?, Replacement policy?, Bulk discounts? |
| 6 | **CTA Banner** | CTA Section | 14 | Dark background, "Ready to Scale Your Ads?", subtitle about 7-day warranty, primary CTA "Get Started Now", secondary "Contact Sales" |
| 7 | **Footer** | Footer Component | 9 | 4 columns: Products (Meta, Google, TikTok, BM), Resources (Blog, FAQ, Support), Company (About, Contact, Terms), Connect (WhatsApp, Telegram, Email) |

### Existing Layout (Already Built - Keep As-Is)
- **SiteHeader** (`src/components/site-header.tsx`) - Sticky header with goads logo, Products dropdown, GitHub, theme toggle
- **SiteFooter** (`src/components/site-footer.tsx`) - Simple copyright footer
- **Layout** (`src/app/layout.tsx`) - Container with vertical grid lines + corner dots

### What Needs Updating
- **SiteHeader**: Add real navigation links (Products dropdown with items, Pricing, FAQ, Contact)
- **SiteFooter**: Replace with shadcn studio Footer block (4-column) OR update existing

## Workflow for Implementation

For each section:
1. Browse shadcn studio blocks at the mapped category
2. Pick the block variant that best matches the section's content/layout needs
3. Install via `/cui` workflow: `npx shadcn@latest add @ss-blocks/{block-name}`
4. Customize content (text, images, colors) to match GoAds branding
5. Adapt layout to match goads container system (remove `max-w-7xl border-x`, use `container`)
6. Compose all sections in `page.tsx`

## Sections NOT Included (Can Add Later)
- Bento Grid (14 benefit cards) - nice but not critical for MVP
- Logo Partners carousel - need actual partner logos first
- Use Cases / Advantages accordion - features section covers this
- How It Works (3-step) - simple enough to understand without
- Stats / About section - social proof in hero handles this
- Enterprise Contact form - can be a separate page
- Product Catalog - separate page `/products`
- Blog Preview - separate page `/blog`
- Community CTA - Telegram link in footer suffices

## Risk Assessment
- **Hero-section-40 mismatch**: Currently installed hero is an AI agent workflow demo (Orion). Needs full content swap to GoAds messaging or replace with a different hero block
- **Branding alignment**: shadcn studio blocks use their own color tokens. Need to ensure goads color palette (black/white/grey + blue accent) maps correctly
- **Layout conflict**: Each block has its own container/padding. Must strip and use goads container system consistently

## Next Steps
1. User browses shadcn studio blocks for each category and picks specific block variants
2. Install all blocks via `/cui`
3. Customize content per GoAds migration docs
4. Compose final `page.tsx` with all sections

---
*Generated: 2026-02-26 16:42*
