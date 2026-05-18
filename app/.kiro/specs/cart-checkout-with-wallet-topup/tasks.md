# Tasks — Cart Checkout with Wallet Top-Up

> Tasks are grouped by layer (DB → Backend → Integration → Frontend) to allow parallel work streams.
> Each task references the file paths from `design.md`, the requirements it satisfies, and the correctness properties it implements.

---

## Layer 1: Database

- [ ] **DB-1** — Add `topup_request_status` enum to `src/lib/db/schema/enums.ts`
  - Add `pgEnum("topup_request_status", ["pending","completed","failed","expired","cancelled"])`
  - **Satisfies**: Req 10.3

- [ ] **DB-2** — Create `topup_request` table in `src/lib/db/schema/wallet-tables.ts`
  - Define all columns per design: id, customerId (FK→user), amount, currency, status, reference (unique), gatewayPaymentId, paymentUrl, qrCodeData, expiresAt, completedAt, failureReason, createdAt, updatedAt
  - Add indexes: `(customerId, status)`, `(gatewayPaymentId)`
  - **Satisfies**: Req 10.1, 10.2

- [ ] **DB-3** — Add `topupRequestId` FK column to `wallet_transaction` in `src/lib/db/schema/wallet-tables.ts`
  - Nullable `text` column referencing `topup_request.id`, no cascade
  - Export `topupRequests` from `src/lib/db/schema/index.ts`
  - **Satisfies**: Req 10.4

- [ ] **DB-4** — Generate and apply Drizzle migration
  - Run `pnpm db:generate` to produce migration SQL
  - Verify migration file contains: enum, table, indexes, FK column
  - Run `pnpm db:migrate` to apply
  - **Satisfies**: Req 10.1–10.4

- [ ] **DB-5** — Add `getOrderTotalQuantity` helper to `src/lib/db/queries/order-queries.ts`
  - `SELECT COALESCE(SUM(quantity), 0) FROM order_item WHERE orderId = $1`
  - Accepts `tx | db` as first arg so it can run inside a transaction
  - **Satisfies**: Req 9.2, Property 9

- [ ] **DB-6** — Create `src/lib/db/queries/topup-queries.ts`
  - `getTopupRequestById(id)`, `getTopupRequestByReference(reference)`, `getTopupRequestByGatewayId(gatewayPaymentId)`, `findExpiredPendingTopups(asOf, limit)`
  - **Satisfies**: Req 4.3, 5.3, 5.10

---

## Layer 2: Backend

- [ ] **BE-1** — Create `src/lib/validators/checkout-schemas.ts`
  - `checkoutItemSchema`, `checkoutCartSchema`, `CheckoutCartInput` type
  - No price field (server resolves pricing)
  - **Satisfies**: Req 2.2

- [ ] **BE-2** — Create `src/lib/validators/topup-schemas.ts`
  - `createTopupSchema` (amount with min/max from env), `cancelTopupSchema`, `getTopupSchema`
  - Use function form `topupSchemaForEnv()` for hot-reload safety
  - **Satisfies**: Req 3.4, 4.2

- [ ] **BE-3** — Create `src/lib/actions/checkout-actions.ts` with `checkoutCart()`
  - Auth guard: `customer` role only
  - Zod validation, product existence + isActive check
  - DB transaction: `SELECT balance FOR UPDATE`, compute total from server prices, deduct, insert order/items/wallet_transaction
  - Return `CheckoutResult` discriminated union with all error codes
  - `revalidatePath` + non-blocking `createNotification`
  - **Satisfies**: Req 2.1–2.11, Properties 1, 2, 3, 4, 5

- [ ] **BE-4** — Create `src/lib/actions/topup-actions.ts` with `createTopupRequest()`, `cancelTopupRequest()`, `getTopupRequest()`
  - `createTopupRequest`: auth guard, validate, insert pending row, call Wise client, update row with gateway data
  - `cancelTopupRequest`: owner check, pending-only guard, set cancelled
  - `getTopupRequest`: owner check, read-only, return status + newBalance when completed
  - **Satisfies**: Req 4.1–4.7, 6.1–6.2

