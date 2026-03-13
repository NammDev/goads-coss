# Scout Report: Admin & Portal Flow Status

**Date:** 2026-03-13  
**Scope:** Admin flow, Portal flow, Actions, Queries

---

## ADMIN FLOW

### 1. Dashboard `/admin`
**Status:** WORKING ✓
- Real DB queries: `getAdminStats()`, `getRecentOrders(5)`
- Displays: Total orders, revenue, pending orders, product count
- Shows 5 recent orders with customer, amount, status, date
- Charts: Weekly overview + performance cards (shadcn studio blocks)

### 2. Customers `/admin/customers`
**Status:** WORKING ✓
- List all customers via `getAllCustomers()` query
- Table with: name, email, balance, role, joined date
- **Action:** Create customer dialog — uses `createCustomer()` server action
  - Validates: name, email, password (8+ chars), optional telegramId, notes
  - Uses Better Auth for password hashing
  - Sets role="customer", creates wallet with balance=$0

### 3. Customer Detail `/admin/customers/[id]`
**Status:** WORKING ✓
- Profile card: name, email, telegram, notes, joined date
- Balance card with topup action
- Wallet transaction history (topup/deduct)
- Order history linked to `/admin/orders/[id]`
- **Action:** Topup balance via `topupBalance()` server action
  - Validates amount (Decimal, >0)
  - Creates wallet transaction record
  - Updates balance via transaction (prevents race conditions)

### 4. Orders `/admin/orders`
**Status:** WORKING ✓
- List all orders via `getAllOrders()` query
- Table with: order ID, customer name, total, status, created date
- Create Order button → `/admin/orders/new`

### 5. Create Order `/admin/orders/new`
**Status:** WORKING ✓
- Customer selector dropdown (with balance display)
- Line items: product select, quantity, unit price, subtotal
- Add/remove product rows
- Validates: customer selected, products selected, sufficient balance
- **Action:** `createOrder()` server action
  - Fetches products & customer prices outside transaction
  - Within transaction: locks user row, deducts balance, creates order + items
  - Creates wallet deduction transaction
  - Auto-deducts from customer balance if order total ≤ balance

### 6. Order Detail `/admin/orders/[id]`
**Status:** WORKING ✓
- Order timeline with status (pending → paid → delivered)
- Order details card: ID, status, delivery progress, timestamps, total
- Customer details card (linked to customer detail page)
- Products table with: name, qty, unit price, subtotal, status, action
- **Deliver action:** Dialog with credential fields (encrypted)
  - `deliverOrderItem()` server action
  - Validates credentials against schema for product type
  - Creates deliveredItem record with 7-day warranty
  - Auto-marks order as "delivered" when all items delivered
- Delivered credentials section (encrypted display)
- Notes section (if any)

### 7. Products `/admin/products`
**Status:** INCOMPLETE/PLACEHOLDER ⚠️
- Redirects to `/admin/products/[type]` (no main list)
- **New Product page** → `/admin/products/new`
  - Form only (no backend action)
  - Fields: name, type select, price, description, stock
  - `handleSubmit()` only shows toast "Product saved" — **not hooked to DB**
  - ❌ **No create action implemented**

### 8. Products by Type `/admin/products/[type]`
**Status:** WORKING (displays delivered items, not products) ⚠️
- Shows **delivered items** (not browsable product catalog)
- Lists all `deliveredItems` of given type
- Badge shows item count
- New Product button but no action

### 9. Settings `/admin/settings`
**Status:** INCOMPLETE
- Appears to be a stub (not fully explored)

### 10. Finance `/admin/finance`
**Status:** INCOMPLETE
- Appears to be a stub (not fully explored)

### 11. Staff `/admin/staff`
**Status:** INCOMPLETE
- Appears to be a stub (not fully explored)

---

## PORTAL FLOW

### 1. Dashboard `/portal`
**Status:** WORKING ✓
- Requires `requireRole('customer')` auth
- Real DB queries: `getPortalStats()`, `getOrdersByCustomerId()`
- Welcome message with customer name
- Stats: total orders, pending orders, active items
- Recent orders (5) with timeline, status, link to detail page

### 2. Orders `/portal/orders`
**Status:** WORKING ✓
- Requires customer auth
- Fetches orders + order items via `getOrdersByCustomerId()` + `getOrderItemsByOrderIds()`
- Client table with serialized dates
- Shows all customer's orders with status

