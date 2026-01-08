'use client';

import Link from 'next/link';
import QRCodeGenerator from '@/components/QRCodeGenerator';
import AdRectangle from '@/components/AdRectangle';

export default function GeneratorPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 dark:from-slate-950 dark:via-gray-950 dark:to-zinc-950">
      <div className="container mx-auto px-4 py-8 md:py-16">
        {/* Navigation */}
        <nav className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to Home</span>
          </Link>
        </nav>

        {/* Header with QR Code Theme */}
        <div className="text-center mb-10 md:mb-14">
          <div className="flex items-center justify-center mb-6">
            {/* QR Code Icon */}
            <div className="relative">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-black dark:bg-white rounded-lg flex items-center justify-center shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="grid grid-cols-3 gap-1 p-2">
                  {[...Array(9)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 md:w-3 md:h-3 rounded-sm ${
                        i === 4 || (i >= 0 && i <= 2) || (i >= 6 && i <= 8)
                          ? 'bg-white dark:bg-black'
                          : 'bg-black dark:bg-white'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-600 rounded-full border-4 border-white dark:border-gray-950 animate-pulse"></div>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black mb-4 tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-black via-gray-800 to-black dark:from-white dark:via-gray-200 dark:to-white">
              QR
            </span>
            <span className="text-gray-400 dark:text-gray-600 mx-2">Code</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
              Generator
            </span>
          </h1>
          
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-gray-300 to-gray-500 dark:via-gray-700 dark:to-gray-600"></div>
            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
            <div className="h-px w-16 bg-gradient-to-l from-transparent via-gray-300 to-gray-500 dark:via-gray-700 dark:to-gray-600"></div>
          </div>
          
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-medium">
            Create professional, customizable QR codes instantly
          </p>
          <p className="text-sm md:text-base text-gray-500 dark:text-gray-500 mt-2 max-w-xl mx-auto">
            Support for URLs, text, WiFi, email, phone, SMS and more
          </p>
        </div>

        {/* Ad Rectangle - Before Generator */}
        <div className="mb-8 flex justify-center">
          <AdRectangle slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_GENERATOR || '1234567890'} />
        </div>
        
        <QRCodeGenerator />

        {/* Ad Rectangle - After Generator */}
        <div className="mt-8 flex justify-center">
          <AdRectangle slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_GENERATOR_BOTTOM || '1234567890'} />
        </div>
      </div>
    </main>
  );
}
