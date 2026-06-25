import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import { getUser } from "@/lib/api/session";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
    try {
        const headersList = await headers();
        const origin = headersList.get("origin");
        const body = await req.json();
        const user = await getUser();

        const {
            type,
            bookId,
            bookTitle,
            quantity,
            totalAmount,
            deliveryFee 
        } = body;

        console.log(body);

        if (!user) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const lineObj = {
            price_data: {
                currency: "bdt",
                unit_amount: Number(deliveryFee) * 100,
                product_data: {
                    name: bookTitle,
                    description: "Book Delivery Request",
                },
            },
            quantity: quantity,
        };

        const metaObj = {
            email: user?.email || "",
            userId: user?.id || "",
            bookId: bookId || "",
            paymentType: type || "book_delivery",
            bookTitle: bookTitle || "",
            amount: totalAmount?.toString() || "0",
            quantity: quantity?.toString() || "1",
        };

        const session = await stripe.checkout.sessions.create({
            customer_email: user.email,
            payment_method_types: ["card"],
            line_items: [lineObj],
            metadata: metaObj,
            mode: "payment",

            success_url: `${origin}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/books/${bookId}`,
        });

        return NextResponse.json({
            url: session.url,
        });
    } catch (error) {
        console.error("Stripe Error:", error);

        return NextResponse.json(
            {
                error: error.message,
            },
            {
                status: 500,
            }
        );
    }
}