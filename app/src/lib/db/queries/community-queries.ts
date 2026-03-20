import { eq, desc, and, count, ilike, or, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import {
  communityPosts,
  communityReplies,
  communityCategories,
  communityUpvotes,
  communitySubscriptions,
  communityReports,
  communityViews,
  users,
} from "@/lib/db/schema";
import type { InferSelectModel } from "drizzle-orm";

export type CommunityPost = InferSelectModel<typeof communityPosts>;
export type CommunityReply = InferSelectModel<typeof communityReplies>;
export type CommunityCategory = InferSelectModel<typeof communityCategories>;

export type PostWithAuthor = CommunityPost & {
  authorName: string;
  authorUsername: string | null;
  categoryName: string;
  categorySlug: string;
};

export type ReplyWithAuthor = CommunityReply & {
  authorName: string;
  isStaff: boolean;
};

export type PostDetail = CommunityPost & {
  authorName: string;
  categoryName: string;
  categorySlug: string;
  replies: ReplyWithAuthor[];
  hasUpvoted: boolean;
  isSubscribed: boolean;
};

export type LeaderboardEntry = {
  userId: string;
  userName: string;
  postCount: number;
};

/** Get all categories sorted by sortOrder */
export async function getCategories(): Promise<CommunityCategory[]> {
  return db
    .select()
    .from(communityCategories)
    .orderBy(communityCategories.sortOrder);
}

/** Get paginated posts with author + category info */
export async function getPosts(opts: {
  categorySlug?: string;
  sort?: "recent" | "top" | "trending";
  page?: number;
  limit?: number;
}): Promise<{ posts: PostWithAuthor[]; total: number }> {
  const { categorySlug, sort = "recent", page = 1, limit = 20 } = opts;

  const conditions = [eq(communityPosts.isHidden, false)];
  if (categorySlug) {
    const cat = await db
      .select({ id: communityCategories.id })
      .from(communityCategories)
      .where(eq(communityCategories.slug, categorySlug))
      .limit(1);
    if (cat[0]) conditions.push(eq(communityPosts.categoryId, cat[0].id));
  }

  const whereClause = and(...conditions);

  const orderByMap = {
    recent: desc(communityPosts.createdAt),
    top: desc(communityPosts.upvotesCount),
    trending: desc(communityPosts.viewsCount),
  };

  const [rows, totalRows] = await Promise.all([
    db
      .select({
        post: communityPosts,
        authorName: users.name,
        authorUsername: users.username,
        categoryName: communityCategories.name,
        categorySlug: communityCategories.slug,
      })
      .from(communityPosts)
      .leftJoin(users, eq(communityPosts.authorId, users.id))
      .leftJoin(
        communityCategories,
        eq(communityPosts.categoryId, communityCategories.id),
      )
      .where(whereClause)
      .orderBy(orderByMap[sort])
      .limit(limit)
      .offset((page - 1) * limit),
    db
      .select({ count: count() })
      .from(communityPosts)
      .where(whereClause),
  ]);

  return {
    posts: rows.map((r) => ({
      ...r.post,
      authorName: r.authorName ?? "Unknown",
      authorUsername: r.authorUsername,
      categoryName: r.categoryName ?? "General",
      categorySlug: r.categorySlug ?? "general",
    })),
    total: totalRows[0]?.count ?? 0,
  };
}

/** Get a single post by slug with replies, upvote status, subscription status */
export async function getPostBySlug(
  slug: string,
  userId?: string,
): Promise<PostDetail | null> {
  const rows = await db
    .select({
      post: communityPosts,
      authorName: users.name,
      categoryName: communityCategories.name,
      categorySlug: communityCategories.slug,
    })
    .from(communityPosts)
    .leftJoin(users, eq(communityPosts.authorId, users.id))
    .leftJoin(
      communityCategories,
      eq(communityPosts.categoryId, communityCategories.id),
    )
    .where(eq(communityPosts.slug, slug))
    .limit(1);

  if (!rows[0]) return null;
  const post = rows[0];

  const replies = await db
    .select({
      reply: communityReplies,
      authorName: users.name,
      authorRole: users.role,
    })
    .from(communityReplies)
    .leftJoin(users, eq(communityReplies.authorId, users.id))
    .where(
      and(
        eq(communityReplies.postId, post.post.id),
        eq(communityReplies.isHidden, false),
      ),
    )
    .orderBy(communityReplies.createdAt);

  let hasUpvoted = false;
  let isSubscribed = false;

  if (userId) {
    const [upvote, sub] = await Promise.all([
      db
        .select({ id: communityUpvotes.id })
        .from(communityUpvotes)
        .where(
          and(
            eq(communityUpvotes.userId, userId),
            eq(communityUpvotes.postId, post.post.id),
          ),
        )
        .limit(1),
      db
        .select({ userId: communitySubscriptions.userId })
        .from(communitySubscriptions)
        .where(
          and(
            eq(communitySubscriptions.userId, userId),
            eq(communitySubscriptions.postId, post.post.id),
          ),
        )
        .limit(1),
    ]);
    hasUpvoted = upvote.length > 0;
    isSubscribed = sub.length > 0;
  }

  return {
    ...post.post,
    authorName: post.authorName ?? "Unknown",
    categoryName: post.categoryName ?? "General",
    categorySlug: post.categorySlug ?? "general",
    replies: replies.map((r) => ({
      ...r.reply,
      authorName: r.authorName ?? "Unknown",
      isStaff: r.authorRole === "staff" || r.authorRole === "super_admin",
    })),
    hasUpvoted,
    isSubscribed,
  };
}

/** Get posts by a specific author */
export async function getPostsByAuthor(
  authorId: string,
): Promise<PostWithAuthor[]> {
  const rows = await db
    .select({
      post: communityPosts,
      authorName: users.name,
      authorUsername: users.username,
      categoryName: communityCategories.name,
      categorySlug: communityCategories.slug,
    })
    .from(communityPosts)
    .leftJoin(users, eq(communityPosts.authorId, users.id))
    .leftJoin(
      communityCategories,
      eq(communityPosts.categoryId, communityCategories.id),
    )
    .where(
      and(
        eq(communityPosts.authorId, authorId),
        eq(communityPosts.isHidden, false),
      ),
    )
    .orderBy(desc(communityPosts.createdAt));

  return rows.map((r) => ({
    ...r.post,
    authorName: r.authorName ?? "Unknown",
    authorUsername: r.authorUsername,
    categoryName: r.categoryName ?? "General",
    categorySlug: r.categorySlug ?? "general",
  }));
}

/** Leaderboard — users ranked by post count (Foreplay sidebar) */
export async function getMostHelpful(
  limit = 8,
): Promise<LeaderboardEntry[]> {
  const rows = await db
    .select({
      userId: communityPosts.authorId,
      userName: users.name,
      postCount: count(),
    })
    .from(communityPosts)
    .leftJoin(users, eq(communityPosts.authorId, users.id))
    .where(eq(communityPosts.isHidden, false))
    .groupBy(communityPosts.authorId, users.name)
    .orderBy(desc(count()))
    .limit(limit);

  return rows.map((r) => ({
    userId: r.userId,
    userName: r.userName ?? "Unknown",
    postCount: r.postCount,
  }));
}

/** Admin: community stats for dashboard */
export async function getPostStats() {
  const [posts, replies, solved] = await Promise.all([
    db.select({ count: count() }).from(communityPosts),
    db.select({ count: count() }).from(communityReplies),
    db
      .select({ count: count() })
      .from(communityPosts)
      .where(eq(communityPosts.status, "solved")),
  ]);
  return {
    totalPosts: posts[0]?.count ?? 0,
    totalReplies: replies[0]?.count ?? 0,
    solvedCount: solved[0]?.count ?? 0,
  };
}

/** Admin: moderation report queue */
export async function getReports(status?: "open" | "reviewed" | "dismissed") {
  const conditions = status ? [eq(communityReports.status, status)] : [];

  return db
    .select({
      report: communityReports,
      reporterName: users.name,
    })
    .from(communityReports)
    .leftJoin(users, eq(communityReports.reporterId, users.id))
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .orderBy(desc(communityReports.createdAt));
}

/** Search posts by title or body (ILIKE) */
export async function searchPosts(
  query: string,
  limit = 20,
): Promise<PostWithAuthor[]> {
  const pattern = `%${query}%`;

  const rows = await db
    .select({
      post: communityPosts,
      authorName: users.name,
      authorUsername: users.username,
      categoryName: communityCategories.name,
      categorySlug: communityCategories.slug,
    })
    .from(communityPosts)
    .leftJoin(users, eq(communityPosts.authorId, users.id))
    .leftJoin(
      communityCategories,
      eq(communityPosts.categoryId, communityCategories.id),
    )
    .where(
      and(
        eq(communityPosts.isHidden, false),
        or(
          ilike(communityPosts.title, pattern),
          ilike(communityPosts.body, pattern),
        ),
      ),
    )
    .orderBy(desc(communityPosts.createdAt))
    .limit(limit);

  return rows.map((r) => ({
    ...r.post,
    authorName: r.authorName ?? "Unknown",
    authorUsername: r.authorUsername,
    categoryName: r.categoryName ?? "General",
    categorySlug: r.categorySlug ?? "general",
  }));
}
