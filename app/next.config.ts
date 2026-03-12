import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  allowedDevOrigins: ["http://192.168.1.64:3000", "192.168.1.64"],
  turbopack: {
    root: ".",
  },
  images: {
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
};

export default nextConfig;
