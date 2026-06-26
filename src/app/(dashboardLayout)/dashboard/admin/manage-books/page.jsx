import { fetchAllBooks } from "@/lib/api/books/data";
import ManageBooksClient from "./ManageBooksClient";

export default async function ManageBooks() {
    const books = await fetchAllBooks();

    return <ManageBooksClient books={books} />;
}