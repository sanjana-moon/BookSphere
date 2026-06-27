import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { fetchMyReviews } from "@/lib/api/books/data";
import UserReviewClient from "./UserReviewClient";

export default async function UserReviewPage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const reviews = await fetchMyReviews(
        session.user.email
    );

    return (
        <UserReviewClient reviews={reviews} />
    );
}