# Foreplay Tool Design Language

> Reference spec for building functional utility tools at `/foreplay/tools/{slug}`. Distinct from marketing landing pages (hero/FAQ/CTA). Source-truth: `docs/foreplay/design-guideline.md` for global foreplay tokens.

## What this covers

Functional utility tools — single-purpose, input → output, no marketing copy. Examples: 2FA generator, batch watermark, IP checker, account filter. NOT for landing pages — those use `ForeplaySolutionHero` + `ForeplaySectionWhiteBlock` + FAQ + CTA.

**One-line rule:** Tool pages = dark page bg + sidebar (left) + tool body (right). Tool body = dark **header** (icon + title) on dark bg, then a **single white block** (signature foreplay) wrapping all interactive UI.

## Layout pattern

```
┌─────────────────────────────────────────────────────┐
│ ForeplayHeader (sticky, blur, dark)                 │ ← provided by /foreplay/layout.tsx
├──────────────┬──────────────────────────────────────┤
│              │                                      │
│              │  [Icon] Title (display-h4 gradient)  │ ← dark scope
│              │                                      │
│  Sidebar     │  ╔══════════════════════════════╗    │
│  Tools nav   │  ║  WHITE BLOCK                 ║    │ ← light scope
│  (dark)      │  ║   ┌──────────────────────┐   ║    │
│              │  ║   │ Input card (white)   │   ║    │
│              │  ║   │              [CTA]   │   ║    │
│              │  ║   └──────────────────────┘   ║    │
│              │  ║   ┌──────────────────────┐   ║    │
│              │  ║   │ Result card (solid-25)│   ║    │
│              │  ║   └──────────────────────┘   ║    │
│              │  ╚══════════════════════════════╝    │
│              │                                      │
├──────────────┴──────────────────────────────────────┤
│ ForeplayFooter                                      │ ← provided by layout.tsx
└─────────────────────────────────────────────────────┘
```

## Composition primitives

All atoms live in `app/src/components/foreplay/`. Import paths shown.

| Atom | Purpose | Import |
|------|---------|--------|
| `ForeplayToolShell` | Page wrapper — section + container + sidebar + content slot | `foreplay-tool-shell.tsx` |
| `ForeplayToolHeader` | Icon (size-12 bordered) + title (display-h4 + gradient). Lives in dark scope above white block | `foreplay-tool-header.tsx` |
| `ForeplayToolBody` | `ForeplaySectionWhiteBlock` + standard padding `p-8` / `max-md:p-5` + flex-col gap-6 | `foreplay-tool-body.tsx` |
| `ForeplayLightPrimaryButton` | `.button-light.button-primary` — dark pill on white card. Primary CTA | `foreplay-light-primary-button.tsx` |
| `ForeplayLightGhostAction` | Ghost icon+text — secondary actions on white card | `foreplay-light-ghost-action.tsx` |
| `ForeplayCodeChip` | `.pricing-prodcut-link` pill — mono code/secret/ID display | `foreplay-code-chip.tsx` |
| `ForeplaySectionWhiteBlock` | The 36px-rounded white card (used inside `ForeplayToolBody`) | `foreplay-section-white-block.tsx` |
| `ForeplayToolsSidebar` / `ForeplayToolsSidebarMobile` | Tools navigation (auto-included by `ForeplayToolShell`) | `foreplay-tools-sidebar.tsx` |

## Color tokens (white-block scope)

Always use semantic tokens — zero hex except for `#ffffff29` ring on header icon.

| Use | Token | Hex |
|-----|-------|-----|
| White-block bg | `bg-white` | `#ffffff` |
| Subtle panel fill (result cards, hover bg) | `bg-[var(--fp-solid-25)]` | `#f9f9fa` |
| Border / 1px ring on white | `border-[var(--fp-solid-50)]` | `#e9eaef` |
| Body text on white | `text-[var(--fp-solid-500)]` | `#343642` |
| Muted text / placeholder | `text-[var(--fp-solid-400)]` | `#4c505f` |
| Title text / icons / strong | `text-[var(--fp-solid-700)]` | `#171920` |
| Display headings / code numbers | `text-[var(--fp-solid-900)]` | `#13151a` |
| Focus border | `border-[var(--fp-solid-400)]` |  |
| Primary button bg (dark on white) | `bg-background` | `#020308` |
| Primary button hover | `bg-[var(--fp-solid-600)]` | `#24262e` |
| Primary button active | `bg-[var(--fp-solid-400)]` |  |

