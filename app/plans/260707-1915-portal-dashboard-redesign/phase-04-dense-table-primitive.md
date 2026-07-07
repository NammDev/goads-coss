# Phase 04 — Dense DataTable Primitive (Foreplay-styled, reusable)

**Priority:** High · **Status:** ✅ DONE (2026-07-07) · Cần Phase 1.

## ✅ Approach chốt (reuse, không viết PortalDataTable mới)
`AdminDataTable` đã đầy đủ (TanStack: sort/search/filter/paginate/expand) + mọi bảng portal đang dùng. → Thêm prop **`dense`** (mặc định off, admin không đổi) thay vì trùng lặp ~250 dòng.

## ✅ Đã làm
- `admin-data-table.tsx`: thêm `dense?: boolean`. Khi bật: header `h-10` + `text-xs font-medium`; cell `h-10 py-1.5 text-sm`; row **hover `bg-muted/50`** (base-table admin). Container `rounded-lg` (=--radius 10px) + border sẵn có.
- Bật `dense` ở cả 3 bảng portal: `wallet-table`, `portal-products-table`, `portal-orders-table`.
- Verify: source `tsc` clean.
- Copy-cell: dùng `CopyableCell` sẵn có ở tầng column (Phase 6), không cần đụng table.

## Overview
Một component bảng **clean dense** dùng chung: gọn/dày, style Foreplay, themeable, sticky header, copy-cell. Đây là "xương sống" cảm giác Google-Sheet-nhưng-tinh-tế.

## Key insight
- **Admin Foreplay CÓ sẵn pattern `base-table`** (từ admin CSS) — dùng làm chuẩn:
  - Row: `border-bottom 1px #e5e7eb`, first no-top, last no-bottom, `cursor:pointer`, hover bg `#f3f4f6`.
  - Cell: padding `1rem`, font `14px`/line `20px`.
  - Footer: height 42px, sticky bottom, bg light-blue `#e0e7ff`.
  - **Không zebra** (admin gốc không có).
- "Clean dense" (user chọn): giữ pattern trên nhưng **siết padding cell** `1rem → py-2.5 px-3` cho dày gọn hơn.
- Logic TanStack lấy từ `AdminDataTable`.

## Related files
- Create: `src/components/portal/ui/portal-data-table.tsx` (wrap TanStack, style Foreplay)
- Reuse: `src/components/dashboard/admin-data-table.tsx` (tham chiếu logic: sort/search/filter/paginate)
- Reuse: `src/components/dashboard/copyable-cell.tsx` (copy cell)
- Ref: `src/components/pricing/comparison-table.tsx` (sticky header, border solid-50→`--border`, radius 16)

## Design spec (dense, theo base-table admin)
- Cell padding `py-2.5 px-3` (siết từ 1rem), font 14px/20px.
- Header: sticky, bg `--card`, text nhỏ w500 muted, border-bottom `--border`.
- Body: text 14px `--foreground`; phụ `--muted-foreground`.
- Row: border-bottom 1px `--border` (≈`#e5e7eb`); hover bg `#f3f4f6`/`--muted`; cursor-pointer; **không zebra**.
- Container: rounded-[10px] border `--border`, overflow auto (scroll ngang).
- Footer (nếu cần phân trang): sticky bottom, bg accent nhạt.
- Copy-on-click cho ô credential (UID, password, IDs).

## Features (giữ tối thiểu, KISS)
- Global search, sort, pagination (từ TanStack), filter select cho Status.
- Empty state gọn (icon + text muted).
- Responsive: scroll ngang thay vì vỡ layout.

## Todo
- [ ] PortalDataTable (TanStack + style Foreplay dense)
- [ ] Sticky header + hover + zebra optional
- [ ] Copyable credential cells
- [ ] Empty/loading state
- [ ] Kiểm tra light & dark, scroll ngang
- [ ] Compile check

## Success criteria
- Một bảng tái dùng cho mọi tab, nhìn gọn/dày/tinh tế, đẹp cả 2 theme.
