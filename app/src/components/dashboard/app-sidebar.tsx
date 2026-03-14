'use client'

import Link from 'next/link'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { NavMain } from '@/components/dashboard/nav-main'
import { NavUser } from '@/components/dashboard/nav-user'
import { SidebarNotification } from '@/components/dashboard/sidebar-notification'
import type { NavGroup } from '@/data/admin-nav'

type AppSidebarProps = {
  navGroups: NavGroup[]
  user: {
    name: string
    email: string
    role: string
  }
  title?: string
  profileHref?: string
  /** Show pending approvals widget */
  pendingCount?: number
}

export function AppSidebar({
  navGroups,
  user,
  title = 'Admin Dashboard',
  profileHref,
  pendingCount,
}: AppSidebarProps) {
  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" className="gap-2.5 !bg-transparent" asChild>
              <Link href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">
                  G
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold text-base">GoAds</span>
                  <span className="truncate text-xs text-muted-foreground">{title}</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {navGroups.map((group, i) => (
          <NavMain
            key={group.label ?? i}
            groupLabel={group.label}
            items={group.items}
          />
        ))}
      </SidebarContent>

      <SidebarFooter>
        <SidebarNotification />
        {pendingCount !== undefined && pendingCount > 0 && (
          <PendingWidget count={pendingCount} />
        )}
        <NavUser user={user} profileHref={profileHref} />
      </SidebarFooter>
    </Sidebar>
  )
}

function PendingWidget({ count }: { count: number }) {
  return (
    <div className="[[data-state=collapsed]_&]:hidden relative flex flex-col gap-4 overflow-hidden rounded-md border p-4">
      <svg
        width="157" height="136" viewBox="0 0 157 136" fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-0 left-0 blur-xl"
      >
        <g opacity="0.5" filter="url(#pw-blur)">
          <circle cx="56.5" cy="41" r="60" fill="var(--primary)" fillOpacity="0.4" />
        </g>
        <defs>
          <filter id="pw-blur" x="-43.5" y="-59" width="200" height="200"
            filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feGaussianBlur stdDeviation="20" result="effect1_foregroundBlur" />
          </filter>
        </defs>
      </svg>
      <div className="z-1">
        <p className="mb-2 text-sm">Pending Approvals</p>
        <p className="text-xl font-semibold">{count}</p>
      </div>
    </div>
  )
}
