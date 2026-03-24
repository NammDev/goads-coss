import { redirect } from "next/navigation"

interface PageProps {
  params: Promise<{ slug: string }>
}

/** Portal post detail → redirect to public community */
export default async function PortalPostRedirect({ params }: PageProps) {
  const { slug } = await params
  redirect(`/community/${slug}`)
}
