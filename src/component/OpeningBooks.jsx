"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function OpeningBook({ onFinish }) {
  const [stage, setStage] = useState("closed"); // closed -> opening -> textOut

  useEffect(() => {
    const t1 = setTimeout(() => setStage("opening"), 400);
    const t2 = setTimeout(() => setStage("textOut"), 1400);
    const t3 = setTimeout(() => onFinish(), 3200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onFinish]);

  const open = stage === "opening" || stage === "textOut";
  const showText = stage === "textOut";

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-[#EEF2FF] z-50"
      exit={{ opacity: 0, transition: { duration: 0.6 } }}
    >
      <div className="relative" style={{ perspective: 1200 }}>
        {/* Glow */}
        <motion.div
          className="absolute inset-0 bg-blue-300 blur-3xl rounded-full"
          animate={{ opacity: open ? 0.55 : 0.2, scale: open ? 1.3 : 1 }}
          transition={{ duration: 1 }}
        />

        {/* Book */}
        <div className="relative w-64 h-80 bg-white rounded-md shadow-2xl flex items-center justify-center">
          <motion.div
            className="absolute inset-0 bg-[#0A1F5C] rounded-md shadow-2xl origin-left"
            style={{ transformStyle: "preserve-3d" }}
            animate={{ rotateY: open ? -150 : 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            <div className="p-4 text-white font-bold h-full flex flex-col justify-center items-center">
              <span className="text-xl tracking-wide">BookSphere</span>
              <span className="text-xs text-blue-200 mt-2">Read. Order. Deliver.</span>
            </div>
          </motion.div>
        </div>

        {/* Text rising out of the opened book */}
        <AnimatePresence>
          {showText && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: -60, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="absolute left-1/2 -translate-x-1/2 top-0 text-center whitespace-nowrap"
            >
              <h1 className="text-3xl font-bold text-[#0A1F5C]">BookSphere</h1>
              <p className="text-sm text-gray-500 mt-1">Read. Order. Deliver.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}