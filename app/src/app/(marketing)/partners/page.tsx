import { SectionDivider } from '@/components/section-divider'
import CTASection from '@/components/shadcn-studio/blocks/cta-section-05/cta-section-05'
import { PageHeroBig } from '@/components/page-hero-big'
import { WavyUnderline } from '@/components/section-header'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ExternalLink } from 'lucide-react'

/* ---------- Partner data ---------- */

type Partner = {
  name: string
  description: string
  offer: string
  url: string
  logo: string
}

const partners: Partner[] = [
  {
    name: 'Dolphin{anty}',
    description:
      'The best anti-detect fingerprinting browser for advertising and multi-accounting. Manage unlimited profiles with unique fingerprints.',
    offer: 'Get 20% off your first Dolphin{anty} subscription',
    url: '#',
    logo: '/partners/dolphin-anty.svg',
  },
  {
    name: 'GoLogin',
    description:
      'Professional anti-detect browser trusted by 500K+ users. Run multiple ad accounts safely with unique browser profiles.',
    offer: 'Special pricing for GoAds clients',
    url: '#',
    logo: '/partners/gologin.svg',
  },
  {
    name: 'AdsPower',
    description:
      'Enterprise-grade anti-detect browser with team collaboration, RPA automation, and local API for managing ad accounts at scale.',
    offer: 'Exclusive discount for GoAds users',
    url: '#',
    logo: '/partners/adspower.svg',
  },
  {
    name: 'Smartproxy',
    description:
      'Premium residential & mobile proxies covering 195+ locations. Perfect for running geo-targeted ad campaigns without restrictions.',
    offer: '15% off on all proxy plans with code GOADS15',
    url: '#',
    logo: '/partners/smartproxy.svg',
  },
  {
    name: 'IPRoyal',
    description:
      'Affordable residential, datacenter, and mobile proxies with unlimited bandwidth options. Ideal for multi-account setups.',
    offer: 'Special bulk pricing for GoAds clients',
    url: '#',
    logo: '/partners/iproyal.svg',
  },
  {
    name: 'BigSpy',
    description:
      'Leading ad spy tool covering Facebook, TikTok, Google & more. Discover winning creatives and competitor strategies in real-time.',
    offer: 'Free trial + 10% off annual plans',
    url: '#',
    logo: '/partners/bigspy.svg',
  },
]

/* ---------- page ---------- */

export default function PartnersPage() {
  return (
    <main className='flex-1'>
      <PageHeroBig
        badge='Partners'
        tagline='Exclusive deals from our trusted partners.'
        heading={
          <>
            Offers by Our{' '}
            <span className='relative inline-block'>
              Partners
              <WavyUnderline className='-bottom-0.5' />
            </span>
          </>
        }
        description='Take advantage of unique terms and discounts from our trusted partners in the ad-tech ecosystem.'
        ctas={[
          { label: 'Become a Partner', href: '/affiliate' },
          { label: 'Contact Sales', href: 'https://t.me/GoAdsSupport', variant: 'outline', external: true },
        ]}
        illustration={
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="Hero illustration"
              className="h-93.5 dark:hidden"
              src="https://cdn.shadcnstudio.com/ss-assets/landing-page/ambassador/image-1.png?height=374&format=auto"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="Hero illustration dark"
              className="hidden h-93.5 dark:block"
              src="https://cdn.shadcnstudio.com/ss-assets/landing-page/ambassador/image-1-dark.png?height=374&format=auto"
            />
          </div>
        }
      />
      <SectionDivider />

      {/* Partner grid */}
      <section className='py-8 sm:py-16 lg:py-24'>
        <div className='mx-auto max-w-[1416px] px-4 lg:px-6'>
          <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
            {partners.map((partner) => (
              <Card key={partner.name} className='flex flex-col justify-between'>
                <CardContent className='flex flex-col gap-4 p-6'>
                  {/* Logo area */}
                  <div className='bg-muted flex h-28 items-center justify-center rounded-lg'>
                    <span className='text-foreground text-xl font-bold'>{partner.name}</span>
                  </div>

                  {/* Info */}
                  <div className='space-y-2'>
                    <p className='text-muted-foreground text-sm'>{partner.description}</p>
                    <p className='text-primary text-sm font-medium'>{partner.offer}</p>
                  </div>

                  {/* CTA */}
                  <Button variant='outline' className='mt-auto w-full' asChild>
                    <a href={partner.url} target='_blank' rel='noopener noreferrer'>
                      Go to website
                      <ExternalLink className='ml-2 size-4' />
                    </a>
                  </Button>
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
