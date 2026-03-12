import { getStaffMembers } from '@/lib/db/queries'
import { StaffPageClient } from './staff-client'
import type { StaffMember } from '@/components/dashboard/columns/staff-columns'

export default async function StaffPage() {
  const users = await getStaffMembers()

  const staff: StaffMember[] = users.map((u) => ({
    id: u.id,
    name: u.name,
    email: u.email,
    role: u.role as StaffMember['role'],
    online: false,
  }))

  return <StaffPageClient staff={staff} />
}
