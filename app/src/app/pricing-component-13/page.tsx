import Pricing from '@/components/shadcn-studio/blocks/pricing-component-13/pricing-component-13'

const plans = [
  {
    name: 'Starter',
    price: '49',
    buttonText: 'Get Started',
    description: 'Perfect for solo media buyers testing agency accounts for the first time.',
    features: [
      { title: '1 Agency Ad Account', description: 'Meta verified, ready to run ads', available: true },
      { title: '7-Day Warranty', description: 'Full replacement if any issues', available: true },
      { title: 'Email Support', description: 'Response within 24 hours', available: true },
      { title: 'Dedicated Account Manager', description: 'Not available on this plan', available: false },
      { title: 'Priority Replacements', description: 'Not available on this plan', available: false },
    ],
  },
  {
    name: 'Growth',
    price: '149',
    buttonText: 'Scale Now',
    isPopular: true,
    description: 'For agencies and brands scaling ad spend across multiple accounts.',
    features: [
      { title: '5 Agency Ad Accounts', description: 'Meta verified, high spend limits', available: true },
      { title: '7-Day Warranty', description: 'Full replacement if any issues', available: true },
      { title: 'Priority Support', description: 'Response within 2 hours, 24/7', available: true },
      { title: 'Dedicated Account Manager', description: 'Personal point of contact', available: true },
      { title: 'Priority Replacements', description: 'Not available on this plan', available: false },
    ],
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    buttonText: 'Talk to Sales',
    description: 'For large agencies managing high-volume ad spend across platforms.',
    features: [
      { title: 'Unlimited Accounts', description: 'Meta, Google, TikTok — all platforms', available: true },
      { title: '7-Day Warranty', description: 'Full replacement if any issues', available: true },
      { title: '24/7 Priority Support', description: 'Dedicated Slack/Telegram channel', available: true },
      { title: 'Dedicated Account Manager', description: 'Senior team member assigned', available: true },
      { title: 'Priority Replacements', description: 'Instant replacement within 1 hour', available: true },
    ],
    highlight: true,
  },
]

const PricingPage = () => {
  return <Pricing plans={plans} />
}

export default PricingPage
