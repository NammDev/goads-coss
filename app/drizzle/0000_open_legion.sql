CREATE TYPE "public"."community_post_status" AS ENUM('open', 'solved', 'closed', 'in_review', 'planned', 'in_progress', 'completed', 'rejected');--> statement-breakpoint
CREATE TYPE "public"."community_report_reason" AS ENUM('spam', 'inappropriate', 'offtopic', 'other');--> statement-breakpoint
CREATE TYPE "public"."delivered_item_status" AS ENUM('active', 'inactive', 'banned', 'expired');--> statement-breakpoint
CREATE TYPE "public"."notification_type" AS ENUM('order_created', 'balance_topup', 'item_delivered', 'warranty_expiring', 'warranty_claimed', 'system', 'community_reply', 'community_solution');--> statement-breakpoint
CREATE TYPE "public"."order_status" AS ENUM('pending', 'paid', 'processing', 'delivered', 'completed', 'cancelled');--> statement-breakpoint
CREATE TYPE "public"."payment_method" AS ENUM('crypto', 'wise', 'paypal', 'other');--> statement-breakpoint
CREATE TYPE "public"."product_type" AS ENUM('agency_account', 'bm', 'profile', 'page', 'google_agency', 'tiktok_agency', 'tiktok_account', 'blue_verification', 'unban', 'other');--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('super_admin', 'staff', 'customer');--> statement-breakpoint
CREATE TYPE "public"."wallet_transaction_type" AS ENUM('topup', 'deduct');--> statement-breakpoint
CREATE TYPE "public"."warranty_claim_status" AS ENUM('pending', 'approved', 'rejected', 'replaced');--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"role" "user_role" DEFAULT 'customer' NOT NULL,
	"balance" numeric(12, 2) DEFAULT '0' NOT NULL,
	"username" text,
	"bio" text,
	"avatarUrl" text,
	"telegramId" text,
	"notes" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email"),
	CONSTRAINT "user_username_unique" UNIQUE("username")
);
--> statement-breakpoint
CREATE TABLE "product" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"type" "product_type" NOT NULL,
	"price" numeric(10, 2) NOT NULL,
	"currency" text DEFAULT 'USD' NOT NULL,
	"description" text,
	"inventoryCount" integer DEFAULT 0 NOT NULL,
	"isActive" boolean DEFAULT true NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "product_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "customer_price" (
	"id" text PRIMARY KEY NOT NULL,
	"customerId" text NOT NULL,
	"productId" text NOT NULL,
	"price" numeric(10, 2) NOT NULL,
	"currency" text DEFAULT 'USD' NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "delivered_item" (
	"id" text PRIMARY KEY NOT NULL,
	"orderId" text NOT NULL,
	"orderItemId" text,
	"productType" "product_type" NOT NULL,
	"uid" text,
	"credentials" text,
	"status" "delivered_item_status" DEFAULT 'active' NOT NULL,
	"warrantyUntil" timestamp,
	"deliveredAt" timestamp DEFAULT now() NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "order_item" (
	"id" text PRIMARY KEY NOT NULL,
	"orderId" text NOT NULL,
	"productId" text NOT NULL,
	"quantity" integer DEFAULT 1 NOT NULL,
	"unitPrice" numeric(10, 2) NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "order" (
	"id" text PRIMARY KEY NOT NULL,
	"orderNumber" serial NOT NULL,
	"customerId" text NOT NULL,
	"totalAmount" numeric(10, 2) NOT NULL,
	"currency" text DEFAULT 'USD' NOT NULL,
	"paymentMethod" "payment_method",
	"status" "order_status" DEFAULT 'pending' NOT NULL,
	"shareToken" text,
	"notes" text,
	"paymentDate" timestamp,
	"deliveredAt" timestamp,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "order_shareToken_unique" UNIQUE("shareToken")
);
--> statement-breakpoint
CREATE TABLE "wallet_transaction" (
	"id" text PRIMARY KEY NOT NULL,
	"customerId" text NOT NULL,
	"type" "wallet_transaction_type" NOT NULL,
	"amount" numeric(12, 2) NOT NULL,
	"balanceAfter" numeric(12, 2) NOT NULL,
	"orderId" text,
	"note" text,
	"createdBy" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "notification" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"type" "notification_type" NOT NULL,
	"title" text NOT NULL,
	"message" text NOT NULL,
	"linkUrl" text,
	"read" boolean DEFAULT false NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "extension_token" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"token" text NOT NULL,
	"name" text DEFAULT 'Default',
	"last_used_at" timestamp,
	"expires_at" timestamp NOT NULL,
	"is_revoked" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "extension_token_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "community_category" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"description" text,
	"icon" text,
	"isStaffOnly" boolean DEFAULT false NOT NULL,
	"sortOrder" integer DEFAULT 0 NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "community_category_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "community_post" (
	"id" text PRIMARY KEY NOT NULL,
	"authorId" text NOT NULL,
	"categoryId" text NOT NULL,
	"title" text NOT NULL,
	"slug" text NOT NULL,
	"body" text NOT NULL,
	"excerpt" text,
	"status" "community_post_status" DEFAULT 'open' NOT NULL,
	"solvedReplyId" text,
	"isPinned" boolean DEFAULT false NOT NULL,
	"isHidden" boolean DEFAULT false NOT NULL,
	"upvotesCount" integer DEFAULT 0 NOT NULL,
	"repliesCount" integer DEFAULT 0 NOT NULL,
	"viewsCount" integer DEFAULT 0 NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "community_post_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "community_reply" (
	"id" text PRIMARY KEY NOT NULL,
	"postId" text NOT NULL,
	"authorId" text NOT NULL,
	"body" text NOT NULL,
	"isSolution" boolean DEFAULT false NOT NULL,
	"isHidden" boolean DEFAULT false NOT NULL,
	"upvotesCount" integer DEFAULT 0 NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "community_report" (
	"id" text PRIMARY KEY NOT NULL,
	"reporterId" text NOT NULL,
	"postId" text,
	"replyId" text,
	"reason" "community_report_reason" NOT NULL,
	"details" text,
	"status" text DEFAULT 'open' NOT NULL,
	"reviewedBy" text,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "community_subscription" (
	"userId" text NOT NULL,
	"postId" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "community_subscription_userId_postId_pk" PRIMARY KEY("userId","postId")
);
--> statement-breakpoint
CREATE TABLE "community_upvote" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"postId" text,
	"replyId" text,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "community_view" (
	"postId" text NOT NULL,
	"userId" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "community_view_postId_userId_pk" PRIMARY KEY("postId","userId")
);
--> statement-breakpoint
CREATE TABLE "warranty_claim" (
	"id" text PRIMARY KEY NOT NULL,
	"deliveredItemId" text NOT NULL,
	"customerId" text NOT NULL,
	"reason" text NOT NULL,
	"status" "warranty_claim_status" DEFAULT 'pending' NOT NULL,
	"adminNote" text,
	"replacementItemId" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "customer_price" ADD CONSTRAINT "customer_price_customerId_user_id_fk" FOREIGN KEY ("customerId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "customer_price" ADD CONSTRAINT "customer_price_productId_product_id_fk" FOREIGN KEY ("productId") REFERENCES "public"."product"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "delivered_item" ADD CONSTRAINT "delivered_item_orderId_order_id_fk" FOREIGN KEY ("orderId") REFERENCES "public"."order"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "delivered_item" ADD CONSTRAINT "delivered_item_orderItemId_order_item_id_fk" FOREIGN KEY ("orderItemId") REFERENCES "public"."order_item"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_item" ADD CONSTRAINT "order_item_orderId_order_id_fk" FOREIGN KEY ("orderId") REFERENCES "public"."order"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_item" ADD CONSTRAINT "order_item_productId_product_id_fk" FOREIGN KEY ("productId") REFERENCES "public"."product"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order" ADD CONSTRAINT "order_customerId_user_id_fk" FOREIGN KEY ("customerId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "wallet_transaction" ADD CONSTRAINT "wallet_transaction_customerId_user_id_fk" FOREIGN KEY ("customerId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "wallet_transaction" ADD CONSTRAINT "wallet_transaction_orderId_order_id_fk" FOREIGN KEY ("orderId") REFERENCES "public"."order"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "wallet_transaction" ADD CONSTRAINT "wallet_transaction_createdBy_user_id_fk" FOREIGN KEY ("createdBy") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notification" ADD CONSTRAINT "notification_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "extension_token" ADD CONSTRAINT "extension_token_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "community_post" ADD CONSTRAINT "community_post_authorId_user_id_fk" FOREIGN KEY ("authorId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "community_post" ADD CONSTRAINT "community_post_categoryId_community_category_id_fk" FOREIGN KEY ("categoryId") REFERENCES "public"."community_category"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "community_reply" ADD CONSTRAINT "community_reply_postId_community_post_id_fk" FOREIGN KEY ("postId") REFERENCES "public"."community_post"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "community_reply" ADD CONSTRAINT "community_reply_authorId_user_id_fk" FOREIGN KEY ("authorId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "community_report" ADD CONSTRAINT "community_report_reporterId_user_id_fk" FOREIGN KEY ("reporterId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "community_report" ADD CONSTRAINT "community_report_postId_community_post_id_fk" FOREIGN KEY ("postId") REFERENCES "public"."community_post"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "community_report" ADD CONSTRAINT "community_report_replyId_community_reply_id_fk" FOREIGN KEY ("replyId") REFERENCES "public"."community_reply"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "community_report" ADD CONSTRAINT "community_report_reviewedBy_user_id_fk" FOREIGN KEY ("reviewedBy") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "community_subscription" ADD CONSTRAINT "community_subscription_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "community_subscription" ADD CONSTRAINT "community_subscription_postId_community_post_id_fk" FOREIGN KEY ("postId") REFERENCES "public"."community_post"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "community_upvote" ADD CONSTRAINT "community_upvote_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "community_upvote" ADD CONSTRAINT "community_upvote_postId_community_post_id_fk" FOREIGN KEY ("postId") REFERENCES "public"."community_post"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "community_upvote" ADD CONSTRAINT "community_upvote_replyId_community_reply_id_fk" FOREIGN KEY ("replyId") REFERENCES "public"."community_reply"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "community_view" ADD CONSTRAINT "community_view_postId_community_post_id_fk" FOREIGN KEY ("postId") REFERENCES "public"."community_post"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "community_view" ADD CONSTRAINT "community_view_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "warranty_claim" ADD CONSTRAINT "warranty_claim_deliveredItemId_delivered_item_id_fk" FOREIGN KEY ("deliveredItemId") REFERENCES "public"."delivered_item"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "warranty_claim" ADD CONSTRAINT "warranty_claim_customerId_user_id_fk" FOREIGN KEY ("customerId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "warranty_claim" ADD CONSTRAINT "warranty_claim_replacementItemId_delivered_item_id_fk" FOREIGN KEY ("replacementItemId") REFERENCES "public"."delivered_item"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "customer_product_idx" ON "customer_price" USING btree ("customerId","productId");--> statement-breakpoint
CREATE UNIQUE INDEX "upvote_user_post_idx" ON "community_upvote" USING btree ("userId","postId");--> statement-breakpoint
CREATE UNIQUE INDEX "upvote_user_reply_idx" ON "community_upvote" USING btree ("userId","replyId");