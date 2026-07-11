'use client';
import ShytechNeoSkeuoCard from './ShytechNeoSkeuoCard';

const pillars = [
  { emoji: '🔬', title: 'Physics-Accurate', desc: 'Real BEM solver. GPU-accelerated. Not approximations.' },
  { emoji: '🌀', title: 'Playful by Design', desc: 'Sliders, morphs, prompts. Experimentation over configuration.' },
  { emoji: '🦊', title: 'Non-Human Ready', desc: 'Fox ears, dragon horns, alien antennae — HRTF for every creature.' },
  { emoji: '📦', title: 'Export Everything', desc: 'WebXR, visionOS, ARCore, Unity, Unreal — one click.' },
  { emoji: '🗣️', title: 'Translation Layer', desc: 'Plain English → BEM/HOA/WFS parameters. AI-assisted creation.' },
  { emoji: '🌱', title: 'Regenerative', desc: 'Non-coercive, open, low-friction. You own every asset you make.' },
];

export default function PillarsSection() {
  return (
    <section className="px-6 py-24">
      <h2 className="text-4xl font-black text-center text-white mb-16">The Six Pillars</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {pillars.map((p) => (
          <ShytechNeoSkeuoCard key={p.title} material="glass" variant="dormant">
            <div className="text-4xl mb-3">{p.emoji}</div>
            <h3 className="text-lg font-bold text-lumina-lit mb-2">{p.title}</h3>
            <p className="text-gray-400 text-sm">{p.desc}</p>
          </ShytechNeoSkeuoCard>
        ))}
      </div>
    </section>
  );
}
