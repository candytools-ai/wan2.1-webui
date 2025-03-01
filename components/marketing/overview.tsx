/* eslint-disable @next/next/no-img-element */
"use client";

import { useTranslations } from "next-intl";

const OverviewSection = ({ use }: { use?: string }) => {
    const t = useTranslations(use || "Home");

    return (
        <section className="relative not-prose mt-[72px]">
            {/* <div className="absolute inset-0 pointer-events-none -z-[1] dark:bg-transparent"></div> */}
            {/* <div className="absolute inset-0 pointer-events-none -z-[1] bg-blue-50 dark:bg-transparent"></div> */}
            <div className="relative mx-auto max-w-7xl px-4 md:px-6 py-12 md:py-16 lg:py-20 text-default">
                <div className="mb-8 md:mb-12 md:mx-auto text-center lg:max-w-2xl max-w-xl sm:mx-auto">
                    <h2 className="font-bold font-heading leading-tighter tracking-tighter text-heading mb-4 text-4xl md:text-5xl">
                        {t("Overview.title")}
                    </h2>

                    <p className="mt-4 text-muted-foreground max-w-3xl mx-auto sm:text-center text-xl dark:text-slate-400">
                        {t("Overview.description")}
                    </p>
                </div>
            </div>
        </section>
    );
};

export default OverviewSection;
