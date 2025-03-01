"use client";

import { Badge } from "@/components/ui/badge";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { useTranslations } from "next-intl";
import MaxWidthWrapper from "../shared/max-width-wrapper";
import { useEffect, useState } from "react";
import { type CarouselApi } from "@/components/ui/carousel";
import { HeroVideoDialog } from "../ui/hero-video-dialog";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "../ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function FeatureSection9({
    use,
    name,
    badge,
    reverse,
    carousel,
}: {
    use?: string;
    name?: string;
    badge?: string;
    reverse?: boolean;
    carousel: {
        imageSrc: string;
        videoSrc: string;
    }[];
}) {
    const t = useTranslations(use || "Home");

    return (
        <MaxWidthWrapper className="py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 justify-end items-end gap-10">
                <div
                    className={cn(
                        "flex gap-4 flex-col items-start",
                        reverse ? "lg:order-1" : "lg:order-0"
                    )}
                >
                    <div>
                        <div className="flex items-center gap-2 rounded-xl px-2.5 py-0.5 text-xs font-semibold bg-muted text-primary">
                            {badge || "Feature"}
                        </div>
                    </div>
                    <div className="flex gap-2 flex-col">
                        <h2 className="text-xl md:text-3xl lg:text-5xl tracking-tighter lg:max-w-xl font-regular text-left">
                            {t(`${name}.title`)}
                        </h2>
                        <p className="text-lg max-w-xl lg:max-w-sm leading-relaxed tracking-tight text-muted-foreground text-left">
                            {t(`${name}.description`)}
                        </p>
                    </div>
                </div>
                <div
                    className={cn(
                        "w-full max-w-full px-10",
                        reverse ? "lg:order-0" : "lg:order-1"
                    )}
                >
                    <Carousel>
                        <CarouselContent>
                            {carousel.map((item, index) => (
                                <CarouselItem key={index}>
                                    <HeroVideoDialog
                                        videoSrc={item.videoSrc}
                                        thumbnailSrc={item.imageSrc}
                                    />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </div>
            </div>
        </MaxWidthWrapper>
    );
}
