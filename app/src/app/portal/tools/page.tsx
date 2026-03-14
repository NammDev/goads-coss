import { redirect } from 'next/navigation'

/** Redirect /portal/tools → first popular tool */
export default function PortalToolsPage() {
  redirect('/portal/tools/2fa')
}
