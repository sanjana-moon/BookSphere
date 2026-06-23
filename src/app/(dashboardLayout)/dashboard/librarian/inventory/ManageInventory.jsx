"use client";

import EditBookModal from "@/component/books/EditBookModal";
import DeleteBookModal from "@/component/books/DeleteBookModal";
import { myBooks } from "@/lib/api/books/data";

import { Card, Button, Spinner } from "@heroui/react";
import { useState } from "react";
import { FaEdit, FaTrash, FaEyeSlash, FaCheckCircle } from "react-icons/fa";

const ManageInventoryPage = ({ books: initialBooks }) => {
    const [books, setBooks] = useState(initialBooks || []);

    const [deletedId, setDeletedId] = useState(null);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBook, setEditingBook] = useState(null);

    const refreshBooks = async () => {
        const updated = await myBooks();
        setBooks(updated || []);
    };

    return (
        <>
            <div className="min-h-screen bg-[linear-gradient(135deg,#EEF2FF_0%,#E8EFFE_100%)] p-3 md:p-8">
                <div className="container mx-auto space-y-8">

                    {/* Header */}
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-[#0A1F5C]">
                            Manage Inventory
                        </h1>
                        <p className="text-slate-600 mt-2">
                            Manage your books, update listings and control visibility.
                        </p>
                    </div>

                    {/* Table Card */}
                    <Card className="bg-white/70 backdrop-blur-md border border-blue-100 rounded-3xl shadow-xl overflow-hidden">
                        <div className="p-6 border-b border-blue-100">
                            <h2 className="text-xl font-bold text-[#0A1F5C]">My Books</h2>
                        </div>

                        {books.length === 0 ? (
                            <div className="py-20 text-center">
                                <p className="text-slate-500 text-lg">No books found.</p>
                            </div>
                        ) : (
                            <>
                                {/* Desktop Table */}
                                <div className="hidden lg:block overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-blue-50">
                                            <tr>
                                                <th className="text-left px-6 py-4 text-[#0A1F5C]">Title</th>
                                                <th className="text-left px-6 py-4 text-[#0A1F5C]">Category</th>
                                                <th className="text-left px-6 py-4 text-[#0A1F5C]">Fee</th>
                                                <th className="text-left px-6 py-4 text-[#0A1F5C]">Approval Status</th>
                                                <th className="text-left px-6 py-4 text-[#0A1F5C]">Publish Status</th>
                                                <th className="text-center px-6 py-4 text-[#0A1F5C]">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {books.map((book) => (
                                                <tr key={book._id} className="border-t border-blue-100 hover:bg-blue-50/40 transition">
                                                    <td className="px-6 py-5 font-semibold text-[#0A1F5C]">{book.title}</td>
                                                    <td className="px-6 py-5 text-slate-600">{book.category}</td>
                                                    <td className="px-6 py-5 text-slate-600">৳{book.deliveryFee}</td>
                                                    <td className="px-6 py-5">
                                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${book.approvalStatus === "Approved" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
                                                            {book.approvalStatus}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-5">
                                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${book.publishStatus === "Published" ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-700"}`}>
                                                            {book.publishStatus}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-5">
                                                        <div className="flex justify-center gap-2">
                                                            <Button isIconOnly size="sm" className="bg-blue-100 text-[#2563EB]"
                                                                onPress={() => { setEditingBook(book); setIsModalOpen(true); }}>
                                                                <FaEdit />
                                                            </Button>
                                                            <Button isIconOnly size="sm" className="bg-red-100 text-red-600"
                                                                onPress={() => { setDeletedId(book._id); setIsDeleteOpen(true); }}>
                                                                <FaTrash />
                                                            </Button>
                                                            {book.approvalStatus === "Approved" && (
                                                                <Button isIconOnly size="sm"
                                                                    className={book.publishStatus === "Published" ? "bg-amber-100 text-amber-700" : "bg-green-100 text-green-700"}>
                                                                    {book.publishStatus === "Published" ? <FaEyeSlash /> : <FaCheckCircle />}
                                                                </Button>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Mobile Cards */}
                                <div className="lg:hidden p-4 space-y-4">
                                    {books.map((book) => (
                                        <Card key={book._id} className="bg-white border border-blue-100 rounded-2xl">
                                            <div className="p-4 space-y-3">
                                                <h3 className="font-bold text-[#0A1F5C]">{book.title}</h3>
                                                <p className="text-sm text-slate-600">Category: {book.category}</p>
                                                <p className="text-sm text-slate-600">Delivery Fee: ৳{book.deliveryFee}</p>
                                                <div className="flex flex-wrap gap-2">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${book.approvalStatus === "Approved" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
                                                        {book.approvalStatus}
                                                    </span>
                                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${book.publishStatus === "Published" ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-700"}`}>
                                                        {book.publishStatus}
                                                    </span>
                                                </div>
                                                <div className="flex gap-2 pt-2">
                                                    <Button isIconOnly size="sm" className="bg-blue-100 text-[#2563EB]"
                                                        onPress={() => { setEditingBook(book); setIsModalOpen(true); }}>
                                                        <FaEdit />
                                                    </Button>
                                                    <Button isIconOnly size="sm" className="bg-red-100 text-red-600"
                                                        onPress={() => { setDeletedId(book._id); setIsDeleteOpen(true); }}>
                                                        <FaTrash />
                                                    </Button>
                                                    {book.approvalStatus === "Approved" && (
                                                        <Button size="sm"
                                                            className={book.publishStatus === "Published" ? "bg-amber-100 text-amber-700" : "bg-green-100 text-green-700"}>
                                                            {book.publishStatus === "Published" ? "Unpublish" : "Publish"}
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            </>
                        )}
                    </Card>
                </div>
            </div>

            {/* Edit Modal */}
            <EditBookModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                editingBook={editingBook}
                onSuccess={refreshBooks}
            />

            {/* Delete Modal */}
            <DeleteBookModal
                isDeleteOpen={isDeleteOpen}
                setIsDeleteOpen={setIsDeleteOpen}
                id={deletedId}
                onConfirm={(id) => { }}
            />
        </>
    );
};

export default ManageInventoryPage;