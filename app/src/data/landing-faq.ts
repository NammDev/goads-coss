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
        question: 'Warranty Policy',
        answer:
          'GoAds offers a strong warranty policy to ensure clients receive reliable assets.\nIf an asset encounters unexpected restrictions within the warranty period, a replacement or support will be provided promptly.\n\nWarranty covers replacement only; we do not offer refunds.\nOnce delivered, clients are fully responsible for the asset\'s usage. Restrictions or bans arising after usage begins are outside our control.\nReplacements are valid only if the BM or profile meets the above warranty conditions at the time of claim.\n\nGuarantees Offered with Business Manager Purchases\n1/ If a Business Manager is restricted, disabled, or its limits are reduced within 24 hours before any action is taken by the buyer, it will be replaced immediately.\n2/ If the verification status of a Business Manager is revoked within 14 days, a replacement will be issued. This applies only to Business Managers verified with original documents.\n\nCases Where Replacement Is Not Possible\n1/ Credit or debit cards are added to the Business Manager or its ad accounts.\n2/ Ads are launched through any ad account under the Business Manager.\n3/ Major changes are made to the Business Manager, except renaming.\n4/ Pages are created using the Business Manager.\n5/ A domain name is added and verified within the Business Manager.\n6/ One or more ad accounts are created in the Business Manager.\n\nReasons for Refusal of Replacement\n1/ The reliability of payment methods added to the Business Manager or ad accounts cannot be verified, and some may be flagged or restricted by Facebook.\n2/ Ads run through the Business Manager are beyond the provider\'s control, and non-compliance with Facebook\'s rules can lead to restrictions.\n3/ If there is a history of bans or repeated violations, the connected domains or accounts may already be flagged or monitored by Facebook.\n4/ Business Managers that are used or carry risk cannot be resold, since buyers are entitled to new, unused accounts only.\n5/ Each Business Manager is delivered in good condition at the time of purchase. Any issues occurring after usage begins are the buyer\'s responsibility.',
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
