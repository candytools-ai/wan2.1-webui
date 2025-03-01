"use client";

import { NavUser } from "@/components/nav-user";
import { SignInButton } from "@/components/shared/signin-button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ICreation } from "@/hooks/use-creation-video";
import { Menu } from "lucide-react";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";

export default function CreationHeader({
    use,
    creation,
}: {
    use: string;
    creation: ICreation;
}) {
    const t = useTranslations(use || "Home");
    const { data: session } = useSession();
    const user: any = session?.user;

    return (
        <>
            <header className="sticky top-0 z-[11] flex shrink-0 items-center justify-between gap-2 bg-background p-4">
                <div>
                    <SidebarTrigger className="md:hidden flex">
                        <Menu />
                    </SidebarTrigger>
                </div>
                <div className="flex items-center gap-3">
                    {user ? (
                        <NavUser side="bottom" isCollapsed={true} />
                    ) : (
                        <SignInButton />
                    )}
                </div>
            </header>
        </>
    );
}
