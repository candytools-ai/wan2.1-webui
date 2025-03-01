"use client";

import {
    BadgeCheck,
    Bell,
    ChevronsUpDown,
    CreditCard,
    LogOut,
    Sparkles,
    User,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar";
import { signOut, useSession } from "next-auth/react";
import { CreditsIcon, Icons } from "./shared/icons";
import { useContext, useEffect } from "react";
import { ModalContext } from "./modals/providers";
import { motion } from "framer-motion";
import { sidebarLinks } from "@/config/dashboard";

const variants = {
    open: {
        x: 0,
        opacity: 1,
        transition: {
            x: { stiffness: 1000, velocity: -100 },
        },
    },
    closed: {
        x: -20,
        opacity: 0,
        transition: {
            x: { stiffness: 100 },
        },
    },
};

export interface NavUserParams {
    side?: "bottom" | "right" | "top" | "left";
    isCollapsed: boolean;
}

export function NavUser({ side, isCollapsed }: NavUserParams) {
    const { isMobile } = useSidebar();
    const { setShowSignInModal } = useContext(ModalContext);
    const { data: session } = useSession();
    const user: any = session?.user;

    return (
        <>
            <SidebarMenu>
                <SidebarMenuItem>
                    <DropdownMenu>
                        <DropdownMenuTrigger
                            asChild
                            className="!border-none !outline-none !focus:outline-none"
                        >
                            <SidebarMenuButton
                                size="lg"
                                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground md:h-8 md:p-0 !border-none !outline-none !focus:outline-none"
                            >
                                <Avatar className="h-8 w-8 rounded-lg">
                                    <AvatarImage
                                        src={user?.image}
                                        alt={user?.name}
                                    />
                                    <AvatarFallback className="rounded-lg">
                                        <Icons.user className="size-4" />
                                    </AvatarFallback>
                                </Avatar>
                                {!isCollapsed ? (
                                    <>
                                        <div className="grid flex-1 text-left text-sm leading-tight">
                                            <span className="truncate font-semibold">
                                                {user?.name}
                                            </span>
                                            <span className="truncate text-xs">
                                                {user?.email}
                                            </span>
                                        </div>
                                        <ChevronsUpDown className="ml-auto size-4" />
                                    </>
                                ) : null}
                            </SidebarMenuButton>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                            side={isMobile ? side || "bottom" : side || "right"}
                            align="end"
                            sideOffset={4}
                        >
                            <DropdownMenuLabel className="p-0 font-normal">
                                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                    <Avatar className="h-8 w-8 rounded-lg">
                                        <AvatarImage
                                            src={user?.image}
                                            alt={user?.name}
                                        />
                                        <AvatarFallback className="rounded-lg">
                                            <Icons.user className="size-4" />
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-semibold">
                                            {user?.name}
                                        </span>
                                        <span className="truncate text-xs">
                                            {user?.email}
                                        </span>
                                    </div>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <DropdownMenuItem asChild>
                                    <a
                                        href="/pricing"
                                        className="cursor-pointer"
                                    >
                                        <Sparkles />
                                        Upgrade to Pro
                                        <a
                                            href="/pricing"
                                            className="inline-flex items-center gap-0.5 bg-border text-foreground text-xs font-medium pl-2 pr-2.5 rounded-full py-1"
                                        >
                                            <CreditsIcon className="text-[#ffcc55]" />
                                            {user?.credits}
                                        </a>
                                    </a>
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                {sidebarLinks
                                    .filter((item) => item.title === "MENU")[0]
                                    .items.map(({ href, icon, title }: any) => {
                                        const Icon = Icons[icon];
                                        return (
                                            <DropdownMenuItem
                                                asChild
                                                key={href}
                                            >
                                                <a
                                                    key={href}
                                                    href={href}
                                                    className="cursor-pointer"
                                                >
                                                    <>
                                                        {/* {Icons[icon]} */}
                                                        {/* <BadgeCheck /> */}
                                                        <Icon className="size-5" />
                                                        {title}
                                                    </>
                                                </a>
                                            </DropdownMenuItem>
                                        );
                                    })}
                                {/* <DropdownMenuItem asChild>
                                    <a
                                        href="/account"
                                        className="cursor-pointer"
                                    >
                                        <BadgeCheck />
                                        Account
                                    </a>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <a
                                        href="/billing"
                                        className="cursor-pointer"
                                    >
                                        <CreditCard />
                                        Billing
                                    </a>
                                </DropdownMenuItem> */}
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                className="cursor-pointer"
                                onSelect={(event) => {
                                    event.preventDefault();
                                    signOut({
                                        callbackUrl: `${window.location.origin}/`,
                                    });
                                }}
                            >
                                <LogOut />
                                Log out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </SidebarMenuItem>
            </SidebarMenu>
            {/* <DropdownMenu modal={false}>
                <DropdownMenuTrigger className="w-full">
                    <div className="flex h-10 w-full flex-row items-center gap-2 rounded-md py-1.5 transition hover:bg-muted hover:text-primary">
                        <Avatar className="h-8 w-8 rounded-lg">
                            <AvatarImage src={user?.image} alt={user?.name} />
                            <AvatarFallback className="rounded-lg">
                                <User className="size-4" />
                            </AvatarFallback>
                        </Avatar>
                        <motion.li
                            variants={variants}
                            className="flex w-full items-center gap-2"
                        >
                            {!isCollapsed && (
                                <div className="flex items-center">
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-semibold">
                                            {user?.name}
                                        </span>
                                        <span className="truncate text-xs">
                                            {user?.email}
                                        </span>
                                    </div>
                                    <ChevronsUpDown className="ml-auto size-4" />
                                </div>
                            )}
                        </motion.li>
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent sideOffset={5}>
                    <DropdownMenuLabel className="p-0 font-normal">
                        <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                            <Avatar className="h-8 w-8 rounded-lg">
                                <AvatarImage
                                    src={user?.image}
                                    alt={user?.name}
                                />
                                <AvatarFallback className="rounded-lg">
                                    <User className="size-4" />
                                </AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold">
                                    {user?.name}
                                </span>
                                <span className="truncate text-xs">
                                    {user?.email}
                                </span>
                            </div>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem asChild>
                            <a href="/pricing">
                                <Sparkles />
                                Upgrade to Pro
                            </a>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem asChild>
                            <a href="/account">
                                <BadgeCheck />
                                Account
                            </a>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <a href="/billing">
                                <CreditCard />
                                Billing
                            </a>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        className="cursor-pointer"
                        onSelect={(event) => {
                            event.preventDefault();
                            signOut({
                                callbackUrl: `${window.location.origin}/`,
                            });
                        }}
                    >
                        <LogOut />
                        Log out
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu> */}
        </>
    );
}
