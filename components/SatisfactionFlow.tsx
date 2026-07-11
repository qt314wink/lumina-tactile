'use client';
import { motion } from 'framer-motion';
import ShytechNeoSkeuoCard from './ShytechNeoSkeuoCard';
import HRTFPersonalizationLab from './HRTFPersonalizationLab';
import SensoryExportDashboard from './SensoryExportDashboard';

export default function SatisfactionFlow() {
  return (
    <section className="px-6 py-32">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        className="text-center mb-16"
      >
        <h2 className="text-5xl font-black text-white mb-4">Your Sensory Journey Ends Here</h2>
        <p className="text-gray-400 text-xl">Personalize. Mix. Export. Own it.</p>
      </motion.div>

      <HRTFPersonalizationLab />
      <SensoryExportDashboard />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, type: 'spring', stiffness: 280, damping: 28 }}
        className="text-center mt-16"
      >
        <ShytechNeoSkeuoCard material="metal" variant="lit" className="inline-block">
          <p className="text-gray-400 text-sm mb-4">Take a breath. You now own a complete sensory asset.</p>
          <button
            onClick={() => alert('Exporting everything…')}
            className="neo-skeuo-btn text-lg px-12 py-5"
          >
            Export Everything 🌀
          </button>
        </ShytechNeoSkeuoCard>
      </motion.div>
    </section>
  );
}
