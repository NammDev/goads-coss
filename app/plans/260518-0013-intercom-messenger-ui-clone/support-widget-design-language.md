# Support Widget — Design Language (consolidated)

Single source of truth for the Intercom-style messenger we rebuilt as
`support-widget`. Values from user-provided `intercom.html` / `intercom.css`
snippets + screenshots. Tags: **[SRC]** exact from provided css/html ·
**[DERIVED]** measured from screenshots (verify visually).
Implemented in `app/src/components/support-widget/*` (own components, literal
values — intentionally NOT foreplay tokens).

---

## 1. Panel shell (the floating card)  [SRC]
| Property | Value |
|---|---|
| position | fixed; right 20px; bottom 84px |
| width | `min(400px, calc(100dvw - 20px))` |
| height | `min(704px, calc(100% - 104px))`; min-height 80px; max-height 704px |
| border-radius | **24px** |
| overflow | hidden |
| box-shadow | `0 5px 40px 0 rgba(9,14,21,0.16)` |
| transform-origin | right bottom |
| z-index | 2147483002 (launcher 2147483001) |
| body bg | #FFFFFF |
| open/close transition | `width 200ms, height 200ms, max-height 200ms, transform 300ms cubic-bezier(0,1.2,1,1), opacity 83ms ease-out` |
| closed state | scale .95, opacity 0, pointer-events none |

