import { baseURL } from "@/lib/api/baseUrl";
import BrowseBooksClient from "./BrowseBooksClient";

const fetchBooks = async () => {
  const res = await fetch(`${baseURL}/api/books`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch books");
  }

  return res.json();
};

const BrowseBooksPage = async () => {
  const books = await fetchBooks();

  return <BrowseBooksClient initialBooks={books} />;
};

export default BrowseBooksPage;