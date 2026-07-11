'use client';
import { createContext, useContext, useEffect, useState } from 'react';

interface LightContextType {
  angle: { x: number; y: number };
  setAngle: (angle: { x: number; y: number }) => void;
}

const LightContext = createContext<LightContextType>({
  angle: { x: -30, y: -30 },
  setAngle: () => {},
});

export function useLightContext() {
  return useContext(LightContext);
}

export default function LightProvider({ children }: { children: React.ReactNode }) {
  const [angle, setAngle] = useState({ x: -30, y: -30 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const x = ((e.clientX / window.innerWidth) - 0.5) * 60;
      const y = ((e.clientY / window.innerHeight) - 0.5) * 60;
      setAngle({ x, y });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <LightContext.Provider value={{ angle, setAngle }}>
      <div
        style={{
          '--light-x': `${angle.x}deg`,
          '--light-y': `${angle.y}deg`,
        } as React.CSSProperties}
      >
        {children}
      </div>
    </LightContext.Provider>
  );
}
