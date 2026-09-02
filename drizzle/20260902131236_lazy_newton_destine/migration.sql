CREATE TABLE "craftspeople" (
	"id_craft" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"uid" uuid NOT NULL UNIQUE,
	"nom_business" text NOT NULL,
	"description" text,
	"category" text,
	"experience_years" integer,
	"location" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "photos" (
	"id_photo" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"id_craft" uuid,
	"id_serv" uuid,
	"url" text NOT NULL,
	"type" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "reviews" (
	"id_review" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"uid" uuid NOT NULL,
	"id_craft" uuid NOT NULL,
	"note" integer NOT NULL,
	"date" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "services" (
	"id_serv" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"id_craft" uuid NOT NULL,
	"nom" text NOT NULL,
	"description" text,
	"prix" numeric(10,2),
	"duree_estimee" integer,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "users" (
	"uid" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"email" text NOT NULL UNIQUE,
	"password" text NOT NULL,
	"phone" text,
	"type" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "craftspeople" ADD CONSTRAINT "craftspeople_uid_users_uid_fkey" FOREIGN KEY ("uid") REFERENCES "users"("uid");--> statement-breakpoint
ALTER TABLE "photos" ADD CONSTRAINT "photos_id_craft_craftspeople_id_craft_fkey" FOREIGN KEY ("id_craft") REFERENCES "craftspeople"("id_craft");--> statement-breakpoint
ALTER TABLE "photos" ADD CONSTRAINT "photos_id_serv_services_id_serv_fkey" FOREIGN KEY ("id_serv") REFERENCES "services"("id_serv");--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_uid_users_uid_fkey" FOREIGN KEY ("uid") REFERENCES "users"("uid");--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_id_craft_craftspeople_id_craft_fkey" FOREIGN KEY ("id_craft") REFERENCES "craftspeople"("id_craft");--> statement-breakpoint
ALTER TABLE "services" ADD CONSTRAINT "services_id_craft_craftspeople_id_craft_fkey" FOREIGN KEY ("id_craft") REFERENCES "craftspeople"("id_craft");