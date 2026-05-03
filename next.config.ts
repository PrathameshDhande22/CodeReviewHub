import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  poweredByHeader: false,
  reactCompiler: true,
  typedRoutes: true,
  // cacheComponents: true,
  compiler: {
    // removeConsole:true,
  },
};

export default nextConfig;
