import HeroSection from "@/components/shadcn-studio/blocks/hero-section-39/hero-section-39";
import type { TestimonialItem as HeroTestimonialItem } from "@/components/shadcn-studio/blocks/hero-section-39/hero-section-39";
import BentoGrid from "@/components/shadcn-studio/blocks/bento-grid-19/bento-grid-19";
import StatsSection from "@/components/shadcn-studio/blocks/stats-section/stats-section";
import TestimonialsComponent from "@/components/shadcn-studio/blocks/testimonials-component-01/testimonials-component-01";
import type { TestimonialItem } from "@/components/shadcn-studio/blocks/testimonials-component-01/testimonials-component-01";
import Pricing from "@/components/shadcn-studio/blocks/pricing-component-13/pricing-component-13";
import FAQ from "@/components/shadcn-studio/blocks/faq-component-08/faq-component-08";
import CTASection from "@/components/shadcn-studio/blocks/cta-section-05/cta-section-05";
import { ShieldCheckIcon, HeadphonesIcon, CreditCardIcon, SettingsIcon } from "lucide-react";
import { SectionDivider } from "@/components/section-divider";

const heroTestimonials: HeroTestimonialItem[] = [
  {
    name: "Paityn Lipshutz",
    role: "CEO & Co Founder at Lemonsqueezy",
    avatar:
      "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-2.png?width=40&height=40&format=auto",
    content:
      "Excellent product—durable, intuitive, and exactly what I needed. Customer service was outstanding and very helpful.",
  },
  {
    name: "Angel Lubin",
    role: "CEO & Co Founder at Zipline",
    avatar:
      "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-17.png?width=40&height=40&format=auto",
    content:
      "Top-notch quality—easy to set up and performs as promised. The support team was incredibly responsive and attentive",
  },
  {
    name: "Lincoln Stanton",
    role: "CEO & Co Founder at Gumroad",
    avatar:
      "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png?width=40&height=40&format=auto",
    content:
      "Amazing product—well-built, user-friendly, and just as advertised. The service team exceeded my expectations",
  },
  {
    name: "Skylar Lipshutz",
    role: "Product manager at Orbit",
    avatar:
      "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-12.png?width=40&height=40&format=auto",
    content:
      "Outstanding product—well-crafted, user-friendly, and exactly what I expected. The team went above and beyond to help.",
  },
  {
    name: "Corey Franci",
    role: "sbaker@hotmail.com",
    avatar:
      "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-7.png?width=40&height=40&format=auto",
    content:
      "Wonderful product—high quality, easy to operate, and exactly what I wanted. Support was quick and very helpful.",
  },
  {
    name: "Anika Franci",
    role: "CEO & Co Founder at Zendesk",
    avatar:
      "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-2.png?width=40&height=40&format=auto",
    content:
      "Impressive product—high quality, simple to use, and exactly as promised. Customer service was superb and very responsive.",
  },
  {
    name: "Skylar Rosser",
    role: "Product manager at Orbit",
    avatar:
      "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-20.png?width=40&height=40&format=auto",
    content:
      "Outstanding product—well-crafted, user-friendly, and exactly what I expected. The team went above and beyond to help.",
  },
  {
    name: "Chance Baptista",
    role: "CEO & Co Founder at ABC Company",
    avatar:
      "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-3.png?width=40&height=40&format=auto",
    content:
      "Great product—reliable, easy to set up, and just as described. Service was excellent and ensured a smooth experience.",
  },
];

const testimonialsCol1: TestimonialItem[] = [
  {
    name: "Minh Tuan",
    handle: "Agency Owner",
    avatar:
      "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png?width=40&height=40&format=auto",
    content:
      "Switched to GoAds agency accounts 6 months ago. Zero bans since. My ROAS went from 2x to 5x because I can finally scale without fear.",
    verified: true,
  },
  {
    name: "Sarah Chen",
    handle: "E-commerce Brand",
    avatar:
      "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-3.png?width=40&height=40&format=auto",
    content:
      "The 7-day warranty gave me confidence to try. Haven't needed it once — accounts are rock solid.",
    verified: true,
  },
  {
    name: "David Park",
    handle: "Performance Marketer",
    avatar:
      "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-5.png?width=40&height=40&format=auto",
    content:
      "Support responded in 40 minutes on a Sunday. That's when I knew GoAds was different from every other provider.",
  },
  {
    name: "Linh Nguyen",
    handle: "Media Buyer",
    avatar:
      "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-7.png?width=40&height=40&format=auto",
    content:
      "I was burning through accounts every week. GoAds agency accounts last months. Game changer for scaling.",
  },
  {
    name: "Alex Thompson",
    handle: "Dropshipping Pro",
    avatar:
      "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-9.png?width=40&height=40&format=auto",
    content:
      "Best BMs I've ever used. Clean history, no restrictions, and the team actually knows Meta's ecosystem.",
    verified: true,
  },
];

