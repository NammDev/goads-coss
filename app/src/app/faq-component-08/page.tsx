import { ShieldCheckIcon, HeadphonesIcon, CreditCardIcon, SettingsIcon } from 'lucide-react'

import FAQ from '@/components/shadcn-studio/blocks/faq-component-08/faq-component-08'

const tabsData = [
  {
    value: 'accounts',
    label: 'Ad Accounts',
    icon: ShieldCheckIcon,
    faqs: [
      {
        question: 'What are agency ad accounts?',
        answer:
          'Agency ad accounts are Meta-verified advertising accounts created under official agency Business Managers. They offer higher trust scores, better ad approval rates, and more stability compared to personal ad accounts — ideal for scaling campaigns without constant bans.',
      },
      {
        question: 'Which platforms do you support?',
        answer:
          'We provide ad accounts and Business Managers for Meta (Facebook/Instagram), Google Ads (whitelisted accounts), and TikTok (verified accounts). Each platform account is set up for maximum stability and compliance.',
      },
      {
        question: 'How long do accounts last?',
        answer:
          'Our agency accounts are built for long-term use. Most clients run accounts for 3-6 months or longer without issues. With proper ad compliance, accounts can last indefinitely. We maintain a 97% approval rate across all accounts.',
      },
      {
        question: 'Can I use these accounts for any niche?',
        answer:
          'Our accounts work for most advertising niches including e-commerce, lead generation, SaaS, and services. However, we do not support accounts for prohibited content under platform policies. Contact us if you have questions about your specific niche.',
      },
      {
        question: 'What spend limits do accounts have?',
        answer:
          'Spend limits vary by account type and platform. Meta agency accounts typically start with $250/day and can scale to unlimited daily spend. Google whitelisted accounts have no preset limits. We can match you with the right account tier for your budget.',
      },
    ],
  },
  {
    value: 'warranty',
    label: 'Warranty & Replacement',
    icon: SettingsIcon,
    faqs: [
      {
        question: 'What does the 7-day warranty cover?',
        answer:
          'Our 7-day warranty covers any account issues not caused by policy violations on your part. If an account gets restricted, disabled, or has delivery issues within 7 days of delivery, we replace it at no additional cost.',
      },
      {
        question: 'How fast are replacements?',
        answer:
          'We process warranty replacements within 2 hours during business hours. For Enterprise clients, we offer instant replacements within 1 hour via dedicated Slack/Telegram channels. No lengthy ticket queues.',
      },
      {
        question: 'What if my account gets banned after 7 days?',
        answer:
          'After the warranty period, we offer discounted replacement accounts for existing clients. We also provide guidance on ad compliance best practices to help prevent future bans. Enterprise clients get extended warranty options.',
      },
      {
        question: 'Do you investigate ban reasons?',
        answer:
          'Yes. When a warranty claim is submitted, our team investigates the ban reason to determine if it qualifies for replacement. We also share insights on what triggered the issue so you can avoid it in the future.',
      },
    ],
  },
  {
    value: 'payment',
    label: 'Billing & Payment',
    icon: CreditCardIcon,
    faqs: [
      {
        question: 'What payment methods do you accept?',
        answer:
          'We accept bank transfers, cryptocurrency (USDT, BTC, ETH), PayPal, Wise, and major credit cards. For Enterprise clients, we also offer NET-30 invoicing and custom billing arrangements.',
      },
      {
        question: 'Do you offer bulk discounts?',
        answer:
          'Yes. Orders of 5+ accounts receive a 10% discount. Orders of 20+ accounts receive 20% off. Enterprise clients get custom pricing based on volume and long-term commitment. Contact sales for a quote.',
      },
      {
        question: 'Is there a refund policy?',
        answer:
          'We offer full refunds if we cannot deliver your order within the agreed timeframe. For delivered accounts, our 7-day warranty serves as your protection. Refunds are processed within 24-48 hours.',
      },
      {
        question: 'How quickly are accounts delivered after payment?',
        answer:
          'Most accounts are delivered within 1-4 hours after payment confirmation. For bulk orders or custom setups, delivery may take up to 24 hours. Enterprise clients get priority delivery within 1 hour.',
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
          'You can reach us via live chat on our website, Telegram (@GoAdsSupport), email, or through your dedicated account manager. Our average response time is under 2 hours, with 24/7 availability for Growth and Enterprise plans.',
      },
      {
        question: 'Do you provide onboarding help?',
        answer:
          'Yes. Every new client receives a setup guide and access to our knowledge base. Growth and Enterprise clients get a 1-on-1 onboarding call with their account manager to ensure everything is configured correctly.',
      },
      {
        question: 'Can you help optimize my ad campaigns?',
        answer:
          'While we focus on account infrastructure, our Enterprise plan includes basic campaign review and optimization guidance. We also partner with trusted media buying agencies we can refer you to.',
      },
      {
        question: 'What languages does support cover?',
        answer:
          'Our support team operates in English and Vietnamese. We also have partners who can assist in Chinese, Thai, and Indonesian for Southeast Asian clients.',
      },
    ],
  },
]

const FAQPage = () => {
  return <FAQ tabsData={tabsData} />
}

export default FAQPage
