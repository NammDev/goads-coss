import { SearchIcon } from 'lucide-react'

import { PageHero } from '@/components/page-hero'
import { WavyUnderline } from '@/components/section-header'

export function BlogHero() {
  return (
    <PageHero
      label="Our Blogs"
      heading={
        <>
          Stay Ahead with{' '}
          <span className="relative inline-block">
            GoAds
            <WavyUnderline className="-bottom-1.5 left-[8%] h-2 w-5/6" />
          </span>
        </>
      }
      description="Explore our expertly crafted blog posts featuring the latest news, in-depth tutorials, and expert tips to master GoAds."
    >
      {/* Search box */}
      <div className="flex justify-center">
        <div className="flex w-full items-center rounded-md border border-input bg-background sm:w-[26rem]">
          <input
            type="search"
            placeholder="Search Your Blogs..."
            aria-label="Search blog posts"
            className="h-10 flex-1 bg-transparent px-4 text-sm outline-none placeholder:text-muted-foreground"
          />
          <button
            type="button"
            className="-me-0.5 flex h-10 items-center px-3 text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Search"
          >
            <SearchIcon className="size-5" />
          </button>
        </div>
      </div>
    </PageHero>
  )
}
