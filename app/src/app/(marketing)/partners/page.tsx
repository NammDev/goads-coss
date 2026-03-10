import type { Metadata } from 'next'
import { PartnersContent } from './partners-content'

export const metadata: Metadata = {
  title: 'Partners | GoAds Affiliate & Reseller Program',
  description: 'Join GoAds partner program. Become an affiliate or reseller of premium advertising assets and earn commissions.',
}

export default function PartnersPage() {
  return <PartnersContent />
}
