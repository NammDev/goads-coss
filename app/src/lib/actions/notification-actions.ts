"use server";

import { createId } from "@paralleldrive/cuid2";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { notifications } from "@/lib/db/schema";
import {
  markNotificationAsRead,
  markAllNotificationsAsRead,
} from "@/lib/db/queries/notification-queries";

type NotificationType = "order_created" | "balance_topup" | "item_delivered" | "system";

/** Internal helper — create a notification for a user */
export async function createNotification(params: {
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  linkUrl?: string;
}) {
  await db.insert(notifications).values({
    id: createId(),
    userId: params.userId,
    type: params.type,
    title: params.title,
    message: params.message,
    linkUrl: params.linkUrl ?? null,
  });
}

/** Mark a single notification as read */
export async function markRead(formData: FormData) {
  const { userId } = await auth();
  if (!userId) return { success: false, error: "Unauthorized" };

  const notificationId = formData.get("notificationId") as string;
  if (!notificationId) return { success: false, error: "Missing notificationId" };

  await markNotificationAsRead(notificationId);
  return { success: true };
}

/** Mark all notifications as read for current user */
export async function markAllRead() {
  const { userId } = await auth();
  if (!userId) return { success: false, error: "Unauthorized" };

  await markAllNotificationsAsRead(userId);
  return { success: true };
}
