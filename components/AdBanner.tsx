'use client';

import AdUnit from './AdUnit';

interface AdBannerProps {
  slot: string;
  className?: string;
}

export default function AdBanner({ slot, className = '' }: AdBannerProps) {
  return (
    <div className={`w-full flex justify-center items-center my-8 ${className}`}>
      <div className="max-w-full overflow-hidden" style={{ minWidth: '320px', minHeight: '100px' }}>
        <AdUnit
          adSlot={slot}
          adFormat="auto"
          fullWidthResponsive={true}
          style={{ display: 'block', width: '100%', minHeight: '100px' }}
        />
      </div>
    </div>
  );
}
