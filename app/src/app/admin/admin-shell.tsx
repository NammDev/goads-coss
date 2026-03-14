'use client'

import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/dashboard/app-sidebar'
import { SiteHeader } from '@/components/dashboard/site-header'
import { SiteFooter } from '@/components/dashboard/site-footer'
import { MobileWarning } from '@/components/dashboard/mobile-warning'
import { buildAdminNavGroups } from '@/data/admin-nav'
import type { SerializedNotification } from '@/components/dashboard/site-header'

interface AdminShellProps {
  userName: string
  userEmail: string
  userRole: string
  productCounts: Record<string, number>
  pendingOrderCount: number
  notifications?: SerializedNotification[]
  unreadCount?: number
  children: React.ReactNode
}

export function AdminShell({
  userName,
  userEmail,
  userRole,
  productCounts,
  pendingOrderCount,
  notifications,
  unreadCount,
  children,
}: AdminShellProps) {
  const navGroups = buildAdminNavGroups(productCounts)

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
        user={{ name: userName, email: userEmail, role: userRole }}
        title="Admin Dashboard"
        profileHref="/admin/settings"
        pendingCount={pendingOrderCount}
      />
      <SidebarInset>
        <SiteHeader notifications={notifications} unreadCount={unreadCount} />
        <div className="@container/main flex flex-1 flex-col gap-4 p-4 lg:p-6">
          {children}
        </div>
        <SiteFooter />
        <MobileWarning />
      </SidebarInset>
    </SidebarProvider>
  )
}
