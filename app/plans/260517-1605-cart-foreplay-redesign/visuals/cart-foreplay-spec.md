# Cart Foreplay Visual Spec (P1 output)

Source-derived from `docs/foreplay/html/foreplay-source.css`. Exact CSS→Tailwind
(clone-foreplay Step 3). Tokens already in `app/src/app/globals.css`.

## Foreplay card system (extracted)
- `.home-winning-card`: `border-radius:24px` → `rounded-[24px]`;
  `box-shadow:0 0 0 1px var(--_lens---solid-50)` → 1px ring;
  `padding:24px` → `p-6`; `gap:24px` → `gap-6`; `overflow:hidden`.
  `.is-dark` → `background: var(--_lens---background)` = `bg-background`.
- `.lens-security-card`: `padding:24px 24px 16px` → `pt-6 px-6 pb-4`; flex-col;
  head `gap:8px`→`gap-2`, head text `--_lens---solid-0` (white on dark).
- `.foreplay-light-primary-button` (existing atom): primary pill =
  `bg-background text-foreground rounded-[10px] p-2`, hover `--fp-solid-600`.

## Surface model (user decision)
Cart = **dark panel**; **one white "island"** wrapping the content (items +
summary + CTA). Header stays dark.

### Dark panel (outer shell — Popover content / Sheet)
| Prop | Tailwind |
|------|----------|
| bg | `bg-background` |
| border | `border border-[var(--fp-alpha-700)]` (white 10%, foreplay dark-surface) |
| radius | `rounded-[24px]` (Sheet: left edge only, keep full-height) |
| shadow | `shadow-[0_0_0_1px_var(--fp-alpha-700)]` |
| padding | `p-2` (frame) — island carries inner padding |

### Header (on dark)
| Prop | Tailwind |
|------|----------|
| layout | `flex items-center justify-between px-4 py-3` |
| title | `fpText.headingM text-foreground` ("Cart", Inter Display) |
| count badge | `bg-[var(--fp-alpha-700)] text-foreground rounded-full px-2 h-6 text-xs` |

### White island (wraps CartBody: items + summary)
| Prop | Tailwind |
|------|----------|
| bg | `bg-[var(--fp-solid-0)]` |
| text | `text-[var(--fp-solid-900)]` |
| muted text | `text-[var(--fp-solid-400)]` |
| radius | `rounded-[20px]` |
| padding | `p-6` (foreplay 24px) |
| divider | `border-[var(--fp-solid-50)]` |
| row hover | `hover:bg-[var(--fp-solid-25)]` |

### Item row (inside island)
- thumb box: `size-12 rounded-[12px] bg-[var(--fp-solid-25)] border-[var(--fp-solid-50)]`
- name: `fpText.bodyM text-[var(--fp-solid-900)]`; unit: `text-[var(--fp-solid-400)] text-xs`
- price: `fpText.bodyM font-[550] text-[var(--fp-solid-900)]`
- stepper btns: `bg-[var(--fp-solid-25)] hover:bg-[var(--fp-solid-50)] text-[var(--fp-solid-500)] rounded-[8px]`
- remove: `text-[var(--fp-solid-400)] hover:text-[#dc2626] hover:bg-[#dc26261a] rounded-[8px]`

### Payment card (inside island, selectable)
| State | Tailwind |
|-------|----------|
| base | `rounded-[12px] border border-[var(--fp-solid-50)] p-4` |
| hover | `hover:border-[var(--fp-solid-200)] hover:bg-[var(--fp-solid-25)]` |
| selected | `border-[var(--fp-solid-900)] ring-1 ring-[var(--fp-solid-900)] bg-[var(--fp-solid-25)]` |
| radio dot | sel `bg-[var(--fp-solid-900)]` / idle `border-[var(--fp-solid-300)]` |

### Total row
- label `fpText.headingM text-[var(--fp-solid-900)]`
- amount `fpText.headingL text-[var(--fp-solid-900)]` (Inter Display, large)

### Order CTA
**Reuse `<ForeplayLightPrimaryButton>`** (DRY, no rebuild) — dark pill on white
island = strong contrast. Pass `icon={<Send/>}`, full width via `className="w-full justify-center"`.

### Trigger (floating cart icon, dark)
- `size-11 rounded-full bg-background border border-[var(--fp-alpha-700)]`
- icon `text-foreground size-5`; hover `bg-[var(--fp-solid-700)]`
- count badge `-top-1 -right-1 bg-[var(--fp-solid-0)] text-[var(--fp-solid-900)]`

## Empty state (island)
- icon `size-10 text-[var(--fp-solid-300)]`
- headline `fpText.headingM text-[var(--fp-solid-900)]`
- sub `fpText.bodyM text-[var(--fp-solid-400)]`

## Rules
- Zero hex in JSX EXCEPT documented destructive red (`#dc2626`) — or use
  `text-destructive` if it maps. Prefer `var(--fp-*)` / semantic tokens.
- `font-sans` default; titles/amounts via `fpText` (Inter Display).
- All `--fp-*` vars already defined in globals.css — none added.

## Open question
- Destructive (remove) color: use existing `text-destructive` token vs literal
  `#dc2626`? → P2 check globals.css for a destructive token; prefer token.
