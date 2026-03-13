import { db } from "./index";
import { users, products, orders, orderItems, deliveredItems } from "./schema";
import { createClerkClient } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";
import { encrypt } from "./encryption";

const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY! });

const SUPER_ADMINS = [
  { name: "nammdev", email: "nammdev@goads.shop", password: "NammDev2024!" },
  { name: "justin", email: "justin@goads.shop", password: "Justin2024!" },
];

const TEST_CUSTOMER = {
  name: "test",
  email: "test@gmail.com",
  password: "testtest",
};

const SAMPLE_PRODUCTS = [
  { name: "Meta Agency Account", slug: "meta-agency-account", type: "agency_account" as const, price: "120.00" },
  { name: "Business Manager", slug: "business-manager", type: "bm" as const, price: "80.00" },
  { name: "Facebook Profile", slug: "facebook-profile", type: "profile" as const, price: "50.00" },
  { name: "Page", slug: "facebook-page", type: "other" as const, price: "30.00" },
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

    const [firstName, ...rest] = admin.name.split(" ");
    const clerkUser = await clerk.users.createUser({
      emailAddress: [admin.email],
      password: admin.password,
      firstName,
      lastName: rest.join(" ") || undefined,
      publicMetadata: { role: "super_admin" },
    });

    await db.insert(users).values({
      id: clerkUser.id,
      name: admin.name,
      email: admin.email,
      role: "super_admin",
    }).onConflictDoUpdate({ target: users.id, set: { role: "super_admin" } });
    console.log(`  created super_admin: ${admin.email}`);
  }
}

async function seedTestCustomer() {
  const existing = await db.query.users.findFirst({
    where: eq(users.email, TEST_CUSTOMER.email),
  });

  if (existing) {
    console.log(`  skipped (exists): ${TEST_CUSTOMER.email}`);
    return;
  }

  const clerkUser = await clerk.users.createUser({
    emailAddress: [TEST_CUSTOMER.email],
    password: TEST_CUSTOMER.password,
    firstName: TEST_CUSTOMER.name,
    publicMetadata: { role: "customer" },
  });

  await db.insert(users).values({
    id: clerkUser.id,
    name: TEST_CUSTOMER.name,
    email: TEST_CUSTOMER.email,
    role: "customer",
  }).onConflictDoNothing();
  console.log(`  created customer: ${TEST_CUSTOMER.email}`);
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

async function seedSampleOrder() {
  // Find test customer and products
  const customer = await db.query.users.findFirst({
    where: eq(users.email, TEST_CUSTOMER.email),
  });
  const bmProduct = await db.query.products.findFirst({
    where: eq(products.slug, "business-manager"),
  });
  const profileProduct = await db.query.products.findFirst({
    where: eq(products.slug, "facebook-profile"),
  });

  if (!customer || !bmProduct || !profileProduct) {
    console.log("  skipped: missing customer or products");
    return;
  }

  // Check if order already exists
  const existingOrder = await db.query.orders.findFirst({
    where: eq(orders.customerId, customer.id),
  });
  if (existingOrder) {
    console.log("  skipped (exists): sample order");
    return;
  }

  // Create order
  const orderId = createId();
  const shareToken = createId();
  await db.insert(orders).values({
    id: orderId,
    customerId: customer.id,
    totalAmount: "210.00",
    currency: "USD",
    paymentMethod: "crypto",
    status: "delivered",
    shareToken,
    notes: "Sample setup order: 1 BM + 2 Profiles",
    deliveredAt: new Date(),
  });

  // Create order items
  const bmItemId = createId();
  const profileItemId = createId();
  await db.insert(orderItems).values([
    { id: bmItemId, orderId, productId: bmProduct.id, quantity: 1, unitPrice: "80.00" },
    { id: profileItemId, orderId, productId: profileProduct.id, quantity: 2, unitPrice: "50.00" },
  ]);

  // Create delivered items with encrypted credentials
  const hasEncryptionKey = !!process.env.ENCRYPTION_KEY;
  const maybeEncrypt = (json: object) => {
    const str = JSON.stringify(json);
    return hasEncryptionKey ? encrypt(str) : str;
  };

  await db.insert(deliveredItems).values([
    {
      id: createId(),
      orderId,
      orderItemId: bmItemId,
      productType: "bm",
      uid: "BM_100234",
      credentials: maybeEncrypt({ bmId: "100234", name: "GoAds BM Alpha", inviteLink: "https://business.facebook.com/..." }),
      status: "active",
      warrantyUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
    {
      id: createId(),
      orderId,
      orderItemId: profileItemId,
      productType: "profile",
      uid: "10023456789",
      credentials: maybeEncrypt({ password: "abc123", twoFa: "JBSWY3DPEHPK3PXP", email: "user1@gmail.com", passEmail: "email123" }),
      status: "active",
      warrantyUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
    {
      id: createId(),
      orderId,
      orderItemId: profileItemId,
      productType: "profile",
      uid: "10098765432",
      credentials: maybeEncrypt({ password: "xyz789", twoFa: "KRSXG5DJNZTQ", email: "user2@gmail.com" }),
      status: "active",
      warrantyUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  ]);

  console.log(`  created sample order #${orderId} with 3 delivered items`);
  console.log(`  share link: /orders/share/${shareToken}`);
}

async function seed() {
  console.log("Seeding database...");

  console.log("\n[super_admin accounts]");
  await seedAdmins();

  console.log("\n[test customer]");
  await seedTestCustomer();

  console.log("\n[products]");
  await seedProducts();

  console.log("\n[sample order]");
  await seedSampleOrder();

  console.log("\nSeed complete.");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
