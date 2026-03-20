import { subDays, startOfMonth, endOfMonth, subMonths, format } from "date-fns"
import type { DateRangeParams } from "@/lib/db/queries/date-range-utils"

/** Resolve URL search params (preset or from/to) into DateRangeParams for DB queries */
export function resolveDateRange(
  searchParams: Record<string, string | string[] | undefined>,
): DateRangeParams | undefined {
  const preset = searchParams.preset as string | undefined
  const from = searchParams.from as string | undefined
  const to = searchParams.to as string | undefined

  if (preset) {
    return resolvePresetToParams(preset)
  }

  if (from && to) {
    return { from, to }
  }

  // No filter = all time
  return undefined
}

function resolvePresetToParams(preset: string): DateRangeParams | undefined {
  const today = new Date()
  const fmt = (d: Date) => format(d, "yyyy-MM-dd")

  switch (preset) {
    case "today":
      return { from: fmt(today), to: fmt(today) }
    case "7d":
      return { from: fmt(subDays(today, 6)), to: fmt(today) }
    case "30d":
      return { from: fmt(subDays(today, 29)), to: fmt(today) }
    case "90d":
      return { from: fmt(subDays(today, 89)), to: fmt(today) }
    case "this-month":
      return { from: fmt(startOfMonth(today)), to: fmt(today) }
    case "last-month": {
      const prev = subMonths(today, 1)
      return { from: fmt(startOfMonth(prev)), to: fmt(endOfMonth(prev)) }
    }
    case "all":
      return undefined
    default:
      return undefined
  }
}
