import type { Metadata } from 'next'
import { requireRole } from '@/lib/auth/require-role'
import { getProductCountsByCustomerId } from '@/lib/db/queries'
import { getNotifications, getUnreadNotificationCount } from '@/lib/db/queries/notification-queries'
import { PortalShell } from './portal-shell'

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const session = await requireRole('customer')
  const [productCounts, notifications, unreadCount] = await Promise.all([
    getProductCountsByCustomerId(session.user.id),
    getNotifications(session.user.id),
    getUnreadNotificationCount(session.user.id),
  ])

  // Serialize dates for client boundary
  const serializedNotifications = notifications.map((n) => ({
    ...n,
    createdAt: n.createdAt.toISOString(),
  }))

  return (
    <PortalShell
      userName={session.user.name ?? 'Customer'}
      userEmail={session.user.email}
      userId={session.user.id}
      productCounts={productCounts}
      notifications={serializedNotifications}
      unreadCount={unreadCount}
    >
      {children}
    </PortalShell>
  )
}
