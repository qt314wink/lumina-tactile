'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import ShytechNeoSkeuoCard from './ShytechNeoSkeuoCard';
import { useSpatialAudio } from './SpatialAudioProvider';
import * as THREE from 'three';

export default function HRTFPersonalizationLab() {
  const { synchronizedPlay } = useSpatialAudio();
  const [photoFiles, setPhotoFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [hrtfUrl, setHrtfUrl] = useState<string | null>(null);

  const handlePhotoUpload = async (files: FileList) => {
    setPhotoFiles(Array.from(files));
    setIsProcessing(true);

    const formData = new FormData();
    Array.from(files).forEach((file, i) => formData.append(`ear${i}`, file));

    const res = await fetch('/api/hrtf-personalize', { method: 'POST', body: formData });
    const data = await res.json();
    setHrtfUrl(data.sofaUrl);
    setIsProcessing(false);
    synchronizedPlay('glass', new THREE.Vector3(0, 0, 0), 'buzz');
  };

  return (
    <section className="px-6 py-24">
      <ShytechNeoSkeuoCard material="glass" variant="dormant" className="max-w-3xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl font-black text-white mb-2"
        >
          HRTF Personalization Lab
        </motion.h2>
        <p className="text-gray-400 mb-8">Upload ear photos • AI + BEM hybrid → your own personalized HRTF in seconds</p>

        <input
          type="file"
          accept="image/*"
          multiple
          capture="environment"
          onChange={(e) => e.target.files && handlePhotoUpload(e.target.files)}
          className="block w-full text-gray-400 mb-4"
        />

        {isProcessing && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-violet-400 text-sm mb-4"
          >
            ⏳ Computing personalized HRTF with BEM physics…
          </motion.p>
        )}

        {hrtfUrl && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-2xl bg-violet-500/10 border border-violet-500/30 text-violet-300"
          >
            <p className="font-semibold mb-3">✨ Your personalized HRTF is ready!</p>
            <button
              onClick={() => synchronizedPlay('metal', new THREE.Vector3(0, 0, 0), 'switch')}
              className="neo-skeuo-btn"
            >
              Test in Your Ears
            </button>
          </motion.div>
        )}
      </ShytechNeoSkeuoCard>
    </section>
  );
}
