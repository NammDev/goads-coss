import { SectionDivider } from '@/components/section-divider'
import { PageHero } from '@/components/page-hero'
import { WavyUnderline } from '@/components/section-header'
import { Badge } from '@/components/ui/badge'
import { InfoCard, InfoCardGrid } from '@/components/info-card'
import { GoAdsLogo } from '@/assets/svg/ad-platform-logos'
import { paymentMethods } from '@/data/payment-page-data'

export function PaymentContent() {
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
            {paymentMethods.map((method, i) => (
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

    </main>
  )
}