const testimonialsCol2: TestimonialItem[] = [
  {
    name: "James Wilson",
    handle: "Ad Agency CEO",
    avatar:
      "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-2.png?width=40&height=40&format=auto",
    content:
      "We manage 50+ client accounts through GoAds. The reliability is unmatched — our clients trust us more because we never go down.",
    verified: true,
  },
  {
    name: "Hoang Anh",
    handle: "Affiliate Marketer",
    avatar:
      "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-4.png?width=40&height=40&format=auto",
    content:
      "Tried 4 other providers before GoAds. None of them lasted more than 2 weeks. GoAds accounts are still running after 3 months.",
  },
  {
    name: "Maria Santos",
    handle: "DTC Brand Founder",
    avatar:
      "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-6.png?width=40&height=40&format=auto",
    content:
      "The Google whitelisted accounts opened up a whole new channel for us. Revenue jumped 40% in the first month.",
    verified: true,
  },
  {
    name: "Kevin Tran",
    handle: "Growth Hacker",
    avatar:
      "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-8.png?width=40&height=40&format=auto",
    content:
      "Fast delivery, clean accounts, real support. GoAds is the only provider I recommend to my network.",
    verified: true,
  },
  {
    name: "Phuong Le",
    handle: "E-commerce Consultant",
    avatar:
      "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-10.png?width=40&height=40&format=auto",
    content:
      "My clients kept getting banned on personal accounts. Moved everyone to GoAds agency accounts — problem solved overnight.",
  },
];

const testimonialsCol3: TestimonialItem[] = [
  {
    name: "Ryan Mitchell",
    handle: "7-Figure Store Owner",
    avatar:
      "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-11.png?width=40&height=40&format=auto",
    content:
      "GoAds helped us scale from $10k to $100k/month in ad spend. The accounts handle high budgets without issues.",
    verified: true,
  },
  {
    name: "Thu Ha",
    handle: "Social Media Agency",
    avatar:
      "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-12.png?width=40&height=40&format=auto",
    content:
      "The TikTok verified accounts from GoAds gave us instant credibility. Our ad approval rate went from 60% to 95%.",
    verified: true,
  },
  {
    name: "Marcus Lee",
    handle: "Performance Agency",
    avatar:
      "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-13.png?width=40&height=40&format=auto",
    content:
      "5 years in the game and GoAds is the most reliable provider I've worked with. Period.",
  },
  {
    name: "Duc Minh",
    handle: "Lead Gen Specialist",
    avatar:
      "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-14.png?width=40&height=40&format=auto",
    content:
      "Support team replaced a flagged account within 2 hours. The warranty is real — they stand behind their product.",
    verified: true,
  },
  {
    name: "Emily Zhao",
    handle: "Brand Strategist",
    avatar:
      "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-15.png?width=40&height=40&format=auto",
    content:
      "Clean accounts, fast onboarding, and a team that actually understands what advertisers need. Highly recommend.",
    verified: true,
  },
];

