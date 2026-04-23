---
name: clone-foreplay
description: Clone UI from screenshot/HTML/CSS into clean foreplay atom component. Input = reference material. Output = pixel-perfect reusable atom + changelog entry.
license: internal
metadata:
  author: nammdev
  version: "6.0.0"
---

# Clone Foreplay Atom

Pixel-perfect cloning from Foreplay.co using local source files.

## Local Source Files (ALWAYS use these)

```
docs/foreplay/html/foreplay-homepage-latest.html  — full homepage HTML (338KB, latest)
docs/foreplay/foreplay-source.css                 — full stylesheet (483KB)
docs/foreplay/extract-css.sh                      — helper script
```

## Images & Videos — DON'T worry about assets

For elements containing images/videos (screenshots, mockups, posters):
- **DO** respect the HTML nesting, CSS layout, class names, aspect-ratio, object-fit
- **DON'T** download or embed actual Foreplay assets — user will replace with their own later
- Use placeholder src paths (e.g. `/video/placeholder.mp4`, `/images/placeholder.webp`)
- Focus on the **container structure**, not the content inside

## Workflow

```
1. User provides: element name OR HTML snippet OR screenshot
2. ⭐ FIND HTML NESTING FIRST — check DOM structure from foreplay-source.html
3. Extract exact CSS from local source → docs/foreplay/extract-css.sh
4. Resolve CSS cascade (which class on same element? which overrides?)
5. Map CSS values to Tailwind (EXACT values, no rounding)
6. Write atom component
7. Update changelog
```

## ⭐ Component = Foreplay DOM Class

Component boundaries MUST map 1:1 with Foreplay class names:
- **Page** (`page.tsx`) owns `<section>` + `<ForeplaySectionContainer>`
- **Organism** (e.g. `foreplay-home-hero.tsx`) = everything inside `.container.section-container`
- **Atom** (e.g. `foreplay-hero-content.tsx`) = individual reusable elements
- Never put `<section>` or `<ForeplaySectionContainer>` inside an organism
- Every named class in source HTML → either a component or an explicit commented div

## ⭐ STEP 2 IS CRITICAL — HTML Nesting First

**BEFORE touching any CSS**, find the actual DOM nesting from `foreplay-source.html`:

```bash
# Find element context — 500 chars around it
python3 -c "
html = open('docs/foreplay/html/foreplay-homepage-latest.html').read()
idx = html.find('CLASS_NAME')
print(html[max(0,idx-300):idx+200])
"
```

**Why this matters:**
- Multiple classes on SAME element (e.g. `class="container navbar-container"`) means CSS properties MERGE
- Combined selector `.container.navbar-container{}` has HIGHER specificity than `.container{}` alone
- Getting nesting wrong = wrong max-width, wrong padding, wrong everything
- This was the #1 source of pixel-perfect failures

## Step 1: Find HTML (if user gives element name)

```bash
# Search HTML source for element
grep -o 'class="[^"]*ELEMENT[^"]*"' docs/foreplay/html/foreplay-homepage-latest.html | head -10
```

## Step 2: Extract EXACT CSS

```bash
docs/foreplay/extract-css.sh "class1" "class2" "class3"
```

**CRITICAL**: Read every CSS property. No skipping, no rounding. No interpreting.
**NEVER** reason about whether a CSS property "should apply" — just copy the exact value. Trust the source CSS over your CSS knowledge. If the source says `grid-row-gap: 64px` on `display: flex`, use `gap-16`. Modern browsers may alias properties in ways you don't expect.

## Step 3: CSS → Tailwind Conversion Rules

**EXACT conversion — no approximation:**

| CSS | Tailwind |
|-----|----------|
| `padding: 8px` | `p-2` |
| `padding: 16px` | `p-4` |
| `padding: 6px 10px` | `py-1.5 px-2.5` |
| `padding: 6px 6px 6px 10px` | `py-1.5 pr-1.5 pl-2.5` |
| `gap: 4px` | `gap-1` |
| `gap: 8px` | `gap-2` |
| `gap: 12px` | `gap-3` |
| `gap: 36px` | `gap-9` |
| `border-radius: 10px` | `rounded-[10px]` |
| `font-size: .9375rem` (15px) | `text-[15px]` |
| `font-size: 1rem` (16px) | `text-base` |
| `font-weight: 400` | `font-normal` |
| `font-weight: 500` | `font-medium` |
| `font-weight: 550` | `font-[550]` |
| `font-weight: 600` | `font-semibold` |
| `line-height: 1.25rem` (20px) | `leading-5` |
| `line-height: 1.5rem` (24px) | `leading-6` |
| `letter-spacing: -.01125em` | `tracking-[-0.01em]` |
| `height: 72px` | `h-[72px]` |
| `max-width: 1340px` | `max-w-[1340px]` |
| `max-width: 1440px` | `max-w-[1440px]` |
| `opacity: .68` | `opacity-[0.68]` |
| `color: #ffffff85` | `text-foreground/50` (closest) |
| `transition: all .5s cubic-bezier(.19,1,.22,1)` | `transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]` |

**When CSS has multiple definitions** (responsive breakpoints), the LAST one wins on desktop.

### ⭐ Font Family — CRITICAL for Pixel-Perfect

Foreplay uses TWO font families. **Always check `font-family` in extracted CSS:**

| CSS font-family | Tailwind class | Elements |
|----------------|----------------|----------|
| `Inter, sans-serif` | `font-sans` | Body, navlinks, buttons, heading-s/m/l |
| `Inter Display, Arial, sans-serif` | `font-display [font-optical-sizing:auto]` | `.text-display-h1` through `.text-display-h6` |

**Inter Display** = Inter with optical size axis (`opsz`). Without `font-optical-sizing: auto`, headings render wider/looser than original — visually noticeable.

## Step 4: Token Mapping

| Foreplay CSS var | Semantic token |
|-----------------|----------------|
| `--_lens---neutral-0` / `#fff` | `foreground` / `primary` |
| `--_lens---neutral-50` | `muted-foreground` |
| `--_lens---neutral-700` | `secondary` / `card` |
| `--_lens---solid-0` / `#fff` | `primary` |
| `--_lens---solid-900` / `#13151a` | `primary-foreground` |
| `--_lens---background` / `#020308` | `background` |
| `--_lens---neutral-50` / `#ffffffd6` | `muted-foreground` / `var(--fp-alpha-50)` |
| `--_lens---neutral-100` / `#ffffffad` | `var(--fp-alpha-100)` |

## Step 5: Write Atom

File: `app/src/components/foreplay/{component-name}.tsx`

Rules:
1. Named export, TypeScript props, `cn()` from `@/lib/utils`
2. `className` prop for override
3. Zero hex in JSX — semantic tokens only
4. `font-sans` on text elements (Inter via .foreplay scope)
5. Comment: description + EXACT CSS spec + usage
6. < 100 lines per atom

## Step 6: Update Changelog

`docs/foreplay/changelog.md` — Atoms table + reuse map.

## Banned

```tsx
className="bg-[#000]"        // ❌ hardcoded hex
style={{ color: '#fff' }}     // ❌ inline color
className="font-['Inter']"   // ❌ hardcoded font
className="p-[8px]"          // ❌ use p-2 (Tailwind scale exists)
className="gap-[12px]"       // ❌ use gap-3
```
