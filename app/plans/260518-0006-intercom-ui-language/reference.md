# Intercom Messenger — UI language reference (for cart restyle)

Distilled from the live Foreplay Intercom messenger (user screenshots + DOM
hierarchy). NOT Intercom code — visual characteristics re-expressed in our
foreplay token system so the cart can adopt the same *feel*.

## Why this doc
User wants the cart to speak Intercom's UI language: a friendly, rounded,
elevated panel with a colored header, big welcome title, tappable action rows,
a highlighted CTA card, and a bottom tab bar.

## Layout hierarchy (from DOM)
```
Panel (rounded, elevated, ~380–400px wide)
├─ Header (colored/gradient block, generous top padding)
│   ├─ brand logo (small)
│   ├─ avatar stack (overlapping circles, ~40px, white ring)
│   └─ Big title — "How can we help?"  (large, semibold)
├─ Body (light bg, vertical stack, gap)
│   ├─ Action row: title + sub + trailing icon  (full-width, hover)
│   ├─ Action row: "Book a Demo" + external icon
│   └─ Highlight card: heading + paragraph + solid CTA button
└─ Bottom tab bar (Home | Messages, icon over label, active tinted)
```

## Visual language → our tokens
| Element | Intercom feel | Map to our system |
|---|---|---|
| Panel radius | large, very rounded | `rounded-[20px]` (cart shell already 40px → keep or soften) |
| Panel elevation | soft wide shadow, faint ring | `shadow-2xl ring-1 ring-[var(--fp-alpha-700)]` |
| Panel width | ~384px | cart modal `w-[460px]` ok, or 400 |
| Header | colored gradient block, tall padding | dark scope: `bg-background` + maybe subtle gradient; `px-6 pt-6 pb-5` |
| Avatar stack | 40px circles, overlap −8px, 2px white ring | new small atom: `size-10 rounded-full ring-2 ring-white -ml-2` |
| Welcome title | ~22–24px, semibold | `fpText.displayH5` (Inter Display) |
| Action row | white, full-width, title + muted sub, trailing chevron/icon, hover tint | `rounded-[16px] px-4 py-3 hover:bg-[var(--fp-solid-25)]`; title `fpText.labelM text-[var(--fp-solid-700)]`, sub `fpText.bodyS text-[var(--fp-solid-400)]`, icon `text-[var(--fp-solid-400)]` |
| Row divider/separation | spacing, not hard lines | gap-2 between rows, no borders |
| Highlight card | tinted/elevated, heading+body+button | `rounded-[16px] bg-[var(--fp-solid-25)] p-4` + `ForeplayLightPrimaryButton` |
| Bottom tab bar | icon over label, active = brand tint | only if cart needs tabs — likely SKIP for cart (YAGNI) |
| Overall vibe | airy, generous padding, rounded, friendly, low-contrast text | foreplay white block already matches; push padding + roundness |

## What to BORROW for the cart (recommended, KISS)
- **Header treatment**: colored/dark header with title + (optional) support
  avatar stack → reuse for cart "Your cart" header to feel warmer.
- **Action-row pattern**: the payment options / line items as soft rounded
  rows with hover tint, trailing icon, no hard borders (less "tabular").
- **Highlight CTA card**: wrap the total + "Order via Telegram" in a tinted
  `solid-25` rounded card (like Intercom's messenger-card) for emphasis.
- **Roundness + air**: bump radii to 16–20px, increase padding/gaps.

## What to SKIP (don't blindly clone)
- Bottom Home/Messages tab bar — cart has no tabs (YAGNI).
- Intercom's exact gradient/colors — keep foreplay tokens for brand consistency.
- Hashed Intercom classes / iframe structure — irrelevant, not reusable.

## Constraint / tension to confirm
Cart is currently **foreplay design system** (white block, solid-* tokens).
Intercom language is friendlier/rounder. Blending = keep foreplay tokens but
adopt Intercom's *layout patterns* (rows, header, highlight card, roundness).
Full Intercom-look would break foreplay consistency on the rest of the site.

## Decisions (user, 2026-05-18)
- **Status: reference only — DO NOT touch the cart yet.** Doc kept as the UI
  language brief; user will decide when/if to apply.
- When applied: cart header **should include a support avatar stack**
  (overlapping circular avatars, ~40px, white ring) + large title — the warm
  Intercom-style header. Needs real support avatar image assets (TBD).
- Blend-vs-diverge not finalized (deferred). Lean blend (keep foreplay tokens)
  unless user says otherwise at apply time.

## Open (for when cart work resumes)
- Source the support avatar images for the header stack.
- Confirm blend (foreplay tokens) vs diverge before restyling.
