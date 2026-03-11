import { requireRole } from "@/lib/auth/require-role";

/** Settings layout — super_admin only. */
export default async function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireRole("super_admin");
  return <>{children}</>;
}
