# Requirements Document

## Introduction

This feature delivers an end-to-end self-serve checkout flow for customers in the GoAds portal. Today, customers can browse the shop and add items to a client-side cart, but only an admin can create paid orders via `createOrder()` after manually topping up the customer's wallet. This feature closes that gap by allowing customers to:

1. Check out their cart themselves, with an automatic wallet balance check before payment.
2. Top up their wallet on demand via the Wise payment gateway, using a QR code that the customer scans with their banking app.
3. Resume their pending checkout automatically after a successful top-up.

The feature also tightens the admin order lifecycle so that the order status transitions from `paid` → `processing` → `delivered` automatically as items are delivered, removing the need for manual status updates.

The deliverable for this spec is a markdown plan broken down by layer (DB, Backend, Frontend, Integration) with a checklist; that breakdown will be produced in the design and tasks phases. This document captures the requirements, properties, and acceptance criteria that those tasks must satisfy.

## Glossary

- **Customer**: A user with role `customer` in the Clerk session metadata.
- **Admin**: A user with role `super_admin` or `staff`.
- **Cart**: The client-side, `localStorage`-backed cart managed by `CartProvider` (`src/lib/cart-context.tsx`). Each entry holds `id`, `name`, `price`, `quantity`, `unit`.
- **Cart_Total**: Sum of `price * quantity` across all cart items, recomputed server-side at checkout using authoritative product/customer prices.
- **Wallet_Balance**: The numeric `balance` column on the `user` table, in USD.
- **Customer_Price**: A per-customer override price stored in `customer_price`. When present, it replaces the default `product.price` for that customer.
- **Pending_Checkout_Flag**: A `localStorage` flag (`pendingCheckout: true`) plus a snapshot of the cart, set when the customer was redirected from checkout to the wallet because of insufficient funds.
- **Topup_Request**: A new database record representing a customer-initiated request to add funds via Wise. Has lifecycle: `pending` → `completed` | `failed` | `expired` | `cancelled`.
- **Wise_Gateway**: The Wise payment integration that returns a payment QR code for a given amount and reference and notifies the application when the payment clears.
- **Checkout_Action**: The `checkoutCart()` server action introduced by this feature. Customer-only counterpart to the existing admin `createOrder()`.
- **Order_Status**: The `order_status` enum (`pending`, `paid`, `processing`, `delivered`, `completed`, `cancelled`).
- **Delivered_Count**: Number of rows in `delivered_item` for an order at a given point in time.
- **Total_Items**: `SUM(quantity)` of an order's `order_item` rows. (See open question below; the existing code uses row count.)
- **Wallet_Topup_Page**: `/portal/wallet`, extended in this feature with a top-up entry point and a contextual banner.
- **Checkout_Resume_Modal**: Post-topup dialog that asks the customer whether to resume the pending checkout.

## Requirements

### Requirement 1: Client-Side Checkout Initiation and Balance Pre-Check

**User Story:** As a Customer, I want the portal to check my wallet balance before charging me, so that I am not surprised by a failed checkout.

#### Acceptance Criteria

1. WHILE the cart contains at least one item, THE Portal SHALL render a "Checkout" control in the cart UI.
2. WHEN the Customer activates the "Checkout" control, THE Portal SHALL fetch the current Wallet_Balance from the server before proceeding.
3. WHEN Wallet_Balance is greater than or equal to Cart_Total, THE Portal SHALL invoke the Checkout_Action.
4. WHEN Wallet_Balance is less than Cart_Total, THE Portal SHALL display a toast that names the shortfall amount in USD and SHALL navigate the Customer to `/portal/wallet?returnTo=checkout`.
5. WHEN the Portal redirects to the wallet page due to insufficient funds, THE Portal SHALL preserve the cart contents in `localStorage` and SHALL set the Pending_Checkout_Flag to `true`.
6. IF the Customer is not authenticated when activating "Checkout", THEN THE Portal SHALL redirect the Customer to the sign-in flow without clearing the cart.
7. IF the cart is empty when "Checkout" is activated, THEN THE Portal SHALL disable the "Checkout" control and SHALL NOT invoke the Checkout_Action.

