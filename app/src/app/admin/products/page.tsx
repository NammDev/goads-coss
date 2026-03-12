import { redirect } from 'next/navigation'

/** Redirect /admin/products → first product type */
export default function ProductsPage() {
  redirect('/admin/products/agency_account')
}
