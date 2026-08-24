import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Giữ sharp ở dạng native package (không bundle) để chạy được trên serverless Vercel.
  serverExternalPackages: ["sharp"],
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
