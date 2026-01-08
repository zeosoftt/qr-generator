'use client';

import { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import Link from 'next/link';
import QRCodeOptions from './QRCodeOptions';
import QRCodePreview from './QRCodePreview';
import QRTypeSelector from './QRTypeSelector';
import { useSubscription } from '@/contexts/SubscriptionContext';

export type QRType = 'text' | 'url' | 'email' | 'phone' | 'sms' | 'wifi' | 'vcard' | 'location';

export interface QRCodeData {
  type: QRType;
  text?: string;
  url?: string;
  email?: string;
  emailSubject?: string;
  phone?: string;
  sms?: string;
  smsMessage?: string;
  wifiSSID?: string;
  wifiPassword?: string;
  wifiSecurity?: 'WPA' | 'WEP' | 'nopass';
  // vCard fields
  vcardFirstName?: string;
  vcardLastName?: string;
  vcardOrganization?: string;
  vcardTitle?: string;
  vcardPhone?: string;
  vcardEmail?: string;
  vcardWebsite?: string;
  vcardAddress?: string;
  vcardCity?: string;
  vcardState?: string;
  vcardZip?: string;
  vcardCountry?: string;
  // Location fields
  locationLatitude?: string;
  locationLongitude?: string;
}

export interface QRCodeSettings {
  size: number;
  fgColor: string;
  bgColor: string;
  level: 'L' | 'M' | 'Q' | 'H';
  marginSize: number;
  includeMargin: boolean;
  // Premium features
  logoUrl?: string;
  logoSize?: number;
  showWatermark?: boolean;
  isDynamic?: boolean;
  expiresAt?: string;
  passwordProtected?: boolean;
  password?: string;
}

export default function QRCodeGenerator() {
  const { plan, canCreateQR, incrementQrCount, qrCountToday, maxQrPerDay, isPro } = useSubscription();
  
  const [qrType, setQrType] = useState<QRType>('text');
  const [qrData, setQrData] = useState<QRCodeData>({
    type: 'text',
    text: '',
  });
  const [settings, setSettings] = useState<QRCodeSettings>({
    size: 256,
    fgColor: '#000000',
    bgColor: '#FFFFFF',
    level: 'M',
    marginSize: 4,
    includeMargin: true,
    logoSize: 50,
    showWatermark: !isPro, // Free plan default shows watermark
    isDynamic: false,
    passwordProtected: false,
  });
  const [qrValue, setQrValue] = useState<string>('');

  // Generate QR code value based on type and data
  useEffect(() => {
    let value = '';
    
    switch (qrType) {
      case 'text':
        value = qrData.text || '';
        break;
      case 'url':
        value = qrData.url || '';
        break;
      case 'email':
        value = qrData.email 
          ? `mailto:${qrData.email}${qrData.emailSubject ? `?subject=${encodeURIComponent(qrData.emailSubject)}` : ''}`
          : '';
        break;
      case 'phone':
        value = qrData.phone ? `tel:${qrData.phone}` : '';
        break;
      case 'sms':
        value = qrData.sms 
          ? `sms:${qrData.sms}${qrData.smsMessage ? `?body=${encodeURIComponent(qrData.smsMessage)}` : ''}`
          : '';
        break;
      case 'wifi':
        if (qrData.wifiSSID) {
          const security = qrData.wifiSecurity || 'nopass';
          const password = qrData.wifiPassword || '';
          value = `WIFI:T:${security};S:${qrData.wifiSSID};P:${password};H:false;;`;
        }
        break;
      case 'vcard':
        const vcardLines = ['BEGIN:VCARD', 'VERSION:3.0'];
        if (qrData.vcardFirstName || qrData.vcardLastName) {
          vcardLines.push(`FN:${qrData.vcardFirstName || ''} ${qrData.vcardLastName || ''}`.trim());
          vcardLines.push(`N:${qrData.vcardLastName || ''};${qrData.vcardFirstName || ''};;;`);
        }
        if (qrData.vcardOrganization) vcardLines.push(`ORG:${qrData.vcardOrganization}`);
        if (qrData.vcardTitle) vcardLines.push(`TITLE:${qrData.vcardTitle}`);
        if (qrData.vcardPhone) vcardLines.push(`TEL:${qrData.vcardPhone}`);
        if (qrData.vcardEmail) vcardLines.push(`EMAIL:${qrData.vcardEmail}`);
        if (qrData.vcardWebsite) vcardLines.push(`URL:${qrData.vcardWebsite}`);
        if (qrData.vcardAddress || qrData.vcardCity || qrData.vcardState || qrData.vcardZip || qrData.vcardCountry) {
          const address = [
            qrData.vcardAddress || '',
            qrData.vcardCity || '',
            qrData.vcardState || '',
            qrData.vcardZip || '',
            qrData.vcardCountry || ''
          ].filter(Boolean).join(';');
          vcardLines.push(`ADR:;;${address};;;;`);
        }
        vcardLines.push('END:VCARD');
        value = vcardLines.join('\n');
        break;
      case 'location':
        if (qrData.locationLatitude && qrData.locationLongitude) {
          value = `geo:${qrData.locationLatitude},${qrData.locationLongitude}`;
        }
        break;
    }
    
    setQrValue(value);
  }, [qrType, qrData]);

  const handleTypeChange = (type: QRType) => {
    setQrType(type);
    setQrData({ type });
  };

  const handleDataChange = (data: Partial<QRCodeData>) => {
    setQrData({ ...qrData, ...data });
  };

  const handleDownload = () => {
    if (!canCreateQR()) {
      alert(`You've reached your daily limit of ${maxQrPerDay} QR codes. Please upgrade to Pro for unlimited QR codes.`);
      return;
    }
    incrementQrCount();
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Plan Info Banner */}
      {plan === 'free' && (
        <div className="mb-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl">📊</span>
            </div>
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">
                Free Plan: {qrCountToday}/{maxQrPerDay} QR codes used today
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Upgrade to Pro for unlimited QR codes, no watermark, and more features
              </p>
            </div>
          </div>
          <Link
            href="/pricing"
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
          >
            Upgrade Now
          </Link>
        </div>
      )}

      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 p-6 md:p-10 backdrop-blur-sm">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Input */}
          <div className="space-y-6">
            <QRTypeSelector 
              selectedType={qrType} 
              onTypeChange={handleTypeChange} 
            />
            
            <div className="space-y-4">
              {qrType === 'text' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Text
                  </label>
                  <textarea
                    value={qrData.text || ''}
                    onChange={(e) => handleDataChange({ text: e.target.value })}
                    placeholder="Enter text for QR code..."
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
                    rows={4}
                  />
                </div>
              )}

              {qrType === 'url' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    URL
                  </label>
                  <input
                    type="url"
                    value={qrData.url || ''}
                    onChange={(e) => handleDataChange({ url: e.target.value })}
                    placeholder="https://example.com"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>
              )}

              {qrType === 'email' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={qrData.email || ''}
                      onChange={(e) => handleDataChange({ email: e.target.value })}
                      placeholder="example@email.com"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Subject (Optional)
                    </label>
                    <input
                      type="text"
                      value={qrData.emailSubject || ''}
                      onChange={(e) => handleDataChange({ emailSubject: e.target.value })}
                      placeholder="Email subject"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>
              )}

              {qrType === 'phone' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={qrData.phone || ''}
                    onChange={(e) => handleDataChange({ phone: e.target.value })}
                    placeholder="+90 555 123 4567"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>
              )}

              {qrType === 'sms' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={qrData.sms || ''}
                      onChange={(e) => handleDataChange({ sms: e.target.value })}
                      placeholder="+90 555 123 4567"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Message (Optional)
                    </label>
                    <textarea
                      value={qrData.smsMessage || ''}
                      onChange={(e) => handleDataChange({ smsMessage: e.target.value })}
                      placeholder="SMS message text"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
                      rows={3}
                    />
                  </div>
                </div>
              )}

              {qrType === 'wifi' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Network Name (SSID)
                    </label>
                    <input
                      type="text"
                      value={qrData.wifiSSID || ''}
                      onChange={(e) => handleDataChange({ wifiSSID: e.target.value })}
                      placeholder="WiFi Network Name"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Security Type
                    </label>
                    <select
                      value={qrData.wifiSecurity || 'WPA'}
                      onChange={(e) => handleDataChange({ wifiSecurity: e.target.value as 'WPA' | 'WEP' | 'nopass' })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    >
                      <option value="WPA">WPA/WPA2</option>
                      <option value="WEP">WEP</option>
                      <option value="nopass">No Password</option>
                    </select>
                  </div>
                  {qrData.wifiSecurity !== 'nopass' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Password
                      </label>
                      <input
                        type="password"
                        value={qrData.wifiPassword || ''}
                        onChange={(e) => handleDataChange({ wifiPassword: e.target.value })}
                        placeholder="WiFi Password"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                  )}
                </div>
              )}

              {qrType === 'vcard' && (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        value={qrData.vcardFirstName || ''}
                        onChange={(e) => handleDataChange({ vcardFirstName: e.target.value })}
                        placeholder="John"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={qrData.vcardLastName || ''}
                        onChange={(e) => handleDataChange({ vcardLastName: e.target.value })}
                        placeholder="Doe"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Organization
                    </label>
                    <input
                      type="text"
                      value={qrData.vcardOrganization || ''}
                      onChange={(e) => handleDataChange({ vcardOrganization: e.target.value })}
                      placeholder="Company Name"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      value={qrData.vcardTitle || ''}
                      onChange={(e) => handleDataChange({ vcardTitle: e.target.value })}
                      placeholder="Job Title"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={qrData.vcardPhone || ''}
                      onChange={(e) => handleDataChange({ vcardPhone: e.target.value })}
                      placeholder="+1 234 567 8900"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={qrData.vcardEmail || ''}
                      onChange={(e) => handleDataChange({ vcardEmail: e.target.value })}
                      placeholder="john@example.com"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Website
                    </label>
                    <input
                      type="url"
                      value={qrData.vcardWebsite || ''}
                      onChange={(e) => handleDataChange({ vcardWebsite: e.target.value })}
                      placeholder="https://example.com"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Address
                    </label>
                    <input
                      type="text"
                      value={qrData.vcardAddress || ''}
                      onChange={(e) => handleDataChange({ vcardAddress: e.target.value })}
                      placeholder="Street Address"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        value={qrData.vcardCity || ''}
                        onChange={(e) => handleDataChange({ vcardCity: e.target.value })}
                        placeholder="City"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        State
                      </label>
                      <input
                        type="text"
                        value={qrData.vcardState || ''}
                        onChange={(e) => handleDataChange({ vcardState: e.target.value })}
                        placeholder="State"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        value={qrData.vcardZip || ''}
                        onChange={(e) => handleDataChange({ vcardZip: e.target.value })}
                        placeholder="12345"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Country
                      </label>
                      <input
                        type="text"
                        value={qrData.vcardCountry || ''}
                        onChange={(e) => handleDataChange({ vcardCountry: e.target.value })}
                        placeholder="Country"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              {qrType === 'location' && (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Latitude
                      </label>
                      <input
                        type="number"
                        step="any"
                        value={qrData.locationLatitude || ''}
                        onChange={(e) => handleDataChange({ locationLatitude: e.target.value })}
                        placeholder="40.7128"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Longitude
                      </label>
                      <input
                        type="number"
                        step="any"
                        value={qrData.locationLongitude || ''}
                        onChange={(e) => handleDataChange({ locationLongitude: e.target.value })}
                        placeholder="-74.0060"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Enter coordinates or use a mapping service to find them
                  </p>
                </div>
              )}
            </div>

            <QRCodeOptions settings={settings} onSettingsChange={setSettings} />
          </div>

          {/* Right Column - Preview */}
          <div className="flex flex-col items-center justify-center">
            <QRCodePreview 
              value={qrValue} 
              settings={settings}
              type={qrType}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
