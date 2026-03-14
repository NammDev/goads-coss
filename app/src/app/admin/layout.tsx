import { requireRole } from '@/lib/auth/require-role'
import { getAllProductCounts, getPendingOrderCount } from '@/lib/db/queries'
import { getNotifications, getUnreadNotificationCount } from '@/lib/db/queries/notification-queries'
import { AdminShell } from './admin-shell'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await requireRole('super_admin', 'staff')
  const roleLabel = session.user.role === 'super_admin' ? 'Super Admin' : 'Staff'
  const [productCounts, pendingOrderCount, notifications, unreadCount] = await Promise.all([
    getAllProductCounts(),
    getPendingOrderCount(),
    getNotifications(session.user.id),
    getUnreadNotificationCount(session.user.id),
  ])

  // Serialize dates for client boundary
  const serializedNotifications = notifications.map((n) => ({
    ...n,
    createdAt: n.createdAt.toISOString(),
  }))

  return (
    <AdminShell
      userName={session.user.name}
      userEmail={session.user.email}
      userRole={roleLabel}
      productCounts={productCounts}
      pendingOrderCount={pendingOrderCount}
      notifications={serializedNotifications}
      unreadCount={unreadCount}
    >
      {children}
    </AdminShell>
  )
}
