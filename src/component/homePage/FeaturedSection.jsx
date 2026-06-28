import { fetchFeaturedBooks } from "@/lib/api/books/data";
import FeaturedCard from "./FeatureCard";
import Link from "next/link";
import { Button } from "@heroui/react";

const FeaturedBooks = async () => {
    const data = await fetchFeaturedBooks();

    return (
        <section className="container mx-auto py-16">
            <h2 className="text-3xl font-bold text-center mb-10 md:mb-15">
                Our Top Collections
            </h2>
            <p className="text-center text-gray-600 max-w-2xl mx-auto -mt-6 mb-12 text-base md:text-lg leading-relaxed">
                Handpicked by our literary experts. Dive into our most celebrated
                titles, trending masterpieces, and timeless classics curated just
                for you.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 p-2">
                {data.books.map((book) => (
                    <FeaturedCard
                        key={book._id}
                        book={book}
                    />
                ))}
            </div>
            <Link href="/books" className="flex justify-center">
                <Button
                    className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-800 rounded-lg font-medium text-white"
                >
                    Browse more
                </Button>
            </Link>

        </section>
    );
};

export default FeaturedBooks;