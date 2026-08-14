import { NextResponse, type NextRequest } from "next/server";
import { brand } from "@/config/brand";

/**
 * AdsToolkit / ToolFB is a tools-only site: expose only the tool routes; the
 * landing and old grid go straight to the default tool.
 */
const toolsRoutes = [
  "/tools(.*)",
  "/api/(.*)",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/share(.*)",
];

/** Tools-only landing → straight to the default tool (no grid homepage). */
const ADSTOOLKIT_HOME = brand.homeHref;

/**
 * ToolFB (tools-only) has NO auth surface, so it runs a plain middleware that
 * only scopes routes to the tools — it never touches Clerk. This is why the
 * ToolFB deploy needs no Clerk / database / payment env, only the brand vars.
 */
function toolfbMiddleware(req: NextRequest) {
  const path = new URL(req.url).pathname;
  const isAllowed = toolsRoutes.some((pattern) =>
    new RegExp(`^${pattern}$`).test(path),
  );
  const isGridOrHome = path === "/" || path === "/tools" || path === "/tools/";
  if ((isGridOrHome || !isAllowed) && path !== ADSTOOLKIT_HOME) {
    return NextResponse.redirect(new URL(ADSTOOLKIT_HOME, req.url));
  }
  return NextResponse.next();
}

/**
 * GOADS build → full Clerk middleware (auth for portal/admin/keystatic).
 * Clerk is imported lazily so ToolFB builds never touch the Clerk package
 * and don't need any Clerk env vars at runtime.
 */
async function goadsMiddleware(req: NextRequest) {
  const { clerkMiddleware, createRouteMatcher } = await import(
    "@clerk/nextjs/server"
  );

  const isPublicRoute = createRouteMatcher([
    "/sign-in(.*)",
    "/sign-up(.*)",
    "/api/webhooks(.*)",
    "/api/extension/auth",
    "/share(.*)",
  ]);

  const isProtectedRoute = createRouteMatcher([
    "/admin(.*)",
    "/portal(.*)",
  ]);

  const isAdminOnlyRoute = createRouteMatcher(["/keystatic(.*)"]);

  const ADMIN_ROLES = ["super_admin", "staff"];

  const handler = clerkMiddleware(async (auth, request) => {
    if (isPublicRoute(request)) return;

    if (isAdminOnlyRoute(request)) {
      const session = await auth.protect();
      const role = (session.sessionClaims?.publicMetadata as { role?: string })
        ?.role;
      if (!role || !ADMIN_ROLES.includes(role)) {
        return NextResponse.redirect(new URL("/", request.url));
      }
      return;
    }

    if (isProtectedRoute(request)) {
      await auth.protect();
    }
  });

  return handler(req, {} as never);
}

export default brand.toolsOnly ? toolfbMiddleware : goadsMiddleware;

export const config = {
  matcher: [
    // Skip static files and Next.js internals, run on everything else
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run on API routes
    "/(api|trpc)(.*)",
  ],
};
