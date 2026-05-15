import type { NextConfig } from "next";

/** CSP directives — permissive enough for Clerk, Vercel Analytics, and inline styles */
const cspDirectives = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://clerk.goads.shop https://clerk.goadsagency.com https://*.clerk.accounts.dev https://va.vercel-scripts.com https://challenges.cloudflare.com https://app.cal.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https: http: https://cdn.shadcnstudio.com https://randomuser.me https://cdn.simpleicons.org https://img.clerk.com https://notion-avatars.netlify.app https://*.clerk.accounts.dev",
  "font-src 'self' data:",
  "connect-src 'self' https://clerk.goads.shop https://clerk.goadsagency.com https://*.clerk.accounts.dev https://va.vercel-scripts.com https://vitals.vercel-insights.com https://app.cal.com",
  "frame-src 'self' blob: https://clerk.goads.shop https://clerk.goadsagency.com https://*.clerk.accounts.dev https://challenges.cloudflare.com https://app.cal.com",
  "worker-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join("; ");

const nextConfig: NextConfig = {
  reactCompiler: true,
  allowedDevOrigins: ["http://192.168.1.64:3000", "192.168.1.64", "http://192.168.1.18:3001", "192.168.1.18"],
  turbopack: {
    root: import.meta.dirname,
  },
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.shadcnstudio.com',
      },
      {
        protocol: 'https',
        hostname: 'randomuser.me',
      },
      {
        protocol: 'https',
        hostname: 'cdn.simpleicons.org',
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Content-Security-Policy", value: cspDirectives },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
