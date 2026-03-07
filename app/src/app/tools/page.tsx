import type { Metadata } from "next";

import { PageHero } from "@/components/page-hero";
import { SectionDivider } from "@/components/section-divider";
import { WavyUnderline } from "@/components/section-header";
import CTASection from "@/components/shadcn-studio/blocks/cta-section-05/cta-section-05";
import { ToolsHubContent } from "@/components/tools-hub-content";

export const metadata: Metadata = {
  title: "Free Online Tools for Ads Management | GoAds",
  description:
    "9 free tools: 2FA generator, account filter, data splitter, cookie converter, batch watermark & more. No sign-up, 100% client-side, your data never leaves your browser.",
  openGraph: {
    title: "Free Online Tools | GoAds",
    description:
      "Essential toolkit for Facebook & Google ad account management. 100% free, no sign-up required.",
    url: "https://www.goads.shop/tools",
    type: "website",
  },
};

export default function ToolsHubPage() {
  return (
    <main className="flex-1">
      {/* Hero */}
      <PageHero
        label="Free Tools"
        heading={
          <>
            Essential{" "}
            <span className="relative text-primary">
              Toolkit
              <WavyUnderline />
            </span>{" "}
            for Ads Management
          </>
        }
        description="Free online tools to manage your ad accounts, process data, and boost productivity. No sign-up required."
      />
      <SectionDivider />

      {/* Search + Featured + Categories (client component for search) */}
      <ToolsHubContent />
      <SectionDivider />

      {/* CTA */}
      <CTASection />
    </main>
  );
}
