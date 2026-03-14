"use client";

import { type ReactNode, useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  CheckCheckIcon,
  BellOffIcon,
  PackageCheckIcon,
  WalletIcon,
  ShoppingCartIcon,
  InfoIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { markRead, markAllRead } from "@/lib/actions/notification-actions";
import { formatRelativeTime } from "@/lib/format-relative-time";

/** Notification type from DB */
type Notification = {
  id: string;
  type: "order_created" | "balance_topup" | "item_delivered" | "system";
  title: string;
  message: string;
  linkUrl: string | null;
  read: boolean;
  createdAt: string;
};

type Props = {
  trigger: ReactNode;
  notifications?: Notification[];
  unreadCount?: number;
};

/** Icon per notification type */
function NotificationIcon({ type }: { type: Notification["type"] }) {
  const cls = "size-4 shrink-0";
  switch (type) {
    case "order_created":
      return <ShoppingCartIcon className={cls} />;
    case "balance_topup":
      return <WalletIcon className={cls} />;
    case "item_delivered":
      return <PackageCheckIcon className={cls} />;
    default:
      return <InfoIcon className={cls} />;
  }
}

const NotificationDropdown = ({
  trigger,
  notifications: initialNotifications = [],
  unreadCount: initialUnread = 0,
}: Props) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [items, setItems] = useState(initialNotifications);
  const [unread, setUnread] = useState(initialUnread);

  // Sync props when server re-renders
  useEffect(() => {
    setItems(initialNotifications);
    setUnread(initialUnread);
  }, [initialNotifications, initialUnread]);

  const handleMarkAllRead = () => {
    startTransition(async () => {
      await markAllRead();
      setItems((prev) => prev.map((n) => ({ ...n, read: true })));
      setUnread(0);
      router.refresh();
    });
  };

  const handleClick = (notification: Notification) => {
    if (!notification.read) {
      const fd = new FormData();
      fd.set("notificationId", notification.id);
      startTransition(async () => {
        await markRead(fd);
        setItems((prev) =>
          prev.map((n) => (n.id === notification.id ? { ...n, read: true } : n))
        );
        setUnread((c) => Math.max(0, c - 1));
        router.refresh();
      });
    }
    if (notification.linkUrl) {
      router.push(notification.linkUrl);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-xs sm:max-w-sm" align="end">
        <DropdownMenuLabel className="flex items-center justify-between gap-4">
          <span className="text-muted-foreground text-base font-normal uppercase">
            Notifications
          </span>
          <div className="flex items-center gap-2">
            {unread > 0 && (
              <Badge
                variant="secondary"
                className="bg-primary/10 text-primary font-normal"
              >
                {unread} New
              </Badge>
            )}
            {unread > 0 && (
              <Button
                variant="ghost"
                size="icon"
                className="size-7"
                onClick={handleMarkAllRead}
                disabled={isPending}
                title="Mark all as read"
              >
                <CheckCheckIcon className="size-4" />
              </Button>
            )}
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {items.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-8 text-center">
            <BellOffIcon className="text-muted-foreground size-8" />
            <p className="text-muted-foreground text-sm">No notifications yet</p>
          </div>
        ) : (
          <div className="max-h-80 overflow-y-auto">
            {items.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className="cursor-pointer gap-3 px-3 py-3"
                onClick={() => handleClick(notification)}
              >
                <div
                  className={`flex size-8 shrink-0 items-center justify-center rounded-full ${
                    notification.read
                      ? "bg-muted text-muted-foreground"
                      : "bg-primary/10 text-primary"
                  }`}
                >
                  <NotificationIcon type={notification.type} />
                </div>
                <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <span
                    className={`text-sm leading-tight ${
                      notification.read ? "font-normal" : "font-medium"
                    }`}
                  >
                    {notification.title}
                  </span>
                  <span className="text-muted-foreground truncate text-xs">
                    {notification.message}
                  </span>
                  <span className="text-muted-foreground text-xs">
                    {formatRelativeTime(notification.createdAt)}
                  </span>
                </div>
                {!notification.read && (
                  <div className="bg-primary size-2 shrink-0 rounded-full" />
                )}
              </DropdownMenuItem>
            ))}
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationDropdown;
