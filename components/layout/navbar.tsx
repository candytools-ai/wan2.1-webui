"use client";
import { Menu } from "lucide-react";
import React, { useContext, useState } from "react";
import {
    Sheet,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
// import { ToggleTheme } from "./toogle-theme";
import { siteConfig } from "@/config/site";
import { Logo } from "@/components/shared/icons";
import { navigation } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import LocaleSwitcher from "@/components/locale-switcher";
import { ModalContext } from "@/components/modals/providers";
import { UserAccountNav } from "./user-account-nav";
import { useSession } from "next-auth/react";
import { useScrollHeight } from "@/hooks/use-scroll-height";

export const Navbar = ({ className }: any) => {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const { data: session } = useSession();
    const user: any = session?.user;
    const { setShowSignInModal } = useContext(ModalContext);
    const { scroll } = useScrollHeight(60);
    if (pathname.includes("/create")) return null;
    return (
        <header className="sticky top-0 z-40 flex-none mx-auto w-full border-b border-gray-50/0 transition-[opacity] ease-in-out">
            <div
                className={cn(
                    "absolute inset-0  ",
                    !scroll
                        ? "bg-transparent"
                        : "bg-background/60 backdrop-blur-[6px]"
                )}
            ></div>
            <div
                className={cn(
                    "relative text-default py-3 px-3 md:px-6 mx-auto w-full flex justify-between items-center max-w-7xl"
                )}
            >
                <Link
                    href="/"
                    className="font-bold text-lg flex items-center font-heading"
                >
                    <Logo className="size-8 mr-3 block" />
                    {siteConfig.name}
                </Link>
                {/* <!-- Mobile --> */}
                <div className="flex items-center md:hidden">
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Menu
                                onClick={() => setIsOpen(!isOpen)}
                                className="cursor-pointer lg:hidden"
                            />
                        </SheetTrigger>

                        <SheetContent
                            side="left"
                            className="flex flex-col justify-between rounded-tr-2xl rounded-br-2xl bg-card border-secondary"
                        >
                            <div>
                                <SheetHeader className="mb-4 ml-4">
                                    <SheetTitle className="flex items-center">
                                        <Link
                                            href="/"
                                            className="flex items-center"
                                        >
                                            <Logo className="rounded-lg w-9 h-9 mr-2 text-white" />
                                            {siteConfig.name}
                                        </Link>
                                    </SheetTitle>
                                </SheetHeader>

                                <div className="flex flex-col gap-2">
                                    {navigation.map(({ href, title }) => (
                                        <Button
                                            key={href}
                                            onClick={() => setIsOpen(false)}
                                            asChild
                                            variant="ghost"
                                            className="justify-start text-base"
                                        >
                                            <a href={href} title={title}>
                                                {title}
                                            </a>
                                        </Button>
                                    ))}
                                </div>
                            </div>

                            <SheetFooter className="flex-col sm:flex-col justify-start items-start">
                                <Separator className="mb-2" />

                                <div className="flex items-center gap-3">
                                    {/* <ToggleTheme /> */}
                                    <LocaleSwitcher />
                                    {user ? (
                                        <UserAccountNav />
                                    ) : (
                                        <Button
                                            className="rounded-full"
                                            onClick={() =>
                                                setShowSignInModal(true)
                                            }
                                        >
                                            Sign in
                                        </Button>
                                    )}
                                </div>
                            </SheetFooter>
                        </SheetContent>
                    </Sheet>
                </div>

                {/* <!-- Desktop --> */}
                <NavigationMenu className="hidden md:block mx-auto">
                    <NavigationMenuList>
                        {navigation.map(
                            ({ href, title, badge, children }: any, idx) => (
                                <NavigationMenuItem
                                    key={"nav_" + idx}
                                    className="px-4 py-3"
                                >
                                    {children ? (
                                        <>
                                            <NavigationMenuTrigger className="inline-flex w-max text-sm font-medium transition-colors duration-300 dark:text-gray-300 dark:hover:text-white">
                                                {title}
                                            </NavigationMenuTrigger>
                                            <NavigationMenuContent>
                                                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] max-h-[400px] overflow-y-scroll">
                                                    {children.map(
                                                        (childNav: any) => (
                                                            <li
                                                                key={
                                                                    childNav.id
                                                                }
                                                            >
                                                                <NavigationMenuLink
                                                                    asChild
                                                                >
                                                                    <a
                                                                        href={
                                                                            childNav.href
                                                                        }
                                                                        className={cn(
                                                                            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                                                                            className
                                                                        )}
                                                                    >
                                                                        <div className="text-sm font-medium leading-none">
                                                                            {
                                                                                childNav.title
                                                                            }
                                                                        </div>
                                                                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                                                            {
                                                                                childNav.description
                                                                            }
                                                                        </p>
                                                                    </a>
                                                                </NavigationMenuLink>
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            </NavigationMenuContent>
                                        </>
                                    ) : (
                                        <NavigationMenuLink asChild>
                                            <a
                                                href={href}
                                                title={title}
                                                className="inline-flex w-max text-sm font-medium transition-colors duration-300 dark:text-gray-300 dark:hover:text-white relative"
                                            >
                                                {title}
                                                {badge && (
                                                    <div className="absolute inline-flex items-center justify-center py-0.5 px-1.5 text-xs font-normal text-white bg-red-500 border-2 border-white rounded-full -top-5 -right-6">
                                                        {badge}
                                                    </div>
                                                )}
                                            </a>
                                        </NavigationMenuLink>
                                    )}
                                </NavigationMenuItem>
                            )
                        )}
                    </NavigationMenuList>
                </NavigationMenu>

                <div className="hidden md:flex justify-between items-center gap-2">
                    {/* <ToggleTheme /> */}
                    <LocaleSwitcher />
                    {user ? (
                        <UserAccountNav />
                    ) : (
                        <Button
                            className="rounded-full"
                            onClick={() => setShowSignInModal(true)}
                        >
                            Sign in
                        </Button>
                    )}
                </div>
            </div>
        </header>
    );
};
