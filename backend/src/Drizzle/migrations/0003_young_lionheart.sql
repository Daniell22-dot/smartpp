ALTER TABLE "products" ADD COLUMN "color" varchar(50);--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "operating_system" varchar(50);--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "screen_size" varchar(20);--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "warranty" varchar(100);--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "store" varchar(150);--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "condition" varchar(50);--> statement-breakpoint
CREATE INDEX "brand_idx" ON "products" USING btree ("brand");