- [ ] **BE-5** — Modify `src/lib/actions/delivery-actions.ts`
  - Add `SELECT order FOR UPDATE` at start of transaction
  - Reject if status is `cancelled` or `completed` (INVALID_STATE error)
  - Replace `count(order_item)` with `getOrderTotalQuantity(tx, orderId)`
  - Add `paid → processing` auto-transition on first delivery
  - Keep `processing → delivered` when `deliveredCount >= totalQty`
  - Always set `updatedAt = now()` on order writes
  - **Satisfies**: Req 9.1–9.6, Properties 8, 9, 10

---

## Layer 3: Integration

- [ ] **INT-1** — Create `src/lib/integrations/wise/types.ts`
  - `WiseCreatePaymentInput`, `WiseCreatePaymentResult`, `WiseWebhookEvent` union type
  - `WiseGatewayError` class
  - **Satisfies**: Req 4.4

- [ ] **INT-2** — Create `src/lib/integrations/wise/client.ts`
  - `WiseClient` interface with `createPayment()` and `cancelPayment()`
  - Real implementation using `fetch` with 10s timeout, reads `WISE_API_TOKEN` + `WISE_PROFILE_ID`
  - `getWiseClient()` factory function
  - **Satisfies**: Req 4.4, 4.5

- [ ] **INT-3** — Create `src/lib/integrations/wise/signature.ts`
  - `verifyWiseWebhookSignature(rawBody, signatureHeader, secret): boolean`
  - HMAC-SHA256 with `crypto.timingSafeEqual`
  - **Satisfies**: Req 5.2, Property 13 (partial)

- [ ] **INT-4** — Create `src/app/api/webhooks/wise/route.ts`
  - POST only (405 for others)
  - Read raw body → verify signature → parse JSON → lookup topup_request
  - Branch on event type: `payment.completed` (idempotent credit), `payment.failed`, `payment.expired`
  - Lock user row, increment balance, insert wallet_transaction, update topup_request
  - Return correct HTTP status per error table in design
  - Non-blocking `createNotification("balance_topup")`
  - **Satisfies**: Req 5.1–5.9, Properties 6, 7, 13

- [ ] **INT-5** — Create `src/app/api/cron/expire-topups/route.ts`
  - Bearer auth via `CRON_SECRET`
  - `findExpiredPendingTopups(now, 200)` → batch UPDATE to `expired`
  - Race-safe WHERE clause: `status='pending' AND expiresAt < now()`
  - **Satisfies**: Req 5.10, Property 16 (from design)

- [ ] **INT-6** — Add env vars to `.env.example`
  - `WISE_API_TOKEN`, `WISE_PROFILE_ID`, `WISE_WEBHOOK_SECRET`, `MIN_TOPUP_USD`, `MAX_TOPUP_USD`, `TOPUP_EXPIRY_MINUTES`, `CRON_SECRET`
  - **Satisfies**: design env var table

---

## Layer 4: Frontend

- [ ] **FE-1** — Update `src/lib/cart-context.tsx`
  - Extend localStorage payload to v2: add `ownerCustomerId`, `pendingCheckout`, `pendingCheckoutTotal`, `version`
  - Add `setPendingCheckout()`, `clearPendingCheckout()`, `bindOwner()` to context value
  - On hydrate: if `ownerCustomerId` differs from active session, clear cart + pending state
  - Backwards compat: treat ownerless entries as unbound
  - **Satisfies**: Req 7.1–7.5, Properties 11, 12

- [ ] **FE-2** — Create `src/lib/hooks/use-topup-status-polling.ts`
  - Poll `getTopupRequest()` every 3000ms while `status === 'pending'` and `now() < expiresAt`
  - Stop on terminal status or expiry
  - Expose `refresh()` for manual user-driven check
  - Cleanup on unmount
  - **Satisfies**: Req 6.1–6.2

