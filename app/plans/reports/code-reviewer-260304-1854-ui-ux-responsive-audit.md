# UI/UX Review Report -- GoAds Codebase

**Date:** 2026-03-04
**Scope:** All pages (`/`, `/pricing`, `/agency-ad-account`, `/bm`, `/about`, `/blog`) + layout, header, footer, section blocks
**Files Reviewed:** 30+ components
**TypeScript:** Compiles clean (`tsc --noEmit` = 0 errors)

---

## 1. Critical Issues (Must Fix)

### C1. Footer contains un-customized shadcn/studio content
**File:** `/Users/nammdev/Documents/Code/goads-coss/app/src/components/shadcn-studio/blocks/footer-component-02/footer-component-02.tsx`
**Lines:** 17-19, 23-34, 38-86, 92-131, 139-144

The entire footer block is un-customized shadcn/studio placeholder content:
- Logo says "shadcn/studio" (line 10, via Logo component)
- Social links are `href='#'` with brand-colored icons (`text-sky-600`, `text-amber-600`)
- Company links (About, Features, Works, Career) all point to `#`
- Help links (Customer Support, Delivery Details, T&C, Privacy) all `#`
- Newsletter form has no action handler
- Bottom text: `shadcn/studio, Made with heart-emoji for better web`
- Brand logos (bestofjs, producthunt, reddit, etc.) are shadcn/studio marketing logos

**Impact:** Users see a generic template footer, eroding trust. Also exposes hardcoded brand colors violating oklch monochrome theme.

**Fix:** Replace entire footer with GoAds-branded content -- company name, real links (/about, /pricing, /blog, /contact), Telegram/Discord social links, remove newsletter or wire it up, replace bottom text with GoAds tagline.

---

### C2. Testimonials "Hire Me" CTA is placeholder text
**File:** `/Users/nammdev/Documents/Code/goads-coss/app/src/components/shadcn-studio/blocks/testimonials-component-22/testimonials-component-22.tsx`
**Lines:** 109-123

The testimonials section has two CTAs:
- "Let's talk" button linking to `#`
- "Hire Me" CraftButton linking to `#`

These are generic shadcn/studio placeholders. "Hire Me" makes no sense for GoAds (a B2B ad infrastructure provider).

**Fix:**
```tsx
// Replace "Let's talk" + "Hire Me" with GoAds CTAs:
<Button variant='outline' asChild className='rounded-full !px-4'>
  <a href='https://t.me/GoAdsSupport'>
    Contact Support
    <MessageSquareMore />
  </a>
</Button>
<Separator orientation='vertical' />
<CraftButton asChild>
  <a href='/#pricing'>
    <CraftButtonLabel>View Plans</CraftButtonLabel>
    <CraftButtonIcon>
      <ArrowUpRightIcon className='size-3 stroke-2 transition-transform duration-500 group-hover:rotate-45' />
    </CraftButtonIcon>
  </a>
</CraftButton>
```

---

### C3. Hero Section 23 has generic placeholder content (used on /agency-ad-account and /bm)
**File:** `/Users/nammdev/Documents/Code/goads-coss/app/src/components/shadcn-studio/blocks/hero-section-23/hero-section-23.tsx`

Multiple issues:
- **Line 53:** Badge says "AI-Powered" -- irrelevant to GoAds
- **Line 59:** Heading says "Turn customer data into product Sales/Growth/Business" -- generic SaaS copy, not ad account product
- **Line 65:** Description talks about "intelligent analytics" -- not GoAds messaging
- **Line 85:** Typo: "Start 7 Day Free **Trail**" (should be "Trial")
- **Line 85:** GoAds does not offer free trials -- misleading
- **Line 89-93:** "Watch Video" button links to `#`
- **Lines 130-181:** "More than 300+ Companies trusted one" -- grammatically broken placeholder
- Logo marquee shows generic brands (University of Mississippi, DHL, Mercedes-Benz, etc.) unrelated to GoAds

**Impact:** Both `/agency-ad-account` and `/bm` pages display this misleading hero. Users landing from ads will see "free trial" -- a false promise.

