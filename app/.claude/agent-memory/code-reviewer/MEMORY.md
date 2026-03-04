# Code Reviewer Agent Memory

## Project: GoAds (Next.js 16 + shadcn-studio)

### Container Convention
- Utility class `container` = `mx-auto max-w-[1416px] px-4 lg:px-6` (defined in globals.css)
- Some blocks use inline `mx-auto max-w-[1416px] px-4 lg:px-6` directly -- both are valid
- Legacy `max-w-7xl` with `px-4 sm:px-6 lg:px-8` is the OLD pattern -- flag for update

### Shared Components
- `SectionHeader` at `src/components/section-header.tsx` -- 3 variants: underline (default), badge, uppercase
- `WavyUnderline` exported from same file -- standalone SVG underline decoration
- 7 blocks adopted SectionHeader; ~4 testimonials blocks + logo-cloud-04 still have inline patterns

### Theme Rules
- oklch monochrome palette -- NO hardcoded colors (no `text-green-600`, `bg-sky-600`, etc.)
- Use semantic tokens: `text-primary`, `bg-primary/10`, `text-muted-foreground`, etc.
- Exception: `destructive` variant is acceptable for specific semantic meaning (e.g., Instagram icon)

### Layout Rules
- SiteHeader in layout.tsx -- blocks must NOT include their own nav
- `hero-section-23/header.tsx` is likely dead code (superseded by SiteHeader)
- Section separators: `border-b border-border/60`

### Common Issues Found
- shadcn-studio blocks arrive with `max-w-7xl` and `px-4 sm:px-6 lg:px-8` -- always convert to `container`
- Blocks often have hardcoded brand colors -- replace with semantic tokens
- Placeholder text from shadcn-studio needs GoAds-specific copy

### Build/Lint
- `npx tsc --noEmit` for type checking (run from app/ directory)
- `npx eslint <files>` for linting
- `<img>` warnings are expected from shadcn-studio blocks (external CDN images)
