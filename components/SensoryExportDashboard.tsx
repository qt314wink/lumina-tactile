'use client';
import { motion } from 'framer-motion';
import ShytechNeoSkeuoCard from './ShytechNeoSkeuoCard';

const platforms = [
  { emoji: '🌐', name: 'WebXR', action: 'Export', color: 'violet' },
  { emoji: '🥽', name: 'visionOS', action: 'Export .usdz', color: 'blue' },
  { emoji: '📱', name: 'ARCore', action: 'Export Android', color: 'green' },
  { emoji: '🎮', name: 'Unity / Unreal', action: 'Export Package', color: 'orange' },
];

export default function SensoryExportDashboard() {
  return (
    <section id="export" className="px-6 py-24">
      <ShytechNeoSkeuoCard material="metal" variant="lit" className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl font-black text-white mb-2"
        >
          Sensory Export Dashboard
        </motion.h2>
        <p className="text-gray-400 mb-10">One-click export your creation to every platform</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {platforms.map((p) => (
            <motion.button
              key={p.name}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 280, damping: 28 }}
              onClick={() => alert(`Exporting to ${p.name}…`)}
              className="neo-skeuo-btn flex flex-col items-center gap-2 py-8 px-4"
            >
              <span className="text-4xl">{p.emoji}</span>
              <span className="font-bold text-sm">{p.name}</span>
              <span className="text-xs text-gray-500">{p.action}</span>
            </motion.button>
          ))}
        </div>
      </ShytechNeoSkeuoCard>
    </section>
  );
}
