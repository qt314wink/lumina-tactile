'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import ShytechNeoSkeuoCard from './ShytechNeoSkeuoCard';
import { useSpatialAudio } from './SpatialAudioProvider';
import * as THREE from 'three';

export default function MeshLab() {
  const { synchronizedPlay } = useSpatialAudio();
  const [meshFile, setMeshFile] = useState<File | null>(null);
  const [bemParams, setBemParams] = useState({
    frequencyRange: '20-20000',
    resolution: 8000,
    absorption: 0.6,
    fastPreview: true,
  });
  const [prompt, setPrompt] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleUpload = async (file: File) => {
    setMeshFile(file);
    setIsProcessing(true);
    const formData = new FormData();
    formData.append('mesh', file);
    formData.append('frequencyRange', bemParams.frequencyRange);
    formData.append('meshResolution', bemParams.resolution.toString());
    formData.append('absorption', bemParams.absorption.toString());
    formData.append('fastPreview', bemParams.fastPreview.toString());
    if (prompt) formData.append('prompt', prompt);

    const res = await fetch('/api/mesh2hrtf', { method: 'POST', body: formData });
    const data = await res.json();
    setPreviewUrl(data.sofaUrl);
    setIsProcessing(false);
    synchronizedPlay('metal', new THREE.Vector3(0, 0, 0), 'switch');
  };

  return (
    <section id="mesh-lab" className="px-6 py-24">
      <ShytechNeoSkeuoCard material="metal" variant="dormant" className="max-w-3xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl font-black text-white mb-2"
        >
          Mesh Lab – Build Your Own Ears
        </motion.h2>
        <p className="text-gray-400 mb-8">Upload a mesh • tweak real BEM physics • hear it instantly • export your sensory asset</p>

        <div className="space-y-6">
          <input
            type="file"
            accept=".obj,.stl,.glb"
            onChange={(e) => e.target.files && handleUpload(e.target.files[0])}
            className="block w-full mb-2 text-gray-400"
          />
          <textarea
            placeholder="Translation Layer: describe your sound in plain English… e.g. \"warm, close, slightly reverberant\""
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={2}
            className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 text-sm text-gray-300 resize-none"
          />
          <button
            onClick={() => meshFile && handleUpload(meshFile)}
            disabled={!meshFile || isProcessing}
            className="neo-skeuo-btn w-full mt-2"
          >
            {isProcessing ? 'Computing BEM Physics…' : 'Generate HRTF & Preview'}
          </button>

          <div className="space-y-4 pt-4 border-t border-white/10">
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Frequency Range: {bemParams.frequencyRange}</label>
              <input type="range" min={1} max={3} step={1}
                onChange={(e) => {
                  const ranges = ['20-2000', '20-10000', '20-20000'];
                  setBemParams({ ...bemParams, frequencyRange: ranges[parseInt(e.target.value) - 1] });
                }}
                defaultValue={3} className="w-full accent-violet-500" />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Mesh Resolution: {bemParams.resolution}</label>
              <input type="range" min={1000} max={16000} step={1000}
                value={bemParams.resolution}
                onChange={(e) => setBemParams({ ...bemParams, resolution: parseInt(e.target.value) })}
                className="w-full accent-violet-500" />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Absorption (Material Feel): {bemParams.absorption.toFixed(2)}</label>
              <input type="range" min={0} max={1} step={0.05}
                value={bemParams.absorption}
                onChange={(e) => setBemParams({ ...bemParams, absorption: parseFloat(e.target.value) })}
                className="w-full accent-violet-500" />
            </div>
            <label className="flex items-center gap-3 text-sm text-gray-400 cursor-pointer">
              <input type="checkbox"
                checked={bemParams.fastPreview}
                onChange={(e) => setBemParams({ ...bemParams, fastPreview: e.target.checked })}
              />
              Fast GPU Preview (mobile-friendly)
            </label>
          </div>
        </div>

        {previewUrl && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 p-4 rounded-2xl bg-violet-500/10 border border-violet-500/30 text-violet-300"
          >
            ✨ HRTF ready! Test tone playing with your custom physics.
          </motion.div>
        )}
      </ShytechNeoSkeuoCard>
    </section>
  );
}