const pricingPlans = [
  {
    name: "Starter",
    price: "49",
    buttonText: "Get Started",
    description:
      "Perfect for solo media buyers testing agency accounts for the first time.",
    features: [
      {
        title: "1 Agency Ad Account",
        description: "Meta verified, ready to run ads",
        available: true,
      },
      {
        title: "7-Day Warranty",
        description: "Full replacement if any issues",
        available: true,
      },
      {
        title: "Email Support",
        description: "Response within 24 hours",
        available: true,
      },
      {
        title: "Dedicated Account Manager",
        description: "Not available on this plan",
        available: false,
      },
      {
        title: "Priority Replacements",
        description: "Not available on this plan",
        available: false,
      },
    ],
  },
  {
    name: "Growth",
    price: "149",
    buttonText: "Scale Now",
    isPopular: true,
    description:
      "For agencies and brands scaling ad spend across multiple accounts.",
    features: [
      {
        title: "5 Agency Ad Accounts",
        description: "Meta verified, high spend limits",
        available: true,
      },
      {
        title: "7-Day Warranty",
        description: "Full replacement if any issues",
        available: true,
      },
      {
        title: "Priority Support",
        description: "Response within 2 hours, 24/7",
        available: true,
      },
      {
        title: "Dedicated Account Manager",
        description: "Personal point of contact",
        available: true,
      },
      {
        title: "Priority Replacements",
        description: "Not available on this plan",
        available: false,
      },
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    buttonText: "Talk to Sales",
    description:
      "For large agencies managing high-volume ad spend across platforms.",
    features: [
      {
        title: "Unlimited Accounts",
        description: "Meta, Google, TikTok — all platforms",
        available: true,
      },
      {
        title: "7-Day Warranty",
        description: "Full replacement if any issues",
        available: true,
      },
      {
        title: "24/7 Priority Support",
        description: "Dedicated Slack/Telegram channel",
        available: true,
      },
      {
        title: "Dedicated Account Manager",
        description: "Senior team member assigned",
        available: true,
      },
      {
        title: "Priority Replacements",
        description: "Instant replacement within 1 hour",
        available: true,
      },
    ],
    highlight: true,
  },
];

const faqTabsData = [
  {
    value: "accounts",
    label: "Ad Accounts",
    icon: ShieldCheckIcon,
    faqs: [
      {
        question: "What are agency ad accounts?",
        answer:
          "Agency ad accounts are Meta-verified advertising accounts created under official agency Business Managers. They offer higher trust scores, better ad approval rates, and more stability compared to personal ad accounts — ideal for scaling campaigns without constant bans.",
      },
      {
        question: "Which platforms do you support?",
        answer:
          "We provide ad accounts and Business Managers for Meta (Facebook/Instagram), Google Ads (whitelisted accounts), and TikTok (verified accounts). Each platform account is set up for maximum stability and compliance.",
      },
      {
        question: "How long do accounts last?",
        answer:
          "Our agency accounts are built for long-term use. Most clients run accounts for 3-6 months or longer without issues. With proper ad compliance, accounts can last indefinitely. We maintain a 97% approval rate across all accounts.",
      },
      {
        question: "Can I use these accounts for any niche?",
        answer:
          "Our accounts work for most advertising niches including e-commerce, lead generation, SaaS, and services. However, we do not support accounts for prohibited content under platform policies. Contact us if you have questions about your specific niche.",
      },
      {
        question: "What spend limits do accounts have?",
        answer:
          "Spend limits vary by account type and platform. Meta agency accounts typically start with $250/day and can scale to unlimited daily spend. Google whitelisted accounts have no preset limits. We can match you with the right account tier for your budget.",
      },
    ],
  },
  {
    value: "warranty",
    label: "Warranty & Replacement",
    icon: SettingsIcon,
    faqs: [
      {
        question: "What does the 7-day warranty cover?",
        answer:
          "Our 7-day warranty covers any account issues not caused by policy violations on your part. If an account gets restricted, disabled, or has delivery issues within 7 days of delivery, we replace it at no additional cost.",
      },
      {
        question: "How fast are replacements?",
        answer:
          "We process warranty replacements within 2 hours during business hours. For Enterprise clients, we offer instant replacements within 1 hour via dedicated Slack/Telegram channels. No lengthy ticket queues.",
      },
      {
        question: "What if my account gets banned after 7 days?",
        answer:
          "After the warranty period, we offer discounted replacement accounts for existing clients. We also provide guidance on ad compliance best practices to help prevent future bans. Enterprise clients get extended warranty options.",
      },
      {
        question: "Do you investigate ban reasons?",
        answer:
          "Yes. When a warranty claim is submitted, our team investigates the ban reason to determine if it qualifies for replacement. We also share insights on what triggered the issue so you can avoid it in the future.",
      },
    ],
  },
  {
    value: "payment",
    label: "Billing & Payment",
    icon: CreditCardIcon,
    faqs: [
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept bank transfers, cryptocurrency (USDT, BTC, ETH), PayPal, Wise, and major credit cards. For Enterprise clients, we also offer NET-30 invoicing and custom billing arrangements.",
      },
      {
        question: "Do you offer bulk discounts?",
        answer:
          "Yes. Orders of 5+ accounts receive a 10% discount. Orders of 20+ accounts receive 20% off. Enterprise clients get custom pricing based on volume and long-term commitment. Contact sales for a quote.",
      },
      {
        question: "Is there a refund policy?",
        answer:
          "We offer full refunds if we cannot deliver your order within the agreed timeframe. For delivered accounts, our 7-day warranty serves as your protection. Refunds are processed within 24-48 hours.",
      },
      {
        question: "How quickly are accounts delivered after payment?",
        answer:
          "Most accounts are delivered within 1-4 hours after payment confirmation. For bulk orders or custom setups, delivery may take up to 24 hours. Enterprise clients get priority delivery within 1 hour.",
      },
    ],
  },
  {
    value: "support",
    label: "Support",
    icon: HeadphonesIcon,
    faqs: [
      {
        question: "How do I reach support?",
        answer:
          "You can reach us via live chat on our website, Telegram (@GoAdsSupport), email, or through your dedicated account manager. Our average response time is under 2 hours, with 24/7 availability for Growth and Enterprise plans.",
      },
      {
        question: "Do you provide onboarding help?",
        answer:
          "Yes. Every new client receives a setup guide and access to our knowledge base. Growth and Enterprise clients get a 1-on-1 onboarding call with their account manager to ensure everything is configured correctly.",
      },
      {
        question: "Can you help optimize my ad campaigns?",
        answer:
          "While we focus on account infrastructure, our Enterprise plan includes basic campaign review and optimization guidance. We also partner with trusted media buying agencies we can refer you to.",
      },
      {
        question: "What languages does support cover?",
        answer:
          "Our support team operates in English and Vietnamese. We also have partners who can assist in Chinese, Thai, and Indonesian for Southeast Asian clients.",
      },
    ],
  },
];

export default function Page() {
  return (
    <main className="flex-1">
      <HeroSection testimonials={heroTestimonials} />
      <SectionDivider />
      <BentoGrid />
      <SectionDivider />
      <StatsSection />
      <SectionDivider />
      <TestimonialsComponent
        columns={[testimonialsCol1, testimonialsCol2, testimonialsCol3]}
      />
      <SectionDivider />
      <Pricing plans={pricingPlans} />
      <SectionDivider />
      <FAQ tabsData={faqTabsData} />
      <SectionDivider />
      <CTASection />
    </main>
  );
}
