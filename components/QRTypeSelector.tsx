'use client';

import { QRType } from './QRCodeGenerator';

interface QRTypeSelectorProps {
  selectedType: QRType;
  onTypeChange: (type: QRType) => void;
}

const qrTypes: { value: QRType; label: string; icon: string }[] = [
  { value: 'url', label: 'URL', icon: '🔗' },
  { value: 'text', label: 'Text', icon: '📝' },
  { value: 'wifi', label: 'WiFi', icon: '📶' },
  { value: 'email', label: 'Email', icon: '✉️' },
  { value: 'phone', label: 'Phone', icon: '📞' },
  { value: 'sms', label: 'SMS', icon: '💬' },
  { value: 'vcard', label: 'vCard', icon: '👤' },
  { value: 'location', label: 'Location', icon: '📍' },
];

export default function QRTypeSelector({ selectedType, onTypeChange }: QRTypeSelectorProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
        QR Code Type
      </label>
      <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
        {qrTypes.map((type) => (
          <button
            key={type.value}
            type="button"
            onClick={() => onTypeChange(type.value)}
            className={`
              flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all cursor-pointer
              ${selectedType === type.value
                ? 'border-black dark:border-white bg-black dark:bg-white text-white dark:text-black shadow-lg scale-105 font-bold'
                : 'border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-600 hover:shadow-md'
              }
            `}
          >
            <span className="text-2xl mb-1">{type.icon}</span>
            <span className="text-xs font-medium">{type.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
