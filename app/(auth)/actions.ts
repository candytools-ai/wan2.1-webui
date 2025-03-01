"use server";

import { z } from "zod";

import { createUser, getUser } from "@/db/api";

import { signIn } from "./auth";

const authFormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

export interface RegisterActionState {
    email: string;
    username: string;
    password: string;
}

export interface LoginActionState {
    status: "idle" | "in_progress" | "success" | "failed" | "invalid_data";
}

export const login = async (
    _: LoginActionState,
    formData: FormData
): Promise<LoginActionState> => {
    try {
        const validatedData = authFormSchema.parse({
            email: formData.get("email"),
            password: formData.get("password"),
        });

        await signIn("credentials", {
            email: validatedData.email,
            password: validatedData.password,
            redirect: false,
        });

        return { status: "success" };
    } catch (error) {
        if (error instanceof z.ZodError) {
            return { status: "invalid_data" };
        }

        return { status: "failed" };
    }
};

export const register = async ({
    email,
    username,
    password,
}: RegisterActionState) => {
    try {
        if (password.length < 6) {
            return new Response(
                "password length should be more than 6 characters",
                { status: 400 }
            );
        }

        // 查询用户是否存在
        let [user] = await getUser(email);
        if (user) {
            return new Response("User already exists", { status: 401 });
        } else {
            await createUser(email, password, username);
            await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            return Response.json({ email }, { status: 200 });
        }
    } catch (error: any) {
        console.error(error);
        return Response.json({ message: "An error occurred" }, { status: 400 });
    }
};
