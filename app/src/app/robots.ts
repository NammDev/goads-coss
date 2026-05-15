import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin", "/portal", "/sign-in", "/sign-up", "/shopping-cart-02", "/foreplay"],
    },
    sitemap: "https://www.goads.shop/sitemap.xml",
  }
}
