import { LayersIcon, ShoppingBagIcon } from 'lucide-react'
import HeroSection from '@/components/shadcn-studio/blocks/hero-section-23/hero-section-23'
import StatisticsCard from '@/components/shadcn-studio/blocks/statistics-card-03'
import RatingsCard from '@/components/shadcn-studio/blocks/statistics-card-04'
import TikTokHeroCard from '@/components/shadcn-studio/blocks/tiktok-hero-card'
import { ProductCatalog } from '@/components/product-catalog'
import TestimonialsComponent from '@/components/shadcn-studio/blocks/testimonials-component-22/testimonials-component-22'
import FAQ from '@/components/shadcn-studio/blocks/faq-component-08/faq-component-08'
import CTASection from '@/components/shadcn-studio/blocks/cta-section-05/cta-section-05'
import { SectionDivider } from '@/components/section-divider'
import { CONTACT } from '@/data/contact-info'
import { avatars, tiktokCategories } from '@/data/tiktok-page-data'
import { reviews } from '@/data/landing-reviews-pricing-faq'
import { faqTabsData } from '@/data/landing-faq'

export default function TikTokAccountsPage() {
  return (
    <main className="flex-1">
      <HeroSection
        avatars={avatars}
        heading="Buy Aged TikTok Accounts"
        subheading={
          <>
            Stop worrying about unstable or restricted accounts.
            GoAds provides <strong>aged TikTok accounts ready for advertising, content growth, and scaling campaigns</strong>, trusted by agencies and media buyers worldwide.
          </>
        }
        primaryCta={{ label: 'Get Your TikTok Account', href: '/tiktok-accounts#pricing' }}
        secondaryCta={{ label: 'Talk to Support', href: CONTACT.telegram.support }}
        card1={
          <StatisticsCard
            title="Account Types"
            badgeContent="Shop · Ads · Channel"
            value="5 Types"
            changePercentage="+3"
            icon={<LayersIcon />}
            trend="up"
            className="h-full gap-2 py-3"
          />
        }
        card2={
          <RatingsCard
            title="Accounts Active"
            badgeContent="Currently live"
            value="987"
            changePercentage={31.4}
            svg={<ShoppingBagIcon className="size-16 text-primary/10" />}
            className="h-full"
          />
        }
        card3={<TikTokHeroCard className="sm:w-full sm:max-w-100" />}
      />
      <SectionDivider />

      <ProductCatalog
        categories={tiktokCategories}
        enterpriseCard={{ description: 'Need bulk TikTok accounts or custom configurations? Contact us for volume discounts and dedicated support.' }}
      />
      <SectionDivider />

      <TestimonialsComponent reviews={reviews} />
      <SectionDivider />

      <FAQ tabsData={faqTabsData} />
      <SectionDivider />

      <CTASection />
    </main>
  )
}
