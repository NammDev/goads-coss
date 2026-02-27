## Phase 04: Testimonials Section

**Priority:** P2 | **Status:** pending | **Effort:** 45m

### Overview
Install a testimonials block variant (from 24 available) with 12 GoAds client quotes.

### Context Links
- [Homepage Content - Section 11](../../migration-docs/02-homepage-content.md)

### Content to Apply

**Label:** "Real feedback from active advertisers"
**Title:** "What Our Clients Say"

| # | Name | Title | Quote |
|---|------|-------|-------|
| 1 | Marcus Chen | Agency Owner, ScaleMedia | "We completely moved from Proads to GoAds. Better service, faster support, accounts that actually stay alive." |
| 2 | Sarah Kim | Performance Lead, ClickFlow Agency | "Fast and reliable support. Haven't used anyone else since we switched. The 7-day warranty gives us complete peace of mind." |
| 3 | David Rodriguez | Media Buyer, GrowthHackers | "Support is way better than Proads. They actually respond within hours, not days. Game changer for our campaigns." |
| 4 | Emma Thompson | Dropshipper & Brand Owner | "Very good experience with GoAds. Fast delivery, reliable accounts. The team knows what they're doing." |
| 5 | Alex Patel | Scaling Director, AdVenture Agency | "BM5s are rock solid. No issues in 6 months of heavy spend. Finally found a provider that delivers on promises." |
| 6 | Jessica Liu | E-commerce Brand Manager | "Warranty claim handled in under 2 hours. Impressed with the professionalism and speed." |
| 7 | Michael Brown | Performance Marketer, DataDriven | "Finally, a provider that operates like a real business. Professional, reliable, and actually delivers." |
| 8 | Rachel Green | E-commerce Manager, TrendSetters | "Switched from 3 different vendors. GoAds is the one that sticks. Quality accounts, fair prices, real support." |
| 9 | Tom Chen | Founder, ScaleUp Studios | "Spent $50k+ monthly through GoAds accounts. Zero bans, zero issues, zero downtime." |
| 10 | Sofia Patel | CEO, Digital Nomad Agency | "Their agency accounts are truly enterprise-grade. Consistent performance across all our clients." |
| 11 | Jake Morrison | Head of Growth, ConvertCo | "The quality difference is night and day. Our ROAS improved 40% after switching to GoAds." |
| 12 | Nadia Ali | COO, MediaMax Agency | "We manage 50+ client accounts through GoAds. Their bulk pricing and VIP support is unmatched." |

### Implementation Steps

1. User picks testimonials block variant (masonry or carousel preferred)
2. Install: `npx shadcn@latest add @ss-blocks/{testimonials-block-name}`
3. Replace content with 12 testimonials above
4. Use placeholder avatar images (initials-based or generic)
5. Strip block container, use goads `container`
6. Background: white

### Related Code Files
- Create: `src/components/shadcn-studio/blocks/{testimonials-block}/`
- Modify: `src/app/page.tsx`

### Todo
- [ ] User picks testimonials block variant
- [ ] Install block
- [ ] Replace content with 12 GoAds testimonials
- [ ] Add avatar placeholders
- [ ] Adapt layout to goads container

### Success Criteria
- 12 testimonials visible (or accessible via carousel/scroll)
- Each shows name, title, company, quote
- Responsive layout
