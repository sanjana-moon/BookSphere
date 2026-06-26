"use client";

import { Card } from "@heroui/react";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";

const COLORS = [
    "#2563eb",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
    "#06b6d4",
    "#2806d4",
];

const AdminDashboardClient = ({ dashboard }) => {
    return (
        <div className="min-h-screen bg-[linear-gradient(135deg,#EEF2FF_0%,#E8EFFE_100%)] p-6">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-[#0A1F5C]">
                    Admin Dashboard
                </h1>
                <p className="text-slate-600 mt-2 mb-8">
                    Overview of the BookSphere platform.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card className="p-6 rounded-3xl">
                        <h3 className="text-slate-500">
                            Total Users
                        </h3>
                        <h1 className="text-4xl font-bold mt-2 text-blue-700">
                            {dashboard.totalUsers}
                        </h1>
                    </Card>
                    <Card className="p-6 rounded-3xl">
                        <h3 className="text-slate-500">
                            Total Books
                        </h3>

                        <h1 className="text-4xl font-bold mt-2 text-green-700">
                            {dashboard.totalBooks}
                        </h1>
                    </Card>
                    <Card className="p-6 rounded-3xl">
                        <h3 className="text-slate-500">
                            Deliveries
                        </h3>
                        <h1 className="text-4xl font-bold mt-2 text-yellow-600">
                            {dashboard.totalDeliveries}
                        </h1>
                    </Card>

                    <Card className="p-6 rounded-3xl">
                        <h3 className="text-slate-500">
                            Revenue
                        </h3>
                        <h1 className="text-4xl font-bold mt-2 text-red-600">
                            ৳{dashboard.totalRevenue}
                        </h1>
                    </Card>
                </div>
                <Card className="mt-8 rounded-3xl p-6">
                    <h2 className="text-2xl font-bold mb-6">
                        Books by Category
                    </h2>
                    <div className="w-full h-[420px]">
                        <ResponsiveContainer>
                            <PieChart>

                                <Pie
                                    data={dashboard.booksByCategory}
                                    dataKey="value"
                                    nameKey="category"
                                    outerRadius={140}
                                    label
                                >
                                    {dashboard.booksByCategory.map(
                                        (_, index) => (
                                            <Cell
                                                key={index}
                                                fill={
                                                    COLORS[
                                                        index %
                                                            COLORS.length
                                                    ]
                                                }
                                            />
                                        )
                                    )}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default AdminDashboardClient;