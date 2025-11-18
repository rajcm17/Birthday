import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FRIEND, MAIN_MESSAGE } from "../data/config";

/**
 * Landing.jsx
 * - Place background image in: /public/bg-balloons.png (or change BG)
 * - Place audio in: /public/song.mp3 (or change AUDIO_SRC)
 */

const AUDIO_SRC = "/song.mp3";
const BG = "/bg.jpeg";

const Page = ({ children }) => (
  <div
    className="min-h-screen w-full text-gray-900 relative overflow-hidden"
    style={{ background: "linear-gradient(180deg,#fff0f6,#fffaf6)" }}
  >
    {/* background container (animated blur applied via framer-motion) */}
    <motion.div
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
      initial={{ filter: "blur(20px) saturate(1.05) contrast(1.02) brightness(0.9)" }}
      animate={{ filter: "blur(20px) saturate(1.05) contrast(1.02) brightness(0.9)" }}
      transition={{ duration: 0.8 }}
      id="bg-layer"
      style={{
        backgroundImage: `url('${BG}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    />
    {/* overlay to ensure legibility */}
    <motion.div
      className="absolute inset-0"
      initial={{ background: "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.65))" }}
      animate={{ background: "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.65))" }}
      style={{ mixBlendMode: "normal" }}
    />
    <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
      {children}
    </div>
  </div>
);

const GlassCard = ({ children, className = "" }) => (
  <div
    className={
      "rounded-2xl bg-white/30 border border-white/30 backdrop-blur-md p-6 max-w-2xl w-full " +
      className
    }
    style={{
      boxShadow: "0 28px 60px rgba(16,24,40,0.12), inset 0 1px 0 rgba(255,255,255,0.05)",
      WebkitBackdropFilter: "blur(12px)",
      backdropFilter: "blur(12px)",
    }}
  >
    {children}
  </div>
);

export default function Landing({ onStart }) {
  const audioRef = React.useRef(null);
  const [playing, setPlaying] = React.useState(false);
  const [typed, setTyped] = React.useState("");
  const [showStart, setShowStart] = React.useState(true); // Start visible immediately
  const [autoplayBlocked, setAutoplayBlocked] = React.useState(false);
  const [bgBlur, setBgBlur] = React.useState(20); // px, initial heavy blur

  // message & typing setup
  const fullText = MAIN_MESSAGE.trim();
  // calculate interval such that full text finishes ~20 seconds (20000ms)
  const totalMs = 24000;
  const perCharMs = Math.max(12, Math.floor(totalMs / Math.max(1, fullText.length)));

  // typed animation: we start typing only after startPressed
  const typingTimerRef = React.useRef(null);

  // attempt quiet autoplay on load (muted play -> unmute) — may be blocked by browser
  React.useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.6;
    audio.loop = true;
    // try muted play to satisfy autoplay policies on some browsers
    audio.muted = true;
    audio
      .play()
      .then(() => {
        // keep it muted until user presses start; we don't unmute here to respect UX
        audio.pause(); // pause it because user hasn't started
        audio.currentTime = 0;
        audio.muted = true;
        setAutoplayBlocked(false);
      })
      .catch(() => {
        setAutoplayBlocked(true);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // function to begin the experience
  async function startExperience() {
    const audio = audioRef.current;
    // unblur background
    setBgBlur(2);
    // hide Start button
    setShowStart(false);

    if (audio) {
      audio.muted = false;
      audio.volume = 0.6;
      try {
        await audio.play();
        setPlaying(true);
        setAutoplayBlocked(false);
      } catch (err) {
        // if blocked, show hint so user can tap anywhere
        setAutoplayBlocked(true);
      }
    }

    // start typing from scratch
    setTyped("");
    if (typingTimerRef.current) {
      clearInterval(typingTimerRef.current);
    }

    let i = 0;
    typingTimerRef.current = setInterval(() => {
      i += 1;
      setTyped(fullText.slice(0, i));
      if (i >= fullText.length) {
        clearInterval(typingTimerRef.current);
        typingTimerRef.current = null;
      }
    }, perCharMs);
    // call parent onStart after small delay so the flow continues later as needed
    if (onStart) {
      // call onStart only after the type animation completes (20s)
      setTimeout(() => onStart(), totalMs + 500);
    }
  }

  // If autoplay was blocked, allow enabling audio by any user tap/click anywhere
  function enableAudioOnGesture() {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = false;
    audio.volume = 0.6;
    audio
      .play()
      .then(() => {
        setPlaying(true);
        setAutoplayBlocked(false);
      })
      .catch(() => {
        setAutoplayBlocked(true);
      });
  }

  // Cleanup interval on unmount
  React.useEffect(() => {
    return () => {
      if (typingTimerRef.current) clearInterval(typingTimerRef.current);
    };
  }, []);

  // pressed anywhere to enable audio if blocked (keeps UI minimal)
  React.useEffect(() => {
    function onAnyClick() {
      if (autoplayBlocked) enableAudioOnGesture();
    }
    window.addEventListener("click", onAnyClick);
    window.addEventListener("touchstart", onAnyClick);
    return () => {
      window.removeEventListener("click", onAnyClick);
      window.removeEventListener("touchstart", onAnyClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoplayBlocked]);

  // Title styling: load 'Great Vibes' from Google Fonts and apply gradient + glow
  // We inject font import and extra CSS for glow + caret
  const titleGradient = {
    background: "linear-gradient(90deg,#ffd6ea 0%,  #b91045ff 50%, #d92a6b 100%)",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
    textShadow: "0 7px 20px rgba(0, 0, 0, 0.18), 0 2px 6px rgba(255,255,255,0.12)",
  };

  return (
    <Page>
      {/* hidden audio element */}
      <audio ref={audioRef} src={AUDIO_SRC} preload="auto" style={{ display: "none" }} />

      {/* animated background blur control */}
      <motion.div
        aria-hidden
        style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}
        animate={{ filter: `blur(${bgBlur}px) saturate(1.05) contrast(1.02) brightness(0.95)` }}
        transition={{ duration: 0.9, ease: "easeInOut" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-20 flex flex-col items-center gap-6 text-center px-4 w-full"
        style={{ maxWidth: 980 }}
      >
        {/* beautiful welcome name */}
        <div className="mb-1">
          <div className="text-4xl md:text-5xl font-semibold tracking-tight" style={{ lineHeight: 1.1 }}>
            <span style={titleGradient}>Hey {FRIEND.name} ✨</span>
          </div>

          <div
            className="mt-2"
            style={{
              fontSize: "1.15rem",
              fontWeight: 600,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              background: "linear-gradient(90deg,#ffdfe9 0%,#ff9fc1 50%,#d93a74 100%)",
              textShadow: "0 6px 14px rgba(217,42,107,0.14)",
            }}
          >
            Welcome to our memories recap 💖
          </div>
        </div>

        {/* Glass card with typed message */}
        <GlassCard className="mx-auto text-left">
          <div className="text-lg md:text-xl leading-relaxed font-medium text-gray-900">
            <div style={{ color: "rgba(20,20,20,0.95)", whiteSpace: "pre-wrap" }}>
              {typed}
              {/* caret while still typing */}
              {typed.length < fullText.length && (
                <span
                  style={{
                    display: "inline-block",
                    width: 2,
                    height: "1.05em",
                    background: "#e11d6e",
                    marginLeft: 6,
                    borderRadius: 1,
                    verticalAlign: "middle",
                  }}
                  className="animate-pulse"
                />
              )}
            </div>
          </div>

        
          <div className="mt-6 flex justify-center">
            {showStart ? (
              <button
                onClick={startExperience}
                className="rounded-2xl bg-gradient-to-r from-pink-400 to-rose-500 text-white px-6 py-3 font-semibold shadow-lg hover:shadow-2xl active:scale-[0.99] transition"
              >
                Start the recap →
              </button>
            ) : (
              <div className="text-sm text-gray-600">Enjoying the surprise…</div>
            )}
          </div>
        </GlassCard>

        <div className="mt-4 select-none" style={{ fontSize: 24, filter: "drop-shadow(0 6px 18px rgba(0,0,0,0.06))" }}>
          Surprise loading for you
        </div>
      </motion.div>
    </Page>
  );
}