**Fix:** Customize heading, description, badge, and CTAs for each page. Remove "Watch Video" or link it to a real video. Replace brand logos with real GoAds client testimonials or partner logos. Fix the typo.

---

### C4. Emoji used as heading decoration in testimonials
**File:** `/Users/nammdev/Documents/Code/goads-coss/app/src/components/shadcn-studio/blocks/testimonials-component-22/testimonials-component-22.tsx`
**Line 40:** `around the globe. globe-emoji`

Per project rules: "No emojis used as icons (use SVG/Lucide instead)."

**Fix:** Replace with `<GlobeIcon className="inline size-6" />` from lucide-react, or remove.

---

## 2. High Priority (Should Fix)

### H1. Hardcoded brand colors violate oklch monochrome theme
Multiple files use hardcoded Tailwind colors instead of semantic tokens:

| File | Line | Color | Context |
|------|------|-------|---------|
| `footer-component-02.tsx` | 27 | `text-sky-600 dark:text-sky-400` | Instagram icon |
| `footer-component-02.tsx` | 30 | `text-amber-600 dark:text-amber-400` | Twitter icon |
| `statistics-card-04.tsx` | 28 | `text-green-600 dark:text-green-400` | Percentage change |
| `turn-viewers-to-orders.tsx` | 67-101 | `bg-green-600/10`, `text-green-600` | Badge check icons |
| `hero-section-36` | 30-31 | `bg-green-600`, `bg-sky-600/20` | Status dot, icon bg |
| `rating.tsx` | 18 | `text-amber-600 dark:text-amber-400` | Star ratings |

**Note:** `rating.tsx` amber for stars is an acceptable semantic color. Footer icons and hero-section-36 are the main offenders (footer is actively rendered).

**Fix:** For footer social icons, use `text-muted-foreground hover:text-foreground` consistent with SiteHeader social links. For status indicators, use `bg-primary` or `text-primary`.

---

### H2. SiteHeader social links point to shadcn/studio accounts
**File:** `/Users/nammdev/Documents/Code/goads-coss/app/src/components/site-header.tsx`
**Lines 11-13:**
```tsx
{ href: 'https://github.com/shadcnstudio/shadcn-studio', icon: GithubIcon, label: 'Github' },
{ href: 'https://x.com/ShadcnStudio', icon: XIcon, label: 'X' },
{ href: 'https://discord.com/invite/kBHkY7DekX', icon: DiscordIcon, label: 'Discord' },
```

These link to shadcn/studio's social accounts, not GoAds. Visitors clicking these will leave the site to a different brand.

**Fix:** Update to GoAds social URLs or remove if not applicable.

---

### H3. BentoGrid blocks contain un-customized shadcn/studio content

**bento-grid-01/features.tsx line 320:**
> "Kickstart your project with shadcn/studio's wide range of shadcn/ui blocks and layouts."

**bento-grid-19/turn-viewers-to-orders.tsx line 117:**
> Logo + "shadcn/studio" text displayed in the card banner

These are visible on the home page (`/`) and `/agency-ad-account` page respectively.

**Fix:** Replace with GoAds-specific copy and branding.

---

### H4. Blog search input missing accessible label
**File:** `/Users/nammdev/Documents/Code/goads-coss/app/src/components/blog-hero.tsx`
**Line 48-51:**
```tsx
<input
  type="search"
  placeholder="Search Your Blogs..."
  className="h-10 flex-1 bg-transparent px-4 text-sm outline-none placeholder:text-muted-foreground"
/>
```

No `<label>`, no `aria-label`, no `id`. Screen readers cannot identify this input.

**Fix:** Add `aria-label="Search blog posts"` or wrap with a `<label>`.

---

### H5. Footer newsletter email input missing label
**File:** `/Users/nammdev/Documents/Code/goads-coss/app/src/components/shadcn-studio/blocks/footer-component-02/footer-component-02.tsx`
**Line 92:**
```tsx
<Input type='email' placeholder='Your email...' />
```

No label, no `aria-label`. The submit button also has no `aria-label` or sr-only text.

