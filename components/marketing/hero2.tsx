/* eslint-disable @next/next/no-img-element */
"use client";

import { AnimatePresence, motion } from "framer-motion";

import { useTranslations } from "next-intl";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import MaxWidthWrapper from "../shared/max-width-wrapper";

const HeroSection2 = ({
    use,
    showBtn,
    showPic,
}: {
    use?: string;
    showBtn?: boolean;
    showPic?: boolean;
}) => {
    const t = useTranslations(use || "Home");

    return (
        <>
            <div className="container mx-auto px-4 py-8 max-w-4xl" id="form">
                <div className="mb-8 text-center">
                    <h1
                        className="text-2xl sm:text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-white"
                    >
                        {t("Hero.title")}
                    </h1>
                    <p className="mt-2 text-sm sm:text-base text-gray-400">
                    {t("Hero.description")}
                    </p>
                </div>
            </div>
        </>
    );
};

export default HeroSection2;
