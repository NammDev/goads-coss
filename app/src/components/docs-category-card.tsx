// Pixel-perfect clone of Foreplay's docs landing category card.
//
// Spec (Foreplay class string, dark-mode tokens):
//   <a><div p-4 rounded-lg border group cursor-pointer relative h-full flex flex-col justify-end
//          border-foreground/[6%] bg-foreground/[1%] hover:bg-foreground/[2.5%]
//          hover:ring-2 ring-accent/[8%] hover:border-accent/[15%]>
//     <div h-9 w-9 rounded-lg border shadow-sm text-accent bg-accent/[10%]
//          group-hover:bg-accent/[13%] mb-4>icon</div>
//     <h3 text-base font-semibold text-white>{title}</h3>
//     <p mt-2 text-sm line-clamp-3 text-foreground>{description}</p>
//     <div flex gap-3 items-center pt-5 mt-auto>...avatars... <count> articles</div>
//     <svg absolute right-5 bottom-5 ... group-hover:-rotate-45 opacity-0 group-hover:opacity-75 />
//   </a>

import Link from "next/link"
import type { LucideIcon } from "lucide-react"

interface DocsCategoryCardProps {
  href: string
  icon: LucideIcon
  title: string
  description: string
  articleCount: number
}

export function DocsCategoryCard({
  href,
  icon: Icon,
  title,
  description,
  articleCount,
}: DocsCategoryCardProps) {
  return (
    <Link href={href}>
      <div className="group main-transition relative flex h-full cursor-pointer flex-col justify-end rounded-lg border border-foreground/[6%] bg-foreground/[1%] p-4 shadow ring-accent/[8%] transition-all duration-200 ease-in-out hover:border-accent/[15%] hover:bg-foreground/[2.5%] hover:ring-2">
        {/* Icon box — 36x36 rounded-lg, dark surface with accent text */}
        <div className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-accent/5 bg-accent/[10%] text-accent shadow-sm transition-all duration-200 ease-in-out group-hover:bg-accent/[13%]">
          <Icon className="size-4 shrink-0" strokeWidth={1.5} />
        </div>

        {/* Title */}
        <h3 className="text-base font-semibold text-white">{title}</h3>

        {/* Description */}
        <p className="mt-2 line-clamp-3 text-sm text-foreground">
          {description}
        </p>

        {/* Footer row — avatar stack + article count */}
        <div className="mt-auto flex items-center gap-3 pt-5">
          <div className="flex items-center -space-x-2">
            <span className="relative flex h-5 w-5 shrink-0 overflow-hidden rounded-full bg-secondary ring-2 ring-background">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/foreplay/sample-foreplay-avatar.webp"
                alt=""
                className="aspect-square h-full w-full"
              />
            </span>
          </div>
          <p className="text-[13px] text-foreground/70">
            <span className="font-semibold">{articleCount}</span>{" "}
            {articleCount === 1 ? "article" : "articles"}
          </p>
        </div>

        {/* Hover arrow — fades + rotates -45deg on group hover */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
          className="main-transition absolute right-5 bottom-5 h-5 w-5 rotate-0 text-foreground/40 opacity-0 transition-all delay-300 duration-200 group-hover:-rotate-45 group-hover:opacity-75"
        >
          <path
            fillRule="evenodd"
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </Link>
  )
}
