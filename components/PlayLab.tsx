'use client';
import { motion } from 'framer-motion';
import ShytechNeoSkeuoCard from './ShytechNeoSkeuoCard';
import { useSpatialAudio } from './SpatialAudioProvider';
import * as THREE from 'three';

const demos = [
  { id: 'mesh', label: 'Mesh Lab', emoji: '🧠', href: '#mesh-lab', material: 'metal' as const },
  { id: 'avatar', label: 'Avatar Studio', emoji: '🦊', href: '#avatar-studio', material: 'glass' as const },
  { id: 'vrar', label: 'VR/AR Lab', emoji: '🥽', href: '#vrar-lab', material: 'wood' as const },
  { id: 'mix', label: 'Mix Lab', emoji: '🎧', href: '#mixing-lab', material: 'metal' as const },
];

export default function PlayLab() {
  const { synchronizedPlay } = useSpatialAudio();

  return (
    <section className="px-6 py-24">
      <h2 className="text-4xl font-black text-center text-white mb-4">PlayLab</h2>
      <p className="text-center text-gray-400 mb-12">Choose your experiment — every lab is a sensory playground</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
        {demos.map((demo) => (
          <ShytechNeoSkeuoCard
            key={demo.id}
            material={demo.material}
            variant="dormant"
            onClick={() => synchronizedPlay(demo.material, new THREE.Vector3(0, 0, 0), 'switch')}
          >
            <a href={demo.href} className="flex flex-col items-center gap-3 text-center">
              <motion.span
                whileHover={{ scale: 1.2 }}
                className="text-5xl"
              >
                {demo.emoji}
              </motion.span>
              <span className="text-sm font-semibold text-lumina-lit">{demo.label}</span>
            </a>
          </ShytechNeoSkeuoCard>
        ))}
      </div>
    </section>
  );
}
