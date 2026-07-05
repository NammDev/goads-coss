// Shared Clerk provider — mounted ONLY on route groups that use client-side
// Clerk (portal, admin, (auth)). It is deliberately NOT in the root layout:
// keeping Clerk's client bundle off marketing routes (/bm, /about, tools, …)
// speeds up hydration and LCP there. Server-side `auth()` in marketing pages
// (e.g. /share/[token]) works via clerkMiddleware and needs no provider.
import { ClerkProvider } from "@clerk/nextjs";
import { shadcn } from "@clerk/ui/themes";

const clerkProxyUrl = process.env.NEXT_PUBLIC_CLERK_PROXY_URL;

export function AppClerkProvider({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      appearance={{ theme: shadcn }}
      proxyUrl={clerkProxyUrl}
      signInForceRedirectUrl="/portal"
      signUpForceRedirectUrl="/portal"
    >
      {children}
    </ClerkProvider>
  );
}
