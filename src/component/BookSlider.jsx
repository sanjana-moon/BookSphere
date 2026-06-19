"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const slides = [
  { title: "Academic Books", text: "Learn from the best academic resources.", img: "/book1.jpg" },
  { title: "Best Sellers", text: "Trending books loved worldwide.", img: "/book2.jpg" },
  { title: "Novels & Fiction", text: "Dive into imaginative worlds.", img: "/book3.jpg" },
];

export default function BookSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const slide = slides[index];

  return (
    <div className="w-full bg-[#EEF2FF]">
      <div className="flex items-center justify-between w-full max-w-6xl mx-auto p-10 min-h-[420px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            className="flex items-center justify-between w-full"
            initial="enter"
            animate="center"
            exit="exit"
          >
            <motion.div
              variants={{
                enter: { opacity: 0, x: -60 },
                center: { opacity: 1, x: 0 },
                exit: { opacity: 0, x: 60 },
              }}
              transition={{ duration: 0.6 }}
              className="w-1/2"
            >
              <h2 className="text-4xl font-bold text-[#0A1F5C]">{slide.title}</h2>
              <p className="mt-4 text-gray-600">{slide.text}</p>
              <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Browse Books
              </button>
            </motion.div>

            <motion.img
              src={slide.img}
              alt={slide.title}
              variants={{
                enter: { opacity: 0, rotateY: 90 },
                center: { opacity: 1, rotateY: 0 },
                exit: { opacity: 0, rotateY: -90 },
              }}
              transition={{ duration: 0.7 }}
              className="w-80 h-96 object-cover rounded-xl shadow-xl"
              style={{ transformStyle: "preserve-3d" }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-center gap-2 pb-8">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-2 rounded-full transition-all ${
              i === index ? "w-6 bg-blue-600" : "w-2 bg-blue-200"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}