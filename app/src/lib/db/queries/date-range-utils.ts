import { gte, lte, and, type SQL } from "drizzle-orm"
import type { PgColumn } from "drizzle-orm/pg-core"

/** Date range filter params parsed from URL search params */
export type DateRangeParams = {
  from?: string // "yyyy-MM-dd"
  to?: string // "yyyy-MM-dd"
}

/** Build a WHERE clause filtering a column between from/to dates */
export function dateRangeWhere(
  column: PgColumn,
  params: DateRangeParams,
): SQL | undefined {
  const conditions: SQL[] = []

  if (params.from) {
    conditions.push(gte(column, new Date(params.from)))
  }
  if (params.to) {
    // Include the entire "to" day by setting time to end of day
    const toDate = new Date(params.to)
    toDate.setHours(23, 59, 59, 999)
    conditions.push(lte(column, toDate))
  }

  if (conditions.length === 0) return undefined
  if (conditions.length === 1) return conditions[0]
  return and(...conditions)
}
