import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGO_URI);
const db = client.db("booksphere");

export const auth = betterAuth({
    database: mongodbAdapter(db, {
        client
    }),
    emailAndPassword: {
        enabled: true,
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENTID,
            clientSecret: process.env.GOOGLE_SECRET
        }
    },
    user: {
        additionalFields: {
            role: {
                type: "string",
                defaultValue: "user",
                input: true, // allow client to set this on signup
            },
            isBlocked: {
                type: "boolean",
                defaultValue: false,
                input: false, // server-controlled — don't trust client input
            },
            isPremium: {
                type: "boolean",
                defaultValue: false,
                input: false, // server-controlled — don't trust client input
            },
        },
    }
});