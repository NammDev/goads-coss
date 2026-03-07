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
  HelpCircle,
  BookOpen,
  Users,
  Handshake,
  Star,
  CreditCard,
  Trophy,
  CircleHelp,
  FileText,
  Phone,

  Shield,
  Cookie,
  ListFilter,
  Scissors,
  Copy,
  Merge,
  StickyNote,
  ImagePlus,
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

/* ====== Products — Assets ====== */

export const PRODUCT_ASSETS = [
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
    icon: VideoIcon,
    title: 'TikTok Assets',
    description: 'Business Center, Shop & Channels',
    href: '/tiktok-accounts',
  },
]

/* ====== Products — Services ====== */

export const PRODUCT_SERVICES = [
  {
    icon: ShieldBan,
    title: 'Unban Meta Assets',
    description: 'Recover disabled BMs, profiles & pages',
    href: '/unban',
  },
  {
    icon: BadgeCheck,
    title: 'Blue Verification',
    description: 'Verified badge for Pages & Instagram',
    href: '/blue-verification',
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
    href: '/docs',
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
]

/* ====== Tools ====== */

export const TOOLS_LIST = [
  { icon: Shield, title: '2FA Generator', description: 'Generate TOTP codes', href: '/tools/2fa' },
  { icon: Cookie, title: 'Cookie Converter', description: 'JSON to UID|Pass|Cookie', href: '/tools/cookie' },
  { icon: ListFilter, title: 'Account Filter', description: 'Parse & reformat accounts', href: '/tools/filter' },
  { icon: Scissors, title: 'Split Data', description: 'Split text by delimiter', href: '/tools/split-data' },
  { icon: Copy, title: 'Remove Duplicates', description: 'Deduplicate text lines', href: '/tools/remove-duplicates' },
  { icon: Merge, title: 'Filter & Merge', description: 'Combine & merge by key', href: '/tools/merge' },
  { icon: StickyNote, title: 'Online Notepad', description: 'Quick browser-saved notes', href: '/tools/notepad' },
  { icon: Globe, title: 'IP Checker', description: 'Public IP & location info', href: '/tools/check-ip' },
  { icon: ImagePlus, title: 'Batch Watermark', description: 'Watermark multiple images', href: '/tools/batch-watermark' },
]
