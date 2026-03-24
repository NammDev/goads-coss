import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

/** Routes that require authentication — redirect to /sign-in if no session */
const isProtectedRoute = createRouteMatcher([
  "/admin(.*)",
  "/portal(.*)",
]);

/** Routes restricted to admin/staff only */
const isAdminOnlyRoute = createRouteMatcher([
  "/keystatic(.*)",
]);

/** Public routes that should never be blocked (webhooks, auth pages, marketing, etc.) */
const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/webhooks(.*)",
  "/api/extension/auth",
  "/share(.*)",
]);

const ADMIN_ROLES = ["super_admin", "staff"];

export default clerkMiddleware(async (auth, req) => {
  if (isPublicRoute(req)) return;

  if (isAdminOnlyRoute(req)) {
    const session = await auth.protect();
    const role = (session.sessionClaims?.publicMetadata as { role?: string })?.role;
    if (!role || !ADMIN_ROLES.includes(role)) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return;
  }

  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip static files and Next.js internals, run on everything else
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run on API routes
    "/(api|trpc)(.*)",
  ],
};
