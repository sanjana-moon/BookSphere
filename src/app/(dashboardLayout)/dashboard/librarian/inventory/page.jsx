import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Suspense } from "react";
import { Spinner } from "@heroui/react";
import { myBooks } from "@/lib/api/books/data";
import ManageInventoryPage from "./ManageInventory";


const ManageBooks = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    const books = await myBooks(session?.user?.email)

    return (
        <div>
            <Suspense fallback={<Spinner />}>
                <ManageInventoryPage books={books} />
            </Suspense>

        </div>
    );
};

export default ManageBooks;