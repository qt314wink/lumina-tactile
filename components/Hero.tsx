'use client';
import { motion } from 'framer-motion';
import ShytechNeoSkeuoCard from './ShytechNeoSkeuoCard';
import MobileGyroLight from './MobileGyroLight';

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 text-center">
      <MobileGyroLight />
      <motion.h1
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight"
      >
        The Future{' '}
        <span className="text-lumina-lit">Isn't Flat</span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-xl text-gray-400 max-w-2xl mb-12"
      >
        Design, prototype, and export multi-sensory spatial experiences.
        Real BEM physics. Real ears. Real space.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 280, damping: 28 }}
      >
        <ShytechNeoSkeuoCard material="metal" variant="lit" className="inline-block">
          <a href="#mesh-lab" className="neo-skeuo-btn text-lg px-10 py-5 block">
            Enter the Lab 🌀
          </a>
        </ShytechNeoSkeuoCard>
      </motion.div>
    </section>
  );
}
