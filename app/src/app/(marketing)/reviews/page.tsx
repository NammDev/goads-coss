import type { Metadata } from "next"
import TestimonialsComponent from '@/components/shadcn-studio/blocks/testimonials-component-18/testimonials-component-18'
import { SectionDivider } from '@/components/section-divider'
import { PageHero } from '@/components/page-hero'
import { WavyUnderline } from '@/components/section-header'
import { reviewsPageTestimonials } from '@/data/reviews-page-data'

export const metadata: Metadata = {
  title: "Customer Reviews | GoAds Testimonials",
  description: "Read reviews from 500+ GoAds customers. Real testimonials about our agency ad accounts, BMs, and support quality.",
}

export default function ReviewsPage() {
  return (
    <main className='flex-1'>
      <PageHero
        label='Reviews'
        heading={
          <>
            What Our{' '}
            <span className='relative inline-block'>
              Clients
              <WavyUnderline className='-bottom-1.5 left-[8%] h-2 w-5/6' />
            </span>{' '}
            Say
          </>
        }
        description='Hear from 500+ media buyers, agencies, and e-commerce brands who trust GoAds for their ad infrastructure.'
      />
      <SectionDivider />
      <TestimonialsComponent testimonials={reviewsPageTestimonials} />
    </main>
  )
}
