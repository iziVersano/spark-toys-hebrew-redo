import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "spark-toys.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.spark-toys.com",
        pathname: "/**",
      },
      // WooCommerce default upload path
      {
        protocol: "https",
        hostname: "secure.gravatar.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
