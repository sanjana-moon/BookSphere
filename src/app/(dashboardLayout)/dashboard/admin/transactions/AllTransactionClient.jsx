"use client";

import { Card } from "@heroui/react";

const AllTransactionClient = ({
    transactions,
}) => {
    return (
        <div className="min-h-screen bg-[linear-gradient(135deg,#EEF2FF_0%,#E8EFFE_100%)] p-6">
            <div className="max-w-7xl mx-auto">

                <h1 className="text-3xl font-bold text-[#0A1F5C]">
                    All Transactions
                </h1>

                <p className="text-slate-600 mt-2 mb-8">
                    View every payment made in the system.
                </p>

                <Card className="rounded-3xl overflow-hidden">
                    <div className="overflow-x-auto">

                        <table className="w-full">
                            <thead className="bg-blue-50">
                                <tr>
                                    <th className="px-6 py-4 text-left">
                                        Transaction ID
                                    </th>

                                    <th className="px-6 py-4 text-left">
                                        User Email
                                    </th>

                                    <th className="px-6 py-4 text-left">
                                        Librarian Email
                                    </th>

                                    <th className="px-6 py-4 text-left">
                                        Amount
                                    </th>

                                    <th className="px-6 py-4 text-left">
                                        Date
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {transactions.map((item) => (
                                    <tr
                                        key={item._id}
                                        className="border-t hover:bg-blue-50"
                                    >
                                        <td className="px-6 py-5 font-medium">
                                            {item.transactionId}
                                        </td>

                                        <td className="px-6 py-5">
                                            {item.userEmail}
                                        </td>

                                        <td className="px-6 py-5">
                                            {item.librarianEmail}
                                        </td>

                                        <td className="px-6 py-5">
                                            ৳{item.amount}
                                        </td>

                                        <td className="px-6 py-5">
                                            {new Date(
                                                item.paidAt
                                            ).toLocaleDateString()}
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

export default AllTransactionClient;