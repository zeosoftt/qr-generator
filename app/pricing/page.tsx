'use client';

import Link from 'next/link';
import { useSubscription } from '@/contexts/SubscriptionContext';

export default function PricingPage() {
  const { plan, setPlan, qrCountToday, maxQrPerDay } = useSubscription();

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: '$0',
      period: 'forever',
      features: [
        'Static QR Codes',
        'Watermark on QR codes',
        '5 QR codes per day',
        'Basic customization',
        'PNG & SVG download',
      ],
      popular: false,
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '$9',
      period: 'month',
      features: [
        'Dynamic QR Codes',
        'No watermark',
        'Unlimited QR codes',
        'Logo embedding',
        'QR Analytics',
        'Advanced customization',
        'Priority support',
      ],
      popular: true,
    },
    {
      id: 'business',
      name: 'Business',
      price: '$29',
      period: 'month',
      features: [
        'Everything in Pro',
        'Multi-user access',
        'CSV export',
        'API access',
        'White-label solution',
        'Custom branding',
        'Dedicated support',
      ],
      popular: false,
    },
  ];

  const handleSelectPlan = (planId: string) => {
    // In a real app, this would redirect to payment
    setPlan(planId as 'free' | 'pro' | 'business');
    alert(`Plan set to ${planId}. In production, this would redirect to payment.`);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 dark:from-slate-950 dark:via-gray-950 dark:to-zinc-950 py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-black mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-black via-gray-800 to-black dark:from-white dark:via-gray-200 dark:to-white">
              Choose Your Plan
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Start free, upgrade when you need more features
          </p>
          {plan === 'free' && (
            <div className="mt-4 inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-lg">
              You&apos;re on Free plan • {qrCountToday}/{maxQrPerDay} QR codes used today
            </div>
          )}
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((planOption) => (
            <div
              key={planOption.id}
              className={`relative bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border-2 transition-all duration-300 ${
                planOption.popular
                  ? 'border-blue-500 scale-105 shadow-2xl'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              } ${plan === planOption.id ? 'ring-4 ring-blue-500 ring-opacity-50' : ''}`}
            >
              {planOption.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                  Most Popular
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                  {planOption.name}
                </h3>
                <div className="mb-4">
                  <span className="text-5xl font-black text-gray-900 dark:text-white">
                    {planOption.price}
                  </span>
                  {planOption.period !== 'forever' && (
                    <span className="text-gray-600 dark:text-gray-400">/{planOption.period}</span>
                  )}
                </div>
                {plan === planOption.id && (
                  <div className="inline-block px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-sm font-semibold mb-2">
                    Current Plan
                  </div>
                )}
              </div>

              <ul className="space-y-4 mb-8">
                {planOption.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <svg
                      className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleSelectPlan(planOption.id)}
                disabled={plan === planOption.id}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                  planOption.popular
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-2xl hover:scale-105'
                    : plan === planOption.id
                    ? 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                    : 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200'
                }`}
              >
                {plan === planOption.id ? 'Current Plan' : planOption.id === 'free' ? 'Free Forever' : 'Upgrade'}
              </button>
            </div>
          ))}
        </div>

        {/* FAQ or Additional Info */}
        <div className="text-center">
          <Link
            href="/generator"
            className="inline-block px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-bold rounded-xl border-2 border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 hover:shadow-xl transition-all"
          >
            ← Back to Generator
          </Link>
        </div>
      </div>
    </main>
  );
}
