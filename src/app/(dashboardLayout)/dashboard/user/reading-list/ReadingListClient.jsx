"use client";

import BookCard from "@/component/books/BookCard";
import { Card } from "@heroui/react";

const ReadingListClient = ({ books }) => {
    if (!books.length) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold text-slate-700">
                    No books in your reading list.
                </h2>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-[#0A1F5C]">
                    My Reading List
                </h1>

                <p className="text-slate-500 mt-2">
                    Books you've successfully received.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {books.map((book) => (
                    <BookCard book={book} key={book._id} />
                ))}
            </div>
        </div>
    );
};

export default ReadingListClient;