"use client"

import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { useState, useCallback } from "react"
import { format, subDays, startOfMonth, endOfMonth, subMonths } from "date-fns"
import { CalendarIcon } from "lucide-react"
import type { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

/** Preset date ranges for quick selection */
const PRESETS = [
  { label: "Today", value: "today" },
  { label: "7 days", value: "7d" },
  { label: "30 days", value: "30d" },
  { label: "90 days", value: "90d" },
  { label: "This month", value: "this-month" },
  { label: "Last month", value: "last-month" },
  { label: "All time", value: "all" },
] as const

type PresetValue = (typeof PRESETS)[number]["value"]

/** Resolve a preset label to a concrete date range */
function resolvePreset(preset: PresetValue): { from: Date; to: Date } | null {
  const today = new Date()
  switch (preset) {
    case "today":
      return { from: today, to: today }
    case "7d":
      return { from: subDays(today, 6), to: today }
    case "30d":
      return { from: subDays(today, 29), to: today }
    case "90d":
      return { from: subDays(today, 89), to: today }
    case "this-month":
      return { from: startOfMonth(today), to: today }
    case "last-month": {
      const prev = subMonths(today, 1)
      return { from: startOfMonth(prev), to: endOfMonth(prev) }
    }
    case "all":
      return null
    default:
      return null
  }
}

/** Parse search params into a date range */
function parseDateParams(searchParams: URLSearchParams): {
  range: DateRange | undefined
  activePreset: PresetValue | undefined
} {
  const preset = searchParams.get("preset") as PresetValue | null
  if (preset) {
    const resolved = resolvePreset(preset)
    return {
      range: resolved ? { from: resolved.from, to: resolved.to } : undefined,
      activePreset: preset,
    }
  }

  const from = searchParams.get("from")
  const to = searchParams.get("to")
  if (from && to) {
    return {
      range: { from: new Date(from), to: new Date(to) },
      activePreset: undefined,
    }
  }

  return { range: undefined, activePreset: "all" }
}

export function DateRangeFilter() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [open, setOpen] = useState(false)

  const { range, activePreset } = parseDateParams(searchParams)

  /** Build URL with new params and navigate */
  const navigate = useCallback(
    (params: Record<string, string>) => {
      const sp = new URLSearchParams()
      for (const [k, v] of Object.entries(params)) {
        if (v) sp.set(k, v)
      }
      const qs = sp.toString()
      router.push(qs ? `${pathname}?${qs}` : pathname)
    },
    [router, pathname],
  )

  /** Handle preset button click */
  function handlePreset(preset: PresetValue) {
    if (preset === "all") {
      navigate({})
    } else {
      navigate({ preset })
    }
  }

  /** Handle custom calendar range selection */
  function handleCalendarSelect(selected: DateRange | undefined) {
    if (selected?.from && selected?.to) {
      navigate({
        from: format(selected.from, "yyyy-MM-dd"),
        to: format(selected.to, "yyyy-MM-dd"),
      })
      setOpen(false)
    }
  }

  /** Display label for current selection */
  const displayLabel =
    activePreset && activePreset !== "all"
      ? PRESETS.find((p) => p.value === activePreset)?.label
      : range?.from && range?.to
        ? `${format(range.from, "MMM d")} – ${format(range.to, "MMM d, yyyy")}`
        : "All time"

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {/* Preset buttons */}
      {PRESETS.map((preset) => (
        <Button
          key={preset.value}
          variant={activePreset === preset.value ? "default" : "outline"}
          size="sm"
          className="h-8 text-xs"
          onClick={() => handlePreset(preset.value)}
        >
          {preset.label}
        </Button>
      ))}

      {/* Custom date range picker */}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant={!activePreset ? "default" : "outline"}
            size="sm"
            className={cn("h-8 gap-1.5 text-xs")}
          >
            <CalendarIcon className="size-3.5" />
            {!activePreset ? displayLabel : "Custom"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            mode="range"
            selected={range}
            onSelect={handleCalendarSelect}
            numberOfMonths={2}
            disabled={{ after: new Date() }}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
