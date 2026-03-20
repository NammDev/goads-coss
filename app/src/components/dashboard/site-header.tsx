'use client'

import * as React from 'react'
import { BellIcon, Search } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { ModeToggle } from '@/components/mode-toggle'
import { CartButtonWrapper } from '@/components/cart-button-wrapper'
import SearchDialog from '@/components/shadcn-studio/blocks/dialog-search'
import NotificationDropdown from '@/components/shadcn-studio/blocks/dropdown-notification'
/** Serialized notification passed from server → client boundary */
export type SerializedNotification = {
  id: string
  userId: string
  type: 'order_created' | 'balance_topup' | 'item_delivered' | 'warranty_expiring' | 'warranty_claimed' | 'community_reply' | 'community_solution' | 'system'
  title: string
  message: string
  linkUrl: string | null
  read: boolean
  createdAt: string
}

type SiteHeaderProps = {
  userId?: string
  notifications?: SerializedNotification[]
  unreadCount?: number
}

export function SiteHeader({ userId, notifications = [], unreadCount = 0 }: SiteHeaderProps) {
  return (
    <header className="bg-background sticky top-0 z-50 flex h-14 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-14">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />

        {/* Search — pixel-perfect from shadcnstore template */}
        <div className="flex-1 max-w-sm">
          <SearchDialog
            userId={userId}
            trigger={
              <button className="inline-flex items-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-8 px-3 py-1 relative w-full justify-start text-muted-foreground sm:pr-12 md:w-36 lg:w-56">
                <Search className="mr-2 h-3.5 w-3.5" />
                <span className="hidden lg:inline-flex">Search...</span>
                <span className="inline-flex lg:hidden">Search...</span>
                <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-4 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                  <span className="text-xs">⌘</span>K
                </kbd>
              </button>
            }
          />
        </div>

        {/* Right side */}
        <div className="ml-auto flex items-center gap-1">
          <CartButtonWrapper />
          <NotificationDropdown
            trigger={
              <Button variant="ghost" size="icon" className="relative cursor-pointer">
                <BellIcon />
                {unreadCount > 0 && (
                  <span className="bg-destructive absolute top-2 right-2.5 size-2 rounded-full" />
                )}
              </Button>
            }
            notifications={notifications}
            unreadCount={unreadCount}
          />
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
