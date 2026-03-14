import { eq } from 'drizzle-orm'
import { requireRole } from '@/lib/auth/require-role'
import { db } from '@/lib/db'
import { users } from '@/lib/db/schema'
import { ClerkProfile } from './clerk-profile'

export default async function PortalProfilePage() {
  const session = await requireRole('customer')

  const rows = await db
    .select({ telegramId: users.telegramId })
    .from(users)
    .where(eq(users.id, session.user.id))
  const telegramId = rows[0]?.telegramId ?? ''

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Profile</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Manage your account, security, and connected accounts.
        </p>
      </div>

      <ClerkProfile telegramId={telegramId} />
    </div>
  )
}
