import TestimonialsComponent from "@/components/shadcn-studio/blocks/testimonials-component-01/testimonials-component-01";
import type { TestimonialItem } from "@/components/shadcn-studio/blocks/testimonials-component-01/testimonials-component-01";

const col1: TestimonialItem[] = [
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
    verified: false,
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

const col2: TestimonialItem[] = [
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

const col3: TestimonialItem[] = [
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
    verified: false,
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

const TestimonialsComponentPage = () => {
  return <TestimonialsComponent columns={[col1, col2, col3]} />;
};

export default TestimonialsComponentPage;
