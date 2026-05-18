import { z } from "zod";

export const checkoutItemSchema = z.object({
  productId: z.string().min(1, "Product ID is required"),
  quantity: z.coerce.number().int().positive().max(100, "Quantity cannot exceed 100"),
});

/**
 * Schema for the customer self-serve checkout action.
 * Intentionally does NOT include a price field — server resolves pricing
 * from the DB to prevent client-side price manipulation.
 */
export const checkoutCartSchema = z.object({
  items: z.array(checkoutItemSchema).min(1, "Cart is empty"),
});

export type CheckoutCartInput = z.infer<typeof checkoutCartSchema>;
