import { requireRole } from "@/lib/auth/require-role";

/** Portal layout — any authenticated user (customer, staff, super_admin). */
export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireRole("customer", "staff", "super_admin");
  return <>{children}</>;
}
