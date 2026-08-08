"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import heroBg from "@/component/assets/images/Hero-bg.jpg";
import heroBook from "@/component/assets/images/Hero-Book.png";

const slides = [
    {
        title: "YOUR NEXT CHAPTER, DELIVERED IN 30 MINUTES.",
        desc: "From bestsellers to local indie finds—brought straight to your doorstep before your coffee gets cold.",
    },
    {
        title: "LATE NIGHT BOOK CRAVINGS? DELIVERED 24/7.",
        desc: "Instant, late-night courier for physical books when you need them most.",
    },
    {
        title: "NEVER RUN OUT OF GOOD STORIES.",
        desc: "Personalized physical book delivery based on your reading taste.",
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
        <div className="relative min-h-[85vh] w-full overflow-hidden bg-[#464e66] flex items-center">
            {/* BACKGROUND IMAGE WITH BLUE linear OVERLAY */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={heroBg}
                    alt="Library Background"
                    height={1080}
                    width={1920}
                    priority
                    className="object-cover h-auto filter blur-sm scale-105 opacity-20"
                />
                {/* Radial cyan glow + deep navy linear overlay */}
                <div className="absolute inset-0" />
                <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none" />
            </div>

            {/* CONTENT WRAPPER */}
            <div className="relative z-10 container mx-auto px-6 md:px-16 py-12 flex flex-col-reverse md:flex-row items-center justify-between gap-10">

                {/* LEFT TEXT & ACTIONS */}
                <div className="w-full md:w-1/2 text-white">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={slide.title}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -30 }}
                            transition={{ duration: 0.5 }}
                            className="space-y-4"
                        >
                            <span className="text-cyan-400 font-semibold tracking-wider text-xs uppercase flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                                BookSphere Engine
                            </span>

                            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight !text-white leading-tight">
                                {slide.title}
                            </h1>

                            <p className="text-slate-300 text-base md:text-lg max-w-lg pt-1 leading-relaxed">
                                {slide.desc}
                            </p>

                            <div className="pt-4 flex flex-wrap items-center gap-4">
                                <Link href="/books">
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="px-7 py-3.5 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/25 transition-all border border-blue-400/30 flex items-center gap-2"
                                    >
                                        Find Nearby Books
                                    </motion.button>
                                </Link>
                            </div>

                            {/* LIVE TICKER BADGE */}
                            <div className="pt-4 flex items-center gap-2">
                                <span className="px-3 py-1 bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-medium rounded-full flex items-center gap-2 backdrop-blur-md">
                                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                                    Live Fleet Ticker
                                </span>
                                <span className="text-slate-400 text-xs">
                                    1,200+ Books Delivered Today
                                </span>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* RIGHT VISUAL DISPLAY */}
                <div className="w-full md:w-1/2 flex justify-center items-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="relative w-full max-w-lg aspect-square flex justify-center items-center"
                    >
                        {/* Soft cyan behind-the-book ambient glow */}
                        <div className="absolute inset-0 bg-linear-to-tr from-blue-600/20 to-cyan-400/20 rounded-full blur-2xl transform scale-90 pointer-events-none" />

                        <Image
                            src={heroBook}
                            alt="Booksphere Visual"
                            width={600}
                            height={600}
                            priority
                            className="relative z-10 object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)] hover:scale-105 transition-transform duration-500"
                        />
                    </motion.div>
                </div>

            </div>
        </div>
    );
}