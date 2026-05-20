# Route Transition UX — Options Note

Date: 2026-05-19 · Branch: nammdev-may19 · Status: consultation (not a plan)

## Problem
Click link → đổi route "nhảy bụp", không skeleton/feedback gì → trải nghiệm khựng.

## Cause (from codebase scan)
- Stack: Next.js 16 App Router + React 19.
- `(marketing)` group + product routes **không có `loading.tsx`** (chỉ `admin`, `portal`, `_legacy-*` có) → Next chờ Server Component render xong mới swap, không fallback.
- Không có progress bar / page-transition → kể cả nhanh vẫn thấy khựng.
- Trang marketing chủ yếu **static** (data từ file `.ts`) → render nhanh; thiếu chính là **feedback chuyển trang**, không phải tốc độ.

## 4 Solutions (ordered by impact/effort)

### 1. Top progress bar — ƯU TIÊN #1
- Thanh tiến trình mảnh ở đỉnh khi click link. Trị "ảo giác mượt" tốt nhất cho trang static.
- Next 16 có `useLinkStatus` (pending state của `<Link>`) → tự build component nhỏ, **không cần lib**.
- Effort: thấp (~1 file). Không đụng logic.

### 2. Page transition fade — `template.tsx`
- Thêm `src/app/(marketing)/template.tsx` bọc children + CSS fade/slide nhẹ (150–200ms).
- Mỗi lần đổi route content fade-in thay vì "bụp". Trị trực tiếp triệu chứng.
- Effort: thấp (~1 file, KISS).

### 3. `loading.tsx` skeleton cho `(marketing)` + route nặng
- Skeleton ăn theo Suspense — chỉ hữu ích cho route có data async (vd `/blog`, `/help`, trang fetch).
- Trang static gần như không kịp hiện skeleton → **chỉ làm cho route thực sự chậm** (YAGNI).
- Tái dùng pattern skeleton sẵn có ở `admin/portal/loading.tsx`.
- Effort: trung bình.

### 4. View Transitions API — polish, optional
- `experimental.viewTransition` (Next 16) + `<ViewTransition>` → cross-fade cấp app.
- Đẹp nhưng experimental → để sau cùng.
- Effort: trung bình, rủi ro (experimental).

## Recommendation
- Làm **#1 + #2** trước: rẻ, KISS, trị đúng triệu chứng, cảm nhận cải thiện ngay.
- **#3** chỉ thêm cho route async (blog/help).
- **#4** để dành nếu muốn polish thêm.

## Implemented — #1 + #2 (2026-05-19, branch nammdev-may19)

### #1 Top progress bar — DONE
- File mới: `src/components/foreplay/foreplay-nav-progress.tsx` (`"use client"`, **0 dependency**).
- Cơ chế: listener click capture-phase trên `<a>` nội bộ = tín hiệu "bắt đầu điều hướng" (App Router không expose router start event). Trickle tới 90%, `usePathname` đổi → 100% rồi fade.
- Loại trừ: external/origin khác, `target=_blank`, `download`, modifier-click (ctrl/cmd/shift/alt), middle-click, link cùng URL/hash → không kẹt bar; back/forward không bật bar thừa (guard `activeRef`).
- UI: `fixed top-0 inset-x-0 h-[3px] z-[200]`, core `bg-white` + halo `0 0 10px rgba(120,200,255,0.6), 0 0 4px rgba(255,255,255,0.8)` (Linear-style monochrome khớp `--primary: #fff` của site). `scaleX` theo value, fill 200ms → fade 250ms → unmount (~480ms tail).
- Z-index gotcha: `ForeplayHeader` cũng dùng `z-[100]` + nền tối `#020308eb` → header render sau, cùng z → đè bar mất tiêu. Bump bar `z-[200]` để luôn nổi trên header.
- Mount: `(marketing)/layout.tsx` — `<ForeplayNavProgress />` đặt trước `<ForeplayHeader />` (fixed nên vị trí không phụ thuộc thứ tự).

### #2 Page transition fade — DONE
- File mới: `src/app/(marketing)/template.tsx` (Server Component). Template re-mount mỗi lần điều hướng trong group.
- `animate-in fade-in duration-300 ease-out` (tailwindcss-animate) bọc `children`.
- **Opacity-only, KHÔNG transform** — tránh việc ancestor có transform thành containing-block làm lệch element `position: fixed` (cart popover / nav-progress vẫn ở layout, ngoài template → an toàn tuyệt đối; quyết định này phòng cả fixed element trong page).

### Verify
- `tsc --noEmit` clean.
- Không đụng logic/route nào; chỉ 2 file mới + 2 dòng import/mount ở layout.

### Còn lại
- #4 View Transitions: để dành.

## Implemented — #3 (2026-05-20)

