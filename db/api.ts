"server-only";

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { contact } from "./schema";
import * as schema from './schema';

// Optionally, if not using email/pass login, you can
// use the Drizzle adapter for Auth.js / NextAuth
// https://authjs.dev/reference/adapter/drizzle
let client = postgres(`${process.env.POSTGRES_URL!}?sslmode=require`);
export let db = drizzle(client, { schema });

export * from "@/db/user"
export * from "@/db/order"
export * from "@/db/video"



export async function contactUs({
    email,
    name,
    message,
}: {
    email: string;
    name?: string;
    message?: string;
}) {
    try {
        const data: any = {
            email,
        };
        if (name) data.name = name;
        if (message) data.message = message;
        return await db.insert(contact).values(data);
    } catch (error) {
        console.error("Failed to save concat us in database");
        throw error;
    }
}
