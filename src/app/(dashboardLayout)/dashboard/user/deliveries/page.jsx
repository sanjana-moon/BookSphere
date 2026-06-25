"use client";

import { fetchBooks } from "@/lib/api/books/data";
import {
    Card,
    Chip,
    Spinner,
} from "@heroui/react";
import { useEffect, useState } from "react";
import { FaBook, FaTruck } from "react-icons/fa";

const DeliveryPage = () => {
    const [deliveries, setDeliveries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDeliveries = async () => {
            try {
                const res = await fetchBooks("/api/");
                const data = await res.json();

                setDeliveries(data || []);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchDeliveries();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <Spinner size="lg" />
            </div>
        );
    }

    return (
        <div className="p-6 md:p-10">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-[#0A1F5C]">
                    Delivery History
                </h1>

                <p className="text-slate-500 mt-2">
                    Track all your book delivery requests.
                </p>
            </div>

            {deliveries.length === 0 ? (
                <Card className="p-10 text-center">
                    <div className="flex flex-col items-center gap-4">
                        <FaTruck className="text-5xl text-slate-300" />

                        <h2 className="text-xl font-semibold">
                            No Delivery Requests Found
                        </h2>

                        <p className="text-slate-500">
                            You haven't requested any books yet.
                        </p>
                    </div>
                </Card>
            ) : (
                <div className="grid gap-6">
                    {deliveries.map((delivery) => (
                        <Card
                            key={delivery._id}
                            className="border border-blue-100 shadow-md"
                        >
                            <div className="p-6">
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <FaBook className="text-blue-600" />

                                            <h3 className="text-xl font-bold text-[#0A1F5C]">
                                                {delivery.bookTitle}
                                            </h3>
                                        </div>

                                        <p className="text-slate-500 text-sm">
                                            Requested on{" "}
                                            {new Date(
                                                delivery.requestedAt
                                            ).toLocaleDateString()}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

                                        <div>
                                            <p className="text-xs text-slate-500">
                                                Quantity
                                            </p>

                                            <p className="font-semibold">
                                                {delivery.quantity}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-xs text-slate-500">
                                                Amount
                                            </p>

                                            <p className="font-semibold text-green-600">
                                                ৳{delivery.amount}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-xs text-slate-500">
                                                Transaction
                                            </p>

                                            <p className="font-semibold truncate max-w-[150px]">
                                                {delivery.transactionId}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-xs text-slate-500 mb-1">
                                                Status
                                            </p>

                                            <Chip
                                                color={
                                                    delivery.deliveryStatus ===
                                                    "Delivered"
                                                        ? "success"
                                                        : delivery.deliveryStatus ===
                                                          "Processing"
                                                        ? "primary"
                                                        : "warning"
                                                }
                                            >
                                                {delivery.deliveryStatus}
                                            </Chip>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DeliveryPage;