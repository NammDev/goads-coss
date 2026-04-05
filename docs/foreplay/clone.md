# Foreplay Clone Workflow — 2 Prompts

## Prompt 1: Audit (chạy trước, review output, rồi mới clone)

```
/ck-plan --fast

Audit trang https://www.foreplay.co/reviews trước khi clone.

1. Download HTML: curl -sL https://www.foreplay.co/reviews > docs/foreplay/html/{route-name}.html
2. Phân tích HTML → list TẤT CẢ sections (class names + mô tả visual)
3. Với MỖI section, đánh giá:
   - shadcn/ui component nào match? (Table, Tabs, Accordion, Card, Dialog, Tooltip, Collapsible, etc.)
   - Reuse foreplay component nào đã có? (SectionHead, CtaButton, SectionContainer, FaqAccordion, HomeCta, etc.)
   - Phải clone custom từ HTML?
4. Output: bảng mapping — Section | shadcn | Reuse | Custom
5. Lên plan clone với strategy "shadcn-first, reuse-second, clone-last"
```

---

## Prompt 2: Clone (sau khi review audit)

```
/clone-foreplay

Clone trang https://www.foreplay.co/reviews theo plan đã audit.

## Source Files
- HTML: docs/foreplay/html/{route-name}.html
- CSS: docs/foreplay/foreplay-source.css
- Extract: docs/foreplay/extract-css.sh
- Audit plan: plans/{plan-dir}/plan.md

## Quy trình
1. Đọc design-guideline.md (đặc biệt "CSS Token Standards" + "Reuse Checklist")
2. Theo audit plan: shadcn components trước → reuse atoms → clone custom cuối
3. Clone skeleton trước (khung ngoài 4-5 div), detail sau
4. Extract CSS cho TỪNG class, không guess
5. Dùng CSS vars `var(--fp-*)`, KHÔNG dùng `[]` arbitrary values
6. Data tách ra file `data/foreplay-{route}-page-data.ts`
7. Build → verify compile

## Rules bắt buộc
- Đọc docs/foreplay/design-guideline.md TRƯỚC KHI code
- DOM nested phải 100% match source HTML
- shadcn components: dùng nguyên, chỉ override style qua className
- Reuse foreplay components có sẵn (SectionHead, CtaButton, SectionContainer, etc.)
- Desktop-only, note responsive values trong comments
- Mỗi component < 150 lines, tách data ra file riêng
- Radix Portal → dùng raw hex + font-sans antialiased
- Commit khi xong mỗi section lớn

## Skeleton-first approach
Lần 1: Clone khung ngoài 4-5 div sâu, {/* TODO */} cho inner content
Lần 2: Tôi sẽ paste HTML từng section cho bạn fill detail
```

---

## shadcn/ui Components thường match với Foreplay

| Foreplay Pattern            | shadcn/ui Component     | Notes                              |
| --------------------------- | ----------------------- | ---------------------------------- |
| Tab toggle (Monthly/Annual) | `Tabs`                  | Custom trigger styling             |
| FAQ accordion               | `Accordion`             | Smooth height animation            |
| Comparison table            | `Table` + `Collapsible` | Sticky header + accordion rows     |
| Tooltip (info icon)         | `Tooltip`               | Radix-based, needs Portal font fix |
| Pricing cards               | `Card`                  | Structure reuse, custom content    |
| Modal/popup                 | `Dialog`                | Exit-intent popup                  |
| Dropdown nav                | `NavigationMenu`        | Header mega menu                   |
| Toggle group                | `ToggleGroup`           | Filter tabs                        |
| Carousel                    | `Carousel`              | Use case horizontal scroll         |

## Reuse Checklist (check TRƯỚC khi tạo mới)

1. `ForeplaySectionHead` — section headers (subtitle + title + desc)
2. `ForeplayCtaButton` — CTA buttons (5 variants: nav, hero, secondary, ghost, light-primary)
3. `ForeplaySectionContainer` — containers (4 variants: section, wide, footer, navbar)
4. `ForeplaySectionWhiteBlock` — white rounded sections
5. `ForeplayProductPageFaqAccordion` — FAQ sections (pass different items)
6. `ForeplayHomeCta` — final CTA sections
7. `fpText.*` — typography constants (13 styles)
8. `ForeplayDotBg` — dot grid background
9. `ForeplayCarouselArrows` — prev/next navigation
10. `ForeplayProductHero` — product page hero with scroll animation
