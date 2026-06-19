import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

console.log("MONGO_URI:", process.env.MONGODB_URI);
if (!process.env.MONGODB_URI) {
  throw new Error("MONGO_URI is not defined in environment variables");
}

const client = new MongoClient(process.env.MONGODB_URI);
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
});