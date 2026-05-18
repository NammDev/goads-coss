import { z } from "zod";

/**
 * Returns the topup amount schema with bounds read from env at call time.
 * Using a function form makes the schema env-mockable in tests.
 */
export function topupSchemaForEnv() {
  const min = Number(process.env.MIN_TOPUP_USD ?? 10);
  const max = Number(process.env.MAX_TOPUP_USD ?? 10000);

  return z.object({
    amount: z.coerce
      .number()
      .positive("Amount must be positive")
      .multipleOf(0.01, "Amount must have at most 2 decimal places")
      .min(min, `Minimum top-up amount is $${min}`)
      .max(max, `Maximum top-up amount is $${max}`),
  });
}

export const cancelTopupSchema = z.object({
  topupRequestId: z.string().min(1, "Topup request ID is required"),
});

export const getTopupSchema = z.object({
  topupRequestId: z.string().min(1, "Topup request ID is required"),
});
