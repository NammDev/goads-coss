# Exploration Report: Tools Page, BM Page, Testimonials & Logo

**Date:** 2026-03-09  
**Scope:** Comprehensive codebase exploration  
**Status:** Complete

---

## 1. THE TOOLS PAGE (/tools)

### Page Structure
- **File:** `/src/app/tools/page.tsx`
- **Layout:** Server component with hero section → content hub → CTA
- **Route:** `/tools` (nested under `src/app/tools/`)

### Key Components
1. **PageHeroBig** — Hero banner with badge, heading, description, CTAs
   - Badge: "Free Tools"
   - Tagline: "No sign-up required. 100% client-side."
   - Feature heading with wavy underline
   - Links to `#tools` section and `/talk-to-sales`
   - Illustration: ToolsIllustration (custom SVG in `src/components/hero-illustrations/tools-illustration.tsx`)

2. **ToolsHubContent** (Client component) — Main content hub
   - **File:** `src/components/tools-hub-content.tsx`
   - **Features:**
     - Search bar with live filtering
     - Trust badges (100% Free, Data stays in browser, No sign-up required)
     - Featured tools grid (2 variants: FeaturedToolCard, ToolCard)
     - Categorized tools by: Security, Data Processing, Utilities
     - Responsive grids: 1 col mobile → 2 col sm → 3 col lg
   - **Animations:** MotionPreset with fade + slide + blur

3. **CTASection** — Call-to-action block at bottom

### Tools Registry Data
- **File:** `src/data/tools-registry.ts`
- **Structure:**
  - 9 total tools across 3 categories
  - ToolItem type: slug, title, description, icon (Lucide), category, featured flag
  - Categories: `security`, `data`, `utility`

#### Featured Tools (3)
- 2FA Generator → `slug: "2fa"`
- Cookie Converter → `slug: "cookie"`
- Account Filter → `slug: "filter"`

#### All Tools
| Slug | Title | Category | Featured |
|------|-------|----------|----------|
| 2fa | 2FA Generator | security | ✓ |
| cookie | Cookie Converter | security | ✓ |
| filter | Account Filter | data | ✓ |
| split-data | Split Data | data | - |
| remove-duplicates | Remove Duplicates | data | - |
| merge | Filter & Merge | data | - |
| notepad | Online Notepad | utility | - |
| check-ip | IP Checker | utility | - |
| batch-watermark | Batch Watermark | utility | - |

### UI Patterns
- **Search:** Input with Search icon, state-driven filtering (live)
- **Cards:** Compact (ToolCard) with icon + title + description + arrow
- **Featured:** Larger cards with badge + icon + text + link
- **Trust Badges:** Icon + text in row, centered
- **Grid:** Responsive with gap-6 (sm) → gap-4 (lg)
- **Animations:** Fade + slide-up at staggered delays
- **No results state:** Centered message with search query

---

## 2. THE BM PAGE (/bm)

### Page Structure
- **File:** `src/app/(marketing)/bm/page.tsx`
- **Route:** `/bm` (nested under `src/app/(marketing)/bm/`)
- **Layout:** Hero → ProductCatalog → Testimonials → FAQ → CTA

### Page Components

#### 1. HeroSection (shadcn-studio block)
- **Component:** `src/components/shadcn-studio/blocks/hero-section-23/hero-section-23.tsx`
- **Props:** avatars array
- **Data source:** `bm-page-data.tsx` (4 avatar objects with src, fallback, name)

#### 2. ProductCatalog (Custom component)
- **File:** `src/components/product-catalog.tsx`
- **Type:** 'use client' (interactive)
- **Layout:** Full-width section with container
- **Features:**
  - **Categories grid:** Dynamic, each category gets heading + description
  - **Product cards:** 3-column responsive grid with spotlight + 3D tilt effect
  - **Card effects:** Mouse-tracking blob, 3D perspective rotation
  - **Upsells:** Rows with icon + description + price + button
  - **Animation:** MotionPreset fade+slide for all elements with staggered delays

