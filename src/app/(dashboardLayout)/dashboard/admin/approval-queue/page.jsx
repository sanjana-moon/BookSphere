import { fetchPendingBooks } from "@/lib/api/books/data";
import ApproveBooksPage from "./ApproveBookPage";

export default async function Page() {
    const books = await fetchPendingBooks();

    return <ApproveBooksPage books={books} />;
}