import React from "react";
import { motion } from "framer-motion";
import { FRIEND } from "../data/config";

const Page = ({ children }) => (
  <div
    className="min-h-screen w-full flex items-center justify-center px-4 py-12"
    style={{
      background: "linear-gradient(180deg, #fff5f8 0%, #ffe1ec 50%, #ffd0e3 100%)",
      color: "#4b1a2f",
      fontFamily: "Inter, sans-serif",
    }}
  >
    <div className="w-full max-w-3xl">{children}</div>
  </div>
);

export default function EndPage({ onReplay }) {
  return (
    <Page>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white/80 rounded-3xl shadow-2xl border border-rose-100/80 px-8 py-10 text-center space-y-6"
      >
        <motion.h2
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-3xl md:text-4xl font-extrabold text-rose-600"
        >
          With all your Memory, {FRIEND.name} 💗
        </motion.h2>

        <p className="text-lg leading-relaxed text-gray-700">
         ಈ ನೆನಪಿನ ಪ್ರಯಾಣ ನನ್ನಿಗಿಂತ ನಿನ್ನದ್ದೇ ಹೆಚ್ಚು ವಿಶೇಷ.
ಪ್ರತಿ ನಗು, ಪ್ರತಿ ಕ್ಷಣ, ಪ್ರತಿ little memory—ನಮ್ಮದು.
ಯಾವಾಗ ಬೇಕಾದರೂ ಇದ್ರಲ್ಲಿ ಒಮ್ಮೆ ನೋಡೋ…
ನೀನು ಎಷ್ಟು special,ಅನ್ನೋದು ನೆನಪಾಗುತ್ತೆ.
        </p>

        <div className="grid gap-4 text-left md:grid-cols-2">
          <div className="rounded-2xl bg-rose-50 p-4 border border-rose-100">
            <h3 className="text-base font-semibold text-rose-600">Remember</h3>
            <p className="text-sm text-gray-600 mt-1">
              You are cherished far beyond birthdays. I’m cheering for you today, tomorrow, and
              always.
            </p>
          </div>
          <div className="rounded-2xl bg-rose-50 p-4 border border-rose-100">
            <h3 className="text-base font-semibold text-rose-600">Next adventure</h3>
            <p className="text-sm text-gray-600 mt-1">
            </> <b> Keep this link </p>b>handy for tough days, and let’s create new stories to add very soon.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-base text-gray-600">Want to experience it again?</p>
          <button
            onClick={onReplay}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold shadow-lg hover:shadow-xl transition"
          >
            Replay from the beginning ↺
          </button>
        </div>
      </motion.div>
    </Page>
  );
}

