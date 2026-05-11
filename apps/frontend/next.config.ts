import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '194.14.207.94',
        port: '9000',
        pathname: '/static/**',
      },
    ],
    unoptimized: true,
  },
};

export default nextConfig;
