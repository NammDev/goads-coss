'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { ChevronRightIcon, FileWarningIcon, MoreVerticalIcon } from 'lucide-react'

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar'
import Logo from '@/assets/svg/logo'
import type { NavGroup, NavItem } from '@/data/admin-nav'

type DashboardSidebarProps = {
  navGroups: NavGroup[]
  /** Show pending approvals widget in footer */
  showPendingWidget?: boolean
  pendingCount?: number
}

export function DashboardSidebar({
  navGroups,
  showPendingWidget = false,
  pendingCount = 0,
}: DashboardSidebarProps) {
  const pathname = usePathname()

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" className="gap-2.5 !bg-transparent [&>svg]:size-8" asChild>
              <Link href="/">
                <Logo />
                <span className="text-xl font-semibold">GoAds</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {navGroups.map((group, groupIndex) => (
          <SidebarGroup key={group.label ?? groupIndex}>
            {group.label && <SidebarGroupLabel>{group.label}</SidebarGroupLabel>}
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map(item =>
                  item.children?.length ? (
                    <CollapsibleNavItem key={item.href} item={item} pathname={pathname} />
                  ) : (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        tooltip={item.label}
                        isActive={pathname === item.href || pathname.startsWith(item.href + '/')}
                        asChild
                      >
                        <Link href={item.href}>
                          <item.icon />
                          <span>{item.label}</span>
                        </Link>
                      </SidebarMenuButton>
                      {item.badge && (
                        <SidebarMenuBadge className="bg-primary/10 rounded-full">
                          {item.badge}
                        </SidebarMenuBadge>
                      )}
                    </SidebarMenuItem>
                  ),
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      {showPendingWidget && pendingCount > 0 && (
        <SidebarFooter className="[[data-state=collapsed]_&]:hidden">
          <PendingApprovalsWidget count={pendingCount} />
        </SidebarFooter>
      )}
    </Sidebar>
  )
}

/** Collapsible nav item with sub-menu children */
function CollapsibleNavItem({ item, pathname }: { item: NavItem; pathname: string }) {
  const isActive = pathname === item.href || pathname.startsWith(item.href + '/')

  return (
    <Collapsible asChild defaultOpen={isActive} className="group/collapsible">
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton tooltip={item.label} isActive={isActive}>
            <item.icon />
            <span>{item.label}</span>
            <ChevronRightIcon className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        {item.badge && (
          <SidebarMenuBadge className="bg-primary/10 rounded-full">
            {item.badge}
          </SidebarMenuBadge>
        )}
        <CollapsibleContent>
          <SidebarMenuSub>
            {item.children!.map((sub) => (
              <SidebarMenuSubItem key={sub.href}>
                <SidebarMenuSubButton asChild isActive={pathname === sub.href}>
                  <Link href={sub.href}>
                    <span>{sub.label}</span>
                    {sub.badge && (
                      <span className="ml-auto text-xs text-muted-foreground">{sub.badge}</span>
                    )}
                  </Link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  )
}

/** Sidebar footer widget showing pending approvals count */
function PendingApprovalsWidget({ count }: { count: number }) {
  return (
    <div className="relative flex flex-col gap-4 overflow-hidden rounded-md border p-4">
      {/* Decorative gradient blob */}
      <svg
        width="157"
        height="136"
        viewBox="0 0 157 136"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-0 left-0 blur-xl"
      >
        <g opacity="0.5" filter="url(#pending-blur)">
          <circle cx="56.5" cy="41" r="60" fill="var(--primary)" fillOpacity="0.4" />
        </g>
        <defs>
          <filter
            id="pending-blur"
            x="-43.5"
            y="-59"
            width="200"
            height="200"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feGaussianBlur stdDeviation="20" result="effect1_foregroundBlur" />
          </filter>
        </defs>
      </svg>

      <div className="z-1 flex justify-between gap-4">
        <Avatar className="rounded-sm shadow-lg">
          <AvatarFallback className="bg-sidebar rounded-sm">
            <FileWarningIcon className="size-4" />
          </AvatarFallback>
        </Avatar>
        <MoreVerticalIcon className="text-muted-foreground size-4" />
      </div>

      <div className="z-1">
        <p className="mb-2 text-sm">Pending Approvals</p>
        <p className="text-xl font-semibold">{count}</p>
      </div>
    </div>
  )
}
