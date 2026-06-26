"use client";

import { useState } from "react";
import { Card, Button } from "@heroui/react";
import { toast } from "react-toastify";
import { updateDeliveryStatus } from "@/lib/api/books/actions";

const DeliveryClient = ({ deliveries: initialDeliveries }) => {
    const [deliveries, setDeliveries] = useState(
        initialDeliveries || []
    );

    const handleStatus = async (delivery) => {
        if (delivery.deliveryStatus === "Delivered") return;

        try {
            const res = await updateDeliveryStatus(
                delivery._id
            );

            setDeliveries((prev) =>
                prev.map((item) =>
                    item._id === delivery._id
                        ? {
                              ...item,
                              deliveryStatus:
                                  res.deliveryStatus,
                          }
                        : item
                )
            );
            toast.success("Delivery updated.");
        } catch (err) {
            toast.error(
                "Failed to update delivery."
            );
        }
    };

    return (
        <div className="min-h-screen bg-[linear-gradient(135deg,#EEF2FF_0%,#E8EFFE_100%)] p-6">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-[#0A1F5C]">
                    Manage Deliveries
                </h1>
                <p className="text-slate-600 mt-2 mb-8">
                    Track and update delivery status.
                </p>

                <Card className="rounded-3xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-blue-50">
                                <tr>
                                    <th className="px-6 py-4 text-left">
                                        Client Email
                                    </th>
                                    <th className="px-6 py-4 text-left">
                                        Book
                                    </th>
                                    <th className="px-6 py-4 text-left">
                                        Date
                                    </th>
                                    <th className="px-6 py-4 text-left">
                                        Status
                                    </th>
                                    <th className="px-6 py-4 text-center">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>

                                {deliveries.map((delivery) => (
                                    <tr
                                        key={delivery._id}
                                        className="border-t hover:bg-blue-50"
                                    >
                                        <td className="px-6 py-5">
                                            {delivery.readerEmail}
                                        </td>
                                        <td className="px-6 py-5 font-semibold">
                                            {delivery.bookTitle}
                                        </td>
                                        <td className="px-6 py-5">
                                            {new Date(
                                                delivery.requestedAt
                                            ).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-5">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-semibold
                                                ${
                                                    delivery.deliveryStatus ===
                                                    "Pending"
                                                        ? "bg-yellow-100 text-yellow-700"
                                                        : delivery.deliveryStatus ===
                                                          "Dispatched"
                                                        ? "bg-blue-100 text-blue-700"
                                                        : "bg-green-100 text-green-700"
                                                }`}
                                            >
                                                {
                                                    delivery.deliveryStatus
                                                }
                                            </span>
                                        </td>
                                        <td className="px-6 py-5 text-center">

                                            <Button
                                                color="primary"
                                                isDisabled={
                                                    delivery.deliveryStatus ===
                                                    "Delivered"
                                                }
                                                onPress={() =>
                                                    handleStatus(
                                                        delivery
                                                    )
                                                }
                                            >
                                                {delivery.deliveryStatus ===
                                                "Pending"
                                                    ? "Dispatch"
                                                    : delivery.deliveryStatus ===
                                                      "Dispatched"
                                                    ? "Deliver"
                                                    : "Completed"}
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default DeliveryClient;