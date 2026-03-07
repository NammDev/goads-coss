import { SectionDivider } from '@/components/section-divider'
import CTASection from '@/components/shadcn-studio/blocks/cta-section-05/cta-section-05'
import { PageHero } from '@/components/page-hero'
import { WavyUnderline } from '@/components/section-header'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Bitcoin,
  Landmark,
  CreditCard,
  Wallet,
  ArrowRightLeft,
  CircleDollarSign,
} from 'lucide-react'

/* ---------- Payment methods data ---------- */

const methods = [
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
    icon: CreditCard,
    name: 'PayPal',
    description: 'Pay securely via PayPal. A small processing fee may apply for PayPal transactions.',
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
  {
    icon: Wallet,
    name: 'Perfect Money',
    description: 'E-wallet payment option with instant processing. Ideal for recurring purchases.',
    badge: null,
    badgeVariant: 'outline' as const,
  },
  {
    icon: CircleDollarSign,
    name: 'Other Methods',
    description: 'Contact our sales team for additional payment options including Payoneer, Skrill, and local methods.',
    badge: null,
    badgeVariant: 'outline' as const,
  },
]

/* ---------- page ---------- */

export default function PaymentPage() {
  return (
    <main className='flex-1'>
      <PageHero
        label='Payment'
        heading={
          <>
            Payment{' '}
            <span className='relative inline-block'>
              Methods
              <WavyUnderline className='-bottom-1.5 left-[8%] h-2 w-5/6' />
            </span>
          </>
        }
        description='We accept multiple payment methods to make purchasing as convenient as possible for clients worldwide.'
      />
      <SectionDivider />

      <section className='py-8 sm:py-16 lg:py-24'>
        <div className='mx-auto max-w-[1416px] px-4 lg:px-6'>
          <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
            {methods.map((method) => (
              <Card key={method.name}>
                <CardContent className='flex flex-col gap-3 p-6'>
                  <div className='flex items-center gap-3'>
                    <div className='bg-primary/10 flex size-10 items-center justify-center rounded-lg'>
                      <method.icon className='text-primary size-5' />
                    </div>
                    <h3 className='text-lg font-semibold'>{method.name}</h3>
                    {method.badge && (
                      <Badge variant={method.badgeVariant} className='ml-auto text-xs'>
                        {method.badge}
                      </Badge>
                    )}
                  </div>
                  <p className='text-muted-foreground text-sm'>{method.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />
      <CTASection />
    </main>
  )
}
