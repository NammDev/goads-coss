## Phase 03: Pricing Section

**Priority:** P1 | **Status:** pending | **Effort:** 45m

### Overview
Install a pricing block variant (from 20 available) with GoAds' 4 pricing packs.

### Context Links
- [Homepage Content - Section 8](../../migration-docs/02-homepage-content.md)
- [Product Catalog - Pricing Packs](../../migration-docs/04-product-catalog.md)

### Content to Apply

**Section ID:** `pricing` (for anchor link from hero CTA)
**Heading:** "Simple, Transparent Pricing"
**Subheading:** "One-time purchase, ongoing support."

#### Tier 1: Basic Pack -- $90
- Tagline: "Start advertising today"
- Features:
  - Unverified Business Manager
  - Asia Profile (Admin Account)
  - Optimized Advertising Page
  - 7-Day Warranty
- CTA: "View Pack" -> /products/basic-pack

#### Tier 2: Advanced Setup -- $180 (Popular badge)
- Tagline: "Ready to scale"
- Value: "$230 value"
- Features:
  - BM1 Verified (Running Campaign & Create Pixel)
  - 2x Premium Aged Reinstated Profiles
  - 2x Aged Reinstated Pages
  - 7-Day Warranty
- CTA: "View Pack" -> /products/advanced-setup

#### Tier 3: Premium Bulletproof -- $550
- Tagline: "Professional infrastructure"
- Value: "$700+ value"
- Features:
  - BM5 Verified $250 DSL (Running Campaign)
  - BM1 Verified (Pixel Bank)
  - 4x Premium Aged Reinstated Profiles
  - 3x Aged Pages
  - 7-Day Warranty
- CTA: "View Pack" -> /products/premium-bulletproof

#### Tier 4: Elite Bulletproof -- $890 (Dark card)
- Tagline: "Enterprise-grade setup"
- Value: "$1,100+ value"
- Features:
  - 2x BM5 Verified $250 DSL
  - 6x Premium Aged Reinstated Profiles
  - 3x Aged Pages
  - 10K Followers Page
  - 7-Day Warranty
  - Priority Support
- CTA: "View Pack" -> /products/elite-bulletproof

### Implementation Steps

1. User picks pricing block variant from shadcn studio
2. Install: `npx shadcn@latest add @ss-blocks/{pricing-block-name}`
3. Replace content with 4 tiers above
4. Add "Popular" badge to Advanced Setup tier
5. Style Elite tier with dark card background
6. Add `id="pricing"` to section for anchor linking
7. Strip block container, use goads `container`
8. Set section background: light grey (#F5F5F5) for visual break

### Related Code Files
- Create: `src/components/shadcn-studio/blocks/{pricing-block}/`
- Modify: `src/app/page.tsx`

### Todo
- [ ] User picks pricing block variant
- [ ] Install block
- [ ] Replace content with 4 GoAds pricing tiers
- [ ] Add Popular badge + dark card styling
- [ ] Add section id="pricing"
- [ ] Adapt layout to goads container

### Success Criteria
- 4 pricing cards with correct prices and features
- Advanced Setup has "Popular" badge
- Elite has dark background styling
- Section anchor works from hero "See Pricing" CTA