### Requirement 2: Server-Side Checkout Action (`checkoutCart`)

**User Story:** As a Customer, I want the server to atomically validate, charge, and create my order, so that I can never be charged without an order or vice versa.

#### Acceptance Criteria

1. WHEN the Checkout_Action is invoked, THE Server SHALL verify the caller has role `customer` and SHALL reject the request otherwise.
2. WHEN the Checkout_Action is invoked, THE Server SHALL validate the input cart against a Zod schema that requires at least one item, integer quantities greater than zero, and string product IDs.
3. WHEN the Checkout_Action is invoked, THE Server SHALL load every referenced product and SHALL reject the request if any product does not exist or is not active.
4. WHEN the Checkout_Action computes pricing, THE Server SHALL use the Customer_Price for each product when present, and SHALL fall back to `product.price` otherwise.
5. WHEN the Checkout_Action computes Cart_Total, THE Server SHALL ignore any prices supplied by the client.
6. WHEN the Checkout_Action begins charging, THE Server SHALL open a database transaction that takes a row-level lock on the customer's `user` row before reading Wallet_Balance.
7. WHILE inside the checkout transaction, IF Wallet_Balance is less than Cart_Total, THEN THE Server SHALL abort the transaction and SHALL return an `INSUFFICIENT_BALANCE` error containing both required and available amounts.
8. WHILE inside the checkout transaction, THE Server SHALL deduct Cart_Total from Wallet_Balance, insert one `order` row with `status = "paid"` and `paymentDate = now()`, insert one `order_item` row per cart line with the resolved unit price, and insert one `wallet_transaction` row of type `deduct` with `balanceAfter` equal to the new balance and `orderId` referencing the new order.
9. WHEN the checkout transaction commits, THE Server SHALL return `{ success: true, orderId }`.
10. WHEN the checkout transaction commits, THE Server SHALL emit an `order_created` notification to the Customer using `createNotification()`, and notification failure SHALL NOT roll back the order.
11. WHEN the Checkout_Action returns success to the client, THE Portal SHALL clear the cart, clear the Pending_Checkout_Flag, and navigate to `/portal/orders/{orderId}`.
12. IF the Checkout_Action returns `INSUFFICIENT_BALANCE`, THEN THE Portal SHALL retain the cart, set the Pending_Checkout_Flag, and redirect to `/portal/wallet?returnTo=checkout`.
13. IF any non-balance validation error occurs (missing product, invalid quantity, inactive product), THEN THE Portal SHALL display the server's error message and SHALL retain the cart unchanged.

### Requirement 3: Wallet Page Top-Up Entry Point

**User Story:** As a Customer arriving at the wallet page from a failed checkout, I want clear context and a one-click way to top up exactly what I need, so that I can continue my purchase quickly.

#### Acceptance Criteria

1. WHERE the request URL contains `returnTo=checkout` and Pending_Checkout_Flag is `true`, THE Wallet_Topup_Page SHALL render a banner with `variant=destructive` styling that displays the required top-up amount, computed exactly as `max(0, Cart_Total - Wallet_Balance)` rounded up to two decimals, with no rounding tolerance.
2. WHILE the Pending_Checkout_Flag banner is visible, THE Wallet_Topup_Page SHALL include a primary "Top up now" action that opens the top-up dialog pre-filled with the required amount.
3. THE Wallet_Topup_Page SHALL provide a "Top up" control that opens the top-up dialog regardless of whether a pending checkout exists.
4. WHEN the Customer opens the top-up dialog, THE Wallet_Topup_Page SHALL allow entering an amount in USD with two-decimal precision and SHALL reject amounts less than the configured minimum top-up amount.
5. WHEN the Customer submits the top-up dialog, THE Portal SHALL invoke the `createTopupRequest()` server action.

### Requirement 4: Topup Request Creation and Wise QR Generation

