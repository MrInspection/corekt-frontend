import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  experimental: {
    authInterrupts: true,
  },
  redirects: async () => [
    {
      source: "/legal",
      destination: "/legal/terms-and-conditions",
      permanent: true,
    },
  ],
};

export default nextConfig;
