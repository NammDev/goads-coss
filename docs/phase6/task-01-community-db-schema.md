---
status: done
created: 2026-03-19
branch: feature/community
---

# Task 1 — Community DB Schema

> Design & migrate 7 tables for community discussion board.

---

## Context

- Existing schema: `app/src/lib/db/schema/` (6 files: auth, products, orders, wallet, enums, notifications)
- Pattern: Drizzle ORM `pgTable`, text IDs, `timestamp("createdAt").notNull().defaultNow()`
- User ID: `text("id")` — Clerk user ID string (e.g. `"user_2abc..."`)
- FK pattern: `.references(() => users.id, { onDelete: "cascade" })`
- Enums: defined in `enums.ts`, exported via `index.ts`
- Migration: `drizzle-kit generate` → `drizzle-kit migrate` (NOT `push`)
- Reference sites: Foreplay FeatureBase (upvote-only, status badges) + Vercel Community (flat replies, open/solved/closed)

---

## Files to Create/Modify

| Action | File | Notes |
|--------|------|-------|
| **Create** | `src/lib/db/schema/community-tables.ts` | 7 tables |
| **Modify** | `src/lib/db/schema/enums.ts` | Add 2 new enums |
| **Modify** | `src/lib/db/schema/index.ts` | Export `community-tables` |
| **Generate** | `app/drizzle/XXXX_*.sql` | Migration file |

---

## New Enums (in `enums.ts`)

### `community_post_status`
```ts
/** Community post lifecycle — open/solved/closed for discussions, extended for feedback */
export const communityPostStatusEnum = pgEnum("community_post_status", [
  "open",        // Default — accepting replies
  "solved",      // Q&A: author marked a solution
  "closed",      // Locked by admin — no more replies
  "in_review",   // Feedback: staff reviewing
  "planned",     // Feedback: accepted, on roadmap
  "in_progress", // Feedback: being built
  "completed",   // Feedback: shipped
  "rejected",    // Feedback: won't do
]);
```

### `community_report_reason`
```ts
/** Reasons for flagging community content */
export const communityReportReasonEnum = pgEnum("community_report_reason", [
  "spam",
  "inappropriate",
  "offtopic",
  "other",
]);
```

---

## 7 Tables (in `community-tables.ts`)

### 1. `community_category`
Staff-managed. Seeded with 8 default categories.

| Column | Drizzle Type | DB Type | Notes |
|--------|-------------|---------|-------|
| id | `text("id").primaryKey()` | text PK | nanoid/cuid |
| name | `text("name").notNull()` | text | "Q&A", "Tips & Strategies" |
| slug | `text("slug").notNull().unique()` | text unique | URL: `/community/qa` |
| description | `text("description")` | text nullable | Short description |
| icon | `text("icon")` | text nullable | Emoji or Lucide icon name |
| isStaffOnly | `boolean("isStaffOnly").notNull().default(false)` | boolean | Announcements = true |
| sortOrder | `integer("sortOrder").notNull().default(0)` | int | Display order |
| createdAt | `timestamp("createdAt").notNull().defaultNow()` | timestamp | |

### 2. `community_post`
Core entity. Card shows: title, excerpt, author, upvotes, replies, views, status.

| Column | Drizzle Type | DB Type | Notes |
|--------|-------------|---------|-------|
| id | `text("id").primaryKey()` | text PK | nanoid/cuid |
| authorId | `text("authorId").notNull().references(() => users.id, { onDelete: "cascade" })` | text FK | Clerk user |
| categoryId | `text("categoryId").notNull().references(() => communityCategories.id)` | text FK | |
| title | `text("title").notNull()` | text | Max enforced in Zod, not DB |
| slug | `text("slug").notNull().unique()` | text unique | Auto-gen from title |
| body | `text("body").notNull()` | text | Markdown |
| excerpt | `text("excerpt")` | text nullable | First ~150 chars, for card preview |
| status | `communityPostStatusEnum("status").notNull().default("open")` | enum | Lifecycle state |
| solvedReplyId | `text("solvedReplyId")` | text nullable | FK to reply marked as solution (added after reply table) |
| isPinned | `boolean("isPinned").notNull().default(false)` | boolean | Admin pin |
| isHidden | `boolean("isHidden").notNull().default(false)` | boolean | Moderation hide |
| upvotesCount | `integer("upvotesCount").notNull().default(0)` | int | Denormalized |
| repliesCount | `integer("repliesCount").notNull().default(0)` | int | Denormalized |
| viewsCount | `integer("viewsCount").notNull().default(0)` | int | Denormalized |
| createdAt | `timestamp("createdAt").notNull().defaultNow()` | timestamp | |
| updatedAt | `timestamp("updatedAt").notNull().defaultNow()` | timestamp | |

