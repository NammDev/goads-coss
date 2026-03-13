import { auth, currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

type Role = 'super_admin' | 'staff' | 'customer'

/**
 * Server-side role guard — use in layout.tsx or page.tsx (server components only).
 * Redirects to /sign-in if no session, /unauthorized if role not allowed.
 * Returns session-compatible shape: { user: { id, name, email, role, image } }
 */
export async function requireRole(...allowedRoles: Role[]) {
  const { userId } = await auth()

  if (!userId) {
    redirect('/sign-in')
  }

  const user = await currentUser()
  if (!user) redirect('/sign-in')

  const role = (user.publicMetadata.role as Role) ?? 'customer'

  if (!allowedRoles.includes(role)) {
    redirect('/unauthorized')
  }

  return {
    user: {
      id: userId,
      name: user.firstName
        ? `${user.firstName} ${user.lastName ?? ''}`.trim()
        : (user.emailAddresses[0]?.emailAddress ?? 'User'),
      email: user.emailAddresses[0]?.emailAddress ?? '',
      role,
      image: user.imageUrl,
    },
  }
}
