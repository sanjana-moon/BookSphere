"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-toastify";

import { Button, Input, Card, TextArea, TextField } from "@heroui/react";

import { uploadImage } from "@/component/utils/uploadImage";
import { useSession } from "@/lib/auth-client";
import { addBooks } from "@/lib/api/books/actions";
import { redirect } from "next/navigation";

const AddBookPage = () => {
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const imageFile = data.image?.[0];
      const imageUrl = await uploadImage(imageFile);

      const bookData = {
        title: data.title,
        author: data.author,
        category: data.category,
        description: data.description,
        deliveryFee: Number(data.deliveryFee),
        image: imageUrl,

        librarianId: session.user.id,
        librarianEmail: session.user.email,
        librarianName: session.user.name,

        publishStatus: "Unpublished",

        availability: "Available",
        requestCount: 0,

        createdAt: new Date(),
        updatedAt: new Date(),
      };

      console.log('bookData', bookData);

      const result = await addBooks(bookData)
      console.log('result', result)

      if (result.insertedId) {
        toast.success("Book submitted successfully");
        reset();
        redirect("/all-books")
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit book");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-1 sm:p-6 md:p-8 w-full">
      <div className="container mx-auto max-w-3xl">

        {/* Header */}
        <div className="mb-6 sm:mb-8 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0A1F5C]">
            Add New Book
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Share your collection with readers across BookSphere.
          </p>
        </div>

        {/* Card */}
        <Card className="bg-white/70 backdrop-blur-md border border-blue-100 rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-6 md:p-8">

          {/* Info Box */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6 sm:mb-8 text-center">
            <h3 className="font-semibold text-amber-700 text-sm sm:text-base">
              Review Process
            </h3>
            <p className="text-xs sm:text-sm text-amber-600 mt-1">
              Every submitted book will be reviewed by administrators before appearing publicly.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 sm:space-y-6">

            {/* Image */}
            <div>
              <label className="block mb-2 font-semibold text-[#0A1F5C] text-sm sm:text-base">
                Cover Image
              </label>

              <Input
                type="file"
                accept="image/*"
                className="w-full sm:w-2/3 md:w-1/2"
                {...register("image", {
                  required: "Book image is required",
                })}
              />

              {errors.image && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.image.message}
                </p>
              )}
            </div>

            {/* Title + Author */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">

              <TextField>
                <label className="block mb-2 font-semibold text-[#0A1F5C] text-sm sm:text-base">
                  Book Title
                </label>
                <Input
                  label="Book Title"
                  placeholder="Enter the Book Name"
                  className="w-full"
                  {...register("title", {
                    required: "Book title is required",
                  })}
                />
                {errors.title && (
                  <p className="text-red-500 text-sm">{errors.title.message}</p>
                )}
              </TextField>

              <TextField>
                <label className="block mb-2 font-semibold text-[#0A1F5C] text-sm sm:text-base">
                  Author Name</label>
                <Input
                  label="Author Name"
                  placeholder="Enter the author name"
                  className="w-full"
                  {...register("author", {
                    required: "Author name is required",
                  })}
                />
                {errors.author && (
                  <p className="text-red-500 text-sm">{errors.author.message}</p>
                )}
              </TextField>

            </div>

            {/* Category + Fee */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">

              <div className="flex flex-col gap-2">
                <label className="block mb-2 font-semibold text-[#0A1F5C] text-sm sm:text-base">
                  Delivery Fee</label>
                <Input
                  type="number"
                  label="Delivery Fee (৳)"
                  placeholder="Enter the delivery fee"
                  className="w-full"
                  {...register("deliveryFee", {
                    required: "Delivery fee is required",
                    min: {
                      value: 0,
                      message: "Fee cannot be negative",
                    },
                  })}
                />
                {errors.deliveryFee && (
                  <p className="text-red-500 text-sm">
                    {errors.deliveryFee.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-2 font-semibold text-[#0A1F5C] text-sm sm:text-base">
                  Category
                </label>

                <select
                  {...register("category", {
                    required: "Category is required",
                  })}
                  className="w-full px-4 py-3 rounded-xl border border-blue-200 bg-white focus:ring-2 focus:ring-[#2563EB] outline-none text-sm sm:text-base"
                >
                  <option value="">Select Category</option>
                  <option value="Fiction">Fiction</option>
                  <option value="Non Fiction">Non Fiction</option>
                  <option value="Science">Science</option>
                  <option value="History">History</option>
                  <option value="Technology">Technology</option>
                  <option value="Biography">Biography</option>
                  <option value="Fantasy">Fantasy</option>
                  <option value="Children">Children</option>
                </select>

                {errors.category && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.category.message}
                  </p>
                )}
              </div>

            </div>

            {/* Description */}
            <div>
              <label className="block mb-2 font-semibold text-[#0A1F5C] text-sm sm:text-base">
                Description
              </label>
              <TextArea
                label="Description"
                placeholder="Write a short summary about the book..."
                className="w-full"
                rows={6}
                {...register("description", {
                  required: "Description is required",
                })}
              />
            </div>

            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}

            {/* Submit */}
            <Button
              type="submit"
              isLoading={loading}
              className="w-full bg-[#2563EB] text-white font-semibold py-5 sm:py-6 md:py-7 rounded-2xl hover:bg-blue-700 transition-all text-sm sm:text-base"
            >
              {loading ? "Submitting..." : "Submit Book For Approval"}
            </Button>

          </form>
        </Card>
      </div>
    </div>
  );
};

export default AddBookPage;