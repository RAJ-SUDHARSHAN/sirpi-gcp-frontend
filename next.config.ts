import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ["*"],
  output: "standalone", // Enable standalone build for Docker
};

export default nextConfig;
