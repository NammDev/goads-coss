import type { MetadataRoute } from "next"
import { blogPosts } from "@/data/blog-posts"
import { TOOLS } from "@/data/tools-registry"

const BASE_URL = "https://www.goads.shop"

export default function sitemap(): MetadataRoute.Sitemap {
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
  ]

  const toolRoutes = TOOLS.map((t) => `/tools/${t.slug}`)
  const blogRoutes = blogPosts.map((p) => `/blog/${p.slug}`)
  const allRoutes = [...marketingRoutes, ...toolRoutes, ...blogRoutes]

  return allRoutes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route.startsWith("/blog/") ? "weekly" : "monthly",
    priority: route === "" ? 1.0 : route.startsWith("/blog/") ? 0.7 : 0.8,
  }))
}
