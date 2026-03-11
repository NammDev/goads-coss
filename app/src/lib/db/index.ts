import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL!;

// Singleton pattern — prevent hot-reload connection leaks in dev
const globalForDb = globalThis as unknown as {
  conn: postgres.Sql | undefined;
};

const conn =
  globalForDb.conn ??
  postgres(connectionString, {
    prepare: false, // Required for Supabase Transaction pool mode
  });

if (process.env.NODE_ENV !== "production") globalForDb.conn = conn;

export const db = drizzle({ client: conn, schema });
