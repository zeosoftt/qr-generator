'use client';

import { useEffect } from 'react';
import Script from 'next/script';

export default function AdSenseScript() {
  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID || '';

  useEffect(() => {
    if (typeof window !== 'undefined') {
      console.log('🔍 AdSense Script Component - ID:', adsenseId || 'NOT FOUND');
      console.log('🔍 Environment check:', {
        hasId: !!adsenseId,
        nodeEnv: process.env.NODE_ENV,
      });
    }
  }, [adsenseId]);

  useEffect(() => {
    if (typeof window !== 'undefined' && adsenseId) {
      // Check if script is already loaded
      const checkScript = setInterval(() => {
        if ((window as any).adsbygoogle) {
          console.log('✅ AdSense script is available:', (window as any).adsbygoogle);
          clearInterval(checkScript);
        }
      }, 500);

      // Stop checking after 5 seconds
      setTimeout(() => clearInterval(checkScript), 5000);

      return () => clearInterval(checkScript);
    }
  }, [adsenseId]);

  if (!adsenseId) {
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
      console.warn('⚠️ AdSense ID not found. Check NEXT_PUBLIC_ADSENSE_ID environment variable.');
    }
    return null;
  }

  const scriptUrl = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`;
  
  console.log('📡 Loading AdSense script:', scriptUrl);

  return (
    <Script
      async
      src={scriptUrl}
      strategy="afterInteractive"
      crossOrigin="anonymous"
      id="adsbygoogle-init-script"
      onLoad={() => {
        console.log('✅ AdSense script loaded successfully!');
        console.log('✅ adsbygoogle available:', typeof (window as any).adsbygoogle);
      }}
      onError={(e) => {
        console.error('❌ AdSense script failed to load:', e);
      }}
    />
  );
}
