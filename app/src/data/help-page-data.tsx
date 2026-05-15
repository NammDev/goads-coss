import { BookOpen, CreditCard, Phone, Users, Star, Handshake } from 'lucide-react'
import { CONTACT } from '@/data/contact-info'
import type { HelpCard, ResourceLink } from './types'

export const helpCards: HelpCard[] = [
  {
    title: 'Contact GoAds',
    description: 'Get real-time help from our support team. Average response time under 2 hours.',
    links: [
      { label: 'Telegram', href: CONTACT.telegram.official, external: true },
      { label: 'WhatsApp', href: CONTACT.whatsapp.main, external: true },
    ],
  },
  {
    title: 'Pricing',
    description: 'Browse our full product catalog with transparent pricing for all ad accounts and assets.',
    links: [{ label: 'View Pricing', href: '/pricing', external: false }],
  },
  {
    title: 'Toolkits',
    description: 'Free tools for media buyers — 2FA generator, cookie converter, account filter, and more.',
    links: [{ label: 'Open Toolkits', href: '/tools', external: false }],
  },
]

export const resourceLinks: ResourceLink[] = [
  {
    icon: BookOpen,
    title: 'Blog & Guides',
    description: 'Tips, tutorials, and best practices for media buyers using GoAds infrastructure.',
    label: 'Read Blog',
    href: '/blog',
    external: false,
  },
  {
    icon: CreditCard,
    title: 'Payment Methods',
    description: 'Crypto, bank transfer, Wise, and other payment options we accept.',
    label: 'View Methods',
    href: '/payment',
    external: false,
  },
  {
    icon: Phone,
    title: 'Talk to Sales',
    description: 'Book a 1-on-1 consultation for bulk orders or custom enterprise deals.',
    label: 'Talk to Sales',
    href: '/book-demo',
    external: false,
  },
  {
    icon: Star,
    title: 'Reviews',
    description: 'See what 500+ clients say about our products and support quality.',
    label: 'Read Reviews',
    href: '/reviews',
    external: false,
  },
  {
    icon: Users,
    title: 'About Us',
    description: '5+ years in ad infrastructure serving media buyers worldwide.',
    label: 'About GoAds',
    href: '/about',
    external: false,
  },
  {
    icon: Handshake,
    title: 'Partner Offers',
    description: 'Exclusive deals from our partners on anti-detect browsers and tools.',
    label: 'View Partners',
    href: '/partners',
    external: false,
  },
]
