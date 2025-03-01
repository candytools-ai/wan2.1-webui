"use client";
// import { Sparkles } from "@/components/ui/icons/sparkles";
// import { CreditsIcon } from "@/components/ui/icons/creditsIcon";
import { cn } from "@/lib/utils";
import { CreditsIcon } from "@/components/shared/icons";
import { ModalContext } from "@/components/modals/providers";
import { useContext } from "react";
import { Button } from "../ui/button";

export function SignInButton({
    children,
    icon,
    loading = false,
    className = "",
    onClick = () => {},
    credits = 10,
}: any) {
    const { setShowSignInModal } = useContext(ModalContext);

    return (
        <>
            <Button
                className={cn("rounded-full", className)}
                onClick={() => setShowSignInModal(true)}
            >
                Sign in
            </Button>
        </>
    );
}
