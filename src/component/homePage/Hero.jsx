"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import book1 from "@/component/assets/images/Book-1.avif";
import book2 from "@/component/assets/images/Book2.jpg";
import book3 from "@/component/assets/images/Book3.webp";
import book4 from "@/component/assets/images/Book4.webp";
import book5 from "@/component/assets/images/Book5.jpg";

const slides = [
    {
        bg: "https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?cs=srgb&dl=pexels-jplenio-1103970.jpg&fm=jpg",
        title: "Lose Yourself in Endless Pages",
        desc: "Unearth curated collections designed to match your mood, expand your horizons, and guide you to your next favorite story.",
    },
    {
        bg: "https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?cs=srgb&dl=pexels-jplenio-1103970.jpg&fm=jpg",
        title: "Stories the World is Reading",
        desc: "Connect with universal narratives. Dive into the chart-topping novels and acclaimed non-fiction capturing the hearts of millions across the globe.",
    },
    {
        bg: "https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?cs=srgb&dl=pexels-jplenio-1103970.jpg&fm=jpg",
        title: "Cultivate Your Inner Universe",
        desc: "Every book is a masterclass in imagination. Gather knowledge, gather perspective, and evolve with text that leaves a lasting impression.",
    },
];

const allBooks = [
    book1.src,
    book2.src,
    book3.src,
    book4.src,
    book5.src,
];

function BookStack({ books, cycleMs = 2400, exitMs = 600 }) {
    const [order, setOrder] = useState(() => books.map((_, i) => i));
    const [exitingIdx, setExitingIdx] = useState(null);
    const orderRef = useRef(order);
    orderRef.current = order;

    useEffect(() => {
        if (books.length < 2) return;

        let exitTimeoutId;
        const intervalId = setInterval(() => {
            setExitingIdx(orderRef.current[0]);

            exitTimeoutId = setTimeout(() => {
                setOrder((prev) => [...prev.slice(1), prev[0]]);
                setExitingIdx(null);
            }, exitMs);
        }, cycleMs);

        return () => {
            clearInterval(intervalId);
            clearTimeout(exitTimeoutId);
        };
    }, [books, cycleMs, exitMs]);

    return (
        <div className="relative w-60 h-80">
            {books.map((book, bookIdx) => {
                const pos = order.indexOf(bookIdx);
                const isExiting = exitingIdx === bookIdx;
                const shouldAnimate = isExiting || pos === 0;

                const target = isExiting
                    ? { opacity: 0, x: 260, y: -30, rotate: 30, scale: 0.85 }
                    : {
                        opacity: 1,
                        x: pos * 18,
                        y: -pos * 18,
                        rotate: pos * 6,
                        scale: 1,
                    };

                return (
                    <motion.img
                        key={book}
                        src={book}
                        alt="book"
                        className="absolute top-0 left-0 w-60 h-80 object-cover rounded-xl shadow-2xl border-4 border-white"
                        style={{ zIndex: books.length - pos }}
                        animate={target}
                        transition={
                            shouldAnimate
                                ? { duration: exitMs / 1000, ease: "easeInOut" }
                                : { duration: 0 }
                        }
                    />
                );
            })}
        </div>
    );
}

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
            {/* BACKGROUND */}
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
            <div className="absolute inset-0 bg-[#3B82F6]/10" />

            {/* CONTENT WRAPPER */}
            <div className="relative z-10 flex items-center gap-20 h-full px-10 md:px-20 container mx-auto flex-col md:flex-row py-10">
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

                <div className="flex w-1/2 justify-end md:justify-center mb-5">
                    <BookStack books={allBooks} />
                </div>
            </div>
        </div>
    );
}