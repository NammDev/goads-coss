import { auth } from "@/lib/auth/auth";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

// Routes that bypass auth check entirely
const publicPatterns = [
  /^\/$/, // home
  /^\/tools/,
  /^\/docs/,
  /^\/blog/,
  /^\/api\/auth/, // Better Auth endpoints
  /^\/login/,
  /^\/unauthorized/,
];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Public routes — pass through immediately (no auth overhead)
  if (publicPatterns.some((p) => p.test(pathname))) {
    return NextResponse.next();
  }

  // 2. Check session existence (Node.js runtime — full auth available)
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // 3. No session → redirect to login with callbackUrl
  if (!session) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 4. Session exists → pass through (role validation in server components)
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Exclude static assets, _next internals, and public files
    "/((?!_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.svg$|.*\\.ico$|.*\\.jpg$|.*\\.jpeg$|.*\\.webp$).*)",
  ],
};
