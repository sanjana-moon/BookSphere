"use client";

import { useState, useEffect } from "react";
import {
    useRouter,
    usePathname,
    useSearchParams,
} from "next/navigation";
import { motion } from "motion/react";
import BookCard from "@/component/books/BookCard";
import { FaSearch } from "react-icons/fa";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";

const BrowseBooksClient = ({
    initialBooks,
    totalBooks,
    totalPages,
    currentPage,
    currentSearch,
    currentCategory,
    currentSort,
}) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [search, setSearch] = useState(currentSearch);

    useEffect(() => {
        setSearch(currentSearch);
    }, [currentSearch]);

    useEffect(() => {
        const timer = setTimeout(() => {
            updateQueryParams("search", search);
        }, 400);

        return () => clearTimeout(timer);
    }, [search]);

    const updateQueryParams = (key, value) => {
        const params = new URLSearchParams(searchParams.toString());

        if (value && value !== "all") {
            params.set(key, value);
        } else {
            params.delete(key);
        }

        // Reset page whenever search/filter/sort changes
        if (key !== "page") {
            params.set("page", "1");
        }

        router.push(`${pathname}?${params.toString()}`, {
            scroll: false,
        });
    };

    const categories = [
        "all",
        "Fiction",
        "Biography",
        "History",
        "Non Fiction",
        "Science",
        "Technology",
        "Fantasy",
        "Children",
    ];

    return (
        <div className="min-h-screen bg-[linear-gradient(135deg,#EEF2FF_0%,#E8EFFE_100%)]">
            <div className="container mx-auto px-4 py-10">

                {/* Hero */}
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
                        Explore our growing collection of books.
                        Search, filter and discover your next read.
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

                        {/* Search */}
                        <div className="flex items-center gap-3 bg-blue-50 border border-blue-300 rounded-xl px-4">
                            <FaSearch className="text-blue-700" />

                            <input
                                type="text"
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                                placeholder="Search by title or author..."
                                className="w-full bg-transparent py-3 outline-none"
                            />
                        </div>

                        {/* Category */}
                        <select
                            value={currentCategory}
                            onChange={(e) =>
                                updateQueryParams(
                                    "category",
                                    e.target.value
                                )
                            }
                            className="w-full px-4 py-3 rounded-xl border border-blue-300 bg-blue-50 outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {categories.map((cat) => (
                                <option
                                    key={cat}
                                    value={cat}
                                >
                                    {cat}
                                </option>
                            ))}
                        </select>

                        {/* Sort */}
                        <select
                            value={currentSort}
                            onChange={(e) =>
                                updateQueryParams(
                                    "sort",
                                    e.target.value
                                )
                            }
                            className="w-full px-4 py-3 rounded-xl border border-blue-300 bg-blue-50 outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="title">
                                Title A-Z
                            </option>

                            <option value="fee-low">
                                Fee: Low → High
                            </option>

                            <option value="fee-high">
                                Fee: High → Low
                            </option>

                            <option value="newest">
                                Newest
                            </option>
                        </select>
                    </div>
                </motion.div>

                {/* Result Count */}
                <div className="mb-6">
                    <p className="text-slate-600">
                        Showing{" "}
                        <span className="font-semibold text-[#0A1F5C]">
                            {totalBooks}
                        </span>{" "}
                        books
                    </p>
                </div>

                {/* Books */}
                {totalBooks === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20"
                    >
                        <h3 className="text-2xl font-bold text-slate-700">
                            No books found
                        </h3>

                        <p className="text-slate-500 mt-2">
                            Try adjusting your search or filters.
                        </p>
                    </motion.div>
                ) : (
                    <>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                            {initialBooks.map((book) => (
                                <BookCard
                                    key={book._id}
                                    book={book}
                                />
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="flex flex-wrap justify-center items-center gap-2 mt-10">

                            <button
                                disabled={currentPage === 1}
                                onClick={() =>
                                    updateQueryParams(
                                        "page",
                                        currentPage - 1
                                    )
                                }
                                className="px-4 py-2 rounded-lg bg-blue-600 text-white disabled:bg-gray-300 disabled:cursor-not-allowed"
                            >
                                <BiLeftArrow/>
                            </button>

                            {Array.from({ length: totalPages }, (_, i) => (
                                <button
                                    key={i + 1}
                                    onClick={() =>
                                        updateQueryParams("page", i + 1
                                        )
                                    }
                                    className={`w-10 h-10 rounded-lg font-medium transition ${currentPage === i + 1 ?
                                        "bg-blue-700 text-white"
                                        : "bg-gray-200 hover:bg-gray-300"
                                        }`}
                                >
                                    {i + 1}
                                </button>
                            )
                            )}

                            <button
                                disabled={
                                    currentPage === totalPages
                                }
                                onClick={() =>
                                    updateQueryParams("page", currentPage + 1)
                                }
                                className="px-4 py-2 rounded-lg bg-blue-600 text-white disabled:bg-gray-300 disabled:cursor-not-allowed"
                            >
                                <BiRightArrow/>
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default BrowseBooksClient;