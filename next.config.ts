import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return {
      // We only handle specific routes ourselves (like /quiz).
      // Everything else falls back to Framer.
      fallback: [
        {
          source: "/:path*",
          destination: "https://left-day-178673.framer.app/:path*",
        },
      ],
    };
  },
};

export default nextConfig;
