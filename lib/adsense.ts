// AdSense configuration helper
export const getAdSenseId = (): string => {
  if (typeof window !== 'undefined') {
    return process.env.NEXT_PUBLIC_ADSENSE_ID || '';
  }
  return process.env.NEXT_PUBLIC_ADSENSE_ID || '';
};

export const getAdSlot = (slotKey: string): string => {
  const slot = process.env[`NEXT_PUBLIC_ADSENSE_SLOT_${slotKey}`] || '';
  // Don't use placeholder slots
  if (slot.startsWith('123456789') || slot === '1234567890') {
    return '';
  }
  return slot;
};
