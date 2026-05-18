CREATE TYPE "public"."topup_request_status" AS ENUM('pending', 'completed', 'failed', 'expired', 'cancelled');--> statement-breakpoint
CREATE TABLE "topup_request" (
	"id" text PRIMARY KEY NOT NULL,
	"customerId" text NOT NULL,
	"amount" numeric(12, 2) NOT NULL,
	"currency" text DEFAULT 'USD' NOT NULL,
	"status" "topup_request_status" DEFAULT 'pending' NOT NULL,
	"reference" text NOT NULL,
	"gatewayPaymentId" text,
	"paymentUrl" text,
	"qrCodeData" text,
	"expiresAt" timestamp NOT NULL,
	"completedAt" timestamp,
	"failureReason" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "topup_request_reference_unique" UNIQUE("reference")
);
--> statement-breakpoint
ALTER TABLE "wallet_transaction" ADD COLUMN "topupRequestId" text;--> statement-breakpoint
ALTER TABLE "topup_request" ADD CONSTRAINT "topup_request_customerId_user_id_fk" FOREIGN KEY ("customerId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "topup_request_customer_status_idx" ON "topup_request" USING btree ("customerId","status");--> statement-breakpoint
CREATE INDEX "topup_request_gateway_idx" ON "topup_request" USING btree ("gatewayPaymentId");--> statement-breakpoint
ALTER TABLE "wallet_transaction" ADD CONSTRAINT "wallet_transaction_topupRequestId_topup_request_id_fk" FOREIGN KEY ("topupRequestId") REFERENCES "public"."topup_request"("id") ON DELETE no action ON UPDATE no action;