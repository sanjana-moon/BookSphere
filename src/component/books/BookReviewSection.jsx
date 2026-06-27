"use client";

import { useState } from "react";
import { Card, Button, Modal, TextArea, } from "@heroui/react";
import { FaStar } from "react-icons/fa";
import { toast } from "react-toastify";
import { addReview } from "@/lib/api/books/actions";
import { BiEdit } from "react-icons/bi";

export default function BookReviewSection({ reviews, canReview, book, user, }) {
    const [reviewList, setReviewList] = useState(reviews || []);

    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!user) {
            toast.error("Please login first.");
            return;
        }
        if (!comment.trim()) {
            toast.error("Please write your review.");
            return;
        }
        setLoading(true);
        try {
            const reviewData = {
                bookId: book._id,
                bookTitle: book.title,
                userEmail: user.email,
                userName: user.name,
                rating,
                comment,
            };

            await addReview(reviewData);
            setReviewList((prev) => [
                {
                    ...reviewData,
                    createdAt: new Date().toISOString(),
                },
                ...prev,
            ]);
            toast.success("Review submitted successfully.");
            setComment("");
            setRating(5);
        } catch (error) {
            toast.error(error?.message || "Failed to submit review.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="mt-16">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-3xl font-bold">
                        Reader Reviews
                    </h2>
                    <p className="text-slate-500 mt-1">
                        {reviewList.length} Review
                        {reviewList.length !== 1 &&
                            "s"}
                    </p>
                </div>
            </div>

            <div className="space-y-5">
                {reviewList.length === 0 && (
                    <Card className="p-10 text-center">
                        <h3 className="text-xl font-semibold">
                            No reviews yet
                        </h3>

                        <p className="text-slate-500 mt-2">
                            Be the first reader to
                            review this book.
                        </p>
                    </Card>
                )}

                {reviewList.map((review) => (
                    <Card
                        key={review._id || review.createdAt}
                        className="p-6"
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-semibold text-lg">
                                    {
                                        review.userName
                                    }
                                </h3>
                                <div className="flex gap-1 mt-2">
                                    {[...Array(5)].map((_, i) => (
                                        <FaStar key={i} className={i < review.rating ?
                                            "text-yellow-500"
                                            : "text-gray-300"
                                        }
                                        />
                                    )
                                    )}
                                </div>
                                <p className="text-slate-600 mt-4">
                                    {
                                        review.comment
                                    }
                                </p>
                                <p className="text-xs text-slate-400 mt-4">
                                    {new Date(
                                        review.createdAt
                                    ).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
            <Modal>
                <Button
                    color="primary"
                    className={!canReview ? "hidden" : ""}
                >
                    Write Review
                </Button>
                <Modal.Backdrop>
                    <Modal.Container>
                        <Modal.Dialog className="sm:max-w-[550px]">
                            <Modal.CloseTrigger />
                            <Modal.Header>
                                <Modal.Icon className="bg-primary/10 text-primary">
                                    <BiEdit className="size-5" />
                                </Modal.Icon>
                                <Modal.Heading className="text-xl font-bold text-blue-600 text-center">
                                    Share Your Review
                                </Modal.Heading>
                            </Modal.Header>
                            <Modal.Body>
                                <div className="space-y-6">
                                    <div>
                                        <p className="font-semibold mb-3">
                                            Rating
                                        </p>
                                        <div className="flex gap-2">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <button
                                                    key={star}
                                                    type="button"
                                                    onClick={() =>
                                                        setRating(star)
                                                    }
                                                >
                                                    <FaStar
                                                        size={28}
                                                        className={
                                                            star <= rating
                                                                ? "text-yellow-600"
                                                                : "text-gray-300"
                                                        }
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <TextArea
                                        label="Your Review"
                                        className="w-full border border-bl"
                                        placeholder="Tell others what you think about this book..."
                                        value={comment}
                                        onChange={(e) =>
                                            setComment(
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button
                                    className={"bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-800 rounded-md"}
                                    slot="close"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    className={"bg-blue-600 text-white hover:bg-blue-800 rounded-md"}
                                    isLoading={loading}
                                    onPress={async () => {
                                        await handleSubmit();
                                    }}
                                    slot="close"
                                >
                                    Submit Review
                                </Button>
                            </Modal.Footer>
                        </Modal.Dialog>
                    </Modal.Container>
                </Modal.Backdrop>
            </Modal>

        </section >
    );
}