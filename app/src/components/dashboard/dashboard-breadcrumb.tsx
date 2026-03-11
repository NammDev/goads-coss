'use client'

import { Fragment } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

/** Route segment → label mapping */
const SEGMENT_LABELS: Record<string, string> = {
  admin: 'Dashboard',
  portal: 'Dashboard',
  orders: 'Orders',
  customers: 'Customers',
  products: 'Products',
  finance: 'Finance',
  staff: 'Staff',
  settings: 'Settings',
  tools: 'Tools',
  profile: 'Profile',
  new: 'New',
}

type BreadcrumbSegment = {
  label: string
  href: string
}

function buildBreadcrumbs(pathname: string): BreadcrumbSegment[] {
  const segments = pathname.split('/').filter(Boolean)
  const crumbs: BreadcrumbSegment[] = []

  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i]
    const href = '/' + segments.slice(0, i + 1).join('/')
    const label = SEGMENT_LABELS[segment] ?? (segment.startsWith('ORD-') ? `#${segment}` : segment)

    crumbs.push({ label, href })
  }

  return crumbs
}

export function DashboardBreadcrumb() {
  const pathname = usePathname()
  const crumbs = buildBreadcrumbs(pathname)

  if (crumbs.length <= 1) return null

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1

          return (
            <Fragment key={crumb.href}>
              <BreadcrumbItem>
                {!isLast ? (
                  <BreadcrumbLink asChild>
                    <Link href={crumb.href}>{crumb.label}</Link>
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
