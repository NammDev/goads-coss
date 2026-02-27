## Phase 01: Branding & Setup

**Priority:** P1 | **Status:** pending | **Effort:** 30m

### Overview

Establish GoAds brand tokens, metadata, and SiteHeader nav before any section blocks are installed. Must complete before Phase 2.

### Context Links

- Brand identity: `migration-docs/01-brand-identity.md`
- SEO metadata: `migration-docs/05-seo-metadata.md`
- Navigation: `migration-docs/06-navigation-structure.md`

### Key Insights

- Fonts already configured: CalSans (heading), CalSansUI (body), PaperMono (mono) in `src/fonts/index.ts`
- Container utility already correct: `mx-auto max-w-[1416px] px-4 lg:px-6`
- SiteHeader has placeholder Products dropdown — needs real nav links
- SiteFooter has placeholder tagline — update before Phase 2 footer block replaces it (or leave for Phase 2)
- hero-section-40 demo route at `src/app/hero-section-40/page.tsx` — delete in this phase

### Requirements

- Brand color tokens mapped in `globals.css` (primary, accent, muted, border)
- SiteHeader nav matches GoAds navigation structure
- Layout metadata (title, description, OG) reflects GoAds brand
- Theme toggle (dark/light) working correctly
- No leftover demo routes

### Implementation Steps

1. **Read brand identity** from `migration-docs/01-brand-identity.md` and `migration-docs/05-seo-metadata.md`

2. **Update `src/app/layout.tsx` metadata**
   ```ts
   title: "Agency Ad Accounts | 7-Day Warranty + <2h Support | GoAds"
   description: "Buy verified Meta Agency Accounts, Google Whitelisted, TikTok Verified, and Business Managers. 7-day warranty, <2h delivery, 500+ clients trusted."
   ```
   Add OG tags: `og:title`, `og:description`, `og:type: website`

3. **Verify / add brand color tokens in `src/app/globals.css`**
   - Confirm primary, accent (blue), muted, and border tokens match GoAds palette
   - Add if missing:
     ```css
     /* GoAds brand accent */
     --brand-accent: #2563eb;   /* trust/tech blue */
     --brand-accent-dark: #1d4ed8;
     ```
   - Keep tokens in both `:root` (light) and `.dark` blocks

4. **Update `src/components/site-header.tsx`**
   - Replace placeholder nav with real links:
     - **Products** (dropdown): Meta Agency, Google Whitelisted, TikTok Verified, Business Managers, Meta Assets
     - **Pricing** → `#pricing`
     - **FAQ** → `#faq`
     - **Contact** → `/contact` or WhatsApp link
   - Add "Get Started" primary CTA button (right side, before theme toggle)
   - Remove GitHub link / any demo links

5. **Update `src/components/site-footer.tsx`** tagline
   - Change placeholder tagline to: "Stop Losing Accounts. Start Scaling."
   - Note: Phase 2 Section 11 installs a full Footer block that may replace this component entirely

6. **Delete demo route**
   - Remove `src/app/hero-section-40/` directory (demo route, no longer needed)

7. **Verify theme toggle** — dark/light switch works and all tokens render correctly in both modes

### Related Code Files

- Modify: `src/app/layout.tsx`
- Modify: `src/app/globals.css`
- Modify: `src/components/site-header.tsx`
- Modify: `src/components/site-footer.tsx`
- Delete: `src/app/hero-section-40/` (demo route directory)

### Todo

- [ ] Read migration-docs/01-brand-identity.md and 05-seo-metadata.md for exact values
- [ ] Update layout.tsx metadata (title, description, OG tags)
- [ ] Verify/add brand color tokens in globals.css
- [ ] Rebuild SiteHeader nav (Products dropdown, Pricing, FAQ, Contact, Get Started CTA)
- [ ] Update SiteFooter tagline
- [ ] Delete hero-section-40 demo route
- [ ] Verify theme toggle works in both modes

### Success Criteria

- Browser tab shows: "Agency Ad Accounts | 7-Day Warranty + <2h Support | GoAds"
- SiteHeader renders: Products dropdown (5 items), Pricing, FAQ, Contact, Get Started CTA
- Theme toggle switches correctly between light/dark
- No 404s or broken links
- No demo/Orion routes remain

### Risk Assessment

- **Color token conflicts**: shadcn studio blocks may define their own tokens that override goads palette → audit after each block install in Phase 2
- **SiteHeader complexity**: dropdown needs to work on mobile (hamburger) and desktop → test both breakpoints

### Next Steps

- Phase 2 can begin immediately after this phase completes
- Phase 2, Section 11 (Footer block) will replace `site-footer.tsx` or render before it — coordinate which approach
