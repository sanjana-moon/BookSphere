import { roleValidator } from "@/lib/api/session";

const AdminLayout = async ({ children }) => {
    await roleValidator("admin")
    return children
}

export default AdminLayout;