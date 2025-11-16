import React from 'react';
import { motion } from 'framer-motion';
import { FRIEND } from '../data/config';
import AnimatedEmojiRain from "./AnimatedEmojiRain";

/* ---------------------------- Page Wrapper ---------------------------- */

const Page = ({ children }) => (
  <div
    className="min-h-screen w-full flex items-center justify-center px-4"
    style={{
      background: "linear-gradient(180deg, #2a0013 0%, #680034 40%, #ff4fa0 100%)",
      fontFamily: "Inter, sans-serif",
      color: "white",
    }}
  >
    {children}
  </div>
);

/* ---------------------------- Glass Card ---------------------------- */

const GlassCard = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20, scale: 0.97 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.7, ease: "easeOut" }}
    className="w-full max-w-3xl p-8 rounded-3xl"
    style={{
      background: "rgba(255, 255, 255, 0.08)",
      backdropFilter: "blur(18px) saturate(180%)",
      WebkitBackdropFilter: "blur(18px) saturate(180%)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      boxShadow: "0 20px 50px rgba(0,0,0,0.45)",
    }}
  >
    {children}
  </motion.div>
);

/* -------------------------- Component -------------------------- */

export default function Reveal() {
  const [typed, setTyped] = React.useState("");

  const full = `
Happy Birthday, ${FRIEND.name} 💗

There are people who make days brighter just by being in them — 
and you are absolutely one of those rare people.

Thank you for the laughter you bring, 
the softness you carry, 
and the way your presence makes every little moment feel warm.  

You deserve all the love, all the joy, 
and every beautiful thing this life has to offer.

Today is about you — your smile, your light, your magic.
  `;

  /* Typing Effect */
  React.useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      setTyped(full.slice(0, i++));
      if (i > full.length) clearInterval(id);
    }, 22);
    return () => clearInterval(id);
  }, []);

  return (
    <Page>
      <AnimatedEmojiRain />
      <div className="relative max-w-4xl mx-auto w-full text-center space-y-10">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text"
          style={{
            backgroundImage:
              "linear-gradient(90deg, #ffd6e7 0%, #ff9fcf 45%, #ff73b7 100%)",
            textShadow: "0 8px 20px rgba(255,130,180,0.5)",
          }}
        >
          Your Birthday Wish ✨
        </motion.h2>

        {/* Glass Card with Typed Wish */}
        <GlassCard>
          <motion.pre
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="whitespace-pre-wrap text-left text-lg md:text-xl leading-relaxed font-medium tracking-wide"
            style={{ color: "rgba(255,255,255,0.92)" }}
          >
            {typed}
          </motion.pre>
        </GlassCard>

        {/* Soft Glow Bottom Line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 1.6 }}
          className="h-1 w-32 mx-auto rounded-full"
          style={{
            background:
              "linear-gradient(90deg, #ffb5d9, #ff8cc5, #ff5bab)",
            boxShadow: "0 0 16px rgba(255, 120, 180, 0.6)",
          }}
        />

      </div>
    </Page>
  );
}
