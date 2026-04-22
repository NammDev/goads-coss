import type { MetadataRoute } from "next"
import { blogPosts } from "@/data/blog-posts"
import { TOOLS } from "@/data/tools-registry"
import { getAllPostSlugs, getCategories } from "@/lib/db/queries/community-queries"

const BASE_URL = "https://www.goads.shop"

// Sitemap pulls dynamic community URLs from DB — generate at request time,
// not at build time, so a momentary DB outage doesn't break the build.
export const dynamic = "force-dynamic"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const marketingRoutes = [
    "",
    "/about",
    "/bm",
    "/profiles",
    "/pages",
    "/tiktok-accounts",
    "/unban",
    "/blue-verification",
    "/pricing",
    "/reviews",
    "/help",
    "/partners",
    "/payment",
    "/milestones",
    "/talk-to-sales",
    "/blog",
    "/agency-ad-account",
    "/google-agency",
    "/tiktok-agency",
    "/privacy-policy",
    "/terms-of-service",
    "/refund-policy",
    "/community",
  ]

  const toolRoutes = TOOLS.map((t) => `/tools/${t.slug}`)
  const blogRoutes = blogPosts.map((p) => `/blog/${p.slug}`)

  /* Community: dynamic post + category URLs from DB.
     Fallback to empty arrays if DB is unreachable — sitemap still serves
     static routes rather than 500ing. */
  const [communityPosts, categories] = await Promise.all([
    getAllPostSlugs().catch(() => []),
    getCategories().catch(() => []),
  ])

  const communityPostRoutes: MetadataRoute.Sitemap = communityPosts.map(
    (p) => ({
      url: `${BASE_URL}/community/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }),
  )

  const communityCategoryRoutes: MetadataRoute.Sitemap = categories
    .filter((c) => !c.isStaffOnly)
    .map((c) => ({
      url: `${BASE_URL}/community/c/${c.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }))

  const staticRoutes = [
    ...marketingRoutes,
    ...toolRoutes,
    ...blogRoutes,
  ]

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route.startsWith("/blog/") ? "weekly" : ("monthly" as const),
    priority: route === "" ? 1.0 : route.startsWith("/blog/") ? 0.7 : 0.8,
  }))

  return [
    ...staticEntries,
    ...communityPostRoutes,
    ...communityCategoryRoutes,
  ]
}
