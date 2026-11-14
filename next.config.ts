import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // {
      //   protocol: "https",
      //   hostname: "static-01.daraz.com.bd",
      //   pathname: "/**",
      // },
      //  {
      //   protocol: "https",
      //   hostname: "placehold.co",
      //   pathname: "/**",
      // },
      //  {
      //   protocol: "https",
      //   hostname: "api.medeasy.health",
      //   pathname: "/**",
      // },
      { protocol: "https", hostname: "**" },
      { protocol: "http", hostname: "**" },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
 async rewrites() {
    return [
      {
        source: "/backend/:path*",
        destination: "https://medi-nest-server-ten.vercel.app/:path*",
      },
    ]
  },
};

export default nextConfig;
