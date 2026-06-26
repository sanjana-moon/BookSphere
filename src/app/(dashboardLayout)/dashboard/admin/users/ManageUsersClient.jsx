"use client";

import { useState } from "react";
import { Card, Button } from "@heroui/react";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { changeUserRole } from "@/lib/api/books/actions";
import { deleteUser } from "better-auth/api";

const ManageUsersClient = ({ users: initialUsers }) => {
    const [users, setUsers] = useState(initialUsers || []);

    const handleRoleChange = async (user, role) => {
        try {
            await changeUserRole(user._id, role);

            setUsers((prev) =>
                prev.map((u) =>
                    u._id === user._id
                        ? { ...u, role }
                        : u
                )
            );

            toast.success("Role updated.");
        } catch (err) {
            console.error(err);
            toast.error("Failed to update role.");
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteUser(id);

            setUsers((prev) =>
                prev.filter((user) => user._id !== id)
            );

            toast.success("User deleted.");
        } catch (err) {
            console.error(err);
            toast.error("Delete failed.");
        }
    };    

    return (
        <div className="min-h-screen bg-[linear-gradient(135deg,#EEF2FF_0%,#E8EFFE_100%)] p-6">
            <div className="max-w-7xl mx-auto">

                <h1 className="text-3xl font-bold text-[#0A1F5C]">
                    Manage Users
                </h1>

                <p className="text-slate-600 mt-2 mb-8">
                    Promote users to Librarian or Admin, or permanently remove them.
                </p>

                <Card className="rounded-3xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-blue-50">
                                <tr>
                                    <th className="px-6 py-4 text-left">
                                        Name
                                    </th>

                                    <th className="px-6 py-4 text-left">
                                        Email
                                    </th>

                                    <th className="px-6 py-4 text-left">
                                        Role
                                    </th>

                                    <th className="px-6 py-4 text-center">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {users.map((user) => (
                                    <tr
                                        key={user._id}
                                        className="border-t hover:bg-blue-50"
                                    >
                                        <td className="px-6 py-5 font-semibold">
                                            {user.name}
                                        </td>

                                        <td className="px-6 py-5">
                                            {user.email}
                                        </td>

                                        <td className="px-6 py-5">
                                            <select
                                                className="border rounded-lg px-3 py-2"
                                                value={user.role}
                                                onChange={(e) =>
                                                    handleRoleChange(
                                                        user,
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option value="user">
                                                    User
                                                </option>

                                                <option value="librarian">
                                                    Librarian
                                                </option>

                                                <option value="admin">
                                                    Admin
                                                </option>
                                            </select>
                                        </td>

                                        <td className="px-6 py-5">
                                            <div className="flex justify-center">
                                                <Button
                                                    color="danger"
                                                    isIconOnly
                                                    onPress={() =>
                                                        handleDelete(user._id)
                                                    }
                                                >
                                                    <FaTrash />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default ManageUsersClient;