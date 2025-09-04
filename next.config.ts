import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      { hostname: "lh3.googleusercontent.com", protocol: "https" },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true, // ✅ disables linting errors during build
  },
};

export default nextConfig;
