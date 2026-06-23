"use client";

import logo from "@/component/assets/images/image.png";
import logo2 from "@/component/assets/images/logo-sm.png";
import { authClient, useSession } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
    FaBook,
    FaBookOpen,
    FaBoxOpen,
    FaCheckCircle,
    FaHistory,
    FaHome,
    FaPlusCircle,
    FaSignOutAlt,
    FaStar,
    FaTachometerAlt,
    FaTruck,
    FaUserShield,
} from "react-icons/fa";
import { toast } from "react-toastify";

const userMenu = [
    { key: "overview", label: "Overview", icon: FaTachometerAlt, href: "/dashboard/user" },
    { key: "deliveries", label: "Delivery History", icon: FaTruck, href: "/dashboard/user/deliveries" },
    { key: "reading-list", label: "My Reading List", icon: FaBookOpen, href: "/dashboard/user/reading-list" },
    { key: "reviews", label: "My Reviews", icon: FaStar, href: "/dashboard/user/reviews" },
];

const librarianMenu = [
    { key: "overview", label: "Overview", icon: FaTachometerAlt, href: "/dashboard/librarian" },
    { key: "add-book", label: "Add Book", icon: FaPlusCircle, href: "/dashboard/librarian/add-books" },
    { key: "inventory", label: "Manage Inventory", icon: FaBoxOpen, href: "/dashboard/librarian/inventory" },
    { key: "deliveries", label: "Manage Deliveries", icon: FaTruck, href: "/dashboard/librarian/deliveries" },
];

const adminMenu = [
    { key: "overview", label: "Overview", icon: FaTachometerAlt, href: "/dashboard/admin" },
    { key: "approval-queue", label: "Book Approval Queue", icon: FaCheckCircle, href: "/dashboard/admin/approval-queue" },
    { key: "users", label: "Manage Users", icon: FaUserShield, href: "/dashboard/admin/users" },
    { key: "books", label: "Manage All Books", icon: FaBook, href: "/dashboard/admin/books" },
    { key: "transactions", label: "View All Transactions", icon: FaHistory, href: "/dashboard/admin/transactions" },
];

