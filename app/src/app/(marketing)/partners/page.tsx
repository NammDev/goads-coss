'use client'

import Image from 'next/image'
import { SectionDivider } from '@/components/section-divider'
import CTASection from '@/components/shadcn-studio/blocks/cta-section-05/cta-section-05'
import { PageHero } from '@/components/page-hero'
import { WavyUnderline } from '@/components/section-header'
import { Button } from '@/components/ui/button'
import { InfoCard, InfoCardGrid } from '@/components/info-card'
import { ArrowUpRightIcon } from 'lucide-react'
import { GoAdsLogo } from '@/assets/svg/ad-platform-logos'

/* ---------- Partner data ---------- */

const partners = [
  {
    name: 'Dolphin{anty}',
    description: 'Anti-detect browser for advertising and multi-accounting. Manage unlimited profiles with unique fingerprints.',
    offer: '20% off your first subscription',
    url: 'https://dolphin-anty.com',
    logo: '/partners/dolphin-anty.svg',
  },
  {
    name: 'GoLogin',
    description: 'Professional anti-detect browser trusted by 500K+ users. Run multiple ad accounts safely with unique profiles.',
    offer: 'Special pricing for GoAds clients',
    url: 'https://gologin.com',
    logo: '/partners/gologin.svg',
  },
  {
    name: 'AdsPower',
    description: 'Enterprise-grade anti-detect browser with team collaboration, RPA automation, and local API.',
    offer: 'Exclusive discount for GoAds users',
    url: 'https://www.adspower.com',
    logo: '/partners/adspower.png',
  },
  {
    name: 'Decodo (Smartproxy)',
    description: 'Premium residential & mobile proxies covering 195+ locations. Perfect for geo-targeted ad campaigns.',
    offer: '15% off all proxy plans with code GOADS15',
    url: 'https://decodo.com',
    logo: '/partners/smartproxy.svg',
  },
  {
    name: 'IPRoyal',
    description: 'Affordable residential, datacenter, and mobile proxies with unlimited bandwidth options.',
    offer: 'Special bulk pricing for GoAds clients',
    url: 'https://iproyal.com',
    logo: '/partners/iproyal.svg',
  },
  {
    name: 'BigSpy',
    description: 'Ad spy tool covering Facebook, TikTok, Google & more. Discover winning creatives and competitor strategies.',
    offer: 'Free trial + 10% off annual plans',
    url: 'https://bigspy.com',
    logo: '/partners/bigspy.png',
  },
]

/* ---------- page ---------- */

export default function PartnersPage() {
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
