'use client'

import Link from 'next/link'
import { NavigationMenuLink } from '@/components/ui/navigation-menu'
import type { AGENCY_ACCOUNTS } from '@/components/nav-mega-menu-data'

/* ---------- icon box ---------- */

export function MenuIcon({ Icon }: { Icon: React.ElementType }) {
  return (
    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted text-foreground">
      <Icon className="size-5" />
    </div>
  )
}

/* ---------- single menu item link ---------- */

export function MenuItem({
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

/* ---------- section label ---------- */

export function ColumnLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-2 px-2.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground/70">
      {children}
    </p>
  )
}

/* ---------- labelled column of menu items ---------- */

export function MenuColumn({ label, items }: { label: string; items: typeof AGENCY_ACCOUNTS }) {
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
