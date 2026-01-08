'use client';

import AdUnit from './AdUnit';

interface AdRectangleProps {
  slot: string;
  className?: string;
}

export default function AdRectangle({ slot, className = '' }: AdRectangleProps) {
  return (
    <div className={`flex justify-center items-center my-4 ${className}`}>
      <div className="max-w-full overflow-hidden" style={{ minWidth: '300px', minHeight: '250px', width: '300px', height: '250px' }}>
        <AdUnit
          adSlot={slot}
          adFormat="rectangle"
          fullWidthResponsive={true}
          style={{ display: 'block', width: '300px', minHeight: '250px' }}
        />
      </div>
    </div>
  );
}
