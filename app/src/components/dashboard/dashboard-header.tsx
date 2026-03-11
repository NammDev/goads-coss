'use client'

import { BellIcon, SearchIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { SidebarTrigger } from '@/components/ui/sidebar'
import SearchDialog from '@/components/shadcn-studio/blocks/dialog-search'
import NotificationDropdown from '@/components/shadcn-studio/blocks/dropdown-notification'
import ProfileDropdown from '@/components/shadcn-studio/blocks/dropdown-profile'
import { DashboardBreadcrumb } from '@/components/dashboard/dashboard-breadcrumb'

type DashboardHeaderProps = {
  userName?: string
  userRole?: string
  userAvatar?: string
}

export function DashboardHeader({
  userName = 'Admin',
  userRole = 'Admin',
  userAvatar,
}: DashboardHeaderProps) {
  return (
    <header className="bg-card sticky top-0 z-50 border-b">
      <div className="flex items-center justify-between gap-6 px-4 py-2 sm:px-6">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="[&_svg]:!size-5" />
          <Separator orientation="vertical" className="hidden !h-4 sm:block" />
          <SearchDialog
            trigger={
              <>
                <Button variant="ghost" className="hidden !bg-transparent px-1 py-0 font-normal sm:block">
                  <div className="text-muted-foreground hidden items-center gap-1.5 text-sm sm:flex">
                    <SearchIcon />
                    <span>Search...</span>
                  </div>
                </Button>
                <Button variant="ghost" size="icon" className="sm:hidden">
                  <SearchIcon />
                  <span className="sr-only">Search</span>
                </Button>
              </>
            }
          />
        </div>
        <div className="flex items-center gap-1.5">
          <NotificationDropdown
            trigger={
              <Button variant="ghost" size="icon" className="relative">
                <BellIcon />
                <span className="bg-destructive absolute top-2 right-2.5 size-2 rounded-full" />
              </Button>
            }
          />
          <ProfileDropdown
            trigger={
              <Button variant="ghost" className="h-full p-0 font-normal sm:pr-1">
                <Avatar className="size-9.5 rounded-md">
                  {userAvatar && <AvatarImage src={userAvatar} />}
                  <AvatarFallback>{userName.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="hidden flex-col items-start gap-0.5 lg:flex">
                  <span className="text-sm font-medium">{userName}</span>
                  <span className="text-muted-foreground text-xs">{userRole}</span>
                </div>
              </Button>
            }
          />
        </div>
      </div>
      {/* Breadcrumbs below header bar */}
      <div className="border-t px-4 py-2 sm:px-6">
        <DashboardBreadcrumb />
      </div>
    </header>
  )
}
