'use client'

import { SidebarProvider } from '@/components/ui/sidebar'
import { DashboardSidebar } from '@/components/dashboard/dashboard-sidebar'
import { DashboardHeader } from '@/components/dashboard/dashboard-header'
import { MobileWarning } from '@/components/dashboard/mobile-warning'
import { buildAdminNavGroups } from '@/data/admin-nav'

interface AdminShellProps {
  userName: string
  userRole: string
  productCounts: Record<string, number>
  pendingOrderCount: number
  children: React.ReactNode
}

/** Client wrapper — keeps Lucide icons in client boundary */
export function AdminShell({ userName, userRole, productCounts, pendingOrderCount, children }: AdminShellProps) {
  const navGroups = buildAdminNavGroups(productCounts)

  return (
    <SidebarProvider>
      <DashboardSidebar
        navGroups={navGroups}
        showPendingWidget={true}
        pendingCount={pendingOrderCount}
      />
      <div className="flex min-h-svh flex-1 flex-col">
        <DashboardHeader userName={userName} userRole={userRole} />
        <main className="flex-1 px-4 py-6 sm:px-6">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
        <MobileWarning />
      </div>
    </SidebarProvider>
  )
}
