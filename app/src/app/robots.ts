import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/shopping-cart-02"],
    },
    sitemap: "https://www.goads.shop/sitemap.xml",
  }
}