**User Story:** As a Customer, I want to receive a payment QR code immediately when I request a top-up, so that I can pay with my banking app.

#### Acceptance Criteria

1. WHEN `createTopupRequest()` is invoked, THE Server SHALL verify the caller has role `customer` and SHALL reject the request otherwise.
2. WHEN `createTopupRequest()` is invoked, THE Server SHALL validate the requested amount is a positive number with at most two decimal places and is within `[MIN_TOPUP_USD, MAX_TOPUP_USD]` (configured via environment).
3. WHEN `createTopupRequest()` is invoked with valid input, THE Server SHALL insert one `topup_request` row with `status = "pending"`, `amount`, `currency = "USD"`, `customerId`, a unique `reference` string, an `expiresAt` timestamp, and timestamps.
4. WHEN `createTopupRequest()` is invoked with valid input, THE Server SHALL call Wise_Gateway to create a payment intent for the row's `reference` and amount, and SHALL persist the returned `paymentUrl`, `qrCodeData`, and `gatewayPaymentId` on the `topup_request` row.
5. IF Wise_Gateway returns an error, THEN THE Server SHALL mark the `topup_request` as `status = "failed"` with the error message and SHALL return `{ success: false, error }` to the caller.
6. WHEN `createTopupRequest()` succeeds, THE Server SHALL return `{ success: true, topupRequestId, qrCodeData, expiresAt }`.
7. WHEN the top-up dialog receives a successful response, THE Portal SHALL render the QR code, the amount, and a countdown until `expiresAt`, and SHALL provide a "Cancel" control that calls `cancelTopupRequest()`.

### Requirement 5: Wise Webhook Confirmation and Wallet Credit

**User Story:** As the System, I want to credit the customer's wallet only when Wise confirms the payment, so that funds are accurate and idempotent.

#### Acceptance Criteria

1. THE Server SHALL expose a webhook endpoint at `/api/webhooks/wise` that accepts POST requests from Wise_Gateway.
2. WHEN the webhook endpoint receives a request, THE Server SHALL verify the request signature against the configured Wise webhook secret and SHALL respond with HTTP 401 if verification fails.
3. WHEN the webhook reports a successful payment for a `topup_request`, THE Server SHALL look up the `topup_request` by `gatewayPaymentId` or `reference` and SHALL verify the reported amount matches the stored amount within a tolerance of zero cents.
4. IF the webhook payload references an unknown `topup_request`, THEN THE Server SHALL respond with HTTP 404 and SHALL NOT modify the database.
5. IF the webhook payload reports a `topup_request` whose status is already `completed`, THEN THE Server SHALL respond with HTTP 200 and SHALL NOT credit the wallet again.
6. WHEN the webhook reports a confirmed payment for a `pending` `topup_request`, THE Server SHALL execute a database transaction that takes a row-level lock on the customer's `user` row, increments Wallet_Balance by the request's amount, inserts one `wallet_transaction` of type `topup` with `balanceAfter` equal to the new balance, and updates the `topup_request` to `status = "completed"` with `completedAt = now()`.
7. IF the user-row lock acquired in Requirement 5.6 cannot be obtained (e.g., `lock_timeout` exceeded), THEN THE Server SHALL abort the transaction and SHALL respond with HTTP 503 so that Wise_Gateway will retry, and SHALL NOT modify Wallet_Balance.
8. WHEN the webhook reports a failed payment, THE Server SHALL update the `topup_request` to `status = "failed"` with the failure reason and SHALL NOT modify Wallet_Balance.
9. WHEN the webhook completes a top-up successfully, THE Server SHALL emit a `balance_topup` notification to the Customer using `createNotification()`.
10. WHILE a `topup_request` is in `pending` status and `expiresAt` has elapsed, A scheduled job SHALL transition the row to `status = "expired"` so that no later webhook delivery can credit the wallet.

### Requirement 6: Post-Topup Resume of Pending Checkout

**User Story:** As a Customer, I want to be prompted to continue my checkout right after my top-up clears, so that I do not have to re-navigate the cart.

