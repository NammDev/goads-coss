import { UsersIcon, TrendingUpIcon } from 'lucide-react'
import HeroSection from '@/components/shadcn-studio/blocks/hero-section-23/hero-section-23'
import StatisticsCard from '@/components/shadcn-studio/blocks/statistics-card-03'
import RatingsCard from '@/components/shadcn-studio/blocks/statistics-card-04'
import PageHeroCard from '@/components/shadcn-studio/blocks/page-hero-card'
import { ProductCatalog } from '@/components/product-catalog'
import TestimonialsComponent from '@/components/shadcn-studio/blocks/testimonials-component-22/testimonials-component-22'
import FAQ from '@/components/shadcn-studio/blocks/faq-component-08/faq-component-08'
import CTASection from '@/components/shadcn-studio/blocks/cta-section-05/cta-section-05'
import { SectionDivider } from '@/components/section-divider'
import { avatars, pageCategories, pageUpsells, reviews } from './pages-page-data'
import { faqTabsData } from '@/data/landing-faq'

export default function PagesPage() {
  return (
    <main className="flex-1">
      <HeroSection
        avatars={avatars}
        heading="Buy Aged Facebook Pages Ready for Ads"
        subheading={
          <>
            GoAds provides <strong>aged and reinstated Facebook Pages ready for advertising</strong>.
            Change name, branding, and assets freely, trusted by agencies and media buyers worldwide.
          </>
        }
        primaryCta={{ label: 'Get Your Page Today', href: '/pages#pricing' }}
        secondaryCta={{ label: 'Talk to Support', href: 'https://t.me/GoAdsSupport' }}
        card1={
          <StatisticsCard
            title="Followers"
            badgeContent="Avg. per page"
            value="10K+"
            changePercentage="+52%"
            icon={<UsersIcon />}
            trend="up"
            className="h-full gap-2 py-3"
          />
        }
        card2={
          <RatingsCard
            title="Pages Delivered"
            badgeContent="All time"
            value="2,134"
            changePercentage={18.3}
            svg={<TrendingUpIcon className="size-16 text-primary/10" />}
            className="h-full"
          />
        }
        card3={<PageHeroCard className="sm:w-full sm:max-w-100" />}
      />
      <SectionDivider />

      <ProductCatalog
        categories={pageCategories}
        upsells={pageUpsells}
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
