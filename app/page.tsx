'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import AdBanner from '@/components/AdBanner';
import AdRectangle from '@/components/AdRectangle';
import { getAdSlot } from '@/lib/adsense';

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 dark:from-slate-950 dark:via-gray-950 dark:to-zinc-950">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-black dark:bg-white rounded-lg flex items-center justify-center">
                <div className="grid grid-cols-3 gap-0.5">
                  {[...Array(9)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-1.5 h-1.5 ${
                        i === 4 || (i >= 0 && i <= 2) || (i >= 6 && i <= 8)
                          ? 'bg-white dark:bg-black'
                          : 'bg-black dark:bg-white'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">QRGenerator</span>
            </div>
            <Link
              href="/generator"
              className="px-6 py-2.5 bg-black dark:bg-white text-white dark:text-black font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all"
            >
              Generate QR Code
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-32 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            {/* Animated QR Code Logo */}
            <div className="flex items-center justify-center mb-8">
              <div className="relative">
                <div className="w-32 h-32 md:w-40 md:h-40 bg-black dark:bg-white rounded-2xl flex items-center justify-center shadow-2xl transform hover:scale-110 transition-transform duration-500">
                  <div className="grid grid-cols-3 gap-1.5 p-3">
                    {[...Array(9)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-3 h-3 md:w-4 md:h-4 rounded-sm transition-all duration-300 ${
                          i === 4 || (i >= 0 && i <= 2) || (i >= 6 && i <= 8)
                            ? 'bg-white dark:bg-black'
                            : 'bg-black dark:bg-white'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full border-4 border-white dark:border-gray-950 animate-pulse shadow-lg"></div>
              </div>
            </div>

            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-6 tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-black via-gray-800 to-black dark:from-white dark:via-gray-200 dark:to-white block mb-2">
                QR Code
              </span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 block">
                Generator
              </span>
            </h1>

            <div className="flex items-center justify-center gap-2 mb-8">
              <div className="h-px w-24 bg-gradient-to-r from-transparent via-gray-300 to-gray-500 dark:via-gray-700 dark:to-gray-600"></div>
              <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse"></div>
              <div className="h-px w-24 bg-gradient-to-l from-transparent via-gray-300 to-gray-500 dark:via-gray-700 dark:to-gray-600"></div>
            </div>

            <p className="text-2xl md:text-3xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto font-medium mb-4">
              Create professional, customizable QR codes instantly
            </p>
            <p className="text-lg md:text-xl text-gray-500 dark:text-gray-500 max-w-2xl mx-auto mb-12">
              Free, fast, and easy-to-use QR code generator for URLs, text, WiFi, email, and more
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/generator"
                className="px-8 py-4 bg-gradient-to-r from-black via-gray-800 to-black dark:from-white dark:via-gray-200 dark:to-white text-white dark:text-black font-bold text-lg rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 w-full sm:w-auto"
              >
                Generate QR Code Now
              </Link>
              <a
                href="#features"
                className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-bold text-lg rounded-xl border-2 border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 hover:shadow-xl hover:scale-105 transition-all duration-300 w-full sm:w-auto inline-block text-center"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Ad Banner - After Hero */}
      {getAdSlot('HERO') && <AdBanner slot={getAdSlot('HERO')} />}

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm scroll-mt-20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4 text-gray-900 dark:text-white">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Everything you need to create perfect QR codes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-200 dark:border-gray-700">
              <div className="w-16 h-16 bg-black dark:bg-white rounded-xl flex items-center justify-center mb-6">
                <span className="text-3xl">📝</span>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">Multiple Types</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Support for URLs, text, WiFi, email, phone, SMS, and more QR code formats
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-200 dark:border-gray-700">
              <div className="w-16 h-16 bg-black dark:bg-white rounded-xl flex items-center justify-center mb-6">
                <span className="text-3xl">🎨</span>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">Fully Customizable</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Customize colors, size, error correction level, and margins to match your brand
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-200 dark:border-gray-700">
              <div className="w-16 h-16 bg-black dark:bg-white rounded-xl flex items-center justify-center mb-6">
                <span className="text-3xl">⚡</span>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">Lightning Fast</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Generate QR codes instantly with real-time preview and instant download
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-200 dark:border-gray-700">
              <div className="w-16 h-16 bg-black dark:bg-white rounded-xl flex items-center justify-center mb-6">
                <span className="text-3xl">📥</span>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">Multiple Formats</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Download your QR codes as PNG or SVG formats with high quality
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-200 dark:border-gray-700">
              <div className="w-16 h-16 bg-black dark:bg-white rounded-xl flex items-center justify-center mb-6">
                <span className="text-3xl">🔒</span>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">Privacy First</h3>
              <p className="text-gray-600 dark:text-gray-400">
                All processing happens locally in your browser. Your data never leaves your device
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-200 dark:border-gray-700">
              <div className="w-16 h-16 bg-black dark:bg-white rounded-xl flex items-center justify-center mb-6">
                <span className="text-3xl">🆓</span>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">100% Free</h3>
              <p className="text-gray-600 dark:text-gray-400">
                No registration, no credit card, no limits. Use it as much as you want
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ad Rectangle - In Features */}
      {getAdSlot('FEATURES') && (
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <AdRectangle slot={getAdSlot('FEATURES')} />
          </div>
        </div>
      )}

      {/* How It Works Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4 text-gray-900 dark:text-white">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Create your QR code in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-black mx-auto mb-6 shadow-lg">
                1
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Choose Type</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Select the type of QR code you want to create: URL, text, WiFi, email, or more
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-black mx-auto mb-6 shadow-lg">
                2
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Customize</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Enter your content and customize colors, size, and other settings to your preference
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-black mx-auto mb-6 shadow-lg">
                3
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Download</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Preview your QR code and download it as PNG or SVG format instantly
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-black via-gray-900 to-black dark:from-gray-800 dark:via-gray-700 dark:to-gray-800">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-6xl font-black mb-6 text-white">
            Ready to Create Your QR Code?
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Start generating professional QR codes in seconds. No registration required.
          </p>
          <Link
            href="/generator"
            className="inline-block px-10 py-5 bg-white text-black font-bold text-xl rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            Generate QR Code Now →
          </Link>
        </div>
      </section>

      {/* Ad Banner - Before Footer */}
      {getAdSlot('FOOTER') && <AdBanner slot={getAdSlot('FOOTER')} />}

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-black dark:bg-white rounded-lg flex items-center justify-center">
                <div className="grid grid-cols-3 gap-0.5">
                  {[...Array(9)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-1 h-1 ${
                        i === 4 || (i >= 0 && i <= 2) || (i >= 6 && i <= 8)
                          ? 'bg-white dark:bg-black'
                          : 'bg-black dark:bg-white'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <span className="text-lg font-bold text-gray-900 dark:text-white">QRGenerator</span>
            </div>
            <div className="text-gray-600 dark:text-gray-400 text-center md:text-right">
              <p>© 2024 QR Code Generator. Built with Next.js & Tailwind CSS.</p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
