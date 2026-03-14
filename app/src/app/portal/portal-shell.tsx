'use client'

import { SidebarProvider } from '@/components/ui/sidebar'
import { DashboardSidebar } from '@/components/dashboard/dashboard-sidebar'
import { DashboardHeader } from '@/components/dashboard/dashboard-header'
import { buildPortalNavGroups } from '@/data/portal-nav'

interface PortalShellProps {
  userName: string
  userId: string
  productCounts: Record<string, number>
  children: React.ReactNode
}

/** Client wrapper — keeps Lucide icons in client boundary */
export function PortalShell({ userName, userId, productCounts, children }: PortalShellProps) {
  const portalNavGroups = buildPortalNavGroups(productCounts)

  return (
    <SidebarProvider>
      <DashboardSidebar navGroups={portalNavGroups} showPendingWidget={false} />
      <div className="flex min-h-svh flex-1 flex-col">
        <DashboardHeader userName={userName} userId={userId} userRole="Customer" />
        <main className="flex-1 px-4 py-6 sm:px-6">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  )
}
