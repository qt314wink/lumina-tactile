import Hero from '@/components/Hero';
import ScrollyJourney from '@/components/ScrollyJourney';
import PlayLab from '@/components/PlayLab';
import MeshLab from '@/components/MeshLab';
import AvatarSensoryStudio from '@/components/AvatarSensoryStudio';
import VRARProductLab from '@/components/VRARProductLab';
import AudioMixingInteractiveLab from '@/components/AudioMixingInteractiveLab';
import HRTFPersonalizationLab from '@/components/HRTFPersonalizationLab';
import SensoryExportDashboard from '@/components/SensoryExportDashboard';
import ManifestoSection from '@/components/ManifestoSection';
import PillarsSection from '@/components/PillarsSection';
import SatisfactionFlow from '@/components/SatisfactionFlow';

export default function Home() {
  return (
    <main className="min-h-screen bg-lumina-dark">
      <Hero />
      <ScrollyJourney>
        <section className="journey-section"><PlayLab /></section>
        <section className="journey-section"><MeshLab /></section>
        <section className="journey-section"><AvatarSensoryStudio /></section>
        <section className="journey-section"><VRARProductLab /></section>
        <section className="journey-section"><AudioMixingInteractiveLab /></section>
        <section className="journey-section"><HRTFPersonalizationLab /></section>
        <section className="journey-section"><ManifestoSection /></section>
        <section className="journey-section"><PillarsSection /></section>
        <section className="journey-section"><SensoryExportDashboard /></section>
        <SatisfactionFlow />
      </ScrollyJourney>
    </main>
  );
}
