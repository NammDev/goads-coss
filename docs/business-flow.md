# GoAds Business Flow

> Operational flow from customer acquisition to product delivery.

---

## Customer Journey

### 1. Browse & Select

Customer visits website → browses products (Premium Setup, Agency Account, BM, etc.) → selects product → fills cart form:
- Product type + quantity
- Payment method preference (bank transfer, crypto)
- Questions / special requests

### 2. Form → Telegram

Cart form submits to Telegram bot. Admin team receives notification with order details.

### 3. Consultation

Admin chats with customer via Telegram:
- Answers questions, recommends products
- If customer is new → admin creates account for them in the system
- Confirms payment method and amount

### 4. Payment (Manual)

Customer transfers money (bank / crypto). Admin manually confirms receipt in admin panel. No automated payment verification in Phase 2.

### 5. Fulfillment

Admin prepares the product:
- Records payment date
- Assigns product to order (BM ID, invite link, credentials, etc.)
- Sets ship date and updates order status

### 6. Delivery (In-Web)

Admin marks order as shipped. Customer receives Telegram notification. Customer logs into portal and sees:
- Order status timeline (Ordered → Paid → Processing → Shipped → Completed)
- Delivered product details (BM ID, name, invite link with copy button)
- Product status indicator (active/inactive)

### 7. Post-Delivery

- Customer uses delivered products (BM, accounts, etc.)
- BM Invite Extension available for qualifying purchases
- Support via Telegram for issues

---

## Order Status Flow

```
Pending → Paid → Processing → Shipped → Completed
   │                                         │
   └── Cancelled                             └── (Warranty period starts)
```

| Status | Trigger | Who |
|--------|---------|-----|
| Pending | Cart form submitted | System |
| Paid | Admin confirms payment | Staff / Super Admin |
| Processing | Admin preparing product | Staff / Super Admin |
| Shipped | Product info attached + delivered | Staff / Super Admin |
| Completed | Customer acknowledges / auto after 3 days | System |
| Cancelled | Order cancelled by either party | Staff / Super Admin |

---

## Roles & Access

| Role | Who | Can Do |
|------|-----|--------|
| Super Admin | nammdev, justin | Everything: finance, staff mgmt, settings, all CRUD |
| Staff | ~3 employees | Manage orders, create customer accounts, ship products |
| Customer | buyers | View own orders, products, use tools, edit profile |

### Staff Restrictions

Staff **cannot**: view revenue/finance reports, manage other staff, change system settings, delete orders.

---

## Data Architecture

### Stored in Database (PostgreSQL)

| Entity | Key Fields |
|--------|------------|
| Users | email, password_hash, role, name, telegram_id |
| Orders | customer_id, product_id, status, payment_method, payment_date, ship_date, notes |
| Products | name, type, price, description, inventory_count |
| Delivered Items | order_id, product_type, bm_id (encrypted), invite_link (encrypted), status |

### Security Rules

- Sensitive fields (BM ID, invite links, credentials) → encrypted at rest
- Google Sheets → internal admin tracking only, never exposed to customers
- Customer sees only their own data after authentication

---

## Integrations

| Integration | Purpose | Phase |
|-------------|---------|-------|
| Telegram Bot | Receive cart forms, send status notifications | Phase 2 |
| BM Invite Extension | Chrome extension for BM invite management | Phase 2 |
| Google Sheets | Internal admin reporting (DB → Sheet sync) | Phase 2 |
| SePay / Stripe | Automated payment verification | Phase 3 |
| Email notifications | Order updates, warranty alerts | Phase 3 |

---

## BM Invite Extension

Standalone Chrome extension for managing BM invitations. Separate from the main website.

**Access**: Only customers with qualifying purchases (admin toggles access per customer).

**Auth flow**: Portal login → JWT → Extension reads token → Calls GoAds API → Fetches BM invite links.

**Distribution**: Chrome Web Store or manual .crx download from portal.
