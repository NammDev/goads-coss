import type { Metadata } from 'next'

import { LegalPageLayout } from '@/components/legal-page-layout'
import { refundPolicy } from '@/data/legal-content'

export const metadata: Metadata = {
  title: 'Refund Policy | GoAds',
  description: 'Refund and replacement policy for GoAds advertising assets.',
}

export default function RefundPolicyPage() {
  return (
    <LegalPageLayout title={refundPolicy.title} lastUpdated={refundPolicy.lastUpdated}>
      {refundPolicy.content}
    </LegalPageLayout>
  )
}
