# Intercom Messenger — implementation spec (IC1 output)

Re-expressed design values for our OWN `support-widget` components. Tags:
**[SRC]** = exact from `intercom.css`/`intercom.html`; **[DERIVED]** = measured
/sampled from the 2 screenshots (approx — verify in phase 5 QA).

## A. Panel shell  [SRC]
| Property | Value |
|---|---|
| position | fixed; right 20px; bottom 84px |
| width | min(400px, calc(100dvw - 20px)) |
| height | min(704px, calc(100% - 104px)); min-height 80px; max-height 704px |
| border-radius | 24px |
| overflow | hidden |
| box-shadow | `0 5px 40px 0 rgba(9,14,21,0.16)` |
| transform-origin | right bottom |
| transition | width 200ms, height 200ms, max-height 200ms, transform 300ms cubic-bezier(0,1.2,1,1), opacity 83ms ease-out |
| z-index | very high (use `z-[2147483002]` or app max) |
| body bg | #FFFFFF [DERIVED] |

## B. Header (gradient)  [SRC] gradient + [DERIVED] layout
| Property | Value | Tag |
|---|---|---|
| gradient | `linear-gradient(117.67deg, #FFFFFF 0%, #528BFF 100%)` | SRC |
| gradient layer | h 236px, full width, sits behind content (z-index -1), top 0 | SRC |
| header content padding | ~24px 20px 20px (scroll body padding `0 20px` is SRC) | DERIVED/SRC |
| logo | Foreplay wordmark, white, ~h 22–24px, left | DERIVED (placeholder asset) |
| close X | top-right, white icon 16px, hit ~28px round | SRC icon / DERIVED box |
| avatar stack | 2 circles, size 40px, `shape circle`, overlap ~ -10px, 2px white ring | SRC size / DERIVED overlap+ring |
| title | "How can we help?" — white, ~28px, weight ~700, line-height ~34px, mt ~20px | DERIVED |

## C. Body scroll container  [SRC]
flex column; padding `0 20px`; min-height 100%; gap between cards ~12px [DERIVED].

## D. Action row card ×2  [DERIVED]
| Property | Value |
|---|---|
| bg | #FFFFFF |
| radius | ~16px |
| border/elevation | 1px hairline `#E6E8EB` or soft shadow `0 1px 2px rgba(0,0,0,.06)` |
| padding | ~16px 18px |
| layout | row, space-between, items-center |
| title | ~15px, weight 600, #1A1A1A |
| sub | ~13px, #6C6F74 (matches SRC tab inactive color) |
| trailing icon | 16px, dark; row1 = send arrow (SRC path), row2 = external-link (SRC path) |
| row2 | is an `<a href="/book-demo" target="_blank">`, label "🖥️ Book a Demo" |

## E. Highlight card ("Share your ideas")  [DERIVED] + SRC text
| Property | Value |
|---|---|
| container | same white card, radius ~16px, padding ~16px |
| heading | "💡 Share your ideas" ~15px weight 600 |
| paragraph | "Suggest features or report bugs here." ~13px #6C6F74 |
| button | full width, bg #0A0A0A (near-black), text white ~14px weight 600, radius ~10px, height ~44px, label "Send Feedback" |
| card body height hint | ~130px (SRC inline `height:130px` on messenger-card-wrapper) |

## F. Bottom tab bar  [SRC] inactive + [DERIVED]
| Property | Value | Tag |
|---|---|---|
| item | flex 1; column; align center; padding 18px 3px; cursor pointer; transition 150ms; text-align center | SRC |
| inactive color | rgb(108,111,116) = #6C6F74 | SRC |
| active color | ~#0A0A0A (dark) | DERIVED |
| bar | white bg, border-top 1px #ECEDEF, sits bottom | DERIVED |
| icon | 24×24 (SRC viewBox) above label | SRC |
| label | ~12–13px; "Home" / "Messages" | SRC text |

