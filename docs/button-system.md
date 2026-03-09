# Button System
> 4-tier hierarchy for all interactive CTAs — CraftButton for Tier 1, Button + CSS classes for Tiers 2–4.

---

## Overview

GoAds uses a strict 4-tier button hierarchy. Tier 1 (CTA) uses `CraftButton` — a compound component with an icon-circle expand animation and mirror-sweep effect. Tiers 2–4 all use the base `Button` component with custom CSS utility classes applied alongside CVA variants. Every button uses `rounded-lg` (baked into the CVA base). All marketing sections use `size="lg"` for visual weight. The `btn-mirror-sweep` class is the shared animation base — it provides the sweep `::before` pseudo-element and scale-on-hover; it must always be paired with either `btn-secondary` or `btn-tertiary-sweep` to provide the sweep color.

## Rules (MANDATORY)

- DO use `<CraftButton>` exclusively for the single primary CTA per section
- DO pair `btn-mirror-sweep` with either `btn-secondary` or `btn-tertiary-sweep` — never alone
- DO use `size="lg"` for all marketing-page buttons
- DO wrap link CTAs via `asChild` on `CraftButton` or `Button`
- DO place `CraftButtonLabel` and `CraftButtonIcon` as direct children of `CraftButton`
- NEVER place more than 1 `CraftButton` per section
- NEVER apply `btn-secondary` and `btn-tertiary` classes to the same element
- NEVER use `CraftButton` for low-emphasis actions (navigation links, secondary flows)
- NEVER override `rounded-lg` — it is the global button shape token
- NEVER add hover color overrides directly on the element; let the CSS class handle it

## Reference Table

| Tier | Name | Component | CSS Classes | When to Use |
|------|------|-----------|-------------|-------------|
| 1 | CTA | `CraftButton` | `btn-mirror-sweep btn-secondary` (built-in) | Primary action, 1/section max. Hero CTA, CTA section |
| 2 | Secondary | `Button` | `btn-mirror-sweep btn-secondary` | High-emphasis without icon. Pricing highlights, card actions |
| 3 | Tertiary | `Button` | `btn-tertiary` | Low-emphasis. Nav links, outline actions, secondary flows |
| 4 | Tertiary-Sweep | `Button` | `btn-tertiary-sweep btn-mirror-sweep` | Paired alongside a CTA (hero pairs, CTA section Discord button) |

### Button Sizes (CVA)

| Size | Height | Padding | Use |
|------|--------|---------|-----|
| `xs` | h-6 | px-2 | Dense UI, badges |
| `sm` | h-8 | px-3 | Compact cards |
| `default` | h-9 | px-4 | General UI |
| `lg` | h-10 | px-6 | **All marketing sections** |
| `icon` | size-9 | — | Icon-only |

### CraftButton Anatomy

```tsx
<CraftButton size="lg" asChild>
  <a href="...">
    <CraftButtonLabel>Get Started</CraftButtonLabel>
    <CraftButtonIcon>
      <ArrowUpRightIcon className="size-3 stroke-2 transition-transform duration-500 group-hover:rotate-45" />
    </CraftButtonIcon>
  </a>
</CraftButton>
```

- `CraftButtonLabel` — renders text with `text-primary-foreground z-2`
- `CraftButtonIcon` — renders a `rounded-full bg-primary-foreground text-primary` circle; size auto-scales by `size` prop (`size-4` sm / `size-5` default / `size-6` lg)
- Context provided via `CraftButtonContext` — `size` flows down automatically

## Code Examples

```tsx
// Tier 1 — CTA (hero or CTA section)
<CraftButton size="lg" asChild>
  <a href="https://t.me/GoAdsSupport" target="_blank" rel="noopener noreferrer">
    <CraftButtonLabel>Talk to Sales</CraftButtonLabel>
    <CraftButtonIcon><ArrowUpRightIcon /></CraftButtonIcon>
  </a>
</CraftButton>

// Tier 2 — Secondary (pricing card highlight)
<Button size="lg" className="btn-mirror-sweep btn-secondary">
  Get Started
</Button>

// Tier 3 — Tertiary (outline, low-emphasis)
<Button size="lg" variant="outline" className="btn-tertiary">
  Learn More
</Button>

// Tier 4 — Tertiary-Sweep (paired with Tier 1 in hero)
<Button size="lg" variant="outline" className="btn-tertiary-sweep btn-mirror-sweep">
  View Pricing
</Button>
```

## Anti-Patterns

| Anti-Pattern | Fix |
|---|---|
| `<CraftButton>` for a "Learn More" link | Use `btn-tertiary-sweep btn-mirror-sweep` on `Button` |
| Two `CraftButton` in one section | Demote second to Tier 4 |
| `btn-secondary` + `btn-tertiary` on same element | Pick one; they conflict |
| Hardcoded `rounded-full` or `rounded-sm` | Remove — `rounded-lg` is global |
| `btn-mirror-sweep` without sweep color class | Always pair with `btn-secondary` or `btn-tertiary-sweep` |
| Omitting `variant="outline"` on Tier 3/4 | CVA `default` variant adds `bg-primary` which fights the CSS class |

## See Also

- `docs/color-system.md` — `--primary`, `--primary-foreground` token values
- `app/src/components/ui/button.tsx` — CVA variants source
- `app/src/components/ui/craft-button.tsx` — CraftButton source
- `app/src/app/globals.css` — `.btn-mirror-sweep`, `.btn-secondary`, `.btn-tertiary`, `.btn-tertiary-sweep` definitions
