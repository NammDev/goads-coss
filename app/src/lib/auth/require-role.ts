import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

type Role = "super_admin" | "staff" | "customer";

/**
 * Server-side role guard — use in layout.tsx or page.tsx (server components only).
 * Redirects to /login if no session, /unauthorized if role not allowed.
 * Returns the session if authorized.
 */
export async function requireRole(...allowedRoles: Role[]) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const userRole = session.user.role as Role;

  if (!allowedRoles.includes(userRole)) {
    redirect("/unauthorized");
  }

  return session;
}
