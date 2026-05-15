import type { Metadata } from 'next'
import { HelpContent } from './help-content'

export const metadata: Metadata = {
  title: 'Help Center | GoAds Support & Resources',
  description: 'Get help with GoAds products. FAQs, guides, and 24/7 support for agency ad accounts, Business Managers, and more.',
}

export default function HelpPage() {
  return <HelpContent />
}
