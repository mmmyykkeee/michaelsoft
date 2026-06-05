import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ensure Turbopack uses this project folder as the root (silences warning)
  turbopack: {
    root: path.resolve(__dirname),
  },

  async redirects() {
    return [
      {
        source: "/case-studies/sme-procurement-approval-workflows",
        destination: "/case-studies/retail-procurement-approvals-nairobi",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
