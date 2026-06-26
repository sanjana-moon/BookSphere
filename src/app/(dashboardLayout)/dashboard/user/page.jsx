"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { baseURL } from "@/lib/api/baseUrl";

import { Card, Spinner } from "@heroui/react";

import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
} from "recharts";

import {
    FaBook,
    FaTruck,
    FaMoneyBillWave,
} from "react-icons/fa";

const UserPage = () => {
    const { data: session } = useSession();

    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!session?.user?.email) return;

        const fetchDashboard = async () => {
            try {
                const res = await fetch(
                    `${baseURL}/api/user-stats/${session.user.email}`
                );

                const data = await res.json();

                setDashboard(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboard();
    }, [session]);

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <Spinner size="lg" />
            </div>
        );
    }

    const stats = [
        {
            title: "Total Books Read",
            value: dashboard?.totalBooksRead || 0,
            icon: <FaBook size={24} />,
        },
        {
            title: "Pending Deliveries",
            value: dashboard?.pendingDeliveries || 0,
            icon: <FaTruck size={24} />,
        },
        {
            title: "Total Spent",
            value: `৳${dashboard?.totalSpent || 0}`,
            icon: <FaMoneyBillWave size={24} />,
        },
    ];

    return (
        <div className="min-h-screen bg-[linear-gradient(135deg,#EEF2FF_0%,#E8EFFE_100%)] p-3 md:p-15">

            <div className="container mx-auto space-y-8">

                {/* Header */}

                <div>
                    <h1 className="text-4xl font-bold text-[#0A1F5C]">
                        Dashboard Overview
                    </h1>

                    <p className="text-slate-600 mt-2">
                        Track your reading history and deliveries.
                    </p>
                </div>

                {/* Stats */}

                <div className="grid md:grid-cols-3 gap-6">

                    {stats.map((item, index) => (
                        <Card
                            key={index}
                            className="bg-white/70 backdrop-blur-md border border-blue-100 rounded-3xl shadow-xl"
                        >
                            <div className="p-6">

                                <div className="flex justify-between items-center">

                                    <div>

                                        <p className="text-slate-500 text-sm">
                                            {item.title}
                                        </p>

                                        <h2 className="text-3xl font-bold text-[#0A1F5C] mt-2">
                                            {item.value}
                                        </h2>

                                    </div>

                                    <div className="bg-blue-100 p-4 rounded-2xl text-[#2563EB]">
                                        {item.icon}
                                    </div>

                                </div>

                            </div>
                        </Card>
                    ))}

                </div>

                {/* Chart + Recent Deliveries */}

                <div className="grid lg:grid-cols-3 gap-6">

                    {/* Chart */}

                    <Card className="lg:col-span-2 bg-white/70 backdrop-blur-md border border-blue-100 rounded-3xl shadow-xl">

                        <div className="p-4 md:p-6">

                            <h2 className="text-xl font-bold text-[#0A1F5C] mb-6">
                                Reading Overview
                            </h2>

                            <div className="h-72 md:h-80">

                                <ResponsiveContainer
                                    width="100%"
                                    height="100%"
                                >
                                    <BarChart
                                        data={dashboard?.chartData || []}
                                    >
                                        <XAxis dataKey="metric" />

                                        <YAxis />

                                        <Tooltip />

                                        <Bar
                                            dataKey="value"
                                            fill="#2563EB"
                                            radius={[8, 8, 0, 0]}
                                        />
                                    </BarChart>
                                </ResponsiveContainer>

                            </div>

                        </div>

                    </Card>

                    {/* Recent Deliveries */}

                    <Card className="bg-white/70 backdrop-blur-md border border-blue-100 rounded-3xl shadow-xl">

                        <div className="p-6">

                            <h2 className="text-xl font-bold text-[#0A1F5C] mb-6">
                                Recent Deliveries
                            </h2>

                            {dashboard?.recentDeliveries?.length === 0 ? (
                                <p className="text-slate-500">
                                    No deliveries yet.
                                </p>
                            ) : (
                                <div className="space-y-5">

                                    {dashboard?.recentDeliveries?.map(
                                        (delivery) => (
                                            <div
                                                key={delivery._id}
                                                className="border-b border-blue-100 pb-3"
                                            >
                                                <h3 className="font-semibold text-[#0A1F5C]">
                                                    {delivery.bookTitle}
                                                </h3>

                                                <p className="text-sm text-slate-500">
                                                    {new Date(
                                                        delivery.requestedAt
                                                    ).toLocaleDateString()}
                                                </p>

                                                <div className="flex justify-between mt-2">

                                                    <span className="text-sm text-blue-600 font-medium">
                                                        ৳{delivery.amount}
                                                    </span>

                                                    <span
                                                        className={`text-xs px-3 py-1 rounded-full ${delivery.deliveryStatus ===
                                                                "Delivered"
                                                                ? "bg-green-100 text-green-700"
                                                                : delivery.deliveryStatus ===
                                                                    "Processing"
                                                                    ? "bg-blue-100 text-blue-700"
                                                                    : "bg-yellow-100 text-yellow-700"
                                                            }`}
                                                    >
                                                        {
                                                            delivery.deliveryStatus
                                                        }
                                                    </span>

                                                </div>

                                            </div>
                                        )
                                    )}

                                </div>
                            )}

                        </div>

                    </Card>

                </div>

            </div>

        </div>
    );
};

export default UserPage;