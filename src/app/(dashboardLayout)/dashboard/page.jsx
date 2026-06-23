"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";

const DashboardPage = () => {
    const router = useRouter();
    const { data: session, isPending } = useSession();

    useEffect(() => {
        if (isPending) return;

        const role = session?.user?.role;

        if (role === "admin") {
            router.replace("/dashboard/admin");
        } else if (role === "librarian") {
            router.replace("/dashboard/librarian");
        } else if (role === "user") {
            router.replace("/dashboard/user");
        } else {
            router.replace("/");
        }
    }, [session, isPending, router]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-[linear-gradient(135deg,#EEF2FF_0%,#E8EFFE_100%)]">
            <div className="bg-white/70 backdrop-blur-md border border-blue-100 rounded-3xl px-8 py-6 shadow-xl">
                <h2 className="text-xl font-bold text-[#0A1F5C]">
                    Loading Dashboard...
                </h2>
            </div>
        </div>
    );
};

export default DashboardPage;