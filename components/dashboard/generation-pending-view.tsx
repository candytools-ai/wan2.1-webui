/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
"use client";

import { ICreation } from "@/hooks/use-creation-video";
import { useTranslations } from "next-intl";
import React, { useContext, useState, useRef, useEffect } from "react";
import { Progress } from "../ui/progress";
import { ShinyText } from "../ui/shiny-text";
import { RoundSpinner } from "../ui/spinner";
import { siteConfig } from "@/config/site";
import CreationVideoTools from "./creation-video-tools";
import { DEFAULT_MODEL, models } from "@/config/models-video";

let interval: any;

const GenerationPendingView = ({
    use,
    creation,
}: {
    use: string;
    creation: ICreation;
}) => {
    const { generation, durations } = creation;
    const videoRef = useRef<HTMLVideoElement>(null);
    let _progress = 0;
    const [progress, setProgress] = useState(_progress);
    const duration = durations.find((duration) => duration.selected)?.value;
    const t = useTranslations(use || "Home");
    // const t = useTranslations("Generation");
    // const { user, setOpenLogin, setOpenUpgrade } = useContext(AppContext);

    useEffect(() => {
        if (generation.loading) {
            if (progress === 0) {
                interval = setInterval(() => {
                    _progress += 1;
                    if (_progress >= 99) {
                        setProgress(99);
                        clearInterval(interval);
                        _progress = 0;
                    } else {
                        setProgress(_progress);
                    }

                    if (generation.generated) {
                        clearInterval(interval);
                        _progress = 0;
                    }
                }, 3000);
            }
        } else {
            if (generation.generated) {
                clearInterval(interval);
                _progress = 0;
                setProgress(_progress);
            } else if (generation.errorMsg) {
                clearInterval(interval);
                _progress = 0;
                setProgress(_progress);
            }
        }
    }, [progress, generation.loading, generation.generated]);

    if (generation.loading) {
        return (
            <>
                <div className="generating rounded-xl aspect-video bg-background border-2 border-primary/10 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
                    {generation.status === "IN_QUEUE" ? (
                        <div className="h-full flex flex-col items-center justify-center gap-3">
                            <RoundSpinner size="lg" color="primary" />
                            <div className="flex flex-col items-center gap-1">
                                <ShinyText
                                    className="text-xl font-bold"
                                    speed={3}
                                >
                                    {t("create.video.preview.queue.title")}
                                </ShinyText>
                                <ShinyText className="text-sm" speed={3}>
                                    {t(
                                        "create.video.preview.queue.description"
                                    )}
                                </ShinyText>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center gap-3">
                            <span className="text-sm font-medium">
                                {progress}%
                            </span>
                            <Progress value={progress} className={"w-1/3"} />
                            <div className="flex flex-col items-center gap-1">
                                <ShinyText
                                    className="text-xl font-bold"
                                    speed={2.5}
                                >
                                    {t("create.video.preview.progress.title")}
                                </ShinyText>
                                <ShinyText className="text-sm" speed={2.5}>
                                    {t(
                                        "create.video.preview.progress.description"
                                    )}
                                </ShinyText>
                            </div>
                        </div>
                    )}
                    {/* <Loading loading={generation.loading} text="Rendering..." /> */}
                </div>
            </>
        );
    } else {
        if (generation.generated) {
            console.info("generation.generated---", generation.generated);
            return (
                <>
                    <video
                        src={generation.generated.url}
                        className="block rounded-xl max-w-[568px] bg-black dark:bg-background aspect-video w-full h-full"
                        controls
                        loop
                        ref={videoRef}
                    />
                    <div className="max-w-[568px] w-full overflow-hidden relative">
                        <CreationVideoTools
                            use="Dashboard"
                            config={{
                                download: true,
                                fullscreen: true,
                                like: false,
                            }}
                            generated={
                                generation?.generated || {
                                    url: "https://cdn.chooat.com/Goku_AI/development/generated/j0a9j7nP.mp4",
                                    predictionId:
                                        "01aab61f-85ee-43c8-a921-12266dd4816d",
                                }
                            }
                            videoRef={videoRef}
                        />
                    </div>
                </>
            );
        } else if (generation.errorMsg) {
            return (
                <div className="h-full flex items-center justify-center bg-white/50 rounded-xl dark:bg-neutral-700/40 text-red-600 shadow-sm">
                    {generation.errorMsg}
                </div>
            );
        } else {
            return (
                <>
                    <div className="rounded-xl max-w-[568px] aspect-video w-full overflow-hidden relative">
                        <div
                            className="w-full h-full bg-cover bg-no-repeat"
                            style={{
                                backgroundImage: `url(/motion-5.png)`,
                            }}
                        >
                            <span className="video-wrapper absolute top-0 left-0 w-full h-full">
                                <video
                                    src="/motion-5.mp4"
                                    className="rounded-xl max-w-[568px] bg-transparent object-cover w-full h-full absolute top-0 left-0"
                                    loop
                                    autoPlay
                                    playsInline
                                    muted
                                    controls
                                    ref={videoRef}
                                />
                            </span>
                            <div className="mask w-full h-full absolute z-1 top-0 left-0 bg-black/40"></div>
                            <div className="video-placeholder-content w-full h-full absolute z-[2] top-0 left-0 flex flex-col items-center justify-center gap-2 p-3">
                                <div className="logo h-6 flex gap-2 justify-center">
                                    <span className="text-[16px] text-white font-semibold">
                                        {siteConfig.name}
                                    </span>
                                </div>
                                <div className="text-white text-[16px]">
                                    {DEFAULT_MODEL.description}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            );
        }
    }
};

export default GenerationPendingView;
