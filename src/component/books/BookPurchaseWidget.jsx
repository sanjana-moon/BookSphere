"use client";

import { useState } from "react";
import { Card, Button, Input } from "@heroui/react";
import { FaCheck } from "react-icons/fa";
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

    const isUnavailable = availability <= 0;

    const totalAmount = Number(deliveryFee).toFixed(2) * quantity;

    const handleRequestDelivery = async () => {
        const paymentData = {
            type: "book_delivery",
            deliveryFee: Number(deliveryFee).toFixed(2),
            bookId,
            bookTitle,
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
    };

    return (
        <Card className="border border-blue-100 bg-white/80 backdrop-blur-md shadow-xl sticky top-24" radius="lg">

            {user?.role === "user" ? (
                <div className="p-8 space-y-6">

                    <h3 className="text-xl font-bold text-[#0A1F5C]">
                        Request Delivery
                    </h3>

                    {/* Info */}
                    <div className="space-y-4">

                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500">Delivery Fee:</span>
                            <span className="text-blue-600 font-extrabold text-xl">
                                {deliveryFee === 0 ? "Free" : `৳${Number(deliveryFee).toFixed(2)}`}
                            </span>
                        </div>

                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500">Availability:</span>
                            <span className="font-bold">
                                {isUnavailable ? (
                                    <span className="text-red-500 uppercase">Checked Out</span>
                                ) : (
                                    `${availability} Available`
                                )}
                            </span>
                        </div>
                    </div>

                    {/* Quantity */}
                    {!isUnavailable && (
                        <>
                            <Input
                                onChange={(e) =>
                                    setQuantity(Number(e.target.value))
                                }
                                type="number"
                                label="Quantity"
                                // labelPlacement="outside"
                                placeholder="1"
                                min={1}
                                max={availability}
                                className="border border-blue-200 focus-within:!border-blue-500"
                            />

                            <div className="flex justify-between text-sm font-semibold pt-2">
                                <span>Total:</span>
                                <span className="text-[#2563EB] text-lg">
                                    ৳{totalAmount}
                                </span>
                            </div>
                        </>
                    )}

                    {/* Button */}
                    <Button
                        isDisabled={isUnavailable}
                        onClick={handleRequestDelivery}
                        className={`w-full font-bold h-12 ${
                            isUnavailable
                                ? "bg-slate-200 text-slate-500 cursor-not-allowed"
                                : "bg-[#2563EB] text-white hover:bg-blue-700"
                        }`}
                        radius="lg"
                    >
                        {isUnavailable ? "Checked Out" : "Request Delivery"}
                    </Button>

                    <div className="flex items-center gap-2 text-[11px] text-slate-500 justify-center">
                        <FaCheck className="text-green-500" />
                        <span>Secure checkout | Fast delivery system</span>
                    </div>
                </div>
            ) : (
                <Card className="p-6 text-red-500 text-center">
                    {user?.role?.toUpperCase()} cannot request delivery
                </Card>
            )}
        </Card>
    );
}