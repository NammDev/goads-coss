# Phase 01: Customize 404 Page Block

## Context Links
- Current block: `app/src/components/shadcn-studio/blocks/error-page-04/error-page-04.tsx`
- Wrapper page: `app/src/app/not-found.tsx`
- Button system: `docs/button-system.md`
- Design guidelines: `docs/design-guidelines.md`

## Overview
- **Priority**: P2
- **Status**: pending
- **Description**: Update the error-page-04 block to use GoAds button hierarchy and typography conventions

## Key Insights
- SVG illustration (`error-04-illustration.tsx`) already uses CSS variables -- no changes needed
- `not-found.tsx` wrapper already has correct layout (SiteHeader, Footer, grid frame lines) -- no changes needed
- Only the block component itself needs updating

## Requirements

### Functional
- "Back to Home" = primary CTA (Tier 1: `CraftButton` with `btn-mirror-sweep btn-secondary`)
- "Talk to Sales" = paired secondary action (Tier 4: `btn-tertiary-sweep btn-mirror-sweep`)
- Both buttons `size="lg"` for marketing context

### Non-Functional
- All colors via Tailwind semantic classes (no hardcoded values)
- Dark mode works automatically via CSS variables
- File stays under 200 lines

## Related Code Files

### Files to Modify
- `src/components/shadcn-studio/blocks/error-page-04/error-page-04.tsx`

### Files NOT Modified
- `src/app/not-found.tsx` (wrapper already correct)
- `src/assets/svg/error-04-illustration.tsx` (already uses CSS vars)

## Implementation Steps

### 1. Update imports in `error-page-04.tsx`
Add `CraftButton`, `CraftButtonLabel`, `CraftButtonIcon` imports:
```tsx
import { CraftButton, CraftButtonLabel, CraftButtonIcon } from "@/components/ui/craft-button"
import { ArrowUpRightIcon } from "lucide-react"
```

### 2. Update typography
Change heading from `<h4>` to proper heading tag with GoAds type scale:
```tsx
<h1 className="mb-1.5 text-2xl font-semibold sm:text-3xl">Oops! This Page Got Lost</h1>
```
- Use `text-2xl sm:text-3xl` for responsive sizing per design guidelines
- Keep `font-semibold` per GoAds convention

### 3. Replace "Back to Home" button (Tier 1 CTA)
Replace the first `Button` with `CraftButton`:
```tsx
<CraftButton size="lg" asChild>
  <Link href="/">
    <CraftButtonLabel>Back to Home</CraftButtonLabel>
    <CraftButtonIcon>
      <ArrowUpRightIcon className="size-3 stroke-2 transition-transform duration-500 group-hover:rotate-45" />
    </CraftButtonIcon>
  </Link>
</CraftButton>
```

### 4. Replace "Talk to Sales" button (Tier 4 Tertiary-Sweep)
Replace the second `Button` with tertiary-sweep styling:
```tsx
<Button size="lg" variant="outline" className="btn-tertiary-sweep btn-mirror-sweep" asChild>
  <Link href="/talk-to-sales">Talk to Sales</Link>
</Button>
```

### 5. Remove unnecessary classes
- Remove `rounded-lg text-base` from buttons (redundant -- `rounded-lg` is in CVA base, `text-base` is default)

### 6. Clean up container padding
Current block uses `px-8` which violates GoAds rules. The block is centered content so it should use:
```tsx
<div className="flex min-h-[calc(100svh-var(--header-height)-200px)] flex-col items-center justify-center gap-12 py-8 sm:py-16 lg:justify-between lg:py-24">
```
- Remove `px-8`, let the parent container handle horizontal padding (already handled by `not-found.tsx` container)

## Final Code

```tsx
import Link from "next/link"
import { ArrowUpRightIcon } from "lucide-react"
import Error04Illustration from "@/assets/svg/error-04-illustration"
import { Button } from "@/components/ui/button"
import { CraftButton, CraftButtonLabel, CraftButtonIcon } from "@/components/ui/craft-button"

const ErrorPage04 = () => {
  return (
    <div className="flex min-h-[calc(100svh-var(--header-height)-200px)] flex-col items-center justify-center gap-12 py-8 sm:py-16 lg:justify-between lg:py-24">
      <Error04Illustration className="h-[clamp(300px,50vh,600px)]" />

      <div className="text-center">
        <h1 className="mb-1.5 text-2xl font-semibold sm:text-3xl">Oops! This Page Got Lost</h1>
        <p className="text-muted-foreground mb-2 max-w-md">
          Looks like this page doesn&apos;t exist. But don&apos;t worry — your ad accounts are still safe with us.
        </p>
        <p className="text-muted-foreground mb-6 max-w-md text-sm">
          Need agency ad accounts with 7-day warranty &amp; 24/7 support? We&apos;ve got you covered.
        </p>
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <CraftButton size="lg" asChild>
            <Link href="/">
              <CraftButtonLabel>Back to Home</CraftButtonLabel>
              <CraftButtonIcon>
                <ArrowUpRightIcon className="size-3 stroke-2 transition-transform duration-500 group-hover:rotate-45" />
              </CraftButtonIcon>
            </Link>
          </CraftButton>
          <Button size="lg" variant="outline" className="btn-tertiary-sweep btn-mirror-sweep" asChild>
            <Link href="/talk-to-sales">Talk to Sales</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ErrorPage04
```

## Todo List
- [ ] Update imports (add CraftButton, ArrowUpRightIcon)
- [ ] Replace heading tag and add responsive text sizing
- [ ] Replace "Back to Home" with CraftButton (Tier 1)
- [ ] Replace "Talk to Sales" with Tier 4 tertiary-sweep
- [ ] Remove `px-8` and redundant button classes
- [ ] Verify dark mode renders correctly
- [ ] Compile check

## Success Criteria
- 404 page uses GoAds 4-tier button hierarchy correctly
- No hardcoded colors -- all via Tailwind semantic classes
- Dark mode works without extra logic
- Typography follows GoAds type scale
- File under 200 lines

## Risk Assessment
- **Low risk**: Single file change, purely visual
- SVG illustration already uses CSS vars so no breakage expected
