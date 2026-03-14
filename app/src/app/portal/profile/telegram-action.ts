'use server'

import { eq } from 'drizzle-orm'
import { db } from '@/lib/db'
import { users } from '@/lib/db/schema'
import { requireRole } from '@/lib/auth/require-role'

/** Customer self-updates their Telegram username */
export async function updateTelegramId(telegramId: string) {
  try {
    const session = await requireRole('customer')

    await db
      .update(users)
      .set({ telegramId: telegramId || null })
      .where(eq(users.id, session.user.id))

    return { success: true }
  } catch (error) {
    return { success: false, error: 'Failed to update Telegram ID' }
  }
}
