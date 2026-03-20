"use server";

import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import {
  communityPosts,
  communityReplies,
  communityReports,
  users,
} from "@/lib/db/schema";
import type { CommunityPost } from "@/lib/db/queries/community-queries";

/** Require admin/staff role */
async function requireAdmin() {
  const { userId } = await auth();
  if (!userId) return { userId: null, error: "Unauthorized" } as const;

  const user = await db
    .select({ role: users.role })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  if (!user[0] || (user[0].role !== "super_admin" && user[0].role !== "staff")) {
    return { userId: null, error: "Admin access required" } as const;
  }

  return { userId, error: null } as const;
}

/** Review a report — approve, hide content, or dismiss */
export async function reviewReport(
  reportId: string,
  action: "approve" | "hide" | "dismiss",
) {
  const { userId, error } = await requireAdmin();
  if (error) return { success: false, error };

  const report = await db
    .select()
    .from(communityReports)
    .where(eq(communityReports.id, reportId))
    .limit(1);

  if (!report[0]) return { success: false, error: "Report not found" };

  await db
    .update(communityReports)
    .set({ status: action === "approve" ? "reviewed" : action === "hide" ? "reviewed" : "dismissed", reviewedBy: userId })
    .where(eq(communityReports.id, reportId));

  // If "hide", hide the reported post or reply
  if (action === "hide") {
    if (report[0].postId) {
      await db
        .update(communityPosts)
        .set({ isHidden: true })
        .where(eq(communityPosts.id, report[0].postId));
    }
    if (report[0].replyId) {
      await db
        .update(communityReplies)
        .set({ isHidden: true })
        .where(eq(communityReplies.id, report[0].replyId));
    }
  }

  revalidatePath("/admin/community");
  return { success: true };
}

/** Toggle pin status on a post */
export async function togglePin(postId: string) {
  const { error } = await requireAdmin();
  if (error) return { success: false, error };

  const post = await db
    .select({ isPinned: communityPosts.isPinned })
    .from(communityPosts)
    .where(eq(communityPosts.id, postId))
    .limit(1);

  if (!post[0]) return { success: false, error: "Post not found" };

  await db
    .update(communityPosts)
    .set({ isPinned: !post[0].isPinned })
    .where(eq(communityPosts.id, postId));

  revalidatePath("/portal/community");
  return { success: true };
}

/** Update post status (for feedback flow: open→in_review→planned→...) */
export async function updatePostStatus(
  postId: string,
  status: CommunityPost["status"],
) {
  const { error } = await requireAdmin();
  if (error) return { success: false, error };

  await db
    .update(communityPosts)
    .set({ status, updatedAt: new Date() })
    .where(eq(communityPosts.id, postId));

  revalidatePath("/portal/community");
  return { success: true };
}
