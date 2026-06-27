"use client";

import Link from "next/link";
import { Button } from "@heroui/react";
import { motion } from "motion/react";
import { FaHome, FaBookOpen } from "react-icons/fa";

const NotFound = () => {
    return (
        <div className="min-h-screen bg-[linear-gradient(135deg,#EEF2FF_0%,#E8EFFE_100%)] flex items-center justify-center px-6">

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-xl w-full text-center bg-white/80 backdrop-blur-md border border-blue-100 shadow-xl rounded-3xl p-10"
            >
                {/* 404 */}
                <motion.h1
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{
                        delay: 0.2,
                        type: "spring",
                        stiffness: 120,
                    }}
                    className="text-8xl md:text-9xl font-extrabold text-[#2563EB]"
                >
                    404
                </motion.h1>

                {/* Icon */}
                <div className="flex justify-center mt-4">
                    <FaBookOpen className="text-6xl text-[#2563EB]" />
                </div>

                {/* Heading */}
                <h2 className="mt-6 text-3xl font-bold text-[#0A1F5C]">
                    Page Not Found
                </h2>

                {/* Description */}
                <p className="mt-4 text-slate-600 leading-relaxed">
                    Sorry, the page you're looking for doesn't exist or may
                    have been moved. Let's get you back to exploring amazing
                    books.
                </p>

                {/* Buttons */}
                <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">

                    <Link href="/">
                        <Button
                            className="bg-[#2563EB] text-white rounded-md w-full sm:w-auto"
                            startContent={<FaHome />}
                        >
                            Back to Home
                        </Button>
                    </Link>

                    <Link href="/books">
                        <Button
                            variant="bordered"
                            className="border-[#2563EB] text-[#2563EB] rounded-md w-full sm:w-auto"
                            startContent={<FaBookOpen />}
                        >
                            Browse Books
                        </Button>
                    </Link>

                </div>
            </motion.div>

        </div>
    );
};

export default NotFound;