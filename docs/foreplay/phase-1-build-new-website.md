# Phase 1: Build Website Mới

> Copy layout/style từ Foreplay.co, thay content + hình ảnh GoAds. Code sạch từ đầu với design tokens.

## Code Quality Rules

1. **Không hardcode hex** — dùng `bg-primary`, `text-foreground`, etc.
2. **Không hardcode font** — dùng `font-display` (Inter headings) / `font-sans` (Inter body)
3. **Override cùng shadcn tokens** — `.foreplay` scope trong `globals.css`
4. **Reuse shadcn primitives** — Button, Card, Badge từ `@/components/ui/`
5. **Dùng `container` utility** — không viết lại `max-w-[1416px]`
6. **Tailwind spacing scale** — `py-24` không `py-[96px]`
7. **Mỗi section 1 file** < 200 dòng

## Workflow

```
Screenshot section → /clone-foreplay → clean TSX component → lắp vào page
```

## Các bước

### ✅ 1.1 Foundation (DONE)
- Inter font loaded (`fonts/index.ts`)
- `.foreplay` CSS tokens (`globals.css`)
- `--font-display` registered (`@theme inline`)
- Layout updated (`(foreplay)/layout.tsx`)

### 1.2 Home Page Sections
Từng section screenshot → clone → lắp vào `(foreplay)/home/page.tsx`

### 1.3 Core Pages
About, Pricing, Product pages (shared template)

### 1.4 Content Pages
Blog, Help/FAQ, Community

### 1.5 Legal Pages
Payment, policies

## Tham chiếu
- [`design-reference.md`](./design-reference.md) — tokens, colors, fonts, layout
- [`changelog.md`](./changelog.md) — tất cả changes cho merge
