CREATE TYPE "public"."notification_type" AS ENUM('order_created', 'balance_topup', 'item_delivered', 'system');--> statement-breakpoint
CREATE TYPE "public"."wallet_transaction_type" AS ENUM('topup', 'deduct');--> statement-breakpoint
ALTER TYPE "public"."product_type" ADD VALUE 'page' BEFORE 'google_agency';--> statement-breakpoint
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
DROP TABLE "account" CASCADE;--> statement-breakpoint
DROP TABLE "session" CASCADE;--> statement-breakpoint
DROP TABLE "verification" CASCADE;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "balance" numeric(12, 2) DEFAULT '0' NOT NULL;--> statement-breakpoint
ALTER TABLE "wallet_transaction" ADD CONSTRAINT "wallet_transaction_customerId_user_id_fk" FOREIGN KEY ("customerId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "wallet_transaction" ADD CONSTRAINT "wallet_transaction_orderId_order_id_fk" FOREIGN KEY ("orderId") REFERENCES "public"."order"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "wallet_transaction" ADD CONSTRAINT "wallet_transaction_createdBy_user_id_fk" FOREIGN KEY ("createdBy") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notification" ADD CONSTRAINT "notification_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "extension_token" ADD CONSTRAINT "extension_token_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN "emailVerified";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN "image";