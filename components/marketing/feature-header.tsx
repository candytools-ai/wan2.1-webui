"use client";

import MaxWidthWrapper from "@/components/shared/max-width-wrapper";
import { useTranslations } from "next-intl";

export default function FeatureHeader({
    use,
    name,
}: {
    use?: string;
    name?: string;
}) {
    const t = useTranslations(use || "Home");

    return (
        <MaxWidthWrapper className="pt-20">
            <h2 className="text-3xl font-bold text-center mb-6 gradient-text">
                {t(`${name}.title`)}
            </h2>
            <p className="text-xl text-center mb-8 text-gray-400 max-w-5xl mx-auto">
                {t(`${name}.description`)}
            </p>
        </MaxWidthWrapper>
    );
}