// Compact, hover-to-expand content — used only below `lg`
const CompactSidebarContent = ({ session, role, menuItems, isActiveRoute, handleLogout, expanded }) => (
    <div className="h-full flex flex-col">
        <div className="px-4 py-6 border-b border-blue-200/40 flex items-center justify-center">
            {expanded ? (
                <Link href="/" className="no-underline">
                    <Image
                        src={logo}
                        alt="BookSphere Logo"
                        width={180}
                        height={126}
                        className="border border-red-500" />
                </Link>
            ) : (
                <Link href="/" className="no-underline">
                    <Image
                        src={logo2}
                        alt="BookSphere"
                        width={300}
                        height={300}
                        className="w-full h-full object-cover"
                    />
                </Link>
            )}
        </div>

        <div className="p-4">
            <div className={`bg-white/60 backdrop-blur-sm border border-blue-200/40 rounded-2xl ${expanded ? "p-4" : "p-2"}`}>
                <div className={`flex items-center gap-3 ${expanded ? "" : "justify-center"}`}>
                    <div className="w-12 h-12 shrink-0 rounded-full overflow-hidden border-2 border-[#2563EB]">
                        <Image
                            src={
                                session?.user?.image ||
                                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                    session?.user?.name || "User"
                                )}&background=EEF2FF&color=2563EB`
                            }
                            alt="User"
                            width={48}
                            height={48}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {expanded && (
                        <div className="overflow-hidden">
                            <h3 className="text-slate-800 font-bold truncate text-base">
                                {session?.user?.name || "Guest"}
                            </h3>
                            <p className="text-[#2563EB] text-xs font-semibold uppercase tracking-wider mt-1">
                                {role || "Member"}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>

        <div className="flex-1 px-3 overflow-y-auto overflow-x-hidden">
            {expanded && (
                <p className="text-slate-500 text-xs uppercase tracking-[0.2em] font-semibold px-2 mb-4">
                    Dashboard
                </p>
            )}

            <div className="space-y-2">
                {menuItems.map((item) => {
                    const isActive = isActiveRoute(item);
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.key}
                            href={item.href}
                            title={item.label}
                            className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300 group
                ${expanded ? "" : "justify-center"}
                ${isActive ? "bg-[#2563EB]/10 text-[#2563EB] font-semibold" : "text-slate-700 hover:bg-white/60 hover:text-[#2563EB]"}`}>
                            <div
                                className={`w-10 h-10 shrink-0 rounded-xl flex items-center justify-center transition-all
                  ${isActive ? "bg-[#2563EB]/10 text-[#2563EB]" : "bg-white/70 group-hover:bg-white"}`}>
                                <Icon size={18} />
                            </div>
                            {expanded && <span className="font-medium whitespace-nowrap">{item.label}</span>}
                        </Link>
                    );
                })}
            </div>
        </div>

        <div className="p-3 border-t border-blue-200/40">
            <Link
                href="/"
                title="Back to Site"
                className={`flex items-center gap-3 px-3 py-3 rounded-xl text-slate-700 hover:bg-white/60 hover:text-[#2563EB] transition-all duration-300 ${expanded ? "" : "justify-center"}`}
            >
                <div className="w-10 h-10 shrink-0 rounded-xl bg-white/60 flex items-center justify-center">
                    <FaHome />
                </div>
                {expanded && "Back to Site"}
            </Link>

            <button
                onClick={handleLogout}
                title="Sign Out"
                className={`w-full mt-2 flex items-center gap-3 px-3 py-3 rounded-xl text-slate-700 hover:bg-red-50 hover:text-red-500 transition-all duration-300 ${expanded ? "" : "justify-center"}`}
            >
                <div className="w-10 h-10 shrink-0 rounded-xl bg-white/60 flex items-center justify-center">
                    <FaSignOutAlt />
                </div>
                {expanded && "Sign Out"}
            </button>

            {expanded && (
                <div className="mt-5 bg-white/60 backdrop-blur-sm border border-blue-200/40 rounded-2xl p-4 text-center">
                    <h3 className="text-slate-800 font-bold">BookSphere</h3>
                    <p className="text-[#2563EB] text-xs font-semibold mt-1">
                        Discover • Borrow • Read
                    </p>
                    <div className="h-px bg-blue-200/40 my-3" />
                    <p className="text-slate-500 text-[11px]">
                        Delivering Knowledge to Your Doorstep
                    </p>
                </div>
            )}
        </div>
    </div>
);

