import type { Metadata } from "next";
import "./globals.css";
import { SubscriptionProvider } from "@/contexts/SubscriptionContext";
import AdSenseScript from "@/components/AdSenseScript";
import AdSenseDebug from "@/components/AdSenseDebug";

export const metadata: Metadata = {
  title: "QR Code Generator - Modern & Free",
  description: "Generate custom QR codes for URLs, text, WiFi, email and more. Download as PNG or SVG.",
  verification: {
    google: 'pub-5570650174796895',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Get AdSense ID - this will be available at build time
  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID || '';

  return (
    <html lang="tr">
      <body className="antialiased">
        <AdSenseScript />
        <AdSenseDebug />
        <SubscriptionProvider>
          {children}
        </SubscriptionProvider>
      </body>
    </html>
  );
}
