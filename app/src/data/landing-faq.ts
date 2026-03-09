// ---------------------------------------------------------------------------
// FAQ Tabs Data
// ---------------------------------------------------------------------------

import type { ComponentType } from 'react'
import { ShieldCheckIcon, HeadphonesIcon, CreditCardIcon, SettingsIcon } from 'lucide-react'

export interface FAQItem {
  question: string
  answer: string
}

export interface FAQTab {
  value: string
  label: string
  icon: ComponentType
  faqs: FAQItem[]
}

// ---------------------------------------------------------------------------
// Simple FAQ items (used on /faq page)
// ---------------------------------------------------------------------------

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'What is an agency ad account?',
    answer: 'An agency ad account is a verified advertising account created under a Meta/Google/TikTok agency structure. These accounts have higher trust scores, higher spending limits, and better stability compared to regular ad accounts.',
  },
  {
    question: 'How does the 7-day warranty work?',
    answer: 'If your account gets disabled within 7 days of delivery for reasons unrelated to policy violations on your end, we will replace it for free — no questions asked.',
  },
  {
    question: 'How fast is delivery?',
    answer: 'Most accounts are delivered within 1-4 hours after payment confirmation. Bulk orders or custom setups may take up to 24 hours.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept cryptocurrency (USDT, BTC, ETH), bank transfers, PayPal, Wise, and other methods. Visit our Payment Methods page for full details.',
  },
  {
    question: 'Can I use these accounts with anti-detect browsers?',
    answer: 'Yes, our accounts work perfectly with all major anti-detect browsers including Dolphin{anty}, GoLogin, and AdsPower. We also offer partner discounts on these tools.',
  },
  {
    question: 'What is a Business Manager (BM)?',
    answer: 'A Business Manager is a Meta tool that lets you manage ad accounts, pages, and team members in one place. We offer BM1 through BM10, both verified and standard.',
  },
  {
    question: 'Do you offer bulk discounts?',
    answer: 'Yes, we offer tiered pricing for bulk orders. The more accounts you purchase, the better the per-unit price. Contact our sales team for custom quotes.',
  },
  {
    question: 'How do I get support?',
    answer: 'Our primary support channel is Telegram (@GoAdsSupport) with an average response time under 2 hours. We also offer Discord community support and email support.',
  },
  {
    question: 'What makes GoAds different from other providers?',
    answer: 'We combine 5+ years of experience, a 7-day warranty policy, sub-2-hour support response times, and a full-stack platform covering Meta, Google, and TikTok — all from a single provider.',
  },
]

// ---------------------------------------------------------------------------
// Tabbed FAQ data (used on landing page)
// ---------------------------------------------------------------------------

export const faqTabsData: FAQTab[] = [
  {
    value: 'products',
    label: 'Products & Services',
    icon: ShieldCheckIcon,
    faqs: [
      {
        question: 'Products & Services',
        answer:
          'GoAds provides a full range of advertising assets and services, including Business Managers, ad accounts, profiles, pages, TikTok assets, recovery services, and blue badge support.\n\nEverything is prepared to help advertisers launch and scale campaigns smoothly.',
      },
    ],
  },
  {
    value: 'warranty',
    label: 'Warranty Policy',
    icon: SettingsIcon,
    faqs: [
      {
        question: 'What is GoAds warranty policy?',
        answer:
          'At GoAds, all assets are delivered in working condition and carefully checked before delivery. Our warranty covers replacement only — refunds are not provided under any circumstances.\n\nOnce an asset has been delivered and begins to be used, the responsibility for its operation and compliance with platform policies belongs to the client.',
      },
      {
        question: 'Business Manager warranty (72 hours)',
        answer:
          'If a Business Manager becomes restricted or disabled within 72 hours after delivery, GoAds will provide a replacement, provided that no activity has been performed inside the Business Manager.\n\nActivities that void the warranty:\n• Adding payment methods\n• Running advertisements\n• Creating ad accounts or pages\n• Adding or verifying domains\n• Making administrative or structural changes',
      },
      {
        question: 'Facebook Profile warranty (7 days)',
        answer:
          'All Facebook Profiles include a 7-day warranty from delivery. If a profile becomes restricted or disabled within the warranty period, GoAds will provide a replacement with no limit on the number of replacements during the 7-day period.',
      },
      {
        question: 'When does the warranty not apply?',
        answer:
          'Warranty requests may be declined if:\n• The asset has already been used or modified\n• Payment methods, domains, or pages have been added\n• Advertisements have been launched\n• The asset has been exposed to risk due to policy violations or flagged payment methods/domains\n\nAssets that have already been used cannot be resold as new and do not qualify for replacement.',
      },
    ],
  },
  {
    value: 'billing',
    label: 'Billing & Payments',
    icon: CreditCardIcon,
    faqs: [
      {
        question: 'Billing & Payments',
        answer:
          'GoAds accepts multiple payment methods including cryptocurrency, bank transfer, and other common international payment options.\n\nPayment details and guidance are provided by the team to ensure a smooth and secure transaction process.',
      },
    ],
  },
  {
    value: 'support',
    label: 'Support',
    icon: HeadphonesIcon,
    faqs: [
      {
        question: 'Support',
        answer:
          'GoAds provides responsive support and 1-on-1 assistance throughout the entire process.\nClients can contact the team through Telegram, email, or other official channels for quick help whenever needed.\n\nTelegram: goads_official\nWhatsApp: +84865717497',
      },
    ],
  },
]
