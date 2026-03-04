import {
  BuildingIcon,
  ShieldCheckIcon,
  WrenchIcon,
  HeadphonesIcon,
  CreditCardIcon,
  SettingsIcon,
} from 'lucide-react'

import type { ProductCategory, UpsellItem } from '@/components/product-catalog'
import type { ReviewCard } from '@/components/shadcn-studio/blocks/testimonials-component-22/review-stack'

export const avatars = [
  {
    src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-3.png',
    fallback: 'DT',
    name: 'Duc Tran',
  },
  {
    src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-6.png',
    fallback: 'ML',
    name: 'Mike Lee',
  },
  {
    src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-5.png',
    fallback: 'SN',
    name: 'Sarah Nguyen',
  },
  {
    src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-16.png',
    fallback: 'JW',
    name: 'Jenny Wilson',
  },
]

export const bmCategories: ProductCategory[] = [
  {
    icon: <ShieldCheckIcon className="size-5" />,
    title: 'Verified Business Managers',
    badge: 'Recommended',
    description:
      'Meta-verified BMs with higher trust scores and better ad approval rates',
    products: [
      {
        name: 'BM1',
        badge: 'Verified',
        description:
          'Verified Business Manager with 1 ad account and growing spend limit.',
        price: 49,
        purchased: 1523,
      },
      {
        name: 'BM3',
        badge: 'Verified',
        description:
          'Verified Business Manager with 3 ad accounts. Higher trust score & approval rate.',
        price: 99,
        purchased: 987,
        isPopular: true,
      },
      {
        name: 'BM5',
        badge: 'Verified',
        description:
          'Verified Business Manager with 5 ad accounts — each with a $250 daily spend limit.',
        price: 149,
        purchased: 645,
      },
      {
        name: 'BM5 Nolimit',
        badge: 'Verified',
        description:
          'Verified Business Manager with 5 ad accounts — no daily spending limits.',
        price: 199,
        purchased: 312,
      },
      {
        name: 'BM10',
        badge: 'Verified',
        description:
          'Verified Business Manager with 10 ad accounts — full verification, maximum capacity.',
        price: 299,
        purchased: 178,
      },
    ],
  },
  {
    icon: <BuildingIcon className="size-5" />,
    title: 'Standard Business Managers',
    description: 'Reliable BMs for running Facebook & Instagram ads at scale',
    products: [
      {
        name: 'BM1',
        description:
          'Business Manager with 1 ad account and growing spend limit — ready for immediate use.',
        price: 29,
        purchased: 3242,
      },
      {
        name: 'BM3',
        description:
          'Business Manager with 3 ad accounts — ideal for scaling multiple campaigns.',
        price: 69,
        purchased: 1849,
        isPopular: true,
      },
      {
        name: 'BM5',
        description:
          'Business Manager with 5 ad accounts — great for agencies managing multiple clients.',
        price: 99,
        purchased: 1205,
      },
      {
        name: 'BM5 Nolimit',
        description:
          'Business Manager with 5 ad accounts — no daily spending limits.',
        price: 149,
        purchased: 812,
      },
      {
        name: 'BM10',
        description:
          'Business Manager with 10 ad accounts — maximum capacity for large operations.',
        price: 199,
        purchased: 456,
      },
    ],
  },
]

export const upsells: UpsellItem[] = [
  {
    icon: <WrenchIcon className="size-5" />,
    title: 'Full Bulletproof Setup — 2 BM + 2 Profiles',
    description:
      'Get a complete ready-to-go bulletproof setup from GoAds. Includes 2 verified Business Managers, 2 Facebook Profiles, pixel setup, domain verification, and full configuration.',
    price: '$350',
    features: ['2 Verified BMs', '2 Facebook Profiles', 'Pixel & domain setup', 'Ready to run ads'],
    buttonText: 'Buy Now',
  },
  {
    icon: <HeadphonesIcon className="size-5" />,
    title: 'Custom BM50+ — Enterprise Solutions',
    description:
      'Need 50+ Business Managers or a custom setup? Contact us directly for a tailored quote, dedicated account manager, and priority delivery.',
    price: 'Custom',
    features: ['50+ BMs', 'Dedicated manager', 'Volume discounts', 'Priority support'],
    buttonText: 'Contact Sales',
  },
]

