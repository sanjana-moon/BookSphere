import BookCard from "@/component/books/BookCard";
import { fetchFeaturedBooks } from "@/lib/api/books/data";

const FeaturedBooks = async () => {
    const books = await fetchFeaturedBooks();
    return (
        <section className="container mx-auto py-16">

            <h2 className="text-3xl font-bold text-center mb-10 md:mb-15">
                Our Top Collections
            </h2>
            <p className="text-center text-gray-600 max-w-2xl mx-auto -mt-6 mb-12 text-base md:text-lg leading-relaxed">
                Handpicked by our literary experts. Dive into our most celebrated titles,
                trending masterpieces, and timeless classics curated just for you.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
                {books.slice(0, 6).map((book) => (
                    <BookCard
                        key={book._id}
                        book={book}
                    />
                ))}
            </div>

        </section>
    );
};

export default FeaturedBooks;