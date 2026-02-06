

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Providers from "@/providers";
import { siteConfig } from "@/config/site";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`min-h-screen bg-background text-foreground antialiased ${geistSans.variable} ${geistMono.variable}`}
      >
        <Providers>
          <div className="mx-auto flex min-h-screen max-w-3xl flex-col">
            <header>
              <Navbar />
            </header>
            <main className="flex-1">{children}</main>
            <footer>
              <Footer />
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
