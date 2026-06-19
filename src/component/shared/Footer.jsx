import logo from "@/component/assets/images/image.png";

import Image from "next/image";
import Link from "next/link";

import {
    FaFacebookF,
    FaInstagram,
    FaLinkedinIn,
    FaPhoneAlt,
} from "react-icons/fa";

import { MdEmail } from "react-icons/md";
import { RiTwitterXLine } from "react-icons/ri";

const Footer = () => {
    return (
        <footer className="text-[#1B2F4F] font-fauna">
            <div className="mx-auto grid grid-cols-1 gap-10 container py-14 md:grid-cols-3 px-4 md:px-2">
                <div className="mx-auto lg:mx-0">
                    <Image
                        src={logo}
                        alt="BookSphere Logo"
                        width={180}
                        height={120}
                        className="mb-4 w-auto mx-auto lg:mx-0" />
                    <p className="max-w-sm text-sm leading-7 italic text-justify lg:text-start">
                        "BookSphere connects passionate readers with an endless universe of stories—cultivating the ideal space for literary exploration and intellectual community."
                    </p>
                </div>

                <div className="text-center">
                    <h3 className="mb-5 text-xl font-semibold font-cinzel">
                        Links
                    </h3>
                    <ul className="space-y-3 flex justify-evenly sm:flex-col">
                        <li><Link href="/" className="transition">Home</Link></li>
                        <li><Link href="/all-books" className="transition">All Books</Link></li>
                        <li><Link href="/about" className="transition">About Us</Link></li>
                    </ul>
                </div>

                <div className="text-center lg:text-start">
                    <h3 className="mb-5 text-xl font-semibold font-cinzel">
                        Contact
                    </h3>
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 justify-center lg:justify-start">
                            <MdEmail className="text-lg" />
                            <p>support@booksphere.com</p>
                        </div>
                        <div className="flex items-center gap-3 justify-center lg:justify-start">
                            <FaPhoneAlt className="text-sm" />
                            <p>+880 1234-567890</p>
                        </div>
                    </div>

                    <div className="mt-6 flex items-center gap-6 md:gap-4 justify-center lg:justify-start">
                        <a href="#"
                            className="rounded-full border border-blue-600 p-2 transition">
                            <FaFacebookF className="text-sm" />
                        </a>
                        <a href="#"
                            className="rounded-full border border-blue-600 p-2 transition">
                            <RiTwitterXLine className="text-sm" />
                        </a>
                        <a href="#"
                            className="rounded-full border border-blue-600 p-2 transition">
                            <FaLinkedinIn className="text-sm" />
                        </a>
                        <a href="#"
                            className="rounded-full border border-blue-600 p-2 transition">
                            <FaInstagram className="text-sm" />
                        </a>
                    </div>
                </div>
            </div>

            <div className="border-b-2 border-[#6C91B2]"></div>

            <div className="border-t border-white/10 py-4 text-center text-sm text-[#1B2F4F]">
                © {new Date().getFullYear()} BookSphere. All rights reserved.
            </div>



        </footer>
    );
};

export default Footer;