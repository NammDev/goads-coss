# Color System
> oklch-based semantic token system — all colors via CSS variables, zero hardcoded values.

---

## Overview

GoAds uses Tailwind v4 with oklch color tokens defined in `globals.css`. All tokens are set on `:root` (light) and `:root.dark, .dark` (dark). The `@theme inline` block maps CSS variables to Tailwind color utilities (`bg-primary`, `text-foreground`, etc.). Dark mode is enabled via `next-themes` class strategy — the `.dark` class is added to `<html>`. The custom variant `@custom-variant dark (&:is(.dark *))` lets Tailwind's `dark:` prefix target descendant elements. The dark palette is entirely neutral (chroma = 0) — no color tinting in dark mode.

## Rules (MANDATORY)

- NEVER hardcode color values (`#fff`, `rgb(...)`, raw `oklch(...)` in component files)
- NEVER define component-scoped CSS variables for colors
- DO use semantic Tailwind classes (`bg-primary`, `text-muted-foreground`, `border-border`)
- DO use `color-mix(in oklch, var(--primary) 15%, transparent)` for opacity variants in CSS
- DO use Tailwind opacity modifier (`bg-primary/15`) in JSX
- DO reference `--background` / `--foreground` as the page-level surface and text tokens
- NEVER use `dark:bg-[#...]` — use `dark:bg-primary` or `dark:bg-card` semantic classes

## Reference Table — Core Tokens

| Token | Light | Dark | Tailwind Class |
|-------|-------|------|----------------|
| `--background` | `oklch(1.00 0 0)` white | `oklch(0.14 0 0)` near-black | `bg-background` |
| `--foreground` | `oklch(0.32 0 0)` dark gray | `oklch(0.99 0 0)` near-white | `text-foreground` |
| `--card` | `oklch(1.00 0 0)` white | `oklch(0.20 0 0)` dark card | `bg-card` |
| `--card-foreground` | `oklch(0.32 0 0)` | `oklch(0.99 0 0)` | `text-card-foreground` |
| `--popover` | `oklch(1.00 0 0)` | `oklch(0.20 0 0)` | `bg-popover` |
| `--popover-foreground` | `oklch(0.32 0 0)` | `oklch(0.99 0 0)` | `text-popover-foreground` |
| `--primary` | `oklch(0.19 0.11 270.80)` dark blue-purple | `oklch(0.92 0 0)` light gray | `bg-primary`, `text-primary` |
| `--primary-foreground` | `oklch(1.00 0 0)` white | `oklch(0.20 0 0)` dark | `text-primary-foreground` |
| `--secondary` | `oklch(0.97 0 0)` off-white | `oklch(0.27 0 0)` dark gray | `bg-secondary` |
| `--secondary-foreground` | `oklch(0.45 0.03 257.68)` | `oklch(0.99 0 0)` | `text-secondary-foreground` |
| `--muted` | `oklch(0.98 0 0)` near-white | `oklch(0.27 0 0)` | `bg-muted` |
| `--muted-foreground` | `oklch(0.55 0.02 264.41)` mid gray | `oklch(0.71 0 0)` | `text-muted-foreground` |
| `--accent` | `oklch(0.19 0.11 270.80 / 0.15)` tinted | `oklch(0.27 0 0)` | `bg-accent` |
| `--accent-foreground` | `oklch(0.38 0.14 265.59)` | `oklch(0.99 0 0)` | `text-accent-foreground` |
| `--destructive` | `oklch(0.64 0.21 25.39)` red | `oklch(0.70 0.19 22.23)` | `bg-destructive`, `text-destructive` |
| `--border` | `oklch(0.93 0.01 261.82)` | `oklch(1.00 0 0 / 10%)` | `border-border` |
| `--input` | `oklch(0.93 0.01 261.82)` | `oklch(1.00 0 0 / 15%)` | `border-input` |
| `--ring` | `oklch(0.62 0.19 259.76)` | `oklch(0.56 0 0)` | `ring-ring` |

