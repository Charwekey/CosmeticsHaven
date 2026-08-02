import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable image optimization to reduce memory usage during dev
  images: {
    unoptimized: true,
  },

  // Reduce logging noise in terminal
  logging: {
    fetches: {
      fullUrl: false,
    },
  },

  // Disable source maps in development for faster builds & lower memory
  productionBrowserSourceMaps: false,
};

export default nextConfig;
