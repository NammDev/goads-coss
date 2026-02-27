## Phase 06: CTA Banner Section

**Priority:** P2 | **Status:** pending | **Effort:** 30m

### Overview
Install a CTA section block variant (from 14 available) as the final conversion push before footer.

### Context Links
- [Homepage Content - Section 18](../../migration-docs/02-homepage-content.md)

### Content to Apply

**Headline:** "Stop Worrying About Bans. Start Scaling Today."
**Subheadline:** "7-day warranty. Real support. Agency-tested quality."
**CTA Primary:** "Get Started" -> /products
**CTA Secondary (optional):** "Contact Sales" -> /contact
**Background:** Dark (#1A1A1A)

### Implementation Steps

1. User picks CTA section block variant (full-width dark preferred)
2. Install: `npx shadcn@latest add @ss-blocks/{cta-block-name}`
3. Replace content per above
4. Set dark background (#1A1A1A or bg-neutral-900)
5. Ensure text is white/light for contrast
6. Strip block container, use goads `container`

### Related Code Files
- Create: `src/components/shadcn-studio/blocks/{cta-block}/`
- Modify: `src/app/page.tsx`

### Todo
- [ ] User picks CTA block variant
- [ ] Install block
- [ ] Replace content with GoAds CTA copy
- [ ] Set dark background + light text
- [ ] Adapt layout to goads container

### Success Criteria
- Full-width dark CTA banner visible
- Headline and subheadline render correctly
- "Get Started" button links to /products
- High contrast, accessible text
