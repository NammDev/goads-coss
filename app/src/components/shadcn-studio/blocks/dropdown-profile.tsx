'use client'

import type { ReactNode } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useClerk, useUser } from '@clerk/nextjs'

import { UserIcon, WalletIcon, ShoppingCartIcon, LogOutIcon } from 'lucide-react'

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

type Props = {
  trigger: ReactNode
  defaultOpen?: boolean
  align?: 'start' | 'center' | 'end'
}

const ProfileDropdown = ({ trigger, defaultOpen, align = 'end' }: Props) => {
  const { signOut } = useClerk()
  const { user } = useUser()
  const pathname = usePathname()

  const name = user?.fullName ?? 'User'
  const email = user?.primaryEmailAddress?.emailAddress ?? ''
  const avatar = user?.imageUrl
  const initials = name.slice(0, 2).toUpperCase()

  // Detect if in admin or portal context
  const isAdmin = pathname.startsWith('/admin')
  const profileHref = isAdmin ? '/admin/settings' : '/portal/profile'
  const ordersHref = isAdmin ? '/admin/orders' : '/portal/orders'
  const walletHref = isAdmin ? '/admin/finance' : '/portal/wallet'

  return (
    <DropdownMenu defaultOpen={defaultOpen}>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-72" align={align || 'end'}>
        <DropdownMenuLabel className="flex items-center gap-3 px-3 py-2.5 font-normal">
          <div className="relative">
            <Avatar className="size-10">
              {avatar && <AvatarImage src={avatar} alt={name} />}
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <span className="ring-card absolute right-0 bottom-0 block size-2 rounded-full bg-green-600 ring-2" />
          </div>
          <div className="flex flex-1 flex-col items-start overflow-hidden">
            <span className="text-foreground truncate text-sm font-semibold">{name}</span>
            <span className="text-muted-foreground truncate text-xs">{email}</span>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem asChild className="px-3 py-2 text-sm">
            <Link href={profileHref}>
              <UserIcon className="text-foreground size-4" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="px-3 py-2 text-sm">
            <Link href={ordersHref}>
              <ShoppingCartIcon className="text-foreground size-4" />
              <span>Orders</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="px-3 py-2 text-sm">
            <Link href={walletHref}>
              <WalletIcon className="text-foreground size-4" />
              <span>{isAdmin ? 'Finance' : 'Wallet'}</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          variant="destructive"
          className="px-3 py-2 text-sm"
          onClick={() => signOut({ redirectUrl: '/' })}
        >
          <LogOutIcon className="size-4" />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ProfileDropdown
