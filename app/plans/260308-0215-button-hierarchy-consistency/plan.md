# Button Hierarchy Consistency

## Status: completed

## Goal
Standardize all buttons across landing page into 3 types with consistent styling & animation.

## Button Design System

### Type 1: CTA (Primary Action)
- **Style**: CraftButton (bg-primary, icon circle expand on hover, text inverts)
- **Animation**: Icon circle scales to fill button, text color transitions
- **Component**: `<CraftButton>` from `src/components/ui/craft-button.tsx`
- **When**: Main action per section (max 1 per section)
- **Radius**: `rounded-lg` (update CraftButton from rounded-full)

### Type 2: Secondary (Outline + Glow)
- **Style**: `variant="outline"` + `btn-cta-glow` class
- **Animation**: Glow box-shadow + shine sweep on hover
- **Component**: `<Button variant="outline" className="btn-cta-glow ...">`
- **When**: Supporting action next to CTA
- **Radius**: `rounded-lg` (from button base)

### Type 3: Ghost/Text Link
- **Style**: No border, no bg. Text only with hover color change
- **When**: Navigation, "Learn more" type links
- **Not a button** - just styled `<a>` tags

## Section-by-Section Changes

### Navbar (`site-header.tsx`)
| Element | Current | Target |
|---------|---------|--------|
| Get Started | Custom `<a>` with btn-cta-glow | **CraftButton** (Type 1 CTA) |
| Sign in | `Button variant="outline"` | **Type 2** outline + glow |

### Hero (`hero-section-23.tsx`)
| Element | Current | Target |
|---------|---------|--------|
| Get Your BM Today | `Button` default + shine | **CraftButton** (Type 1 CTA) |
| Talk to Support | `Button variant="outline"` | **Type 2** outline + glow |

### Pricing (`pricing-component-13.tsx`)
| Element | Current | Target |
|---------|---------|--------|
| All 3 plan buttons | Mixed default/secondary | **CraftButton** (Type 1 CTA) all same style |

### Testimonials (`testimonials-component-22.tsx`)
| Element | Current | Target |
|---------|---------|--------|
| View Plans | CraftButton (already correct) | Keep as **Type 1 CTA** |
| Contact Support | `Button variant="outline"` | **Type 2** outline + glow |

### CTA Banner (`cta-section-05.tsx`)
| Element | Current | Target |
|---------|---------|--------|
| Telegram | `Button` default | **CraftButton** (Type 1 CTA) |
| Discord | `Button variant="secondary"` | **Type 2** outline + glow (white border on dark bg) |

### Footer (`footer-component-02.tsx`)
| Element | Current | Target |
|---------|---------|--------|
| Subscribe arrow | `Button size="icon"` | Keep as is (form element, not navigation) |

## Implementation Steps

### Phase 1: Update CraftButton component
1. Change `rounded-full` to `rounded-lg` in `craft-button.tsx` line 72
2. Verify CraftButton works with `asChild` for `<a>` links

### Phase 2: Update each section
1. **Navbar**: Replace custom CTA `<a>` with CraftButton, add glow to Sign in
2. **Hero**: Replace primary Button with CraftButton, add glow to outline button
3. **Pricing**: Replace all 3 buttons with CraftButton (same style, different labels)
4. **Testimonials**: Add glow to Contact Support outline button
5. **CTA Banner**: Replace Telegram button with CraftButton, Discord with outline+glow

### Phase 3: Cleanup
1. Remove any remaining `rounded-full` on buttons
2. Verify dark mode looks correct
3. Test hover animations across all sections

## Files to Modify
- `src/components/ui/craft-button.tsx` — rounded-full -> rounded-lg
- `src/components/site-header.tsx` — navbar CTA + Sign in
- `src/components/shadcn-studio/blocks/hero-section-23/hero-section-23.tsx` — hero buttons
- `src/components/shadcn-studio/blocks/pricing-component-13/pricing-component-13.tsx` — pricing buttons
- `src/components/shadcn-studio/blocks/testimonials-component-22/testimonials-component-22.tsx` — testimonial buttons
- `src/components/shadcn-studio/blocks/cta-section-05/cta-section-05.tsx` — CTA banner buttons

## Skills to Activate
- `/ui-ux-pro-max` — design consistency check
- `react-best-practices` — React patterns for component reuse

## Success Criteria
- All CTA buttons use CraftButton with same animation
- All secondary buttons use outline + glow
- No mixed button styles within same hierarchy level
- Consistent `rounded-lg` everywhere
- Dark mode and light mode both look correct
