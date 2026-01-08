'use client';

import { QRCodeSettings } from './QRCodeGenerator';
import { useSubscription } from '@/contexts/SubscriptionContext';

interface QRCodeOptionsProps {
  settings: QRCodeSettings;
  onSettingsChange: (settings: QRCodeSettings) => void;
}

export default function QRCodeOptions({ settings, onSettingsChange }: QRCodeOptionsProps) {
  const { isPro, isBusiness } = useSubscription();

  const handleChange = (key: keyof QRCodeSettings, value: any) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && (isPro || isBusiness)) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleChange('logoUrl', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-4 border-t pt-6 border-gray-200 dark:border-gray-800">
      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
        <span className="w-1 h-6 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full"></span>
        Customization Options
      </h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Size */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Size: {settings.size}px
          </label>
          <input
            type="range"
            min="128"
            max="512"
            step="32"
            value={settings.size}
            onChange={(e) => handleChange('size', parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
            <span>128px</span>
            <span>512px</span>
          </div>
        </div>

        {/* Error Correction Level */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Error Correction Level
          </label>
          <select
            value={settings.level}
            onChange={(e) => handleChange('level', e.target.value as 'L' | 'M' | 'Q' | 'H')}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          >
            <option value="L">Low (~7%)</option>
            <option value="M">Medium (~15%)</option>
            <option value="Q">Quartile (~25%)</option>
            <option value="H">High (~30%)</option>
          </select>
        </div>

        {/* Foreground Color */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            QR Code Color
          </label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={settings.fgColor}
              onChange={(e) => handleChange('fgColor', e.target.value)}
              className="w-12 h-10 rounded border border-gray-300 dark:border-gray-600 cursor-pointer"
            />
            <input
              type="text"
              value={settings.fgColor}
              onChange={(e) => handleChange('fgColor', e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white font-mono text-sm"
              placeholder="#000000"
            />
          </div>
        </div>

        {/* Background Color */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Background Color
          </label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={settings.bgColor}
              onChange={(e) => handleChange('bgColor', e.target.value)}
              className="w-12 h-10 rounded border border-gray-300 dark:border-gray-600 cursor-pointer"
            />
            <input
              type="text"
              value={settings.bgColor}
              onChange={(e) => handleChange('bgColor', e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white font-mono text-sm"
              placeholder="#FFFFFF"
            />
          </div>
        </div>

        {/* Margin Size */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Margin: {settings.marginSize}px
          </label>
          <input
            type="range"
            min="0"
            max="20"
            step="1"
            value={settings.marginSize}
            onChange={(e) => handleChange('marginSize', parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
            <span>0px</span>
            <span>20px</span>
          </div>
        </div>

        {/* Include Margin */}
        <div className="flex items-center">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.includeMargin}
              onChange={(e) => handleChange('includeMargin', e.target.checked)}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
            />
            <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Include Margin
            </span>
          </label>
        </div>

        {/* Logo Upload - Premium Feature */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Logo (Pro/Business)
            {!isPro && <span className="ml-2 text-xs text-gray-500">(Premium)</span>}
          </label>
          {isPro ? (
            <div className="space-y-2">
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-gray-700 dark:file:text-gray-300"
              />
              {settings.logoUrl && (
                <div className="flex items-center gap-2">
                  <img src={settings.logoUrl} alt="Logo preview" className="w-10 h-10 object-contain rounded" />
                  <button
                    type="button"
                    onClick={() => handleChange('logoUrl', undefined)}
                    className="text-xs text-red-600 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              )}
              {settings.logoUrl && (
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Logo Size: {settings.logoSize}px
                  </label>
                  <input
                    type="range"
                    min="30"
                    max="100"
                    step="5"
                    value={settings.logoSize || 50}
                    onChange={(e) => handleChange('logoSize', parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  />
                </div>
              )}
            </div>
          ) : (
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Upgrade to Pro to add your logo to QR codes
              </p>
            </div>
          )}
        </div>

        {/* Watermark Toggle - Free plan always shows */}
        <div className="flex items-center">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.showWatermark ?? true}
              onChange={(e) => handleChange('showWatermark', e.target.checked)}
              disabled={!isPro}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Show Watermark {!isPro && '(Free)'}
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}
