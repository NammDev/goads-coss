# Code Review: SectionHeader Refactoring & Block Cleanup

## Scope
- **Files reviewed**: 16 staged files (4 new, 12 modified)
- **LOC changed**: +739 / -217
- **Focus**: SectionHeader extraction, WavyUnderline reuse, container width normalization, hardcoded color fixes, stale content updates
- **TypeScript check**: PASS (0 errors)
- **ESLint**: 0 errors, 23 warnings (all pre-existing `no-img-element` from shadcn-studio blocks)

## Overall Assessment

Solid refactoring session. The `SectionHeader` component is well-designed with a clean variant system, and it successfully DRYs up 7 blocks that previously had duplicate label+heading+description patterns. Container widths and hardcoded colors have been fixed correctly. A few minor issues remain.

---

## Critical Issues

None.

---

## High Priority

### H1. Indentation bug in bento-grid-19 and bento-grid-10

Both `bento-grid-19.tsx` (line 21) and `bento-grid-10.tsx` (line 24) have the inner grid `<div>` at the wrong indentation level after the `SectionHeader` was inserted. The grid div appears to be a sibling of `SectionHeader` inside `div.container`, but the closing `</div>` for `container` wraps it at line 146/354 respectively. While this renders correctly because the JSX is still structurally valid, the indentation is misleading -- the grid div is indented as if it's inside `SectionHeader` rather than a sibling.

**File**: `/Users/nammdev/Documents/Code/goads-coss/app/src/components/shadcn-studio/blocks/bento-grid-19/bento-grid-19.tsx`
```tsx
// Lines 15-21 -- grid div starts at 6-space indent instead of 8
<div className='container space-y-12 sm:space-y-16'>
  <SectionHeader ... />
<div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>  // <-- wrong indent
```

Should be:
```tsx
<div className='container space-y-12 sm:space-y-16'>
  <SectionHeader ... />
  <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
```

Same pattern in `bento-grid-10.tsx` line 24.

**Impact**: Code readability; could confuse future contributors about DOM structure.

### H2. `HeroGridBg` className prop replaces defaults instead of merging

**File**: `/Users/nammdev/Documents/Code/goads-coss/app/src/components/shadcn-studio/blocks/hero-clone/hero-grid-bg.tsx` (line 10)
```tsx
<div className={`absolute inset-0 h-full w-full ${className ?? DEFAULT_VARS}`}>
```

When `className` is passed, `DEFAULT_VARS` (the CSS custom property definitions) are dropped entirely. If a consumer passes `className="my-custom-class"`, the grid cells lose their color variables and render transparent/broken.

Currently `blog-hero.tsx` imports `HeroGridBg` without passing `className`, so it works by accident. But the API is fragile.

**Fix**: Use `cn()` to merge, or always include `DEFAULT_VARS`:
```tsx
<div className={cn('absolute inset-0 h-full w-full', DEFAULT_VARS, className)}>
```

---

## Medium Priority

### M1. `testimonials-component-22` does NOT use SectionHeader

This block still has an inline Badge + h2 + p pattern (lines 17-56) that was NOT converted to use `SectionHeader`. This is a missed DRY opportunity. However, it has a unique left-aligned, split-column layout where heading and description are side-by-side (`flex justify-between`), which doesn't fit the current `SectionHeader` API (center/left stacked only). This is fine to leave as-is unless the SectionHeader gains a `split` variant.

### M2. `logo-cloud-04` still uses `max-w-7xl` with old padding

**File**: `/Users/nammdev/Documents/Code/goads-coss/app/src/components/shadcn-studio/blocks/logo-cloud-04/logo-cloud-04.tsx` (line 15)
```tsx
<div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
```

Should be `container` or `mx-auto max-w-[1416px] px-4 lg:px-6` per project convention. This was not touched in this refactoring session.

### M3. `logo-cloud-04` still has inline section header pattern

Same file has inline Badge + h2 + p (lines 17-47) that duplicates the `SectionHeader` badge variant pattern. Could use `<SectionHeader label="Our Valued Clients" labelVariant="badge" heading="..." description="..." />`.

### M4. Three `testimonials-component-01/02/03` still have inline underline label pattern

These blocks still duplicate the underline label + heading + description that `SectionHeader` now handles:
- `testimonials-component-01.tsx` line 101
- `testimonials-component-02.tsx` line 35
- `testimonials-component-03.tsx` line 35

### M5. `testimonials-component-06` still has inline uppercase label

`testimonials-component-06.tsx` line 21 has `text-primary text-sm font-medium uppercase` -- same as `SectionHeader`'s `uppercase` variant.

