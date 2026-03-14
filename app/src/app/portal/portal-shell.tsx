'use client'

import { SidebarProvider } from '@/components/ui/sidebar'
import { DashboardSidebar } from '@/components/dashboard/dashboard-sidebar'
import { DashboardHeader } from '@/components/dashboard/dashboard-header'
import { buildPortalNavItems } from '@/data/portal-nav'
import type { NavGroup } from '@/data/admin-nav'
import type { SerializedNotification } from '@/components/dashboard/dashboard-header'

interface PortalShellProps {
  userName: string
  productCounts: Record<string, number>
  notifications?: SerializedNotification[]
  unreadCount?: number
  children: React.ReactNode
}

/** Client wrapper — keeps Lucide icons in client boundary */
export function PortalShell({ userName, productCounts, notifications, unreadCount, children }: PortalShellProps) {
  const portalNavGroups: NavGroup[] = [
    { items: buildPortalNavItems(productCounts) },
  ]

  return (
    <SidebarProvider>
      <DashboardSidebar navGroups={portalNavGroups} showPendingWidget={false} />
      <div className="flex min-h-svh flex-1 flex-col">
        <DashboardHeader userName={userName} userRole="Customer" notifications={notifications} unreadCount={unreadCount} />
        <main className="flex-1 px-4 py-6 sm:px-6">
          {children}
        </main>
      </div>
    </SidebarProvider>
  )
}
