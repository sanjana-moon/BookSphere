import { updateBooks } from "@/lib/api/books/actions";
import { uploadImage } from "@/component/utils/uploadImage";
import { Button, Input, Card, TextArea } from "@heroui/react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const CATEGORIES = [
    "Fiction",
    "Non Fiction",
    "Science",
    "History",
    "Technology",
    "Biography",
    "Fantasy",
    "Children",
];

const EditBookModal = ({ isModalOpen, setIsModalOpen, editingBook }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            setLoading(true);

            const updateData = { ...data };
            delete updateData.image;

            if (data?.image?.[0]) {
                updateData.image = await uploadImage(data.image[0]);
            }

            const result = await updateBooks(updateData, editingBook?._id);

            if (result.modifiedCount) {
                setIsModalOpen(false);
                toast.success("Book updated successfully");
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to update book");
        } finally {
            setLoading(false);
        }
    };

    if (!isModalOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
            <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white/70 backdrop-blur-md border border-blue-100 rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-6 md:p-8">

                {/* Header */}
                <div className="mb-6 text-center">
                    <h1 className="text-2xl sm:text-3xl font-bold text-[#0A1F5C]">
                        Edit Book
                    </h1>
                    <p className="text-sm sm:text-base text-slate-600 mt-2">
                        Update the book details below.
                    </p>
                </div>

                {/* Card */}
                <Card className=" p-4 sm:p-6 md:p-8">

                    {/* Info Box */}
                    <div className="bg-blue-50 border border-ble-200 rounded-2xl p-4 mb-6 text-center">
                        <Image
                            src={editingBook?.image}
                            alt={editingBook?.title}
                            width={200}
                            height={200}
                            className="h-auto object-cover mx-auto" />
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 sm:space-y-6">

                        {/* Cover Image */}
                        <div>
                            <label className="block mb-2 font-semibold text-[#0A1F5C] text-sm sm:text-base">
                                Cover Image
                            </label>
                            <Input
                                type="file"
                                accept="image/*"
                                className="w-full sm:w-2/3 md:w-1/2"
                                {...register("image")}
                            />
                            <p className="text-xs text-slate-400 mt-1">Leave empty to keep existing image</p>
                        </div>

                        {/* Title + Author */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                            <div>
                                <label className="block mb-2 font-semibold text-[#0A1F5C] text-sm sm:text-base">
                                    Book Title
                                </label>
                                <Input
                                    defaultValue={editingBook?.title}
                                    placeholder="Enter the Book Name"
                                    className="w-full"
                                    {...register("title", { required: "Book title is required" })}
                                />
                                {errors.title && (
                                    <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block mb-2 font-semibold text-[#0A1F5C] text-sm sm:text-base">
                                    Author Name
                                </label>
                                <Input
                                    defaultValue={editingBook?.author}
                                    placeholder="Enter the author name"
                                    className="w-full"
                                    {...register("author", { required: "Author name is required" })}
                                />
                                {errors.author && (
                                    <p className="text-red-500 text-sm mt-1">{errors.author.message}</p>
                                )}
                            </div>
                        </div>

                        {/* Delivery Fee + Category */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                            <div>
                                <label className="block mb-2 font-semibold text-[#0A1F5C] text-sm sm:text-base">
                                    Delivery Fee
                                </label>
                                <Input
                                    defaultValue={editingBook?.deliveryFee}
                                    type="number"
                                    placeholder="Enter the delivery fee"
                                    className="w-full"
                                    {...register("deliveryFee", {
                                        required: "Delivery fee is required",
                                        min: { value: 0, message: "Fee cannot be negative" },
                                    })}
                                />
                                {errors.deliveryFee && (
                                    <p className="text-red-500 text-sm mt-1">{errors.deliveryFee.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block mb-2 font-semibold text-[#0A1F5C] text-sm sm:text-base">
                                    Category
                                </label>
                                <select
                                    defaultValue={editingBook?.category}
                                    {...register("category", { required: "Category is required" })}
                                    className="w-full px-4 py-3 rounded-xl border border-blue-200 bg-white focus:ring-2 focus:ring-[#2563EB] outline-none text-sm sm:text-base"
                                >
                                    <option value="">Select Category</option>
                                    {CATEGORIES.map((cat) => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                                {errors.category && (
                                    <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
                                )}
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block mb-2 font-semibold text-[#0A1F5C] text-sm sm:text-base">
                                Description
                            </label>
                            <TextArea
                                defaultValue={editingBook?.description}
                                placeholder="Write a short summary about the book..."
                                className="w-full"
                                rows={6}
                                {...register("description", { required: "Description is required" })}
                            />
                            {errors.description && (
                                <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                            )}
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-3">
                            <Button
                                type="button"
                                onPress={() => setIsModalOpen(false)}
                                className="flex-1 border border-blue-200 text-[#0A1F5C] font-semibold py-5 sm:py-6 rounded-2xl hover:bg-blue-50 transition-all text-sm sm:text-base"
                                variant="bordered"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                isLoading={loading}
                                className="flex-1 bg-[#2563EB] text-white font-semibold py-5 sm:py-6 rounded-2xl hover:bg-blue-700 transition-all text-sm sm:text-base"
                            >
                                {loading ? "Saving..." : "Save Changes"}
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
        </div>
    );
};

export default EditBookModal;