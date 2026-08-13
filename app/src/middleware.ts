import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { brand } from "@/config/brand";

/**
 * AdsToolkit ships tools-only. On that build (NEXT_PUBLIC_BRAND=adstoolkit) expose
 * only the tools + tempmail routes; everything else lands on /tools. This is a
 * no-op on the GOADS build, so GOADS routing is entirely unchanged.
 */
const isAdsToolkitPublic = createRouteMatcher([
  "/tools(.*)",
  "/api/(.*)",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/share(.*)",
]);

/** AdsToolkit landing → straight to the default tool (no grid homepage). */
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

export default clerkMiddleware(async (auth, req) => {
  // Tools-only brand gate (AdsToolkit). GOADS: brand.toolsOnly is false → skipped.
  if (brand.toolsOnly) {
    const path = new URL(req.url).pathname;
    // No homepage / grid: the landing and the old tools grid go straight to the
    // default tool. Everything that isn't a tool route also lands there.
    const isGridOrHome = path === "/" || path === "/tools" || path === "/tools/";
    if (isGridOrHome || !isAdsToolkitPublic(req)) {
      if (path !== ADSTOOLKIT_HOME) {
        return NextResponse.redirect(new URL(ADSTOOLKIT_HOME, req.url));
      }
    }
  }

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
