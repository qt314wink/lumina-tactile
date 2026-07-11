'use client';
import { createContext, useContext, useRef, useCallback } from 'react';
import * as THREE from 'three';

type Material = 'wood' | 'metal' | 'glass' | 'fox' | 'dragon' | 'alien' | 'cat';
type HapticType = 'switch' | 'buzz' | 'dial';

interface SpatialAudioContextType {
  synchronizedPlay: (
    material: Material,
    position: THREE.Vector3,
    hapticType: HapticType,
    sofaUrl?: string
  ) => Promise<void>;
}

const SpatialAudioContext = createContext<SpatialAudioContextType>({
  synchronizedPlay: async () => {},
});

export function useSpatialAudio() {
  return useContext(SpatialAudioContext);
}

async function convertSOFAtoImpulse(buffer: ArrayBuffer): Promise<AudioBuffer> {
  // Placeholder: in production, parse SOFA format to extract HRIRs
  const ctx = new AudioContext();
  return ctx.decodeAudioData(buffer);
}

export function SpatialAudioProvider({ children }: { children: React.ReactNode }) {
  const contextRef = useRef<AudioContext | null>(null);

  const getContext = () => {
    if (!contextRef.current) {
      contextRef.current = new AudioContext();
    }
    return contextRef.current;
  };

  const synchronizedPlay = useCallback(async (
    material: Material,
    position: THREE.Vector3,
    hapticType: HapticType,
    sofaUrl?: string
  ) => {
    const context = getContext();

    // Create oscillator tone
    const osc = context.createOscillator();
    const gainNode = context.createGain();
    osc.type = 'sine';
    osc.frequency.value = material === 'metal' ? 880 : material === 'glass' ? 1320 : 440;
    gainNode.gain.setValueAtTime(0.3, context.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.5);

    // Panner for spatial positioning
    const panner = context.createPanner();
    panner.setPosition(position.x, position.y, position.z);

    osc.connect(panner);

    if (sofaUrl) {
      try {
        const response = await fetch(sofaUrl);
        const arrayBuffer = await response.arrayBuffer();
        const convolver = context.createConvolver();
        convolver.buffer = await convertSOFAtoImpulse(arrayBuffer);
        panner.connect(convolver);
        convolver.connect(gainNode);
      } catch {
        panner.connect(gainNode);
      }
    } else {
      panner.connect(gainNode);
    }

    gainNode.connect(context.destination);
    osc.start();
    osc.stop(context.currentTime + 0.5);

    // Haptic feedback
    if (navigator.vibrate) {
      const patterns: Record<HapticType, number[]> = {
        switch: [10],
        buzz: [20, 10, 20],
        dial: [5, 5, 5, 5, 5],
      };
      navigator.vibrate(patterns[hapticType]);
    }
  }, []);

  return (
    <SpatialAudioContext.Provider value={{ synchronizedPlay }}>
      {children}
    </SpatialAudioContext.Provider>
  );
}
