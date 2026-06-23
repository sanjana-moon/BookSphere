"use client";

import { motion } from "motion/react";

const ScrollReveal = ({
    children,
    delay = 0,
    duration = 0.6,
    y = 40,
    x = 0,
    scale = 1,
    once = true,
    className = "",
}) => {
    return (
        <motion.div
            className={className}
            initial={{
                opacity: 0,
                y,
                x,
                scale,
            }}
            whileInView={{
                opacity: 1,
                y: 0,
                x: 0,
                scale: 1,
            }}
            viewport={{
                once,
                amount: 0.15,
            }}
            transition={{
                duration,
                delay,
                ease: "easeOut",
            }}
        >
            {children}
        </motion.div>
    );
};

export default ScrollReveal;