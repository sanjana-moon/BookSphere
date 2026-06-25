"use client";

import { useState } from "react";
import { Button, Input, Modal } from "@heroui/react";
import { FaCheck } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useSession } from "@/lib/auth-client";

export default function BookPurchaseWidget({
    deliveryFee,
    availability,
    bookId,
    bookTitle,
}) {
    const [quantity, setQuantity] = useState(1);

    const { data: session } = useSession();
    const user = session?.user;

    const isUnavailable =
        availability === "Checked Out" ||
        availability === "Unavailable";

    const totalAmount = (
        Number(deliveryFee) * quantity
    ).toFixed(2);

    const handleRequestDelivery = async () => {
        try {
            const paymentData = {
                type: "book_delivery",
                deliveryFee: Number(deliveryFee),
                totalAmount: Number(totalAmount),
                bookId,
                bookTitle,
                deliveryFee,
                quantity,
            };
            const res = await fetch("/api/checkout_sessions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(paymentData),
            });

            const data = await res.json();

            if (data?.url) {
                window.location.href = data.url;
            }
        } catch (error) {
            console.error(error);
        }

    };

    return (
        <Modal>
            <Button
                className="bg-[#2563EB] text-white font-bold px-8 h-12 flex justify-end rounded-md text-right"
            >
                Request Delivery </Button>
            <Modal.Backdrop>
                <Modal.Container>
                    <Modal.Dialog className="sm:max-w-[500px] rounded-2xl">
                        <Modal.CloseTrigger>
                            <IoClose className="text-xl" />
                        </Modal.CloseTrigger>

                        <Modal.Header>
                            <Modal.Heading className="text-[#0A1F5C] rounded-md content-end">
                                Request Delivery
                            </Modal.Heading>
                        </Modal.Header>

                        <Modal.Body>
                            {!user ? (
                                <p className="text-center text-red-500 py-4">
                                    Please login to request delivery.
                                </p>
                            ) : user?.role !== "user" ? (
                                <p className="text-center text-red-500 py-4">
                                    {user?.role?.toUpperCase()} cannot request
                                    delivery.
                                </p>
                            ) : (
                                <div className="space-y-6">
                                    <div className="space-y-4">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-slate-500">
                                                Book:
                                            </span>

                                            <span className="font-semibold text-[#0A1F5C]">
                                                {bookTitle}
                                            </span>
                                        </div>

                                        <div className="flex justify-between text-sm">
                                            <span className="text-slate-500">
                                                Delivery Fee:
                                            </span>

                                            <span className="text-blue-600 font-bold text-lg">
                                                ৳{Number(deliveryFee).toFixed(2)}
                                            </span>
                                        </div>

                                        <div className="flex justify-between text-sm">
                                            <span className="text-slate-500">
                                                Availability:
                                            </span>

                                            <span className="font-semibold">
                                                {isUnavailable ? (
                                                    <span className="text-red-500">
                                                        Checked Out
                                                    </span>
                                                ) : (
                                                    availability
                                                )}
                                            </span>
                                        </div>
                                    </div>

                                    {!isUnavailable && (
                                        <>
                                            <Input
                                                label="Quantity"
                                                type="number"
                                                min={1}
                                                value={String(quantity)}
                                                onChange={(e) =>
                                                    setQuantity(
                                                        Math.max(
                                                            1,
                                                            Number(e.target.value)
                                                        )
                                                    )
                                                }
                                            />

                                            <div className="flex justify-between font-semibold">
                                                <span>Total:</span>

                                                <span className="text-[#2563EB] text-lg">
                                                    ৳{totalAmount}
                                                </span>
                                            </div>
                                        </>
                                    )}

                                    <Button
                                        isDisabled={isUnavailable}
                                        onClick={handleRequestDelivery}
                                        className="w-full bg-[#2563EB] text-white rounded-md"
                                    >
                                        {isUnavailable
                                            ? "Checked Out"
                                            : "Confirm & Pay"}
                                    </Button>

                                    <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
                                        <FaCheck className="text-green-500" />
                                        <span>
                                            Secure checkout | Fast delivery
                                            system
                                        </span>
                                    </div>
                                </div>
                            )}
                        </Modal.Body>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}
