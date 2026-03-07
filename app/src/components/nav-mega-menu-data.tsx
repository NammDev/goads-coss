import {
  Building2,
  Search,
  Globe,
  Briefcase,
  UserIcon,
  FileTextIcon,
  VideoIcon,
  PackageIcon,
  HelpCircle,
  BookOpen,
  Users,
  MessageCircle,
  Handshake,
  Star,
  CreditCard,
  Trophy,
  CircleHelp,
  Wrench,
  FileText,
  Phone,
  HeartHandshake,
} from 'lucide-react'

/* ====== Agency Accounts ====== */

export const AGENCY_ACCOUNTS = [
  {
    icon: Building2,
    title: 'Facebook Agency Accounts',
    description: 'Verified agency ad accounts for Facebook & Instagram',
    href: '/agency-ad-account',
  },
  {
    icon: Search,
    title: 'Google Agency Accounts',
    description: 'Whitelisted Google Ads accounts with threshold billing',
    href: '/google-agency',
  },
  {
    icon: Globe,
    title: 'TikTok Agency Accounts',
    description: 'Verified TikTok Ads accounts under agency setup',
    href: '/tiktok-agency',
  },
]

/* ====== Products — Meta Assets ====== */

export const META_ASSETS = [
  {
    icon: Briefcase,
    title: 'Business Managers',
    description: 'BM1 to BM10, verified & standard',
    href: '/bm',
  },
  {
    icon: UserIcon,
    title: 'Facebook Profiles',
    description: 'New & aged profiles for ad operations',
    href: '/profiles',
  },
  {
    icon: FileTextIcon,
    title: 'Facebook Pages',
    description: 'Aged pages with history & trust',
    href: '/pages',
  },
  {
    icon: PackageIcon,
    title: 'Meta Other Services',
    description: 'Pixels, domains, fan pages & more',
    href: '/meta-services',
  },
]

/* ====== Products — TikTok Assets (single route) ====== */

export const TIKTOK_ASSETS = [
  {
    icon: VideoIcon,
    title: 'TikTok Accounts',
    description: 'Business Center, Shop & Channels — all in one',
    href: '/tiktok-accounts',
  },
]

/* ====== Resources — Company ====== */

export const RESOURCES_COMPANY = [
  {
    icon: Users,
    title: 'About Us',
    description: '5+ years in ad infrastructure',
    href: '/about',
  },
  {
    icon: Trophy,
    title: 'Milestones',
    description: 'Our journey & achievements',
    href: '/milestones',
  },
  {
    icon: Handshake,
    title: 'Partner Offers',
    description: 'Exclusive deals from our partners',
    href: '/partners',
  },
  {
    icon: HeartHandshake,
    title: 'Become a Partner',
    description: 'Earn commissions as an affiliate',
    href: '/affiliate',
  },
]

/* ====== Resources — Learn ====== */

export const RESOURCES_LEARN = [
  {
    icon: BookOpen,
    title: 'Blog',
    description: 'Tips & guides for media buyers',
    href: '/blog',
  },
  {
    icon: FileText,
    title: 'Documentation',
    description: 'Guides, setup docs & API references',
    href: '/doc',
  },
  {
    icon: Star,
    title: 'Reviews',
    description: 'What our clients say',
    href: '/reviews',
  },
  {
    icon: CircleHelp,
    title: 'FAQ',
    description: 'Common questions answered',
    href: '/faq',
  },
]

/* ====== Resources — Support ====== */

export const RESOURCES_SUPPORT = [
  {
    icon: HelpCircle,
    title: 'Help Center',
    description: 'Get answers & guides',
    href: '/help',
  },
  {
    icon: CreditCard,
    title: 'Payment Methods',
    description: 'Crypto, bank, PayPal & more',
    href: '/payment',
  },
  {
    icon: Phone,
    title: 'Talk to Sales',
    description: 'Book a 1-on-1 consultation',
    href: '/talk-to-sales',
  },
  {
    icon: MessageCircle,
    title: 'Telegram Support',
    description: 'Chat with @GoAdsSupport',
    href: 'https://t.me/GoAdsSupport',
  },
]

/* ====== GoAds Tools (single route) ====== */

export const TOOLS_ALL = [
  {
    icon: Wrench,
    title: 'GoAds Tools',
    description: 'Extensions, utilities & partner tools',
    href: '/tools',
  },
]
