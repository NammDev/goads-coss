---
status: done
created: 2026-03-19
branch: feature/community
depends-on: task-01
---

# Task 2 — Community API Layer

> Queries + server actions for community CRUD operations.

---

## Context

- DB schema done (Task 1): 7 community tables in Supabase
- Existing patterns: `src/lib/db/queries/*.ts` (read) + `src/lib/actions/*.ts` (write)
- Queries: plain async functions, return typed results
- Actions: `"use server"`, `auth()` from Clerk, `createId()` from cuid2, return `{ success, error? }`
- ID generation: `createId()` from `@paralleldrive/cuid2`

---

## Files to Create

| File | Purpose | ~LOC |
|------|---------|------|
| `src/lib/db/queries/community-queries.ts` | All read queries | ~150 |
| `src/lib/actions/community-actions.ts` | All write actions | ~180 |
| `src/lib/db/queries/index.ts` | Add community export | +1 line |

---

## Queries (`community-queries.ts`)

### Types to Export

```ts
export type CommunityPost = InferSelectModel<typeof communityPosts>;
export type CommunityReply = InferSelectModel<typeof communityReplies>;
export type CommunityCategory = InferSelectModel<typeof communityCategories>;

export type PostWithAuthor = CommunityPost & {
  authorName: string;
  categoryName: string;
  categorySlug: string;
};

export type PostDetail = CommunityPost & {
  authorName: string;
  categoryName: string;
  categorySlug: string;
  replies: ReplyWithAuthor[];
  hasUpvoted: boolean;       // current user upvoted?
  isSubscribed: boolean;     // current user subscribed?
};

export type ReplyWithAuthor = CommunityReply & {
  authorName: string;
  isStaff: boolean;          // staff badge
};

export type LeaderboardEntry = {
  userId: string;
  userName: string;
  postCount: number;
};
```

### Functions to Implement

| # | Function | Input | Output | Notes |
|---|----------|-------|--------|-------|
| 1 | `getCategories()` | — | `CommunityCategory[]` | Sorted by `sortOrder` |
| 2 | `getPosts(opts)` | `{ categorySlug?, sort, page, limit }` | `{ posts: PostWithAuthor[], total: number }` | Paginated. Sort: `recent`/`top`/`trending`. Exclude hidden. |
| 3 | `getPostBySlug(slug, userId?)` | slug + optional userId | `PostDetail \| null` | Include replies, upvote status, subscription status |
| 4 | `getPostsByAuthor(authorId)` | authorId | `PostWithAuthor[]` | For user profile / "my posts" |
| 5 | `getMostHelpful(limit)` | limit (default 8) | `LeaderboardEntry[]` | Users ranked by post count (Foreplay sidebar) |
| 6 | `getPostStats()` | — | `{ totalPosts, totalReplies, solvedCount }` | Admin dashboard widget |
| 7 | `getReports(status?)` | `"open" \| "reviewed" \| "dismissed"` | Reports with post/reply/reporter info | Admin moderation queue |
| 8 | `hasUserUpvoted(userId, postId?, replyId?)` | — | `boolean` | Check upvote status |
| 9 | `searchPosts(query, limit)` | search string | `PostWithAuthor[]` | ILIKE on title + body |

### Query Patterns (match existing codebase)

```ts
// Example: getPosts with join
const rows = await db
  .select({
    post: communityPosts,
    authorName: users.name,
    categoryName: communityCategories.name,
    categorySlug: communityCategories.slug,
  })
  .from(communityPosts)
  .leftJoin(users, eq(communityPosts.authorId, users.id))
  .leftJoin(communityCategories, eq(communityPosts.categoryId, communityCategories.id))
  .where(eq(communityPosts.isHidden, false))
  .orderBy(desc(communityPosts.createdAt))
  .limit(limit)
  .offset((page - 1) * limit);
```

---

## Actions (`community-actions.ts`)

All actions follow pattern: `"use server"` → `auth()` check → validate → DB write → revalidate → return result.

### Functions to Implement

