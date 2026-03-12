# Phase 4E: Admin Deliver Order (Fill Credentials)

## Context Links
- [Plan overview](./plan.md)
- [Order detail page](../../src/app/admin/orders/[id]/page.tsx)
- [Credential schemas](../../src/lib/validators/credential-schemas.ts)
- [Delivered item queries](../../src/lib/db/queries/delivered-item-queries.ts)
- [Order tables](../../src/lib/db/schema/order-tables.ts)

## Overview
- **Priority:** P1
- **Status:** pending
- **Effort:** 2.5h
- **Depends on:** Phase 4D

Admin fills credentials for each order item. Dynamic form fields based on product type (uses existing Zod schemas). Creates delivered_item records and updates order status.

## Requirements

### Functional
- Order detail page shows "Deliver" button per order item (when not yet delivered)
- Clicking opens form with fields matching product type's credential schema
- UID field always shown (the primary identifier like accountId, bmId, etc.)
- On submit: create delivered_item, link to orderItem
- When all items delivered: update order status to "delivered"
- Show delivered credentials on order detail page (for already-delivered items)

### Non-functional
- Credentials stored as encrypted JSON in `credentials` column
- Validate against Zod schema per product type
- warrantyUntil set to 7 days from delivery (GoAds warranty policy)

## Architecture

```
Order detail page (/admin/orders/[id]):
  Products table:
    | Product | Qty | Price | Status | Action |
    | BM xyz  | 2   | $50   | 1/2    | [Deliver] |

  Deliver button -> Dialog with dynamic form
    - Fields generated from credentialSchemaMap[productType]
    - UID extracted from first required field (bmId, accountId, etc.)

  Server action: deliverOrderItem(orderItemId, productType, credentials)
    1. Validate credentials against credentialSchemaMap[productType]
    2. Encrypt credentials JSON
    3. INSERT delivered_item
    4. Check if all items now delivered -> UPDATE order status
    5. revalidatePath

  Delivered items shown in expandable section per order item.
```

## Related Code Files

### Create
- `src/lib/actions/delivery-actions.ts` — server action `deliverOrderItem`
- `src/app/admin/orders/[id]/deliver-dialog.tsx` — dynamic credential form dialog
- `src/app/admin/orders/[id]/delivered-items-section.tsx` — display delivered credentials
- `src/lib/encryption.ts` — simple AES encryption for credentials (if not exists)

### Modify
- `src/app/admin/orders/[id]/page.tsx` — add delivery UI, show delivered items
- `src/lib/db/queries/order-queries.ts` — add delivery status info to OrderDetail

## Implementation Steps

1. Create `src/lib/encryption.ts` (if not exists):
   ```ts
   // AES-256-GCM encrypt/decrypt using ENCRYPTION_KEY env var
   // encryptJSON(data: object): string
   // decryptJSON(encrypted: string): object
   ```
   Use Node.js `crypto` module. Store key in `.env` as `ENCRYPTION_KEY`.

2. Create `src/lib/actions/delivery-actions.ts`:
   ```ts
   "use server"
   // requireRole('super_admin', 'staff')
   // Input: { orderItemId, productType, credentials, uid }
   // 1. Validate productType is valid
   // 2. Get credentialSchema from credentialSchemaMap[productType]
   // 3. Parse credentials against schema
   // 4. Encrypt credentials JSON
   // 5. Generate id (nanoid)
   // 6. INSERT delivered_item:
   //    - orderId (from orderItem)
   //    - orderItemId
   //    - productType
   //    - uid
   //    - credentials (encrypted)
   //    - status: "active"
   //    - warrantyUntil: now + 7 days
   // 7. Check: count delivered items for this order vs total order items
   //    If all delivered: UPDATE order SET status = "delivered", deliveredAt = now
   // 8. revalidatePath('/admin/orders/[id]')
   ```

3. Create `src/app/admin/orders/[id]/deliver-dialog.tsx`:
   - Props: orderItem (with productType from joined product), orderId
   - Get credential fields from `getColumnsForType(productType)`
   - Render form fields dynamically:
     - Text input for each field in schema
     - Optional fields marked as optional
   - UID field = first required field value (or explicit uid input)
   - Submit calls deliverOrderItem server action

4. Create `src/app/admin/orders/[id]/delivered-items-section.tsx`:
   - Shows delivered items for an order
   - Decrypt + display credentials per item
   - Show status badge, warranty date

5. Update `orders/[id]/page.tsx`:
   - Fetch delivery status per order item
   - Add deliver button per undelivered item
   - Add delivered items section
   - Show delivery count (e.g., "2/3 delivered")
   - Note: need to join orderItems with deliveredItems to show status

6. Update `order-queries.ts`:
   - Add deliveredCount to OrderItemWithProduct (count of delivered_items per orderItem)
   - Or compute in page.tsx from existing deliveredItems array

## Todo List
- [ ] Create encryption.ts utility
- [ ] Create delivery-actions.ts with deliverOrderItem
- [ ] Create deliver-dialog.tsx with dynamic credential form
- [ ] Create delivered-items-section.tsx
- [ ] Update order detail page with delivery UI
- [ ] Test: deliver single item, credentials stored encrypted
- [ ] Test: deliver all items, order status changes to "delivered"
- [ ] Test: credential form shows correct fields per product type
- [ ] Test: validation rejects invalid credentials
- [ ] Test: delivered items display correctly (decrypted)

## Success Criteria
- Admin can deliver credentials per order item
- Dynamic form matches product type's Zod schema
- Credentials encrypted at rest
- Order status auto-updates when all items delivered
- Warranty set to 7 days from delivery
- Delivered items visible on order detail page

## Risk Assessment
- **Encryption key management:** Must be in .env, never committed. Add to .env.example as placeholder.
- **Multiple deliveries per order item:** For qty > 1, admin delivers one at a time (one delivered_item per unit). Loop or allow batch. Start with one-at-a-time for simplicity.
- **Product type mismatch:** Validate productType against orderItem's actual product type, not user input.

## Security Considerations
- Credentials encrypted with AES-256-GCM
- ENCRYPTION_KEY in env, never in code
- Server action guarded by role
- Decryption only happens server-side for display
- Portal shows credentials only to the customer who owns the order
