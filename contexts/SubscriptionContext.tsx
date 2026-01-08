'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type SubscriptionPlan = 'free' | 'pro' | 'business';

interface SubscriptionContextType {
  plan: SubscriptionPlan;
  setPlan: (plan: SubscriptionPlan) => void;
  qrCountToday: number;
  incrementQrCount: () => void;
  canCreateQR: () => boolean;
  isPro: boolean;
  isBusiness: boolean;
  maxQrPerDay: number;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export function SubscriptionProvider({ children }: { children: ReactNode }) {
  const [plan, setPlanState] = useState<SubscriptionPlan>('free');
  const [qrCountToday, setQrCountToday] = useState(0);

  useEffect(() => {
    // Load from localStorage
    const savedPlan = localStorage.getItem('subscriptionPlan') as SubscriptionPlan;
    if (savedPlan) setPlanState(savedPlan);

    const savedCount = localStorage.getItem('qrCountToday');
    const savedDate = localStorage.getItem('qrCountDate');
    const today = new Date().toDateString();
    
    if (savedDate === today && savedCount) {
      setQrCountToday(parseInt(savedCount, 10));
    } else {
      setQrCountToday(0);
      localStorage.setItem('qrCountDate', today);
      localStorage.setItem('qrCountToday', '0');
    }
  }, []);

  const setPlan = (newPlan: SubscriptionPlan) => {
    setPlanState(newPlan);
    localStorage.setItem('subscriptionPlan', newPlan);
  };

  const incrementQrCount = () => {
    const newCount = qrCountToday + 1;
    setQrCountToday(newCount);
    localStorage.setItem('qrCountToday', newCount.toString());
    localStorage.setItem('qrCountDate', new Date().toDateString());
  };

  const maxQrPerDay = plan === 'free' ? 5 : Infinity;
  const canCreateQR = () => qrCountToday < maxQrPerDay;

  return (
    <SubscriptionContext.Provider
      value={{
        plan,
        setPlan,
        qrCountToday,
        incrementQrCount,
        canCreateQR,
        isPro: plan === 'pro' || plan === 'business',
        isBusiness: plan === 'business',
        maxQrPerDay,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
}
