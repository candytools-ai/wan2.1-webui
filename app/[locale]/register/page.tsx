import { RegisterForm } from "@/components/register-form";

export default async function Page({ params }: any) {
    return (
        <div className="flex h-screen w-full items-center justify-center px-4">
            <RegisterForm callbackUrl={"/"} />
        </div>
    );
}
