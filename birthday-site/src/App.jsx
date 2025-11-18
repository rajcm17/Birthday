import React from 'react';
import { AnimatePresence } from 'framer-motion';
import Landing from './components/Landing';
import Memories from './components/Memories';
import SurpriseGate from './components/SurpriseGate';
import Reveal from './components/Reveal';
import EndPage from './components/EndPage';
import { MEMORIES } from './data/config';

export default function App() {
  const [step, setStep] = React.useState(0); // 0: landing, 1: memories, 2: gate, 3: reveal, 4: end
  const [viewed, setViewed] = React.useState(Array(MEMORIES.length).fill(false));
  const [lightbox, setLightbox] = React.useState(null); // index

  const progress = Math.round((viewed.filter(Boolean).length / MEMORIES.length) * 100);
  const allViewed = viewed.every(Boolean);

  function markViewed(idx) {
    setViewed((v) => v.map((b, i) => (i === idx ? true : b)));
  }

  function resetExperience() {
    setViewed(Array(MEMORIES.length).fill(false));
    setLightbox(null);
    setStep(0);
  }

  return (
    <AnimatePresence mode="wait">
      {step === 0 && <Landing onStart={() => setStep(1)} />}
      {step === 1 && (
        <Memories
          progress={progress}
          allViewed={allViewed}
          viewed={viewed}
          lightbox={lightbox}
          setLightbox={setLightbox}
          markViewed={markViewed}
          onNext={() => setStep(2)}
        />
      )}
      {step === 2 && <SurpriseGate onReveal={() => setStep(3)} />}
      {step === 3 && <Reveal onFinish={() => setStep(4)} />}
      {step === 4 && <EndPage onReplay={resetExperience} />}
    </AnimatePresence>
  );
}
