"use server";

import { createId } from "@paralleldrive/cuid2";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { eq, and, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import {
  communityPosts,
  communityReplies,
  communityUpvotes,
  communitySubscriptions,
  communityViews,
  communityReports,
  users,
} from "@/lib/db/schema";
import { createNotification } from "./notification-actions";

/** Generate URL-friendly slug from title + random suffix */
function generateSlug(title: string): string {
  const base = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
  return `${base}-${createId().slice(0, 6)}`;
}

/** Require auth — returns userId or error response */
async function requireAuth() {
  const { userId } = await auth();
  if (!userId) return { userId: null, error: "Unauthorized" } as const;
  return { userId, error: null } as const;
}

/** Create a new community post */
export async function createPost(data: {
  title: string;
  body: string;
  categoryId: string;
}) {
  const { userId, error } = await requireAuth();
  if (error) return { success: false, error };

  const id = createId();
  const slug = generateSlug(data.title);
  const excerpt = data.body.replace(/[#*_`>\[\]]/g, "").slice(0, 150);

  await db.insert(communityPosts).values({
    id,
    authorId: userId,
    categoryId: data.categoryId,
    title: data.title,
    slug,
    body: data.body,
    excerpt,
  });

  // Auto-subscribe author to their own post
  await db
    .insert(communitySubscriptions)
    .values({ userId, postId: id })
    .onConflictDoNothing();

  revalidatePath("/portal/community");
  return { success: true, slug };
}

/** Update an existing post (author only) */
export async function updatePost(
  postId: string,
  data: { title?: string; body?: string },
) {
  const { userId, error } = await requireAuth();
  if (error) return { success: false, error };

  const post = await db
    .select({ authorId: communityPosts.authorId })
    .from(communityPosts)
    .where(eq(communityPosts.id, postId))
    .limit(1);

  if (!post[0] || post[0].authorId !== userId) {
    return { success: false, error: "Not authorized" };
  }

  const updates: Record<string, unknown> = { updatedAt: new Date() };
  if (data.title) {
    updates.title = data.title;
    updates.slug = generateSlug(data.title);
  }
  if (data.body) {
    updates.body = data.body;
    updates.excerpt = data.body.replace(/[#*_`>\[\]]/g, "").slice(0, 150);
  }

  await db
    .update(communityPosts)
    .set(updates)
    .where(eq(communityPosts.id, postId));

  revalidatePath("/portal/community");
  return { success: true };
}

/** Soft-delete a post (author or admin) */
export async function deletePost(postId: string) {
  const { userId, error } = await requireAuth();
  if (error) return { success: false, error };

  const post = await db
    .select({ authorId: communityPosts.authorId })
    .from(communityPosts)
    .where(eq(communityPosts.id, postId))
    .limit(1);

  if (!post[0]) return { success: false, error: "Post not found" };

  // Check if author or admin
  const user = await db
    .select({ role: users.role })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  const isAdmin =
    user[0]?.role === "super_admin" || user[0]?.role === "staff";
  if (post[0].authorId !== userId && !isAdmin) {
    return { success: false, error: "Not authorized" };
  }

  await db
    .update(communityPosts)
    .set({ isHidden: true })
    .where(eq(communityPosts.id, postId));

  revalidatePath("/portal/community");
  return { success: true };
}

/** Create a reply on a post */
export async function createReply(data: { postId: string; body: string }) {
  const { userId, error } = await requireAuth();
  if (error) return { success: false, error };

  await db.insert(communityReplies).values({
    id: createId(),
    postId: data.postId,
    authorId: userId,
    body: data.body,
  });

  // Increment reply count
  await db
    .update(communityPosts)
    .set({ repliesCount: sql`${communityPosts.repliesCount} + 1` })
    .where(eq(communityPosts.id, data.postId));

  // Auto-subscribe replier
  await db
    .insert(communitySubscriptions)
    .values({ userId, postId: data.postId })
    .onConflictDoNothing();

  // Notify all subscribers except the replier
  const subs = await db
    .select({ userId: communitySubscriptions.userId })
    .from(communitySubscriptions)
    .where(eq(communitySubscriptions.postId, data.postId));

  const post = await db
    .select({ title: communityPosts.title, slug: communityPosts.slug })
    .from(communityPosts)
    .where(eq(communityPosts.id, data.postId))
    .limit(1);

  const replierName = await db
    .select({ name: users.name })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  if (post[0]) {
    for (const sub of subs) {
      if (sub.userId === userId) continue;
      await createNotification({
        userId: sub.userId,
        type: "community_reply",
        title: "New reply",
        message: `${replierName[0]?.name ?? "Someone"} replied to "${post[0].title}"`,
        linkUrl: `/portal/community/${post[0].slug}`,
      });
    }
  }

  revalidatePath("/portal/community");
  return { success: true };
}

/** Mark a reply as the solution (post author only) */
export async function markSolution(postId: string, replyId: string) {
  const { userId, error } = await requireAuth();
  if (error) return { success: false, error };

  const post = await db
    .select({ authorId: communityPosts.authorId, title: communityPosts.title, slug: communityPosts.slug })
    .from(communityPosts)
    .where(eq(communityPosts.id, postId))
    .limit(1);

  if (!post[0] || post[0].authorId !== userId) {
    return { success: false, error: "Only the post author can mark a solution" };
  }

  // Clear previous solution
  await db
    .update(communityReplies)
    .set({ isSolution: false })
    .where(and(eq(communityReplies.postId, postId), eq(communityReplies.isSolution, true)));

  // Mark new solution
  await db
    .update(communityReplies)
    .set({ isSolution: true })
    .where(eq(communityReplies.id, replyId));

  await db
    .update(communityPosts)
    .set({ solvedReplyId: replyId, status: "solved" })
    .where(eq(communityPosts.id, postId));

  // Notify the reply author
  const reply = await db
    .select({ authorId: communityReplies.authorId })
    .from(communityReplies)
    .where(eq(communityReplies.id, replyId))
    .limit(1);

  if (reply[0] && reply[0].authorId !== userId) {
    await createNotification({
      userId: reply[0].authorId,
      type: "community_solution",
      title: "Solution accepted!",
      message: `Your reply was marked as the solution in "${post[0].title}"`,
      linkUrl: `/portal/community/${post[0].slug}`,
    });
  }

  revalidatePath("/portal/community");
  return { success: true };
}

/** Toggle upvote on a post or reply */
export async function toggleUpvote(opts: {
  postId?: string;
  replyId?: string;
}) {
  const { userId, error } = await requireAuth();
  if (error) return { success: false, error };

  if (opts.postId) {
    const existing = await db
      .select({ id: communityUpvotes.id })
      .from(communityUpvotes)
      .where(
        and(
          eq(communityUpvotes.userId, userId),
          eq(communityUpvotes.postId, opts.postId),
        ),
      )
      .limit(1);

    if (existing[0]) {
      await db.delete(communityUpvotes).where(eq(communityUpvotes.id, existing[0].id));
      await db
        .update(communityPosts)
        .set({ upvotesCount: sql`GREATEST(${communityPosts.upvotesCount} - 1, 0)` })
        .where(eq(communityPosts.id, opts.postId));
    } else {
      await db.insert(communityUpvotes).values({
        id: createId(),
        userId,
        postId: opts.postId,
      });
      await db
        .update(communityPosts)
        .set({ upvotesCount: sql`${communityPosts.upvotesCount} + 1` })
        .where(eq(communityPosts.id, opts.postId));
    }
  }

  if (opts.replyId) {
    const existing = await db
      .select({ id: communityUpvotes.id })
      .from(communityUpvotes)
      .where(
        and(
          eq(communityUpvotes.userId, userId),
          eq(communityUpvotes.replyId, opts.replyId),
        ),
      )
      .limit(1);

    if (existing[0]) {
      await db.delete(communityUpvotes).where(eq(communityUpvotes.id, existing[0].id));
      await db
        .update(communityReplies)
        .set({ upvotesCount: sql`GREATEST(${communityReplies.upvotesCount} - 1, 0)` })
        .where(eq(communityReplies.id, opts.replyId));
    } else {
      await db.insert(communityUpvotes).values({
        id: createId(),
        userId,
        replyId: opts.replyId,
      });
      await db
        .update(communityReplies)
        .set({ upvotesCount: sql`${communityReplies.upvotesCount} + 1` })
        .where(eq(communityReplies.id, opts.replyId));
    }
  }

  revalidatePath("/portal/community");
  return { success: true };
}

/** Toggle subscription to a post */
export async function toggleSubscription(postId: string) {
  const { userId, error } = await requireAuth();
  if (error) return { success: false, error };

  const existing = await db
    .select({ userId: communitySubscriptions.userId })
    .from(communitySubscriptions)
    .where(
      and(
        eq(communitySubscriptions.userId, userId),
        eq(communitySubscriptions.postId, postId),
      ),
    )
    .limit(1);

  if (existing[0]) {
    await db
      .delete(communitySubscriptions)
      .where(
        and(
          eq(communitySubscriptions.userId, userId),
          eq(communitySubscriptions.postId, postId),
        ),
      );
  } else {
    await db
      .insert(communitySubscriptions)
      .values({ userId, postId })
      .onConflictDoNothing();
  }

  revalidatePath("/portal/community");
  return { success: true };
}

/** Record a unique view on a post */
export async function recordView(postId: string) {
  const { userId, error } = await requireAuth();
  if (error) return { success: false, error };

  const result = await db
    .insert(communityViews)
    .values({ postId, userId })
    .onConflictDoNothing();

  // Only increment if new view (rowCount > 0)
  if (result.count > 0) {
    await db
      .update(communityPosts)
      .set({ viewsCount: sql`${communityPosts.viewsCount} + 1` })
      .where(eq(communityPosts.id, postId));
  }

  return { success: true };
}

/** Report a post or reply */
export async function reportContent(data: {
  postId?: string;
  replyId?: string;
  reason: "spam" | "inappropriate" | "offtopic" | "other";
  details?: string;
}) {
  const { userId, error } = await requireAuth();
  if (error) return { success: false, error };

  await db.insert(communityReports).values({
    id: createId(),
    reporterId: userId,
    postId: data.postId ?? null,
    replyId: data.replyId ?? null,
    reason: data.reason,
    details: data.details ?? null,
  });

  return { success: true };
}
