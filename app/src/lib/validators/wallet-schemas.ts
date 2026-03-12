import { z } from "zod";

export const topupSchema = z.object({
  customerId: z.string().min(1, "Customer ID is required"),
  amount: z.coerce
    .number()
    .positive("Amount must be positive")
    .max(999999, "Amount cannot exceed 999,999"),
  note: z.string().optional(),
});

export type TopupInput = z.infer<typeof topupSchema>;
