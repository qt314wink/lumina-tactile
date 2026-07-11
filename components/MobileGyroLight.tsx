'use client';
import { useEffect } from 'react';
import { useLightContext } from './LightProvider';

export default function MobileGyroLight() {
  const { setAngle } = useLightContext();

  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      const x = (e.gamma ?? 0); // left-right tilt
      const y = (e.beta ?? 0) - 45; // front-back tilt
      setAngle({ x, y });
    };

    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleOrientation);
    }
    return () => window.removeEventListener('deviceorientation', handleOrientation);
  }, [setAngle]);

  return null;
}
