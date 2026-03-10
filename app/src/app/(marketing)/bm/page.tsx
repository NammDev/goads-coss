import type { Metadata } from "next"
import { ProductPageTemplate } from '@/components/product-page-template'
import { avatars, bmCategories } from '@/data/bm-page-data'

export const metadata: Metadata = {
  title: "Buy Business Managers | Verified BMs with 7-Day Warranty",
  description: "Purchase verified Facebook Business Managers. Unlimited spend, pre-warmed, 7-day replacement warranty. Scale your ad campaigns safely.",
}

export default function BMPage() {
  return (
    <ProductPageTemplate
      heroProps={{ avatars }}
      catalogCategories={bmCategories}
      enterpriseCard={{}}
    />
  )
}
