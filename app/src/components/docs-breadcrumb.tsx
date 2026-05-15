// Pixel-perfect clone of Foreplay's docs breadcrumb.
//
// Spec (verbatim — class order matches Foreplay source):
//   <nav aria-label="breadcrumb" class="!list-none !p-0">
//     <ol class="flex truncate items-center !px-0 !list-none gap-1
//                break-words text-sm text-muted-foreground sm:gap-x-2">
//        ^ Foreplay also has a GLOBAL rule:
//          @media (min-width: 640px) { ol { padding: .5rem 0; } }
//        which adds 8px top/bottom to every <ol> at sm+. We don't replicate
//        that globally (would affect markdoc lists); instead we bake it into
//        the breadcrumb's own ol via `sm:py-2`.
//       <a class="transition-colors hover:decoration-foreground/30
//                 dark:decoration-foreground/30 decoration-foreground/30
//                 !text-foreground/80 font-normal hover:text-foreground
//                 truncate max-w-20 md:max-w-none" href="/">Home</a>
//       <li role="presentation" aria-hidden="true" class="[&>svg]:size-3.5 !m-0">
//         <svg class="secondary-svg" viewBox="0 0 20 20">chevron-right</svg>
//       </li>
//       <a class="..." href="...">Getting Started</a>
//       <li role="presentation" aria-hidden="true" class="[&>svg]:size-3.5 !m-0">
//         <svg class="secondary-svg">chevron</svg>
//       </li>
//       <li class="inline-flex !text-[13px] items-center gap-1.5 !m-0 truncate">
//         <span role="link" aria-disabled="true" aria-current="page"
//               class="!font-medium text-foreground truncate max-w-20 md:max-w-none">
//           {currentLabel}
//         </span>
//       </li>
//     </ol>
//   </nav>
//
// Notes:
// - Anchors sit directly inside <ol> (not wrapped in <li>) — Foreplay's unusual
//   but functional DOM. Chevrons are <li role="presentation"> separators.
// - `.secondary-svg` paints chevron with `hsl(var(--background-accent))` —
//   slightly darker gray than the inherited `text-muted-foreground` on <ol>.
//   Parent's `[&>svg]:size-3.5` overrides the 1rem in .secondary-svg via
//   specificity (class + child combinator + element wins over single class),
//   keeping chevrons at 14×14. CSS lives in globals.css under .foreplay scope.

import Link from "next/link"
import { Fragment } from "react"

export type DocsBreadcrumbItem = {
  /** Display text */
  label: string
  /** Internal href. Omit on the last (current) item — it renders as a non-link span. */
  href?: string
}

interface DocsBreadcrumbProps {
  items: DocsBreadcrumbItem[]
}

function ChevronSeparator() {
  return (
    <li
      role="presentation"
      aria-hidden="true"
      className="[&>svg]:size-3.5 !m-0"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
        className="secondary-svg"
      >
        <path
          fillRule="evenodd"
          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
          clipRule="evenodd"
        />
      </svg>
    </li>
  )
}

export function DocsBreadcrumb({ items }: DocsBreadcrumbProps) {
  return (
    <nav aria-label="breadcrumb" className="!list-none !p-0">
      <ol className="flex truncate items-center !px-0 !list-none gap-1 break-words text-sm text-muted-foreground sm:gap-x-2 sm:py-2">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1
          return (
            <Fragment key={`${item.label}-${idx}`}>
              {isLast ? (
                <li className="inline-flex !text-[13px] items-center gap-1.5 !m-0 truncate">
                  <span
                    role="link"
                    aria-disabled="true"
                    aria-current="page"
                    className="!font-medium text-foreground truncate max-w-20 md:max-w-none"
                  >
                    {item.label}
                  </span>
                </li>
              ) : (
                <>
                  <Link
                    href={item.href ?? "#"}
                    className="transition-colors hover:decoration-foreground/30 dark:decoration-foreground/30 decoration-foreground/30 !text-foreground/80 font-normal hover:text-foreground truncate max-w-20 md:max-w-none"
                  >
                    {item.label}
                  </Link>
                  <ChevronSeparator />
                </>
              )}
            </Fragment>
          )
        })}
      </ol>
    </nav>
  )
}
