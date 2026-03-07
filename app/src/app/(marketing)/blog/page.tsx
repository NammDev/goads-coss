import { BlogHero } from '@/components/blog-hero'
import { BlogListing } from '@/components/blog-listing'
import { SectionDivider } from '@/components/section-divider'
import CTASection from '@/components/shadcn-studio/blocks/cta-section-05/cta-section-05'

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