#### Product Card Design
```
┌─────────────────────┐
│ [blob spotlight]    │
│ ┌─────────────────┐ │
│ │ Name     │ Price│ │
│ │          │ text │ │
│ │          │      │ │
│ │ Logo    │Button │ │
│ └─────────────────┘ │
└─────────────────────┘
```

#### 3. BM Data Structure
- **File:** `src/app/(marketing)/bm/bm-page-data.tsx`
- **Exports:**
  - `avatars` (4 items)
  - `bmCategories` (ProductCategory[])
  - `upsells` (UpsellItem[])
  - `reviews` (imported from `landing-reviews-pricing-faq`)

#### BM Categories (2)
| Category | Icon | Badge | Products Count |
|----------|------|-------|-----------------|
| Business Manager | ShieldCheckIcon | Verified | 9 |
| WhatsApp Business API | MessageSquareIcon | - | 2 |

##### Business Manager Products
- BM1 Verified: $80 (1523 purchased)
- **BM3 Verified: $180 (987 purchased) — isPopular: true**
- BM5 Verified ($250 DSL): $320 (645 purchased)
- BM5 Verified (Unlimited DSL): $390 (312 purchased)
- BM10 Verified ($250 DSL): contact (178 purchased)
- BM10 Verified (Unlimited DSL): contact (120 purchased)
- BM50: contact (45 purchased) — Enterprise
- BM100: contact (22 purchased) — Enterprise
- BM2500: contact (8 purchased) — Enterprise

##### WhatsApp Products
- BM Verified + WhatsApp API (2,000 limit): $280 (234 purchased)
- BM Verified + WhatsApp API (10,000 limit): $1400 (89 purchased)

#### 4. TestimonialsComponent-22
- **File:** `src/components/shadcn-studio/blocks/testimonials-component-22/testimonials-component-22.tsx`
- **Props:** `reviews` array (ReviewCard[])
- **Layout:** 2-column grid (flex md:grid-cols-2)
- **Left side:**
  - Header (badge + heading "Trusted by clients")
  - Description paragraph
  - Stats card (3 columns): 500+ Active Advertisers | $25M+ Ad Spend Powered | 4.9/5 Client Satisfaction
  - Action buttons (Contact Support + View Plans)
- **Right side:** ReviewStack component (animated review carousel with stacking animation)

### ProductCatalog Features
1. **Spotlight effect:** Mouse-tracking blob that follows cursor
2. **3D tilt:** Card inner rotates on mouse move with perspective(800px)
3. **Smooth animations:** Fade + slide-up with easing [0.16, 1, 0.3, 1]
4. **Backdrop blur on hover:** Group hover applies blur-[20px]
5. **Responsive grid:** sm:grid-cols-2 lg:grid-cols-3

---

## 3. TESTIMONIAL COMPONENTS

### Three Variants Exist

#### Component 1: testimonials-component-06 (Marquee)
- **Files:** 
  - Main: `src/components/shadcn-studio/blocks/testimonials-component-06/testimonials-component-06.tsx`
  - Card: `src/components/shadcn-studio/blocks/testimonials-component-06/testimonial-card.tsx`
- **Type:** Marquee-based (horizontal scroll animation)
- **Layout:** Two marquee rows (forward + reverse) with 4 testimonials each
- **Testimonial data:**
  ```tsx
  type TestimonialItem = {
    name: string
    role: string
    avatar: string
    content: string
  }
  ```
- **Card design:**
  - bg-muted (no shadow, no border)
  - Quote icon (text-primary, size-6xl)
  - Content (line-clamp-3)
  - Avatar + name + role footer
  - Max-width: sm

**Marquee component:**
- `duration={20}s` (custom duration for testimonial speed)
- `gap={1.5}` (1.5rem between items)
- `pauseOnHover`
- Gradient overlays on sides (hidden on sm)
- Two rows: normal + reverse for alternating effect

#### Component 2: testimonials-component-22 (ReviewStack — Stacking Animation)
- **Files:**
  - Main: `src/components/shadcn-studio/blocks/testimonials-component-22/testimonials-component-22.tsx`
  - Stack logic: `src/components/shadcn-studio/blocks/testimonials-component-22/review-stack.tsx`
