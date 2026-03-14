'use client'

import { ChevronRight } from 'lucide-react'
import type { ComponentType } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar'

type NavSubItem = {
  label: string
  href: string
  badge?: string
}

type NavItem = {
  icon: ComponentType
  label: string
  href: string
  badge?: string
  items?: NavSubItem[]
  children?: NavSubItem[]
}

type NavMainProps = {
  groupLabel?: string
  items: NavItem[]
}

export function NavMain({ groupLabel, items }: NavMainProps) {
  const pathname = usePathname()

  const isItemActive = (item: NavItem) => {
    // Root dashboard paths (/admin, /portal) — exact match only
    if (item.href === '/admin' || item.href === '/portal') return pathname === item.href
    return pathname === item.href || pathname.startsWith(item.href + '/')
  }

  return (
    <SidebarGroup>
      {groupLabel && <SidebarGroupLabel>{groupLabel}</SidebarGroupLabel>}
      <SidebarMenu>
        {items.map((item) => {
          const subs = item.children ?? item.items
          return subs?.length ? (
            <Collapsible
              key={item.label}
              asChild
              defaultOpen={item.label === 'Popular Tools' || subs.some((sub) => pathname === sub.href)}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip={item.label} isActive={isItemActive(item)} className="cursor-pointer">
                    <item.icon />
                    <span>{item.label}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                {item.badge && (
                  <SidebarMenuBadge className="bg-primary/10 rounded-full">
                    {item.badge}
                  </SidebarMenuBadge>
                )}
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {subs.map((sub) => (
                      <SidebarMenuSubItem key={sub.href}>
                        <SidebarMenuSubButton asChild isActive={pathname === sub.href} className="cursor-pointer">
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
          ) : (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton
                tooltip={item.label}
                isActive={isItemActive(item)}
                asChild
                className="cursor-pointer"
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
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
