"use client";

import { useState } from "react";
import {
    Card,
    Button,
    Input,
    TextArea,
} from "@heroui/react";

import { FaTrash, FaEdit, FaStar } from "react-icons/fa";

import {
    updateReview,
    deleteReview,
} from "@/lib/api/books/actions";

import { toast } from "react-toastify";

export default function UserReviewClient({
    reviews: initialReviews,
}) {
    const [reviews, setReviews] = useState(initialReviews);
    const [editing, setEditing] = useState(null);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");

    const handleDelete = async (id) => {
        await deleteReview(id);

        setReviews(
            reviews.filter((r) => r._id !== id)
        );

        toast.success("Review deleted.");
    };

    const handleEdit = (review) => {
        setEditing(review._id);
        setRating(review.rating);
        setComment(review.comment);
    };

    const handleSave = async (id) => {
        await updateReview(id, {
            rating,
            comment,
        });

        setReviews(reviews.map((r) => r._id === id ?
            { ...r, rating, comment, } : r));
        setEditing(null);
        toast.success("Review updated.");
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-[#0A1F5C]">
                    My Reviews
                </h1>
                <p className="text-slate-500">
                    Manage all of your reviews.
                </p>
            </div>

            <div className="space-y-5">
                {reviews.map((review) => (
                    <Card
                        key={review._id}
                        className="p-6"
                    >
                        <div className="flex justify-between">
                            <div className="flex-1">
                                <h2 className="font-bold text-xl">
                                    {review.bookTitle}
                                </h2>
                                {editing === review._id ? (
                                    <>
                                        <div className="mb-4">
                                            <p className="font-medium mb-2">
                                                Rating
                                            </p>

                                            <div className="flex gap-2">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <button
                                                        key={star}
                                                        type="button"
                                                        onClick={() => setRating(star)}
                                                    >
                                                        <FaStar
                                                            size={28}
                                                            className={
                                                                star <= rating
                                                                    ? "text-yellow-500"
                                                                    : "text-gray-300"
                                                            }
                                                        />
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <TextArea
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                            className="w-full"
                                        />

                                        <Button
                                            className="mt-3 bg-blue-500 text-white rounded-md text-end"
                                            onPress={() => handleSave(review._id)}>
                                            Save
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <div className="flex gap-1 mt-2">
                                            {[
                                                ...Array(review.rating),
                                            ].map((_, i) => (<FaStar key={i} className="text-yellow-500" />
                                            ))}
                                        </div>

                                        <p className="mt-4 text-slate-600">
                                            {review.comment}
                                        </p>
                                    </>
                                )}
                            </div>

                            <div className="flex gap-2">

                                <Button
                                    isIconOnly
                                    className="bg-blue-50 text-blue-500"
                                    onPress={() => handleEdit(review)}
                                >
                                    <FaEdit />
                                </Button>

                                <Button
                                    isIconOnly
                                    className="bg-red-50 text-red-500"
                                    onPress={() => handleDelete(review._id)}>
                                    <FaTrash />
                                </Button>

                            </div>
                        </div>
                    </Card>
                ))}

                {!reviews.length && (
                    <Card className="p-10 text-center">
                        <h2 className="text-xl font-semibold">
                            No reviews yet.
                        </h2>

                        <p className="text-slate-500 mt-2">
                            Your submitted reviews will appear here.
                        </p>
                    </Card>
                )}

            </div>
        </div>
    );
}