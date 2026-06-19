"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
    {
        bg: "/bg1.jpg",
        title: "Discover Thousands of Books",
        desc: "Find your next favorite read from curated collections.",
        books: ["/b1.jpg", "/b2.jpg", "/b3.jpg"],
    },
    {
        bg: "/bg2.jpg",
        title: "Best Sellers Worldwide",
        desc: "Trending books loved by readers everywhere.",
        books: ["/b4.jpg", "/b5.jpg", "/b6.jpg"],
    },
    {
        bg: "/bg3.jpg",
        title: "Read. Learn. Grow.",
        desc: "Books that shape your knowledge and imagination.",
        books: ["/b7.jpg", "/b8.jpg", "/b9.jpg"],
    },
];

export default function HeroSlider() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % slides.length);
        }, 6000);

        return () => clearInterval(interval);
    }, []);

    const slide = slides[index];

    return (
        <div className="relative h-[80vh] w-full overflow-hidden">

            {/* 🌄 BACKGROUND */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={slide.bg}
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${slide.bg})` }}
                    initial={{ opacity: 0, scale: 1.08 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                />
            </AnimatePresence>

            {/* DARK OVERLAY */}
            <div className="absolute inset-0 bg-black/50" />

            {/* CONTENT WRAPPER */}
            <div className="relative z-10 flex items-center gap-20 h-full px-10 md:px-20 container mx-auto">

                {/* LEFT TEXT */}
                <div className="w-full md:w-1/2 text-white">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={slide.title}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -40 }}
                            transition={{ duration: 0.6 }}
                        >
                            <motion.h1
                                className="text-4xl md:text-5xl font-bold leading-tight"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                {slide.title}
                            </motion.h1>

                            <motion.p
                                className="mt-4 text-gray-200 text-lg"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.35 }}
                            >
                                {slide.desc}
                            </motion.p>

                            <motion.button
                                className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                            >
                                Browse Books
                            </motion.button>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* RIGHT BOOK STACK */}
                <div className="hidden md:flex w-1/2 justify-end">
                    <div className="relative w-64 h-80">
                        <AnimatePresence mode="wait">
                            <motion.div key={slide.title} className="absolute inset-0">
                                {slide.books.map((book, i) => {
                                    const offset = i * 18;   // px shift per card
                                    const rotate = i * 6;    // degree rotation per card

                                    return (
                                        <motion.img
                                            key={book}
                                            src={book}
                                            alt="book"
                                            className="absolute top-0 left-0 w-60 h-80 object-cover rounded-xl shadow-2xl border-4 border-white"
                                            style={{ zIndex: slide.books.length - i }}
                                            initial={{ opacity: 0, x: offset + 60, y: -offset - 20, rotate: rotate + 15, scale: 0.9 }}
                                            animate={{ opacity: 1, x: offset, y: -offset, rotate, scale: 1 }}
                                            exit={{ opacity: 0, x: offset - 60, rotate: rotate - 15, scale: 0.9 }}
                                            transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
                                        />
                                    );
                                })}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

            </div>
        </div>
    );
}