### 3. `community_reply`
Flat replies (no nesting). Vercel Community style.

| Column | Drizzle Type | DB Type | Notes |
|--------|-------------|---------|-------|
| id | `text("id").primaryKey()` | text PK | |
| postId | `text("postId").notNull().references(() => communityPosts.id, { onDelete: "cascade" })` | text FK | |
| authorId | `text("authorId").notNull().references(() => users.id, { onDelete: "cascade" })` | text FK | |
| body | `text("body").notNull()` | text | Markdown |
| isSolution | `boolean("isSolution").notNull().default(false)` | boolean | Marked by OP |
| isHidden | `boolean("isHidden").notNull().default(false)` | boolean | Moderation |
| upvotesCount | `integer("upvotesCount").notNull().default(0)` | int | Denormalized |
| createdAt | `timestamp("createdAt").notNull().defaultNow()` | timestamp | |
| updatedAt | `timestamp("updatedAt").notNull().defaultNow()` | timestamp | |

### 4. `community_upvote`
Upvote-only (Foreplay style). No downvotes.

| Column | Drizzle Type | DB Type | Notes |
|--------|-------------|---------|-------|
| id | `text("id").primaryKey()` | text PK | |
| userId | `text("userId").notNull().references(() => users.id, { onDelete: "cascade" })` | text FK | |
| postId | `text("postId").references(() => communityPosts.id, { onDelete: "cascade" })` | text nullable | Upvote a post |
| replyId | `text("replyId").references(() => communityReplies.id, { onDelete: "cascade" })` | text nullable | Upvote a reply |
| createdAt | `timestamp("createdAt").notNull().defaultNow()` | timestamp | |
| **Unique** | `uniqueIndex("upvote_user_post_idx").on(userId, postId)` | | 1 vote/user/post |
| **Unique** | `uniqueIndex("upvote_user_reply_idx").on(userId, replyId)` | | 1 vote/user/reply |

### 5. `community_report`
Flag content for moderation.

| Column | Drizzle Type | DB Type | Notes |
|--------|-------------|---------|-------|
| id | `text("id").primaryKey()` | text PK | |
| reporterId | `text("reporterId").notNull().references(() => users.id, { onDelete: "cascade" })` | text FK | Who flagged |
| postId | `text("postId").references(() => communityPosts.id, { onDelete: "cascade" })` | text nullable | Report a post |
| replyId | `text("replyId").references(() => communityReplies.id, { onDelete: "cascade" })` | text nullable | Report a reply |
| reason | `communityReportReasonEnum("reason").notNull()` | enum | spam/inappropriate/offtopic/other |
| details | `text("details")` | text nullable | Optional explanation |
| status | `text("status").notNull().default("open")` | text | open/reviewed/dismissed |
| reviewedBy | `text("reviewedBy").references(() => users.id)` | text nullable | Staff who acted |
| createdAt | `timestamp("createdAt").notNull().defaultNow()` | timestamp | |

### 6. `community_view`
Unique view tracking per user per post. For trending + view count.

| Column | Drizzle Type | DB Type | Notes |
|--------|-------------|---------|-------|
| postId | `text("postId").notNull().references(() => communityPosts.id, { onDelete: "cascade" })` | text FK | |
| userId | `text("userId").notNull().references(() => users.id, { onDelete: "cascade" })` | text FK | |
| createdAt | `timestamp("createdAt").notNull().defaultNow()` | timestamp | |
| **PK** | `primaryKey({ columns: [postId, userId] })` | composite | 1 view/user/post |

