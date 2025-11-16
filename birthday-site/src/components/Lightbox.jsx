import React from 'react';
import { motion } from 'framer-motion';
import { MEMORIES } from '../data/config';

export default function Lightbox({ idx, onClose, onViewed }) {
  const m = MEMORIES[idx];
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    // mark viewed once opened
    const t = setTimeout(() => {
      onViewed?.();
    }, 300);
    return () => clearTimeout(t);
  }, [idx, onViewed]);

  return (
    <motion.div
      className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative max-w-5xl w-full bg-transparent rounded-2xl overflow-hidden"
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* full-size image area — use object-contain to preserve full image */}
        <div className="w-full bg-black/20 flex items-center justify-center" style={{ minHeight: '60vh' }}>
          <img
            src={m.src}
            alt={m.caption}
            onLoad={() => setLoaded(true)}
            className="max-w-full max-h-[80vh] object-contain rounded-xl"
            style={{ transition: 'filter 400ms ease, transform 400ms ease' }}
            draggable={false}
          />
        </div>

        {/* caption + message panel */}
        <div className="p-4 bg-white/90 backdrop-blur-md border-t border-white/60">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-lg md:text-xl font-semibold text-gray-900">{m.caption}</h3>
              <p className="text-sm text-gray-700 mt-2 whitespace-pre-wrap">{m.message ? m.message : ''}</p>
            </div>

            <div className="flex flex-col items-end gap-2">
              <button
                onClick={onClose}
                className="rounded-full px-4 py-2 bg-pink-500 text-white font-medium shadow hover:opacity-95"
              >
                Close
              </button>
            </div>
          </div>
        </div>

        {/* small indicator while loading */}
        {!loaded && (
          <div className="absolute inset-0 grid place-items-center">
            <div className="bg-white/90 px-4 py-2 rounded-full shadow">Loading…</div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
