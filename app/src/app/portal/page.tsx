import { redirect } from 'next/navigation'

/** Portal root → Orders is the default landing tab (Shop catalog removed in redesign). */
export default function PortalPage() {
  redirect('/portal/orders')
}
