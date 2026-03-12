import { requireRole } from '@/lib/auth/require-role'
import { getAllProductCounts, getPendingOrderCount } from '@/lib/db/queries'
import { AdminShell } from './admin-shell'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await requireRole('super_admin', 'staff')
  const roleLabel = session.user.role === 'super_admin' ? 'Super Admin' : 'Staff'
  const [productCounts, pendingOrderCount] = await Promise.all([
    getAllProductCounts(),
    getPendingOrderCount(),
  ])

  return (
    <AdminShell
      userName={session.user.name}
      userRole={roleLabel}
      productCounts={productCounts}
      pendingOrderCount={pendingOrderCount}
    >
      {children}
    </AdminShell>
  )
}
