# Phase 02 — Shell & Nav Redesign (Foreplay ADMIN style)

**Priority:** High · **Status:** ✅ DONE (2026-07-07) · Cần Phase 1.
**Reference:** screenshot admin (sidebar dark + content sáng).

## ✅ Đã làm
- `portal-nav.ts`: rút còn **5 tab** (Orders, Wallet, BM, Profile, Page + badge count). Bỏ Shop/Products/Community/Tools + logic tools/product-children/TOOLS.
- `/portal` → `redirect('/portal/orders')`; xoá shop-catalog (orphan).
- **Xoá route:** `portal/tools/**`, `portal/products/page.tsx` (index), `portal/products/[type]/[id]`.
- Fix refs: `orders/[id]` link → `/portal/products/bm`; `dialog-search` bỏ Tools/Shop, thêm BM/Profile/Page.
- Theme toggle: **đã có sẵn** `<ModeToggle/>` trong `site-header`.
- Sidebar/header màu Foreplay-dark **tự áp qua token `.portal`** (Phase 1) — không đụng AppSidebar (shared với admin).

## ⚠️ Deviations / notes
- **Community: GIỮ route**, chỉ gỡ khỏi nav. Lý do: admin (`admin-community-post-columns.tsx`) link tới `/portal/community/[slug]` — xoá sẽ vỡ admin (ngoài scope). Cần bàn thêm nếu muốn xoá hẳn.
- Lỗi `.next/types/validator.ts` (route đã xoá) là **cache generated cũ** → tự sạch khi `next dev/build`. Source `tsc` clean.
- Không đổi cấu trúc AppSidebar (floating/icon-row) để tránh phá admin — thẩm mỹ đã đạt qua token.

## Overview
Làm lại sidebar + header portal đúng layout admin Foreplay; nav **chỉ 5 tab**; **xoá hẳn route cũ** (Shop/Products-index/Community/Tools); theme toggle (content); `/portal`→Orders.

## Sidebar spec (exact, dark-fixed)
- Width 288px (expanded) / 76px (collapsed), padding 20px.
- bg `#23242c`/base `#060710`; divider `rgba(255,255,255,.08)`.
- Header: logo + collapse icon (32px tall).
- Hàng **workspace icon-buttons** 48×48 radius10px (như screenshot — dãy icon bo góc màu).
- Nav item: text 14px, inactive `#c1c7d0`, active `#fff` + bg active (blue/green rgba), hover bg `rgba(255,255,255,.12)` radius ~10px.
- Section label ("Briefs"-style) mờ, nhỏ, uppercase nhẹ.
- Avatar user dưới cùng.

## Nav structure (chỉ 5 tab, không nhóm khác)
```
Orders · Wallet · BM · Profile · Page   (BM/Profile/Page badge = count)
```

## Routes bị XOÁ hẳn
- `src/app/portal/page.tsx` (Shop catalog) → thay bằng `redirect('/portal/orders')`
- `src/app/portal/community/**` → xoá
- `src/app/portal/tools/**` → xoá
- `src/app/portal/products/page.tsx` (index redirect) → xoá (không cần, BM/Profile/Page vào thẳng)
- Giữ: `src/app/portal/products/[type]/` (thành BM/Profile/Page). `[type]/[id]` → xem open question.
- Dọn data/nav phụ thuộc: `buildToolsNavItems`, `buildProductChildren`, import `TOOLS`, community.

## Related files
- Modify: `src/data/portal-nav.ts` — rút gọn còn `buildPortalNavItems` (5 tab); xoá tools/community/products-children logic
- Modify: `src/app/portal/portal-shell.tsx` (áp `.portal` + `.portal-sidebar`, layout admin)
- Modify: `src/app/portal/layout.tsx` (bỏ fetch productCounts cho nav con nếu thừa)
- Modify: `src/components/dashboard/{app-sidebar,nav-main,site-header}.tsx` — restyle token admin
- Delete: portal/community, portal/tools, portal/products/page.tsx; portal/page.tsx → redirect
- Theme toggle: next-themes có sẵn → header (đổi content, sidebar giữ dark)

## Implementation steps
1. Shell layout: sidebar dark cố định + content `#f6f8fa`/dark themeable.
2. Sidebar restyle theo spec (icon-button row, nav item, section label, avatar).
3. `buildPortalNavItems` = 5 tab (Wallet + badge BM/Profile/Page). Xoá group tools/More.
4. Header: theme toggle + user menu, tối giản.
5. `/portal`→redirect Orders; xoá route cũ; grep dọn link/refs gãy tới tools/community/shop.

## Todo
- [ ] Shell dark-sidebar + themeable-content
- [ ] Sidebar restyle (icon-row, nav, label, avatar) token admin
- [ ] Nav chỉ 5 tab (thêm Wallet + badge)
- [ ] Theme toggle ở header (content-only)
- [ ] Xoá route cũ (community/tools/products-index/shop), /portal→Orders
- [ ] Dọn portal-nav.ts (bỏ tools/community/product-children)
- [ ] Fix refs gãy + compile + light/dark

## Success criteria
- Shell portal giống layout admin Foreplay: sidebar dark gọn + content sáng/tối toggle.
- Sidebar đúng 5 tab + More + Tools; `/portal` mở Orders.
