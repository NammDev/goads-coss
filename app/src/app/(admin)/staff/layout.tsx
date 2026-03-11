import { requireRole } from "@/lib/auth/require-role";

/** Staff management layout — super_admin only. */
export default async function StaffLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireRole("super_admin");
  return <>{children}</>;
}
