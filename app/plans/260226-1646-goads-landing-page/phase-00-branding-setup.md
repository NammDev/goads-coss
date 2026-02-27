## Phase 00: Branding & Setup Prep

**Priority:** P1 | **Status:** pending | **Effort:** 30m

### Overview
Ensure GoAds branding tokens, metadata, and header nav are ready before section work begins.

### Context Links
- [Brand Identity](../../migration-docs/01-brand-identity.md)
- [SEO Metadata](../../migration-docs/05-seo-metadata.md)
- [Navigation](../../migration-docs/06-navigation-structure.md)

### Key Insights
- Color system already close to GoAds palette (neutral-based). Main gap: no explicit blue accent token.
- Fonts: CalSans (heading), CalSansUI (body), PaperMono (mono) -- already configured in `src/fonts/index.ts`
- Container utility: `mx-auto max-w-[1416px] px-4 lg:px-6` -- matches goads spec
- Header has placeholder Products dropdown, no real nav links

### Implementation Steps

1. **Update layout.tsx metadata**
   ```ts
   title: "Agency Ad Accounts | 7-Day Warranty + 24/7 Support | GoAds"
   description: "Buy verified Business Managers & agency ad accounts. 3,242+ BMs sold, 7-day warranty, 24/7 support."
   ```

2. **Add blue accent color to globals.css** (if not already present via shadcn tokens)
   ```css
   --accent-blue: #2563eb;
   ```

3. **Update SiteHeader** (`src/components/site-header.tsx`)
   - Add nav links: Products (dropdown), Pricing (#pricing), FAQ (#faq), Contact
   - Products dropdown items: Meta Agency, Google Whitelisted, TikTok Verified, Business Managers, Profiles & Pages
   - Add "Get Started" CTA button (right side, before theme toggle)
   - Remove GitHub link

4. **Update SiteFooter** tagline
   - Change "your tagline here" to "Stop Losing Accounts. Start Scaling."

### Related Code Files
- Modify: `src/app/layout.tsx`, `src/components/site-header.tsx`, `src/components/site-footer.tsx`
- Modify: `src/app/globals.css` (if accent token needed)

### Todo
- [ ] Update layout metadata (title, description, OG tags)
- [ ] Add accent blue token if missing
- [ ] Rebuild header nav with real links + Products dropdown + CTA
- [ ] Update footer tagline

### Success Criteria
- SEO metadata visible in browser tab / view-source
- Header shows Products dropdown, Pricing, FAQ, Contact links, "Get Started" CTA
- Footer shows correct tagline
