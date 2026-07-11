'use client';
import { createContext, useContext, useCallback } from 'react';

type HapticPattern = 'switch' | 'buzz' | 'dial';

interface HapticsContextType {
  triggerHaptic: (pattern: HapticPattern) => void;
}

const HapticsContext = createContext<HapticsContextType>({
  triggerHaptic: () => {},
});

export function useHaptics() {
  return useContext(HapticsContext);
}

export default function HapticsProvider({ children }: { children: React.ReactNode }) {
  const triggerHaptic = useCallback((pattern: HapticPattern) => {
    if (!navigator.vibrate) return;
    const patterns: Record<HapticPattern, number[]> = {
      switch: [10],
      buzz: [20, 10, 20],
      dial: [5, 5, 5, 5, 5],
    };
    navigator.vibrate(patterns[pattern]);
  }, []);

  return (
    <HapticsContext.Provider value={{ triggerHaptic }}>
      {children}
    </HapticsContext.Provider>
  );
}