export const reviews: ReviewCard[] = [
  {
    id: '1',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png',
    fallback: 'MC',
    name: 'Marley Calzoni',
    designation: 'Media Buyer',
    company: 'AdScale Agency',
    rating: 4.5,
    message:
      'BM3 Verified is rock solid. Running 3 campaigns simultaneously with zero issues. Support replaced one account within 2 hours when needed.',
  },
  {
    id: '2',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-3.png',
    fallback: 'TS',
    name: 'Tuan Son',
    designation: 'Performance Marketer',
    company: 'GrowthLab',
    rating: 5,
    message:
      'Switched to GoAds BM5 Nolimit after getting banned on personal accounts. Night and day difference — stable, high trust score, no more random restrictions.',
  },
  {
    id: '3',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-5.png',
    fallback: 'AK',
    name: 'Anna Kim',
    designation: 'Agency Owner',
    company: 'Kim Digital',
    rating: 4.5,
    message:
      'We order BM10 Verified monthly for our clients. The setup service saves us hours. Best BM provider we have worked with in 3 years.',
  },
]

export const faqTabsData = [
  {
    value: 'bm',
    label: 'Business Managers',
    icon: BuildingIcon,
    faqs: [
      {
        question: 'What is a Business Manager?',
        answer:
          "A Business Manager (BM) is Meta's tool for managing ad accounts, pages, and team members in one place. Our BMs come pre-configured under official agency setups with higher trust scores.",
      },
      {
        question: "What's the difference between Standard and Verified?",
        answer:
          "Verified BMs have completed Meta's business verification process, giving them higher trust scores, better ad approval rates, and more stability. They cost more but are recommended for serious advertisers.",
      },
      {
        question: 'What does "Nolimit" mean?',
        answer:
          'Nolimit BMs have no daily spending caps on their ad accounts. Standard BMs may start with spending limits like $250/day that increase over time. Nolimit accounts let you scale immediately.',
      },
      {
        question: 'How long do BMs last?',
        answer:
          'With proper ad compliance, our BMs last indefinitely. Most clients run them for 6+ months without issues. We maintain a 97% stability rate across all Business Managers.',
      },
    ],
  },
  {
    value: 'warranty',
    label: 'Warranty',
    icon: SettingsIcon,
    faqs: [
      {
        question: 'What does the 7-day warranty cover?',
        answer:
          'Our 7-day warranty covers any BM issues not caused by policy violations. If your BM gets restricted or disabled within 7 days, we replace it at no cost.',
      },
      {
        question: 'How fast are replacements?',
        answer:
          'We process warranty replacements within 2 hours during business hours. For bulk orders, we offer instant replacements via dedicated Telegram channels.',
      },
    ],
  },
  {
    value: 'payment',
    label: 'Payment',
    icon: CreditCardIcon,
    faqs: [
      {
        question: 'What payment methods do you accept?',
        answer:
          'We accept bank transfers, cryptocurrency (USDT, BTC, ETH), PayPal, Wise, and major credit cards.',
      },
      {
        question: 'Do you offer bulk discounts?',
        answer:
          'Yes. Orders of 5+ BMs receive 10% off. Orders of 20+ receive 20% off. Contact us for custom enterprise pricing.',
      },
    ],
  },
  {
    value: 'support',
    label: 'Support',
    icon: HeadphonesIcon,
    faqs: [
      {
        question: 'How do I reach support?',
        answer:
          'Via live chat, Telegram (@GoAdsSupport), or email. Average response time is under 2 hours.',
      },
      {
        question: 'Do you help with setup?',
        answer:
          'Yes! Add our Setup Service (+$29) and we configure your BM, connect ad accounts, install pixels, and verify your domain.',
      },
    ],
  },
]
