ALTER TABLE "delivered_item" ADD COLUMN IF NOT EXISTS "customerNote" text;--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "delivered_item_order_idx" ON "delivered_item" USING btree ("orderId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "delivered_item_type_idx" ON "delivered_item" USING btree ("productType");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "order_item_order_idx" ON "order_item" USING btree ("orderId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "order_item_product_idx" ON "order_item" USING btree ("productId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "order_customer_idx" ON "order" USING btree ("customerId");
