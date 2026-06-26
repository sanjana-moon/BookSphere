"use client";

import { Button, Card, Modal } from "@heroui/react";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { deleteBooks } from "@/lib/api/books/actions";
import { redirect } from "next/navigation";

const DeleteBookModal = ({ isDeleteOpen, setIsDeleteOpen, id }) => {

    const handleDeleteBook = async () => {
        const res = await deleteBooks(id);
        if (res?.deletedCount > 0) {
            toast.success("Event deleted successfully");
            setIsDeleteOpen(false)
            redirect('/dashboard/librarian/inventory')
        }
    }

    return (
        <Modal isOpen={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
            <Modal.Backdrop>
                <Modal.Container>
                    <Modal.Dialog className="bg-white/70 backdrop-blur-md border border-blue-100 rounded-2xl shadow-xl p-6 sm:p-8 w-full max-w-sm text-center">
                        <Modal.Header className="flex justify-center mb-4">
                            <div className="bg-red-100 p-4 rounded-full mx-auto">
                                <FaTrash className="text-red-600 text-xl" />
                            </div>
                        </Modal.Header>
                        <Modal.Body className="py-2">
                            <h2 className="text-xl font-bold text-[#0A1F5C] mb-2">
                                Delete Book?
                            </h2>
                            <p className="text-sm text-slate-600 mb-6">
                                Are you sure you want to delete this event? This will permanently delete this book and all its data.
                            </p>
                        </Modal.Body>
                        <Modal.Footer className="flex justify-end gap-3 pt-4">
                            <Button
                                className="flex-1 border border-blue-200 text-[#0A1F5C] font-semibold rounded-2xl bg-blue-100 hover:bg-blue-200"
                                onPress={() => setIsDeleteOpen(false)}>
                                Cancel</Button>
                            <Button
                                className="flex-1 bg-red-500 text-white font-semibold rounded-2xl hover:bg-red-600 transition-all"
                                onPress={handleDeleteBook}>
                                Delete Book</Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
};

export default DeleteBookModal;