import { requireRole } from "@/lib/auth/require-role";

/** Admin layout — staff and super_admin only. Role check in server component. */
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireRole("staff", "super_admin");
  return <>{children}</>;
}
