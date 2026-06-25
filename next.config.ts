import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // @ts-expect-error nextConfig typing
  allowedDevOrigins: ['10.1.224.51', 'localhost'],
};

export default nextConfig;
