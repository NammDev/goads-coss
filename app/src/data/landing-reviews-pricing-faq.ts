// ---------------------------------------------------------------------------
// Reviews & Pricing Plans Data (previously in src/app/page-data.ts)
// ---------------------------------------------------------------------------

import type { ReviewCard } from '@/components/shadcn-studio/blocks/testimonials-component-22/review-stack'

// --- Testimonials ---

export const reviews: ReviewCard[] = [
  {
    id: '1',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png',
    fallback: 'DC',
    name: 'Daniel Carter',
    designation: 'Performance Marketing Lead',
    company: '',
    rating: 5,
    message:
      'Working with GoAds has been one of the best decisions for our advertising operations. Their assets are stable, delivery is fast, and the support is always responsive whenever we need help. It feels less like buying a service and more like working with a reliable partner.',
  },
  {
    id: '2',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-3.png',
    fallback: 'MT',
    name: 'Michael Torres',
    designation: 'Media Buying Manager',
    company: '',
    rating: 5,
    message:
      'GoAds has been incredibly reliable for our campaigns. The accounts are well prepared, delivery is fast, and their team is always quick to respond whenever we need assistance. What stands out the most is their support — you always feel like someone is there to help when things get complicated.',
  },
  {
    id: '3',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-5.png',
    fallback: 'SM',
    name: 'Sarah Mitchell',
    designation: 'E-commerce Growth Manager',
    company: '',
    rating: 5,
    message:
      "We've worked with several providers before, but GoAds stands out for their consistency and service. The assets are stable, the process is smooth, and their team genuinely cares about helping clients succeed. It's reassuring to know we can rely on them whenever we need support.",
  },
]

// --- Pricing Plans ---

export interface PricingFeature {
  title: string
  description: string
  available: boolean
}

export interface PricingPlan {
  name: string
  price: string
  buttonText: string
  description: string
  isPopular?: boolean
  highlight?: boolean
  features: PricingFeature[]
}

export const pricingPlans: PricingPlan[] = [
  {
    name: 'Advanced Setup',
    price: '250',
    buttonText: 'Get Started',
    description: 'Essential setup for advertisers getting started with agency infrastructure.',
    features: [
      { title: '1x BM3 Verified', description: 'Business Manager with 3 ad account slots', available: true },
      { title: '2x Premium Profiles', description: 'High-trust profiles ready for advertising', available: true },
      { title: '1x Aged Reinstated Page', description: 'Established page for campaign stability', available: true },
      { title: '14-Day Warranty', description: 'Replacement for profile issues', available: true },
    ],
  },
  {
    name: 'Premium Setup',
    price: '650',
    buttonText: 'Scale Now',
    isPopular: true,
    description: 'Bulletproof setup for serious advertisers scaling campaigns.',
    features: [
      { title: '1x BM5 Verified', description: '$250 spending limit', available: true },
      { title: '1x BM3 Verified', description: 'Business Manager with 3 ad account slots', available: true },
      { title: '4x Premium Profiles', description: 'High-trust profiles ready for advertising', available: true },
      { title: '3x Aged Reinstated Pages', description: 'Established pages for campaign stability', available: true },
      { title: '14-Day Warranty', description: 'Replacement for profile issues', available: true },
    ],
  },
  {
    name: 'Elite Setup',
    price: '890',
    buttonText: 'Go Elite',
    description: 'Bulletproof setup for agencies and high-volume advertisers.',
    highlight: true,
    features: [
      { title: '2x BM5 Verified', description: '$250 spending limit each', available: true },
      { title: '6x Premium Profiles', description: 'High-trust profiles ready for advertising', available: true },
      { title: '3x Aged Reinstated Pages', description: 'Established pages for campaign stability', available: true },
      { title: '1x 10,000 Followers Page', description: 'Aged reinstated page with established audience', available: true },
      { title: '14-Day Warranty', description: 'Replacement for profile issues', available: true },
    ],
  },
]

