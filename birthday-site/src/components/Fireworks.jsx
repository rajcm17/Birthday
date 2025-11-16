import React from 'react';
import { motion } from 'framer-motion';

export default function Fireworks() {
  const [bursts, setBursts] = React.useState([]);
  React.useEffect(() => {
    const arr = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 40 + 10,
      d: Math.random() * 1 + 0.6,
      s: Math.random() * 0.6 + 0.8,
      e: ['🎉', '✨', '🎈', '💫'][Math.floor(Math.random() * 4)],
    }));
    setBursts(arr);
  }, []);
  return (
    <div className="relative h-24 overflow-visible">
      {bursts.map((b) => (
        <motion.span
          key={b.id}
          initial={{ opacity: 0, y: 0, scale: 0.6 }}
          animate={{ opacity: 1, y: -40, scale: b.s }}
          transition={{ duration: b.d, ease: 'easeOut' }}
          className="absolute"
          style={{ left: `${b.x}%`, top: `${b.y}%` }}
        >
          {b.e}
        </motion.span>
      ))}
    </div>
  );
}
