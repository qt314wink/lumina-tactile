'use client';
import { motion } from 'framer-motion';
import { useLightContext } from './LightProvider';

interface ShytechNeoSkeuoCardProps {
  children: React.ReactNode;
  material?: 'wood' | 'metal' | 'glass';
  variant?: 'dormant' | 'lit' | 'pressed' | 'xr';
  className?: string;
  onClick?: () => void;
}

export default function ShytechNeoSkeuoCard({
  children,
  material = 'metal',
  variant = 'dormant',
  className = '',
  onClick,
}: ShytechNeoSkeuoCardProps) {
  const { angle } = useLightContext();

  const materialGradients = {
    wood: 'linear-gradient(145deg, #3D2B1F, #5C4033)',
    metal: 'linear-gradient(145deg, #1e1e2e, #2a2a3e)',
    glass: 'linear-gradient(145deg, rgba(167,139,250,0.1), rgba(37,99,235,0.1))',
  };

  const isLit = variant === 'lit' || variant === 'xr';

  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 280, damping: 28 }}
      className={`rounded-3xl p-6 border border-white/10 ${isLit ? 'shytech-lit' : ''} ${className}`}
      style={{
        background: materialGradients[material],
        boxShadow: isLit
          ? `0 0 24px rgba(167,139,250,0.5), ${angle.x * 0.1}px ${angle.y * 0.1}px 12px rgba(0,0,0,0.4)`
          : `${angle.x * 0.1}px ${angle.y * 0.1}px 12px rgba(0,0,0,0.5), -3px -3px 8px rgba(255,255,255,0.05)`,
      }}
    >
      {children}
    </motion.div>
  );
}
