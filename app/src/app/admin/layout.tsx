'use client'

import { SidebarProvider } from '@/components/ui/sidebar'
import { DashboardSidebar } from '@/components/dashboard/dashboard-sidebar'
import { DashboardHeader } from '@/components/dashboard/dashboard-header'
import { MobileWarning } from '@/components/dashboard/mobile-warning'
import { adminNavGroups } from '@/data/admin-nav'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <DashboardSidebar
        navGroups={adminNavGroups}
        showPendingWidget={true}
        pendingCount={13}
      />
      <div className="flex min-h-svh flex-1 flex-col">
        <DashboardHeader userName="nammdev" userRole="Super Admin" />
        <main className="flex-1 px-4 py-6 sm:px-6">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
        <MobileWarning />
      </div>
    </SidebarProvider>
  )
}
