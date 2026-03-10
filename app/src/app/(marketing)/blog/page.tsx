import type { Metadata } from "next"
import { BlogHero } from '@/components/blog-hero'
import { BlogListing } from '@/components/blog-listing'
import { SectionDivider } from '@/components/section-divider'
import CTASection from '@/components/shadcn-studio/blocks/cta-section-05/cta-section-05'

export const metadata: Metadata = {
  title: "Blog | GoAds Advertising Tips & Insights",
  description: "Read GoAds blog for Facebook & TikTok advertising tips, account management guides, and industry insights.",
}

export default function BlogPage() {
  return (
    <main className="flex-1">
      <BlogHero />
      <SectionDivider />
      <BlogListing />
      <SectionDivider />
      <CTASection />
    </main>
  )
}
