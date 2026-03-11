import GoogleAnalytics from '@/components/analytics/GoogleAnalytics';
import BottomNav from '@/components/layout/BottomNav';
import NotificationPoller from '@/components/notifications/NotificationPoller';
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import OfflineIndicator from '@/components/shared/OfflineIndicator';
import { Toaster } from 'sonner';
import Providers from "@/lib/providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gifting App",
  description: "A simple app to manage your gifting.",
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://gifting.app",
    title: "Gifting App",
    description: "A simple app to manage your gifting.",
    images: [
      {
        url: "https://gifting.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Gifting App",
      },
    ],
  },
};

export const viewport = {
  themeColor: "#000000",
};

import { ThemeProvider } from '@/components/shared/ThemeProvider';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {process.env.NEXT_PUBLIC_GA_ID && <GoogleAnalytics trackingId={process.env.NEXT_PUBLIC_GA_ID} />}
          <Providers>
            {children}
            <NotificationPoller />
            <BottomNav />
          </Providers>
          <Toaster />
          <OfflineIndicator />
        </ThemeProvider>
      </body>
    </html>
  );
}
