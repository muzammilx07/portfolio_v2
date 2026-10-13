import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Providers from "@/providers";
import { siteConfig } from "@/config/site";
import ScrollProgress from "@/components/shared/ScrollProgress";

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
        className={`min-h-screen bg-background text-foreground antialiased font-sans ${geistSans.variable} ${geistMono.variable}`}
      >
        <ScrollProgress />
        <Providers>
          <div className="mx-auto flex min-h-screen max-w-[680px] flex-col px-4 sm:px-6">
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-background focus:px-3 focus:py-2 focus:text-sm focus:text-foreground focus:shadow-md focus:border focus:border-border"
            >
              Skip to content
            </a>
            <header>
              <Navbar />
            </header>
            <main id="main-content" className="flex-1 py-8 sm:py-12">
              {children}
            </main>
            <footer>
              <Footer />
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