### 7. `community_subscription`
Follow a post → get notified on new replies.

| Column | Drizzle Type | DB Type | Notes |
|--------|-------------|---------|-------|
| userId | `text("userId").notNull().references(() => users.id, { onDelete: "cascade" })` | text FK | |
| postId | `text("postId").notNull().references(() => communityPosts.id, { onDelete: "cascade" })` | text FK | |
| createdAt | `timestamp("createdAt").notNull().defaultNow()` | timestamp | |
| **PK** | `primaryKey({ columns: [userId, postId] })` | composite | 1 sub/user/post |

---

## Notification Integration

Extend existing `notificationTypeEnum` in `enums.ts`:

```diff
 export const notificationTypeEnum = pgEnum("notification_type", [
   "order_created",
   "balance_topup",
   "item_delivered",
   "system",
+  "community_reply",      // Someone replied to your post
+  "community_solution",   // Your reply was marked as solution
+  "community_mention",    // Future: someone mentioned you
 ]);
```

---

## Seed Data (8 Default Categories)

```ts
const defaultCategories = [
  { name: "Announcements", slug: "announcements", icon: "megaphone", isStaffOnly: true, sortOrder: 1 },
  { name: "Q&A", slug: "qa", icon: "help-circle", isStaffOnly: false, sortOrder: 2 },
  { name: "Tips & Strategies", slug: "tips", icon: "lightbulb", isStaffOnly: false, sortOrder: 3 },
  { name: "Showcase", slug: "showcase", icon: "trophy", isStaffOnly: false, sortOrder: 4 },
  { name: "Feedback", slug: "feedback", icon: "message-square", isStaffOnly: false, sortOrder: 5 },
  { name: "Troubleshooting", slug: "troubleshooting", icon: "wrench", isStaffOnly: false, sortOrder: 6 },
  { name: "General", slug: "general", icon: "message-circle", isStaffOnly: false, sortOrder: 7 },
  { name: "Introductions", slug: "introductions", icon: "hand-wave", isStaffOnly: false, sortOrder: 8 },
];
```

---

## Implementation Steps

1. [ ] Add 2 new enums to `enums.ts` (`communityPostStatusEnum`, `communityReportReasonEnum`)
2. [ ] Add 3 new notification types to `notificationTypeEnum`
3. [ ] Create `community-tables.ts` with 7 tables
4. [ ] Export from `schema/index.ts`: `export * from "./community-tables";`
5. [ ] Run `npx drizzle-kit generate` → verify migration SQL
6. [ ] Run `npx drizzle-kit migrate` → apply to Supabase
7. [ ] Add seed script for 8 default categories
8. [ ] Verify tables exist in Supabase dashboard

---

## Success Criteria

- [ ] 7 new tables visible in Supabase
- [ ] 8 categories seeded
- [ ] All FKs + unique constraints working
- [ ] `drizzle-kit generate` produces clean migration (no errors)
- [ ] Existing tables unaffected (no data loss)
- [ ] TypeScript types auto-inferred by Drizzle (InferSelectModel, InferInsertModel)

---

## Design Decisions

| Decision | Why |
|----------|-----|
| text IDs (not serial) | Match existing pattern — nanoid/cuid for all tables |
| Flat replies (no nesting) | Vercel style — simpler UX, simpler queries |
| Upvote-only (no downvote) | Foreplay style — positive community, less toxicity |
| Denormalized counts | Performance — avoid COUNT(*) on every page load |
| `solvedReplyId` on post | Quick lookup for "show solution at top" |
| `isSolution` on reply | Quick filter for "show solution badge" |
| No tags table at MVP | Categories sufficient at 500 users. Add tags later if needed |
| `community_view` composite PK | 1 view/user/post — prevents inflation |
| `community_subscription` | "Get notified" button (Foreplay screenshot) |
| Extended post status enum | Supports both discussion (open/solved/closed) and feedback (in_review/planned/...) flows |
