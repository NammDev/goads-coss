'use client'

import Link from 'next/link'
import {
  Building2,
  Search,
  Globe,
  Briefcase,
  UserIcon,
  FileTextIcon,
  VideoIcon,
  PackageIcon,
  Users,
  HelpCircle,
  BookOpen,
  FileText,
  MessageCircle,
  Handshake,
  Menu,
  Star,
  CreditCard,
  Trophy,
  CircleHelp,
  Wrench,
  Phone,
  HeartHandshake,
  ExternalLink,
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
import { SsLogo } from './site-header-icons'

/* ====== Agency Accounts ====== */

const AGENCY_ACCOUNTS = [
  { icon: Building2, title: 'Facebook Agency Accounts', href: '/agency-ad-account' },
  { icon: Search, title: 'Google Agency Accounts', href: '/google-agency' },
  { icon: Globe, title: 'TikTok Agency Accounts', href: '/tiktok-agency' },
]

/* ====== Products — Meta Assets ====== */

const META_ASSETS = [
  { icon: Briefcase, title: 'Business Managers', href: '/bm' },
  { icon: UserIcon, title: 'Facebook Profiles', href: '/profiles' },
  { icon: FileTextIcon, title: 'Facebook Pages', href: '/pages' },
  { icon: PackageIcon, title: 'Meta Other Services', href: '/meta-services' },
]

/* ====== Products — TikTok Assets ====== */

const TIKTOK_ASSETS = [
  { icon: VideoIcon, title: 'TikTok Accounts', href: '/tiktok-accounts' },
]

/* ====== Resources — Company ====== */

const RESOURCES_COMPANY = [
  { icon: Users, title: 'About Us', href: '/about' },
  { icon: Trophy, title: 'Milestones', href: '/milestones' },
  { icon: Handshake, title: 'Partner Offers', href: '/partners' },
  { icon: HeartHandshake, title: 'Become a Partner', href: '/affiliate' },
]

/* ====== Resources — Learn ====== */

const RESOURCES_LEARN = [
  { icon: BookOpen, title: 'Blog', href: '/blog' },
  { icon: FileText, title: 'Documentation', href: '/doc' },
  { icon: Star, title: 'Reviews', href: '/reviews' },
  { icon: CircleHelp, title: 'FAQ', href: '/faq' },
]

/* ====== Resources — Support ====== */

const RESOURCES_SUPPORT = [
  { icon: HelpCircle, title: 'Help Center', href: '/help' },
  { icon: CreditCard, title: 'Payment Methods', href: '/payment' },
  { icon: Phone, title: 'Talk to Sales', href: '/talk-to-sales' },
  { icon: MessageCircle, title: 'Telegram Support', href: 'https://t.me/GoAdsSupport', external: true },
]

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="px-2 pb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground/70">
      {children}
    </p>
  )
}

function DrawerItem({ icon: Icon, title, href, external }: { icon: React.ElementType; title: string; href: string; external?: boolean }) {
  const cls = "flex items-center gap-3 rounded-lg px-2 py-2 text-sm text-foreground transition-colors hover:bg-muted/60"
  return (
    <SheetClose asChild>
      {external ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
          <Icon className="size-4 text-muted-foreground" />
          {title}
          <ExternalLink className="ml-auto size-3.5 text-muted-foreground" />
        </a>
      ) : (
        <Link href={href} className={cls}>
          <Icon className="size-4 text-muted-foreground" />
          {title}
        </Link>
      )}
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
        {/* Logo + title */}
        <SheetHeader className="flex flex-row items-center gap-2.5 px-5 py-4">
          <SsLogo />
          <SheetTitle className="text-lg font-semibold">goads/agency</SheetTitle>
        </SheetHeader>

        {/* Agency Accounts */}
        <div className="flex flex-col gap-0.5 px-3 pb-3">
          <SectionLabel>Agency Accounts</SectionLabel>
          {AGENCY_ACCOUNTS.map(item => (
            <DrawerItem key={item.href} {...item} />
          ))}
        </div>

        <Separator />

        {/* Products: Meta Assets */}
        <div className="flex flex-col gap-0.5 px-3 py-3">
          <SectionLabel>Meta Assets</SectionLabel>
          {META_ASSETS.map(item => (
            <DrawerItem key={item.href} {...item} />
          ))}
        </div>

        <Separator />

        {/* Products: TikTok Assets */}
        <div className="flex flex-col gap-0.5 px-3 py-3">
          <SectionLabel>TikTok Assets</SectionLabel>
          {TIKTOK_ASSETS.map(item => (
            <DrawerItem key={item.href} {...item} />
          ))}
        </div>

        <Separator />

        {/* Resources: Company */}
        <div className="flex flex-col gap-0.5 px-3 py-3">
          <SectionLabel>Company</SectionLabel>
          {RESOURCES_COMPANY.map(item => (
            <DrawerItem key={item.href} {...item} />
          ))}
        </div>

        <Separator />

        {/* Resources: Learn */}
        <div className="flex flex-col gap-0.5 px-3 py-3">
          <SectionLabel>Learn</SectionLabel>
          {RESOURCES_LEARN.map(item => (
            <DrawerItem key={item.href} {...item} />
          ))}
        </div>

        <Separator />

        {/* Resources: Support */}
        <div className="flex flex-col gap-0.5 px-3 py-3">
          <SectionLabel>Support</SectionLabel>
          {RESOURCES_SUPPORT.map(item => (
            <DrawerItem key={item.href} {...item} />
          ))}
        </div>

        <Separator />

        {/* Tools */}
        <div className="flex flex-col gap-0.5 px-3 py-3">
          <DrawerItem icon={Wrench} title="Tools" href="/tools" />
        </div>
      </SheetContent>
    </Sheet>
  )
}
