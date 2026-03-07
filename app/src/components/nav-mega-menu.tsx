'use client'

import Link from 'next/link'
import { ArrowRightIcon, WrenchIcon } from 'lucide-react'
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
  PRODUCT_ASSETS,
  PRODUCT_SERVICES,
  RESOURCES_COMPANY,
  RESOURCES_LEARN,
  RESOURCES_SUPPORT,
  TOOLS_LIST,
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
  const cls = "flex flex-row items-center gap-3 rounded-lg p-2.5 transition-colors hover:bg-primary/15 hover:text-foreground focus:bg-primary/15 focus:text-foreground focus:outline-none"
  return (
    <NavigationMenuLink asChild>
      {isExternal ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
          <MenuIcon Icon={Icon} />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-foreground leading-snug">{title}</p>
            <p className="mt-0.5 text-xs text-muted-foreground leading-snug line-clamp-2">{description}</p>
          </div>
        </a>
      ) : (
        <Link href={href} className={cls}>
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
          <li key={item.href + item.title}><MenuItem {...item} /></li>
        ))}
      </ul>
    </div>
  )
}

function CtaCard({
  title,
  description,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: {
  title: string
  description: string
  primaryLabel: string
  primaryHref: string
  secondaryLabel?: string
  secondaryHref?: string
}) {
  return (
    <div className="w-52 shrink-0">
      <div className="flex h-full flex-col justify-between rounded-xl border border-border/60 bg-muted/40 p-4">
        <div>
          <p className="text-sm font-semibold text-foreground">{title}</p>
          <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">{description}</p>
        </div>
        <div className="mt-4 space-y-2">
          <Link
            href={primaryHref}
            className="btn-mirror-sweep btn-secondary inline-flex w-full items-center justify-center rounded-md bg-primary px-3 py-2 text-xs font-medium text-primary-foreground transition-all hover:bg-primary/90"
          >
            {primaryLabel}
          </Link>
          {secondaryLabel && secondaryHref && (
            <Link
              href={secondaryHref}
              className="inline-flex w-full items-center justify-center rounded-md border border-border px-3 py-2 text-xs font-medium text-foreground transition-colors hover:bg-primary/15 hover:text-foreground"
            >
              {secondaryLabel}
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

/* ---------- 1. Agency Accounts ---------- */

function AgencyPanel() {
  return (
    <div className="flex gap-4 p-4">
      <MenuColumn label="By Platform" items={AGENCY_ACCOUNTS} />
      <CtaCard
        title="Ready-to-Use Setups"
        description="Skip the hassle — BMs, profiles, pages, pixels & domains fully configured."
        primaryLabel="Explore Setups"
        primaryHref="/pricing"
        secondaryLabel="Talk to Sales"
        secondaryHref="/talk-to-sales"
      />
      <CtaCard
        title="Need agency accounts?"
        description="7-day warranty, verified agency setup, and <2h support response."
        primaryLabel="View Pricing"
        primaryHref="/pricing"
        secondaryLabel="Talk to Sales"
        secondaryHref="/talk-to-sales"
      />
    </div>
  )
}

/* ---------- 2. Products (Assets + Services + CTA) ---------- */

function ProductsPanel() {
  return (
    <div className="flex gap-4 p-4">
      <MenuColumn label="Assets" items={PRODUCT_ASSETS} />
      <MenuColumn label="Services" items={PRODUCT_SERVICES} />
      <CtaCard
        title="Ready-to-Use Setups"
        description="Complete ad infrastructure — BMs, profiles, pages, pixels & domains — fully configured."
        primaryLabel="Explore Setups"
        primaryHref="/pricing"
        secondaryLabel="Talk to Sales"
        secondaryHref="/talk-to-sales"
      />
    </div>
  )
}

/* ---------- 3. Resources ---------- */

function ResourcesPanel() {
  return (
    <div className="flex gap-4 p-4">
      <MenuColumn label="Company" items={RESOURCES_COMPANY} />
      <MenuColumn label="Learn" items={RESOURCES_LEARN} />
      <MenuColumn label="Support" items={RESOURCES_SUPPORT} />
    </div>
  )
}

/* ---------- 4. Tools (list + visual CTA) ---------- */

function ToolsPanel() {
  return (
    <div className="flex gap-4 p-4">
      <div className="w-64">
        <ColumnLabel>Free Tools</ColumnLabel>
        <ul className="space-y-0.5">
          {TOOLS_LIST.slice(0, 5).map(item => (
            <li key={item.href}><MenuItem {...item} /></li>
          ))}
        </ul>
      </div>
      <div className="w-64">
        <ColumnLabel>&nbsp;</ColumnLabel>
        <ul className="space-y-0.5">
          {TOOLS_LIST.slice(5).map(item => (
            <li key={item.href}><MenuItem {...item} /></li>
          ))}
        </ul>
      </div>

      {/* Visual CTA card linking to /tools */}
      <div className="w-56 shrink-0">
        <div className="flex h-full flex-col justify-between rounded-xl border border-border/60 bg-muted/40 p-4">
          {/* Decorative illustration */}
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center justify-center rounded-xl bg-primary/10 p-4">
              <div className="relative">
                <WrenchIcon className="size-8 text-primary" />
                <div className="absolute -right-1 -top-1 size-3 rounded-full bg-primary animate-pulse" />
              </div>
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-foreground">GoAds Toolbox</p>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                9 free tools built for media buyers — data processing, security & utilities.
              </p>
            </div>
          </div>
          <Link
            href="/tools"
            className="btn-mirror-sweep btn-secondary mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-md bg-primary px-3 py-2 text-xs font-medium text-primary-foreground transition-all hover:bg-primary/90"
          >
            Browse All Tools
            <ArrowRightIcon className="size-3.5" />
          </Link>
        </div>
      </div>
    </div>
  )
}

/* ---------- trigger style ---------- */

const triggerClass =
  'text-sm text-muted-foreground transition-all hover:text-foreground hover:bg-primary/15! focus:bg-primary/15! bg-transparent! data-[state=open]:bg-primary/10! data-[state=open]:text-foreground px-2.5! h-auto! py-1.5! font-normal! gap-0.5 rounded-md! cursor-pointer'

const linkClass =
  'text-sm text-muted-foreground transition-all hover:text-foreground hover:bg-primary/15 rounded-md px-2.5 py-1.5'

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
          <NavigationMenuTrigger className={triggerClass}>
            Tools
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ToolsPanel />
          </NavigationMenuContent>
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
