# WT3 Phase 4: Encryption Utility + Seed Data

> Priority: **Medium** | Status: ✅ Complete | Depends on: Phase 1 (DB Setup), Phase 2 (Better Auth)

## Overview

Create AES-256-GCM encryption utility for sensitive fields (BM IDs, invite links, credentials). Build seed script for super_admin accounts and sample products.

## Key Insights

- `delivered_items` stores sensitive ad account data — must be encrypted at rest
- AES-256-GCM provides authenticated encryption (encrypt + integrity check)
- Encryption key stored in `.env.local` — 32 bytes hex-encoded
- Seed script creates initial super_admin users via Better Auth API (not raw DB insert) to ensure proper password hashing
- Sample products match existing marketing page data

## Requirements

### Functional
- Encrypt: plaintext → ciphertext (with IV + auth tag)
- Decrypt: ciphertext → plaintext
- Seed 2 super_admin accounts (nammdev, justin)
- Seed sample products matching existing product pages
- DB scripts in package.json all working

### Non-functional
- Encryption adds minimal overhead (AES is hardware-accelerated)
- Seed script is idempotent (skip if data exists)
- All secrets in `.env.local` only

## Architecture

```
Encrypt/Decrypt Flow:
  plaintext → encrypt(key, plaintext) → iv:authTag:ciphertext (hex string)
  stored string → decrypt(key, stored) → plaintext

Seed Flow:
  seed.ts
    → auth.api.signUpEmail() for super_admins (proper password hash)
    → db.insert(products) for sample products
    → Update user role to super_admin via db.update()
```

## Related Code Files

### Create
- `src/lib/db/encryption.ts` — AES-256-GCM encrypt/decrypt
- `src/lib/db/seed.ts` — seed script

### Modify
- `.env.local` — add ENCRYPTION_KEY
- `app/package.json` — add `db:seed` script (if not already added in Phase 1)

## Implementation Steps

### 1. Add Encryption Key to `.env.local`

Generate: `openssl rand -hex 32`

```env
ENCRYPTION_KEY="your-64-char-hex-string-here"
```

### 2. Create `src/lib/db/encryption.ts`

```ts
import { createCipheriv, createDecipheriv, randomBytes } from "node:crypto";

const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 16;
const AUTH_TAG_LENGTH = 16;

function getKey(): Buffer {
  const key = process.env.ENCRYPTION_KEY;
  if (!key) throw new Error("ENCRYPTION_KEY not set");
  return Buffer.from(key, "hex");
}

/** Encrypt plaintext → "iv:authTag:ciphertext" (hex) */
export function encrypt(plaintext: string): string {
  const key = getKey();
  const iv = randomBytes(IV_LENGTH);
  const cipher = createCipheriv(ALGORITHM, key, iv);

  let encrypted = cipher.update(plaintext, "utf8", "hex");
  encrypted += cipher.final("hex");
  const authTag = cipher.getAuthTag();

  return `${iv.toString("hex")}:${authTag.toString("hex")}:${encrypted}`;
}

/** Decrypt "iv:authTag:ciphertext" → plaintext */
export function decrypt(stored: string): string {
  const key = getKey();
  const [ivHex, authTagHex, ciphertext] = stored.split(":");

  const iv = Buffer.from(ivHex, "hex");
  const authTag = Buffer.from(authTagHex, "hex");
  const decipher = createDecipheriv(ALGORITHM, key, iv);
  decipher.setAuthTag(authTag);

  let decrypted = decipher.update(ciphertext, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
}
```

### 3. Create `src/lib/db/seed.ts`

