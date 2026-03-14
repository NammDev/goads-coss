import { eq, desc, count, and } from "drizzle-orm";
import { db } from "@/lib/db";
import { notifications } from "@/lib/db/schema";

/** Fetch latest notifications for a user */
export async function getNotifications(userId: string, limit = 20) {
  return db
    .select()
    .from(notifications)
    .where(eq(notifications.userId, userId))
    .orderBy(desc(notifications.createdAt))
    .limit(limit);
}

/** Count unread notifications for a user */
export async function getUnreadNotificationCount(userId: string) {
  const [result] = await db
    .select({ count: count() })
    .from(notifications)
    .where(
      and(eq(notifications.userId, userId), eq(notifications.read, false))
    );
  return result?.count ?? 0;
}

/** Mark a single notification as read */
export async function markNotificationAsRead(notificationId: string) {
  await db
    .update(notifications)
    .set({ read: true })
    .where(eq(notifications.id, notificationId));
}

/** Mark all notifications as read for a user */
export async function markAllNotificationsAsRead(userId: string) {
  await db
    .update(notifications)
    .set({ read: true })
    .where(
      and(eq(notifications.userId, userId), eq(notifications.read, false))
    );
}
