import { fetchBooks } from "@/lib/api/books/data";
import BrowseBooksClient from "./BrowseBooksClient"; // Adjust this path if necessary

const BrowseBooksPage = async ({ searchParams }) => {
    // Await searchParams in Next.js App Router
    const params = await searchParams;
    
    const search = params?.search || "";
    const category = params?.category || "all";
    const sort = params?.sort || "title";

    // Build the query string/object required by your backend
    const query = new URLSearchParams({ search, category, sort });
    
    // Fetch filtered data directly from the server
    const books = await fetchBooks(query);

    console.log('books', books);
    

    return (
        <BrowseBooksClient 
            initialBooks={books} 
            currentSearch={search}
            currentCategory={category}
            currentSort={sort}
        />
    );
};

export default BrowseBooksPage;