declare module 'next-pwa' {
  import type { NextConfig } from 'next';

  export interface PWAOptions {
    dest?: string;
    disable?: boolean;
    register?: boolean;
    skipWaiting?: boolean;
    buildExcludes?: (string | RegExp)[];
    runtimeCaching?: any;
    reloadOnOnline?: boolean;
    sw?: string;
  }

  // next-pwa exports a default function that wraps NextConfig
  export default function withPWA(options?: PWAOptions): (nextConfig?: NextConfig) => NextConfig;
}