#### Acceptance Criteria

1. WHILE the top-up dialog is open and the active `topup_request` is in `pending` status, THE Portal SHALL poll its status at most once every 3 seconds and SHALL stop polling when status changes or when `expiresAt` is reached.
2. WHEN the polled `topup_request` transitions to `completed`, THE Portal SHALL display a success toast that includes the new Wallet_Balance.
3. WHEN the polled `topup_request` transitions to `completed` and the Pending_Checkout_Flag is `true`, THE Portal SHALL render the Checkout_Resume_Modal that displays the new balance, the saved Cart_Total, and two actions: "Continue checkout" and "Later".
4. WHEN the Customer activates "Continue checkout", THE Portal SHALL navigate to `/portal/checkout?resume=1` and SHALL invoke the Checkout_Action automatically on arrival.
5. IF the Customer activates "Later", THEN THE Portal SHALL keep the cart and Pending_Checkout_Flag intact and SHALL close the modal.
6. IF the auto-resumed Checkout_Action fails with a non-balance error, THEN THE Portal SHALL display the error and SHALL NOT clear the Pending_Checkout_Flag.

### Requirement 7: Cart Persistence and Recovery

**User Story:** As a Customer, I want my cart to survive navigation, refresh, and the top-up flow, so that I never lose my selections.

#### Acceptance Criteria

1. WHEN the Portal modifies the cart, THE Portal SHALL persist the new state to `localStorage` under the existing `goads-cart` key before notifying subscribers.
2. WHEN the Portal hydrates on page load, THE Portal SHALL read `localStorage` and SHALL restore the cart state, defaulting to an empty cart on parse failure.
3. WHEN the Checkout_Action returns success, THE Portal SHALL clear the cart and remove the Pending_Checkout_Flag and the saved Cart_Total snapshot from `localStorage`.
4. WHILE the Pending_Checkout_Flag is `true`, THE Portal SHALL NOT clear or overwrite the saved cart from any code path other than a successful Checkout_Action or an explicit user "Empty cart" action.
5. IF a different user signs in than the one who created the cart (detected by comparing the stored `customerId` against the active session), THEN THE Portal SHALL clear the cart and Pending_Checkout_Flag on hydration.

### Requirement 8: Idempotency and Safety Properties of Checkout

**User Story:** As the System Owner, I want the checkout flow to be safe under double-clicks, retries, and concurrent topups, so that wallet accounting is always correct.

#### Acceptance Criteria

1. THE Checkout_Action SHALL be a Single-Order operation: a single invocation SHALL produce at most one `order` row and one `wallet_transaction` row.
2. THE Checkout_Action SHALL preserve the invariant `wallet_transaction.balanceAfter >= 0` for every row it inserts.
3. FOR ALL successful checkouts, THE invariant `Wallet_Balance_after = Wallet_Balance_before - Cart_Total` SHALL hold, where Cart_Total is computed from the resulting `order_item` rows.
4. FOR ALL successful checkouts, THE invariant `SUM(order_item.unitPrice * order_item.quantity) = order.totalAmount` SHALL hold for the inserted order.
5. WHEN two Checkout_Action invocations for the same Customer execute concurrently and the Customer has only enough balance for one, THE Server SHALL succeed exactly one and SHALL fail the other with `INSUFFICIENT_BALANCE`.
6. THE Wise webhook handler SHALL be idempotent: replaying the same successful webhook payload any number of times SHALL credit the wallet exactly once and SHALL leave the `topup_request` in `completed` status.
7. FOR ALL completed top-ups via webhook, THE invariant `Wallet_Balance_after = Wallet_Balance_before + topup_request.amount` SHALL hold at the moment the topup row transitions to `completed`.

### Requirement 9: Admin Order Status Auto-Transitions on Delivery

**User Story:** As an Admin, I want order status to advance automatically as I deliver items, so that I do not have to update statuses manually.

#### Acceptance Criteria

