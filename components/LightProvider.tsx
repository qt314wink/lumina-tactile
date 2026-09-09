'use client';
import { createContext, useCallback, useContext, useEffect, useMemo, useRef } from 'react';

interface LightContextType {
  setAngle: (angle: { x: number; y: number }) => void;
}

const LightContext = createContext<LightContextType>({
  setAngle: () => {},
});

export function useLightContext() {
  return useContext(LightContext);
}

export default function LightProvider({ children }: { children: React.ReactNode }) {
  const lightRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const pendingAngleRef = useRef({ x: -30, y: -30 });

  const setAngle = useCallback((angle: { x: number; y: number }) => {
    const lightElement = lightRef.current;
    if (!lightElement) return;

    lightElement.style.setProperty('--light-shadow-x', `${angle.x * 0.1}px`);
    lightElement.style.setProperty('--light-shadow-y', `${angle.y * 0.1}px`);
  }, []);

  const contextValue = useMemo(() => ({ setAngle }), [setAngle]);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      pendingAngleRef.current = {
        x: ((e.clientX / window.innerWidth) - 0.5) * 60,
        y: ((e.clientY / window.innerHeight) - 0.5) * 60,
      };

      if (animationFrameRef.current !== null) return;

      animationFrameRef.current = window.requestAnimationFrame(() => {
        setAngle(pendingAngleRef.current);
        animationFrameRef.current = null;
      });
    };

    window.addEventListener('mousemove', handleMove);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [setAngle]);

  return (
    <LightContext.Provider value={contextValue}>
      <div
        ref={lightRef}
        style={{
          '--light-shadow-x': '-3px',
          '--light-shadow-y': '-3px',
        } as React.CSSProperties}
      >
        {children}
      </div>
    </LightContext.Provider>
  );
}
