import type { Metadata } from 'next'
import { PaymentContent } from './payment-content'

export const metadata: Metadata = {
  title: 'Payment Methods | GoAds Accepted Payments',
  description: 'View accepted payment methods at GoAds. Bank transfer, crypto, and more options for purchasing ad accounts.',
}

export default function PaymentPage() {
  return <PaymentContent />
}