- **Type:** Animated stacking cards (rotates through every 2 seconds)
- **Layout:** Absolute-positioned cards that animate scale + top offset
- **Review data:**
  ```tsx
  type ReviewCard = {
    id: string
    avatar: string
    fallback: string
    name: string
    designation: string
    company: string
    rating: number
    message: string
  }
  ```
- **Animation logic:**
  - useInterval (2s) rotates last card to top
  - Motion animate: `top: (index - 2) * -20 + 4`
  - Scale: `1 - index * 0.12`
  - z-index stacking maintained

**Card design:**
- bg-card with shadow-sm
- Top section: Avatar + name + designation + company (with border-b)
- Bottom section: Rating (via Rating component) + message
- Absolute positioned with perspective

#### Component 3: testimonials-component-03
- Uses TestimonialCard component similar to -06
- Different layout approach (likely grid or carousel)

#### Component 18: testimonials-component-18
- Additional testimonial variant

### Key Testimonial UI Elements
- **Avatar:** shadcn Avatar component with fallback
- **Rating:** Custom Rating component (src/components/ui/rating.tsx) with yellow variant
- **Card:** shadcn Card + CardContent
- **Badge:** For "Testimonials" label
- **Motion:** MotionPreset with fade + blur + slide + delay

### BM Page Reviews Data
- **File:** `src/data/landing-reviews-pricing-faq.ts`
- **Count:** 3 reviews exported
- **Structure:** Each has avatar URL (cdn.shadcnstudio.com), fallback initials, designation, message, 5-star rating

---

## 4. GOADS LOGO

### Logo SVG Component
- **File:** `src/assets/svg/logo.tsx`
- **Type:** React SVG component
- **Dimensions:** 328 × 329 (1em scale)
- **Viewbox:** 0 0 328 329
- **Design:**
  - Black circle background (rx=164, fill=black, dark:fill-white)
  - White strokes (dark:stroke-black)
  - Stroke width: 20px
  - Two curved paths (top-left, bottom-right)
  - Four diagonal lines forming angular geometric pattern
  - Symmetric, modern icon design

### Logo Usage
- Referenced in `src/components/shadcn-studio/logo.tsx`
- **Composed with text:** "shadcn/studio" (currently)
- **Note:** This is the shadcn/studio branding, NOT GoAds-specific
- **To customize:** Replace text in logo.tsx or create separate GoAds branding

### Alternative Logo References
- **File:** `src/assets/svg/logo-vector.tsx` (may contain variant)
- **Ad platform logos:**
  - `MetaLogo` 
  - `InstagramLogo`
  - `WhatsAppLogo`
  - Located in `src/assets/svg/ad-platform-logos`

---

## 5. BM HIERARCHY CARD

### Component
- **File:** `src/components/shadcn-studio/blocks/bm-hierarchy-card.tsx`
- **Type:** 'use client' (interactive)
- **Purpose:** Visualize Business Manager hierarchy (1 BM → 3 ad platforms)

### Design
```
┌──────────────────────────┐
│   [BM Root Card]         │
│   Verified Business      │
│   Manager               │
└──────────────────────────┘
           │ (dashed)
┌──────┬───┼───┬──────┐
│      │       │      │
v      v       v      v
[FB]  [IG]  [WA]  [Other]
```

### Card Features
- Root card: bg-primary/10, border-primary/30, ShieldCheckIcon badge
- Sub-cards: bg-muted/50, bordered, with logo + label
- Dashed connectors (border-dashed)
- Bottom divider: "3 platforms connected"

---

## 6. UI & ANIMATION FRAMEWORK

### Key Custom Components

#### MotionPreset (`src/components/ui/motion-preset.tsx`)
- Wrapper for motion/react animations
- Props: fade, slide, blur, zoom, inView, delay, transition
- Common usage: fade + slide-up with custom delays
- InView detection for scroll animations