Dark-scope tokens (sidebar + header icon ring): see `docs/foreplay/design-guideline.md` → "Neutral" palette.

## Typography scale (tool-specific)

Use `fpText.*` constants from `foreplay-typography.ts`. Specific picks per element:

| Element | Class | Notes |
|---------|-------|-------|
| Tool title (`ForeplayToolHeader`) | `fpText.displayH4` + `FP_HERO_GRADIENT` | 1.75rem Inter Display + radial fade |
| Section label inside white block | `fpText.overline` | uppercase 0.75rem tracking-widest |
| Body / paragraph | `fpText.bodyM` | 1rem Inter |
| Helper / muted | `fpText.bodyS` | 0.875rem Inter |
| Button text (primary) | `fpText.headingM` | 1rem font-[550] — exact `.button-text-block` |
| Action label (ghost) | `fpText.labelS` | 0.875rem font-medium |
| Secret pill text | `fpText.labelS` + `font-mono` + `tracking-[0.02em]` | Mono override on labelS |
| Code / digit display | `font-display text-[2.25rem] font-semibold leading-none tracking-[0.04em] [font-variant-numeric:tabular-nums]` | display-h3 scale + tabular nums + positive micro-tracking for digit readability |
| Code mobile | `text-[1.75rem]` (= display-h4 scale) | `max-md:` |

## Spacing rhythm

| Where | Value | Tailwind |
|-------|-------|----------|
| Section vertical padding (page) | 40px desktop / 32px mobile | `py-10 max-md:py-8` |
| Sidebar gap to body | 32px desktop / 16px mobile | `gap-8 max-lg:gap-4` |
| Header → body | 24px desktop / 20px mobile | `gap-6 max-md:gap-5` |
| White-block inner padding | 32px desktop / 20px mobile | `p-8 max-md:p-5` |
| White-block inner sections | 24px | `gap-6` |
| Stack of result cards | 12px | `gap-3` |
| Input card outer | 8px (frame) | `p-2` |
| Input card text padding | 16px / 12px | `px-4 py-3` |
| Result card padding | 16-20px horizontal, 16px vertical | `px-5 py-4 max-md:px-4` |
| Ghost action button | 12px / 8px | `px-3 py-2` |
| Primary button outer | 8px | `p-2` |
| Primary button inner text padding | 6px | `px-1.5` |

## Radius scale

| Element | Radius |
|---------|--------|
| White block (outer signature card) | `rounded-[36px]` (mobile: `rounded-[16px]` — provided by `ForeplaySectionWhiteBlock`) |
| Input card / result card | `rounded-[16px]` |
| Header icon container | `rounded-[12px]` |
| Buttons (all variants) | `rounded-[10px]` |
| Code chip pill | `rounded-[6px]` |

## Transitions

| Where | Spec |
|-------|------|
| Card hover (border color change) | `transition-all duration-[500ms] ease-[cubic-bezier(0.19,1,0.22,1)]` |
| Input focus border | same as above |
| Button hover/active | `transition-all duration-150` |
| Ghost action hover | `transition-colors duration-150` |
| Chip hover / icon color | `transition-colors duration-200` |
| Countdown ring stroke | `transition-[stroke-dashoffset] duration-1000 ease-linear` |

## Composition template

A new tool page should look like this:

```tsx
// app/src/app/foreplay/tools/{slug}/page.tsx
import type { Metadata } from "next"
import {
  ForeplayToolShell,
  ForeplayToolHeader,
  ForeplayToolBody,
  ForeplayLightPrimaryButton,
} from "@/components/foreplay"
import { MyToolIcon } from "@/assets/svg/my-tool-icon"
import { MyToolBody } from "@/components/foreplay/foreplay-my-tool"

export const metadata: Metadata = {
  title: "My Tool | Foreplay Tools",
  description: "Short SEO description.",
}

export default function MyToolPage() {
  return (
    <ForeplayToolShell>
      <ForeplayToolHeader icon={<MyToolIcon />} title="My Tool" />
      <ForeplayToolBody>
        <MyToolBody />
      </ForeplayToolBody>
    </ForeplayToolShell>
  )
}
```

