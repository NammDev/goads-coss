# Foreplay Clone Workflow — 2 Prompts

## Prompt 1: Audit (chạy trước, review output, rồi mới clone)

```
/ck-plan --fast

Audit trang https://www.foreplay.co/{route} trước khi clone.

1. Download HTML: curl -sL https://www.foreplay.co/{route} > docs/foreplay/html/{route-name}.html
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

Clone trang https://www.foreplay.co/{route} theo plan đã audit.

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

## Clone Progress

| Route | Status | Page File | Plan |
|-------|--------|-----------|------|
| `/home` | ✅ Done + GoAds content | `app/src/app/foreplay/home/page.tsx` | — |
| `/reviews` | ✅ Done + native review cards | `app/src/app/foreplay/reviews/page.tsx` | — |
| `/book-demo` | ✅ Done + Cal.com embed | `app/src/app/foreplay/book-demo/page.tsx` | `plans/260407-1543-clone-book-demo/` |
| `/pricing` | ✅ Done (earlier) | `app/src/app/foreplay/pricing/page.tsx` | — |
| `/blog` | 🔜 Next | — | — |
| `/blog/[slug]` | 🔜 Next | — | — |

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
| Masonry review grid         | — (CSS columns)         | `SenjaReviewMasonryGrid` + Load More |

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
11. `ForeplayHomeHeroBottom` — logo grid (trust badges)
12. `SenjaReviewCard` — review card (avatar, stars, content, date, platform icon)
13. `SenjaReviewMasonryGrid` — masonry grid with Load More (initialCount, loadMoreCount)
14. `ForeplayDemoHero` — demo/booking hero with Cal.com embed
15. `ForeplayDemoSocialProof` — social proof badges (G2, Chrome, Capterra)
16. `ForeplayCalEmbed` — Cal.com inline embed component

## Notes for /blog clone

- Foreplay `/blog` has: BlogHero + category sidebar + post listing grid
- GoAds already has blog components: `BlogHero`, `BlogListing`, `BlogDetailHeader`, `BlogDetailContent`
- Data: `src/data/blog-posts.ts` (5 posts)
- Route: `app/src/app/blog/` already exists — check if Foreplay layout version is needed at `/foreplay/blog/`
- Key difference: Foreplay blog uses dark theme header + white content blocks
