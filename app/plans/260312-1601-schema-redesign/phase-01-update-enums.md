# Phase 1: Update Enums

## Overview
- **Priority:** High
- **Status:** TODO
- **File:** `src/lib/db/schema/enums.ts`

## Changes

### order_status enum
```
BEFORE: pending, paid, processing, shipped, completed, cancelled
AFTER:  pending, paid, processing, delivered, completed, cancelled
```

### payment_method enum
```
BEFORE: bank_transfer, crypto, other
AFTER:  crypto, wise, paypal, other
```

### product_type enum
Add missing types if needed. Current list is OK.

## Related Files
- Modify: `src/lib/db/schema/enums.ts`
- Check: `src/lib/db/schema/order-tables.ts` (references enums)

## Implementation Steps
1. Update `orderStatusEnum`: replace `shipped` → `delivered`
2. Update `paymentMethodEnum`: remove `bank_transfer`, add `wise`, `paypal`
3. Run `npx drizzle-kit generate` to create migration

## Todo
- [ ] Update orderStatusEnum
- [ ] Update paymentMethodEnum
- [ ] Verify no code references `shipped` or `bank_transfer`

## Risk
- Enum changes require DB migration — existing data with old values will break
- Since DB is fresh (only test accounts), safe to drop and recreate
