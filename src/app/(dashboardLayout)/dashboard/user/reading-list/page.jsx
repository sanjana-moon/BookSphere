import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { fetchReadingList } from "@/lib/api/books/data";
import ReadingListClient from "./ReadingListClient";

export default async function ReadingListPage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const books = await fetchReadingList(
        session.user.email
    );

    return (
        <ReadingListClient books={books} />
    );
}