- [ ] **FE-3** — Create `src/components/portal/cart-checkout-button.tsx`
  - Reads cart from `useCart()`
  - Disabled when cart is empty
  - On click: call `checkoutCart()`, handle all result codes
  - On success: `clearCart()`, `clearPendingCheckout()`, navigate to `/portal/orders/{orderId}`
  - On `INSUFFICIENT_BALANCE`: `setPendingCheckout(true, total)`, toast, navigate to `/portal/wallet?returnTo=checkout`
  - **Satisfies**: Req 1.1–1.7, 2.11–2.13

- [ ] **FE-4** — Create `src/app/portal/wallet/insufficient-balance-banner.tsx`
  - `Alert` with `variant="destructive"`
  - Compute shortfall = `Math.ceil((required - available) * 100) / 100`
  - "Top up now" button calls `onTopupNow`
  - Visible only when `returnTo=checkout` AND `pendingCheckout=true`
  - **Satisfies**: Req 3.1–3.2, Property 17

- [ ] **FE-5** — Create `src/app/portal/wallet/topup-dialog.tsx`
  - States: idle → creating → awaiting_payment → completed/failed/expired/cancelled
  - Amount form with min/max validation
  - On submit: call `createTopupRequest()`, transition to awaiting_payment
  - Render QR code (use `qrcode` npm package), countdown to `expiresAt`
  - Subscribe to `useTopupStatusPolling`, react to status changes
  - "Cancel" button calls `cancelTopupRequest()`
  - "Refresh status" manual button
  - **Satisfies**: Req 4.7, 6.1–6.2

- [ ] **FE-6** — Create `src/app/portal/wallet/checkout-resume-modal.tsx`
  - shadcn `Dialog` with "Continue checkout" and "Later" actions
  - "Continue checkout" → `router.push("/portal/checkout?resume=1")`
  - "Later" → close, preserve cart + pendingCheckout
  - **Satisfies**: Req 6.3–6.5

- [ ] **FE-7** — Update `src/app/portal/wallet/page.tsx`
  - Convert to server component shell + `WalletPageClient` child
  - Pass `returnTo` and `balance` from server to client
  - Client renders `InsufficientBalanceBanner` when appropriate
  - Add "Top up" button that opens `TopupDialog`
  - Wire `useTopupStatusPolling` to open `CheckoutResumeModal` on completion when `pendingCheckout=true`
  - **Satisfies**: Req 3.3, 6.3

- [ ] **FE-8** — Create `src/app/portal/checkout/page.tsx`
  - Client component, reads `?resume=1`
  - Redirect to `/portal/wallet` if cart is empty
  - Auto-invoke `checkoutCart()` once on mount via `useEffect` + guard ref
  - On success: clear cart + flag, navigate to `/portal/orders/{orderId}`
  - On `INSUFFICIENT_BALANCE`: redirect to `/portal/wallet?returnTo=checkout`
  - On other errors: inline error UI with "Back to wallet" link
  - **Satisfies**: Req 6.4, 6.6, Property 13

- [ ] **FE-9** — Wire `CartCheckoutButton` into the portal cart sheet
  - Add `CartCheckoutButton` to the existing cart sheet/popover in the portal layout
  - Ensure it only renders for authenticated `customer` sessions
  - **Satisfies**: Req 1.1

- [ ] **FE-10** — Bind `ownerCustomerId` in portal layout
  - In `src/app/portal/layout.tsx` (or a client wrapper), call `cart.bindOwner(userId)` after Clerk session resolves
  - **Satisfies**: Req 7.5, Property 12

---

## Completion Checklist

- [ ] All DB tasks done, migration applied, no TypeScript errors
- [ ] All BE tasks done, `pnpm build` passes
- [ ] All INT tasks done, webhook route returns correct status codes
- [ ] All FE tasks done, portal checkout flow works end-to-end
- [ ] `.env.example` updated with all new vars
- [ ] `tasks.md` updated with all tasks marked done
