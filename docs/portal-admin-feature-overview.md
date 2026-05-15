# GoAds — Tổng quan tính năng Portal & Admin

> Tài liệu liệt kê các tính năng chính của **Customer Portal** và **Admin Dashboard** — gửi Duy để hỗ trợ migrate codebase sang Cloudflare.

---

## 🏗 Stack hiện tại

| Tầng | Công nghệ |
|------|-----------|
| Framework | **Next.js 16** (App Router, Turbopack dev, RSC) |
| Auth | **Clerk** (`@clerk/nextjs` v7) — session, sign-in/up, webhooks |
| Database | **PostgreSQL** (host trên Supabase) |
| ORM | **drizzle-orm** + driver `postgres-js` |
| State / UI | TanStack Table, shadcn/ui, Tailwind v4 |
| CMS (blog) | Keystatic + MDoc |

### Env vars cần (4 cái chính + 1 optional)
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...
CLERK_WEBHOOK_SECRET=whsec_...
DATABASE_URL=postgresql://...           # Supabase pooler (port 6543, transaction mode)
ENCRYPTION_KEY=<64-char-hex>            # mã hoá field-level (credentials của delivered items)
```

### Phân quyền (3 roles)
Đọc từ `Clerk publicMetadata.role`, sync sang DB `user.role`. Mặc định: `customer`.

| Role | Quyền truy cập |
|------|----------------|
| `super_admin` | Toàn quyền admin + portal |
| `staff` | Admin (giới hạn) + portal |
| `customer` | Chỉ portal |

Guard server-side: `src/lib/auth/require-role.ts` → `requireRole('super_admin', 'staff')`.

---

## 👤 PORTAL — dành cho khách hàng (`/portal/*`)

Khách hàng đã mua sản phẩm dùng để: quản lý assets, xem đơn hàng, sử dụng tools, tham gia community.

### 1. Dashboard `/portal`
- Tổng quan stats: tổng chi tiêu, số sản phẩm theo từng loại, bảo hành còn hiệu lực
- Đơn hàng gần đây
- Quick links tới các action thường dùng

### 2. Products `/portal/products`
- **Danh sách theo loại**: BM / Facebook Profile / Facebook Pages / Agency Ad Account / TikTok Assets
- **Trang chi tiết** `/portal/products/[type]/[id]`:
  - Xem credentials (mã hoá khi lưu, decrypt khi cần dùng với `ENCRYPTION_KEY`)
  - Trạng thái bảo hành + hạn
  - Đánh dấu đã giao / đã thay
  - Yêu cầu thay thế (link sang flow warranty trong `/portal/orders`)

### 3. Orders `/portal/orders`
- Lịch sử đơn hàng (filter theo status / ngày)
- **Trang chi tiết** `/portal/orders/[id]`:
  - Line items + thông tin thanh toán
  - Danh sách sản phẩm đã giao (link sang chi tiết product)
  - Button warranty claim từng item
  - Share link công khai qua `shareToken`

### 4. Wallet `/portal/wallet`
- Số dư tài khoản
- Lịch sử giao dịch (nạp tiền, mua hàng, refund)
- Flow top-up (manual qua order hoặc admin nạp)

### 5. Tools `/portal/tools` (20+ tiện ích)
Bộ công cụ nội bộ cho khách scaling ads:
| Tool | Chức năng |
|------|-----------|
| `2fa` | Sinh mã TOTP |
| `batch-watermark` | Watermark hàng loạt ảnh |
| `bookmarklets` | Script browser nhanh |
| `check-content` | Kiểm tra policy nội dung quảng cáo |
| `check-duplicates` / `remove-duplicates` | Lọc trùng |
| `check-ip` | Tra cứu thông tin IP |
| `check-uid` | Kiểm tra Facebook UID còn sống |
| `cookie` | Convert format cookie |
| `extensions` | Tải extension Chrome |
| `fake-id` | Sinh thông tin cá nhân giả ngẫu nhiên |
| `fb-icons` | Thư viện icon Facebook |
| `filter` / `filter-text` | Lọc dữ liệu |
| `find-fb-id` | Tìm Facebook user ID từ URL |
| `merge` | Gộp file dữ liệu |
| `mini-tools` | Tiện ích linh tinh |
| `notepad` | Notepad nhanh (lưu persistent?) |
| `random-face` | Sinh ảnh khuôn mặt ngẫu nhiên |
| `split-data` | Cắt file dữ liệu lớn |

### 6. Community `/portal/community`
- **Diễn đàn**: posts, replies, upvotes, categories
- `create` → tạo bài viết mới
- `[slug]` → chi tiết bài + thread reply
- `user/[username]` → trang user + bài đã đăng
- Theo dõi subscription + view
- Hệ thống report (gửi vào moderation queue ở admin)

### 7. Profile `/portal/profile`
- Xem/sửa thông tin cá nhân (sync với Clerk)
- Telegram ID, bio, avatar
- Cài đặt notification

---

## 🛠 ADMIN — vận hành (`super_admin` + `staff`, `/admin/*`)

Dashboard điều hành cho team GoAds.

### 1. Dashboard `/admin`
- KPI tổng: doanh thu, số order, customer active, warranty pending
- Feed hoạt động gần đây

### 2. Customers `/admin/customers`
- **Danh sách** (TanStack Table): tên, email, role, số dư, tổng chi
- **Chi tiết** `/admin/customers/[id]`:
  - Profile + quản lý role
  - Lịch sử đơn hàng
  - Điều chỉnh wallet thủ công (cộng credit, refund)
  - Notes nội bộ
- **Export CSV**: `/api/admin/export/customers`

### 3. Orders `/admin/orders`
- **Danh sách**: tất cả order toàn hệ thống (filter status / payment / customer)
- **Tạo mới** `/admin/orders/new`: nhập order thủ công cho bán offline
- **Chi tiết** `/admin/orders/[id]`:
  - Sửa status, payment, items
  - Trigger delivery (assign sản phẩm cho order)
  - Refund / cancel
- **Export CSV**: `/api/admin/export/orders` + `/api/admin/export/delivered-items`

### 4. Products `/admin/products`
- **Danh sách theo loại** `/admin/products/[type]` (BM / Profile / Pages / etc.)
- **Tạo mới** `/admin/products/new`: nhập inventory hàng loạt
- **Thao tác per item**:
  - Đánh dấu available / delivered / banned / replaced
  - Xem credentials (đã mã hoá)
  - Gán vào order
  - Import CSV hàng loạt

### 5. Finance `/admin/finance`
- Biểu đồ doanh thu, tổng giao dịch
- Log điều chỉnh wallet
- Export CSV: `/api/admin/export/finance`

### 6. Community `/admin/community`
- Moderation queue (bài/reply bị report)
- Pin / lock / xoá bài
- Quản lý category

### 7. Staff `/admin/staff`
- Danh sách staff + role
- Promote/demote (gọi API update Clerk + DB role)
- Activity log

### 8. Settings `/admin/settings`
- Cấu hình toàn cục (mặc định delivery, thời hạn bảo hành...)
- Pricing tiers
- Template notification

---

## 🔌 APIs / Webhooks

| Endpoint | Mục đích | Auth |
|----------|----------|------|
| `POST /api/webhooks/clerk` | Sync Clerk → DB khi tạo/sửa user | Webhook signature (`svix`) |
| `GET /api/admin/export/customers` | Export CSV | super_admin/staff |
| `GET /api/admin/export/orders` | Export CSV | super_admin/staff |
| `GET /api/admin/export/delivered-items` | Export CSV | super_admin/staff |
| `GET /api/admin/export/finance` | Export CSV | super_admin/staff |
| `POST /api/extension/auth` | Login cho Chrome extension | Clerk session token |
| `POST /api/extension/token` | Cấp token scoped cho extension | session |
| `GET /api/extension/token/[id]` | Trạng thái token | session |
| `POST /api/extension/verify` | Verify quyền của extension | token |
| `* /api/keystatic/[...params]` | Keystatic CMS admin (blog) | Clerk admin |

---

## ⚠️ Lưu ý khi migrate sang Cloudflare

### Compatibility flag cần
- **`nodejs_compat`** (Workers compat flag) — bắt buộc cho `postgres-js`, `@clerk/nextjs`, module `crypto`

### Ràng buộc runtime
- **`postgres-js`** dùng TCP socket → Workers cần `nodejs_compat` + nên dùng **Hyperdrive** wrap Supabase pooler để giảm cold start latency
- Hoặc switch sang **Drizzle + HTTP driver** (vd `@neondatabase/serverless`) nếu Supabase throttle IP range của Workers
- **Singleton DB connection** trong `src/lib/db/index.ts` dùng `globalThis` — không persist giữa các Worker invocations → cân nhắc connection per-request

### Edge runtime gotchas
- `currentUser()` từ `@clerk/nextjs/server` — chạy được trên Edge
- `cache()` từ React — chỉ trong RSC, OK
- **Field encryption** (`ENCRYPTION_KEY`) — đảm bảo dùng Web Crypto API (`crypto.subtle`) thay cho Node `crypto` module nếu chạy Edge
- **CSV exports** — streams response, check support `ReadableStream`
- **File uploads** (nếu có batch import) — Workers giới hạn body 100MB

### Build / Deploy
- Next.js 16 với Turbopack — adapter Cloudflare: **`@opennextjs/cloudflare`** (open-source, mới nhất)
- Alternative: **`@cloudflare/next-on-pages`** (legacy, chỉ cho Pages)
- Asset hosting: `app/public/*` → R2 hoặc Cloudflare Pages assets
- SVG có spaces trong filename (`meta assets.svg`, `tiktok asset.svg`) — Cloudflare có thể URL-encode khác Node → có thể cần rename về kebab-case

### Webhooks
- Clerk webhook (`/api/webhooks/clerk`) cần endpoint public — set URL trong Clerk dashboard sau khi deploy
- Verify bằng `svix` signature

### Database
- Supabase đã host PostgreSQL — **không cần migrate DB**, chỉ cần app reachable
- Hyperdrive (Cloudflare) được khuyến nghị để cache connection pool tại edge
- Script migration: `npm run db:push` (drizzle-kit) — chạy local trỏ vào DATABASE_URL prod

---

## 📁 Cấu trúc code

```
app/src/
├── app/
│   ├── (marketing)/           # site marketing public
│   ├── foreplay/              # các trang sản phẩm style foreplay
│   ├── portal/                # dashboard customer (tài liệu này)
│   ├── admin/                 # dashboard admin (tài liệu này)
│   ├── api/                   # REST + webhooks
│   └── (auth)/                # sign-in/sign-up (Clerk)
├── lib/
│   ├── auth/require-role.ts   # RBAC guard
│   ├── db/
│   │   ├── index.ts           # drizzle client (Postgres)
│   │   ├── schema/            # 9 file schema
│   │   └── queries/           # typed queries theo domain
│   ├── actions/               # Server Actions Next.js (mutations)
│   └── crypto/                # mã hoá field (credentials của delivered-item)
└── components/
    ├── portal/                # UI riêng cho portal
    ├── admin/                 # UI riêng cho admin
    └── shadcn-studio/         # design system blocks
```

---

## 🔐 Lưu ý về encryption

Field `delivered_item.credentials` được **mã hoá khi lưu** với `ENCRYPTION_KEY`. Decryption diễn ra server-side khi user/admin xem credentials. Khi migrate phải đảm bảo:
- **Cùng `ENCRYPTION_KEY`** giữa local + Cloudflare deployment (nếu khác key → data không đọc được nữa)
- **Web Crypto API compatible** nếu chạy Edge runtime

---

## 📊 Database tables (17 trong schema `public`)

| Domain | Tables |
|--------|--------|
| Auth | `user` (sync từ Clerk) |
| Commerce | `order`, `order_item`, `delivered_item`, `product`, `customer_price` |
| Wallet | `wallet_transaction` |
| Warranty | `warranty_claim` |
| Extension | `extension_token` |
| Notifications | `notification` |
| Community | `community_category`, `community_post`, `community_reply`, `community_upvote`, `community_view`, `community_subscription`, `community_report` |

Source schema: `app/src/lib/db/schema/*.ts` — migrations drizzle-kit nằm trong `app/drizzle/`.

---

## ❓ Câu hỏi cho Duy quyết định

1. Cloudflare deployment platform: **Workers** (với `@opennextjs/cloudflare`) hay **Pages**?
2. Database connection: trực tiếp Supabase pooler, hay setup Hyperdrive?
3. Asset storage: public assets nằm cùng app deployment, hay tách ra R2?
4. Keystatic CMS (blog editor) cần ghi file-system → có thể không chạy được trên Workers, cần chuyển sang GitHub-based Keystatic mode
5. API endpoint Chrome extension (`/api/extension/*`) — quy tắc CORS + chiến lược TTL token?
