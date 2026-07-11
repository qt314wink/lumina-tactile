# Lumina Tactile Renaissance

> The future isn't flat — and now you can design how it sounds. 🌀

**Tactile Renaissance Manifesto-Aligned | 2027 Multi-Sensory Pioneer Positioning**

A fully modular, multi-sensory spatial audio design system built on real BEM physics,
non-human avatar HRTF, HOA/WFS binaural mixing, AR product placement, and one-click
cross-platform exports (WebXR, visionOS, ARCore, Unity, Unreal).

---

## Tech Stack

- **Next.js 15** (App Router)
- **Tailwind CSS** with Neo-Skeuomorphic design tokens
- **Framer Motion** (spring physics, spring stiffness 280 / damping 28)
- **GSAP + ScrollTrigger** (scrollytelling)
- **Three.js / React Three Fiber** (3D + spatial positioning)
- **Web Audio API** (spatial audio + convolution reverb for HRTF)
- **Mesh2HRTF** Python backend (BEM solver, GPU-accelerated)

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

> **Note:** The BEM solver backend (`app/api/mesh2hrtf/route.ts`) requires
> `mesh2hrtf` and `hrtf_personalize` Python packages installed in your environment.
> For development, the API routes return mock SOFA URLs so the frontend runs independently.

---

## Phase Map

| Phase | Feature |
|-------|---------|
| 1 | Mesh2HRTF Core Engine (BEM solver, Translation Layer, MeshLab) |
| 2 | Non-Human Avatar HRTF Studio |
| 3 | VR/AR Product Lab + Audio Mixing Interactive Lab (HOA/WFS/binaural) |
| 4 | HRTF Personalization Lab + Sensory Export Dashboard |
| 5 | Figma + Framer Full Integration |
| 6 | Full Wiring, Animations, GSAP ScrollTrigger, Triple Check |
| 7 | Final Deliverables, Gumroad Tiers, Visual/Ad Prompts |

---

## Directory Structure

```
lumina-tactile/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   └── api/
│       ├── mesh2hrtf/route.ts
│       └── hrtf-personalize/route.ts
├── components/
│   ├── LightProvider.tsx
│   ├── MobileGyroLight.tsx
│   ├── HapticsProvider.tsx
│   ├── SpatialAudioProvider.tsx
│   ├── ShytechNav.tsx
│   ├── Hero.tsx
│   ├── ScrollyJourney.tsx
│   ├── MeshLab.tsx
│   ├── AvatarSensoryStudio.tsx
│   ├── VRARProductLab.tsx
│   ├── AudioMixingInteractiveLab.tsx
│   ├── HRTFPersonalizationLab.tsx
│   ├── SensoryExportDashboard.tsx
│   ├── PlayLab.tsx
│   ├── ManifestoSection.tsx
│   ├── PillarsSection.tsx
│   ├── SatisfactionFlow.tsx
│   └── ShytechNeoSkeuoCard.tsx
├── lib/
│   ├── haptics.ts
│   └── mobileUtils.ts
├── public/
│   └── sounds/ (wood-click.mp3, metal-click.mp3, glass-chime.mp3)
├── README.md
├── package.json
├── tailwind.config.ts
└── next.config.mjs
```

---

## Gumroad Tiers

| Tier | Price | Includes |
|------|-------|----------|
| Free Teaser | $0 | Mesh Lab preview + basic HRTF test tones |
| Core System | $79 | Full engine, Avatar Studio, Mixing Lab, Translation Layer, Figma/Framer assets |
| XR Pro Bundle | $149 | Core + visionOS/ARCore templates, WFS simulator, binaural stems, HRTF upsampling |
| Enterprise | $499/yr | All above + white-label, unlimited GPU credits, private support |

---

## License

MIT — own every asset you make.
