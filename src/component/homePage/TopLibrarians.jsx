"use client";

import React from "react";
import { Card, Avatar } from "@heroui/react";
import { motion } from "framer-motion";
import {
    FaMedal,
    FaCheckCircle,
    FaStar,
    FaCrown,
} from "react-icons/fa";
import Image from "next/image";

// Original data
const topLibrarians = [
    {
        id: 1,
        name: "Sarah Jenkins",
        role: "Senior Archivist",
        deliveries: 1240,
        avatar: "https://images.pexels.com/photos/3781556/pexels-photo-3781556.jpeg",
        rank: 1,
        rankColor: "text-[#F59E0B]", // Gold
    },
    {
        id: 2,
        name: "David Chen",
        role: "Digital Curator",
        deliveries: 980,
        avatar: "https://images.pexels.com/photos/18178899/pexels-photo-18178899.jpeg",
        rank: 2,
        rankColor: "text-slate-400", // Silver
    },
    {
        id: 3,
        name: "Elena Rostova",
        role: "Logistics Specialist",
        deliveries: 850,
        avatar: "https://images.pexels.com/photos/3776446/pexels-photo-3776446.jpeg",
        rank: 3,
        rankColor: "text-amber-700", // Bronze
    },
];

// Place champion in center grid position for desktop
const displayLibrarians = [
    topLibrarians[1], // #2
    topLibrarians[0], // #1
    topLibrarians[2], // #3
];

const TopLibrarians = () => {
    return (
        <section className="py-20 bg-[#EEF2FF]">
            <div className="container mx-auto px-4 max-w-6xl">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold font-cinzel text-[#0A1F5C]">
                        Top Librarians & Providers
                    </h2>

                    <div className="w-20 h-1 bg-[#3B82F6] mx-auto mt-4 rounded-full" />

                    <p className="mt-4 text-[#4B5563] max-w-xl mx-auto font-fauna">
                        Recognizing the most dedicated contributors who
                        continuously help readers discover and access great books across the sphere.
                    </p>
                </motion.div>

                {/* Cards Grid Container */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center pt-6">

                    {displayLibrarians.map((librarian, index) => {
                        const isChampion = librarian.rank === 1;

                        return (
                            <motion.div
                                key={librarian.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.15,
                                }}
                                whileHover={{
                                    y: -12,
                                    scale: isChampion ? 1.05 : 1.03,
                                }}
                                className={isChampion ? "md:-mt-6 z-10" : "z-0"}
                            >
                                <Card
                                    className={`
                                        relative overflow-visible rounded-2xl
                                        border transition-all duration-300
                                        ${isChampion
                                            ? "bg-[#E8EFFE] border-[#3B82F6]/30 shadow-xl"
                                            : "bg-white border-slate-100 shadow-md"
                                        }
                                    `}
                                >
                                    <div className="p-6 flex flex-col items-center text-center">

                                        {/* Champion Badge */}
                                        {isChampion && (
                                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#2563EB] text-white px-4 py-1 rounded-full text-xs font-bold flex items-center gap-2 shadow-md">
                                                <FaCrown className="text-[#FBBF24]" />
                                                Champion
                                            </div>
                                        )}

                                        {/* Floating Medal */}
                                        <motion.div
                                            animate={{
                                                y: [0, -5, 0],
                                            }}
                                            transition={{
                                                duration: 2.5,
                                                repeat: Infinity,
                                                ease: "easeInOut"
                                            }}
                                            className="absolute top-4 right-4 flex items-center gap-1 bg-white px-2.5 py-1 rounded-full border border-slate-200 shadow-2xs"
                                        >
                                            <FaMedal
                                                className={`${librarian.rankColor}`}
                                            />
                                            <span className="text-xs font-bold text-[#0A1F5C]">
                                                #{librarian.rank}
                                            </span>
                                        </motion.div>

                                        {/* Avatar Frame adjusted contextually */}
                                        <div
                                            className={`relative overflow-hidden rounded-full ${isChampion ? "w-28 h-28 mt-4" : "w-24 h-24"} border-4 border-white shadow-md`}                                        >
                                            <Image
                                                src={librarian.avatar}
                                                alt={librarian.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>

                                        {/* Name with Stars Integration */}
                                        <h3 className="mt-5 text-xl font-bold text-[#0A1F5C] font-cinzel flex items-center gap-1 flex-wrap justify-center">
                                            {librarian.name}
                                        </h3>

                                        {/* Role Profile Details */}
                                        <p className="mt-1 text-xs text-[#6B7280] font-medium font-fauna tracking-wide">
                                            {librarian.role}
                                        </p>

                                        {/* Row of Stars directly after identity */}
                                        <div className="flex items-center gap-0.5 mt-1">
                                            {[...Array(5)].map((_, i) => (
                                                <FaStar
                                                    key={i}
                                                    className="text-[#FBBF24] text-xs"
                                                />
                                            ))}
                                        </div>

                                        {/* Delivery Stats Showcase */}
                                        <div className={`w-full mt-6 rounded-xl p-3.5 border flex items-center justify-between shadow-2xs ${isChampion
                                            ? "bg-white border-[#3B82F6]/20"
                                            : "bg-[#EEF2FF]/40 border-slate-100"
                                            }`}>
                                            <div className="flex items-center gap-2 text-emerald-600 font-fauna">
                                                <FaCheckCircle className="text-sm" />
                                                <span className="text-xs font-semibold">
                                                    Completed
                                                </span>
                                            </div>

                                            <span className="text-sm font-bold text-[#0A1F5C] font-fauna">
                                                {librarian.deliveries.toLocaleString()} Deliveries
                                            </span>
                                        </div>

                                        {/* Visual Completion Progress Bar Trackers */}
                                        <div className="w-full mt-4 px-1">
                                            <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    whileInView={{
                                                        width: `${librarian.rank === 1
                                                            ? 100
                                                            : librarian.rank === 2
                                                                ? 82
                                                                : 71
                                                            }%`,
                                                    }}
                                                    viewport={{ once: true }}
                                                    transition={{
                                                        duration: 1.2,
                                                        ease: "easeOut"
                                                    }}
                                                    className={`h-full ${isChampion
                                                        ? "bg-[#2563EB]"
                                                        : "bg-[#3B82F6]"
                                                        }`}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default TopLibrarians;