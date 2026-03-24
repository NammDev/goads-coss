import { redirect } from "next/navigation"

interface PageProps {
  params: Promise<{ username: string }>
}

/** Portal user profile → redirect to public community */
export default async function PortalUserRedirect({ params }: PageProps) {
  const { username } = await params
  redirect(`/community/user/${username}`)
}
