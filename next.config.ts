import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb', // Increase the limit as needed
    },
  },
  /* other config options here */
};

export default nextConfig;