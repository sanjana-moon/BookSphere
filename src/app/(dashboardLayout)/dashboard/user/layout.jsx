import { roleValidator } from "@/lib/api/session";
import { Children } from "react";

const UserLayout = async ({ children }) => {
    await roleValidator("user")
    return children
}

export default UserLayout;