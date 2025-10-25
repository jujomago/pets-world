import "./globals.css";
import { geistSans, geistMono } from "@/fonts/fonts";
import { appMetadata, appViewport } from "./metadata";
// import { Topbar } from "@/components";
import { Suspense } from "react";
import { AuthProvider } from "./auth-provider";
import { HomeTopbar } from "@/components/layout/HomeTopBar/HomeTopbar";

export const metadata = appMetadata;
export const viewport = appViewport;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="min-h-screen">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-hero-image`}
      >
        <AuthProvider>
          <main className="container mx-auto max-w-md min-h-dvh flow-root">
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
