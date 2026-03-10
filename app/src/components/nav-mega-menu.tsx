'use client'

import Link from 'next/link'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { AgencyPanel, ProductsPanel, ResourcesPanel, ToolsPanel } from '@/components/nav-mega-menu-panel'

/* ---------- trigger / link styles ---------- */

const triggerClass =
  'text-sm text-muted-foreground transition-all hover:text-foreground hover:bg-primary/15! focus:bg-primary/15! bg-transparent! data-[state=open]:bg-primary/10! data-[state=open]:text-foreground px-2.5! h-auto! py-1.5! font-normal! gap-0.5 rounded-md! cursor-pointer'

const linkClass =
  'text-sm text-muted-foreground transition-all hover:text-foreground hover:bg-primary/15 rounded-md px-2.5 py-1.5'

/* ---------- main export ---------- */

export function NavMegaMenu() {
  return (
    <NavigationMenu viewport={true} className="static" delayDuration={0} skipDelayDuration={500}>
      <NavigationMenuList className="gap-4">

        <NavigationMenuItem>
          <NavigationMenuTrigger className={triggerClass}>
            Agency Accounts
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <AgencyPanel />
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className={triggerClass}>
            Products
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ProductsPanel />
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className={triggerClass}>
            Tools
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ToolsPanel />
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className={triggerClass}>
            Resources
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ResourcesPanel />
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/about" className={linkClass}>
              About
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

      </NavigationMenuList>
    </NavigationMenu>
  )
}
