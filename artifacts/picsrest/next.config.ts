import type { NextConfig } from "next";

// Disable Next.js telemetry in CI/Replit environments
process.env.NEXT_TELEMETRY_DISABLED = "1";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  distDir: "out",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