## Reference Table — Chart Tokens

| Token | Light | Dark |
|-------|-------|------|
| `--chart-1` | `oklch(0.62 0.19 259.76)` | `oklch(0.49 0.24 264.40)` |
| `--chart-2` | `oklch(0.55 0.22 262.96)` | `oklch(0.70 0.16 160.43)` |
| `--chart-3` | `oklch(0.49 0.22 264.43)` | `oklch(0.77 0.17 65.36)` |
| `--chart-4` | `oklch(0.42 0.18 265.55)` | `oklch(0.62 0.26 305.32)` |
| `--chart-5` | `oklch(0.38 0.14 265.59)` | `oklch(0.64 0.25 16.51)` |

## Reference Table — Sidebar Tokens

| Token | Light | Dark |
|-------|-------|------|
| `--sidebar` | `oklch(0.98 0 0)` | `oklch(0.20 0 0)` |
| `--sidebar-foreground` | `oklch(0.14 0 0)` | `oklch(0.99 0 0)` |
| `--sidebar-primary` | `oklch(0.20 0 0)` | `oklch(0.49 0.24 264.40)` |
| `--sidebar-primary-foreground` | `oklch(0.98 0 0)` | `oklch(0.99 0 0)` |
| `--sidebar-accent` | `oklch(0.97 0 0)` | `oklch(0.27 0 0)` |
| `--sidebar-accent-foreground` | `oklch(0.20 0 0)` | `oklch(0.99 0 0)` |
| `--sidebar-border` | `oklch(0.92 0 0)` | `oklch(1.00 0 0 / 10%)` |
| `--sidebar-ring` | `oklch(0.71 0 0)` | `oklch(0.56 0 0)` |

## Reference Table — Shadow Tokens

| Token | Value |
|-------|-------|
| `--shadow-2xs` | `0 1px 3px 0px oklch(0 0 0 / 0.05)` |
| `--shadow-xs` | `0 1px 3px 0px oklch(0 0 0 / 0.05)` |
| `--shadow-sm` | `0 1px 3px + 0 1px 2px -1px oklch(0 0 0 / 0.10)` |
| `--shadow` | same as sm |
| `--shadow-md` | `0 1px 3px + 0 2px 4px -1px oklch(0 0 0 / 0.10)` |
| `--shadow-lg` | `0 1px 3px + 0 4px 6px -1px oklch(0 0 0 / 0.10)` |
| `--shadow-xl` | `0 1px 3px + 0 8px 10px -1px oklch(0 0 0 / 0.10)` |
| `--shadow-2xl` | `0 1px 3px 0px oklch(0 0 0 / 0.25)` |

Use via Tailwind: `shadow-sm`, `shadow-md`, `shadow-xl`, etc.

## Dark Mode Mechanics

```css
/* globals.css */
@custom-variant dark (&:is(.dark *));   /* enables dark: prefix in Tailwind v4 */

:root { /* light values */ }
:root.dark, .dark { /* dark values — overrides :root */ }
```

`next-themes` adds/removes `.dark` on `<html>`. The dual selector (`:root.dark, .dark`) ensures CSS variables are set on `:root` itself (required for inheritance), while the custom variant handles descendant scoping.

## Anti-Patterns

| Anti-Pattern | Fix |
|---|---|
| `style={{ color: '#1a1a1a' }}` | `className="text-foreground"` |
| `bg-[oklch(0.19 0.11 270.80)]` | `bg-primary` |
| `dark:bg-[#222]` | `dark:bg-card` or `dark:bg-secondary` |
| Defining `--my-color` inside a component | Use existing semantic token or request addition to globals.css |
| `opacity-15` on a colored bg | Use Tailwind modifier: `bg-primary/15` |

## See Also

- `app/src/app/globals.css` — token source of truth
- `docs/design-guidelines.md` — design philosophy and usage guidance