### 3. Order Detail `/portal/orders/[id]`
**Status:** WORKING ✓
- Access control: checks ownership (fetch all customer items, find specific ID)
- Displays order timeline, order/customer details
- Shows delivered items for order
- Links to products detail page

### 4. Products `/portal/products`
**Status:** REDIRECT ✓
- Redirects to `/portal/products/agency_account` (first product type)

### 5. Products by Type `/portal/products/[type]`
**Status:** WORKING ✓
- Requires customer auth
- Fetches delivered items of type via `getDeliveredItemsByType()`
- **Shows what customer owns** (delivered credentials), not catalog to purchase
- Expandable rows show: warranty, usage rules, order/delivery info
- Empty state: "No delivered products yet"

### 6. Product Detail `/portal/products/[type]/[id]`
**Status:** WORKING ✓
- Access control: validates ownership (fetch all items, find by ID)
- Shows product details: type, status, order link
- Displays credentials (decrypted)
- Warranty info with expiry warnings
- Usage guide (steps for Business Manager setup)

### 7. Wallet `/portal/wallet`
**Status:** WORKING ✓
- Shows current balance via `getCustomerBalance()`
- Transaction history via `getWalletTransactions()`
- Shows all topup/deduct entries with amount, balance after, note, date

### 8. Profile `/portal/profile`
**Status:** INCOMPLETE
- Appears to be a stub with profile-form component (not fully explored)

---

## SERVER ACTIONS (Ready)

All in `/src/lib/actions/`

### customer-actions.ts
- `createCustomer()` — ✓ WORKING
  - Email validation, password hashing via Better Auth
  - Sets custom fields: telegramId, notes, role="customer"

### order-actions.ts
- `createOrder()` — ✓ WORKING
  - Fetches products & customer prices outside transaction (prevents lock conflicts)
  - Locks user row, validates balance, deducts, creates order + items
  - Creates wallet transaction
  - Error handling: insufficient balance, product not found, customer not found

### delivery-actions.ts
- `deliverOrderItem()` — ✓ WORKING
  - Validates credentials against schema for product type
  - Encrypts credentials (fallback to plain JSON if ENCRYPTION_KEY not set)
  - Creates deliveredItem with 7-day warranty
  - Counts order items vs delivered — auto-marks order "delivered" if all delivered

### wallet-actions.ts
- `topupBalance()` — ✓ WORKING
  - Locks user row, updates balance, creates wallet transaction
  - Prevents race conditions with transaction lock

---

## DB QUERIES (Ready)

All in `/src/lib/db/queries/`

### product-queries.ts
- `getAllProducts()` — ✓
- `getProductsByType()` — ✓
- `getProductById()` — ✓
- `getProductWithCustomerPrice()` — ✓ (custom pricing per customer)

### order-queries.ts
- `getAllOrders()` — ✓
- `getOrdersByCustomerId()` — ✓
- `getOrderById()` — ✓ (with items + deliveredItems)
- `getRecentOrders()` — ✓
- `getOrderItemsByOrderIds()` — ✓
- `getPendingOrderCount()` — ✓
- `getOrderStats()` — ✓

### customer-queries.ts
- `getAllCustomers()` — ✓
- `getCustomerById()` — ✓ (with orders)
- Probably `CustomerWithStats` type exists

### delivered-item-queries.ts
- `getDeliveredItemsByType()` — ✓
- `getDeliveredItemsByCustomerId()` — ✓
- (likely others)

### dashboard-queries.ts
- `getAdminStats()` — ✓
- `getPortalStats()` — ✓

### wallet-queries.ts
- `getWalletTransactions()` — ✓
- `getCustomerBalance()` — ✓

---

## KEY FEATURES STATUS

| Feature | Admin | Portal | Status |
|---------|-------|--------|--------|
| **Create User** | ✓ | — | WORKING |
| **Topup Balance** | ✓ | — | WORKING |
| **Create Order** | ✓ | — | WORKING |
| **Deliver Item** | ✓ | — | WORKING |
| **View Orders** | ✓ | ✓ | WORKING |
| **Product Catalog** | ❌ | ❌ | NOT IMPLEMENTED |
| **Customer Purchase** | ❌ | ❌ | NOT IMPLEMENTED |
| **Create Product** | ❌ | — | PLACEHOLDER ONLY |

---

## CRITICAL GAPS / INCOMPLETE

### 1. Product Creation `/admin/products/new`
- Form exists but **no server action** — submit only shows toast
- Not wired to `createProduct()` action (action may not exist)
- Status: PLACEHOLDER

