/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
"use client";

import { useTranslations } from "next-intl";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, ChevronRight, Star } from "lucide-react";
import MaxWidthWrapper from "../shared/max-width-wrapper";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

const HowToUse4 = ({
    use,
    name,
    icons,
}: {
    use?: string;
    name?: string;
    icons?: string[];
}) => {
    const t = useTranslations(use || "Home");
    const howToUseKeys = Array.from(
        { length: Number(t(`${name}.content.length`)) },
        (_, i) => i + 1
    );

    return (
        <MaxWidthWrapper className="py-20">
            <div className="flex flex-col items-center gap-4 text-center">
                <h2 className="max-w-2xl text-3xl font-bold md:text-4xl">
                    {t(`${name}.title`)}
                </h2>
                <p className="text-muted-foreground">
                    {t(`${name}.description`)}
                </p>
            </div>

            <div className="mt-6 flex flex-col gap-4 sm:gap-3 md:flex-row md:gap-6 lg:mt-10">
                {howToUseKeys.map((idx: number) => (
                    <div
                        key={idx}
                        className="border border-white/10 bg-white/5 hover:border-primary/50 flex-1 rounded-xl px-3 py-5 md:px-6 md:py-9 text-center"
                    >
                        <p className="text-base font-semibold lg:text-2xl">
                            Step {idx}
                        </p>
                        <p className="text-f-text-secondary mt-2 text-sm lg:text-base">
                            {t(`${name}.content.${idx}.title`)}
                            {/* {t(`${name}.content.${idx}.description`)} */}
                        </p>
                    </div>
                ))}
            </div>
        </MaxWidthWrapper>
    );
};

export default HowToUse4;
