import { auth } from '@clerk/nextjs/server'
import { eq } from 'drizzle-orm'
import { db } from '@/lib/db'
import { users } from '@/lib/db/schema'
import { getAllCustomers } from '@/lib/db/queries/customer-queries'
import { resolveDateRange } from '@/lib/date-range-presets'
import { generateCSV, csvResponse } from '@/lib/csv-utils'

const ADMIN_ROLES = ['super_admin', 'staff']

export async function GET(request: Request) {
  const { userId } = await auth()
  if (!userId) return new Response('Unauthorized', { status: 401 })

  const [user] = await db.select({ role: users.role }).from(users).where(eq(users.id, userId)).limit(1)
  if (!user || !ADMIN_ROLES.includes(user.role)) {
    return new Response('Forbidden', { status: 403 })
  }

  const url = new URL(request.url)
  const params = Object.fromEntries(url.searchParams)
  const dateRange = resolveDateRange(params)

  const customers = await getAllCustomers(dateRange)

  const headers = ['Name', 'Email', 'Role', 'Balance', 'Orders', 'Total Spent', 'Created At']
  const rows = customers.map((c) => [
    c.name,
    c.email,
    c.role,
    c.balance ?? '0',
    c.orderCount,
    c.totalSpent,
    c.createdAt.toISOString(),
  ])

  return csvResponse(generateCSV(headers, rows), 'customers.csv')
}
