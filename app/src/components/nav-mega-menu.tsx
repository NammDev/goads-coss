'use client'

import Link from 'next/link'
import {
  Building2,
  Search,
  Globe,
  Briefcase,
  TrendingUp,
  RefreshCw,
  MapPin,
  Users,
  HelpCircle,
  BookOpen,
  FileText,
  Code2,
  Activity,
  MessageCircle,
  Database,
  Handshake,
} from 'lucide-react'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { cn } from '@/lib/utils'

// --- Data ---

const PRODUCTS_BY_PLATFORM = [
  {
    icon: Building2,
    title: 'Meta Agency Accounts',
    description: 'Verified accounts for Facebook & Instagram ads',
    href: '/products/meta-agency-accounts',
  },
  {
    icon: Search,
    title: 'Google Whitelisted',
    description: 'Pre-approved Google Ads accounts',
    href: '/products/google-whitelisted',
  },
  {
    icon: Globe,
    title: 'TikTok Verified',
    description: 'Verified TikTok advertising accounts',
    href: '/products/tiktok-verified',
  },
  {
    icon: Briefcase,
    title: 'Business Managers',
    description: 'Full BM setups ready to use',
    href: '/products/business-managers',
  },
]

const PRODUCTS_BY_NEED = [
  {
    icon: TrendingUp,
    title: 'Scale Ad Spend',
    description: 'Increase daily budgets safely',
    href: '/solutions/scale-ad-spend',
  },
  {
    icon: RefreshCw,
    title: 'Replace Banned Accounts',
    description: 'Fast replacement service',
    href: '/solutions/replace-banned',
  },
  {
    icon: MapPin,
    title: 'New Market Entry',
    description: 'Launch in new regions',
    href: '/solutions/new-market',
  },
  {
    icon: Users,
    title: 'Agency Setup',
    description: 'Complete agency infrastructure',
    href: '/solutions/agency-setup',
  },
]

const RESOURCES_ITEMS = [
  {
    icon: HelpCircle,
    title: 'Help Center',
    description: 'Get answers to common questions',
    href: '/help',
  },
  {
    icon: BookOpen,
    title: 'Blog',
    description: 'Tips and guides for media buyers',
    href: '/blog',
  },
  {
    icon: FileText,
    title: 'Case Studies',
    description: 'See how clients scale with GoAds',
    href: '/case-studies',
  },
  {
    icon: Code2,
    title: 'API Docs',
    description: 'Integrate with our platform',
    href: '/docs/api',
  },
  {
    icon: Activity,
    title: 'Status Page',
    description: 'Check system availability',
    href: '/status',
  },
  {
    icon: Users,
    title: 'Contact Sales',
    description: 'Talk to our team',
    href: '/contact',
  },
  {
    icon: MessageCircle,
    title: 'Telegram Support',
    description: 'Join our support channel',
    href: '/telegram',
  },
  {
    icon: Database,
    title: 'Knowledge Base',
    description: 'In-depth guides and tutorials',
    href: '/knowledge-base',
  },
  {
    icon: Handshake,
    title: 'Partner Program',
    description: 'Earn commissions as a partner',
    href: '/partners',
  },
]

// --- Sub-components ---

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
  return (
    <NavigationMenuLink asChild>
      <Link
        href={href}
        className="flex flex-row items-center gap-3 rounded-lg p-2.5 transition-colors hover:bg-muted/60 focus:bg-muted/60 focus:outline-none"
      >
        <MenuIcon Icon={Icon} />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-foreground leading-snug">{title}</p>
          <p className="mt-0.5 text-xs text-muted-foreground leading-snug line-clamp-2">{description}</p>
        </div>
      </Link>
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

// --- Products Mega Menu (3-column: platform + need + CTA) ---

function ProductsPanel() {
  return (
    <div className="flex gap-4 p-4">
      {/* Column 1: By Platform */}
      <div className="w-64">
        <ColumnLabel>By Platform</ColumnLabel>
        <ul className="space-y-0.5">
          {PRODUCTS_BY_PLATFORM.map(item => (
            <li key={item.href}>
              <MenuItem {...item} />
            </li>
          ))}
        </ul>
      </div>

      {/* Column 2: By Need */}
      <div className="w-64">
        <ColumnLabel>By Need</ColumnLabel>
        <ul className="space-y-0.5">
          {PRODUCTS_BY_NEED.map(item => (
            <li key={item.href}>
              <MenuItem {...item} />
            </li>
          ))}
        </ul>
      </div>

      {/* CTA card */}
      <div className="w-52 shrink-0">
        <div className="flex h-full flex-col justify-between rounded-xl border border-border/60 bg-muted/40 p-4">
          <div>
            <p className="text-sm font-semibold text-foreground">Ready to scale?</p>
            <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
              Get verified ad accounts with a 7-day warranty and &lt;2h support response.
            </p>
          </div>
          <div className="mt-4 space-y-2">
            <Link
              href="/#pricing"
              className="btn-cta-glow inline-flex w-full items-center justify-center rounded-md bg-primary px-3 py-2 text-xs font-medium text-primary-foreground transition-all hover:bg-primary/90"
            >
              View Pricing
            </Link>
            <Link
              href="/contact"
              className="inline-flex w-full items-center justify-center rounded-md border border-border px-3 py-2 text-xs font-medium text-foreground transition-colors hover:bg-muted"
            >
              Talk to Sales
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

// --- Resources Mega Menu (3-column grid) ---

const RESOURCE_COLUMNS = [
  { label: 'Learn', items: RESOURCES_ITEMS.slice(0, 3) },
  { label: 'Developers', items: RESOURCES_ITEMS.slice(3, 6) },
  { label: 'Connect', items: RESOURCES_ITEMS.slice(6, 9) },
]

function ResourcesPanel() {
  return (
    <div className="flex gap-4 p-4">
      {RESOURCE_COLUMNS.map((col) => (
        <div key={col.label} className="w-56">
          <ColumnLabel>{col.label}</ColumnLabel>
          <ul className="space-y-0.5">
            {col.items.map(item => (
              <li key={item.href}>
                <MenuItem {...item} />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

// --- Trigger style matching existing nav ---

const triggerClass =
  'text-sm text-muted-foreground transition-all hover:text-foreground bg-transparent! hover:bg-transparent! focus:bg-transparent! data-[state=open]:bg-transparent! data-[state=open]:text-foreground px-0! h-auto! py-0! font-normal! gap-0.5 rounded-none! cursor-pointer'

// --- Main export ---

export function NavMegaMenu() {
  return (
    <NavigationMenu viewport={true}>
      <NavigationMenuList className="gap-4">

        {/* Products dropdown */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className={triggerClass}>
            Products
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ProductsPanel />
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Resources dropdown */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className={triggerClass}>
            Resources
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ResourcesPanel />
          </NavigationMenuContent>
        </NavigationMenuItem>

      </NavigationMenuList>
    </NavigationMenu>
  )
}
