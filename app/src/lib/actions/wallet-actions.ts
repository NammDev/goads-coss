"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { eq, sql } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";

import { auth } from "@/lib/auth/auth";
import { db } from "@/lib/db";
import { users, walletTransactions } from "@/lib/db/schema";
import { topupSchema } from "@/lib/validators/wallet-schemas";

type TopupResult =
  | { success: true; newBalance: string }
  | { success: false; error: string };

export async function topupBalance(formData: FormData): Promise<TopupResult> {
  // Role guard
  const session = await auth.api.getSession({ headers: await headers() });
  if (
    !session ||
    (session.user.role !== "super_admin" && session.user.role !== "staff")
  ) {
    return { success: false, error: "Unauthorized" };
  }

  // Validate input
  const raw = {
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    note: formData.get("note") || undefined,
  };

  const parsed = topupSchema.safeParse(raw);
  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message ?? "Validation failed";
    return { success: false, error: firstError };
  }

  const { customerId, amount, note } = parsed.data;
  const adminId = session.user.id;

  try {
    const newBalance = await db.transaction(async (tx) => {
      // Lock the user row to prevent concurrent topup race conditions
      const rows = await tx.execute(
        sql`SELECT balance FROM "user" WHERE id = ${customerId} FOR UPDATE`
      );

      const currentRow = (rows as unknown as { balance: string }[])[0];
      if (!currentRow) throw new Error("Customer not found");

      const currentBalance = parseFloat(currentRow.balance ?? "0");
      const updated = parseFloat((currentBalance + amount).toFixed(2));
      const updatedStr = updated.toFixed(2);

      await tx
        .update(users)
        .set({ balance: updatedStr })
        .where(eq(users.id, customerId));

      await tx.insert(walletTransactions).values({
        id: createId(),
        customerId,
        type: "topup",
        amount: amount.toFixed(2),
        balanceAfter: updatedStr,
        note: note ?? null,
        createdBy: adminId,
      });

      return updatedStr;
    });

    revalidatePath(`/admin/customers/${customerId}`);
    revalidatePath("/admin/customers");
    return { success: true, newBalance };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    if (message === "Customer not found") {
      return { success: false, error: "Customer not found" };
    }
    return { success: false, error: "Failed to process topup" };
  }
}
