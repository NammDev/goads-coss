import type { Metadata } from 'next'

import { LegalPageLayout } from '@/components/legal-page-layout'
import { privacyPolicy } from '@/data/legal-content'

export const metadata: Metadata = {
  title: 'Privacy Policy | GoAds',
  description: 'Privacy Policy for GoAds — how we collect, use, and protect your information.',
}

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout title={privacyPolicy.title} lastUpdated={privacyPolicy.lastUpdated}>
      {privacyPolicy.content}
    </LegalPageLayout>
  )
}
