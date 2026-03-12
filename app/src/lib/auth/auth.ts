import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { db } from "@/lib/db";
import {
  users,
  sessions,
  accounts,
  verifications,
} from "@/lib/db/schema";

export const auth = betterAuth({
  trustedOrigins: [
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  ],
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      // Better Auth expects singular keys matching model names
      user: users,
      session: sessions,
      account: accounts,
      verification: verifications,
    },
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "customer",
        input: false, // Users cannot self-assign roles
      },
      telegramId: {
        type: "string",
        required: false,
        input: false,
      },
      notes: {
        type: "string",
        required: false,
        input: false,
      },
    },
  },
  plugins: [nextCookies()], // MUST be last in plugins array
});

/** Session type for use in server components and middleware */
export type Session = typeof auth.$Infer.Session;
