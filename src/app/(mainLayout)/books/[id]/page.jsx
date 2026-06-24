import Link from "next/link";
import { Card, Button } from "@heroui/react";
import Image from "next/image";
import { FaArrowLeft } from "react-icons/fa";
import BookPurchaseWidget from "@/component/books/BookPurchaseWidget";
import { baseURL } from "@/lib/api/baseUrl";

const fetchBook = async (id) => {
    const res = await fetch(`${baseURL}/api/single-book/${id}`);
    const data = await res.json();
    return data;
};

export default async function BookDetailsPage({ params }) {
    const { id } = await params;
    const book = await fetchBook(id);

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#EEF2FF] via-white to-[#F8FAFF] py-12 px-4">

            {/* BACK BUTTON */}
            <div className="max-w-7xl mx-auto mb-8">
                <Link href="/books">
                    <Button
                        variant="light"
                        startContent={<FaArrowLeft />}
                        className="text-slate-600 hover:text-[#0A1F5C]"
                    >
                        Back to Books
                    </Button>
                </Link>
            </div>

            {/* MAIN LAYOUT */}
            <div className="max-w-7xl mx-auto grid lg:grid-cols-5 gap-10 bg-blue-50 rounded-2xl p-5 md:p-10">

                {/* LEFT: IMAGE */}
                <div className="lg:col-span-2">
                    <Card className="overflow-hidden shadow-2xl border border-blue-100 rounded-2xl ">
                        <Image
                            src={book?.image}
                            alt={book?.title}
                            width={600}
                            height={900}
                            className="w-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                    </Card>
                </div>

                {/* RIGHT: DETAILS */}
                <div className="lg:col-span-3 space-y-6 ">

                    {/* TITLE */}
                    <div>
                        <h1 className="text-5xl font-extrabold text-[#0A1F5C] leading-tight">
                            {book?.title}
                        </h1>

                        <p className="text-xl text-slate-600 mt-2">
                            by {book?.author}
                        </p>
                    </div>

                    {/* BADGES */}
                    <div className="flex flex-wrap gap-3">
                        <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                            {book?.category}
                        </span>

                        <span
                            className={`px-4 py-2 rounded-full text-sm font-medium ${
                                book?.publishStatus === "Published"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                            }`}
                        >
                            {book?.publishStatus}
                        </span>
                    </div>

                    {/* INFO CARD */}
                    <Card className="p-6 border border-blue-100 shadow-md bg-white/80 backdrop-blur">
                        <div className="grid sm:grid-cols-2 gap-6">

                            <div>
                                <p className="text-slate-500 text-sm">Delivery Fee</p>
                                <p className="text-2xl font-bold text-[#2563EB]">
                                    ৳{book?.deliveryFee}
                                </p>
                            </div>

                            <div>
                                <p className="text-slate-500 text-sm">Added Date</p>
                                <p className="font-medium text-slate-700">
                                    {new Date(book?.createdAt).toLocaleDateString()}
                                </p>
                            </div>

                            <div className="sm:col-span-2">
                                <p className="text-slate-500 text-sm">Librarian</p>
                                <p className="font-medium text-blue-600">
                                    {book?.ownerEmail}
                                </p>
                            </div>

                        </div>
                    </Card>

                    {/* DESCRIPTION */}
                    <Card className="p-6 border border-blue-100 shadow-md bg-white/80 backdrop-blur">
                        <h2 className="text-xl font-bold text-[#0A1F5C] mb-3">
                            About This Book
                        </h2>

                        <p className="text-slate-700 leading-7 whitespace-pre-line">
                            {book?.description || "No description available for this book."}
                        </p>
                    </Card>

                    {/* PURCHASE WIDGET */}
                    <BookPurchaseWidget
                        deliveryFee={book?.deliveryFee}
                        availability={book?.availability || 1}
                        bookId={book?._id}
                        bookTitle={book?.title}
                    />
                </div>
            </div>
        </div>
    );
}