### 2. Portal Product Browsing
- Portal only shows **owned/delivered products** (credentials)
- **No product catalog** for customer to browse & purchase
- No shopping cart
- No purchase/order creation from portal (admin-only)
- Status: NOT IMPLEMENTED

### 3. Admin Product Management
- Admin sees **delivered items** at `/admin/products/[type]`, not product catalog
- No edit/delete product actions
- No product listing/filtering
- Status: INCOMPLETE

### 4. Portal Profile Page
- Likely exists but not fully implemented
- Status: INCOMPLETE

### 5. Admin Settings/Finance/Staff Pages
- Unclear if implemented or stubs
- Status: UNKNOWN (not fully explored)

---

## FLOW SUMMARY

### Admin Creates Order
1. Admin creates customer (name, email, password)
2. Admin topups customer balance
3. Admin creates order (select customer, add products, submit)
4. Order auto-deducts from balance
5. Admin delivers order items (fills credentials, 7-day warranty auto-set)
6. Order marks "delivered" when all items delivered

### Portal Customer Views Assets
1. Customer logs in
2. Views dashboard: orders, stats
3. Views orders list + details (with delivery timeline)
4. Views own delivered products (with decrypted credentials)
5. Views wallet (balance + transaction history)
6. (Cannot browse products or create orders)

### MISSING: Self-Service Purchase
- No product catalog viewable by customer
- No shopping cart
- No checkout
- No balance check before purchase
- Entire purchase flow = admin-only

---

## FILE PATHS (Key Files)

**Admin Pages:**
- `/src/app/admin/page.tsx` — dashboard (WORKING)
- `/src/app/admin/customers/page.tsx` — customer list (WORKING)
- `/src/app/admin/customers/[id]/page.tsx` — customer detail (WORKING)
- `/src/app/admin/orders/page.tsx` — orders list (WORKING)
- `/src/app/admin/orders/new/page.tsx` — create order (WORKING)
- `/src/app/admin/orders/new/create-order-form.tsx` — form logic (WORKING)
- `/src/app/admin/orders/[id]/page.tsx` — order detail (WORKING)
- `/src/app/admin/products/page.tsx` — redirect (INCOMPLETE)
- `/src/app/admin/products/new/page.tsx` — new product form (PLACEHOLDER)
- `/src/app/admin/products/[type]/page.tsx` — products by type (INCOMPLETE)

**Portal Pages:**
- `/src/app/portal/page.tsx` — dashboard (WORKING)
- `/src/app/portal/orders/page.tsx` — orders list (WORKING)
- `/src/app/portal/orders/[id]/page.tsx` — order detail (WORKING)
- `/src/app/portal/products/page.tsx` — redirect (WORKING)
- `/src/app/portal/products/[type]/page.tsx` — products by type (WORKING)
- `/src/app/portal/products/[type]/[id]/page.tsx` — product detail (WORKING)
- `/src/app/portal/wallet/page.tsx` — wallet (WORKING)
- `/src/app/portal/profile/page.tsx` — profile (INCOMPLETE)

**Auth:**
- `/src/app/(auth)/login/page.tsx` — login (WORKING)

**Actions:**
- `/src/lib/actions/customer-actions.ts` — createCustomer (WORKING)
- `/src/lib/actions/order-actions.ts` — createOrder (WORKING)
- `/src/lib/actions/delivery-actions.ts` — deliverOrderItem (WORKING)
- `/src/lib/actions/wallet-actions.ts` — topupBalance (WORKING)

**Queries:**
- `/src/lib/db/queries/product-queries.ts` (WORKING)
- `/src/lib/db/queries/order-queries.ts` (WORKING)
- `/src/lib/db/queries/customer-queries.ts` (WORKING)
- `/src/lib/db/queries/delivered-item-queries.ts` (WORKING)
- `/src/lib/db/queries/dashboard-queries.ts` (WORKING)
- `/src/lib/db/queries/wallet-queries.ts` (WORKING)

---

## NEXT STEPS (Priority Order)

1. **Implement product creation action** — wire `/admin/products/new`
2. **Implement product catalog browsing** — admin: list products; portal: show catalog + prices
3. **Implement customer self-checkout** — portal: add product to cart, calculate total, deduct balance
4. **Complete profile page** — portal: edit customer profile
5. **Complete admin settings** — configure Telegram bot, encryption keys, etc.
6. **Complete admin finance** — revenue reports, transaction logs
7. **Complete admin staff** — manage staff accounts, permissions
