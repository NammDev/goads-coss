## Phase 02: Features Section

**Priority:** P1 | **Status:** pending | **Effort:** 45m

### Overview
Install a features block variant (from 29 available) showing GoAds' 5 product/service offerings.

### Context Links
- [Homepage Content - Section 3](../../migration-docs/02-homepage-content.md)
- [Product Catalog](../../migration-docs/04-product-catalog.md)

### Key Insights
- 5 product cards, each with label, description, CTA
- Original site uses horizontal scroll layout; shadcn studio features blocks may use grid
- Need icon per card (Lucide icons recommended)

### Content to Apply

**Section title (optional):** "Everything You Need to Scale"
**Section subtitle (optional):** "Professional advertising infrastructure for Meta, Google, and TikTok"

| # | Label | Title | Description | CTA | Icon idea |
|---|-------|-------|-------------|-----|-----------|
| 1 | AGENCY | Meta Agency Accounts | Agency accounts with higher trust scores, faster approvals, and better stability | Get Started -> /products/meta-agency | `ShieldCheck` |
| 2 | WHITELISTED | Google Whitelisted | Whitelisted accounts for Search, Display, YouTube, and Shopping. Higher approval rates | Get Started -> /products/google-agency | `Globe` |
| 3 | VERIFIED | TikTok Verified | Tap into TikTok's explosive reach with agency accounts designed for scale | Get Started -> /products/tiktok-agency | `Zap` |
| 4 | BUSINESS MANAGERS | Business Managers | Verified BMs with varying DSL limits -- from starter to enterprise-grade | Get Started -> /products/business-managers | `Building2` |
| 5 | PROFILES & PAGES | Profiles & Pages | Aged, verified profiles and pages built for stability. The foundation for ad accounts | Get Started -> /products/meta-assets | `Users` |

### Implementation Steps

1. User browses shadcnstudio.com/blocks features section and picks a variant
2. Install: `npx shadcn@latest add @ss-blocks/{features-block-name}`
3. Replace placeholder content with 5 cards above
4. Add Lucide icons per card
5. Update CTA links per card
6. Strip block container, use goads `container`
7. Set section background: white (#FFFFFF)

### Related Code Files
- Create: `src/components/shadcn-studio/blocks/{features-block}/`
- Modify: `src/app/page.tsx` (import + compose)

### Todo
- [ ] User picks features block variant
- [ ] Install block
- [ ] Replace content with 5 GoAds product cards
- [ ] Add icons and CTA links
- [ ] Adapt layout to goads container

### Success Criteria
- 5 product cards visible with correct content
- Each card links to correct product page
- Responsive grid on mobile (1 col) / tablet (2-3 col) / desktop (5 col or scroll)
