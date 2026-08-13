import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse, type NextRequest } from "next/server";

import { brand } from "@/config/brand";

/**
 * AdsToolkit / ToolFB is a tools-only site: expose only the tool routes; the
 * landing and old grid go straight to the default tool.
 */
const isAdsToolkitPublic = createRouteMatcher([
  "/tools(.*)",
  "/api/(.*)",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/share(.*)",
]);

/** Tools-only landing → straight to the default tool (no grid homepage). */
const ADSTOOLKIT_HOME = "/tools/bookmark";

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

/**
 * ToolFB (tools-only) has NO auth surface, so it runs a plain middleware that
 * only scopes routes to the tools — it never touches Clerk. This is why the
 * ToolFB deploy needs no Clerk / database / payment env, only the brand vars.
 */
function toolfbMiddleware(req: NextRequest) {
  const path = new URL(req.url).pathname;
  const isGridOrHome = path === "/" || path === "/tools" || path === "/tools/";
  if ((isGridOrHome || !isAdsToolkitPublic(req)) && path !== ADSTOOLKIT_HOME) {
    return NextResponse.redirect(new URL(ADSTOOLKIT_HOME, req.url));
  }
  return NextResponse.next();
}

// GOADS build → full Clerk middleware (auth for portal/admin/keystatic).
// ToolFB build → plain tools-only middleware (clerkMiddleware is never invoked,
// so no Clerk env is required at runtime).
export default brand.toolsOnly
  ? toolfbMiddleware
  : clerkMiddleware(async (auth, req) => {
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
