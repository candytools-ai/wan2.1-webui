"use client";

import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "@/components/shared/icons";
import { siteConfig } from "@/config/site";
import { NavUser } from "@/components/nav-user";
import { useSession, signOut } from "next-auth/react";

const sidebarVariants = {
    open: {
        width: "15rem",
    },
    closed: {
        width: "3.05rem",
    },
};

const contentVariants = {
    open: { display: "block", opacity: 1 },
    closed: { display: "block", opacity: 1 },
};

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

const transitionProps = {
    type: "tween",
    ease: "easeOut",
    duration: 0.2,
    staggerChildren: 0.1,
};

const staggerVariants = {
    open: {
        transition: { staggerChildren: 0.03, delayChildren: 0.02 },
    },
};

export interface NavConfig {
    name: string;
    icon: React.ReactNode;
    href: string;
    additional?: string;
}

export interface NavParams {
    navs: NavConfig[];
}

export function SessionNavBar({ navs }: NavParams) {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const pathname = usePathname();
    const { data: session } = useSession();
    const user: any = session?.user;

    return (
        <motion.div
            className={cn("sidebar fixed left-0 z-40 h-full shrink-0 border-r")}
            initial={isCollapsed ? "closed" : "open"}
            animate={isCollapsed ? "closed" : "open"}
            variants={sidebarVariants}
            transition={transitionProps}
            onMouseEnter={() => setIsCollapsed(false)}
            onMouseLeave={() => setIsCollapsed(true)}
        >
            <motion.div
                className={`relative z-40 flex text-muted-foreground h-full shrink-0 flex-col bg-black transition-all`}
                variants={contentVariants}
            >
                <motion.ul
                    variants={staggerVariants}
                    className="flex h-full flex-col"
                >
                    <div className="flex grow flex-col items-center">
                        <div className="flex h-[54px] w-full shrink-0 p-2">
                            <div className="mt-[1.5px] flex w-full">
                                <a
                                    href="/"
                                    className="flex w-fit items-center gap-2"
                                >
                                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg">
                                        <Logo className="!size-6" />
                                    </div>
                                    <motion.li
                                        variants={variants}
                                        className="flex w-fit items-center gap-2"
                                    >
                                        {!isCollapsed && (
                                            <>
                                                <p className="text-xl text-foreground font-bold">
                                                    {siteConfig.name}
                                                </p>
                                            </>
                                        )}
                                    </motion.li>
                                </a>
                            </div>
                        </div>

                        <div className="flex h-full w-full flex-col">
                            <div className="flex grow flex-col gap-4">
                                <ScrollArea className="h-16 grow p-2">
                                    <div
                                        className={cn(
                                            "flex w-full flex-col gap-1"
                                        )}
                                    >
                                        {navs.map((nav) => (
                                            <Link
                                                key={nav.name}
                                                href={nav.href}
                                                className={cn(
                                                    "flex h-8 flex-row items-center rounded-md px-2 py-1.5 transition hover:bg-muted hover:text-primary"
                                                )}
                                            >
                                                {nav.icon}
                                                <motion.li variants={variants}>
                                                    {!isCollapsed && (
                                                        <div className="ml-2 flex items-center gap-2">
                                                            <p className="text-sm font-medium">
                                                                {nav.name}
                                                            </p>
                                                            {nav.additional && (
                                                                <div className="flex justify-center items-center gap-1.5 rounded px-1 bg-primary text-[10px] text-primary-foreground font-medium font-heading">
                                                                    {
                                                                        nav.additional
                                                                    }
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                </motion.li>
                                            </Link>
                                        ))}
                                    </div>
                                </ScrollArea>
                            </div>
                            <div className="flex flex-col p-2">
                                {/* <Link
                                    href="/settings/integrations"
                                    className="mt-auto flex h-8 w-full flex-row items-center rounded-md px-2 py-1.5   transition hover:bg-muted hover:text-primary"
                                >
                                    <Settings className="h-4 w-4 shrink-0" />{" "}
                                    <motion.li variants={variants}>
                                        {!isCollapsed && (
                                            <p className="ml-2 text-sm font-medium">
                                                {" "}
                                                Settings
                                            </p>
                                        )}
                                    </motion.li>
                                </Link> */}
                                {user && (
                                    <div>
                                        <NavUser
                                            side="bottom"
                                            isCollapsed={false}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.ul>
            </motion.div>
        </motion.div>
    );
}
