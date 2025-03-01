import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import MaxWidthWrapper from "../shared/max-width-wrapper";
import Link from "next/link";

export const CTASection5 = ({
    use,
    name,
    href,
}: {
    use?: string;
    name?: string;
    href?: string;
}) => {
    const t = useTranslations(use || "Home");

    return (
        <MaxWidthWrapper className="py-20 bg-gray-950 bg-opacity-50">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-4 gradient-text">
                    {t(`${name}.title`)}
                </h2>
                <p className="text-xl mb-8 text-gray-400">
                    {t(`${name}.description`)}
                </p>
                <div className="flex justify-center space-x-4">
                    <Link href={href || "#"}>
                        <Button className="dark-button">
                            {t(`${name}.buttonText`)}
                        </Button>
                    </Link>
                </div>
            </div>
        </MaxWidthWrapper>
    );
};
