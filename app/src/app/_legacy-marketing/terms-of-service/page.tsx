import type { Metadata } from 'next'

import { LegalPageLayout } from '@/components/legal-page-layout'
import { termsOfService } from '@/data/legal-content'

export const metadata: Metadata = {
  title: 'Terms of Service | GoAds',
  description: 'Terms of Service for GoAds advertising assets and services.',
}

export default function TermsOfServicePage() {
  return (
    <LegalPageLayout title={termsOfService.title} lastUpdated={termsOfService.lastUpdated}>
      {termsOfService.content}
    </LegalPageLayout>
  )
}
