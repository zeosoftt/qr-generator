'use client';

import { useEffect, useState } from 'react';

export default function AdSenseDebug() {
  const [isDev, setIsDev] = useState(false);
  const [adsenseId, setAdsenseId] = useState('');

  useEffect(() => {
    setIsDev(process.env.NODE_ENV === 'development');
    setAdsenseId(process.env.NEXT_PUBLIC_ADSENSE_ID || '');
  }, []);

  if (!isDev || !adsenseId) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-400 dark:border-yellow-700 rounded-lg p-3 text-xs max-w-xs z-50 shadow-lg">
      <div className="font-bold text-yellow-800 dark:text-yellow-300 mb-1">
        🔍 AdSense Debug Mode
      </div>
        <div className="text-yellow-700 dark:text-yellow-400 space-y-1">
          <div>Publisher ID: {adsenseId}</div>
          <div className="text-yellow-600 dark:text-yellow-500 text-[10px] mt-2">
            ⚠️ Reklamlar production&apos;da görünecek. Development&apos;da görünmeyebilir.
          </div>
        </div>
    </div>
  );
}
