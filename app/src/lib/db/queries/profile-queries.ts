import { eq, count, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import {
  users,
  communityPosts,
  communityReplies,
} from "@/lib/db/schema";

export type UserProfile = {
  id: string;
  name: string;
  username: string | null;
  bio: string | null;
  avatarUrl: string | null;
  role: string;
  createdAt: Date;
};

export type UserStats = {
  postCount: number;
  replyCount: number;
  solutionCount: number;
  upvotesReceived: number;
};

/** Get user profile by username */
export async function getUserByUsername(username: string): Promise<UserProfile | null> {
  const rows = await db
    .select({
      id: users.id,
      name: users.name,
      username: users.username,
      bio: users.bio,
      avatarUrl: users.avatarUrl,
      role: users.role,
      createdAt: users.createdAt,
    })
    .from(users)
    .where(eq(users.username, username))
    .limit(1);

  return rows[0] ?? null;
}

/** Get user profile by user ID */
export async function getUserById(userId: string): Promise<UserProfile | null> {
  const rows = await db
    .select({
      id: users.id,
      name: users.name,
      username: users.username,
      bio: users.bio,
      avatarUrl: users.avatarUrl,
      role: users.role,
      createdAt: users.createdAt,
    })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  return rows[0] ?? null;
}

/** Get community activity stats for a user */
export async function getUserStats(userId: string): Promise<UserStats> {
  const [posts, replies, solutions] = await Promise.all([
    db
      .select({ count: count() })
      .from(communityPosts)
      .where(eq(communityPosts.authorId, userId)),
    db
      .select({ count: count() })
      .from(communityReplies)
      .where(eq(communityReplies.authorId, userId)),
    db
      .select({ count: count() })
      .from(communityReplies)
      .where(
        sql`${communityReplies.authorId} = ${userId} AND ${communityReplies.isSolution} = true`,
      ),
  ]);

  // Sum upvotes received on all user's posts
  const upvotes = await db
    .select({ total: sql<number>`COALESCE(SUM(${communityPosts.upvotesCount}), 0)` })
    .from(communityPosts)
    .where(eq(communityPosts.authorId, userId));

  return {
    postCount: posts[0]?.count ?? 0,
    replyCount: replies[0]?.count ?? 0,
    solutionCount: solutions[0]?.count ?? 0,
    upvotesReceived: Number(upvotes[0]?.total ?? 0),
  };
}
