'use client'

import { SectionDivider } from '@/components/section-divider'
import CTASection from '@/components/shadcn-studio/blocks/cta-section-05/cta-section-05'
import { PageHero } from '@/components/page-hero'
import { WavyUnderline } from '@/components/section-header'
import { Badge } from '@/components/ui/badge'
import { InfoCard, InfoCardGrid } from '@/components/info-card'
import { Bitcoin, Landmark, ArrowRightLeft } from 'lucide-react'
import { GoAdsLogo } from '@/assets/svg/ad-platform-logos'

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
    icon: ArrowRightLeft,
    name: 'Wise (TransferWise)',
    description: 'Low-fee international transfers via Wise. Great for clients outside the US and EU.',
    badge: 'Low Fees',
    badgeVariant: 'secondary' as const,
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
          <InfoCardGrid>
            {methods.map((method, i) => (
              <InfoCard key={method.name} index={i}>
                {/* top: name + badge/price area */}
                <div className='flex items-start justify-between gap-3'>
                  <h3 className='text-sm font-semibold leading-tight'>{method.name}</h3>
                  {method.badge && (
                    <Badge variant={method.badgeVariant} className='shrink-0 text-xs'>
                      {method.badge}
                    </Badge>
                  )}
                </div>

                {/* description */}
                <p className='text-muted-foreground mt-2 text-sm leading-relaxed'>{method.description}</p>

                {/* spacer */}
                <div className='min-h-4' />

                {/* bottom: logo + icon */}
                <div className='flex items-end justify-between'>
                  <GoAdsLogo className='size-6' />
                  <div className='bg-primary/10 flex size-8 items-center justify-center rounded-lg'>
                    <method.icon className='text-primary size-4' />
                  </div>
                </div>
              </InfoCard>
            ))}
          </InfoCardGrid>
        </div>
      </section>

      <SectionDivider />
      <CTASection />
    </main>
  )
}
