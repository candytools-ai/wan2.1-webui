import { createUser, getUser } from "@/db/api";
import { signIn } from "@/app/(auth)/auth";

export async function POST(request: Request) {
    try {
        const { email, username, password } = await request.json();

        if (password.length < 6) {
            return Response.json(
                "password length should be more than 6 characters",
                { status: 400 }
            );
        }

        // 查询用户是否存在
        let [user] = await getUser(email);
        if (user) {
            return Response.json("User already exists", { status: 401 });
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
}
