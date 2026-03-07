import Link from "next/link"
import { ChevronRight, Clock, House } from "lucide-react"

import { Avatar, AvatarImage } from "@/components/ui/avatar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { MotionPreset } from "@/components/ui/motion-preset"
import HeroGridBg from "@/components/shadcn-studio/blocks/hero-clone/hero-grid-bg"
import type { BlogPost } from "@/data/blog-posts"

export function BlogDetailHeader({ post }: { post: BlogPost }) {
  return (
    <section className="relative z-[1] overflow-hidden py-12 md:py-14">
      <HeroGridBg />

      <div className="relative z-10 container space-y-6">
        {/* Breadcrumb */}
        <MotionPreset
          fade
          slide={{ direction: "down" }}
          transition={{ duration: 0.5 }}
        >
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">
                    <House className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/blog">Blog</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage>{post.category}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </MotionPreset>

        {/* Title */}
        <MotionPreset
          fade
          slide={{ direction: "down" }}
          transition={{ duration: 0.5 }}
          delay={0.1}
        >
          <h1 className="max-w-3xl text-3xl font-semibold md:text-5xl">
            {post.title}
          </h1>
        </MotionPreset>

        {/* Author + meta */}
        <MotionPreset
          fade
          slide={{ direction: "down" }}
          transition={{ duration: 0.5 }}
          delay={0.2}
        >
          <div className="flex items-center gap-3 text-sm">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp"
                alt={post.author}
              />
            </Avatar>
            <span>
              <span className="font-medium">{post.author}</span>
              <span className="ml-1 text-muted-foreground">
                on {post.date}
              </span>
            </span>
            <span className="flex items-center gap-1 text-muted-foreground">
              <Clock className="h-4 w-4" aria-hidden="true" />
              {post.readTime}
            </span>
          </div>
        </MotionPreset>
      </div>
    </section>
  )
}
