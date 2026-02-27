## Phase 03: Final Composition & Polish

**Priority:** P1 | **Status:** pending | **Effort:** 1h
**Depends on:** Phase 02 complete (all 11 sections installed)

### Overview

Compose all 11 sections into `page.tsx`, verify scroll anchors, audit layout consistency, run responsive and performance checks, and apply SEO metadata.

### Context Links

- SEO metadata: `migration-docs/05-seo-metadata.md`
- Competitor analysis: `plans/reports/competitor-hero-analysis-260226-1708-goads-hero-research.md`

### Implementation Steps

1. **Compose `src/app/page.tsx`**

   Import and render all sections in order with correct scroll anchor IDs:

   ```tsx
   export default function HomePage() {
     return (
       <main className="flex-1">
         <HeroSection />
         <LogoMarquee />
         <FeaturesSection id="products" />
         <BentoGridSection />
         <HowItWorksSection />
         <StatsSection id="about" />
         <PricingSection id="pricing" />
         <TestimonialsSection id="testimonials" />
         <FaqSection id="faq" />
         <CtaBannerSection />
         <FooterSection />   {/* only if NOT moved to layout.tsx */}
       </main>
     )
   }
   ```

   Note: If Footer block was moved to `layout.tsx` in Phase 02 Section 11, omit `<FooterSection />` here.

2. **Verify scroll anchor links**

   | Anchor | Source | Target |
   |--------|--------|--------|
   | `#pricing` | Hero CTA "View Pricing" | PricingSection |
   | `#pricing` | SiteHeader "Pricing" nav link | PricingSection |
   | `#faq` | SiteHeader "FAQ" nav link | FaqSection |
   | `#products` | SiteHeader "Products" nav or dropdown | FeaturesSection |
   | `#about` | SiteHeader "About" link (if present) | StatsSection |

   Add `scroll-behavior: smooth` to `html` in `globals.css` if not already set:
   ```css
   html { scroll-behavior: smooth; }
   ```

3. **Visual spacing audit**

   Walk through page top-to-bottom and verify:
   - Consistent `py-16` to `py-24` per section (no section feels cramped or bloated)
   - No double `border-b` lines where two sections meet
   - Alternating backgrounds provide enough visual rhythm (not monotonous same-color run)
   - Suggested background sequence:
     ```
     Hero          → dark
     Logo Marquee  → light
     Features      → light
     Bento Grid    → dark/tinted
     How It Works  → light
     Stats/About   → light/subtle grey
     Pricing       → light
     Testimonials  → light grey
     FAQ           → light
     CTA Banner    → dark
     Footer        → dark
     ```

4. **Container consistency check**

   For every section component, confirm:
   - No `max-w-7xl` or `max-w-screen-xl` remaining in block wrapper
   - Goads `container` (`mx-auto max-w-[1416px] px-4 lg:px-6`) is the outermost layout div
   - No horizontal scroll at any breakpoint

5. **Responsive testing**

   | Breakpoint | Key checks |
   |------------|-----------|
   | 375px (mobile) | Single column, CTAs full-width, text readable, no overflow |
   | 768px (tablet) | 2-col grids correct, nav hamburger works |
   | 1280px (desktop) | Full layout within 1416px container, all sections side-by-side correctly |
   | 1440px (wide) | Container centered with correct side margins |

6. **Apply SEO metadata**

   Read `migration-docs/05-seo-metadata.md` and apply to `src/app/layout.tsx`:
   - `<title>`, `<meta name="description">`
   - Open Graph: `og:title`, `og:description`, `og:image`, `og:url`, `og:type`
   - Twitter Card: `twitter:card`, `twitter:title`, `twitter:description`
   - Canonical URL

7. **Performance audit (Lighthouse / Next.js)**

   Run `npm run build` and check for:
   - No build errors or type errors
   - Image optimization: all `<img>` tags use Next.js `<Image>` component
   - No layout shift from font loading (fonts already preloaded via `src/fonts/index.ts`)
   - LCP element identifiable (hero H1 or hero image)

8. **Final cleanup**

   - Confirm `src/app/hero-section-40/` deleted (from Phase 01)
   - No placeholder "lorem ipsum" or "Orion AI" text remains anywhere
   - No console errors in browser dev tools
   - All external links (WhatsApp, Telegram, `/contact`) resolve correctly or have placeholder hrefs documented

### Related Code Files

- Modify: `src/app/page.tsx` (primary composition file)
- Modify: `src/app/globals.css` (scroll-behavior, any final token fixes)
- Modify: `src/app/layout.tsx` (SEO metadata, footer adjustment if needed)
- Read: `migration-docs/05-seo-metadata.md`

### Todo

- [ ] Compose all 11 sections in page.tsx in correct order
- [ ] Set correct `id` anchors on sections (products, pricing, faq, about, testimonials)
- [ ] Add `scroll-behavior: smooth` to globals.css
- [ ] Verify all Header nav anchor links scroll to correct sections
- [ ] Audit visual spacing — no cramped or double-bordered sections
- [ ] Confirm alternating background sequence
- [ ] Verify container consistency (no max-w-7xl remaining)
- [ ] Test responsive at 375px / 768px / 1280px / 1440px
- [ ] Apply full SEO metadata from migration-docs/05-seo-metadata.md
- [ ] Run `npm run build` — zero errors, zero type errors
- [ ] Verify all `<img>` use Next.js `<Image>` component
- [ ] Remove all placeholder / Orion / demo content
- [ ] Check browser console for errors
- [ ] Verify external links (WhatsApp, Telegram, /contact)

### Success Criteria

- `npm run build` passes with zero errors and zero TypeScript errors
- All 11 sections render in correct order with GoAds content
- Scroll anchors work: clicking Header "Pricing" scrolls to Pricing section
- No layout overflow or horizontal scroll at any breakpoint
- No leftover demo, placeholder, or Orion content
- Browser console: zero errors
- Lighthouse Performance score ≥ 80 on mobile
- SEO metadata visible in view-source (title, description, OG tags)

### Risk Assessment

| Risk | Severity | Mitigation |
|------|----------|-----------|
| Type errors from block components | Medium | Run `npm run typecheck` after each section install in Phase 02; don't batch |
| Image optimization warnings | Low | Wrap all block `<img>` in Next.js `<Image>` during Phase 02 adaptation step |
| Missing migration-docs content | Medium | Fall back to Business Context in plan.md for exact copy if migration-docs unavailable |
| Footer double-render (layout + page.tsx) | High | Decide footer approach in Phase 02 Section 11 and enforce in page.tsx composition |

### Next Steps

- After Phase 03 passes: deploy to staging for stakeholder review
- Real testimonial data: replace 12 placeholder quotes with actual client quotes
- Real platform logos: replace placeholder SVGs with official brand assets (check usage rights)
- Analytics: add Plausible or Google Analytics once design is approved
- Contact/WhatsApp integration: finalize redirect links for all CTAs
