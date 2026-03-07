"use client"

import { usePathname } from "next/navigation"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { docsTabs } from "@/data/docs-navigation"
import type { DocsNavItem } from "@/data/docs-navigation"
import { Fragment } from "react"

function findTitle(items: DocsNavItem[], slug: string): string | undefined {
  for (const item of items) {
    if (item.slug === slug) return item.title
    if (item.items) {
      const found = findTitle(item.items, slug)
      if (found) return found
    }
  }
}

export function DocsBreadcrumb() {
  const pathname = usePathname()
  const segments = pathname.replace("/docs/", "").split("/").filter(Boolean)
  if (segments.length === 0) return null

  const tab = docsTabs.find((t) => t.slug === segments[0])
  const crumbs = [{ label: "Docs", href: "/docs" }]

  if (tab) {
    crumbs.push({ label: tab.title, href: `/docs/${tab.slug}` })
    for (let i = 1; i < segments.length; i++) {
      const title = findTitle(tab.items, segments[i])
      const href = `/docs/${segments.slice(0, i + 1).join("/")}`
      crumbs.push({ label: title ?? segments[i], href })
    }
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {crumbs.map((crumb, i) => (
          <Fragment key={crumb.href}>
            {i > 0 && <BreadcrumbSeparator />}
            <BreadcrumbItem>
              {i === crumbs.length - 1 ? (
                <span className="text-foreground">{crumb.label}</span>
              ) : (
                <BreadcrumbLink href={crumb.href}>
                  {crumb.label}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
