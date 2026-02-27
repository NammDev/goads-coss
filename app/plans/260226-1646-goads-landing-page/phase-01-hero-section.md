## Phase 01: Hero Section

**Priority:** P1 | **Status:** pending | **Effort:** 45m

### Overview
Replace or customize hero-section-40 (currently Orion AI content) with GoAds hero messaging.

### Context Links
- [Homepage Content - Section 2](../../migration-docs/02-homepage-content.md)
- [Brand Identity](../../migration-docs/01-brand-identity.md)
- Installed block: `src/components/shadcn-studio/blocks/hero-section-40/`

### Key Insights
- hero-section-40 has: trust badge, h1, subtitle, 2 CTAs, avatar social proof, rating, tabbed content area
- **Decision needed**: Keep hero-section-40 and swap content, OR pick a different hero variant
- If keeping hero-section-40: remove the tabs/content-drafting area (Orion-specific) and simplify to hero-only
- If replacing: user browses shadcnstudio.com/blocks and picks a cleaner hero variant

### Content to Apply

**Trust Badge:** "Trusted by +1,750 businesses globally"

**Headline:**
```
Stop Losing Accounts.
Start Scaling.
```

**Subheadline:** "Make sure your ads are compliant and running with our agency ad accounts for Meta, TikTok and Google."

**CTA Primary:** "Get Started" -> /products
**CTA Secondary:** "See Pricing" -> #pricing

**Social Proof (bottom bar):**
- Avatar stack: 4 client avatars (use placeholder images)
- "500+" Clients label
- Rating: 4.9 stars
- "4.9" Rating label

**Caption (if video/image area):** "Professional Meta assets with 7-day warranty and 24/7 support."

### Layout Adaptation
- Remove hero-section-40's `border-b` wrapper if it conflicts with goads frame lines
- Ensure content sits within goads `container` class
- Background: white/light (or optionally black per brand spec -- user decides)

### Implementation Steps

1. User decides: keep hero-section-40 or pick new variant
2. If new variant: install via `npx shadcn@latest add @ss-blocks/{hero-name}`
3. Replace all text content per Content section above
4. Replace avatar images with neutral placeholders or GoAds-relevant imagery
5. Update CTA button hrefs (`/products`, `#pricing`)
6. Remove Orion-specific tabs section (LeadQualifier, MeetingPrep, FollowUps, etc.)
7. Strip block container classes, use goads `container`
8. Adjust background color per brand (hero zone: black or white)

### Related Code Files
- Modify: `src/components/shadcn-studio/blocks/hero-section-40/hero-section-40.tsx`
- Delete (if simplifying): `lead-qualifier.tsx`, `meeting-prep.tsx`, `follow-ups.tsx`, `data-sync.tsx`, `reporting.tsx`, `content-drafting.tsx`, `header.tsx`
- OR replace entire directory with new hero block

### Todo
- [ ] Decide: keep hero-section-40 or pick new variant
- [ ] Swap all text content (badge, h1, subtitle, CTAs)
- [ ] Update social proof (avatars, client count, rating)
- [ ] Remove Orion tab content area
- [ ] Adapt layout to goads container
- [ ] Set background color per brand

### Success Criteria
- Hero shows GoAds messaging with correct CTAs
- Social proof bar shows 500+ clients and 4.9 rating
- No Orion/AI-agent content remains
- Responsive on mobile/tablet/desktop