The tool body component (`MyToolBody`) handles state + interaction. Inside it, use light-theme tokens and reusable atoms.

### Skeleton for the tool body

```tsx
"use client"

import { fpText } from "@/components/foreplay/foreplay-typography"
import { ForeplayLightPrimaryButton, ForeplayLightGhostAction, ForeplayCodeChip } from "@/components/foreplay"

export function MyToolBody() {
  // state + handlers...

  return (
    <>
      {/* Input card */}
      <div className={cn(
        "flex flex-col rounded-[16px] border border-[var(--fp-solid-50)] bg-white p-2",
        "transition-colors duration-[500ms] ease-[cubic-bezier(0.19,1,0.22,1)]",
        "focus-within:border-[var(--fp-solid-400)]",
      )}>
        <textarea ... className={cn(fpText.bodyM, "...")} />
        <div className="flex justify-end p-1">
          <ForeplayLightPrimaryButton onClick={...}>Run</ForeplayLightPrimaryButton>
        </div>
      </div>

      {/* Results */}
      <div className="flex flex-col gap-3">
        {items.map(item => (
          <div className="group rounded-[16px] border border-[var(--fp-solid-50)] bg-[var(--fp-solid-25)] px-5 py-4">
            <ForeplayCodeChip text={item.label} />
            {/* big display value */}
          </div>
        ))}

        {/* Bulk actions */}
        <div className="flex items-center gap-1 pt-1">
          <ForeplayLightGhostAction onClick={...} icon={...} label="Copy all" />
          <ForeplayLightGhostAction onClick={...} icon={...} label="Export" />
        </div>
      </div>
    </>
  )
}
```

## Tool checklist

Before considering a tool "foreplay-grade":

- [ ] Page uses `ForeplayToolShell` (sidebar auto-included)
- [ ] Header uses `ForeplayToolHeader` (display-h4 + FP_HERO_GRADIENT)
- [ ] All interactive UI inside `ForeplayToolBody` (white block)
- [ ] Input card: `rounded-[16px] border-[var(--fp-solid-50)] bg-white`, focus border `var(--fp-solid-400)`
- [ ] Primary button: `ForeplayLightPrimaryButton` (NOT custom `<button>`)
- [ ] Secondary/bulk actions: `ForeplayLightGhostAction`
- [ ] Result cards: `rounded-[16px] bg-[var(--fp-solid-25)] border-[var(--fp-solid-50)]`, hover border `var(--fp-solid-400)`
- [ ] Code/ID labels: `ForeplayCodeChip` pill (NOT plain mono text)
- [ ] Large numeric display: `font-display 2.25rem 600 + tabular-nums + tracking-[0.04em]`
- [ ] Typography: only `fpText.*` constants — zero arbitrary text classes
- [ ] Colors: only `var(--fp-solid-*)` tokens — zero hex except `#ffffff29` (header icon ring)
- [ ] Transitions: foreplay cubic-bezier `(0.19,1,0.22,1)` 500ms for cards, 150ms for buttons
- [ ] Padding/gap rhythm matches spacing table
- [ ] Sidebar slug registered in `app/src/data/tools-registry.ts` (link auto-renders)
- [ ] Mobile: `max-md:` overrides applied to padding + display sizes
- [ ] TS compile clean

## What NOT to do

- ❌ Don't add hero gradient title inside white block (gradient is dark-scope only)
- ❌ Don't put `<ForeplayHeader>` or `<ForeplayFooter>` — provided by `/foreplay/layout.tsx`
- ❌ Don't use `<Table>` from shadcn — use card stack pattern (foreplay aesthetic)
- ❌ Don't use raw shadcn `<Button>` — use `ForeplayLightPrimaryButton` / `ForeplayLightGhostAction`
- ❌ Don't reuse marketing components (`ForeplaySolutionHero`, `ForeplayHomeCta`) on tool pages
- ❌ Don't add FAQ or testimonial sections to tool pages
- ❌ Don't use `text-mono` for display values — use `font-display` + tabular-nums

## Related

- Global foreplay specs: `docs/foreplay/design-guideline.md`
- Reference implementation: `app/src/components/foreplay/foreplay-two-fa-tool.tsx`
- Page example: `app/src/app/foreplay/tools/2fa/page.tsx`
