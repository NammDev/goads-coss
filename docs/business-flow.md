# GoAds Business Flow

> Operational flow from customer acquisition to product delivery.

---

## Product Catalog

### Digital Products

All products stored in **single `delivered_item` table** with `product_type` enum + JSONB `credentials`.
Each type has its own Zod schema defining credential fields → UI renders dynamic columns per type.

| # | Product | Variants | Credential Fields (Zod schema) |
|---|---------|----------|-------------------------------|
| 1 | **BM (Business Manager)** | slot (BM1/BM5/BM10), verified/unverified, limit (NLM/250/50) | bmId, name, inviteLink, ogProfile |
| 2 | **Profile (FB)** | geo (US/Asia), greenline (2GL/3GL) | password, twoFa, email, passEmail, cookie |
| 3 | **Page** | follower count tiers | pageId, link, name, holdingId |
| 4 | **FB Ad Account** | TBD | adAccountId |
| 5 | **TikTok Shop** | TBD | TBD |
| 6 | **TikTok BC** | TBD | TBD |
| 7 | **TikTok Channel** | TBD | TBD |

> **Setup packages** (e.g. 2 BM + 5 Profile + 3 Page) = 1 order containing multiple `delivered_item` rows of different types.

### Services

| # | Service | Input from Customer | Output |
|---|---------|---------------------|--------|
| 8 | **Unban** | Account info (via Tele chat) | Status: pending / success / failed + notes |
| 9 | **Blue Tick Verification** | Account info (via Tele chat) | Status: pending / success / failed + notes |

**Key differences:**
- **Products** = deliver credentials (encrypted JSONB), khách xem trên portal với dynamic columns
- **Services** = kết quả thành công/thất bại, chi tiết trao đổi qua Tele, portal chỉ track status

### Pricing
- Giá trên web = niêm yết (retail price)
- Agency pricing: mỗi khách/agency có thể có bảng giá riêng (e.g. Uproas thấy giá khác retail)
- Admin set custom price tier per customer → khách login thấy giá của mình
- Per-order custom price vẫn hỗ trợ cho deal đặc biệt

### Inventory
- Có tồn kho sẵn, deliver từ stock
- Có thể deliver partial (ship trước phần có sẵn, bổ sung sau)

---

## Customer Journey

### 1. Acquisition
Multi-channel: Telegram groups, Google/SEO, word-of-mouth, referral

### 2. Sales (via Telegram)
```
Khách nhắn Tele → Admin tư vấn → Báo giá → Chốt đơn
                                   ↓
                         (Whale/bulk: deal giá riêng)
```
- Khách mới: admin tạo account trên portal
- Khách cũ: nhắn Tele mua thêm (repeat buyer)

### 3. Order Creation
- Admin tạo order thủ công trên dashboard (sau khi chốt qua Tele)
- 1 đơn có thể mix nhiều loại sản phẩm (3 BM + 2 Profile + 1 Page)
- Admin set custom price nếu có deal riêng

### 4. Payment (Manual)
```
Admin gửi thông tin thanh toán → Khách chuyển tiền → Admin check thủ công → Confirm
```
- Phương thức: Crypto, Wise, PayPal
- Xác nhận: Admin kiểm tra blockchain explorer/app → đổi status đơn hàng
- Không có payment gateway tự động (Phase 2)

### 5. Fulfillment
- Admin chuẩn bị sản phẩm từ stock
- Nhập credentials vào hệ thống (JSONB per item type)
- Có thể deliver partial — ship trước phần có sẵn, bổ sung sau

### 6. Delivery
```
Admin deliver trên dashboard → Gửi link cho khách qua Tele → Khách xem
```
- 2 cách xem: public link (ai có link đều xem được) hoặc login portal
- Public link: không cần đăng nhập, tiện cho khách nhận hàng nhanh
- Portal login: khách xem lịch sử tất cả orders + delivered items
- Credentials hiển thị dạng table columns (dynamic per product type)
- Copy button per field, giống Google Sheet hiện tại
- Thông tin nhạy cảm encrypted at rest

### 7. Post-Delivery
- Warranty: 7 ngày, khách báo qua Tele → admin thay mới
- Support: qua Telegram
- Khách cũ mua tiếp: nhắn Tele → quay lại step 2

---

## Order Status Flow

```
Pending → Paid → Processing → Delivered → Completed
   │                                         │
   └── Cancelled                             └── Warranty (7 days)
```

| Status | Trigger | Who |
|--------|---------|-----|
| Pending | Admin tạo đơn trên dashboard | Admin |
| Paid | Admin confirm nhận tiền | Admin |
| Processing | Admin đang chuẩn bị hàng | Admin |
| Delivered | Credentials đã nhập + gửi portal link | Admin |
| Completed | Hết warranty hoặc khách confirm | Admin/System |
| Cancelled | Hủy đơn | Admin |

**Services (Unban/Blue Tick):**
- Chỉ 2 status: Pending → Success/Failed
- Có field notes cho admin ghi trạng thái chi tiết

---

## Roles & Access

| Role | Who | Can Do |
|------|-----|--------|
| Super Admin | nammdev, justin | Everything: finance, settings, all CRUD |
| Staff | (chưa có, tương lai ~3) | Orders, customers, deliver. No finance/settings |
| Customer | buyers | View own orders, delivered products, profile |

### Account Creation
- Admin tạo account cho khách (khách không tự đăng ký)
- Gửi link portal + credentials cho khách qua Tele

---

## Data Architecture

### Single Table Design

All product types share one `delivered_item` table. Credential fields stored as JSONB, validated by Zod schemas per `product_type` at application layer.

### Database Tables (PostgreSQL)

| Entity | Key Fields |
|--------|------------|
| Users | email, password_hash, role, name, telegram_id |
| Products | name, type (enum), price, currency, inventory_count, is_active |
| Orders | customer_id, status (enum), payment_method, total_amount, custom_price, notes |
| Order Items | order_id, product_id, quantity, unit_price |
| Delivered Items | order_item_id, product_type (enum), uid, credentials (JSONB, encrypted), status, warranty_until, delivered_at |

### Credential Schemas (Zod — application layer)

```
profile:  { password, twoFa?, email?, passEmail?, cookie? }
bm:       { bmId, name?, inviteLink?, ogProfile? }
page:     { pageId, link?, name?, holdingId? }
...etc per product_type
```

- Thêm product type mới = thêm enum value + Zod schema, zero DB migration
- UI renders columns dynamically from Zod schema keys
- `uid` tách riêng vì common across all types + cần index/search

### Security
- Credentials (JSONB) → encrypted at rest
- Customer sees only own data after authentication

---

## Integrations

| Integration | Purpose | Phase |
|-------------|---------|-------|
| Telegram Bot | Notify admin new orders, notify customer on deliver | Phase 3 |
| BM Invite Extension | Chrome extension for BM invite management | Phase 3 |
| Google Sheets | Internal admin reporting (DB → Sheet sync) | Phase 3 |
| SePay / Stripe | Automated payment verification | Phase 4 |

---

## Unresolved Questions

1. TikTok Shop/BC/Channel: credential fields cụ thể?
2. FB Ad Account: có variant không? Credentials gì ngoài Account ID?
3. Warranty cho Services (Unban/Blue Tick) có không?
4. Khách nhận account portal bằng gì? (email + temp password? magic link?)
