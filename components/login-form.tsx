"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ButtonLoading } from "./ui/button-loading";
import { useState, FormEvent } from "react";
import to from "await-to-js";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { Github, Google } from "@/components/shared/icons";
import { cn, validateEmail } from "@/lib/utils";

interface ILoginFormParams {
    callbackUrl: string;
    setOpenLogin?: any;
}

export function LoginForm({ callbackUrl, setOpenLogin }: ILoginFormParams) {
    const t = useTranslations("Sign");
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams.toString());
    const [loadingGoogle, setLoadingGoogle] = useState(false);
    const [loadingGithub, setLoadingGithub] = useState(false);
    const [pending, setPending] = useState(false);
    const [error, setError] = useState<string>();
    const router = useRouter();

    if (setOpenLogin) {
        callbackUrl = `${pathname}${
            params.toString() ? "?" + params.toString() : ""
        }`;
    }

    console.info(
        "pathname, searchParams",
        `${pathname}${params.toString() ? "?" + params.toString() : ""}`
    );

    const onSignInByGoogle = async () => {
        setLoadingGoogle(true);
        callbackUrl = `${pathname}${
            params.toString() ? "?" + params.toString() : ""
        }`;
        const [error, res] = await to(
            signIn("google", { redirectTo: callbackUrl || "/" })
        );

        if (error) {
            console.error(error);
            toast.error("login google error!");
        }

        setTimeout(() => {
            setLoadingGoogle(false);
        }, 8000);
    };

    const onSignInByGithub = async () => {
        setLoadingGithub(true);
        callbackUrl = `${pathname}${
            params.toString() ? "?" + params.toString() : ""
        }`;
        const [error, res] = await to(
            signIn("github", { redirectTo: callbackUrl || "/" })
        );

        if (error) {
            console.error(error);
            toast.error("login google error!");
        }

        setTimeout(() => {
            setLoadingGithub(false);
        }, 8000);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const email = (formData.get("email") as string) || "";
        const password = (formData.get("password") as string) || "";
        callbackUrl = `${pathname}${
            params.toString() ? "?" + params.toString() : ""
        }`;

        if (!validateEmail(email)) {
            toast.error("Email address is incorrect!");
            return;
        }
        if (!email) {
            toast.error("Email address is empty!");
            return;
        }
        if (!password) {
            toast.error("Password is empty!");
            return;
        }

        setPending(true);

        signIn("credentials", {
            email,
            password,
            redirect: false,
        }).then((result) => {
            console.info(result);
            if (result?.error) {
                setError(result.error);
                toast.error("Invalid credentials.");
            } else {
                if (!setOpenLogin) {
                    router.push(callbackUrl || "/");
                } else {
                    router.refresh();
                    setOpenLogin(false);
                }
            }
            setPending(false);
        });
    };

    return (
        <>
            <Card
                className={cn(
                    "mx-auto max-w-sm",
                    setOpenLogin ? "border-0 shadow-none" : ""
                )}
            >
                <CardHeader>
                    <CardTitle className="text-2xl">
                        {t("login_title")}
                    </CardTitle>
                    <CardDescription>{t("login_description")}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4">
                        <form
                            action="/api/auth/callback/credentials"
                            method="post"
                            onSubmit={handleSubmit}
                            className="grid gap-4"
                        >
                            <div className="grid gap-2">
                                <Label htmlFor="email">
                                    {t("login_label_email")}
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
                                <div className="flex items-center">
                                    <Label htmlFor="password">
                                        {t("login_label_password")}
                                    </Label>
                                </div>
                                <Input
                                    id="password"
                                    name="password"
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
                                {t("login_txt")}
                            </ButtonLoading>
                        </form>
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-muted-foreground">
                                    {t("login_or")}
                                </span>
                            </div>
                        </div>
                        <ButtonLoading
                            loading={loadingGoogle}
                            onClick={onSignInByGoogle}
                        >
                            <Google className="w-5 h-5" />
                            {t("login_with_google")}
                        </ButtonLoading>
                        <ButtonLoading
                            loading={loadingGithub}
                            onClick={onSignInByGithub}
                        >
                            <Github className="w-5 h-5" />
                            {t("login_with_github")}
                        </ButtonLoading>
                    </div>
                    <div className="mt-4 text-center text-sm">
                        {t("login_not_account")}{" "}
                        <a href="/register" className="underline">
                            {t("signup_txt")}
                        </a>
                    </div>
                </CardContent>
            </Card>
        </>
    );
}
