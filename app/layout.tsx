import type { Metadata } from "next";
import "./globals.css";
import { SubscriptionProvider } from "@/contexts/SubscriptionContext";

export const metadata: Metadata = {
  title: "QR Code Generator - Modern & Free",
  description: "Generate custom QR codes for URLs, text, WiFi, email and more. Download as PNG or SVG.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className="antialiased">
        <SubscriptionProvider>
          {children}
        </SubscriptionProvider>
      </body>
    </html>
  );
}
