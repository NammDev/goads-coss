# Phase 4B: Admin Create Customer

## Context Links
- [Plan overview](./plan.md)
- [Existing customers page](../../src/app/admin/customers/page.tsx)
- [Customer queries](../../src/lib/db/queries/customer-queries.ts)
- [Better Auth config](../../src/lib/auth/auth.ts)

## Overview
- **Priority:** P1
- **Status:** pending
- **Effort:** 1.5h
- **Depends on:** Phase 4A (balance field)

Admin can create customer accounts with name, email, password, optional telegramId.

## Requirements

### Functional
- Form with: name, email, password, telegramId (optional), notes (optional)
- Validates email uniqueness
- Sets role = "customer", balance = 0
- Shows success/error feedback
- Customer appears in customers table immediately after creation

### Non-functional
- Server Action with admin role guard
- Zod validation on server side
- Password min 8 chars (matching Better Auth config)

## Architecture

Admin clicks "Add Customer" button on customers page -> Dialog opens with form ->
Submit calls `createCustomer` server action -> Better Auth `signUpEmail` API or
direct DB insert -> revalidatePath -> dialog closes, table refreshes.

**Decision:** Use Better Auth's internal signup to ensure proper password hashing + account creation. Call `auth.api.signUpEmail` server-side, then update custom fields (role, telegramId, notes) via direct DB update.

## Related Code Files

### Create
- `src/app/admin/customers/create-customer-dialog.tsx` — client component, form + dialog
- `src/lib/actions/customer-actions.ts` — server action `createCustomer`
- `src/lib/validators/customer-schemas.ts` — Zod schema for create customer form

### Modify
- `src/app/admin/customers/page.tsx` — add "Add Customer" button that opens dialog
- `src/app/admin/customers/customers-table.tsx` — pass toolbar prop with create button

## Implementation Steps

1. Create `src/lib/validators/customer-schemas.ts`:
   ```ts
   import { z } from "zod";
   export const createCustomerSchema = z.object({
     name: z.string().min(1, "Name required"),
     email: z.string().email("Invalid email"),
     password: z.string().min(8, "Min 8 characters"),
     telegramId: z.string().optional(),
     notes: z.string().optional(),
   });
   ```

2. Create `src/lib/actions/customer-actions.ts`:
   ```ts
   "use server"
   // - requireRole('super_admin', 'staff')
   // - parse with createCustomerSchema
   // - call auth.api.signUpEmail({ body: { name, email, password } })
   // - update user row: set role, telegramId, notes via db.update(users)
   // - revalidatePath('/admin/customers')
   // - return { success: true } or { error: string }
   ```

3. Create `src/app/admin/customers/create-customer-dialog.tsx`:
   - Use shadcn Dialog + form fields
   - useActionState or useTransition for pending state
   - Close dialog on success, show toast on error
   - Fields: name, email, password, telegramId, notes

4. Update `customers-table.tsx`:
   - Add toolbar prop with CreateCustomerDialog trigger button

5. Update `page.tsx` if needed (likely no change since toolbar goes through table).

## Todo List
- [ ] Create Zod schema in customer-schemas.ts
- [ ] Create server action in customer-actions.ts
- [ ] Create dialog component create-customer-dialog.tsx
- [ ] Wire dialog into customers page via toolbar
- [ ] Test: create customer, verify appears in table
- [ ] Test: duplicate email shows error
- [ ] Test: validation errors display properly

## Success Criteria
- Admin can create customer from UI
- Customer gets proper role, hashed password, optional fields
- Duplicate email prevented with clear error
- Table refreshes after creation
- No unauthorized access (role guard works)

## Risk Assessment
- **Better Auth signUpEmail:** May set session cookies for the new user. Use `auth.api.signUpEmail` with `asResponse: false` and ignore session. Alternative: direct DB insert with manual bcrypt hashing. Prefer BA API first, fallback to direct insert if session issue arises.
- **Email uniqueness:** BA handles this, will throw error. Catch and return user-friendly message.

## Security Considerations
- Server action guarded by `requireRole('super_admin', 'staff')`
- Password hashed by Better Auth (bcrypt)
- Admin cannot set role via form (hardcoded to "customer")
