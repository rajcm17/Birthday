import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MEMORIES } from '../data/config';
import Lightbox from './Lightbox';

const Page = ({ children }) => (
  <div className="min-h-screen w-full bg-pink-400/70 text-gray-100">
    <div className="mx-auto max-w-6xl px-4 py-12">{children}</div>
  </div>
);

export default function Memories({
  progress,
  allViewed,
  viewed,
  lightbox,
  setLightbox,
  markViewed,
  onNext,
}) {
  return (
    <Page>
      <motion.div
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.04, delayChildren: 0.06 } },
        }}
        className="space-y-6"
      >
        <div className="flex items-center justify-between gap-4 bg-pink-700/50 p-4 rounded-2xl border border-pink-300/30">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">Memories Gallery</h2>
          </div>

          <div className="text-lg text-gray-600">
            Viewed: <span className="font-semibold">{viewed.filter(Boolean).length}</span>/{MEMORIES.length}
          </div>
        </div>

        <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-pink-500 to-sky-500"
            style={{ width: `${progress}%` }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ type: 'spring', stiffness: 120, damping: 18 }}
          />
        </div>

        <div className="grid grid-cols-4 gap-4">
          {MEMORIES.map((m, idx) => (
            <motion.button
              key={idx}
              onClick={() => setLightbox(idx)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              variants={{
                hidden: { opacity: 0, y: 8 },
                show: { opacity: 1, y: 0 },
              }}
              className="relative group rounded-xl overflow-hidden shadow-lg border bg-white/10"
              aria-label={`Open memory ${idx + 1}`}
              style={{ minHeight: 140, height: 140 }}
            >
              <div
                className="absolute inset-0 bg-center bg-cover transform transition-all duration-500 filter blur-3xl group-hover:blur-sm scale-90 group-hover:scale-100"
                style={{
                  backgroundImage: `url('${m.src}')`,
                  backgroundPosition: 'center top',
                }}
                aria-hidden
              />

              <img
                src={m.src}
                alt={m.caption}
                className="relative w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500 object-top"
                style={{ height: 140 }}
                draggable={false}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70" />

              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold bg-white/85 text-pink-600 border"
                    aria-hidden
                  >
                    {idx + 1}
                  </div>
                  <div className="text-left">
                    <div className="text-sm text-white font-medium leading-tight truncate">{m.caption}</div>
                    <div className="text-xs text-white/80 mt-0.5 truncate">{m.message ? m.message : ''}</div>
                  </div>
                </div>

                <div className="text-white text-sm">
                  {viewed[idx] ? <span title="Viewed">✅</span> : <span title="Unviewed">🖼️</span>}
                </div>
              </div>

              {!viewed[idx] && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.12 }}
                  className="absolute top-2 right-2"
                >
                  <div className="px-2 py-1 rounded-full bg-white/90 text-pink-600 text-xs font-semibold shadow">
                    New
                  </div>
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>

        <div className="flex items-center justify-between gap-4">
          <div />
          <div>
            <button
              disabled={!allViewed}
              onClick={onNext}
              className={`rounded-2xl px-6 py-3 font-semibold shadow ${
                allViewed ? 'bg-emerald-500 text-white hover:shadow-md' : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
            >
              Proceed to the surprise →
            </button>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {Number.isInteger(lightbox) && (
          <Lightbox key={`light-${lightbox}`} idx={lightbox} onClose={() => setLightbox(null)} onViewed={() => markViewed(lightbox)} />
        )}
      </AnimatePresence>
    </Page>
  );
}
