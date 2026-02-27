import TestimonialsComponent from '@/components/shadcn-studio/blocks/testimonials-component-22/testimonials-component-22'

import type { ReviewCard } from '@/components/shadcn-studio/blocks/testimonials-component-22/review-stack'

const reviews: ReviewCard[] = [
  {
    id: '1',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png',
    fallback: 'MC',
    name: 'Marley Calzoni',
    designation: 'CEO & Co Founder',
    company: 'Lemonsqueezy',
    rating: 4.5,
    message:
      'Outstanding product—well-crafted, user-friendly, and exactly what I expected. The team went above and beyond to help. Their support was very responsive.'
  },
  {
    id: '2',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-3.png',
    fallback: 'TS',
    name: 'Tony Stark',
    designation: 'CEO & Co Founder',
    company: 'Stark Industries',
    rating: 5,
    message:
      'Exceptional service—intuitive, reliable, and exceeded my expectations. The team was incredibly helpful and ensured a seamless integration process.'
  },
  {
    id: '3',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-5.png',
    fallback: 'BW',
    name: 'Bruce Wayne',
    designation: 'CEO & Co Founder',
    company: 'Wayne Enterprises',
    rating: 3.5,
    message:
      'Exceptional quality—innovative, dependable, and surpassed all expectations. The team provided excellent guidance and ensured everything worked perfectly.'
  }
]

const TestimonialsComponentPage = () => {
  return <TestimonialsComponent reviews={reviews} />
}

export default TestimonialsComponentPage
