"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useState, FormEvent } from "react";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import to from "await-to-js";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ButtonLoading } from "@/components/ui/button-loading";
import { Github, Google } from "@/components/shared/icons";
import { post, validateEmail } from "@/lib/utils";

export function RegisterForm({ callbackUrl }: { callbackUrl: string }) {
    const t = useTranslations("Sign");
    const [loadingGoogle, setLoadingGoogle] = useState(false);
    const [loadingGithub, setLoadingGithub] = useState(false);
    const [pending, setPending] = useState(false);
    const [error, setError] = useState<string>();
    const router = useRouter();

    const onSignInByGoogle = async () => {
        setLoadingGoogle(true);
        const [error, res] = await to(
            signIn("google", { redirectTo: callbackUrl || "/" })
        );

        if (error) {
            console.error(error);
            toast.error("login google error!");
        }

        setTimeout(() => {
            setLoadingGoogle(false);
            // setOpenLogin(false);
        }, 8000);
    };

    const onSignInByGithub = async () => {
        setLoadingGithub(true);
        const [error, res] = await to(
            signIn("github", { redirectTo: callbackUrl || "/" })
        );

        if (error) {
            console.error(error);
            toast.error("login google error!");
        }

        setTimeout(() => {
            setLoadingGithub(false);
            // setOpenLogin(false);
        }, 8000);
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const email = (formData.get("email") as string) || "";
        const username = (formData.get("username") as string) || "";
        const password = (formData.get("password") as string) || "";
        const confirmPassword =
            (formData.get("confirm-password") as string) || "";

        if (!validateEmail(email)) {
            toast.error("Email address is incorrect!");
            return;
        }
        if (!email) {
            toast.error("Email address is empty!");
            return;
        }
        if (!username) {
            toast.error("UserName is empty!");
            return;
        }
        if (!password) {
            toast.error("Password is empty!");
            return;
        }
        if (password !== confirmPassword) {
            toast.error("Password inconsistency!");
            return;
        }

        setPending(true);



        // const signInResult = await signIn("resend", {
        //     email: email.toLowerCase(),
        //     redirect: false,
        //     callbackUrl: "/",
        // });
    
        // setPending(false);
    
        // if (!signInResult?.ok) {
        //     console.info("Something went wrong.", signInResult)
        //     return toast.error("Something went wrong.", {
        //     description: "Your sign in request failed. Please try again."
        //     });
        // }
    
        // toast.success("Check your email", {
        //     description: "We sent you a login link. Be sure to check your spam too.",
        // });


        // setTimeout(() => {
        //     router.push(callbackUrl || "/");
        // }, 500);
        

        const [err, res] = await to(
            post(`/api/auth/signup`, { email, username, password })
        );

        if (err) {
            toast.error(err.message);
            setPending(false);
            return;
        }

        toast.success("Sign Up Success!");
        setPending(false);
        router.push(callbackUrl || "/");
    };

    return (
        <>
            <Card className="mx-auto max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">
                        {t("signup_title")}
                    </CardTitle>
                    <CardDescription>{t("signup_description")}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4">
                        <div className="grid grid-cols-2 gap-6">
                            <ButtonLoading
                                variant="outline"
                                loading={loadingGithub}
                                onClick={onSignInByGithub}
                            >
                                <Github className="mr-2 h-4 w-4" />
                                {t("signup_with_github")}
                            </ButtonLoading>
                            <ButtonLoading
                                variant="outline"
                                loading={loadingGoogle}
                                onClick={onSignInByGoogle}
                            >
                                <Google className="mr-2 h-4 w-4" />
                                {t("signup_with_google")}
                            </ButtonLoading>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-muted-foreground">
                                    {t("signup_or")}
                                </span>
                            </div>
                        </div>
                        <form
                            action="/api/auth/signup"
                            method="post"
                            onSubmit={handleSubmit}
                            className="grid gap-4"
                        >
                            <div className="grid gap-2">
                                <Label htmlFor="email">
                                    {t("signup_label_email")}
                                </Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                    autoComplete="email"
                                    autoFocus
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="username">
                                    {t("signup_label_name")}
                                </Label>
                                <Input id="username" name="username" required />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">
                                        {t("signup_label_password")}
                                    </Label>
                                </div>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="confirm-password">
                                        {t("signup_label_confirm_password")}
                                    </Label>
                                </div>
                                <Input
                                    id="confirm-password"
                                    name="confirm-password"
                                    type="password"
                                    required
                                />
                            </div>
                            {error && (
                                <p className="text-[0.8rem] font-medium text-destructive">
                                    {t("error", { error })}
                                </p>
                            )}
                            <ButtonLoading
                                type={pending ? "button" : "submit"}
                                loading={pending}
                                className="relative"
                            >
                                {t("signup_btn")}
                            </ButtonLoading>
                        </form>
                    </div>
                    <div className="mt-4 text-center text-sm">
                        {t("signup_not_account")}{" "}
                        <a href="/login" className="underline">
                            {t("login_txt")}
                        </a>
                    </div>
                </CardContent>
            </Card>
        </>
    );
}