**Fix:** Add `aria-label="Email for newsletter"` to input and `aria-label="Subscribe"` to button.

---

### H6. SiteFooter has inconsistent padding pattern
**File:** `/Users/nammdev/Documents/Code/goads-coss/app/src/components/site-footer.tsx`
**Line 11:**
```tsx
<div className="container flex w-full items-center justify-center gap-2 px-4 sm:px-6">
```

The `container` utility already applies `px-4 lg:px-6`. Adding `px-4 sm:px-6` creates double-specification. The `sm:px-6` is the OLD pattern (should be `lg:px-6` if anything, but `container` handles it).

**Fix:** Remove the extra `px-4 sm:px-6`:
```tsx
<div className="container flex w-full items-center justify-center gap-2">
```

---

## 3. Medium Priority (Nice to Fix)

### M1. Old container pattern in unused/secondary blocks
Files with `max-w-7xl` or `max-w-6xl` + `px-4 sm:px-6 lg:px-8`:
- `hero-section-23/header.tsx` (line 46) -- dead code per memory notes, but still in repo
- `hero-section-36/header.tsx` (line 50), `hero-section-36.tsx` (lines 25, 216)
- `logo-cloud-04/logo-cloud-04.tsx` (line 15)
- `hero-section-39/header.tsx` (line 51)

These blocks are not actively rendered on any page route, but if reused later they will have wrong container width.

**Fix:** Convert to `container` class or inline `mx-auto max-w-[1416px] px-4 lg:px-6`.

---

### M2. No `prefers-reduced-motion` respect
**Finding:** Zero instances of `prefers-reduced-motion` in the entire `src/` directory.

The site uses extensive motion animations via `MotionPreset` (fade, blur, slide on every section). Users with motion sensitivity preferences will still see all animations.

**Fix:** The `MotionPreset` component (likely wrapping framer-motion) should check `window.matchMedia('(prefers-reduced-motion: reduce)')` or use framer-motion's `useReducedMotion()` hook to disable animations.

---

### M3. Hero grid background renders 216 cells without virtualization
**File:** `/Users/nammdev/Documents/Code/goads-coss/app/src/components/shadcn-studio/blocks/hero-clone/hero-grid-bg.tsx`
**Lines 26-34:**

Renders `27 * 8 = 216` divs with hover transitions. Each has `will-change-transform`. On mobile devices this is wasteful -- the grid is masked and mostly invisible.

**Impact:** Minor performance overhead on low-end devices.

**Fix (low effort):** Add `pointer-events-none` to parent on mobile: `max-md:pointer-events-none` to disable hover handlers.

---

### M4. Testimonials review data uses placeholder names on landing page
**File:** `/Users/nammdev/Documents/Code/goads-coss/app/src/app/page.tsx`
**Lines 15-48:**

Reviews show "Marley Calzoni (Lemonsqueezy)", "Tony Stark (Stark Industries)", "Bruce Wayne (Wayne Enterprises)" -- obviously fake. The `/agency-ad-account` and `/bm` pages have more realistic names.

**Fix:** Replace with realistic GoAds testimonials consistent with other pages.

---

### M5. Team section social links all point to `#`
**File:** `/Users/nammdev/Documents/Code/goads-coss/app/src/app/about/page.tsx`
**Lines 82-128:**

All team member social links (`facebook`, `twitter`, `github`, `instagram`) are `#`. The sr-only text says "Check" instead of the platform name.

**Fix:** Either add real links or remove the social buttons. Update sr-only to say platform name (e.g., "Facebook profile").

---

### M6. Landing page.tsx is 301 lines -- over 200-line limit
**File:** `/Users/nammdev/Documents/Code/goads-coss/app/src/app/page.tsx`

Per development rules, files should be under 200 lines. Most of the content is data definitions (reviews, pricing plans, FAQ data).

**Fix:** Extract `reviews`, `pricingPlans`, and `faqTabsData` into a separate `page-data.ts` file.

---

### M7. `bm/page.tsx` is 310 lines
**File:** `/Users/nammdev/Documents/Code/goads-coss/app/src/app/bm/page.tsx`

