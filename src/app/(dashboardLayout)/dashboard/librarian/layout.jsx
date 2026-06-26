import { roleValidator } from "@/lib/api/session";
import { Children } from "react";

const LibrarianLayout = async ({ children }) => {
    await roleValidator("librarian")
    return children
}

export default LibrarianLayout;