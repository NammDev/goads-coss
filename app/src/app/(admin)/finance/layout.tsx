import { requireRole } from "@/lib/auth/require-role";

/** Finance layout — super_admin only. */
export default async function FinanceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireRole("super_admin");
  return <>{children}</>;
}
