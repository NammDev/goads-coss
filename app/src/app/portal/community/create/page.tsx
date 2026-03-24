import { redirect } from "next/navigation"

/** Portal create → redirect to public community create */
export default function PortalCreateRedirect() {
  redirect("/community/create")
}
