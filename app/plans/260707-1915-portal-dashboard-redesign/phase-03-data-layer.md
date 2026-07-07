# Phase 03 — Data Layer (real delivered/order data)

**Priority:** High · **Status:** ✅ DONE (2026-07-07) · Blocker cho Phase 5–6.

## ✅ Đã làm (additive — page cũ vẫn chạy)
- `delivered-item-queries.ts`: thêm type **`PortalDeliveredRow`** + `getDeliveredItemsByTypeDetailed(customerId, type)` — JOIN `products.name`, **decrypt credentials** (fallback plain), tách `note`/`checkLive` từ JSON.
- `order-queries.ts`: thêm type **`PortalOrderRow`** + `getOrdersWithItemsByCustomerId(customerId)` — order + `items[{quantity, productName}]` (gom từ `getOrderItemsByCustomerId`). Order đã có sẵn createdAt/deliveredAt/totalAmount/status/orderNumber.
- Re-export tự động qua `queries/index.ts` (`export *`).
- Verify: source `tsc` clean.
- Wiring vào page (bỏ mock) làm ở Phase 5 (Orders) + Phase 6 (BM/Profile/Page).

## Overview
Query trả đủ field để render bảng theo spec; thay mock bằng data thật. **Không đổi schema.**

## Key insight
- `portal-product-columns.tsx` hiện gõ theo `MockDeliveredItem` + `getProductNameForItem` (mock) → cần data thật.
- `delivered_items` không có cột `note`/`checkLive` → lấy từ `credentials` JSON (parse).
- Cần **product name** mỗi delivered item → JOIN `delivered_item.orderItemId → order_item → product.name`.

## Related files
- Modify: `src/lib/db/queries/delivered-item-queries.ts` (`getDeliveredItemsByType`, `getDeliveredItemsByCustomerId`)
- Modify: `src/lib/db/queries/order-queries.ts` (`getOrdersByCustomerId`, `getOrderItemsByCustomerId`)
- Ref: `src/lib/db/encryption.ts` (decrypt), `src/lib/validators/credential-schemas.ts`
- Create: shared type `PortalDeliveredRow` (query file hoặc `src/types`)

## Target shapes
```
PortalDeliveredRow = { id, deliveredAt, productName, uid, status, warrantyUntil,
  note, checkLive, credentials: {…decrypted} }
PortalOrderRow = { id, orderNumber, createdAt, deliveredAt, totalAmount, status,
  items: [{ quantity, productName }] }
```

## Implementation steps
1. `getDeliveredItemsByType`: JOIN productName; decrypt credentials→object; tách `note`,`checkLive`; trả uid/status/deliveredAt/warrantyUntil.
2. `getOrdersByCustomerId`: kèm items[] (qty+name) + deliveredAt + totalAmount + status + orderNumber.
3. Export `PortalDeliveredRow` để Phase 6 thay `MockDeliveredItem`.

## Todo
- [ ] getDeliveredItemsByType → productName + decrypted creds + note/checkLive
- [ ] PortalDeliveredRow type
- [ ] getOrdersByCustomerId kèm items[] + deliveredAt
- [ ] Bỏ mock-delivered-items khỏi luồng thật
- [ ] Compile check

## Success criteria
- Bảng hiển thị data thật, credential đúng field; orders có items + delivered time.

## Open questions
- `order_item` có `productName` snapshot hay phải JOIN `products`? (Kiểm tra khi làm.)
