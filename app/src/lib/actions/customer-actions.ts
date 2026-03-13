"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

import { auth, currentUser, createClerkClient } from "@clerk/nextjs/server";
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
  const { userId } = await auth();
  if (!userId) return { success: false, error: "Unauthorized" };

  const adminUser = await currentUser();
  const role = (adminUser?.publicMetadata?.role as string) ?? "customer";
  if (role !== "super_admin" && role !== "staff") {
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
  const [firstName, ...rest] = name.trim().split(" ");
  const lastName = rest.join(" ") || undefined;

  try {
    const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY! });

    const clerkUser = await clerk.users.createUser({
      emailAddress: [email],
      password,
      firstName,
      lastName,
      publicMetadata: { role: "customer" },
    });

    // Upsert local DB user row with business data
    await db
      .insert(users)
      .values({
        id: clerkUser.id,
        name,
        email,
        role: "customer",
        telegramId: telegramId ?? null,
        notes: notes ?? null,
      })
      .onConflictDoUpdate({
        target: users.id,
        set: {
          role: "customer",
          telegramId: telegramId ?? null,
          notes: notes ?? null,
        },
      });

    revalidatePath("/admin/customers");
    return { success: true, customerId: clerkUser.id };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    // Clerk throws on duplicate email
    if (
      message.toLowerCase().includes("email") ||
      message.includes("already") ||
      message.includes("23505")
    ) {
      return { success: false, error: "Email address is already in use" };
    }
    return { success: false, error: "Failed to create customer" };
  }
}
