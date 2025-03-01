import { LoginForm } from "@/components/login-form";

export default async function Page({ params }: any) {
    return (
        <div className="flex h-screen w-full items-center justify-center px-4">
            <LoginForm callbackUrl={"/"} />
        </div>
    );
}
