/* eslint-disable react/no-unescaped-entities */
"use client";

import footerNavs from "@/config/footer-navs";
// import Brand from "@/components/Brand/Logo";
import { ExternalLink } from "lucide-react";
import { friendLinks } from "@/components/footer-friends";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { languages, siteConfig } from "@/config/site";
import SocialLink from "@/components/social-link";
import { Github, Logo, XIcon } from "@/components/shared/icons";
// import { usePathname } from "next/navigation";
import { usePathname, Link } from "@/i18n/routing";

const FooterSection = () => {
    const t = useTranslations("Home");
    const pathname = usePathname();
    const showFriend = pathname === "/";

    if (
        pathname.includes("/create") ||
        pathname.includes("/account") ||
        pathname.includes("/billing") ||
        pathname.includes("/my-creations")
    )
        return null;

    return (
        <>
            {/* FriendLink */}
            {/* <div className="mx-auto w-full max-w-[85rem] px-4 sm:px-6 lg:px-16 lg:pt-20 2xl:max-w-screen-2xl">
                <div className="relative flex overflow-x-hidden mb-10">
                    <div className="animate-marquee whitespace-nowrap flex gap-4">
                        {showFriend && friendLinks.map((item, idx) => (
                            <a
                                key={idx}
                                href={item.href}
                                className="flex shrink-0 items-center gap-1 hover:underline text-base text-neutral-600 dark:text-neutral-400"
                                title={item.title}
                                rel="nofollow"
                            >
                                {item.content || item.title}
                                <ExternalLink className="w-4 h-4" />
                            </a>
                        ))}
                    </div>
                </div>
            </div> */}
            <footer className="w-full bg-gray-950 bg-opacity-80 backdrop-blur-md border-t border-gray-800">
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-5 md:py-12 py-8">
                        <div className="col-span-full lg:col-span-1">
                            {/* <BrandLogo className="h-auto w-32" /> */}
                            {/* <Logo className="size-7 mr-3 block" /> */}
                            <a
                                href="/"
                                className="font-bold text-lg flex items-center"
                            >
                                <Logo className="size-7 mr-3 block" />
                                {siteConfig.name}
                            </a>
                            <p className="leading-relaxed mt-2 text-sm text-neutral-500">
                                {t("footer.title")}
                            </p>
                            <div className="flex flex-col gap-3 mt-3 justify-center lg:flex-row">
                                <Github className="size-5" />
                                <a
                                    href="https://github.com/Wan-Video/Wan2.1"
                                    target="_blank"
                                    className="gap-1 text-sm underline"
                                    rel="noreferrer"
                                >
                                    Power By Alibaba Wan-AI
                                </a>
                            </div>
                        </div>

                        {footerNavs.map((item, idx) => (
                            <section key={idx} className="col-span-1">
                                <div className="font-bold text-neutral-200">
                                    {item.label}
                                </div>
                                <ul className="mt-3 grid space-y-3">
                                    {item.items.map((el: any, idx: number) => (
                                        <li key={idx}>
                                            <a
                                                href={el.href}
                                                title={el.title}
                                                className="inline-flex gap-x-2 rounded-lg outline-none transition duration-300 focus-visible:ring text-neutral-400 ring-zinc-200 hover:text-neutral-300 focus:outline-none"
                                                rel="nofollow"
                                            >
                                                {el.content || el.title}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        ))}
                        {/* <a href="https://dang.ai/tool/ai-chatbot-chooat-com" target="_blank" ><img src="https://global-uploads.webflow.com/63d8afd87da01fb58ea3fbcb/6487e2868c6c8f93b4828827_dang-badge.png" alt="Chooat | dang.ai" style={{width: "150px", height: "54px"}} width="150" height="54"/></a> */}
                    </div>

                    <div className="md:py-8 py-6 grid gap-y-2 sm:flex sm:items-center sm:justify-between sm:gap-y-0">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                © 2025 {siteConfig.domain} All rights reserved.
                            </p>
                        </div>

                        <div>
                            {/* <FooterSocialLink url="wuyasong">
                                <Icons.Facebook className="h-4 w-4 flex-shrink-0 fill-current text-neutral-700 dark:text-neutral-400" />
                            </FooterSocialLink> */}

                            <SocialLink url="https://x.com/candytools118">
                                <XIcon className="h-4 w-4 flex-shrink-0 fill-current text-neutral-700 dark:text-neutral-400" />
                            </SocialLink>

                            {/* <FooterSocialLink url="https://x.com/candytools118">
                                <Icons.Github className="h-4 w-4 flex-shrink-0 fill-current text-neutral-700 dark:text-neutral-400" />
                            </FooterSocialLink> */}
                        </div>

                        {/* hidden outlink */}
                        {/* <div className="opacity opacity-0">
                            <a
                                href={`https://x.com/candytools118/status/1878759323763179748`}
                                title={"Free AI assistant Chooat"}
                            >
                                {"Free AI assistant Chooat"}
                            </a>
                            <a
                                href={`https://telegra.ph/Free-AI-assistant---Chooat-01-14`}
                                title={"Free AI assistant Chooat"}
                            >
                                {"Free AI assistant Chooat"}
                            </a>
                        </div> */}
                    </div>
                </div>
            </footer>
        </>
    );
};

export default FooterSection;
