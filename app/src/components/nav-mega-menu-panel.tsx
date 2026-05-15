'use client'

import Link from 'next/link'
import { ArrowRightIcon, WrenchIcon } from 'lucide-react'
import {
  AGENCY_ACCOUNTS,
  PRODUCT_ASSETS,
  PRODUCT_SERVICES,
  RESOURCES_COMPANY,
  RESOURCES_LEARN,
  RESOURCES_SUPPORT,
  TOOLS_LIST,
} from '@/components/nav-mega-menu-data'
import { MenuItem, MenuColumn, ColumnLabel } from '@/components/nav-mega-menu-primitives'

/* ---------- reusable CTA card ---------- */

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
            className="btn-mirror-sweep btn-secondary relative overflow-hidden inline-flex w-full items-center justify-center rounded-md bg-primary px-3 py-2 text-xs font-medium text-primary-foreground transition-all hover:bg-primary/90"
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

/* ---------- Agency Accounts panel ---------- */

export function AgencyPanel() {
  return (
    <div className="flex gap-4 p-4">
      <MenuColumn label="By Platform" items={AGENCY_ACCOUNTS} />
      <CtaCard
        title="Ready-to-Use Setups"
        description="Skip the hassle — BMs, profiles, pages, pixels & domains fully configured."
        primaryLabel="Explore Setups"
        primaryHref="/pricing"
        secondaryLabel="Talk to Sales"
        secondaryHref="/book-demo"
      />
      <CtaCard
        title="Need agency accounts?"
        description="7-day warranty, verified agency setup, and <2h support response."
        primaryLabel="View Pricing"
        primaryHref="/pricing"
        secondaryLabel="Talk to Sales"
        secondaryHref="/book-demo"
      />
    </div>
  )
}

/* ---------- Products panel ---------- */

export function ProductsPanel() {
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
        secondaryHref="/book-demo"
      />
    </div>
  )
}

/* ---------- Resources panel ---------- */

export function ResourcesPanel() {
  return (
    <div className="flex gap-4 p-4">
      <MenuColumn label="Company" items={RESOURCES_COMPANY} />
      <MenuColumn label="Learn" items={RESOURCES_LEARN} />
      <MenuColumn label="Support" items={RESOURCES_SUPPORT} />
    </div>
  )
}

/* ---------- Tools panel ---------- */

export function ToolsPanel() {
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
            className="btn-mirror-sweep btn-secondary relative overflow-hidden mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-md bg-primary px-3 py-2 text-xs font-medium text-primary-foreground transition-all hover:bg-primary/90"
          >
            Browse All Tools
            <ArrowRightIcon className="size-3.5" />
          </Link>
        </div>
      </div>
    </div>
  )
}
