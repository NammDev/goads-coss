import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

/** Routes that require authentication — redirect to /sign-in if no session */
const isProtectedRoute = createRouteMatcher([
  "/admin(.*)",
  "/portal(.*)",
]);

/** Public routes that should never be blocked (webhooks, auth pages, marketing, etc.) */
const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/webhooks(.*)",
  "/share(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  if (isPublicRoute(req)) return;

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
