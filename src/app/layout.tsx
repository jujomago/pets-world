import "./globals.css";
import { geistSans, geistMono } from "@/fonts/fonts";
import { appMetadata, appViewport } from "./metadata";
import { Topbar } from "@/components";

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
        <main className="container mx-auto  max-w-md min-h-dvh">
          <Topbar />
          {children}
        </main>
      </body>
    </html>
  );
}
