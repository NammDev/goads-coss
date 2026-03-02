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
  Menu,
  X,
} from 'lucide-react'
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

const PRODUCTS_BY_PLATFORM = [
  { icon: Building2, title: 'Meta Agency Accounts', href: '/products/meta-agency-accounts' },
  { icon: Search, title: 'Google Whitelisted', href: '/products/google-whitelisted' },
  { icon: Globe, title: 'TikTok Verified', href: '/products/tiktok-verified' },
  { icon: Briefcase, title: 'Business Managers', href: '/products/business-managers' },
]

const PRODUCTS_BY_NEED = [
  { icon: TrendingUp, title: 'Scale Ad Spend', href: '/solutions/scale-ad-spend' },
  { icon: RefreshCw, title: 'Replace Banned Accounts', href: '/solutions/replace-banned' },
  { icon: MapPin, title: 'New Market Entry', href: '/solutions/new-market' },
  { icon: Users, title: 'Agency Setup', href: '/solutions/agency-setup' },
]

const RESOURCES = [
  { icon: HelpCircle, title: 'Help Center', href: '/help' },
  { icon: BookOpen, title: 'Blog', href: '/blog' },
  { icon: FileText, title: 'Case Studies', href: '/case-studies' },
  { icon: Code2, title: 'API Docs', href: '/docs/api' },
  { icon: Activity, title: 'Status Page', href: '/status' },
  { icon: Users, title: 'Contact Sales', href: '/contact' },
  { icon: MessageCircle, title: 'Telegram Support', href: '/telegram' },
  { icon: Database, title: 'Knowledge Base', href: '/knowledge-base' },
  { icon: Handshake, title: 'Partner Program', href: '/partners' },
]

const NAV_LINKS = [
  { label: 'How It Works', href: '/#how-it-works' },
  { label: 'Pricing', href: '/#pricing' },
  { label: 'About', href: '/#about' },
]

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="px-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground/70">
      {children}
    </p>
  )
}

function DrawerItem({ icon: Icon, title, href }: { icon: React.ElementType; title: string; href: string }) {
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
        <SheetHeader className="flex flex-row items-center justify-between border-b px-5 py-4">
          <SheetTitle className="text-lg font-semibold">goads/agency</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col gap-1 px-3 py-4">
          {/* Quick nav links */}
          {NAV_LINKS.map(link => (
            <SheetClose asChild key={link.href}>
              <Link href={link.href} className="rounded-lg px-2 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted/60">
                {link.label}
              </Link>
            </SheetClose>
          ))}
        </div>

        <Separator />

        {/* Products: By Platform */}
        <div className="flex flex-col gap-1 px-3 py-4">
          <SectionLabel>By Platform</SectionLabel>
          {PRODUCTS_BY_PLATFORM.map(item => (
            <DrawerItem key={item.href} {...item} />
          ))}
        </div>

        <Separator />

        {/* Products: By Need */}
        <div className="flex flex-col gap-1 px-3 py-4">
          <SectionLabel>By Need</SectionLabel>
          {PRODUCTS_BY_NEED.map(item => (
            <DrawerItem key={item.href} {...item} />
          ))}
        </div>

        <Separator />

        {/* Resources */}
        <div className="flex flex-col gap-1 px-3 py-4">
          <SectionLabel>Resources</SectionLabel>
          {RESOURCES.map(item => (
            <DrawerItem key={item.href} {...item} />
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}
