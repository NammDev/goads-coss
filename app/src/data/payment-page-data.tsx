import { Bitcoin, Landmark, ArrowRightLeft } from 'lucide-react'
import type { PaymentMethod } from './types'

export const paymentMethods: PaymentMethod[] = [
  {
    icon: Bitcoin,
    name: 'Cryptocurrency',
    description: 'USDT (TRC20/ERC20), BTC, ETH, and other major coins via direct wallet transfer.',
    badge: 'Most Popular',
    badgeVariant: 'default' as const,
  },
  {
    icon: Landmark,
    name: 'Bank Transfer',
    description: 'Direct bank wire transfer available for orders above $500. Processing takes 1-2 business days.',
    badge: null,
    badgeVariant: 'outline' as const,
  },
  {
    icon: ArrowRightLeft,
    name: 'Wise (TransferWise)',
    description: 'Low-fee international transfers via Wise. Great for clients outside the US and EU.',
    badge: 'Low Fees',
    badgeVariant: 'secondary' as const,
  },
]