```ts
import { db } from "./index";
import { users, products } from "./schema";
import { auth } from "@/lib/auth/auth";
import { eq } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";

async function seed() {
  console.log("🌱 Seeding database...");

  // --- Super Admin accounts ---
  const admins = [
    { name: "nammdev", email: "nammdev@goads.shop", password: "CHANGE_ME_IN_PROD" },
    { name: "justin", email: "justin@goads.shop", password: "CHANGE_ME_IN_PROD" },
  ];

  for (const admin of admins) {
    const existing = await db.query.users.findFirst({
      where: eq(users.email, admin.email),
    });

    if (existing) {
      console.log(`  ✓ ${admin.email} already exists, skipping`);
      // Ensure role is super_admin
      await db.update(users).set({ role: "super_admin" }).where(eq(users.email, admin.email));
      continue;
    }

    // Sign up via Better Auth (proper password hashing)
    await auth.api.signUpEmail({
      body: { name: admin.name, email: admin.email, password: admin.password },
    });

    // Update role to super_admin
    await db.update(users).set({ role: "super_admin" }).where(eq(users.email, admin.email));
    console.log(`  ✓ Created super_admin: ${admin.email}`);
  }

  // --- Sample Products ---
  const sampleProducts = [
    { name: "Meta Agency Account", slug: "meta-agency-account", type: "agency_account", price: "120.00" },
    { name: "Business Manager", slug: "business-manager", type: "bm", price: "80.00" },
    { name: "Facebook Profile", slug: "facebook-profile", type: "profile", price: "50.00" },
    { name: "Google Whitelisted Account", slug: "google-whitelisted-account", type: "google_agency", price: "200.00" },
    { name: "TikTok Agency Account", slug: "tiktok-agency-account", type: "tiktok_agency", price: "150.00" },
    { name: "TikTok Ad Account", slug: "tiktok-ad-account", type: "tiktok_account", price: "100.00" },
    { name: "Blue Verification Badge", slug: "blue-verification", type: "blue_verification", price: "250.00" },
    { name: "Account Unban Service", slug: "account-unban", type: "unban", price: "300.00" },
  ];

  for (const product of sampleProducts) {
    const existing = await db.query.products.findFirst({
      where: eq(products.slug, product.slug),
    });

    if (existing) {
      console.log(`  ✓ Product "${product.name}" exists, skipping`);
      continue;
    }

    await db.insert(products).values({
      id: createId(),
      ...product,
      currency: "USD",
      isActive: true,
      inventoryCount: 0,
    });
    console.log(`  ✓ Created product: ${product.name}`);
  }

  console.log("✅ Seed complete!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
```

### 4. Add Script to `package.json`

```json
"db:seed": "tsx src/lib/db/seed.ts"
```

Also install tsx if not present:
```bash
pnpm add -D tsx
```

### 5. Run Seed

```bash
pnpm db:seed
```

### 6. Verify

- Check Supabase dashboard: 2 users with role=super_admin
- Check products table: 8 products seeded
- Test encrypt/decrypt in a simple script or unit test

## Todo List

- [x] Add ENCRYPTION_KEY to `.env.local`
- [x] Create `src/lib/db/encryption.ts`
- [x] Test encrypt → decrypt roundtrip
- [x] Create `src/lib/db/seed.ts`
- [x] Install `tsx` dev dependency
- [x] Add `db:seed` script to package.json (uses `tsx --env-file=.env.local`)
- [x] Run `pnpm db:seed` — 2 super_admins + 8 products created
- [x] Idempotency verified (second run skips all)
- [x] Verify products in DB match expected data
- [x] Run `pnpm build` — no errors

## Success Criteria

- encrypt("hello") → decrypt(result) === "hello"
- Different encrypt calls produce different ciphertexts (random IV)
- 2 super_admin users in DB
- 8 products in DB
- Seed script is idempotent (run twice = same result)
- Build passes

## Risk Assessment

| Risk | Mitigation |
|------|-----------|
| Encryption key lost = data unrecoverable | Document key backup process; store in password manager |
| Seed passwords weak in dev | Mark clearly as CHANGE_ME_IN_PROD; production uses separate seed |
| Seed script not idempotent | Check existence before insert |

## Security

- ENCRYPTION_KEY: 256-bit, hex-encoded, in `.env.local` only
- Never log plaintext sensitive data
- Seed passwords must be changed before production deployment
- Encryption key rotation strategy: re-encrypt all records (future task)
