import type { Metadata } from "next";
import { Suspense } from "react";

import { PageHeroBig } from "@/components/page-hero-big";
import { SectionDivider } from "@/components/section-divider";
import { WavyUnderline } from "@/components/section-header";
import CTASection from "@/components/shadcn-studio/blocks/cta-section-05/cta-section-05";
import { ToolsHubSkeleton } from "@/components/skeletons/tools-hub-skeleton";
import { ToolsHubContent } from "@/components/tools-hub-content";
import { ToolsIllustration } from "@/components/hero-illustrations/tools-illustration";

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
      <PageHeroBig
        badge="Free Tools"
        tagline="No sign-up required. 100% client-side."
        heading={
          <>
            Essential{" "}
            <span className="relative inline-block">
              Toolkit
              <WavyUnderline className="-bottom-1.5 left-[8%] h-2 w-5/6" />
            </span>{" "}
            for Ads Management
          </>
        }
        description="Free online tools to manage your ad accounts, process data, and boost productivity. No sign-up required."
        ctas={[
          { label: "Browse Tools", href: "#tools", className: "btn-mirror-sweep btn-secondary" },
          { label: "Talk to Sales", href: "/talk-to-sales", variant: "outline", className: "btn-tertiary" },
        ]}
        illustration={<ToolsIllustration />}
      />
      <SectionDivider />

      {/* Tools grid with skeleton fallback */}
      <Suspense fallback={<ToolsHubSkeleton />}>
        <ToolsHubContent />
      </Suspense>
      <SectionDivider />

      {/* CTA */}
      <CTASection />
    </main>
  );
}
