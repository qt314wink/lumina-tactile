'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import ShytechNeoSkeuoCard from './ShytechNeoSkeuoCard';
import { useSpatialAudio } from './SpatialAudioProvider';
import * as THREE from 'three';

interface AudioSource {
  id: number;
  name: string;
  material: string;
  position: THREE.Vector3;
}

export default function AudioMixingInteractiveLab() {
  const { synchronizedPlay } = useSpatialAudio();
  const [sources, setSources] = useState<AudioSource[]>([
    { id: 1, name: 'Button Click', material: 'metal', position: new THREE.Vector3(0, 0, 0) },
    { id: 2, name: 'Creature Voice', material: 'glass', position: new THREE.Vector3(2, 0, 0) },
  ]);
  const [hoaOrder, setHoaOrder] = useState(3);
  const [wfsGeometry, setWfsGeometry] = useState('circular');

  const addSource = () => {
    setSources([...sources, {
      id: Date.now(),
      name: 'New SFX',
      material: 'wood',
      position: new THREE.Vector3(Math.random() * 4 - 2, 0, Math.random() * 4 - 2),
    }]);
  };

  return (
    <section id="mixing-lab" className="px-6 py-24">
      <ShytechNeoSkeuoCard material="metal" variant="dormant" className="max-w-3xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl font-black text-white mb-2"
        >
          Audio Mixing Interactive Lab
        </motion.h2>
        <p className="text-gray-400 mb-8">Drag sources • mix in HOA/WFS/binaural • hear real BEM physics</p>

        <div className="space-y-3 mb-8">
          <button onClick={addSource} className="neo-skeuo-btn w-full">+ Add Sound Source</button>
          {sources.map((source) => (
            <motion.div
              key={source.id}
              layout
              className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/10"
            >
              <span className="text-2xl">🔊</span>
              <span className="text-sm text-gray-300">{source.name}</span>
              <span className="text-xs text-gray-500 ml-auto">{source.material}</span>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="text-sm text-gray-400 mb-2 block">HOA Order</label>
            <select
              value={hoaOrder}
              onChange={(e) => setHoaOrder(parseInt(e.target.value))}
              className="w-full p-3 rounded-2xl bg-white/5 border border-white/10 text-gray-300"
            >
              <option value={1}>1st Order (basic)</option>
              <option value={3}>3rd Order (recommended)</option>
              <option value={5}>5th Order (premium)</option>
            </select>
          </div>
          <div>
            <label className="text-sm text-gray-400 mb-2 block">WFS Array Geometry</label>
            <select
              value={wfsGeometry}
              onChange={(e) => setWfsGeometry(e.target.value)}
              className="w-full p-3 rounded-2xl bg-white/5 border border-white/10 text-gray-300"
            >
              <option value="linear">Linear</option>
              <option value="circular">Circular</option>
              <option value="planar">Planar</option>
            </select>
          </div>
        </div>

        <button
          onClick={() => synchronizedPlay('glass', new THREE.Vector3(0, 0, 0), 'buzz')}
          className="neo-skeuo-btn w-full text-lg py-5"
        >
          ▶ Play Full Mix Preview
        </button>
      </ShytechNeoSkeuoCard>
    </section>
  );
}
