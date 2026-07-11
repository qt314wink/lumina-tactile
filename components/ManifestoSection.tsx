'use client';
import { motion } from 'framer-motion';

export default function ManifestoSection() {
  return (
    <section className="px-6 py-24 max-w-4xl mx-auto">
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="text-4xl font-black text-lumina-lit mb-8"
      >
        Tactile Renaissance Manifesto
      </motion.h2>
      <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
        <p>
          We are entering a new era of sensory design. Sound is not decoration — it is architecture.
          Every surface, every material, every creature has a physics-accurate voice waiting to be heard.
        </p>
        <p>
          The Tactile Renaissance is the convergence of spatial audio, haptics, and multi-sensory design
          into tools that are playful, ownable, and open. No black boxes. No locked pipelines.
          You design it. You own it. You export it to any world.
        </p>
        <p>
          This system is our proof: real BEM physics in a browser tab, creature ears that actually change
          how sound localizes, AR products you can hear before you build them.
          Pioneer positioning for 2027 starts here.
        </p>
      </div>
    </section>
  );
}
