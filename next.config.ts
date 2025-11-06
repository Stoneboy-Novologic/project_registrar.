import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Output standalone for Docker
  output: 'standalone',
  // Ignore TypeScript errors during build
  typescript: {
    ignoreBuildErrors: true,
  },
  // Ignore ESLint errors during build
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Enable experimental features for better compatibility
  experimental: {
    optimizePackageImports: ['@/lib', '@/app/components'],
  },
  // Configure webpack to be more lenient
  webpack: (config, { isServer }) => {
    // Ignore certain warnings
    config.ignoreWarnings = [
      /Failed to parse source map/,
      /Module not found/,
    ];
    
    // Handle JSON imports
    config.module.rules.push({
      test: /\.json$/,
      type: 'json',
    });
    
    return config;
  },
};

export default nextConfig;
