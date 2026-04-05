// Foreplay pricing page data — extracted from foreplay.co/pricing source HTML

import type { PricingCardData } from "@/components/foreplay/foreplay-pricing-card"

// ── Monthly pricing cards ──

export const monthlyCards: PricingCardData[] = [
  {
    planName: "Basic",
    description: "For teams of all sizes saving & organizing ad inspiration.",
    price: "$59",
    period: "/month",
    ctaLabel: "Start 7 Day Free Trial",
    ctaHref: "https://app.foreplay.co/sign-up",
    ctaVariant: "secondary",
    usersIncluded: "1 user Included",
    additionalUserCost: "$20 per additional user",
    features: [
      { icon: "swipe-file", label: "Swipe File", available: true },
      { icon: "discovery", label: "Discovery", available: true },
      { icon: "briefs", label: "Briefs", available: true },
      { icon: "spyder", label: "Spyder", available: false },
      { icon: "lens", label: "Lens", available: false },
      { icon: "api", label: "API\u00A0Access", available: true, value: "10,000 Credits" },
    ],
  },
  {
    planName: "WORKFLOW",
    description: "The complete winning ad workflow for scaling teams.",
    price: "$175",
    period: "/month",
    ctaLabel: "Start 7 Day Free Trial",
    ctaHref: "https://app.foreplay.co/sign-up",
    ctaVariant: "primary",
    usersIncluded: "Up to 5 users included",
    additionalUserCost: "$20 per additional user",
    features: [
      { icon: "swipe-file", label: "Swipe File", available: true },
      { icon: "discovery", label: "Discovery", available: true },
      { icon: "briefs", label: "Briefs", available: true },
      { icon: "spyder", label: "Spyder", available: true, value: "15 Brands" },
      { icon: "lens", label: "Lens", available: true, value: "1 Brand (Unlimited Ad Spend)" },
      { icon: "api", label: "API Access", available: true, value: "10,000 Credits" },
    ],
  },
  {
    planName: "Agency",
    description: "Supercharging marketing groups to scale multiple ad accounts.",
    price: "$459",
    period: "/month",
    ctaLabel: "Start 7 Day Free Trial",
    ctaHref: "https://app.foreplay.co/sign-up",
    ctaVariant: "secondary",
    usersIncluded: "Up to 10 users included",
    additionalUserCost: "$20 per additional user",
    features: [
      { icon: "swipe-file", label: "Swipe File", available: true },
      { icon: "discovery", label: "Discovery", available: true },
      { icon: "briefs", label: "Briefs", available: true },
      { icon: "spyder", label: "Spyder", available: true, value: "50 Brands" },
      { icon: "lens", label: "Lens", available: true, value: "10 Brands (Unlimited Ad Spend)" },
      { icon: "api", label: "API Access", available: true, value: "10,000 Credits" },
    ],
  },
]

// ── Annual pricing cards ──

export const annualCards: PricingCardData[] = [
  {
    planName: "Basic",
    description: "For teams of all sizes saving & organizing ad inspiration.",
    price: "$49",
    period: "/month",
    savingsText: "Save $120 annually",
    ctaLabel: "Start 7 Day Free Trial",
    ctaHref: "https://app.foreplay.co/sign-up",
    ctaVariant: "secondary",
    usersIncluded: "1 user Included",
    additionalUserCost: "$20 per additional user",
    features: [
      { icon: "swipe-file", label: "Swipe File", available: true },
      { icon: "discovery", label: "Discovery", available: true },
      { icon: "briefs", label: "Briefs", available: true },
      { icon: "spyder", label: "Spyder", available: false },
      { icon: "lens", label: "Lens", available: false },
      { icon: "api", label: "API\u00A0Access", available: true, value: "20,000 Credits" },
    ],
  },
  {
    planName: "WORKFLOW",
    description: "The complete winning ad workflow for scaling teams.",
    price: "$149",
    period: "/month",
    savingsText: "Save $310 annually",
    ctaLabel: "Start 7 Day Free Trial",
    ctaHref: "https://app.foreplay.co/sign-up",
    ctaVariant: "primary",
    usersIncluded: "Up to 5 users included",
    additionalUserCost: "$20 per additional user",
    features: [
      { icon: "swipe-file", label: "Swipe File", available: true },
      { icon: "discovery", label: "Discovery", available: true },
      { icon: "briefs", label: "Briefs", available: true },
      { icon: "spyder", label: "Spyder", available: true, value: "Unlimited" },
      { icon: "lens", label: "Lens", available: true, value: "1 Brand (Unlimited Ad Spend)" },
      { icon: "api", label: "API Access", available: true, value: "20,000 Credits" },
    ],
  },
  {
    planName: "Agency",
    description: "Supercharging marketing groups to scale multiple ad accounts.",
    price: "$389",
    period: "/month",
    savingsText: "Save $820 annually",
    ctaLabel: "Start 7 Day Free Trial",
    ctaHref: "https://app.foreplay.co/sign-up",
    ctaVariant: "secondary",
    usersIncluded: "Up to 10 users included",
    additionalUserCost: "$20 per additional user",
    features: [
      { icon: "swipe-file", label: "Swipe File", available: true },
      { icon: "discovery", label: "Discovery", available: true },
      { icon: "briefs", label: "Briefs", available: true },
      { icon: "spyder", label: "Spyder", available: true, value: "Unlimited" },
      { icon: "lens", label: "Lens", available: true, value: "10 Brands (Unlimited Ad Spend)" },
      { icon: "api", label: "API Access", available: true, value: "20,000 Credits" },
    ],
  },
]

// ── FAQ items ──

export const pricingFaqItems = [
  {
    question: "Is Foreplay support available during my trial?",
    answer:
      "Definitely! Our popular live chat support is available for our customers and also for interested parties Monday to Friday from 9:00am - 5:00pm EST. Of course you can also reach our team by email. Contact us at support@foreplay.co.",
  },
  {
    question: "Do I get support & help as a customer?",
    answer:
      "Yes, and very much so. In our software, you'll find the help articles that help you step by step. They will always help you if you get stuck. Also, our team can assist you within minutes via chat support inside the app.",
  },
  {
    question: "Can I cancel at anytime?",
    answer:
      "Yes, if you signup for a Foreplay account and decide the platform isn't for you, you can cancel your monthly subscription. However, if you commit to a yearly plan you will not receive a refund for the remaining months.",
  },
  {
    question: "How does the trial work? Will I be charged?",
    answer:
      "When you sign up for a trial of Foreplay you will select a plan to trial for 7 days and enter a credit card. After your 7-day free trial you will be automatically subscribed to the plan you are trialing.",
  },
  {
    question: "Are there any usage limitations?",
    answer:
      "There are no usage limitations on any of our plans. You can save unlimited ads from Facebook Ad Library, TikTok Creative Center and more.",
  },
  {
    question: "Do you offer annual discounts?",
    answer:
      "Yes! All paid plans are available for ~15% off the monthly price if you pay annually. There is no pro-rated refunds for annual commitments.",
  },
]
