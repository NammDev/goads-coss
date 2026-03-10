import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
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
    ],
  },
};

export default nextConfig;
