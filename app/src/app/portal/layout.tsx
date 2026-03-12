import { requireRole } from '@/lib/auth/require-role'
import { getProductCountsByCustomerId } from '@/lib/db/queries'
import { PortalShell } from './portal-shell'

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const session = await requireRole('customer')
  const productCounts = await getProductCountsByCustomerId(session.user.id)

  return (
    <PortalShell userName={session.user.name ?? 'Customer'} productCounts={productCounts}>
      {children}
    </PortalShell>
  )
}
