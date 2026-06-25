"use client"

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { Card, Spinner } from "@heroui/react";

import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
} from "recharts";

import {
    FaBook,
    FaMoneyBillWave,
    FaClock,
} from "react-icons/fa";

const LibrarianPage = () => {
    const { data: session } = useSession();
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!session?.user?.email) return;

        const loadData = async () => {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_SERVER_URI}/api/librarian-stats/${session.user.email}`
                );
                const data = await res.json();
                setStats(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [session?.user?.email]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <Spinner size="lg" />
            </div>
        );
    }

    const statCards = [
        {
            title: "Total Books Listed",
            value: stats?.totalBooks ?? 0,
            icon: <FaBook size={24} />,
        },
        {
            title: "Total Earnings",
            value: `৳${stats?.totalEarnings ?? 0}`,
            icon: <FaMoneyBillWave size={24} />,
        },
        {
            title: "Pending Requests",
            value: stats?.pendingRequests ?? 0,
            icon: <FaClock size={24} />,
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
                        Track your books, earnings and requests.
                    </p>
                </div>

                {/* Stats */}
                <div className="grid md:grid-cols-3 gap-6">
                    {statCards.map((item, index) => (
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

                {/* Chart + Popular Books */}
                <div className="grid lg:grid-cols-3 gap-6">

                    {/* Chart */}
                    <Card className="lg:col-span-2 bg-white/70 backdrop-blur-md border border-blue-100 rounded-3xl shadow-xl">
                        <div className="p-1 md:p-6">
                            <h2 className="text-xl font-bold text-[#0A1F5C] mb-6">
                                Earnings Overview
                            </h2>
                            <div className="h-37 md:h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={stats?.earningsChart ?? []}>
                                        <XAxis dataKey="month" />
                                        <YAxis />
                                        <Tooltip />
                                        <Line
                                            type="monotone"
                                            dataKey="earnings"
                                            stroke="#2563EB"
                                            strokeWidth={4}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </Card>

                    {/* Popular Books */}
                    <Card className="bg-white/70 backdrop-blur-md border border-blue-100 rounded-3xl shadow-xl">
                        <div className="p-6">
                            <h2 className="text-xl font-bold text-[#0A1F5C] mb-6">
                                Most Requested Books
                            </h2>

                            {stats?.popularBooks?.length === 0 ? (
                                <p className="text-slate-500 text-sm">
                                    No requests yet.
                                </p>
                            ) : (
                                <div className="space-y-4">
                                    {stats?.popularBooks?.map((book, index) => (
                                        <div
                                            key={index}
                                            className="flex justify-between items-center border-b border-blue-100 pb-3"
                                        >
                                            <div>
                                                <h3 className="font-semibold text-[#0A1F5C]">
                                                    {book.title}
                                                </h3>
                                                <p className="text-sm text-slate-500">
                                                    Requested frequently
                                                </p>
                                            </div>
                                            <div className="bg-blue-50 text-[#2563EB] font-bold px-3 py-1 rounded-xl">
                                                {book.requests}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </Card>

                </div>
            </div>
        </div>
    );
};

export default LibrarianPage;