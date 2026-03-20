"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"

interface CommunityMobileCategoriesProps {
  categories: { slug: string; name: string; icon: string | null }[]
}

export function CommunityMobileCategories({ categories }: CommunityMobileCategoriesProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const active = searchParams.get("category") ?? ""

  function handleClick(slug: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (slug) {
      params.set("category", slug)
    } else {
      params.delete("category")
    }
    params.delete("page")
    router.push(`/portal/community?${params.toString()}`)
  }

  return (
    <div className="flex flex-wrap gap-2 lg:hidden">
      <Button
        variant={!active ? "secondary" : "ghost"}
        size="sm"
        onClick={() => handleClick("")}
      >
        All
      </Button>
      {categories.map((cat) => (
        <Button
          key={cat.slug}
          variant={active === cat.slug ? "secondary" : "ghost"}
          size="sm"
          onClick={() => handleClick(cat.slug)}
        >
          {cat.icon && <span className="mr-1">{cat.icon}</span>}
          {cat.name}
        </Button>
      ))}
    </div>
  )
}
