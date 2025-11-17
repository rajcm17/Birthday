import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FRIEND, SECRET } from '../data/config';

/* ------------------------------ Page Wrapper ------------------------------ */

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

/* ------------------------------ Glass Card ------------------------------ */

const GlassCard = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20, scale: 0.97 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className="w-full max-w-2xl rounded-3xl p-8"
    style={{
      background: "rgba(255, 255, 255, 0.08)",
      backdropFilter: "blur(18px) saturate(180%)",
      WebkitBackdropFilter: "blur(18px) saturate(180%)",
      border: "1px solid rgba(255, 255, 255, 0.25)",
      boxShadow: "0 20px 50px rgba(0,0,0,0.4)",
    }}
  >
    {children}
  </motion.div>
);

/* ------------------------------ Page Component ------------------------------ */

export default function SurpriseGate({ onReveal }) {
  const [stage, setStage] = React.useState(1);
  const [code, setCode] = React.useState("");
  const [codeOk, setCodeOk] = React.useState(false);

  const [answer, setAnswer] = React.useState(null);
  const [riddleOk, setRiddleOk] = React.useState(false);

  const [charge, setCharge] = React.useState(0);
  const [charging, setCharging] = React.useState(false);

  /* ------------------------------ Effects ------------------------------ */

  // Charging bar logic
  React.useEffect(() => {
    let id;
    if (charging && charge < 100) {
      id = setInterval(() => setCharge(c => Math.min(100, c + 2)), 45);
    }
    return () => clearInterval(id);
  }, [charging, charge]);

  // Secret nickname lock
  React.useEffect(() => {
    const ok = code.trim().toLowerCase() === SECRET;
    setCodeOk(ok);

    if (ok) {
      setTimeout(() => setStage(2), 700);
    }
  }, [code]);

  // Riddle lock
  React.useEffect(() => {
    if (answer === "a") {
      setRiddleOk(true);
      setTimeout(() => setStage(3), 700);
    } else if (answer) {
      setRiddleOk(false);
    }
  }, [answer]);

  const allGood = codeOk && riddleOk && charge >= 100;

  const sectionAnim = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: "easeOut" } },
  };

  /* ------------------------------ UI Rendering ------------------------------ */

  return (
    <Page>
      <GlassCard>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6"
        >
          <h2
            className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text"
            style={{
              backgroundImage: "linear-gradient(90deg,#ffb7d5,#ff94c2,#ff62a8)",
              textShadow: "0 4px 16px rgba(255,120,164,0.45)",
            }}
          >
            The Surprise Vault 🔐
          </h2>

          <p className="text-pink-100/80 text-sm mt-2">
            Each lock hides a tiny mystery. Solve them one by one 💫
          </p>
        </motion.div>

        {/* ---------------- Stage 1: Nickname ---------------- */}
        <AnimatePresence>
          {stage === 1 && (
            <motion.div
              variants={sectionAnim}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="space-y-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-pink-600/40 text-white font-bold">1</div>
                <div>
                  <div className="font-semibold text-lg">✨ Your secret nickname</div>
                  <div className="text-sm text-pink-100/80">
                    Type the name I lovingly call you the most.
                  </div>
                </div>
              </div>

              <input
                type="password"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Your secret nickname..."
                className="w-full px-4 py-3 rounded-xl bg-white/90 text-gray-900 font-medium outline-none shadow focus:ring-2 focus:ring-pink-400"
              />

              <div className="text-sm" style={{ color: codeOk ? "#10b981" : "#ffd6e5" }}>
                {codeOk ? "Correct ✨" : code ? "Hmm… not this one" : ""}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ---------------- Stage 2: Riddle ---------------- */}
        <AnimatePresence>
          {stage === 2 && (
            <motion.div
              variants={sectionAnim}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="space-y-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-pink-600/40 text-white font-bold">2</div>
                <div>
                  <div className="font-semibold text-lg">💭 A tiny riddle</div>
                  <div className="text-sm text-pink-100/80">
                    Choose wisely — only one feels like *us*.
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/10 text-sm text-pink-50">
                <strong>Riddle:</strong> 🫣ನಿನ್ನ ಯಾವ ಫೋಟೋ ನನಗೆ ಬಹಳ ಇಷ್ಟ  .....?🤔  </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { k: "a", t: "with saree" },
                  { k: "b", t: "with joodi daar" },
                  { k: "c", t: "Langa davani" },
                ].map((opt) => (
                  <motion.button
                    key={opt.k}
                    onClick={() => setAnswer(opt.k)}
                    whileTap={{ scale: 0.97 }}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold shadow transition 
                     ${answer === opt.k ? "bg-rose-500 text-white" : "bg-white/10 text-pink-50 border border-white/10"}`}
                  >
                    {opt.t}
                  </motion.button>
                ))}
              </div>

              <div className="text-sm" style={{ color: riddleOk ? "#10b981" : "#ffd6e5" }}>
                {riddleOk ? "Aww yes! That’s the one 💗" : answer ? "Try again 💫" : ""}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ---------------- Stage 3: Charging ---------------- */}
        <AnimatePresence>
          {stage === 3 && (
            <motion.div
              variants={sectionAnim}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="space-y-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-pink-600/40 text-white font-bold">3</div>
                <div>
                  <div className="font-semibold text-lg">⚡ Power the vault</div>
                  <div className="text-sm text-pink-100/80">
                    Hold the button until the energy bar fills completely.
                  </div>
                </div>
              </div>

              <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-amber-400 to-pink-500"
                  style={{ width: `${charge}%` }}
                />
              </div>

              <div className="flex gap-3">
                <button
                  onMouseDown={() => setCharging(true)}
                  onMouseUp={() => setCharging(false)}
                  onMouseLeave={() => setCharging(false)}
                  onTouchStart={() => setCharging(true)}
                  onTouchEnd={() => setCharging(false)}
                  className="px-4 py-2 bg-rose-500 text-white rounded-xl shadow font-semibold active:scale-95"
                >
                  {charging ? "Charging…" : "Press & hold"}
                </button>

                <button
                  onClick={() => setCharge(0)}
                  className="px-4 py-2 rounded-xl bg-white/10 border"
                >
                  Reset
                </button>
              </div>

              <div className="text-sm">
                {charge >= 100 ? "Fully charged! ✨" : `${charge}%`}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ---------------- Unlock Button ---------------- */}
        <motion.button
          whileHover={{ scale: allGood ? 1.03 : 1 }}
          whileTap={{ scale: allGood ? 0.97 : 1 }}
          onClick={() => allGood && onReveal()}
          disabled={!allGood}
          className={`mt-6 w-full py-3 rounded-2xl font-semibold shadow-lg transition 
            ${
              allGood
                ? "bg-gradient-to-r from-pink-400 to-rose-500 text-white shadow-pink-500/40 hover:shadow-pink-500/60"
                : "bg-white/10 text-white/40 cursor-not-allowed"
            }`}
        >
          {allGood ? "Unlock the birthday wish →" : "Complete all locks to unlock"}
        </motion.button>

      </GlassCard>
    </Page>
  );
}
