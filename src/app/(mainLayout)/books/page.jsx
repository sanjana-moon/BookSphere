import { fetchBooks } from "@/lib/api/books/data";
import BrowseBooksClient from "./BrowseBooksClient"; // Adjust this path if necessary

const BrowseBooksPage = async ({ searchParams }) => {
    // Await searchParams in Next.js App Router
    const params = await searchParams;

    const search = params?.search || "";
    const category = params?.category || "all";
    const sort = params?.sort || "title";

    // Build the query string/object required by your backend
    const page = params?.page || "1";

    const query = new URLSearchParams({
        search,
        category,
        sort,
        page,
        limit: "8", // or 9 or 12
    });

    const data = await fetchBooks(query);

    return (
        <BrowseBooksClient
            initialBooks={data.books}
            totalPages={data.totalPages}
            currentPage={data.currentPage}
            totalBooks={data.totalBooks}
            currentSearch={search}
            currentCategory={category}
            currentSort={sort}
        />
    );
};

export default BrowseBooksPage;