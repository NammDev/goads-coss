'use client'

import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/dashboard/app-sidebar'
import { SiteHeader } from '@/components/dashboard/site-header'
import { SiteFooter } from '@/components/dashboard/site-footer'
import { buildPortalNavGroups } from '@/data/portal-nav'
import type { SerializedNotification } from '@/components/dashboard/site-header'

interface PortalShellProps {
  userName: string
  userEmail: string
  userId: string
  productCounts: Record<string, number>
  notifications?: SerializedNotification[]
  unreadCount?: number
  children: React.ReactNode
}

export function PortalShell({
  userName,
  userEmail,
  userId,
  productCounts,
  notifications,
  unreadCount,
  children,
}: PortalShellProps) {
  const navGroups = buildPortalNavGroups(productCounts)

  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': '16rem',
          '--sidebar-width-icon': '3rem',
        } as React.CSSProperties
      }
    >
      <AppSidebar
        navGroups={navGroups}
        user={{ name: userName, email: userEmail, role: 'Customer' }}
        title="Customer Portal"
        profileHref="/portal/profile"
      />
      <SidebarInset>
        <SiteHeader
          userId={userId}
          notifications={notifications}
          unreadCount={unreadCount}
        />
        <div className="@container/main flex flex-1 flex-col gap-4 p-4 lg:p-6">
          {children}
        </div>
        <SiteFooter />
      </SidebarInset>
    </SidebarProvider>
  )
}
