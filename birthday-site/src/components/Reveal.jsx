import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FRIEND } from "../data/config";
import AnimatedEmojiRain from "./AnimatedEmojiRain";

const MUSIC_SRC = "./last.mp3"; // update path if needed

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
    exit={{ opacity: 0, y: 10, scale: 0.995 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
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
export default function Reveal({ onFinish }) {
  const [typed, setTyped] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);
  const audioRef = React.useRef(null);
  const typingTimerRef = React.useRef(null);

  const full = `
🎀🌸✨ Happy Birthday, ${FRIEND.name} 💗🌼🥳
ಗೆಳತಿ 
🌈 ಏಳು ಬಣ್ಣಗಳಿಂದ ಕಾಮನಬಿಲ್ಲಿಗೆ
      ಅಂದ ಹೆಚ್ಚು ....😍
ಆದರೆ ಆ ಏಳು ಬಣ್ಣಗಳಿಗೆ ನನ್ನವಳ 👸
     ಅಂದ ಕಂಡು ಹೊಟ್ಟೆ ಕಿಚ್ಚು 😡

     ಅವಳು ಸ್ನೇಹಿತೆಯೋ, ಗೆಳತಿಯೊ, ಸಖಿಯೋ, ಮಾನದೊಡತಿಯೊ ನಾ ಕಾಣೆ.....
ಒಂದೊಂದು ಸಮಯಕ್ಕೆ ಅವಳ ಮನಸ್ಥಿತಿ ನನ್ನ  ಮನಸ್ಥಿತಿ ಮೇಲೆ ಬದಲಾಗುತ್ತೆ.....?

✨💫ಹುಟ್ಟು ಹಬ್ಬದ ಹಾರ್ದಿಕ ಶುಭಾಶಯಗಳು ಗೆಳತಿ 😍🎁💝
ನೂರು ವರ್ಷಗಳ ಕಾಲ ಸಂತೋಷ ನೆಮ್ಮದಿ ಇರಲಿ,
ಎಲ್ಲೇ ಇರಬೇಡ — ಯಾವಾಗಲೂ ಖುಷಿಯಾಗಿರು.....💌✨
ಮತ್ತೆ ಯಾವಾಗ್ಲೂ ಜೊತೆಯಲ್ಲಿರುವೆ 🥹🤍 My Angel👰‍♀️

Today is all about you — your smile 😊🌸, your light ✨💫, your magic that makes the world feel sweeter 💗🌼💖.
May this year bring endless blessings, unforgettable moments, and happiness that never fades 💛🎀🌈🥰.

Enjoy every moment, birthday girl! 🎉💗🌟🍰✨
`.trim();

  /* Typing + audio start when opened via button */
  React.useEffect(() => {
    if (!isOpen) return;

    // reset typed text and start typing
    setTyped("");
    let i = 0;
    clearInterval(typingTimerRef.current);
    typingTimerRef.current = setInterval(() => {
      i += 1;
      setTyped(full.slice(0, i));
      if (i >= full.length) {
        clearInterval(typingTimerRef.current);
      }
    }, 22);

    // try to play audio (user gesture already occurred by clicking the button)
    setTimeout(() => {
      const a = audioRef.current;
      if (a) {
        const p = a.play();
        if (p && p.catch) {
          p.catch(() => {
            // ignore: if playback fails, nothing more to do (autoplay restrictions)
          });
        }
      }
    }, 50);

    return () => {
      clearInterval(typingTimerRef.current);
    };
  }, [isOpen, full]);

  React.useEffect(() => {
    // cleanup on unmount
    return () => {
      clearInterval(typingTimerRef.current);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  const handleViewClick = () => {
    // toggle open/close; when opening, typing+music will start via effect
    setIsOpen((prev) => {
      const next = !prev;
      if (!next) {
        // closing: stop and reset audio + clear typing
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }
        clearInterval(typingTimerRef.current);
      }
      return next;
    });
  };

  return (
    <Page>
      <AnimatedEmojiRain />
      <div className="relative max-w-4xl mx-auto w-full text-center space-y-6">
        {/* Header */}
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

        {/* Centered View Wish button */}
        <div className="flex justify-center">
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={handleViewClick}
            className="inline-flex items-center gap-3 mt-2 bg-white/10 hover:bg-white/20 transition px-6 py-3 rounded-full text-base"
            aria-expanded={isOpen}
            aria-controls="wish-card"
          >
            {isOpen ? "Close Wish" : "View Wish"}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  isOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M15 10l4.553-2.276A2 2 0 0122 9.618v4.764a2 2 0 01-2.447 1.894L15 14v-4zM4 6v12a2 2 0 002 2h8"
                }
              />
            </svg>
          </motion.button>
        </div>

        {/* Wish Card */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              id="wish-card"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.5 }}
            >
              <GlassCard>
                <motion.pre
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.1, duration: 0.6 }}
                  className="whitespace-pre-wrap text-left text-lg md:text-xl leading-relaxed font-medium tracking-wide"
                  style={{ color: "rgba(255,255,255,0.92)" }}
                >
                  {typed}
                </motion.pre>

                {/* Hidden audio element (looped) */}
                <audio ref={audioRef} src={MUSIC_SRC} loop preload="auto" />
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Soft Glow Bottom Line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 1.6 }}
          className="h-1 w-32 mx-auto rounded-full"
          style={{
            background: "linear-gradient(90deg, #ffb5d9, #ff8cc5, #ff5bab)",
            boxShadow: "0 0 16px rgba(255, 120, 180, 0.6)",
          }}
        />

        <div className="pt-6">
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() => onFinish && onFinish()}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold shadow-lg hover:shadow-xl transition"
          >
            Continue to the finale →
          </motion.button>
        </div>
      </div>
    </Page>
  );
}
