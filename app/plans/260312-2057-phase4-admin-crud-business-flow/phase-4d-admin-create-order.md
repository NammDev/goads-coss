# Phase 4D: Admin Create Order

## Context Links
- [Plan overview](./plan.md)
- [Order queries](../../src/lib/db/queries/order-queries.ts)
- [Order tables](../../src/lib/db/schema/order-tables.ts)
- [Product queries](../../src/lib/db/queries/product-queries.ts)
- [Customer queries](../../src/lib/db/queries/customer-queries.ts)

## Overview
- **Priority:** P1
- **Status:** pending
- **Effort:** 3h
- **Depends on:** Phase 4A, 4B, 4C

Admin creates order for a customer. Selects customer + products + quantities. Total auto-calculated. Balance auto-deducted. Order + order_items + wallet_transaction created atomically.

## Requirements

### Functional
- Select customer from dropdown (shows name + balance)
- Add products: select product, set quantity (default 1)
- Multiple line items supported
- Total auto-calculated from product prices (or customer-specific prices if exist)
- On submit: deduct total from customer balance, create order + items + wallet deduction
- Order status set to "paid" (payment already confirmed via Telegram)
- Balance always sufficient (admin ensures via topup first)

### Non-functional
- Single DB transaction for the entire operation
- If balance insufficient, return error (safety check, not expected flow)
- Revalidate orders page + customer detail page

## Architecture

```
/admin/orders/new page:
  1. Customer selector (searchable dropdown)
     - Shows: name, email, balance
  2. Product picker
     - Add row: product dropdown + qty input
     - Shows unit price, subtotal per row
     - Total at bottom
  3. Notes field (optional)
  4. Submit button

Server action createOrder:
  DB transaction:
    1. Verify customer exists, get balance
    2. For each item: get product price (check customer_price first)
    3. Calculate total
    4. Check balance >= total (safety)
    5. Deduct balance: UPDATE user SET balance = balance - total
    6. INSERT order (status: "paid", totalAmount: total)
    7. INSERT order_items (one per line item)
    8. INSERT wallet_transaction (type: deduct, orderId, balanceAfter)
    9. Return orderId
  revalidatePath('/admin/orders')
```

## Related Code Files

### Create
- `src/app/admin/orders/new/page.tsx` — server component, fetches customers + products
- `src/app/admin/orders/new/create-order-form.tsx` — client component, multi-item form
- `src/lib/actions/order-actions.ts` — server action `createOrder`
- `src/lib/validators/order-schemas.ts` — Zod schema for create order

### Modify
- `src/app/admin/orders/page.tsx` — add "Create Order" button linking to /admin/orders/new
- `src/data/admin-nav.ts` — optionally add pending order count badge

## Implementation Steps

1. Create `src/lib/validators/order-schemas.ts`:
   ```ts
   import { z } from "zod";
   export const orderItemSchema = z.object({
     productId: z.string().min(1),
     quantity: z.coerce.number().int().positive().max(100),
   });
   export const createOrderSchema = z.object({
     customerId: z.string().min(1, "Select a customer"),
     items: z.array(orderItemSchema).min(1, "Add at least one product"),
     notes: z.string().optional(),
   });
   ```

2. Create `src/lib/actions/order-actions.ts`:
   ```ts
   "use server"
   // requireRole('super_admin', 'staff')
   // parse with createOrderSchema
   // db.transaction:
   //   a. Fetch customer (verify exists, get balance)
   //   b. Fetch products by IDs + check customer_prices
   //   c. Calculate total (sum of unitPrice * qty per item)
   //   d. Check balance >= total, error if not
   //   e. Generate orderId (nanoid)
   //   f. UPDATE user.balance -= total
   //   g. INSERT order (id, customerId, totalAmount, status: "paid", paymentDate: now)
   //   h. INSERT order_items (one per line, with unitPrice from product/customerPrice)
   //   i. INSERT wallet_transaction (type: deduct, amount: total, balanceAfter, orderId)
   // revalidatePath('/admin/orders')
   // revalidatePath('/admin/customers/[id]')
   // return { success: true, orderId }
   ```

3. Create `src/app/admin/orders/new/page.tsx`:
   ```ts
   // Server component
   // Fetch: getAllCustomers(), getAllProducts()
   // Render: CreateOrderForm with customers + products as props
   ```

4. Create `src/app/admin/orders/new/create-order-form.tsx`:
   - Customer selector: Combobox (shadcn) searching by name/email, shows balance
   - Items section: dynamic list of rows
     - Each row: product select + quantity input + remove button
     - "Add product" button
     - Shows unitPrice, row subtotal
   - Total display at bottom
   - Notes textarea
   - Submit button with loading state
   - On success: redirect to `/admin/orders/[orderId]`

5. Update `src/app/admin/orders/page.tsx`:
   - Add Button linking to `/admin/orders/new` in header area

## Todo List
- [ ] Create order-schemas.ts
- [ ] Create order-actions.ts with createOrder
- [ ] Create orders/new/page.tsx (server component)
- [ ] Create orders/new/create-order-form.tsx (client component)
- [ ] Add "Create Order" button to orders page
- [ ] Test: create order with single item
- [ ] Test: create order with multiple items
- [ ] Test: balance deducted correctly
- [ ] Test: wallet_transaction created with correct data
- [ ] Test: insufficient balance returns error
- [ ] Test: order appears in orders table

## Success Criteria
- Admin can create order selecting customer + products
- Balance auto-deducted, wallet_transaction created
- Order created with status "paid"
- Customer-specific pricing used when available
- Atomic transaction (all or nothing)
- Redirect to order detail after creation

## Risk Assessment
- **Customer price vs catalog price:** Query customer_prices table first, fall back to product.price. Match existing `getProductWithCustomerPrice` pattern.
- **Balance check race condition:** FOR UPDATE lock on user row within transaction.
- **Empty products list:** Validate minimum 1 item via Zod.
- **Product not found:** Validate all productIds exist within transaction, rollback if not.

## Security Considerations
- Server action guarded by `requireRole('super_admin', 'staff')`
- All prices fetched server-side (no client-submitted prices)
- Balance check + deduction in same transaction (no TOCTOU)
- createdBy tracked via session user in wallet_transaction
