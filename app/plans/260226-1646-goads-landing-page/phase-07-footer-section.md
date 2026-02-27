## Phase 07: Footer Section

**Priority:** P2 | **Status:** pending | **Effort:** 30m

### Overview
Install a footer block variant (from 9 available) replacing the minimal existing SiteFooter.

### Context Links
- [Navigation Structure - Footer](../../migration-docs/06-navigation-structure.md)
- [Brand Identity - Contact](../../migration-docs/01-brand-identity.md)

### Key Insights
- Current SiteFooter is minimal (copyright + tagline only)
- New footer: 4-column layout with links + contact info
- Keep the existing SiteFooter's corner dot decorations if possible
- Decision: replace SiteFooter content entirely OR make the shadcn block a section above existing SiteFooter

### Content to Apply

**4-Column Footer Layout:**

| Column 1: Products | Column 2: Resources | Column 3: Company | Column 4: Connect |
|---|---|---|---|
| Meta Agency Accounts -> /products/meta-agency | Blog -> /blog | About -> /about | Telegram: @goads_official |
| Google Whitelisted -> /products/google-agency | Getting Started -> /blog | Contact -> /contact | WhatsApp: +84 865 717 497 |
| TikTok Verified -> /products/tiktok-agency | Pricing -> /pricing | Terms of Service -> /terms | Email: info@goads.shop |
| Business Managers -> /products/business-managers | FAQ -> #faq | Privacy Policy -> /privacy | |
| Profiles & Pages -> /products/meta-assets | | | |

**Bottom bar:** (c) 2026 GoAds -- Stop Losing Accounts. Start Scaling.

### Implementation Steps

1. User picks footer block variant (4-column preferred)
2. Install: `npx shadcn@latest add @ss-blocks/{footer-block-name}`
3. Replace content with 4 columns above
4. Add contact links (Telegram, WhatsApp, Email)
5. Add GoAds logo text in footer header
6. Strip block container, use goads `container`
7. Background: light grey (#F5F5F5)
8. Update `layout.tsx`: either replace `<SiteFooter />` with new block, or render block inside SiteFooter

### Related Code Files
- Create: `src/components/shadcn-studio/blocks/{footer-block}/`
- Modify: `src/components/site-footer.tsx` OR `src/app/layout.tsx`

### Todo
- [ ] User picks footer block variant
- [ ] Install block
- [ ] Replace content with 4-column GoAds footer
- [ ] Add contact channels
- [ ] Update layout.tsx to use new footer
- [ ] Adapt layout to goads container

### Success Criteria
- 4-column footer with all links
- Contact info (Telegram, WhatsApp, Email) visible
- Copyright with correct year
- Background light grey, consistent with brand
