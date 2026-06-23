"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button, Link, Avatar } from "@heroui/react";
import { usePathname, useRouter } from "next/navigation";
import { TfiAlignLeft } from "react-icons/tfi";
import { RxCross2, RxAvatar } from "react-icons/rx";
import { MdLogin, MdLogout } from "react-icons/md";
import { LuUserRoundPlus } from "react-icons/lu";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import logo from "@/component/assets/images/image.png";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const MotionButton = motion.create(Button);

  const [isMounted, setIsMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthMenuOpen, setIsAuthMenuOpen] = useState(false);

  const { data: session } = authClient.useSession();
  const user = session?.user;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/");
  };

  const navLinkClass = (href) =>
    pathname === href
      ? "text-[#0A1F5C] border-b-2 border-[#EEF2FF] font-semibold rounded-none"
      : "text-[#6B7280] hover:text-[#0A1F5C] transition-colors";

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/books", label: "Browse Books" },
  ];

  const dashboardLinks = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/my-orders", label: "My Orders" },
    { href: "/wishlist", label: "Wishlist" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-[#E8EFFE] bg-[#EEF2FF]/80 backdrop-blur-md shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">

        {/* LOGO */}
        <Link href="/" className="no-underline">
          <Image
            src={logo}
            alt="BookSphere"
            width={200}
            height={200}
            className="h-auto"
          />
        </Link>

        {/* DESKTOP NAV */}
        <ul className="hidden lg:flex items-center gap-8 font-medium">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={navLinkClass(link.href)}
              >
                {link.label}
              </Link>
            </li>
          ))}

          {user && (
            <li className="relative group">
              <button className="text-[#6B7280] hover:text-[#0A1F5C]">
                Dashboard
              </button>

              <div className="absolute left-0 top-full hidden min-w-[180px] rounded-xl border border-[#E8EFFE] bg-white shadow-lg group-hover:block">
                {dashboardLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-4 py-3 text-[#6B7280] hover:bg-[#EEF2FF] hover:text-[#0A1F5C]"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </li>
          )}
        </ul>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-3">

          {/* DESKTOP AUTH */}
          <div className="hidden lg:flex items-center gap-3">
            {isMounted && user ? (
              <>
                <span className="text-[#0A1F5C] font-medium">
                  Hi, {user.name}
                </span>

                <Avatar
                  src={user.image}
                  name={user.name}
                />

                <MotionButton
                  radius="sm"
                  whileHover={{
                    scale: 1.05,
                    y: -2,
                    boxShadow:
                      "0 10px 25px rgba(59,130,246,0.25)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 15,
                  }}
                  onClick={handleSignOut}
                  className="bg-[#3B82F6] text-white rounded-md"
                >
                  <MdLogout />
                  Logout
                </MotionButton>
              </>
            ) : (
              <>
                <Link href="/login">
                  <MotionButton
                    radius="sm"
                    whileHover={{
                      scale: 1.05,
                      y: -2,
                      boxShadow:
                        "0 10px 25px rgba(59,130,246,0.25)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 15,
                    }}
                    className="bg-[#3B82F6] text-white rounded-md"
                  >
                    <MdLogin />
                    Login
                  </MotionButton>
                </Link>

                <Link href="/register">
                  <MotionButton
                    radius="sm"
                    whileHover={{
                      scale: 1.05,
                      y: -2,
                      boxShadow:
                        "0 10px 25px rgba(59,130,246,0.25)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 15,
                    }}
                    className="bg-[#3B82F6] text-white rounded-md"
                  >
                    <LuUserRoundPlus />
                    Register
                  </MotionButton>
                </Link>
              </>
            )}
          </div>

          {/* MOBILE HAMBURGER */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <RxCross2 className="text-2xl text-[#0A1F5C]" />
            ) : (
              <TfiAlignLeft className="text-2xl text-[#0A1F5C]" />
            )}
          </motion.button>

          {/* MOBILE USER ICON */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="lg:hidden"
            onClick={() => setIsAuthMenuOpen(!isAuthMenuOpen)}
          >
            {user ? (
              <Avatar
                src={user.image}
                name={user.name}
              />
            ) : (
              <RxAvatar className="text-3xl text-[#0A1F5C]" />
            )}
          </motion.button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: 1,
              height: "auto",
            }}
            exit={{
              opacity: 0,
              height: 0,
            }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-[#E8EFFE] bg-[#EEF2FF] lg:hidden"
          >
            <ul className="flex flex-col gap-4 p-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={navLinkClass(link.href)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}

              {user &&
                dashboardLinks.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={navLinkClass(item.href)}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MOBILE AUTH DROPDOWN */}
      <AnimatePresence>
        {isAuthMenuOpen && (
          <motion.div
            initial={{
              opacity: 0,
              y: -10,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: -10,
              scale: 0.95,
            }}
            transition={{ duration: 0.2 }}
            className="absolute right-4 top-20 z-50 lg:hidden"
          >
            <div className="min-w-[220px] rounded-xl border border-[#E8EFFE] bg-white p-4 shadow-xl">
              {user ? (
                <>
                  <div className="mb-4 flex flex-col items-center border-b pb-4">
                    <Avatar
                      src={user.image}
                      name={user.name}
                      className="mb-2"
                    />

                    <h2 className="font-semibold text-[#0A1F5C]">
                      {user.name}
                    </h2>

                    <p className="text-sm text-[#6B7280]">
                      {user.email}
                    </p>
                  </div>

                  <MotionButton
                    radius="sm"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSignOut}
                    className="w-full bg-[#3B82F6] text-white rounded-md"
                  >
                    <MdLogout />
                    Logout
                  </MotionButton>
                </>
              ) : (
                <div className="flex flex-col gap-3">
                  <Link href="/login">
                    <Button
                      radius="sm"
                      className="w-full bg-[#3B82F6] text-white rounded-md"
                    >
                      <MdLogin />
                      Login
                    </Button>
                  </Link>

                  <Link href="/register">
                    <Button
                      radius="sm"
                      className="w-full bg-[#3B82F6] text-white rounded-md"
                    >
                      <LuUserRoundPlus />
                      Register
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;