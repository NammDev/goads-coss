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
import {
  AGENCY_ACCOUNTS,
  META_ASSETS,
  TIKTOK_ASSETS,
  RESOURCES_COMPANY,
  RESOURCES_LEARN,
  RESOURCES_SUPPORT,
  TOOLS_ALL,
} from '@/components/nav-mega-menu-data'

/* ---------- shared sub-components ---------- */

function MenuIcon({ Icon }: { Icon: React.ElementType }) {
  return (
    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted text-foreground">
      <Icon className="size-5" />
    </div>
  )
}

function MenuItem({
  icon: Icon,
  title,
  description,
  href,
}: {
  icon: React.ElementType
  title: string
  description: string
  href: string
}) {
  const isExternal = href.startsWith('http')
  return (
    <NavigationMenuLink asChild>
      {isExternal ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-row items-center gap-3 rounded-lg p-2.5 transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none"
        >
          <MenuIcon Icon={Icon} />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-foreground leading-snug">{title}</p>
            <p className="mt-0.5 text-xs text-muted-foreground leading-snug line-clamp-2">{description}</p>
          </div>
        </a>
      ) : (
        <Link
          href={href}
          className="flex flex-row items-center gap-3 rounded-lg p-2.5 transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none"
        >
          <MenuIcon Icon={Icon} />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-foreground leading-snug">{title}</p>
            <p className="mt-0.5 text-xs text-muted-foreground leading-snug line-clamp-2">{description}</p>
          </div>
        </Link>
      )}
    </NavigationMenuLink>
  )
}

function ColumnLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-2 px-2.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground/70">
      {children}
    </p>
  )
}

function MenuColumn({ label, items }: { label: string; items: typeof AGENCY_ACCOUNTS }) {
  return (
    <div className="w-64">
      <ColumnLabel>{label}</ColumnLabel>
      <ul className="space-y-0.5">
        {items.map(item => (
          <li key={item.href}><MenuItem {...item} /></li>
        ))}
      </ul>
    </div>
  )
}

/* ---------- 1. Agency Accounts (single column + CTA) ---------- */

function AgencyPanel() {
  return (
    <div className="flex gap-4 p-4">
      <MenuColumn label="By Platform" items={AGENCY_ACCOUNTS} />

      {/* Ready-to-Use Setups */}
      <div className="w-52 shrink-0">
        <div className="flex h-full flex-col justify-between rounded-xl border border-border/60 bg-muted/40 p-4">
          <div>
            <p className="text-sm font-semibold text-foreground">Ready-to-Use Setups</p>
            <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
              Skip the hassle — BMs, profiles, pages, pixels &amp; domains fully configured.
            </p>
          </div>
          <div className="mt-4 space-y-2">
            <Link
              href="/pricing"
              className="btn-cta-glow inline-flex w-full items-center justify-center rounded-md bg-primary px-3 py-2 text-xs font-medium text-primary-foreground transition-all hover:bg-primary/90"
            >
              Explore Setups
            </Link>
            <Link
              href="/talk-to-sales"
              className="inline-flex w-full items-center justify-center rounded-md border border-border px-3 py-2 text-xs font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              Custom Setup
            </Link>
          </div>
        </div>
      </div>

      {/* Need agency accounts? */}
      <div className="w-52 shrink-0">
        <div className="flex h-full flex-col justify-between rounded-xl border border-border/60 bg-muted/40 p-4">
          <div>
            <p className="text-sm font-semibold text-foreground">Need agency accounts?</p>
            <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
              7-day warranty, verified agency setup, and &lt;2h support response.
            </p>
          </div>
          <div className="mt-4 space-y-2">
            <Link
              href="/pricing"
              className="btn-cta-glow inline-flex w-full items-center justify-center rounded-md bg-primary px-3 py-2 text-xs font-medium text-primary-foreground transition-all hover:bg-primary/90"
            >
              View Pricing
            </Link>
            <Link
              href="/talk-to-sales"
              className="inline-flex w-full items-center justify-center rounded-md border border-border px-3 py-2 text-xs font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              Talk to Sales
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ---------- 2. Products (Meta + TikTok + CTA) ---------- */

function ProductsPanel() {
  return (
    <div className="flex gap-4 p-4">
      <MenuColumn label="Meta Assets" items={META_ASSETS} />
      <MenuColumn label="TikTok Assets" items={TIKTOK_ASSETS} />
      <div className="w-52 shrink-0">
        <div className="flex h-full flex-col justify-between rounded-xl border border-border/60 bg-muted/40 p-4">
          <div>
            <p className="text-sm font-semibold text-foreground">Ready-to-Use Setups</p>
            <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
              Skip the hassle. Get a complete ad infrastructure — BMs, profiles, pages, pixels &amp; domains — fully configured and ready to run ads.
            </p>
          </div>
          <div className="mt-4 space-y-2">
            <Link
              href="/pricing"
              className="btn-cta-glow inline-flex w-full items-center justify-center rounded-md bg-primary px-3 py-2 text-xs font-medium text-primary-foreground transition-all hover:bg-primary/90"
            >
              Explore Setups
            </Link>
            <Link
              href="/talk-to-sales"
              className="inline-flex w-full items-center justify-center rounded-md border border-border px-3 py-2 text-xs font-medium text-foreground transition-colors hover:bg-muted"
            >
              Custom Setup
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ---------- 3. Resources (Company + Learn + Support) ---------- */

function ResourcesPanel() {
  return (
    <div className="flex gap-4 p-4">
      <MenuColumn label="Company" items={RESOURCES_COMPANY} />
      <MenuColumn label="Learn" items={RESOURCES_LEARN} />
      <MenuColumn label="Support" items={RESOURCES_SUPPORT} />
    </div>
  )
}

/* ---------- trigger style ---------- */

const triggerClass =
  'text-sm text-muted-foreground transition-all hover:text-accent-foreground hover:bg-accent! focus:bg-accent! bg-transparent! data-[state=open]:bg-accent! data-[state=open]:text-accent-foreground px-2.5! h-auto! py-1.5! font-normal! gap-0.5 rounded-md! cursor-pointer'

const linkClass =
  'text-sm text-muted-foreground transition-all hover:text-accent-foreground hover:bg-accent rounded-md px-2.5 py-1.5'

/* ---------- main export ---------- */

export function NavMegaMenu() {
  return (
    <NavigationMenu viewport={true} className="static">
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
            Resources
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ResourcesPanel />
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href={TOOLS_ALL[0].href} className={linkClass}>
            Tools
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href="/about" className={linkClass}>
            About
          </Link>
        </NavigationMenuItem>

      </NavigationMenuList>
    </NavigationMenu>
  )
}
