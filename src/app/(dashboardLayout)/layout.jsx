"use client";
import DashboardSideBar from "@/component/dashboard/DashboardSideBar";

const DashboardLayout = ({ children }) => {

    return (
        <div className="min-h-screen flex bg-[#EEF2FF]/80">
            <DashboardSideBar />
            <div className="px-6 py-10 container w-full">
                {children}
            </div>
        </div>
    );
};

export default DashboardLayout;