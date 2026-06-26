import { baseURL } from "@/lib/api/baseUrl";
import { stripe } from "@/lib/stripe";

import {
    Button,
    Card,
    CardFooter,
    CardHeader,
} from "@heroui/react";

import Link from "next/link";
import { FaArrowRight, FaCheckCircle } from "react-icons/fa";

export default async function PaymentSuccess({ searchParams }) {
    const { session_id } = await searchParams;

    if (!session_id) {
        throw new Error(
            "Please provide a valid session_id"
        );
    }

    const session = await stripe.checkout.sessions.retrieve(
        session_id,
        {
            expand: ["line_items", "payment_intent"],
        }
    );

    const paymentData = {
        bookId: session?.metadata?.bookId,
        bookTitle: session?.metadata?.bookTitle,
        quantity: Number(session?.metadata?.quantity),
        email: session?.metadata?.email,
        amount: Number(session?.metadata?.amount),
        paymentType: session?.metadata?.paymentType,
        transactionId: session?.payment_intent?.id,
        paymentStatus: session?.payment_status,
    };

    await fetch(`${baseURL}/api/books/delivery`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
    });

    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-[#EEF2FF] px-6 py-12">
            <Card className="w-full max-w-xl shadow-xl border border-blue-100">

                <CardHeader className="flex flex-col items-center text-center gap-3 py-8">
                    <div className="p-4 rounded-full bg-green-100 text-green-600">
                        <FaCheckCircle size={50} />
                    </div>

                    <h1 className="text-3xl font-bold text-[#0A1F5C]">
                        Payment Successful!
                    </h1>

                    <p className="text-slate-500">
                        Your delivery request has been submitted successfully.
                    </p>
                </CardHeader>

                <div className="p-6 bg-slate-50 rounded-xl mx-6">
                    <div className="space-y-4">

                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500">
                                Reader Email
                            </span>

                            <span className="font-semibold">
                                {session?.customer_email}
                            </span>
                        </div>

                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500">
                                Book
                            </span>

                            <span className="font-semibold">
                                {session?.metadata?.bookTitle}
                            </span>
                        </div>

                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500">
                                Quantity
                            </span>

                            <span className="font-semibold">
                                {session?.metadata?.quantity}
                            </span>
                        </div>

                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500">
                                Amount Paid
                            </span>

                            <span className="font-bold text-green-600">
                                ৳{session?.metadata?.amount}
                            </span>
                        </div>

                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500">
                                Transaction ID
                            </span>

                            <span className="font-semibold text-blue-600 truncate max-w-[220px]">
                                {session?.payment_intent?.id}
                            </span>
                        </div>

                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500">
                                Payment Status
                            </span>

                            <span className="font-semibold text-green-600 capitalize">
                                {session?.payment_status}
                            </span>
                        </div>

                    </div>
                </div>

                <CardFooter className="flex justify-center gap-3 py-8">

                    <Link href="/dashboard/user/user-deliveries">
                        <Button
                            className="bg-[#2563EB] text-white"
                            endContent={<FaArrowRight />}
                        >
                            View My Deliveries
                        </Button>
                    </Link>

                    <Link href="/books">
                        <Button variant="bordered">
                            Browse More Books
                        </Button>
                    </Link>

                </CardFooter>
            </Card>
        </div>
    );
}