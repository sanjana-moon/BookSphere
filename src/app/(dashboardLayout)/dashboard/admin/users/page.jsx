import { fetchUsers } from "@/lib/api/books/data";
import ManageUsersClient from "./ManageUsersClient";

const ManageUsers = async () => {
    const users = await fetchUsers();

    return <ManageUsersClient users={users} />;
};

export default ManageUsers;