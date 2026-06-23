"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { Card, Button } from "@heroui/react";

const BookCard = ({ book }) => {
    return (
        <motion.div
            whileHover={{
                y: -8,
                scale: 1.02,
            }}
            transition={{
                duration: 0.25,
            }}
        >
            <Card className="h-full overflow-hidden border border-blue-100 bg-white/80 backdrop-blur-sm shadow-lg">

                <div className="relative">

                    <Image
                        src={book.image}
                        alt={book.title}
                        width={400}
                        height={500}
                        className="w-full h-64 object-cover"
                    />

                    {book.publishStatus !== "Published" && (
                        <span className="absolute top-3 right-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full">
                            Unavailable
                        </span>
                    )}
                </div>

                <div className="p-4 flex flex-col h-full">

                    <h2 className="font-bold text-lg text-[#0A1F5C] line-clamp-1">
                        {book.title}
                    </h2>

                    <p className="text-sm text-slate-500 mt-1">
                        {book.author}
                    </p>

                    <p className="text-sm text-blue-600 mt-2">
                        {book.category}
                    </p>

                    <div className="mt-4 flex items-center justify-between">

                        <span className="font-semibold text-[#2563EB]">
                            ৳{book.deliveryFee}
                        </span>

                        <Button
                            as={Link}
                            href={`/books/${book._id}`}
                            size="sm"
                            className="bg-[#2563EB] text-white"
                        >
                            View Details
                        </Button>
                    </div>
                </div>

            </Card>
        </motion.div>
    );
};

export default BookCard;