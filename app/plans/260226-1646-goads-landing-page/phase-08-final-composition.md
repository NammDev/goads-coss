## Phase 08: Final Composition & QA

**Priority:** P1 | **Status:** pending | **Effort:** 30m

### Overview
Compose all 7 sections into `page.tsx`, verify scroll anchors, responsive layout, and visual consistency.

### Implementation Steps

1. **Compose page.tsx** -- import and render all sections in order:
   ```tsx
   <main className="flex-1">
     <HeroSection />
     <FeaturesSection />
     <PricingSection />      {/* id="pricing" */}
     <TestimonialsSection />
     <FaqSection />          {/* id="faq" */}
     <CtaBannerSection />
   </main>
   ```
   Note: Footer rendered via layout.tsx, not page.tsx

2. **Verify anchor links**
   - Hero "See Pricing" -> scrolls to #pricing
   - Header "FAQ" -> scrolls to #faq
   - Add `scroll-behavior: smooth` to html if not present

3. **Visual spacing audit**
   - Consistent vertical spacing between sections (py-16 to py-24)
   - Alternating backgrounds: white -> white -> grey -> white -> white -> dark
   - No double borders or conflicting dividers with goads frame lines

4. **Responsive testing**
   - Mobile (375px): single column, readable text, accessible CTAs
   - Tablet (768px): 2-column grids where applicable
   - Desktop (1440px): full layout within 1416px container

5. **Container consistency check**
   - All blocks use goads `container` class (not their own max-w-7xl)
   - No horizontal overflow on mobile

6. **Clean up unused files**
   - Remove any leftover Orion/demo content from hero-section-40
   - Remove `src/app/hero-section-40/page.tsx` (demo route)

### Related Code Files
- Modify: `src/app/page.tsx`
- Delete: `src/app/hero-section-40/page.tsx`
- Modify: `src/app/globals.css` (add scroll-behavior if needed)

### Todo
- [ ] Compose all sections in page.tsx
- [ ] Verify anchor links (#pricing, #faq)
- [ ] Audit vertical spacing between sections
- [ ] Test responsive layout (mobile/tablet/desktop)
- [ ] Ensure all blocks use goads container
- [ ] Remove unused demo files
- [ ] Final visual review

### Success Criteria
- All 7 sections render in correct order
- Anchor links scroll smoothly
- No layout overflow or spacing issues
- Responsive on all breakpoints
- No leftover demo/placeholder content