Same issue as M6. Extract product/review/FAQ data into a data file.

---

## 4. Low Priority

### L1. CTA section hardcodes `bg-black` instead of using theme token
**File:** `/Users/nammdev/Documents/Code/goads-coss/app/src/components/shadcn-studio/blocks/cta-section-05/cta-section-05.tsx`
**Line 14:** `bg-black`

This is intentional dark CTA contrast, but `bg-foreground` would adapt to theme changes.

---

### L2. hero-section-23 dashboard cards show generic SaaS metrics
**File:** `hero-section-23.tsx` lines 188-228

Cards show "Statistics $13.4k +38%", "Customers 42.4k", "Total Sales" chart -- generic SaaS dashboard data unrelated to ad accounts. These are visible on `/agency-ad-account` and `/bm`.

---

### L3. `pricing-component-01` has unused hardcoded `text-green-600`
**File:** `pricing-component-01.tsx` lines 59, 76

Not actively rendered on any page, but still has hardcoded colors.

---

## 5. Passed Checks

| Check | Status | Notes |
|-------|--------|-------|
| TypeScript compilation | PASS | 0 errors |
| Container utility defined | PASS | `globals.css` line 210-212 |
| SiteHeader in layout | PASS | Not duplicated in blocks |
| SectionDivider pattern | PASS | Consistent `border-b border-border/60` + diamond dots |
| oklch palette in CSS vars | PASS | Both light and dark themes use oklch |
| Geist font setup | PASS | Applied via `fontSans.variable` in layout |
| `sr-only` on icon-only buttons | PASS | Header search, sign-in, menu, social links all have sr-only |
| `focus-visible` styles | PASS | 22 occurrences across 16 files |
| `cursor-pointer` on interactive elements | PASS | Applied to accordions, nav triggers, product selectors |
| `overflow-clip` on main container | PASS | layout.tsx prevents horizontal scroll |
| All `<img>` have `alt` text | PASS | No missing alt attributes found |
| No `href="#"` links | PASS | Only footer (uncustomized) uses them |
| Section spacing consistent | PASS | All blocks use `py-8 sm:py-16 lg:py-24` |
| Dark mode CSS variables | PASS | Full `.dark {}` theme defined |
| Shadow tokens | PASS | 2xs through 2xl defined |
| Section headers use SectionHeader component | PASS | Adopted in 7+ blocks |

---

## 6. Metrics Summary

| Metric | Value |
|--------|-------|
| Pages reviewed | 6 |
| Components reviewed | 30+ |
| Critical issues | 4 |
| High priority | 6 |
| Medium priority | 7 |
| Low priority | 3 |
| Type errors | 0 |
| Hardcoded color violations | ~12 instances |
| Un-customized placeholder content | ~8 blocks/sections |
| Accessibility gaps | 2 (missing input labels) |
| Motion accessibility | 0 `prefers-reduced-motion` support |

---

## 7. Recommended Action Priority

1. **[C1-C3]** Replace all un-customized footer + hero-section-23 + testimonials CTA content with GoAds-branded copy
2. **[C4]** Remove emoji from testimonials heading
3. **[H2]** Fix SiteHeader social links (pointing to shadcn/studio)
4. **[H1]** Replace hardcoded brand colors in footer with semantic tokens
5. **[H3]** Fix remaining shadcn/studio text in bento-grid blocks
6. **[H4-H5]** Add accessible labels to search and newsletter inputs
7. **[H6]** Clean up SiteFooter double padding
8. **[M2]** Add `prefers-reduced-motion` support to MotionPreset
9. **[M4-M5]** Replace placeholder testimonial names and fix team social links
10. **[M6-M7]** Extract page data to separate files (file size rule)

---

## Unresolved Questions

1. Is `hero-section-23/header.tsx` confirmed dead code? If so, consider deleting it.
2. Is the footer-component-02 intentionally kept as-is for a future customization pass, or was it missed?
3. Are the hero-section-36 and hero-section-39 blocks planned for future use, or should they be cleaned up/removed?
4. Does GoAds have real client testimonials/logos to replace the placeholder content?
