"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { motion } from "motion/react";
import { Input } from "@heroui/react";
import BookCard from "@/component/books/BookCard";

const BrowseBooksClient = ({ initialBooks, currentSearch, currentCategory, currentSort }) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Local input state for smooth typing experience
    const [search, setSearch] = useState(currentSearch);

    // Debounce the text search to prevent firing database requests on every single keystroke
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            updateQueryParams("search", search);
        }, 400);

        return () => clearTimeout(delayDebounceFn);
    }, [search]);

    // Helper utility to sync state changes into the active browser URL
    const updateQueryParams = (key, value) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value && value !== "all") {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    };

    // Derived from your raw full dataset if you need a static list of tags, 
    // or hardcode them if your database handles category listings separately.
    const categories = ["all", "Fiction", "Sci-Fi", "Biography", "History"];

    return (
        <div className="min-h-screen bg-[linear-gradient(135deg,#EEF2FF_0%,#E8EFFE_100%)]">
            <div className="container mx-auto px-4 py-10">

                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: -25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="text-center mb-10"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-[#0A1F5C]">
                        Browse Books
                    </h1>
                    <p className="text-slate-600 mt-3 max-w-2xl mx-auto">
                        Explore our growing collection of books. Search, filter and discover your next read.
                    </p>
                </motion.div>

                {/* Filters */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white/70 backdrop-blur-md border border-blue-100 rounded-3xl p-5 mb-8 shadow-lg"
                >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                        {/* Search Input */}
                        <Input
                            placeholder="Search by title or author..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />

                        {/* Category Select */}
                        <select
                            value={currentCategory}
                            onChange={(e) => updateQueryParams("category", e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-blue-200 bg-white outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>

                        {/* Sort Select */}
                        <select
                            value={currentSort}
                            onChange={(e) => updateQueryParams("sort", e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-blue-200 bg-white outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="title">Title A-Z</option>
                            <option value="fee-low">Fee Low → High</option>
                            <option value="fee-high">Fee High → Low</option>
                        </select>
                    </div>
                </motion.div>

                {/* Results Count */}
                <div className="mb-6">
                    <p className="text-slate-600">
                        Showing{" "}
                        <span className="font-semibold text-[#0A1F5C]">
                            {initialBooks?.length || 0}
                        </span>{" "}
                        books
                    </p>
                </div>

                {/* Grid Layout Display */}
                {!initialBooks || initialBooks.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20"
                    >
                        <h3 className="text-2xl font-bold text-slate-700">No books found</h3>
                        <p className="text-slate-500 mt-2">Try adjusting your search or filters.</p>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                        {initialBooks.map((book) => (
                            <BookCard key={book._id} book={book} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BrowseBooksClient;