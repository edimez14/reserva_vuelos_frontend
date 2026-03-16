import type { NextConfig } from "next";

/**
 * Next.js configuration for production deployment on Vercel.
 *
 * Environment variables required at build/runtime (set in Vercel dashboard):
 *   NEXT_PUBLIC_API_URL  — Backend URL, e.g. https://<app>.fly.dev/api/v1
 *
 * See .env.example for a full list of required variables.
 */
const nextConfig: NextConfig = {
  // Strict mode helps identify potential issues early.
  reactStrictMode: true,

  // Security headers applied to every response.
  // These complement the headers defined in vercel.json.
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
