import { type ComponentProps } from 'react'
import { SectionDivider } from '@/components/section-divider'
import HeroSection from '@/components/shadcn-studio/blocks/hero-section-23/hero-section-23'
import { ProductCatalog } from '@/components/product-catalog'
import TestimonialsComponent from '@/components/shadcn-studio/blocks/testimonials-component-22/testimonials-component-22'
import FAQ from '@/components/shadcn-studio/blocks/faq-component-08/faq-component-08'
import { reviews } from '@/data/landing-reviews-pricing-faq'
import { faqTabsData } from '@/data/landing-faq'

interface ProductPageTemplateProps {
  heroProps: ComponentProps<typeof HeroSection>
  catalogCategories: ComponentProps<typeof ProductCatalog>['categories']
  enterpriseCard?: ComponentProps<typeof ProductCatalog>['enterpriseCard']
}

export function ProductPageTemplate({ heroProps, catalogCategories, enterpriseCard }: ProductPageTemplateProps) {
  return (
    <main className="flex-1">
      <HeroSection {...heroProps} />
      <SectionDivider />
      <ProductCatalog categories={catalogCategories} enterpriseCard={enterpriseCard} />
      <SectionDivider />
      <TestimonialsComponent reviews={reviews} />
      <SectionDivider />
      <FAQ tabsData={faqTabsData} />
    </main>
  )
}
