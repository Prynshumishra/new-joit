import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dynamicmedia.accenture.com",
      },
    ],
  },
};

export default nextConfig;