## G. Collapsed launcher  [DERIVED]
| Property | Value |
|---|---|
| shape | round, ~56–60px, bg near-black #0A0A0A |
| position | fixed right 20px, bottom 20px (panel sits at bottom 84px above it) |
| icon | white; closed = messenger/heart-chat glyph; open = chevron-down (screenshot 2) |
| shadow | `0 5px 40px rgba(9,14,21,0.16)` (reuse panel shadow) |

## H. Icon SVG paths  [SRC]  (from intercom.html, viewBox noted)
- **close-X** (16x16): `M13.25 3.95L12.05 2.75L8 6.8L3.95 2.75L2.75 3.95L6.8 8L2.75 12.05L3.95 13.25L8 9.2L12.05 13.25L13.25 12.05L9.2 8L13.25 3.95Z`
- **send arrow** (17x16): `m4.563 14.605 9.356-5.402c1-.577 1-2.02 0-2.598L4.563 1.203a1.5 1.5 0 0 0-2.25 1.3v10.803a1.5 1.5 0 0 0 2.25 1.3M6.51 8.387 2.313 9.512V6.297L6.51 7.42c.494.133.494.834 0 .966` (fill-rule evenodd)
- **external-link** (16x16): `M3 3.7h4V2H3a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-2h-1.7v2a.3.3 0 0 1-.3.3H3a.3.3 0 0 1-.3-.3V4a.3.3 0 0 1 .3-.3M9.218 3c0 .47.38.85.85.85h1.88L8.296 7.502a.85.85 0 0 0 1.202 1.202l3.652-3.652v1.88a.85.85 0 0 0 1.7 0V3a.85.85 0 0 0-.85-.85h-3.932a.85.85 0 0 0-.85.85` (evenodd)
- **Home** (24x24): mask+path `M10.5 2.335 3 7.51c-.625.437-1 1.116-1 1.84V19.7C2 20.965 3.125 22 4.5 22h15c1.375 0 2.5-1.035 2.5-2.3V9.35c0-.724-.375-1.403-1-1.84l-7.5-5.175a2.69 2.69 0 0 0-3 0M7.316 14.366a.85.85 0 1 0-1.132 1.268A8.7 8.7 0 0 0 12 17.852a8.7 8.7 0 0 0 5.816-2.218.85.85 0 1 0-1.132-1.268A7 7 0 0 1 12 16.152c-1.8 0-3.44-.675-4.684-1.786` (use as filled glyph; the long second path is the mask stroke — approximate with this outline + currentColor)
- **Messages** (24x24): outline `M19 2a3 3 0 0 1 3 3v15.806c0 1.335-1.613 2.005-2.559 1.062L15.56 18H5a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3z` + lines `M17 7a.85.85 0 0 1 0 1.7H7A.85.85 0 1 1 7 7zm-5 4a.85.85 0 0 1 0 1.7H7A.85.85 0 0 1 7 11z`

## I. Color palette
| Token (our const) | Value | Tag |
|---|---|---|
| `--sw-grad-from` | #FFFFFF | SRC |
| `--sw-grad-to` | #528BFF | SRC |
| `--sw-grad-angle` | 117.67deg | SRC |
| `--sw-text-muted` | #6C6F74 | SRC |
| `--sw-title` | #FFFFFF | DERIVED |
| `--sw-body-bg` | #FFFFFF | DERIVED |
| `--sw-card-border` | #E6E8EB | DERIVED |
| `--sw-btn-bg` | #0A0A0A | DERIVED |
| `--sw-tab-active` | #0A0A0A | DERIVED |
| `--sw-shadow` | 0 5px 40px rgba(9,14,21,0.16) | SRC |

## Notes for build
- Distinct surface — literal values above, NOT foreplay tokens.
- Placeholder assets for logo + 2 avatars (user swaps).
- DERIVED rows are best-effort from screenshots → phase 5 screenshot-diff
  corrects radius/padding/colors precisely.
- Original rendered in an iframe; we rebuild as plain in-page components.