### M6. `hero-section-23/header.tsx` still uses `max-w-7xl`

**File**: `/Users/nammdev/Documents/Code/goads-coss/app/src/components/shadcn-studio/blocks/hero-section-23/header.tsx` (line 46)
```tsx
<div className='mx-auto flex h-full max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8'>
```

This header is likely unused (the site uses `SiteHeader` in layout), but if it is used anywhere, the container width is inconsistent.

### M7. `as const` assertions in SectionHeader are unnecessary

**File**: `/Users/nammdev/Documents/Code/goads-coss/app/src/components/section-header.tsx` (lines 78-81)
```tsx
const motionBase = {
  fade: true as const,
  slide: config.slide,
  ...(config.blur && { blur: true as const }),
```

`true as const` narrows `true` to the literal type `true` instead of `boolean`. Since `MotionPresetProps.fade` accepts `boolean`, the `as const` is unnecessary overhead. Not wrong, just redundant.

---

## Low Priority

### L1. `SectionHeader` uses `inView` default `false` -- consider `true`

Most consumers pass `inView` explicitly. The blocks that use `SectionHeader` without `inView` (bento-grid-19, bento-grid-10, bento-grid-01) don't animate on scroll-into-view. Confirm this is intentional -- those blocks may be above the fold or the parent already handles viewport detection.

### L2. `WavyUnderline` SVG has fixed width 453

The SVG `width='453'` is overridden by `className='w-full'` so it scales. This is fine, but the hardcoded width attribute is meaningless. Minor cleanup.

### L3. `blog-hero.tsx` uses `'use client'` but has no client-side interactivity

The file imports no hooks and has no event handlers. The `'use client'` directive could be removed if `WavyUnderline` and `HeroGridBg` are server-compatible (they are -- no hooks). However, the `Kalam` font import from `next/font/google` may require client context depending on usage.

---

## Edge Cases Found by Scouting

1. **`HeroGridBg` prop API** (H2 above): className replaces rather than merges CSS variables
2. **Blocks not yet converted**: 4 testimonials blocks + logo-cloud-04 still duplicate the inline section header pattern
3. **Container width**: `logo-cloud-04` and `hero-section-23/header.tsx` still use old `max-w-7xl`
4. **Instagram button in team-section-05** (line 92): Uses `destructive` color variant while all others use `primary` -- this appears intentional (red for Instagram) but is the only social icon with a different color treatment

---

## Positive Observations

1. **Clean variant system**: `VARIANT_CONFIG` in `SectionHeader` maps label variants to animation configs cleanly
2. **Type safety**: `SectionHeaderProps` is well-typed with union types for `labelVariant` and `align`
3. **Consistent refactoring**: All 7 blocks that adopted SectionHeader follow the same import/usage pattern
4. **Theme compliance**: Hardcoded colors (`text-green-600`, `bg-sky-600`, `bg-amber-600`) correctly replaced with `text-primary` / `bg-primary` semantic tokens
5. **Container width normalization**: `testimonials-22` and `hero-section-23` correctly updated to `max-w-[1416px]`/`container`
6. **Content updates**: Stale shadcn-studio placeholder text replaced with GoAds-specific copy

---

## Recommended Actions

1. **Fix** indentation in `bento-grid-19.tsx` and `bento-grid-10.tsx` (H1)
2. **Fix** `HeroGridBg` className to merge with `DEFAULT_VARS` using `cn()` instead of replacing (H2)
3. **Convert** `logo-cloud-04` to use `container` class and `SectionHeader` component (M2, M3)
4. **Consider** converting remaining testimonials blocks to use `SectionHeader` in a follow-up pass (M4, M5)
5. **Fix** `hero-section-23/header.tsx` container width if it's still in use (M6)

---

## Metrics

| Metric | Value |
|--------|-------|
| Type Coverage | PASS (tsc --noEmit clean) |
| ESLint Errors | 0 |
| ESLint Warnings | 23 (pre-existing img) |
| Blocks using SectionHeader | 7 of ~11 eligible |
| Container width consistent | 10 of 12 blocks (logo-cloud-04, hero-section-23/header remain) |

---

## Unresolved Questions

1. Is `hero-section-23/header.tsx` still used anywhere, or is it dead code superseded by `SiteHeader`?
2. Should `SectionHeader` gain a `split` variant (heading left, description right) to support `testimonials-component-22`'s layout?
3. Should `inView` default to `true` in `SectionHeader` since most callers want scroll-triggered animations?
