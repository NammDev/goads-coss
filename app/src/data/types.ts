import type { LucideIcon } from 'lucide-react'

/** Hero section avatar used across product pages */
export interface Avatar {
  src: string
  fallback: string
  name: string
}

/** Partner entry */
export interface Partner {
  name: string
  description: string
  offer: string
  url: string
  logo: string
}

/** Payment method */
export interface PaymentMethod {
  icon: LucideIcon
  name: string
  description: string
  badge: string | null
  badgeVariant: 'default' | 'outline' | 'secondary'
}

/** Help card */
export interface HelpCard {
  title: string
  description: string
  links: { label: string; href: string; external: boolean }[]
}

/** Resource link */
export interface ResourceLink {
  icon: LucideIcon
  title: string
  description: string
  label: string
  href: string
  external: boolean
}
