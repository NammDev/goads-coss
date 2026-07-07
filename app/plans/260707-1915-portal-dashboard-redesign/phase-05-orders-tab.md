# Phase 05 — Orders Tab

**Priority:** Medium · **Status:** ✅ DONE (2026-07-07) · Cần Phase 3 + 4.

## ✅ Đã làm
- `portal-order-columns.tsx`: viết lại **5 cột** đúng spec — Order Time · Order (list `Nx <name>`) · Revenue · Status · Delivered Time. Xoá cột Order ID / Actions / expand-row (`PortalOrderExpandedRow`, `SerializedOrderItem`). `SerializedOrder` thêm `items[]`.
- `admin-data-table.tsx`: thêm prop **`onRowClick`** (reusable) → row click điều hướng, không cần cột ID thừa.
- `portal-orders-table.tsx`: bỏ prop orderItems + expand; `onRowClick` → `/portal/orders/[id]`.
- `orders/page.tsx`: dùng **`getOrdersWithItemsByCustomerId`** (Phase 3) thay 2 query cũ.
- Verify: source `tsc` clean.

## Overview
Bảng Orders gọn theo spec, dùng PortalDataTable.

## Target columns
| Order Time | Order | Revenue | Status | Delivered Time |
|---|---|---|---|---|
| 07/07/2026 | 1x BM5 Verified & Original profile<br>2x Premium USA Reinstated Profile<br>1x 1K–3K Follower Facebook Page | $785.0 | Delivered | 07/07/2026 |

## Related files
- Modify: `src/components/dashboard/columns/portal-order-columns.tsx` (định nghĩa lại 5 cột)
- Modify: `src/app/portal/orders/page.tsx` (dùng PortalDataTable + data thật)

## Implementation steps
1. `portalOrderColumns`:
   - Order Time = `createdAt` (dd/MM/yyyy)
   - Order = `items.map(i => ${i.quantity}x ${i.productName})` mỗi item 1 dòng (flex-col, bodyS)
   - Revenue = `formatUSD(totalAmount)`
   - Status = badge (statusColors)
   - Delivered Time = `deliveredAt` hoặc "—"
2. Bỏ expand row/Order-ID/actions thừa (items nằm luôn trong cột Order). Click row → `/portal/orders/[id]` (giữ chi tiết).
3. Wire data từ `getOrdersByCustomerId` (Phase 3).

## Todo
- [ ] portalOrderColumns 5 cột
- [ ] Cột Order render list Nx name
- [ ] Wire orders/page.tsx + PortalDataTable
- [ ] Compile check + light/dark

## Success criteria
- Bảng Orders đúng 5 cột, item liệt kê nhiều dòng, style Foreplay dense.
