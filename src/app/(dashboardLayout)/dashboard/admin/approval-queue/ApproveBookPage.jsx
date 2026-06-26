"use client";

import { useState } from "react";
import { Card, Button } from "@heroui/react";
import { FaCheck, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { deleteBooks, updateStatus } from "@/lib/api/books/actions";
import { Delete } from "@gravity-ui/icons";

const ApproveBooksPage = ({ books: initialBooks }) => {
    const [books, setBooks] = useState(initialBooks || []);

    const handleApprove = async (book) => {
        try {
            await updateStatus(
                {
                    approvalStatus: "approved",
                    publishStatus: "published",
                },
                book._id
            );

            toast.success("Book approved & published.");

            setBooks((prev) =>
                prev.filter((b) => b._id !== book._id)
            );
        } catch (err) {
            console.log(err);
            toast.error("Failed to approve book.");
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteBooks(id);
            toast.success("Book deleted.");
            setBooks((prev) =>
                prev.filter((book) => book._id !== id)
            );
        } catch (err) {
            console.log(err);
            toast.error("Failed to delete.");
        }
    };

    return (
        <div className="min-h-screen bg-[linear-gradient(135deg,#EEF2FF_0%,#E8EFFE_100%)] p-6 md:p-10">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-[#0A1F5C]">
                        Book Approval Queue
                    </h1>
                    <p className="text-slate-600 mt-2">
                        Review pending books before they become publicly available.
                    </p>
                </div>
                <Card className="rounded-3xl border border-blue-100 overflow-hidden">
                    {books.length === 0 ? (
                        <div className="py-24 text-center">
                            <h3 className="text-xl font-semibold">
                                No pending books
                            </h3>

                            <p className="text-slate-500 mt-2">
                                Every submitted book has been reviewed.
                            </p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-blue-50">
                                    <tr>
                                        <th className="px-6 py-4 text-left">
                                            Title
                                        </th>
                                        <th className="px-6 py-4 text-left">
                                            Author
                                        </th>

                                        <th className="px-6 py-4 text-left">
                                            Category
                                        </th>

                                        <th className="px-6 py-4 text-left">
                                            Fee
                                        </th>

                                        <th className="px-6 py-4 text-left">
                                            Librarian
                                        </th>

                                        <th className="px-6 py-4 text-center">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {books.map((book) => (

                                        <tr
                                            key={book._id}
                                            className="border-t hover:bg-blue-50/40"
                                        >
                                            <td className="px-6 py-5 font-semibold text-blue-700">
                                                {book.title}
                                            </td>
                                            <td className="px-6 py-5">
                                                {book.author}
                                            </td>
                                            <td className="px-6 py-5">
                                                {book.category}
                                            </td>
                                            <td className="px-6 py-5">
                                                ৳{book.deliveryFee}
                                            </td>
                                            <td className="px-6 py-5">
                                                {book.librarianEmail}
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex justify-center gap-3">
                                                    <Button
                                                        color="success"
                                                        startContent={<FaCheck />}
                                                        onPress={() =>
                                                            handleApprove(book)
                                                        }
                                                    >
                                                        Approve & Publish
                                                    </Button>

                                                    <Button
                                                        className="bg-red-50 border-red-500 text-red-600"
                                                        startContent={<FaTrash />}
                                                        onPress={() =>
                                                            handleDelete(book._id)
                                                        }
                                                    >
                                                        <Delete />
                                                        Delete
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
};

export default ApproveBooksPage;