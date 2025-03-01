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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";

export default function FeatureSection10({
    use,
    name,
    badge,
    reverse,
    tabs,
}: {
    use?: string;
    name?: string;
    badge?: string;
    reverse?: boolean;
    tabs: {
        title: string;
        imageSrc: string;
        videoSrc: string;
    }[];
}) {
    const t = useTranslations(use || "Home");
    const [api, setApi] = useState<CarouselApi>();

    useEffect(() => {
        if (!api) {
            return;
        }

        api.on("select", (item, idx) => {
            // Do something on select.
            console.info(11, item, idx);
            console.info(item.containerNode());
        });

        // api.on('slidesInView', (idx) => {
        //     // Do something on select.
        //     console.info(22, idx)
        // })
    }, [api]);

    return (
        <MaxWidthWrapper className="py-20">
            <div className="flex flex-col items-center gap-4 text-center">
                <Badge variant="outline">{badge}</Badge>
                <h2 className="max-w-2xl text-3xl font-semibold md:text-4xl">
                    {t(`${name}.title`)}
                </h2>
                <p className="text-muted-foreground">
                    {t(`${name}.description`)}
                </p>
            </div>

            <Tabs defaultValue={"1"} className="mt-8">
                <TabsList className="bg-transparent flex flex-col items-center justify-center gap-4 sm:flex-row md:gap-10">
                    {tabs.map((tab, idx) => (
                        <TabsTrigger
                            key={idx}
                            value={String(idx)}
                            className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-muted-foreground data-[state=active]:bg-muted data-[state=active]:text-primary"
                        >
                            {/* {tab.icon} */} {tab.title}
                        </TabsTrigger>
                    ))}
                </TabsList>
                <div className="mx-auto mt-8 max-w-screen-xl rounded-2xl bg-muted/70">
                    {tabs.map((tab, idx) => (
                        <TabsContent
                            key={idx}
                            value={String(idx)}
                            className="place-items-center gap-20 lg:gap-10"
                        >
                            <div className="flex flex-col gap-5">
                                {/* <Badge
                                    variant="outline"
                                    className="w-fit bg-background"
                                >
                                    {tab.content.badge}
                                </Badge> */}
                                {/* <div className="text-3xl font-semibold lg:text-5xl">
                                    {tab.content.title}
                                </div>
                                <p className="text-muted-foreground lg:text-lg">
                                    {tab.content.description}
                                </p> */}
                                {/* <Button
                                    className="mt-2.5 w-fit gap-2"
                                    size="lg"
                                >
                                    {tab.content.buttonText}
                                </Button> */}
                            </div>
                            <HeroVideoDialog
                                videoSrc={tab.videoSrc}
                                thumbnailSrc={tab.imageSrc}
                            />
                        </TabsContent>
                    ))}
                </div>
            </Tabs>
        </MaxWidthWrapper>
    );
}
