'use client'

import Link from 'next/link'
import { Menu, Wrench } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'
import { SsLogo } from './site-header-icons'
import {
  AGENCY_ACCOUNTS,
  PRODUCT_ASSETS,
  PRODUCT_SERVICES,
  RESOURCES_COMPANY,
  RESOURCES_LEARN,
  RESOURCES_SUPPORT,
} from '@/components/nav-mega-menu-data'

const DRAWER_SECTIONS = [
  { label: 'Agency Accounts', items: AGENCY_ACCOUNTS },
  { label: 'Assets', items: PRODUCT_ASSETS },
  { label: 'Services', items: PRODUCT_SERVICES },
  { label: 'Company', items: RESOURCES_COMPANY },
  { label: 'Learn', items: RESOURCES_LEARN },
  { label: 'Support', items: RESOURCES_SUPPORT },
]

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="px-2 pb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground/70">
      {children}
    </p>
  )
}

function DrawerItem({ icon: Icon, title, href }: { icon: React.ElementType; title: string; description?: string; href: string }) {
  return (
    <SheetClose asChild>
      <Link href={href} className="flex items-center gap-3 rounded-lg px-2 py-2 text-sm text-foreground transition-colors hover:bg-muted/60">
        <Icon className="size-4 text-muted-foreground" />
        {title}
      </Link>
    </SheetClose>
  )
}

export function NavMobileDrawer() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="min-[1440px]:hidden cursor-pointer">
          <Menu className="size-5" />
          <span className="sr-only">Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 overflow-y-auto p-0">
        <SheetHeader className="flex flex-row items-center gap-2.5 px-5 py-4">
          <SsLogo />
          <SheetTitle className="text-lg font-semibold">goads/agency</SheetTitle>
        </SheetHeader>

        {DRAWER_SECTIONS.map(({ label, items }, i) => (
          <div key={label}>
            <div className={`flex flex-col gap-0.5 px-3 ${i === 0 ? 'pb-3' : 'py-3'}`}>
              <SectionLabel>{label}</SectionLabel>
              {items.map(item => <DrawerItem key={item.title} {...item} />)}
            </div>
            <Separator />
          </div>
        ))}

        {/* Tools */}
        <div className="flex flex-col gap-0.5 px-3 py-3">
          <DrawerItem icon={Wrench} title="Tools" href="/tools" />
        </div>
      </SheetContent>
    </Sheet>
  )
}