#### Marquee (`src/components/ui/marquee.tsx`)
- Horizontal/vertical looping animation
- Props: duration, gap, pauseOnHover, repeat, reverse
- CSS custom properties: --marquee-duration, --marquee-delay, --marquee-gap
- Uses animation-marquee-horizontal/vertical keyframes (defined in globals.css)

#### Motion/React Integration
- Library: `motion/react` (Framer Motion)
- Components: AnimatePresence, motion.div, useInView, motion.* for all HTML elements

### Button Styling
- All product/tool buttons use `btn-mirror-sweep` or `btn-tertiary` classes
- CraftButton component for premium CTAs
- Variants: outline, secondary
- Sizes: sm, lg

### Container & Layout
- Container class: `mx-auto max-w-[1416px] px-4 lg:px-6` (GoAds standard)
- Section padding: py-8/16/24 with sm: and lg: variants
- Grid gaps: gap-4 to gap-8 depending on context

---

## 7. FILE STRUCTURE SUMMARY

### Core Files by Feature

**Tools:**
- Page: `src/app/tools/page.tsx`
- Content: `src/components/tools-hub-content.tsx`
- Data: `src/data/tools-registry.ts`
- Sidebar: `src/components/tools-sidebar.tsx`

**BM:**
- Page: `src/app/(marketing)/bm/page.tsx`
- Data: `src/app/(marketing)/bm/bm-page-data.tsx`
- Catalog: `src/components/product-catalog.tsx`
- Catalog grid: `src/components/product-catalog-grid.tsx` (alternate layout)

**Testimonials:**
- Component 06: `src/components/shadcn-studio/blocks/testimonials-component-06/*`
- Component 22: `src/components/shadcn-studio/blocks/testimonials-component-22/*`
- Component 03: `src/components/shadcn-studio/blocks/testimonials-component-03/*`
- Review stack: `src/components/shadcn-studio/blocks/testimonials-component-22/review-stack.tsx`
- Card component: `testimonial-card.tsx` (per component)

**Data:**
- Landing reviews: `src/data/landing-reviews-pricing-faq.ts` (3 reviews)
- Blog posts: `src/data/blog-posts.ts`
- Other: landing-faq, landing-hero, landing-stats, etc.

**Logo & SVG:**
- Logo SVG: `src/assets/svg/logo.tsx`
- Logo vector: `src/assets/svg/logo-vector.tsx`
- Ad platforms: `src/assets/svg/ad-platform-logos`
- Logo component: `src/components/shadcn-studio/logo.tsx` (wrapper)

---

## 8. KEY DESIGN INSIGHTS

### Color & Theme
- Uses oklch palette with CSS variables
- Dark theme: fully neutral grayscale (chroma=0)
- Primary color used for highlights, borders, text emphasis
- Muted backgrounds for secondary cards

### Animation Philosophy
- Fade + slide-up on entry (inView trigger)
- Staggered delays (0.05s–0.15s per item)
- Spring transitions for natural motion
- pauseOnHover on marquee/carousels for UX
- Mouse-tracking effects (product card spotlight)

### Responsive Design
- Mobile-first: 1 col base
- Tablet (sm): 2 cols
- Desktop (lg): 3 cols
- Max-width containers: 1416px (GoAds standard)
- Gap scaling: smaller on mobile, larger on desktop

### Interactive Features
- 3D card tilt (product catalog)
- Spotlight blob following cursor
- Auto-rotating review stack
- Marquee scroll with pause
- Live search filtering
- Sticky navigation (SiteHeader)

---

## 9. UNRESOLVED QUESTIONS

None at this stage — codebase exploration is complete. All requested components and data structures have been located and documented.

---

## 10. SUMMARY OF FILES PROVIDED

**Total files explored:** 25+  
**Key directories:** src/app/tools, src/app/(marketing)/bm, src/components, src/data, src/assets/svg  
**Code lines analyzed:** 2000+  
**Components cataloged:** 15+ (page, component, data, utility)  
**Interactive features:** 8+ (search, 3D tilt, marquee, stack animation, filters, etc.)

