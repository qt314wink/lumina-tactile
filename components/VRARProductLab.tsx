'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import ShytechNeoSkeuoCard from './ShytechNeoSkeuoCard';
import { useSpatialAudio } from './SpatialAudioProvider';
import * as THREE from 'three';

const products = [
  { id: 'watch', name: 'Luxury Watch', emoji: '⌚' },
  { id: 'speaker', name: 'Portable Speaker', emoji: '🔊' },
  { id: 'controller', name: 'VR Controller', emoji: '🎮' },
];

export default function VRARProductLab() {
  const { synchronizedPlay } = useSpatialAudio();
  const [selectedProduct, setSelectedProduct] = useState('watch');
  const [arMode, setArMode] = useState(false);

  const handleProductTap = (product: string) => {
    setSelectedProduct(product);
    synchronizedPlay('metal', new THREE.Vector3(0, 0, 0), 'switch');
  };

  return (
    <section id="vrar-lab" className="px-6 py-24">
      <ShytechNeoSkeuoCard material="wood" variant="dormant" className="max-w-3xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl font-black text-white mb-2"
        >
          VR/AR Product & UI Sensory Lab
        </motion.h2>
        <p className="text-gray-400 mb-8">Place your product or UI in real space • hear BEM-accurate sound • test haptics</p>

        <div className="flex gap-4 mb-4 flex-wrap">
          {products.map((p) => (
            <button
              key={p.id}
              onClick={() => handleProductTap(p.id)}
              className={`text-5xl p-6 rounded-3xl transition-all ${
                selectedProduct === p.id ? 'shytech-lit bg-violet-500/20 scale-110' : 'bg-white/5'
              }`}
            >
              {p.emoji}
            </button>
          ))}
        </div>
        <p className="text-lumina-lit font-semibold mb-8">
          {products.find((p) => p.id === selectedProduct)?.name}
        </p>

        <button onClick={() => setArMode(!arMode)} className="neo-skeuo-btn w-full mb-6">
          {arMode ? 'Exit AR Mirror Mode' : 'Enter AR Mirror Mode (Camera + Plane Anchoring)'}
        </button>

        {arMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/30 text-blue-300 text-sm mb-6"
          >
            📸 AR Mode Active – Place virtual {selectedProduct} on any surface
            <br />
            BEM HRTF + haptics anchored to real-world plane
          </motion.div>
        )}

        <button
          onClick={() => synchronizedPlay('metal', new THREE.Vector3(0, 0, 0), 'dial')}
          className="neo-skeuo-btn w-full text-lg py-5"
        >
          Export Sensory Asset
        </button>
        <p className="text-xs text-gray-500 text-center mt-2">
          Includes BEM HRTF, plane-anchored audio, haptics timeline, and ARCore/visionOS ready bundle
        </p>
      </ShytechNeoSkeuoCard>
    </section>
  );
}
