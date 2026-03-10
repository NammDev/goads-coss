import Image from 'next/image'
import { SectionDivider } from '@/components/section-divider'
import CTASection from '@/components/shadcn-studio/blocks/cta-section-05/cta-section-05'
import { PageHero } from '@/components/page-hero'
import { WavyUnderline } from '@/components/section-header'
import { Button } from '@/components/ui/button'
import { InfoCard, InfoCardGrid } from '@/components/info-card'
import { ArrowUpRightIcon } from 'lucide-react'
import { GoAdsLogo } from '@/assets/svg/ad-platform-logos'
import { partners } from '@/data/partners-page-data'

export function PartnersContent() {
  return (
    <main className='flex-1'>
      <PageHero
        label='Partners'
        heading={
          <>
            Offers by Our{' '}
            <span className='relative inline-block'>
              Partners
              <WavyUnderline className='-bottom-0.5' />
            </span>
          </>
        }
        description='Take advantage of exclusive discounts from our trusted partners in the ad-tech ecosystem.'
      />
      <SectionDivider />

      <section className='py-8 sm:py-16 lg:py-24'>
        <div className='mx-auto max-w-[1416px] px-4 lg:px-6'>
          <InfoCardGrid>
            {partners.map((partner, i) => (
              <InfoCard key={partner.name} index={i}>
                {/* top: logo area */}
                <div className='bg-muted/50 flex h-20 items-center justify-center rounded-lg px-4'>
                  <Image
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    width={140}
                    height={40}
                    className='h-8 w-auto object-contain dark:brightness-0 dark:invert'
                  />
                </div>

                {/* description + offer */}
                <div className='mt-3 space-y-1.5'>
                  <p className='text-muted-foreground text-sm leading-relaxed'>{partner.description}</p>
                  <p className='text-primary text-sm font-medium'>{partner.offer}</p>
                </div>

                {/* spacer */}
                <div className='min-h-4' />

                {/* bottom: GoAds logo + CTA button */}
                <div className='flex items-end justify-between'>
                  <GoAdsLogo className='size-6' />
                  <Button size='sm' variant='outline' className='cursor-pointer gap-1.5' asChild>
                    <a href={partner.url} target='_blank' rel='noopener noreferrer'>
                      Visit Site
                      <ArrowUpRightIcon className='size-3.5 transition-transform duration-200 group-hover/card:rotate-45' />
                    </a>
                  </Button>
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