5 product route đã có Suspense fallback skeleton (DRY: 1 component, 5 wrapper):

### Shared skeleton
- File: `src/components/foreplay/foreplay-product-page-skeleton.tsx`
- Mô phỏng shell chung: hero (heading/desc/CTA) → white block (pricing/catalog rows) → section + 6-card grid.
- Khối `animate-pulse bg-white/5`, không fetch, render ngay khi route đang resolve.

### Route wrappers (`loading.tsx`)
| Route | File |
|---|---|
| `/bm` | `(marketing)/bm/loading.tsx` |
| `/profiles` | `(marketing)/profiles/loading.tsx` |
| `/pages` | `(marketing)/pages/loading.tsx` |
| `/agency-ad-account` | `(marketing)/agency-ad-account/loading.tsx` |
| `/tiktok-accounts` | `(marketing)/tiktok-accounts/loading.tsx` |

Mỗi file: 3 dòng, chỉ default-export `<ForeplayProductPageSkeleton />`. `tsc` clean.

## Route nào nên làm #3 trong tương lai

Đã scan toàn bộ `(marketing)` group. Phân loại theo độ hữu ích:

### Nên làm — shell giống product page (tái dùng skeleton hiện tại)
| Route | Lý do |
|---|---|
| `/unban` | `ForeplayUniversityHero` + sections — shell tương tự, dùng lại được skeleton ngay |
| `/blue-verification` | giống `/unban` |

→ Chỉ cần tạo `loading.tsx` mỏng 3 dòng cho 2 route này, **không cần skeleton mới**.

### Nên làm — cần skeleton riêng (shell khác)
| Route | Shell | Skeleton cần |
|---|---|---|
| `/blog` | listing (BlogHero + grid bài viết) | Hero + list-of-cards skeleton |
| `/blog/[slug]` | article detail (async `await params`) | Article header + body lines skeleton (giống `loading.tsx` của một blog post) |
| `/reviews` | white block + grid testimonial | Heading + testimonial cards skeleton |
| `/pricing` | white block + pricing table phức tạp | Tier columns + feature rows skeleton |
| `/book-demo` | hero + form section | Hero + form fields skeleton |
| `/tools` | `ForeplaySolutionHero` + listing tools | Icon hero + grid tools skeleton |
| `/tempmail` | `ForeplaySolutionHero` + viewer (đã có logic client) | Hero + viewer skeleton (mailbox grid) |

### Có thể skip — static fast, skeleton chỉ chớp <50ms (YAGNI)
`/about`, `/contact`, `/payment`, `/partners`, `/community`, `/privacy-policy`, `/refund-policy`, `/terms-of-service`, `/share` — đều render từ data file `.ts`, không fetch async. Không cần `loading.tsx`. Progress bar (#1) + template fade (#2) đã đủ.

### Ưu tiên đề xuất khi rảnh
1. **`/unban` + `/blue-verification`** (cost gần như 0, tái dùng skeleton hiện tại) — làm luôn để đồng bộ trải nghiệm với 5 route đã có.
2. Còn lại — **đừng làm preemptive** (xem mục dưới).

## Honest take về #3 trên site này (2026-05-20)

Đã verify từng route ứng cử:

| Route | `await` fetch? | Verdict |
|---|---|---|
| `/pricing` | Không (import data từ `goads-pricing-setups-data.ts`) | Skip |
| `/book-demo` | Không (hero từ file) | Skip |
| `/tools` | Không | Skip |
| `/blog` | Không (BlogHero nhận props từ data) | Skip |
| `/blog/[slug]` | `await params` (chỉ unwrap), `getBlogPost(slug)` **đồng bộ** | Skip |

**Tất cả route marketing đều static-by-data-import.** Trên server, render gần 0ms → skeleton flash <10ms hoặc không kịp hiện kể cả Slow 3G (toàn bộ thời gian chờ là network download payload — giai đoạn route cũ còn đó, không phải vùng skeleton phục vụ).

→ **Bar #1 + fade #2 = đủ 100%** cho site hiện tại. 5 skeleton đã làm coi như "future-proof" nếu sau này có fetch async; còn lại đừng đụng đến (YAGNI).

### Khi nào MỚI bật tiếp #3
Đợi 1 trong các tín hiệu thực tế:
- Migrate blog/help sang CMS thật (Sanity, Contentful, Notion) → có `await fetch(...)` thật.
- Thêm dashboard/portal với query DB (Prisma…).
- Tích hợp API live (vd `/reviews` lấy từ Trustpilot).
- Đo perf thấy route render server >300ms ổn định.

Không có thì thôi — đừng làm cho có.

## Open questions
- Có route marketing nào fetch data async nặng cần skeleton riêng không? (xác định trước khi làm #3)
- Tông progress bar màu `#1c9cf0` ok chưa, hay muốn trắng/gradient khác?
