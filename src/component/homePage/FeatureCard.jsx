"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { Card, Button } from "@heroui/react";

const FeaturedCard = ({ book }) => {
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
            <Card className="h-full overflow-hidden border border-blue-100 bg-white/80 backdrop-blur-sm shadow-lg rounded-md">
                <div className="relative">
                    <Image
                        src={book.image}
                        alt={book.title}
                        width={400}
                        height={500}
                        className="w-full h-100 object-cover"
                    />
                    {book.publishStatus !== "published" ? (
                        <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-3 py-1 rounded-full">
                            Unavailable
                        </span>
                    ) : (
                        <span className="absolute top-1 right-1 bg-green-500 text-white text-xs px-3 py-1 rounded-full">
                        Available
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
                        <Link href={`/books/${book._id}`}>
                            <Button
                                size="sm"
                                className="bg-[#2563EB] text-white rounded-md hover:bg-blue-700"
                            >
                                View Details
                            </Button>
                        </Link>
                    </div>
                </div>

            </Card>
        </motion.div >
    );
};

export default FeaturedCard;