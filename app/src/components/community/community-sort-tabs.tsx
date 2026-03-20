"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ClockIcon, TrendingUpIcon, FlameIcon } from "lucide-react"

const sortOptions = [
  { value: "recent", label: "Recent", icon: ClockIcon },
  { value: "top", label: "Top", icon: TrendingUpIcon },
  { value: "trending", label: "Trending", icon: FlameIcon },
] as const

export function CommunitySortTabs() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentSort = searchParams.get("sort") ?? "recent"

  function handleSort(sort: string) {
    const params = new URLSearchParams(searchParams.toString())
    params.set("sort", sort)
    params.delete("page")
    router.push(`/portal/community?${params.toString()}`)
  }

  return (
    <div className="flex items-center gap-1">
      {sortOptions.map(({ value, label, icon: Icon }) => (
        <Button
          key={value}
          variant={currentSort === value ? "secondary" : "ghost"}
          size="sm"
          onClick={() => handleSort(value)}
          className="gap-1.5 text-xs"
        >
          <Icon className="size-3.5" />
          {label}
        </Button>
      ))}
    </div>
  )
}
