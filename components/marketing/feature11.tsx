/* eslint-disable @next/next/no-img-element */
"use client";

import { useTranslations } from "next-intl";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";
import { motion } from "framer-motion";
import { Icons } from "@/components/shared/icons";
import { cn } from "@/lib/utils";

export default function FeatureSection11({
    use,
    name,
    icons,
}: {
    use?: string;
    name?: string;
    icons: string[];
}) {
    const t = useTranslations(use || "Home");
    const featureKeys = Array.from(
        { length: Number(t(`${name}.content.length`)) },
        (_, i) => i + 1
    );
    return (
        <MaxWidthWrapper className="py-20">
            <div className="flex flex-col items-center gap-4 mb-6">
                <h2 className="max-w-2xl text-3xl font-semibold md:text-4xl">
                    {t(`${name}.title`)}
                </h2>
                <p className="text-muted-foreground">
                    {t(`${name}.description`)}
                </p>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {/* <CreditCard className="mb-4 h-10 w-10 text-cyan-400" /> */}
                    {featureKeys.map((idx: number) => {
                        const Icon = Icons[icons[Number(idx) - 1]];

                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                viewport={{ once: true }}
                                className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-colors hover:border-primary/50"
                            >
                                <Icon
                                    className={cn(
                                        "mb-4 h-10 w-10",
                                        Number(idx) % 2 === 1
                                            ? "text-cyan-400"
                                            : "text-violet-400"
                                    )}
                                />
                                <h4 className="mb-2 text-xl font-bold">
                                    {t(`${name}.content.${idx}.title`)}
                                </h4>
                                <p className="text-gray-400">
                                    {t(`${name}.content.${idx}.description`)}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </MaxWidthWrapper>
    );
}
