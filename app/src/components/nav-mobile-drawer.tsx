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
  ShieldBan,
  BadgeCheck,
  ShieldCheck,
  Users,
  HelpCircle,
  BookOpen,
  FileText,
  Handshake,
  Menu,
  Star,
  CreditCard,
  Trophy,
  CircleHelp,
  Wrench,
  Phone,
  HeartHandshake,
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

/* ====== Products — Assets ====== */

const PRODUCT_ASSETS = [
  { icon: Briefcase, title: 'Business Managers', href: '/bm' },
  { icon: UserIcon, title: 'Facebook Profiles', href: '/profiles' },
  { icon: FileTextIcon, title: 'Facebook Pages', href: '/pages' },
  { icon: VideoIcon, title: 'TikTok Assets', href: '/tiktok-accounts' },
]

/* ====== Products — Services ====== */

const PRODUCT_SERVICES = [
  { icon: ShieldBan, title: 'Unban Meta Assets', href: '/unban' },
  { icon: BadgeCheck, title: 'Blue Verification', href: '/blue-verification' },
  { icon: ShieldCheck, title: 'Verified Business Manager', href: '/bm' },
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
  { icon: FileText, title: 'Documentation', href: '/docs' },
  { icon: Star, title: 'Reviews', href: '/reviews' },
  { icon: CircleHelp, title: 'FAQ', href: '/faq' },
]

/* ====== Resources — Support ====== */

const RESOURCES_SUPPORT = [
  { icon: HelpCircle, title: 'Help Center', href: '/help' },
  { icon: CreditCard, title: 'Payment Methods', href: '/payment' },
  { icon: Phone, title: 'Talk to Sales', href: '/talk-to-sales' },
]

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="px-2 pb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground/70">
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
        <SheetHeader className="flex flex-row items-center gap-2.5 px-5 py-4">
          <SsLogo />
          <SheetTitle className="text-lg font-semibold">goads/agency</SheetTitle>
        </SheetHeader>

        {/* Agency Accounts */}
        <div className="flex flex-col gap-0.5 px-3 pb-3">
          <SectionLabel>Agency Accounts</SectionLabel>
          {AGENCY_ACCOUNTS.map(item => <DrawerItem key={item.href} {...item} />)}
        </div>
        <Separator />

        {/* Products: Assets */}
        <div className="flex flex-col gap-0.5 px-3 py-3">
          <SectionLabel>Assets</SectionLabel>
          {PRODUCT_ASSETS.map(item => <DrawerItem key={item.href} {...item} />)}
        </div>
        <Separator />

        {/* Products: Services */}
        <div className="flex flex-col gap-0.5 px-3 py-3">
          <SectionLabel>Services</SectionLabel>
          {PRODUCT_SERVICES.map(item => <DrawerItem key={item.title} {...item} />)}
        </div>
        <Separator />

        {/* Resources: Company */}
        <div className="flex flex-col gap-0.5 px-3 py-3">
          <SectionLabel>Company</SectionLabel>
          {RESOURCES_COMPANY.map(item => <DrawerItem key={item.href} {...item} />)}
        </div>
        <Separator />

        {/* Resources: Learn */}
        <div className="flex flex-col gap-0.5 px-3 py-3">
          <SectionLabel>Learn</SectionLabel>
          {RESOURCES_LEARN.map(item => <DrawerItem key={item.href} {...item} />)}
        </div>
        <Separator />

        {/* Resources: Support */}
        <div className="flex flex-col gap-0.5 px-3 py-3">
          <SectionLabel>Support</SectionLabel>
          {RESOURCES_SUPPORT.map(item => <DrawerItem key={item.href} {...item} />)}
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
