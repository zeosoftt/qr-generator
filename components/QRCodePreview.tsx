'use client';

import { useState } from 'react';
import QRCodeWithLogo from './QRCodeWithLogo';
import { QRCodeSettings, QRType } from './QRCodeGenerator';
import { useSubscription } from '@/contexts/SubscriptionContext';

interface QRCodePreviewProps {
  value: string;
  settings: QRCodeSettings;
  type: QRType;
}

export default function QRCodePreview({ value, settings, type }: QRCodePreviewProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const { canCreateQR, incrementQrCount, maxQrPerDay } = useSubscription();

  const downloadViaAPI = async (format: 'png' | 'svg') => {
    if (!value) {
      alert('Please enter content to generate QR code');
      return;
    }

    if (!canCreateQR()) {
      alert(`You've reached your daily limit of ${maxQrPerDay} QR codes. Please upgrade to Pro for unlimited QR codes.`);
      return;
    }

    setIsDownloading(true);
    incrementQrCount();
    try {
      const response = await fetch('/api/qrcode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: value,
          ...settings,
          format,
        }),
      });

      if (!response.ok) throw new Error('Failed to generate QR code');

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `qr-code-${Date.now()}.${format}`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading QR code:', error);
      alert('Failed to download QR code. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="w-full space-y-4">
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-8 rounded-3xl shadow-xl border-2 border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-center min-h-[350px] bg-white dark:bg-black rounded-2xl p-6 shadow-inner">
          {value ? (
            <div 
              id="qr-code-preview" 
              className="relative inline-block p-6 bg-white dark:bg-white rounded-xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
              style={{ 
                padding: settings.includeMargin ? settings.marginSize + 8 : 8,
                backgroundColor: settings.bgColor 
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              <QRCodeWithLogo value={value} settings={settings} />
            </div>
          ) : (
            <div className="text-center text-gray-400 dark:text-gray-600">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 dark:bg-gray-900 rounded-2xl flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-700">
                <div className="grid grid-cols-3 gap-1">
                  {[...Array(9)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-sm ${
                        i === 4 || (i >= 0 && i <= 2) || (i >= 6 && i <= 8)
                          ? 'bg-gray-300 dark:bg-gray-700'
                          : 'bg-transparent'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-lg font-medium">Enter content to generate QR code</p>
              <p className="text-sm mt-2 text-gray-500 dark:text-gray-600">Your QR code will appear here</p>
            </div>
          )}
        </div>
      </div>

      {value && (
        <div className="space-y-2">
          <button
            onClick={() => downloadViaAPI('png')}
            disabled={isDownloading}
            className="w-full px-6 py-4 bg-gradient-to-r from-black via-gray-800 to-black dark:from-white dark:via-gray-200 dark:to-white text-white dark:text-black font-bold rounded-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg flex items-center justify-center gap-2"
          >
            {isDownloading ? (
              <>
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Downloading...</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>Download PNG</span>
              </>
            )}
          </button>
          <button
            onClick={() => downloadViaAPI('svg')}
            disabled={isDownloading}
            className="w-full px-6 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-bold rounded-xl border-2 border-gray-300 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isDownloading ? (
              <>
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Downloading...</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>Download SVG</span>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