## 2. Gradient header region  [SRC]
| Property | Value |
|---|---|
| gradient | `linear-gradient(117.67deg, #FFFFFF, #528BFF)` |
| region (`.intercom-dclegk`) | `min-height: fit-content` — **content-driven, NOT a forced 236px**. (236 was a measured size, not a min.) Do not hard-set min-height; height = content + paddings, else a large dead gap appears between title and first card. |
| scroll container (`.intercom-qohjs1`) | `padding: 0 20px` — base 20px inset shared by header + cards |
| content wrapper (`.intercom-1z5idy`) | **padding 32px 20px 60px** — its OWN 20px is ON TOP of the container's 20px → logo/title sit **40px** from panel edge (cards only 20px). Impl: header `px-10` (40), cards `px-5` (20) |
| net inset | logo/title = 40px · cards = 20px → **logo indented 20px deeper than cards** |
| wrapper base color | `rgb(20,22,26)` (#14161A) — title overrides to #FAFAFA |
| wrapper opacity | `0.992647` (≈1, near-imperceptible; applied for fidelity) |
| wrapper | position relative; pointer-events none; background-repeat no-repeat |
| stacking | gradient is the top block; the 60px bottom padding is where the cards overlap up into it (cards `-mt-34px`, see §6) |
| inner order | [logo + avatar-stack group] then [title block] |

## 2b. Close button (`.intercom-1f58hwk`)  [SRC]
| Property | Value |
|---|---|
| position | fixed → pinned top **32px**, right **20px** (impl: `absolute top-8 right-5` on the panel, NOT in the scrolling header) |
| z-index | 2147483003 (above panel 2147483002) |
| padding | **10px** (`p-2.5`) |
| border-radius | **10px** |
| layout | flex, items-center, justify-center |
| cursor | pointer |
| transition | `background-color 150ms` |
| hover | subtle white bg (`hover:bg-white/15`) |
| icon | 16px close-X, white (`color=iconWhite`), currentColor |

## 3. Logo  [DERIVED + asset note]
- Original: **white** foreplay wordmark, height ~24–28px, top-left.
- Provided asset is a **white-bg JPG** (no alpha):
  - Current impl: `mix-blend-mode: multiply` → drops white bg, shows the
    **dark** mark on the light corner of the gradient. `h-7 w-auto`.
  - For exact original (white logo): supply transparent **PNG/SVG**, then use
    `filter: brightness(0) invert(1)`.

## 4. Avatar stack  [SRC]
- Container (`.intercom-7itejd`): `display:flex; flex:0 0 auto; align-items:center;
  margin-right:6px; white-space:nowrap; width:fit-content; overflow:hidden;
  line-height:1` → `flex w-fit shrink-0 grow-0 basis-auto items-center mr-1.5
  overflow-hidden whitespace-nowrap leading-none`.
- Each avatar (`.intercom-9n6tdo`): **40×40**, `border-radius:50%`,
  `display:inline-block; vertical-align:middle; cursor:default;
  overflow:hidden` → `size-10 rounded-full inline-block align-middle
  cursor-default overflow-hidden`.
- **[DERIVED]** overlap -10px (`marginLeft:-10` from 2nd) + 2px white ring
  (`ring-2 ring-white`) — avatar-stack-item wrapper CSS not provided; taken
  from screenshots.
- Images: existing site assets `/foreplay/sample-foreplay-avatar.webp`,
  `/foreplay/test_tim_keen_avatar.webp` (swap as needed in config).
- 2 avatars; header right side (close-X is separate, pinned — §2b).

## 5. Title "How can we help?"  [SRC]
| Property | Value |
|---|---|
| font-size / line-height | **28px / 34px** |
| font-weight | **600** |
| color | `rgb(250,250,250)` (#FAFAFA) |
| text-shadow | `0 0 30px rgba(255,255,255,0.3)` (soft white glow) |
| wrap | `overflow-wrap: break-word` |
| spacing | `mt-12` (48px) below logo/avatar row |

## 6. Cards container  [SRC]
`.intercom-1j1p9aa` → `display:flex; flex-direction:column; gap:10px;
position:relative; z-index:1; margin-top:-34px;`
- **gap 10px** between cards.
- **margin-top -34px** → the first card overlaps UP into the bottom of the
  gradient header (key visual: card rises onto the blue).
- `relative z-[1]` so cards sit above the gradient.
- horizontal padding `px-5` (20px), bottom `pb-4`.

## 7. Action row card (×2: "Send us a message", "Book a Demo")  [DERIVED]
| Property | Value |
|---|---|
| bg | #FFFFFF |
| radius | ~16px (`rounded-2xl`) |
| elevation | 1px hairline `#E6E8EB` ring + soft `0 1px 2px rgba(0,0,0,.06)`; hover `0 2px 8px rgba(0,0,0,.08)` |
| padding | ~16px 18px (`px-[18px] py-4`) |
| layout | row, space-between, items-center |
| title | 15px / weight 600 / `#1A1A1A` |
| sub | 13px / `#6C6F74` |
| trailing icon | 16px, dark; row1 send-arrow, row2 external-link |
| row2 | `<a href="/book-demo" target="_blank">`, label "🖥️ Book a Demo" |

## 8. Highlight card ("Share your ideas")  [DERIVED + SRC text]
- Same white card (radius ~16px, padding ~16px, same elevation).
- heading 15px/600; paragraph 13px `#6C6F74`.
- CTA button: full width, `bg #0A0A0A`, white text 14px/600,
  **radius 10px**, **height 44px**, label "Send Feedback".
- Source hint: messenger-card height ~130px.

## 9. Bottom tab bar  [SRC inactive / DERIVED rest]
| Property | Value |
|---|---|
| item | `flex:1; flex-direction:column; align-items:center; padding:18px 3px; cursor:pointer; transition:150ms; text-align:center` |
| inactive color | `rgb(108,111,116)` = **#6C6F74** |
| active color | ~#0A0A0A (dark) |
| bar | white bg, `border-top 1px #ECEDEF` |
| icon | 24×24 above label |
| label | ~12px medium; "Home" / "Messages" |

## 10. Collapsed launcher  [DERIVED]
| Property | Value |
|---|---|
| shape | round, ~56px (`size-14`), `bg #0A0A0A` |
| position | fixed right 20px, bottom 20px (panel sits at bottom 84px above) |
| icon | white; closed = chat glyph; open = chevron-down |
| shadow | reuse panel shadow `0 5px 40px rgba(9,14,21,0.16)` |
| hover | scale 1.05 |

## 11. Color palette (literal — NOT foreplay tokens)
| Name | Value | Tag |
|---|---|---|
| gradient from | #FFFFFF | SRC |
| gradient to | #528BFF | SRC |
| gradient angle | 117.67deg | SRC |
| title text | #FAFAFA | SRC |
| title glow | rgba(255,255,255,0.3) blur 30 | SRC |
| muted / tab-inactive | #6C6F74 | SRC |
| strong text | #1A1A1A | DERIVED |
| body bg | #FFFFFF | DERIVED |
| card border | #E6E8EB | DERIVED |
| tab divider | #ECEDEF | DERIVED |
| button / tab-active / launcher | #0A0A0A | DERIVED |
| panel shadow | 0 5px 40px rgba(9,14,21,0.16) | SRC |

## 12. Geometry / radius scale
| Element | Radius |
|---|---|
| Panel shell | 24px |
| Action / highlight cards | ~16px |
| CTA button | 10px |
| Avatars / launcher | full (circle) |
| Close-X hover | full (circle) |

## 13. Spacing rhythm
| Where | Value |
|---|---|
| Panel side padding | 20px (`px-5`) |
| Header content inset | **40px** horizontal (20 container + 20 wrapper), top 32 / bottom 60; region ≥236px |
| Cards inset | **20px** horizontal (container only) → 20px shallower than logo |
| Title gap below logo | ~24px (`mt-6`) |
| Cards gap | **10px** |
| Cards overlap into header | **-34px** margin-top |
| Card inner padding | ~16px 18px |
| Tab item padding | 18px 3px |

## 14. Icon set (SVG paths from intercom.html — see support-widget-icons.tsx)
close-X (16), send-arrow (17×16, fill-rule evenodd), external-link (16),
Home (24, filled), Messages (24, outline+lines), chevron-down, chat glyph.
All `currentColor`, sizable.

## 15. Component → spec map
| Component | Covers |
|---|---|
| `support-widget.tokens.ts` | palette + geometry + transition (§1,11,12) |
| `support-widget-icons.tsx` | §14 |
| `support-widget-header.tsx` | §2,3,5 + close-X |
| `support-widget-avatar-stack.tsx` | §4 |
| `support-widget-action-row.tsx` | §7 |
| `support-widget-highlight-card.tsx` | §8 |
| `support-widget-tab-bar.tsx` | §9 |
| `support-widget-panel.tsx` | §1 shell + §6 cards container + body |
| `support-widget-launcher.tsx` | §10 |
| `support-widget.tsx` | open/close state, Esc |
| `support-widget.config.ts` | content (logo src, avatars, rows, labels) |

## 16. Open items
- Logo: provide transparent PNG/SVG for exact white original.
- Avatars: provide real support images (config `avatars[].src`).
- DERIVED values are screenshot-estimates → refine as more [SRC] snippets arrive.
- Messages tab = placeholder "No messages yet" (YAGNI, no chat backend).
