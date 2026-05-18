import { NextRequest, NextResponse } from "next/server";
import { eq, and, lt } from "drizzle-orm";

import { db } from "@/lib/db";
import { topupRequests } from "@/lib/db/schema";
import { findExpiredPendingTopups } from "@/lib/db/queries/topup-queries";

/**
 * Cron job: expire stale pending topup requests.
 * Triggered by Vercel Cron every 5 minutes (configured in vercel.json).
 *
 * Auth: requires Authorization: Bearer ${CRON_SECRET} header.
 * The WHERE clause (status='pending' AND expiresAt < now()) makes each
 * UPDATE race-safe against concurrent webhook deliveries.
 */
export async function GET(req: NextRequest) {
  // Verify cron secret
  const authHeader = req.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const now = new Date();
  const expiredRows = await findExpiredPendingTopups(now, 200);

  if (expiredRows.length === 0) {
    return NextResponse.json({ processed: 0 });
  }

  // Batch update — each UPDATE has its own WHERE guard for race safety
  let processed = 0;
  for (const row of expiredRows) {
    const result = await db
      .update(topupRequests)
      .set({ status: "expired", updatedAt: new Date() })
      .where(
        and(
          eq(topupRequests.id, row.id),
          eq(topupRequests.status, "pending"),
          lt(topupRequests.expiresAt, now),
        ),
      );

    // Drizzle returns rowCount on postgres driver
    if ((result as unknown as { rowCount?: number }).rowCount ?? 1) {
      processed++;
    }
  }

  console.info(`[expire-topups] processed ${processed}/${expiredRows.length} rows`);
  return NextResponse.json({ processed });
}
