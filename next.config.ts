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

};

export default nextConfig;
