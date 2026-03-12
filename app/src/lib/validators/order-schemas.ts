import { z } from "zod";

export const orderItemSchema = z.object({
  productId: z.string().min(1, "Select a product"),
  quantity: z.coerce.number().int().positive().max(100),
});

export const createOrderSchema = z.object({
  customerId: z.string().min(1, "Select a customer"),
  items: z.array(orderItemSchema).min(1, "Add at least one product"),
  notes: z.string().optional(),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;
