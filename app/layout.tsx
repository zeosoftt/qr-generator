import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { SubscriptionProvider } from "@/contexts/SubscriptionContext";
import AdSenseDebug from "@/components/AdSenseDebug";

export const metadata: Metadata = {
  title: "QR Code Generator - Modern & Free",
  description: "Generate custom QR codes for URLs, text, WiFi, email and more. Download as PNG or SVG.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID;

  return (
    <html lang="tr">
      <body className="antialiased">
        {adsenseId && (
          <>
            <Script
              async
              src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`}
              strategy="afterInteractive"
              crossOrigin="anonymous"
            />
            <AdSenseDebug />
          </>
        )}
        <SubscriptionProvider>
          {children}
        </SubscriptionProvider>
      </body>
    </html>
  );
}
