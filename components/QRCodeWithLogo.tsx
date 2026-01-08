'use client';

import { QRCodeSVG } from 'qrcode.react';
import { QRCodeSettings } from './QRCodeGenerator';

interface QRCodeWithLogoProps {
  value: string;
  settings: QRCodeSettings;
}

export default function QRCodeWithLogo({ value, settings }: QRCodeWithLogoProps) {
  if (!value) return null;

  const logoSize = settings.logoSize || 50;
  const logoUrl = settings.logoUrl;

  return (
    <div className="relative inline-block" style={{ padding: settings.includeMargin ? settings.marginSize : 0 }}>
      <QRCodeSVG
        value={value}
        size={settings.size}
        bgColor={settings.bgColor}
        fgColor={settings.fgColor}
        level={settings.level}
        includeMargin={false}
      />
      {logoUrl && (
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-2 shadow-lg"
          style={{
            width: `${logoSize}px`,
            height: `${logoSize}px`,
          }}
        >
          <img
            src={logoUrl}
            alt="Logo"
            className="w-full h-full object-contain rounded"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>
      )}
      {settings.showWatermark && (
        <div className="absolute bottom-2 right-2 bg-white/90 dark:bg-gray-900/90 px-2 py-1 rounded text-xs text-gray-600 dark:text-gray-400">
          QRGenerator
        </div>
      )}
    </div>
  );
}
