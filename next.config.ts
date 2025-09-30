import type { NextConfig } from "next";
import withPWA from 'next-pwa'; 

// Configure next-pwa to generate sw.js into public/ on production builds.
// It will be disabled in development to avoid caching issues during dev.
const withPWAWrapped = withPWA({
  dest: "public",
  // We register the SW ourselves in a client component; avoid double registration
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

const nextConfig: NextConfig = {
  /* keep your existing config here */
};

export default withPWAWrapped(nextConfig);
