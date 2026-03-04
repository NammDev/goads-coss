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

export const faqTabsData: FAQTab[] = [
  {
    value: 'products',
    label: 'Products & Services',
    icon: ShieldCheckIcon,
    faqs: [
      {
        question: 'What products and services does GoAds provide?',
        answer:
          'GoAds provides a full range of advertising assets and services, including Business Managers, ad accounts, profiles, pages, TikTok assets, recovery services, and blue badge support. Everything is prepared to help advertisers launch and scale campaigns smoothly.',
      },
      {
        question: 'Which advertising platforms does GoAds support?',
        answer:
          "GoAds supports Meta (Facebook/Instagram), Google Ads, and TikTok. Each platform's assets are carefully prepared and verified to ensure maximum stability for your campaigns.",
      },
      {
        question: 'Can GoAds help with account recovery?',
        answer:
          'Yes. GoAds offers recovery services for restricted or banned accounts. Our team works to restore access or provide suitable replacements so your campaigns can continue running.',
      },
    ],
  },
  {
    value: 'warranty',
    label: 'Warranty Policy',
    icon: SettingsIcon,
    faqs: [
      {
        question: "What is GoAds' warranty policy?",
        answer:
          "GoAds offers a strong warranty policy to ensure clients receive reliable assets. If an asset encounters unexpected restrictions within the warranty period, a replacement or support will be provided promptly. Warranty covers replacement only; we do not offer refunds. Once delivered, clients are fully responsible for the asset's usage. Restrictions or bans arising after usage begins are outside our control. Replacements are valid only if the BM or profile meets the above warranty conditions at the time of claim.",
      },
      {
        question: 'What guarantees are offered with Business Manager purchases?',
        answer:
          '1/ If a Business Manager is restricted, disabled, or its limits are reduced within 24 hours before any action is taken by the buyer, it will be replaced immediately. 2/ If the verification status of a Business Manager is revoked within 14 days, a replacement will be issued. This applies only to Business Managers verified with original documents.',
      },
      {
        question: 'In what cases is replacement not possible?',
        answer:
          'Replacement is not possible when: 1/ Credit or debit cards are added to the Business Manager or its ad accounts. 2/ Ads are launched through any ad account under the Business Manager. 3/ Major changes are made to the Business Manager, except renaming. 4/ Pages are created using the Business Manager. 5/ A domain name is added and verified within the Business Manager. 6/ One or more ad accounts are created in the Business Manager.',
      },
      {
        question: 'What are the reasons for refusal of replacement?',
        answer:
          "1/ The reliability of payment methods added to the Business Manager or ad accounts cannot be verified, and some may be flagged or restricted by Facebook. 2/ Ads run through the Business Manager are beyond the provider's control, and non-compliance with Facebook's rules can lead to restrictions. 3/ If there is a history of bans or repeated violations, the connected domains or accounts may already be flagged or monitored by Facebook. 4/ Business Managers that are used or carry risk cannot be resold, since buyers are entitled to new, unused accounts only. 5/ Each Business Manager is delivered in good condition at the time of purchase. Any issues occurring after usage begins are the buyer's responsibility.",
      },
    ],
  },
  {
    value: 'billing',
    label: 'Billing & Payments',
    icon: CreditCardIcon,
    faqs: [
      {
        question: 'What payment methods does GoAds accept?',
        answer:
          'GoAds accepts multiple payment methods including cryptocurrency, bank transfer, and other common international payment options. Payment details and guidance are provided by the team to ensure a smooth and secure transaction process.',
      },
      {
        question: 'How quickly are assets delivered after payment?',
        answer:
          'Most assets are delivered within a few hours after payment confirmation. For larger or custom orders, delivery times may vary. Our team will communicate the expected timeline clearly.',
      },
    ],
  },
  {
    value: 'support',
    label: 'Support',
    icon: HeadphonesIcon,
    faqs: [
      {
        question: 'How can I contact GoAds support?',
        answer:
          'GoAds provides responsive support and 1-on-1 assistance throughout the entire process. Clients can contact the team through Telegram, email, or other official channels for quick help whenever needed. Telegram: goads_official | WhatsApp: +84865717497',
      },
      {
        question: 'What kind of support does GoAds offer?',
        answer:
          'GoAds provides direct, personal support for every client — from selecting the right assets to onboarding, setup guidance, and troubleshooting. Our team is available to help at every step.',
      },
    ],
  },
]
