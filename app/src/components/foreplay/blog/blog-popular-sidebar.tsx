// Blog popular sidebar — .blog-feed-wrapper
//
// Foreplay DOM (per listitem):
// <div class="w-dyn-item">
//   <div class="text-white">                            color:#fff; flex:1
//     <div class="blog-feed-content">                   flex col gap-[5px] text-left items-stretch
//       <a class="blog-feed-link">                      flex col gap-1 items-start color:body
//         <h3 class="text-label-m">Title</h3>
//         <div class="blog-feed-subttext">              (no own CSS — pass-through)
//           <div class="text-alpha-100">                color:#ffffffad
//             <div class="text-body-s line-clamp-2">Desc</div>
//           </div>
//         </div>
//       </a>
//     </div>
//     <div class="blog-feed-author">                    flex items-center pt-3 — NO parent gap
//       <a class="blog-feed-author-link">               color:neutral-0
//         <div class="text-body-s">Author Name</div>
//       </a>
//       <div class="text-seperator"></div>              1×20px, mx-[7px]
//       <div class="flex-gap-1">                        flex gap-1 items-center
//         <div class="text-body-s">10</div>
//         <div class="text-body-s">min read</div>
//       </div>
//     </div>
//   </div>
// </div>
//
// Wrapper .blog-feed-wrapper: flex col gap-5 items-start
// Wrapper .collection-list-5:  grid 1col gap-10 (40px) — no dividers

import Link from "next/link"

import { cn } from "@/lib/utils"
import { fpText } from "@/components/foreplay/foreplay-typography"
import type { BlogPost } from "@/data/blog-posts"

interface BlogPopularSidebarProps {
  posts: BlogPost[]
  /** Base path for post links — defaults to "/foreplay/blog" */
  basePath?: string
  className?: string
}

function splitReadTime(readTime: string): { num: string; label: string } {
  // "10 min read" → { num: "10", label: "min read" }
  const match = readTime.match(/^(\d+)\s+(.+)$/)
  return match ? { num: match[1], label: match[2] } : { num: "", label: readTime }
}

export function BlogPopularSidebar({ posts, basePath = "/foreplay/blog", className }: BlogPopularSidebarProps) {
  return (
    // .blog-feed-wrapper: flex col gap-5 (20px) items-start
    <div className={cn("flex flex-col items-start gap-5", className)}>
      {/* .text-alpha-100 > h2.text-overline: "Popular Blogs" */}
      <div className="text-[var(--fp-alpha-100,#ffffffad)]">
        <h2 className={fpText.overline}>Popular Blogs</h2>
      </div>

      {/* .collection-list-5: 1-col grid, 40px gap — no dividers */}
      <div className="flex w-full flex-col gap-10">
        {posts.map((post) => {
          const { num, label } = splitReadTime(post.readTime)
          return (
            // .w-dyn-item > .text-white (color:#fff; flex:1)
            <div key={post.slug} className="w-full flex-1 text-foreground">
              {/* .blog-feed-content: flex col gap-[5px] text-left items-stretch */}
              <div className="flex flex-col items-stretch gap-[5px] text-left">
                {/* .blog-feed-link: flex col gap-1 items-start */}
                <Link
                  href={`${basePath}/${post.slug}`}
                  className="flex flex-col items-start gap-1 hover:opacity-80"
                >
                  {/* h3.text-label-m */}
                  <h3 className={fpText.labelM}>{post.title}</h3>
                  {/* .blog-feed-subttext (no own CSS — pass-through wrapper) */}
                  <div>
                    {/* .text-alpha-100 */}
                    <div className="text-[var(--fp-alpha-100,#ffffffad)]">
                      {/* .text-body-s.line-clamp-2 */}
                      <div className={cn(fpText.bodyS, "line-clamp-2")}>
                        {post.description}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>

              {/* .blog-feed-author: flex items-center pt-3 — no parent gap */}
              <div className="flex items-center pt-3">
                {/* .blog-feed-author-link: color neutral-0 */}
                <span className="text-foreground">
                  <span className={fpText.bodyS}>{post.author.name}</span>
                </span>
                {/* .text-seperator: 1×20px, mx-[7px] */}
                <span
                  aria-hidden
                  className="mx-[7px] block h-5 w-px shrink-0 bg-[#7a7b7f40]"
                />
                {/* .flex-gap-1: flex gap-1 items-center */}
                <span className="flex items-center gap-1 text-[var(--fp-alpha-100,#ffffffad)]">
                  {num && <span className={fpText.bodyS}>{num}</span>}
                  <span className={fpText.bodyS}>{label}</span>
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
