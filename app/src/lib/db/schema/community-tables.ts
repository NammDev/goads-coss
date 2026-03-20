import {
  pgTable,
  text,
  timestamp,
  integer,
  boolean,
  primaryKey,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { users } from "./auth-tables";
import {
  communityPostStatusEnum,
  communityReportReasonEnum,
} from "./enums";

/** Community categories — staff-managed, seeded with 8 defaults */
export const communityCategories = pgTable("community_category", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  icon: text("icon"),
  isStaffOnly: boolean("isStaffOnly").notNull().default(false),
  sortOrder: integer("sortOrder").notNull().default(0),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});

/** Community posts — discussions, Q&A, feedback, showcases */
export const communityPosts = pgTable("community_post", {
  id: text("id").primaryKey(),
  authorId: text("authorId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  categoryId: text("categoryId")
    .notNull()
    .references(() => communityCategories.id),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  body: text("body").notNull(),
  excerpt: text("excerpt"),
  status: communityPostStatusEnum("status").notNull().default("open"),
  solvedReplyId: text("solvedReplyId"),
  isPinned: boolean("isPinned").notNull().default(false),
  isHidden: boolean("isHidden").notNull().default(false),
  upvotesCount: integer("upvotesCount").notNull().default(0),
  repliesCount: integer("repliesCount").notNull().default(0),
  viewsCount: integer("viewsCount").notNull().default(0),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

/** Community replies — flat comments on posts (no nesting) */
export const communityReplies = pgTable("community_reply", {
  id: text("id").primaryKey(),
  postId: text("postId")
    .notNull()
    .references(() => communityPosts.id, { onDelete: "cascade" }),
  authorId: text("authorId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  body: text("body").notNull(),
  isSolution: boolean("isSolution").notNull().default(false),
  isHidden: boolean("isHidden").notNull().default(false),
  upvotesCount: integer("upvotesCount").notNull().default(0),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

/** Community upvotes — upvote-only, no downvotes (Foreplay style) */
export const communityUpvotes = pgTable(
  "community_upvote",
  {
    id: text("id").primaryKey(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    postId: text("postId").references(() => communityPosts.id, {
      onDelete: "cascade",
    }),
    replyId: text("replyId").references(() => communityReplies.id, {
      onDelete: "cascade",
    }),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
  },
  (table) => [
    uniqueIndex("upvote_user_post_idx").on(table.userId, table.postId),
    uniqueIndex("upvote_user_reply_idx").on(table.userId, table.replyId),
  ],
);

/** Community reports — flag content for moderation */
export const communityReports = pgTable("community_report", {
  id: text("id").primaryKey(),
  reporterId: text("reporterId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  postId: text("postId").references(() => communityPosts.id, {
    onDelete: "cascade",
  }),
  replyId: text("replyId").references(() => communityReplies.id, {
    onDelete: "cascade",
  }),
  reason: communityReportReasonEnum("reason").notNull(),
  details: text("details"),
  status: text("status").notNull().default("open"),
  reviewedBy: text("reviewedBy").references(() => users.id),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});

/** Community views — unique view tracking per user per post */
export const communityViews = pgTable(
  "community_view",
  {
    postId: text("postId")
      .notNull()
      .references(() => communityPosts.id, { onDelete: "cascade" }),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
  },
  (table) => [primaryKey({ columns: [table.postId, table.userId] })],
);

/** Community subscriptions — follow a post to get notified on new replies */
export const communitySubscriptions = pgTable(
  "community_subscription",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    postId: text("postId")
      .notNull()
      .references(() => communityPosts.id, { onDelete: "cascade" }),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
  },
  (table) => [primaryKey({ columns: [table.userId, table.postId] })],
);
