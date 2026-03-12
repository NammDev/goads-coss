import { requireRole } from '@/lib/auth/require-role'
import { ProfileForm } from './profile-form'

export default async function PortalProfilePage() {
  const session = await requireRole('customer')

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Profile</h1>
        <p className="text-muted-foreground mt-1 text-sm">Manage your account information</p>
      </div>

      <ProfileForm
        name={session.user.name ?? ''}
        email={session.user.email}
      />
    </div>
  )
}