1. WHEN `deliverOrderItem()` inserts a `delivered_item` and the parent order's current status is `paid`, THE Server SHALL update the order's status to `processing` within the same transaction.
2. WHEN `deliverOrderItem()` inserts a `delivered_item` and Delivered_Count reaches Total_Items for the order, THE Server SHALL update the order's status to `delivered` and SHALL set `deliveredAt = now()` within the same transaction.
3. WHILE the order's current status is `processing` and Delivered_Count is less than Total_Items, THE Server SHALL NOT change the order's status.
4. IF `deliverOrderItem()` is invoked for an order whose current status is `cancelled` or `completed`, THEN THE Server SHALL reject the call with an explanatory error and SHALL NOT insert a `delivered_item`.
5. WHEN the auto-transition to `processing` or `delivered` occurs, THE Server SHALL set `order.updatedAt = now()`.
6. THE auto-transition logic SHALL be monotonic: status SHALL progress only in the order `paid` → `processing` → `delivered` and SHALL never regress.

### Requirement 10: Topup Request Persistence Schema

**User Story:** As a Developer, I want a single source of truth for top-up state, so that webhooks, polling, and resume logic all reconcile correctly.

#### Acceptance Criteria

1. THE Database SHALL include a new table `topup_request` with columns: `id` (text, PK), `customerId` (text, FK to `user.id`), `amount` (numeric(12,2), not null), `currency` (text, default `USD`), `status` (enum: `pending`, `completed`, `failed`, `expired`, `cancelled`, default `pending`), `reference` (text, unique, not null), `gatewayPaymentId` (text, nullable), `paymentUrl` (text, nullable), `qrCodeData` (text, nullable), `expiresAt` (timestamp, not null), `completedAt` (timestamp, nullable), `failureReason` (text, nullable), `createdAt` (timestamp, default now), `updatedAt` (timestamp, default now).
2. THE Database SHALL define a unique index on `topup_request.reference` and a non-unique index on `(customerId, status)`.
3. THE Database SHALL define a new enum `topup_request_status` for the `status` column.
4. WHEN a `wallet_transaction` of type `topup` is created from a webhook, THE Server SHALL store the originating `topup_request.id` in the `wallet_transaction.note` column or in a new `topupRequestId` column (decision deferred to design).

### Requirement 11: Layered Task Plan Deliverable

**User Story:** As the Project Owner, I want the implementation broken down by layer with a checklist, so that I can track progress across DB, BE, and FE work.

#### Acceptance Criteria

1. THE design.md document SHALL include sections for Database Layer, Backend Layer, Frontend Layer, and Integration Layer (Wise gateway and webhook).
2. THE tasks.md document SHALL group tasks by the same four layers.
3. THE tasks.md document SHALL render every task as a Markdown checklist item (`- [ ]`).
4. THE tasks.md document SHALL list each task with: a numeric ID, a short imperative title, a one-line description, the file paths it touches, and the requirements it satisfies (by ID).
5. THE tasks.md document SHALL list at least one explicit task for: the new `topup_request` schema and migration; the `checkoutCart()` server action; the `createTopupRequest()` and `cancelTopupRequest()` server actions; the Wise gateway client module; the `/api/webhooks/wise` route; the wallet page banner and top-up dialog; the cart checkout button and pre-check; the post-topup resume modal; the `deliverOrderItem()` auto-transition update; and tests covering Requirement 8 (idempotency and safety properties).

## Open Questions for Design Phase

The following items are intentionally left to be resolved in `design.md`:

- Whether `Total_Items` should be `COUNT(order_item)` (current `deliverOrderItem` behavior) or `SUM(order_item.quantity)`. The current code uses `COUNT`, which is wrong for orders where any line has `quantity > 1`. The design phase should pick one and align Requirement 9 accordingly.
- Whether `wallet_transaction` gains a typed `topupRequestId` FK or reuses the `note` column.
- Whether the post-topup resume polling lives in a shared hook or inline in the dialog.
- Whether the Wise integration uses webhook only or webhook + on-demand status poll as a fallback.
