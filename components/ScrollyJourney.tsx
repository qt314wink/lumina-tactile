'use client';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollyJourney({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sections = containerRef.current?.querySelectorAll('.journey-section');

    sections?.forEach((section) => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top 65%',
        end: 'bottom 35%',
        onEnter: () => {
          gsap.to(section, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
          });
        },
        onLeaveBack: () => {
          gsap.to(section, {
            opacity: 0,
            y: 32,
            duration: 0.5,
          });
        },
      });
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <div ref={containerRef}>
      {children}
    </div>
  );
}
