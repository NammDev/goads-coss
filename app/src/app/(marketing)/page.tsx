import type { Metadata } from "next"
import HeroClone from "@/components/shadcn-studio/blocks/hero-clone/hero-clone";
import BentoGrid from "@/components/shadcn-studio/blocks/bento-grid-19/bento-grid-19";
import BentoGrid10 from "@/components/shadcn-studio/blocks/bento-grid-10/bento-grid-10";
import StatsSection from "@/components/shadcn-studio/blocks/stats-section/stats-section";
import TestimonialsComponent from "@/components/shadcn-studio/blocks/testimonials-component-22/testimonials-component-22";
import Pricing from "@/components/shadcn-studio/blocks/pricing-component-13/pricing-component-13";
import FAQ from "@/components/shadcn-studio/blocks/faq-component-08/faq-component-08";
import { SectionDivider } from "@/components/section-divider";
import { reviews, pricingPlans } from "@/data/landing-reviews-pricing-faq";
import { faqTabsData } from "@/data/landing-faq";

export const metadata: Metadata = {
  title: "GoAds - Stop Losing Accounts. Start Scaling.",
  description: "Buy verified agency ad accounts, Business Managers & Meta assets. 7-day warranty, 24/7 support, 3,242+ BMs sold.",
}

export default function Page() {
  return (
    <main className="flex-1">
      <HeroClone />
      <SectionDivider />

      <BentoGrid />
      <SectionDivider />

      <StatsSection />
      <SectionDivider />

      <BentoGrid10 />
      <SectionDivider />

      <Pricing plans={pricingPlans} />
      <SectionDivider />

      <TestimonialsComponent reviews={reviews} />
      <SectionDivider />

      <FAQ tabsData={faqTabsData} />
    </main>
  );
}
