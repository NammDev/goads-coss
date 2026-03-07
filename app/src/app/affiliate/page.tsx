import { PageHeroBig } from '@/components/page-hero-big'
import { WavyUnderline } from '@/components/section-header'
import { SectionDivider } from '@/components/section-divider'
import CTASection from '@/components/shadcn-studio/blocks/cta-section-05/cta-section-05'
import { Card, CardContent } from '@/components/ui/card'
import { DollarSign, Users, Megaphone, Gift, TrendingUp, Headphones } from 'lucide-react'

/* ---------- Benefits ---------- */

const benefits = [
  {
    icon: DollarSign,
    title: 'Up to 30% Commission',
    description: 'Earn recurring commissions on every sale you refer. The more you refer, the higher your tier.',
  },
  {
    icon: Users,
    title: 'Dedicated Partner Manager',
    description: 'Get a personal account manager to help you maximize your earnings and support your clients.',
  },
  {
    icon: Gift,
    title: 'Exclusive Discounts',
    description: 'Access special pricing on all GoAds products to offer your audience better deals.',
  },
  {
    icon: Megaphone,
    title: 'Marketing Materials',
    description: 'Ready-made banners, landing pages, and copy to help you promote GoAds effectively.',
  },
  {
    icon: TrendingUp,
    title: 'Real-Time Dashboard',
    description: 'Track clicks, conversions, and earnings in real-time through your partner dashboard.',
  },
  {
    icon: Headphones,
    title: 'Priority Support',
    description: 'Your referrals get priority support, ensuring higher satisfaction and retention rates.',
  },
]

/* ---------- page ---------- */

export default function AffiliatePage() {
  return (
    <main className="flex-1">
      <PageHeroBig
        badge="Join Us"
        tagline="We support creators who support the community."
        heading={
          <>
            Become a GoAds{' '}
            <span className="relative inline-block">
              Partner
              <WavyUnderline className="-bottom-0.5" />
            </span>
          </>
        }
        description="Earn up to 30% referral commission on every sale. Join our affiliate & ambassador program and grow with us."
        ctas={[
          { label: 'Become an Ambassador', href: 'https://t.me/GoAdsSupport', external: true },
          { label: 'Become an Affiliate', href: 'https://t.me/GoAdsSupport', variant: 'outline', external: true },
        ]}
        illustration={
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="Ambassador hero illustration"
              className="h-93.5 dark:hidden"
              src="https://cdn.shadcnstudio.com/ss-assets/landing-page/ambassador/image-1.png?height=374&format=auto"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="Ambassador hero illustration dark"
              className="hidden h-93.5 dark:block"
              src="https://cdn.shadcnstudio.com/ss-assets/landing-page/ambassador/image-1-dark.png?height=374&format=auto"
            />
          </div>
        }
      />
      <SectionDivider />

      {/* Benefits grid */}
      <section className="py-8 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-[1416px] px-4 lg:px-6">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-semibold sm:text-3xl">Why Partner With GoAds?</h2>
            <p className="text-muted-foreground mt-2 text-lg">
              Everything you need to succeed as a GoAds partner.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b) => (
              <Card key={b.title}>
                <CardContent className="flex flex-col gap-3 p-6">
                  <div className="bg-primary/10 flex size-10 items-center justify-center rounded-lg">
                    <b.icon className="text-primary size-5" />
                  </div>
                  <h3 className="text-lg font-semibold">{b.title}</h3>
                  <p className="text-muted-foreground text-sm">{b.description}</p>
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
