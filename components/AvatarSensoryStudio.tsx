'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import ShytechNeoSkeuoCard from './ShytechNeoSkeuoCard';
import { useSpatialAudio } from './SpatialAudioProvider';
import * as THREE from 'three';

const avatars = [
  { id: 1, name: 'Fox Ears', emoji: '🦊', baseHRTF: 'fox' },
  { id: 2, name: 'Dragon Horns', emoji: '🐉', baseHRTF: 'dragon' },
  { id: 3, name: 'Alien Antennae', emoji: '👽', baseHRTF: 'alien' },
  { id: 4, name: 'Cat Ears', emoji: '🐱', baseHRTF: 'cat' },
];

export default function AvatarSensoryStudio() {
  const { synchronizedPlay } = useSpatialAudio();
  const [selectedAvatar, setSelectedAvatar] = useState(avatars[0]);
  const [morphValue, setMorphValue] = useState(50);
  const [isARMode, setIsARMode] = useState(false);

  const handleMorph = (value: number) => {
    setMorphValue(value);
    synchronizedPlay(selectedAvatar.baseHRTF as any, new THREE.Vector3(0, 0, 0), 'buzz');
  };

  return (
    <section id="avatar-studio" className="px-6 py-24">
      <ShytechNeoSkeuoCard material="glass" variant="dormant" className="max-w-3xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl font-black text-white mb-2"
        >
          Avatar Sensory Studio
        </motion.h2>
        <p className="text-gray-400 mb-8">Morph ears • hear them in real time • export your creature’s HRTF</p>

        <div className="flex gap-4 mb-6 flex-wrap">
          {avatars.map((avatar) => (
            <button
              key={avatar.id}
              onClick={() => setSelectedAvatar(avatar)}
              className={`p-4 rounded-2xl text-4xl transition-all ${
                selectedAvatar.id === avatar.id ? 'shytech-lit scale-110 bg-violet-500/20' : 'bg-white/5'
              }`}
            >
              {avatar.emoji}
            </button>
          ))}
        </div>
        <p className="text-lumina-lit font-semibold mb-6">{selectedAvatar.name}</p>

        <div className="space-y-6">
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Ear/Horn Size & Shape: {morphValue}</label>
            <input
              type="range" min={0} max={100}
              value={morphValue}
              onChange={(e) => handleMorph(parseInt(e.target.value))}
              className="w-full accent-violet-500"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Subtle</span>
              <span>Exaggerated</span>
            </div>
          </div>

          <button
            onClick={() => setIsARMode(!isARMode)}
            className="neo-skeuo-btn w-full"
          >
            {isARMode ? 'Exit AR Mirror Mode' : 'Enter AR Mirror Mode (Camera)'}
          </button>

          {isARMode && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/30 text-blue-300 text-sm"
            >
              📸 AR Mirror Mode Active — Point camera at your face • hear your creature ears in real space
            </motion.div>
          )}

          <button
            onClick={() => {
              synchronizedPlay(selectedAvatar.baseHRTF as any, new THREE.Vector3(0, 0, 0), 'dial');
              alert('Exported: ' + selectedAvatar.name + ' HRTF + Neo-Skeuo asset + haptics');
            }}
            className="neo-skeuo-btn w-full text-lg py-5"
          >
            {selectedAvatar.emoji} Export Sensory Asset
          </button>
          <p className="text-xs text-gray-500 text-center">Includes BEM-adapted HRTF, haptics timeline, and matching visual</p>
        </div>
      </ShytechNeoSkeuoCard>
    </section>
  );
}
