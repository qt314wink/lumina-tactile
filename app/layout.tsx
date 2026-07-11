import type { Metadata } from 'next';
import './globals.css';
import LightProvider from '@/components/LightProvider';
import HapticsProvider from '@/components/HapticsProvider';
import { SpatialAudioProvider } from '@/components/SpatialAudioProvider';

export const metadata: Metadata = {
  title: 'Lumina Tactile Renaissance',
  description: 'Multi-sensory spatial audio design system. Tactile Renaissance Manifesto 2027.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <LightProvider>
          <HapticsProvider>
            <SpatialAudioProvider>
              {children}
            </SpatialAudioProvider>
          </HapticsProvider>
        </LightProvider>
      </body>
    </html>
  );
}
