'use client';

import { useEffect, useRef } from 'react';

interface AdUnitProps {
  adSlot: string;
  adFormat?: 'auto' | 'rectangle' | 'vertical' | 'horizontal';
  fullWidthResponsive?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

export default function AdUnit({
  adSlot,
  adFormat = 'auto',
  fullWidthResponsive = true,
  style,
  className = '',
}: AdUnitProps) {
  const adRef = useRef<HTMLModElement>(null);
  const hasPushed = useRef(false);

  useEffect(() => {
    if (hasPushed.current) return;

    const pushAd = () => {
      try {
        const adElement = adRef.current;
        if (!adElement) {
          console.warn('AdSense: Ad element not found');
          return;
        }

        // Check if element is visible and has width
        const rect = adElement.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) {
          // Element not yet visible, retry after a short delay
          setTimeout(pushAd, 100);
          return;
        }

        // Check if adsbygoogle is available
        if (typeof window !== 'undefined') {
          if (!(window as any).adsbygoogle) {
            console.warn('AdSense: adsbygoogle not available yet, retrying...');
            setTimeout(pushAd, 500);
            return;
          }

          if (!hasPushed.current) {
            console.log('📢 Pushing AdSense ad:', { slot: adSlot, element: adElement });
            (window as any).adsbygoogle.push({});
            hasPushed.current = true;
            console.log('✅ AdSense ad pushed successfully');
          }
        }
      } catch (err) {
        console.error('❌ AdSense push error:', err);
      }
    };

    // Wait for DOM to be ready and element to be rendered
    if (typeof window !== 'undefined') {
      // Initial check after a short delay
      const timer1 = setTimeout(() => {
        pushAd();
      }, 200);

      // Also try when window is fully loaded
      const timer2 = setTimeout(() => {
        pushAd();
      }, 1000);

      // Use Intersection Observer as fallback
      if (adRef.current && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting && entry.intersectionRatio > 0) {
                pushAd();
                observer.disconnect();
              }
            });
          },
          { threshold: 0.1 }
        );

        observer.observe(adRef.current);

        return () => {
          clearTimeout(timer1);
          clearTimeout(timer2);
          observer.disconnect();
        };
      }

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, []);

  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID || '';

  // Check if slot is placeholder (don't render placeholder slots)
  const isPlaceholder = !adSlot || adSlot === '1234567890' || adSlot === '1234567891' || adSlot === '1234567892' || adSlot === '1234567893' || adSlot === '1234567894';

  if (!adsenseId || !adSlot || isPlaceholder) {
    return null;
  }

  return (
    <ins
      ref={adRef}
      className={`adsbygoogle ${className}`}
      style={{
        display: 'block',
        minHeight: '100px',
        minWidth: '100%',
        ...style,
      }}
      data-ad-client={adsenseId}
      data-ad-slot={adSlot}
      data-ad-format={adFormat}
      data-full-width-responsive={fullWidthResponsive ? 'true' : 'false'}
    />
  );
}
