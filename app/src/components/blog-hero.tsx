'use client'

import { SearchIcon } from 'lucide-react'
import { Kalam } from 'next/font/google'
import { WavyUnderline } from '@/components/section-header'
import HeroGridBg from '@/components/shadcn-studio/blocks/hero-clone/hero-grid-bg'

const kalam = Kalam({ weight: '400', subsets: ['latin'], display: 'swap' })

export function BlogHero() {
  return (
    <section className="relative z-[1] overflow-hidden py-12 md:py-14">
      {/* Reuse shared grid cell background — same as home page hero */}
      <HeroGridBg />

      {/* Content — z-10 to sit above grid */}
      <div className="relative z-10 mx-auto max-w-[1416px] px-4 lg:px-6">
        <div className="text-center">
          <div className="space-y-4">
            {/* Handwritten label */}
            <span
              className={`${kalam.className} inline-block font-medium text-primary underline underline-offset-6`}
            >
              Our Blogs
            </span>

            {/* Heading with SVG wavy underline on last word */}
            <h1 className="text-2xl font-semibold text-foreground sm:text-3xl lg:text-4xl">
              Stay Ahead with{' '}
              <span className="relative inline-block">
                GoAds
                <WavyUnderline className="-bottom-1.5 left-[8%] h-2 w-5/6" />
              </span>
            </h1>

            {/* Description with bold keywords */}
            <p className="mx-auto max-w-4xl text-muted-foreground">
              Explore our expertly crafted blog posts featuring the{' '}
              <span className="font-semibold text-foreground">latest news</span>,{' '}
              <span className="font-semibold text-foreground">in-depth tutorials</span>, and{' '}
              <span className="font-semibold text-foreground">expert tips</span> to master{' '}
              <span className="font-semibold text-foreground">GoAds.</span>
            </p>

            {/* Search box */}
            <div className="flex justify-center">
              <div className="flex w-full items-center rounded-md border border-input bg-background sm:w-[26rem]">
                <input
                  type="search"
                  placeholder="Search Your Blogs..."
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
          </div>
        </div>
      </div>
    </section>
  )
}
