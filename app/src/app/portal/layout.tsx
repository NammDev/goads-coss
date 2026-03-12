'use client'

import { useMemo } from 'react'
import { SidebarProvider } from '@/components/ui/sidebar'
import { DashboardSidebar } from '@/components/dashboard/dashboard-sidebar'
import { DashboardHeader } from '@/components/dashboard/dashboard-header'
import { buildPortalNavItems } from '@/data/portal-nav'
import type { NavGroup } from '@/data/admin-nav'

const CURRENT_CUSTOMER_ID = 'cust-001'

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const portalNavGroups: NavGroup[] = useMemo(
    () => [{ items: buildPortalNavItems(CURRENT_CUSTOMER_ID) }],
    [],
  )

  return (
    <SidebarProvider>
      <DashboardSidebar navGroups={portalNavGroups} showPendingWidget={false} />
      <div className="flex min-h-svh flex-1 flex-col">
        <DashboardHeader userName="Nguyen Van A" userRole="Customer" />
        <main className="flex-1 px-4 py-6 sm:px-6">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  )
}
