import type { Metadata } from 'next'
import { fontInter } from '@/fonts'
import { requireRole } from '@/lib/auth/require-role'
import { getProductCountsByCustomerId } from '@/lib/db/queries'
import { getNotifications, getUnreadNotificationCount } from '@/lib/db/queries/notification-queries'
import { AppClerkProvider } from '@/components/app-clerk-provider'
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
    <AppClerkProvider>
      {/* Foreplay admin design scope: Inter font + .portal token remap
          (dark sidebar + light/dark themeable content). See globals.css .portal */}
      <div className={`portal ${fontInter.variable} font-sans`}>
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
      </div>
    </AppClerkProvider>
  )
}
