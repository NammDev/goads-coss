"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { eq } from "drizzle-orm";

import { auth } from "@/lib/auth/auth";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { createCustomerSchema } from "@/lib/validators/customer-schemas";

type CreateCustomerResult =
  | { success: true; customerId: string }
  | { success: false; error: string };

export async function createCustomer(
  formData: FormData
): Promise<CreateCustomerResult> {
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
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    telegramId: formData.get("telegramId") || undefined,
    notes: formData.get("notes") || undefined,
  };

  const parsed = createCustomerSchema.safeParse(raw);
  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message ?? "Validation failed";
    return { success: false, error: firstError };
  }

  const { name, email, password, telegramId, notes } = parsed.data;

  try {
    // Use Better Auth to create account with proper password hashing
    const result = await auth.api.signUpEmail({
      body: { name, email, password },
    });

    if (!result?.user?.id) {
      return { success: false, error: "Failed to create account" };
    }

    // Update custom fields: role stays "customer", add telegramId/notes
    await db
      .update(users)
      .set({
        role: "customer",
        telegramId: telegramId ?? null,
        notes: notes ?? null,
      })
      .where(eq(users.id, result.user.id));

    revalidatePath("/admin/customers");
    return { success: true, customerId: result.user.id };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    // Better Auth throws on duplicate email
    if (message.toLowerCase().includes("email") || message.includes("23505")) {
      return { success: false, error: "Email address is already in use" };
    }
    return { success: false, error: "Failed to create customer" };
  }
}
