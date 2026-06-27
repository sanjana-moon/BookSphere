"use client";

import { Card } from "@heroui/react";

const DeliveryHistoryClient = ({ deliveries }) => {
    return (
        <div className="min-h-screen bg-[linear-gradient(135deg,#EEF2FF_0%,#E8EFFE_100%)] p-6">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-[#0A1F5C]">
                    Delivery History
                </h1>
                <p className="text-slate-600 mt-2 mb-8">
                    View all your delivery requests and their current status.
                </p>

                <Card className="rounded-3xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-blue-50">
                                <tr>
                                    <th className="px-6 py-4 text-left">
                                        Book Title
                                    </th>
                                    <th className="px-6 py-4 text-left">
                                        Delivery Fee
                                    </th>
                                    <th className="px-6 py-4 text-left">
                                        Request Date
                                    </th>
                                    <th className="px-6 py-4 text-left">
                                        Status
                                    </th>
                                </tr>
                            </thead>

                            <tbody>

                                {deliveries.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={4}
                                            className="py-8 text-center text-slate-500"
                                        >
                                            No delivery history found.
                                        </td>
                                    </tr>
                                ) : (
                                    deliveries.map((delivery) => (
                                        <tr
                                            key={delivery._id}
                                            className="border-t hover:bg-blue-50"
                                        >
                                            <td className="px-6 py-5 font-semibold">
                                                {delivery.bookTitle}
                                            </td>

                                            <td className="px-6 py-5">
                                                ৳{delivery.amount}
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
                                                    {delivery.deliveryStatus}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default DeliveryHistoryClient;