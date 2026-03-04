// ---------------------------------------------------------------------------
// Bento Grid Data
// bento-grid-19: growthChartData, growthChartConfig, cardData text, stayInformed items
// bento-grid-10: chats carousel items
// Icons for stayInformed are kept in stay-informed.tsx — only text data here.
// ---------------------------------------------------------------------------

import type { ChartConfig } from '@/components/ui/chart'

// --- bento-grid-19: check-orders-status ---

export interface GrowthChartDataItem {
  month: string
  sales: number
  fill: string
}

export const GROWTH_CHART_DATA: GrowthChartDataItem[] = [
  { month: 'january', sales: 340, fill: 'var(--color-january)' },
  { month: 'february', sales: 200, fill: 'var(--color-february)' },
  { month: 'march', sales: 200, fill: 'var(--color-march)' },
]

export const GROWTH_CHART_CONFIG = {
  sales: { label: 'Sales' },
  january: { label: 'January', color: 'var(--primary)' },
  february: { label: 'February', color: 'color-mix(in oklab, var(--primary) 60%, transparent)' },
  march: { label: 'March', color: 'color-mix(in oklab, var(--primary) 20%, transparent)' },
} satisfies ChartConfig

export interface CardDataText {
  title: string
  description: string
  changePercentage: string
}

export const GROWTH_CARD_DATA: CardDataText = {
  title: '$400k',
  description: 'Total Growth',
  changePercentage: '+49%',
}

// --- bento-grid-19: stay-informed ---
// iconName maps to the Lucide icon used in stay-informed.tsx

export interface StayInformedItem {
  title: string
  time: string
  iconName: 'TriangleAlertIcon' | 'BadgeCheckIcon' | 'ShoppingCartIcon'
}

export const STAY_INFORMED_DATA: StayInformedItem[] = [
  { title: 'Order canceled', time: '10:00 AM', iconName: 'TriangleAlertIcon' },
  { title: 'Payment successful', time: '09:13 PM', iconName: 'BadgeCheckIcon' },
  { title: '3 new order placed', time: '12:24 AM', iconName: 'ShoppingCartIcon' },
  { title: 'Payment successful', time: '09:30 PM', iconName: 'BadgeCheckIcon' },
  { title: '2 new orders placed', time: '04:12 PM', iconName: 'ShoppingCartIcon' },
  { title: 'Payment successful', time: '03:45 PM', iconName: 'BadgeCheckIcon' },
]

// --- bento-grid-10: card-ask-plain-language ---

export const BENTO10_CHATS: string[] = [
  'Create a sidebar layout with icons and labels',
  'Generate a login form with email and password',
  'Turn this card into a responsive UI block',
  'Convert this Figma design to Tailwind + React code',
  'Create a dashboard layout with a sidebar & widgets.',
  'Create a sidebar layout with icons and labels',
  'Generate a login form with email and password',
  'Turn this card into a responsive UI block',
  'Convert this Figma design to Tailwind + React code',
  'Create a dashboard layout with a sidebar & widgets.',
]
