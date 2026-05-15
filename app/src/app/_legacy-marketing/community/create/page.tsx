import Link from "next/link"
import { ArrowLeftIcon } from "lucide-react"
import { requireRole } from "@/lib/auth/require-role"
import { getCategories } from "@/lib/db/queries/community-queries"
import { CommunityCreateForm } from "@/components/community/community-create-form"

/** Create post — requires authentication */
export default async function CommunityCreatePage() {
  await requireRole("customer", "staff", "super_admin")
  const categories = await getCategories()

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="flex items-center gap-2">
        <Link
          href="/community"
          className="text-muted-foreground hover:text-foreground"
        >
          <ArrowLeftIcon className="size-4" />
        </Link>
        <h1 className="text-2xl font-semibold">New Post</h1>
      </div>

      <CommunityCreateForm categories={categories} />
    </div>
  )
}
