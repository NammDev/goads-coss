"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useRef, useCallback } from "react"
import { SearchIcon } from "lucide-react"
import { Input } from "@/components/ui/input"

export function CommunitySearchBar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      if (timerRef.current) clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => {
        const params = new URLSearchParams(searchParams.toString())
        if (value.trim()) {
          params.set("q", value.trim())
        } else {
          params.delete("q")
        }
        params.delete("page")
        router.push(`/community?${params.toString()}`)
      }, 300)
    },
    [router, searchParams],
  )

  return (
    <div className="relative w-full max-w-sm">
      <SearchIcon className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search posts..."
        defaultValue={searchParams.get("q") ?? ""}
        onChange={handleChange}
        className="pl-8"
      />
    </div>
  )
}
