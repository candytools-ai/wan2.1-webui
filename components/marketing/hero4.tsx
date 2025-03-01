/* eslint-disable @next/next/no-img-element */
"use client";

import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

export default function HeroSection4({
    use,
    showBtn,
    showPic,
    herf,
    herf2,
}: {
    use?: string;
    showBtn?: boolean;
    showPic?: boolean;
    herf: string;
    herf2?: string;
}) {
    const t = useTranslations(use || "Home");

    return (
        <MaxWidthWrapper className="py-32">
            <div className="mx-auto">
                <div className="flex flex-col lg:flex-row items-center">
                    <div className="mb-10 lg:mb-0">
                        <h1 className="text-4xl font-heading sm:text-5xl font-bold mb-6 leading-tight">
                            {t("Hero.title")}{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-pink-500">
                                {t("Hero.colorTitle")}
                            </span>
                        </h1>
                        <p className="text-xl mb-8 text-gray-400">
                            {t("Hero.description")}
                        </p>
                        <div className="flex flex-wrap gap-4">
                            {showBtn && (
                                <>
                                    <Link
                                        href={herf}
                                        prefetch={true}
                                        className={cn(
                                            buttonVariants({
                                                rounded: "xl",
                                                size: "lg",
                                            }),
                                            "gap-2 px-5 text-[15px]"
                                        )}
                                    >
                                        <span>{t("Hero.buttonText")}</span>
                                        <ArrowRight className="size-4" />
                                    </Link>
                                    {herf2 && (
                                        <Link
                                            href={herf2}
                                            prefetch={true}
                                            className={cn(
                                                buttonVariants({
                                                    rounded: "xl",
                                                    size: "lg",
                                                }),
                                                "gap-2 px-5 text-[15px] bg-muted text-primary hover:bg-primary/60 "
                                            )}
                                        >
                                            <span>
                                                Generate video from image
                                            </span>
                                            {/* <ArrowRight className="size-4" /> */}
                                        </Link>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </MaxWidthWrapper>
    );
}