const DashboardSideBar = () => {
    const { data: session } = useSession();
    const pathname = usePathname();
    const router = useRouter();
    const [compactExpanded, setCompactExpanded] = useState(false);

    const role = session?.user?.role;

    const handleLogout = async () => {
        try {
            await authClient.signOut();
            toast.success("Logged out successfully");
            router.push("/");
        } catch (error) {
            toast.error("Failed to logout");
            console.error(error);
        }
    };

    const menuItems =
        role === "librarian"
            ? librarianMenu
            : role === "user"
                ? userMenu
                : role === "admin"
                    ? adminMenu
                    : [];

    const isActiveRoute = (item) => {
        const isDashboardRoot =
            item.href === "/dashboard/librarian" ||
            item.href === "/dashboard/user" ||
            item.href === "/dashboard/admin";

        if (isDashboardRoot) {
            return pathname === item.href;
        }

        return pathname === item.href || pathname.startsWith(item.href + "/");
    };

    return (
        <>
            {/* Below lg: icon-only sidebar, expands on hover/tap. Fixed + overlay so it doesn't shove page content. */}
            <div className="lg:hidden w-20 shrink-0" aria-hidden="true" />
            <aside
                onMouseEnter={() => setCompactExpanded(true)}
                onMouseLeave={() => setCompactExpanded(false)}
                onClick={() => setCompactExpanded((prev) => !prev)}
                className={`lg:hidden fixed left-0 top-0 h-screen border-r border-blue-200/40 bg-[linear-gradient(135deg,#EEF2FF_0%,#E8EFFE_100%)] transition-all duration-300 ease-in-out overflow-hidden z-40 ${compactExpanded ? "w-72 shadow-2xl" : "w-20"
                    }`}
            >
                <CompactSidebarContent
                    session={session}
                    role={role}
                    menuItems={menuItems}
                    isActiveRoute={isActiveRoute}
                    handleLogout={handleLogout}
                    expanded={compactExpanded}
                />
            </aside>

            {/* lg and up: original sidebar, unchanged */}
            <aside className="hidden lg:block w-72 h-screen sticky top-0 border-r border-blue-200/40 bg-[linear-gradient(135deg,#EEF2FF_0%,#E8EFFE_100%)]">
                <div className="h-full flex flex-col">

                    {/* Logo */}
                    <div className="px-6 py-6 border-b border-blue-200/40">
                        <Link href="/">
                            <Image
                                src={logo}
                                alt="BookSphere Logo"
                                width={200}
                                height={140}
                                className="mx-auto"
                            />
                        </Link>
                    </div>

                    {/* Profile */}
                    <div className="p-5">
                        <div className="bg-white/60 backdrop-blur-sm border border-blue-200/40 rounded-2xl p-4">
                            <div className="flex items-center gap-3">
                                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#2563EB]">
                                    <Image
                                        src={
                                            session?.user?.image ||
                                            `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                                session?.user?.name || "User"
                                            )}&background=EEF2FF&color=2563EB`
                                        }
                                        alt="User"
                                        width={56}
                                        height={56}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <div className="overflow-hidden">
                                    <h3 className="text-slate-800 font-bold truncate text-base">
                                        {session?.user?.name || "Guest"}
                                    </h3>
                                    <p className="text-[#2563EB] text-xs font-semibold uppercase tracking-wider mt-1">
                                        {role || "Member"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Menu */}
                    <div className="flex-1 px-4 overflow-y-auto">
                        <p className="text-slate-500 text-xs uppercase tracking-[0.2em] font-semibold px-2 mb-4">
                            Dashboard
                        </p>

                        <div className="space-y-2">
                            {menuItems.map((item) => {
                                const isActive = isActiveRoute(item);
                                const Icon = item.icon;

                                return (
                                    <Link
                                        key={item.key}
                                        href={item.href}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group
                    ${isActive ? "bg-[#2563EB]/10 text-[#2563EB] font-semibold" : "text-slate-700 hover:bg-white/60 hover:text-[#2563EB]"}`}>
                                        <div
                                            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all
                      ${isActive ? "bg-[#2563EB]/10 text-[#2563EB]" : "bg-white/70 group-hover:bg-white"}`}>
                                            <Icon size={18} />
                                        </div>
                                        <span className="font-medium">{item.label}</span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* Bottom Section */}
                    <div className="p-4 border-t border-blue-200/40">

                        <Link
                            href="/"
                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-700 hover:bg-white/60 hover:text-[#2563EB] transition-all duration-300"
                        >
                            <div className="w-10 h-10 rounded-xl bg-white/60 flex items-center justify-center">
                                <FaHome />
                            </div>
                            Back to Site
                        </Link>

                        <button
                            onClick={handleLogout}
                            className="w-full mt-2 flex items-center gap-3 px-4 py-3 rounded-xl text-slate-700 hover:bg-red-50 hover:text-red-500 transition-all duration-300"
                        >
                            <div className="w-10 h-10 rounded-xl bg-white/60 flex items-center justify-center">
                                <FaSignOutAlt />
                            </div>
                            Sign Out
                        </button>

                        {/* Brand */}
                        <div className="mt-5 bg-white/60 backdrop-blur-sm border border-blue-200/40 rounded-2xl p-4 text-center">
                            <h3 className="text-slate-800 font-bold">BookSphere</h3>
                            <p className="text-[#2563EB] text-xs font-semibold mt-1">
                                Discover • Borrow • Read
                            </p>
                            <div className="h-px bg-blue-200/40 my-3" />
                            <p className="text-slate-500 text-[11px]">
                                Delivering Knowledge to Your Doorstep
                            </p>
                        </div>
                    </div>

                </div>
            </aside>
        </>
    );
};

export default DashboardSideBar;