import { redirect } from 'next/navigation'

/** Redirect /portal/products → first product type */
export default function PortalProductsPage() {
  redirect('/portal/products/agency_account')
}
