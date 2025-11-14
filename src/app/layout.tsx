import "./globals.css";

import { appMetadata, appViewport } from "./metadata";
// import { Topbar } from "@/components";

import { AuthProvider } from "./auth-provider";

import { Toaster } from "react-hot-toast";
import { OneSignalInit } from "@/components/OneSignalInit";
import { poppins } from "@/fonts/fonts";

export const metadata = appMetadata;
export const viewport = appViewport;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="min-h-screen" data-scroll-behaviour="smooth">
      <body className={`${poppins.variable} antialiased bg-hero-image`}>
        <OneSignalInit />
        <Toaster />
        <AuthProvider>
          <main className="container mx-auto max-w-md print:max-w-none min-h-dvh flow-root">
            {/* <Suspense fallback={null}>
              <HomeTopbar />
            </Suspense> */}
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
