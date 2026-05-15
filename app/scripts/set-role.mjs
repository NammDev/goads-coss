#!/usr/bin/env node
/**
 * Set a Clerk user's role (and sync to DB).
 *
 * Usage:
 *   node scripts/set-role.mjs <email> <role>
 *
 * Roles: super_admin | staff | customer
 *
 * Updates BOTH:
 *   - Clerk publicMetadata.role  (read by require-role.ts)
 *   - DB user.role               (read by community-admin-actions etc.)
 *
 * Also upserts the DB user row if missing (e.g. if Clerk webhook didn't fire).
 */
import { config } from "dotenv"
import postgres from "postgres"

config({ path: ".env.local" })

const [email, role] = process.argv.slice(2)

if (!email || !role) {
  console.error("Usage: node scripts/set-role.mjs <email> <role>")
  console.error("Roles: super_admin | staff | customer")
  process.exit(1)
}

const VALID_ROLES = ["super_admin", "staff", "customer"]
if (!VALID_ROLES.includes(role)) {
  console.error(`Invalid role "${role}". Must be one of: ${VALID_ROLES.join(", ")}`)
  process.exit(1)
}

const CLERK_SECRET = process.env.CLERK_SECRET_KEY
if (!CLERK_SECRET) {
  console.error("CLERK_SECRET_KEY missing in .env.local")
  process.exit(1)
}

// ── 1. Find Clerk user by email ──
const searchRes = await fetch(
  `https://api.clerk.com/v1/users?email_address=${encodeURIComponent(email)}`,
  { headers: { Authorization: `Bearer ${CLERK_SECRET}` } },
)
if (!searchRes.ok) {
  console.error("Clerk lookup failed:", await searchRes.text())
  process.exit(1)
}
const users = await searchRes.json()
if (!Array.isArray(users) || users.length === 0) {
  console.error(`No Clerk user found with email: ${email}`)
  process.exit(1)
}
const clerkUser = users[0]
const fullName =
  [clerkUser.first_name, clerkUser.last_name].filter(Boolean).join(" ").trim() ||
  email
console.log(`Found Clerk user: ${clerkUser.id} (${fullName})`)

// ── 2. Update Clerk publicMetadata ──
const patchRes = await fetch(
  `https://api.clerk.com/v1/users/${clerkUser.id}/metadata`,
  {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${CLERK_SECRET}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ public_metadata: { role } }),
  },
)
if (!patchRes.ok) {
  console.error("Clerk metadata update failed:", await patchRes.text())
  process.exit(1)
}
console.log(`✅ Clerk publicMetadata.role = ${role}`)

// ── 3. Upsert DB user row ──
const sql = postgres(process.env.DATABASE_URL, { prepare: false, max: 1 })
try {
  await sql`
    INSERT INTO "user" (id, name, email, role)
    VALUES (${clerkUser.id}, ${fullName}, ${email}, ${role}::user_role)
    ON CONFLICT (id) DO UPDATE SET
      role = EXCLUDED.role,
      name = EXCLUDED.name,
      email = EXCLUDED.email,
      "updatedAt" = now()
  `
  console.log(`✅ DB user.role = ${role}`)
} catch (e) {
  console.error("DB update failed:", e.message)
  process.exit(1)
} finally {
  await sql.end()
}

console.log("")
console.log("⚠️  Sign out & sign back in to refresh session token with new role.")
