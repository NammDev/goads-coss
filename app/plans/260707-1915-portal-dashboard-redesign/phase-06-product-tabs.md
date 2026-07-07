# Phase 06 — BM / Profile / Page Tabs

**Priority:** Medium · **Status:** ✅ DONE (2026-07-07) · Cần Phase 3 + 4.

## ✅ Đã làm
- `credential-schemas.ts`: thêm `note` (bm/profile/page) + `checkLive` (profile) → **admin deliver-dialog TỰ hiện field** (render theo `getColumnsForType`), delivery-actions tự lưu vào credentials JSON. Không cần sửa deliver form.
- `portal-product-columns.tsx`: viết lại với **`SerializedDeliveredRow`** (row type thống nhất) + `SPECS` per-type đúng spec (Profile: Check Live·Note·UID·Password·2FA; BM: Noted·Business Name·ID BM; Page: Note·Page Name·Page ID·Link) + **Warranty + Copy giữ nguyên**. Check Live = badge Live/Die.
- `products/[type]/page.tsx`: nối **`getDeliveredItemsByTypeDetailed`** (productName thật + decrypt + note/checkLive). Bỏ mock/parseCredentials.
- `portal-products-table.tsx`: dùng SerializedDeliveredRow; guard warranty null.

## Admin preserved (shared column builder)
- Thêm param `variant` cho `buildPortalProductColumns`: `'portal'` = spec mới; `'admin'` = giữ nguyên (status badge + ALL creds).
- Migrate 3 admin callers (order-detail-delivered, products-table, products/[type]/page) sang `SerializedDeliveredRow` + `variant='admin'` → admin không đổi cột.
- Verify: source `tsc` clean (cả admin).

## Decisions
- Check Live = text thủ công (Live/Die). Warranty + Copy giữ trên bảng khách.

## Overview
Mỗi loại 1 bảng dense, cột đúng subset theo spec (không show hết credential).

## Target columns
**Profile:** Delivery Time · Name Product · Check Live · Note · UID · Password · 2FA
**BM:** Time Delivery · Name Product · Noted · Business Name · ID BM
**Page:** Delivery Time · Name Product · Note · Page Name · Page ID · Link

## Field mapping (credentials JSON + delivered_item)
| Cột | Nguồn |
|---|---|
| UID | `deliveredItem.uid` |
| Password / 2FA | `credentials.password` / `credentials.twoFa` |
| Business Name / ID BM | `credentials.name` / `credentials.bmId` |
| Page Name / Page ID / Link | `credentials.name` / `credentials.pageId` / `credentials.link` |
| Note / Noted | `credentials.note` |
| Check Live | `credentials.checkLive` (Live/Die) |

## Related files
- Modify: `src/components/dashboard/columns/portal-product-columns.tsx` (per-type column sets, dùng PortalDeliveredRow)
- Modify: `src/lib/validators/credential-schemas.ts` (+ optional `note` mọi type, `checkLive` profile)
- Modify: `src/app/portal/products/[type]/page.tsx` (PortalDataTable + data thật)
- Modify (admin nhập liệu): `src/app/admin/orders/[id]/deliver-dialog.tsx` + `src/lib/actions/delivery-actions.ts` (thêm ô Note + Check Live → lưu vào credentials)

## Implementation steps
1. `credential-schemas.ts`: `note` optional (bm/profile/page/other); `checkLive` optional (profile).
2. Định nghĩa `PORTAL_DISPLAY_COLUMNS[type]` (key+label+source, đúng thứ tự spec). Thay logic "render hết cred".
3. `buildPortalProductColumns`: build từ map trên; **giữ Warranty (badge) + Copy-credentials (action)** trên bảng khách; trim No; Check Live đọc `credentials.checkLive` (text Live/Die).
4. Admin deliver form: thêm input Note (mọi type) + Check Live (profile) → ghi credentials JSON (delivery-actions gom `cred_*` sẵn).
5. Wire `products/[type]/page.tsx` + PortalDataTable + PortalDeliveredRow.

## Todo
- [ ] note/checkLive vào credential-schemas
- [ ] PORTAL_DISPLAY_COLUMNS per type
- [ ] Rewrite buildPortalProductColumns (subset, PortalDeliveredRow)
- [ ] Check Live ← credentials.checkLive
- [ ] Admin deliver: thêm Note + Check Live
- [ ] Wire pages + compile check + light/dark

## Success criteria
- 3 tab đúng cột spec (+ Warranty badge + Copy action); admin nhập Note/Check Live → khách thấy đúng.

## Decisions
- Check Live = text thủ công (Live/Die). Warranty + Copy giữ trên bảng khách.