| # | Function | Input | Auth | Notes |
|---|----------|-------|------|-------|
| 1 | `createPost(data)` | `{ title, body, categoryId }` | Required (customer+) | Auto-gen slug, excerpt. Auto-subscribe author. |
| 2 | `updatePost(id, data)` | `{ title?, body? }` | Author only | Update slug if title changed |
| 3 | `deletePost(id)` | postId | Author or admin | Soft delete (isHidden=true) |
| 4 | `createReply(data)` | `{ postId, body }` | Required | Increment `repliesCount`. Auto-subscribe replier. Notify post subscribers. |
| 5 | `markSolution(postId, replyId)` | postId + replyId | Post author only | Set `isSolution=true` on reply, `solvedReplyId` + `status=solved` on post |
| 6 | `toggleUpvote(postId?, replyId?)` | one of postId/replyId | Required | Insert or delete. Update denormalized count (+1/-1). |
| 7 | `toggleSubscription(postId)` | postId | Required | Insert or delete from `community_subscription` |
| 8 | `recordView(postId)` | postId | Required | Insert into `community_view` (ignore duplicate). Increment `viewsCount`. |
| 9 | `reportContent(data)` | `{ postId?, replyId?, reason, details? }` | Required | Insert into `community_report` |
| 10 | `reviewReport(reportId, action)` | `"approve" \| "hide" \| "dismiss"` | Admin/staff only | Update report status. If "hide": set `isHidden=true` on post/reply. |
| 11 | `togglePin(postId)` | postId | Admin/staff only | Toggle `isPinned` |
| 12 | `updatePostStatus(postId, status)` | postId + new status | Admin/staff only | For feedback flow: open→in_review→planned→... |

### Action Patterns (match existing codebase)

```ts
"use server";
import { createId } from "@paralleldrive/cuid2";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { communityPosts } from "@/lib/db/schema";

export async function createPost(data: { title: string; body: string; categoryId: string }) {
  const { userId } = await auth();
  if (!userId) return { success: false, error: "Unauthorized" };

  const slug = generateSlug(data.title); // kebab-case + random suffix
  const excerpt = data.body.slice(0, 150);

  await db.insert(communityPosts).values({
    id: createId(),
    authorId: userId,
    categoryId: data.categoryId,
    title: data.title,
    slug,
    body: data.body,
    excerpt,
  });

  // Auto-subscribe author
  await db.insert(communitySubscriptions).values({
    userId,
    postId: id,
  });

  revalidatePath("/portal/community");
  return { success: true, slug };
}
```

### Helper: `generateSlug`

```ts
function generateSlug(title: string): string {
  const base = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
  const suffix = createId().slice(0, 6);
  return `${base}-${suffix}`;
}
```

---

## Notification Integration

When these events happen, create notification via existing `createNotification()`:

| Event | Notify Who | Type | Message |
|-------|-----------|------|---------|
| New reply on post | All subscribers (except replier) | `community_reply` | `"{authorName} replied to '{postTitle}'"` |
| Reply marked as solution | Reply author | `community_solution` | `"Your reply was marked as solution in '{postTitle}'"` |

---

## Implementation Steps

1. [ ] Create `community-queries.ts` with 9 query functions
2. [ ] Export from `queries/index.ts`
3. [ ] Create `community-actions.ts` with 12 action functions
4. [ ] Add `generateSlug` helper (inline in actions file or separate util)
5. [ ] Wire notification integration (call `createNotification` in `createReply` and `markSolution`)
6. [ ] TypeScript compile check (`npx tsc --noEmit`)
7. [ ] Update `notification-actions.ts` NotificationType to include community types

---

## Success Criteria

- [ ] All 9 queries return correct typed results
- [ ] All 12 actions handle auth, validation, DB write, revalidation
- [ ] `createReply` notifies subscribers
- [ ] `markSolution` notifies reply author
- [ ] `toggleUpvote` correctly increments/decrements count
- [ ] `recordView` handles duplicate (ON CONFLICT DO NOTHING)
- [ ] 0 TypeScript errors
- [ ] Files under 200 LOC each (split if needed)

---

## Revalidation Paths

| Action | Paths to Revalidate |
|--------|-------------------|
| createPost | `/portal/community`, `/portal/community/{categorySlug}` |
| updatePost | `/portal/community/{slug}` |
| deletePost | `/portal/community` |
| createReply | `/portal/community/{slug}` |
| markSolution | `/portal/community/{slug}` |
| toggleUpvote | `/portal/community/{slug}` |
| togglePin | `/portal/community` |
| updatePostStatus | `/portal/community/{slug}` |
| reviewReport | `/admin/community` |
