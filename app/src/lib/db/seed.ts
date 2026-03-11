import { db } from "./index";
import { users, products } from "./schema";
import { auth } from "@/lib/auth/auth";
import { eq } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";

const SUPER_ADMINS = [
  { name: "nammdev", email: "nammdev@goads.shop", password: "NammDev2024!" },
  { name: "justin", email: "justin@goads.shop", password: "Justin2024!" },
];

const SAMPLE_PRODUCTS = [
  { name: "Meta Agency Account", slug: "meta-agency-account", type: "agency_account" as const, price: "120.00" },
  { name: "Business Manager", slug: "business-manager", type: "bm" as const, price: "80.00" },
  { name: "Facebook Profile", slug: "facebook-profile", type: "profile" as const, price: "50.00" },
  { name: "Google Whitelisted Account", slug: "google-whitelisted-account", type: "google_agency" as const, price: "200.00" },
  { name: "TikTok Agency Account", slug: "tiktok-agency-account", type: "tiktok_agency" as const, price: "150.00" },
  { name: "TikTok Ad Account", slug: "tiktok-ad-account", type: "tiktok_account" as const, price: "100.00" },
  { name: "Blue Verification Badge", slug: "blue-verification", type: "blue_verification" as const, price: "250.00" },
  { name: "Account Unban Service", slug: "account-unban", type: "unban" as const, price: "300.00" },
];

async function seedAdmins() {
  for (const admin of SUPER_ADMINS) {
    const existing = await db.query.users.findFirst({
      where: eq(users.email, admin.email),
    });

    if (existing) {
      console.log(`  skipped (exists): ${admin.email}`);
      await db.update(users).set({ role: "super_admin" }).where(eq(users.email, admin.email));
      continue;
    }

    await auth.api.signUpEmail({
      body: { name: admin.name, email: admin.email, password: admin.password },
    });

    await db.update(users).set({ role: "super_admin" }).where(eq(users.email, admin.email));
    console.log(`  created super_admin: ${admin.email}`);
  }
}

async function seedProducts() {
  for (const product of SAMPLE_PRODUCTS) {
    const existing = await db.query.products.findFirst({
      where: eq(products.slug, product.slug),
    });

    if (existing) {
      console.log(`  skipped (exists): ${product.name}`);
      continue;
    }

    await db.insert(products).values({
      id: createId(),
      ...product,
      currency: "USD",
      isActive: true,
      inventoryCount: 0,
    });
    console.log(`  created product: ${product.name}`);
  }
}

async function seed() {
  console.log("Seeding database...");

  console.log("\n[super_admin accounts]");
  await seedAdmins();

  console.log("\n[products]");
  await seedProducts();

  console.log("\nSeed complete.");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
