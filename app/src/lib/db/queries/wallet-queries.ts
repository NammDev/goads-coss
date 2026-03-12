import { eq, desc } from "drizzle-orm";
import { db } from "@/lib/db";
import { walletTransactions, users } from "@/lib/db/schema";
import type { InferSelectModel } from "drizzle-orm";

export type WalletTransaction = InferSelectModel<typeof walletTransactions>;

/** Get wallet transactions for a customer, newest first */
export async function getWalletTransactions(
  customerId: string
): Promise<WalletTransaction[]> {
  return db
    .select()
    .from(walletTransactions)
    .where(eq(walletTransactions.customerId, customerId))
    .orderBy(desc(walletTransactions.createdAt));
}

/** Get current balance for a customer */
export async function getCustomerBalance(
  customerId: string
): Promise<string | null> {
  const rows = await db
    .select({ balance: users.balance })
    .from(users)
    .where(eq(users.id, customerId));

  return rows[0]?.balance ?? null;
}
