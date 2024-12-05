import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "4mb",
    },
  },
  reactStrictMode: true,
};

export default nextConfig;
