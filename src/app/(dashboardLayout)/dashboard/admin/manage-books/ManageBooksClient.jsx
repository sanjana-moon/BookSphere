"use client";

import { useState } from "react";
import { Card, Button, Switch } from "@heroui/react";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { deleteBooks, toggleBookPublish, updateStatus } from "@/lib/api/books/actions";

const ManageBooksClient = ({ books: initialBooks }) => {
    const [books, setBooks] = useState(initialBooks || []);

    // Toggles the backend and frontend state for Publishing
    const handleTogglePublish = async (book) => {
        try {
            const newStatus = book.publishStatus === "published" ? "unpublished" : "published";

            await toggleBookPublish({ publishStatus: newStatus }, book._id);

            setBooks((prev) =>
                prev.map((item) =>
                    item._id === book._id ? { ...item, publishStatus: newStatus } : item
                )
            );

            toast.success(`Book ${newStatus} successfully.`);
        } catch (err) {
            console.error(err);
            toast.error("Failed to update publish status.");
        }
    };

    // Toggles the backend and frontend state for Approval
    const handleToggleApproval = async (book) => {
        try {
            const newStatus = book.approvalStatus === "approved" ? "pending" : "approved";

            await updateStatus({ approvalStatus: newStatus }, book._id);

            setBooks((prev) =>
                prev.map((item) =>
                    item._id === book._id ? { ...item, approvalStatus: newStatus } : item
                )
            );

            toast.success(`Book approval status set to ${newStatus}.`);
        } catch (err) {
            console.error(err);
            toast.error("Failed to update approval status.");
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteBooks(id);
            setBooks((prev) => prev.filter((book) => book._id !== id));
            toast.success("Book deleted.");
        } catch (err) {
            console.error(err);
            toast.error("Delete failed.");
        }
    };

    return (
        <div className="min-h-screen bg-[linear-gradient(135deg,#EEF2FF_0%,#E8EFFE_100%)] p-6">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-[#0A1F5C]">Manage All Books</h1>
                <p className="text-slate-600 mt-2 mb-8">
                    Admin can publish, unpublish or permanently delete any book.
                </p>

                <Card className="rounded-3xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-blue-50">
                                <tr>
                                    <th className="px-6 py-4 text-left">Title</th>
                                    <th className="px-6 py-4 text-left">Author</th>
                                    <th className="px-6 py-4 text-left">Category</th>
                                    <th className="px-6 py-4 text-left">Approval</th>
                                    <th className="px-6 py-4 text-left">Publish</th>
                                    <th className="px-6 py-4 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {books.map((book) => (
                                    <tr key={book._id} className="border-t hover:bg-blue-50">
                                        <td className="px-6 py-5 font-semibold">{book.title}</td>
                                        <td className="px-6 py-5">{book.author}</td>
                                        <td className="px-6 py-5">{book.category}</td>
                                        
                                        {/* Approval Column */}
                                        <td className="px-6 py-5">
                                            <Button
                                                className={`px-3 rounded-full text-xs font-semibold ${
                                                    book.approvalStatus === "approved"
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-yellow-100 text-yellow-700"
                                                }`}
                                                onPress={() => handleToggleApproval(book)}
                                            >
                                                {book.approvalStatus}
                                            </Button>
                                        </td>

                                        {/* Publish Column (Switched to Switch Component) */}
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-3">
                                                <Switch
                                                    isSelected={book.publishStatus === "published"}
                                                    onValueChange={() => handleTogglePublish(book)}
                                                    size="sm"
                                                    color="success"
                                                >
                                                    <span className="text-xs font-semibold capitalize text-slate-700">
                                                        {book.publishStatus}
                                                    </span>
                                                </Switch>
                                            </div>
                                        </td>

                                        {/* Actions Column */}
                                        <td className="px-6 py-5">
                                            <div className="flex justify-center">
                                                <Button
                                                    color="danger"
                                                    isIconOnly
                                                    onPress={() => handleDelete(book._id)}
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

export default ManageBooksClient;