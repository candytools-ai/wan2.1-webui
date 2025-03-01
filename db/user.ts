"server-only";

import { genSaltSync, hashSync } from "bcrypt-ts";
import { db } from "@/db/api"
import { user, User, Order, order, contact, Contact } from "./schema";
import { eq } from "drizzle-orm";

export async function getUser(email: string): Promise<Array<User>> {
    try {
        const userData = await db
            .select()
            .from(user)
            .where(eq(user.email, email));

        return userData;
    } catch (error) {
        console.error(error);
        console.error("Failed to get user from database");
        throw error;
    }
}

export async function getUserById(userId: string) {
    try {
        const userData = await db
            .select()
            .from(user)
            .where(eq(user.id, userId));

        return userData;
    } catch (error) {
        console.error(error);
        console.error("Failed to get user info from database");
        throw error;
    }
}

export async function createUser(
    email: string,
    password: string,
    username: string
) {
    let salt = genSaltSync(10);
    let hash = hashSync(password, salt);

    try {
        return await db
            .insert(user)
            .values({ email, password: hash, name: username });
    } catch (error) {
        console.error("Failed to create user in database");
        throw error;
    }
}

export async function updateUserById(id: string, userData: any) {
    try {
        return await db.update(user).set(userData).where(eq(user.id, id));
    } catch (error) {
        console.error("Failed to update user info in database", error);
        throw error;
    }
}