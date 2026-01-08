'use client';

import Script from 'next/script';

interface AdSenseProps {
  publisherId?: string;
}

export default function AdSense({ publisherId }: AdSenseProps) {
  const adsenseId = publisherId || process.env.NEXT_PUBLIC_ADSENSE_ID || '';

  if (!adsenseId) {
    return null;
  }

  return (
    <>
      <Script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`}
        strategy="afterInteractive"
        crossOrigin="anonymous"
      />
    </>
  );
}
