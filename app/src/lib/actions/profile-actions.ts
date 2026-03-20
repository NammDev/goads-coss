"use server";

import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";

/** Update current user's community profile */
export async function updateProfile(data: {
  username?: string;
  bio?: string;
  avatarUrl?: string;
}) {
  const { userId } = await auth();
  if (!userId) return { success: false, error: "Unauthorized" };

  // Validate username format
  if (data.username) {
    const clean = data.username.toLowerCase().replace(/[^a-z0-9_-]/g, "");
    if (clean.length < 3 || clean.length > 30) {
      return { success: false, error: "Username must be 3-30 characters (letters, numbers, _ -)" };
    }

    // Check uniqueness
    const existing = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.username, clean))
      .limit(1);

    if (existing[0] && existing[0].id !== userId) {
      return { success: false, error: "Username already taken" };
    }

    data.username = clean;
  }

  // Trim bio
  if (data.bio !== undefined) {
    data.bio = data.bio.trim().slice(0, 300) || undefined;
  }

  await db
    .update(users)
    .set({
      ...(data.username !== undefined && { username: data.username }),
      ...(data.bio !== undefined && { bio: data.bio }),
      ...(data.avatarUrl !== undefined && { avatarUrl: data.avatarUrl }),
      updatedAt: new Date(),
    })
    .where(eq(users.id, userId));

  revalidatePath("/portal/community");
  revalidatePath("/portal/profile");
  return { success: true };
}
