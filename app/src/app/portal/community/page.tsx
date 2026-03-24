import { redirect } from "next/navigation"

/** Portal community → redirect to public community */
export default function PortalCommunityRedirect() {
  redirect("/community")
}
