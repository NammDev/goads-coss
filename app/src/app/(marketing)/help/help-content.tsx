import { SectionDivider } from '@/components/section-divider'
import FAQ from '@/components/shadcn-studio/blocks/faq-component-08/faq-component-08'
import { PageHero } from '@/components/page-hero'
import { WavyUnderline } from '@/components/section-header'
import { Button } from '@/components/ui/button'
import { InfoCard, InfoCardGrid } from '@/components/info-card'
import { MotionPreset } from '@/components/ui/motion-preset'
import { ArrowUpRightIcon, ArrowRightIcon } from 'lucide-react'
import { GoAdsLogo } from '@/assets/svg/ad-platform-logos'
import Link from 'next/link'
import { faqTabsData } from '@/data/landing-faq'
import { helpCards, resourceLinks } from '@/data/help-page-data'

export function HelpContent() {
  return (
    <main className='flex-1'>
      <PageHero
        label='Support'
        heading={
          <>
            How Can We{' '}
            <span className='relative inline-block'>
              Help
              <WavyUnderline className='-bottom-0.5' />
            </span>
            ?
          </>
        }
        description='Find answers, get support, and learn how to make the most of GoAds products and services.'
      />
      <SectionDivider />

      {/* Top cards section */}
      <section className='py-8 sm:py-16 lg:py-24'>
        <div className='mx-auto max-w-[1416px] px-4 lg:px-6'>
          <InfoCardGrid>
            {helpCards.map((card, i) => (
              <InfoCard key={card.title} index={i}>
                {/* top: title + description */}
                <div>
                  <h3 className='text-sm font-semibold leading-tight'>{card.title}</h3>
                  <p className='text-muted-foreground mt-2 text-sm leading-relaxed'>{card.description}</p>
                </div>

                {/* spacer */}
                <div className='min-h-6' />

                {/* bottom: logo + buttons */}
                <div className='flex items-end justify-between'>
                  <GoAdsLogo className='size-6' />
                  <div className='flex gap-2'>
                    {card.links.map((link) => (
                      <Button key={link.label} size='sm' variant='outline' className='cursor-pointer gap-1.5' asChild>
                        {link.external ? (
                          <a href={link.href} target='_blank' rel='noopener noreferrer'>
                            {link.label}
                            <ArrowUpRightIcon className='size-3.5 transition-transform duration-200 group-hover/card:rotate-45' />
                          </a>
                        ) : (
                          <Link href={link.href}>
                            {link.label}
                            <ArrowRightIcon className='size-3.5' />
                          </Link>
                        )}
                      </Button>
                    ))}
                  </div>
                </div>
              </InfoCard>
            ))}
          </InfoCardGrid>
        </div>
      </section>

      {/* Resource links section (Linear-style 2-col grid) */}
      <section className='pb-8 sm:pb-16 lg:pb-24'>
        <div className='mx-auto max-w-[1416px] px-4 lg:px-6'>
          <div className='border-border/60 grid grid-cols-1 border-t sm:grid-cols-2'>
            {resourceLinks.map((item, i) => (
              <MotionPreset
                key={item.title}
                fade
                slide={{ direction: 'up', offset: 15 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                delay={0.05 * i}
              >
                <div className='border-border/60 border-b p-6 sm:p-8 sm:odd:border-r'>
                  <h3 className='text-base font-semibold'>{item.title}</h3>
                  <p className='text-muted-foreground mt-1.5 text-sm leading-relaxed'>{item.description}</p>
                  <Link
                    href={item.href}
                    className='text-foreground mt-3 inline-flex items-center gap-1.5 text-sm font-medium hover:underline'
                  >
                    {item.label}
                    {item.external ? (
                      <ArrowUpRightIcon className='size-3.5' />
                    ) : (
                      <ArrowRightIcon className='size-3.5' />
                    )}
                  </Link>
                </div>
              </MotionPreset>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />
      <FAQ tabsData={faqTabsData} />
    </main>
  )
}
