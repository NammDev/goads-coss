# Phase 07 — Wallet Tab + Polish + Changelog

**Priority:** Low-Med · **Status:** ✅ DONE (2026-07-07) · Cần Phase 1 + 4.

## ✅ Đã làm
- **Wallet**: đã tự đạt — page dùng semantic tokens (Card/muted) + dense table (Phase 4). Không cần sửa (không hex hardcode).
- **Polish**: audit `src/app/portal` + `portal-*` columns → **0 hex hardcode**, theme qua token. Xoá dead `data/mock-delivered-items.ts`.
- **Changelog**: thêm mục "Portal — Foreplay admin-style redesign (260707)" vào `docs/foreplay/changelog.md`.
- **Verify**: `tsc` clean + **`next build` PASS** (route tree đúng: portal 5 tab + community; tools/products-index/[id] đã biến mất).

## Overview
Restyle Wallet theo primitive mới; rà polish toàn portal (light/dark, responsive); ghi changelog design.

## Wallet
- `src/app/portal/wallet/page.tsx`: balance card (PortalCard) + bảng transaction (PortalDataTable).
- Cột: Date · Type (badge topup/deduct) · Amount (+/- màu) · Balance After · Order · Note (giữ `portal-wallet-columns.tsx`, restyle badge/typography).
- Balance nổi bật (heading), CTA phụ nếu cần.

## Polish
- Rà mọi tab: light & dark content OK, sidebar dark OK.
- Responsive: bảng scroll ngang, sidebar collapse 76px.
- Empty/loading states đồng bộ (PortalCard + text muted).
- Kiểm banned-list skill: zero hex trong JSX, dùng token; font Inter.
- Bỏ import mock còn sót; xoá code Shop-cũ nếu thừa.

## Changelog
- `docs/foreplay/changelog.md`: thêm mục **Portal (admin-style)** — token map, primitive mới (PortalCard/Button/Badge/DataTable), reuse map.

## Related files
- Modify: `src/app/portal/wallet/page.tsx`, `src/components/dashboard/columns/portal-wallet-columns.tsx`
- Modify: `docs/foreplay/changelog.md`
- Sweep: tất cả trang `src/app/portal/**`

## Todo
- [ ] Wallet restyle (PortalCard + PortalDataTable)
- [ ] Polish light/dark + responsive tất cả tab
- [ ] Empty/loading states
- [ ] Audit hex/token/font (banned-list)
- [ ] Update changelog Foreplay

## Success criteria
- Toàn portal nhất quán thẩm mỹ admin Foreplay, 2 theme mượt, không hex lạc, changelog cập nhật.
