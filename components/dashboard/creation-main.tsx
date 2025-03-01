"use client";

import { useSession } from "next-auth/react";
import CircleFillIcon from "@/components/ui/circle";
import { GeneratingView } from "@/components/dashboard/generating-view";
import { ICreation } from "@/hooks/use-creation-video";
import GenerationPendingView from "./generation-pending-view";
import { useTranslations } from "next-intl";

export default function CreationMain({
    use,
    creation,
}: {
    use: string;
    creation: ICreation;
}) {
    const t = useTranslations(use || "Home");
    const { data: session } = useSession();
    const user: any = session?.user;

    return (
        <>
            <div className="flex flex-1 flex-col gap-4 p-4">
                <div className="w-full h-full flex items-center justify-center">
                    <div className="relative px-12 py-[70px] max-w-3xl z-[1] bg-card rounded-2xl border">
                        <div className="text-center relative z-[3]">
                            <div className="animate">
                                {/* <p>{intro.subtitle}</p> */}
                                <h2 className="mt-4 relative text-4xl font-semibold">
                                    {t("create.video.title")}
                                </h2>
                                <div className="h-1 w-[70px] mt-[10px] mx-auto rounded-[30px] bg-primary"></div>
                                <p className="mt-6 text-[15px] text-muted-foreground max-w-[568px]">
                                    {t("create.video.description")}
                                </p>
                            </div>
                            <div className="relative overflow-hidden mx-auto mt-10 h-full max-h-[394px] w-full max-w-[716px]">
                                <GenerationPendingView
                                    use={use}
                                    creation={creation}
                                />
                                {/* <VideoPlayer
                                    src="/hq_3.mp4"
                                    className="max-w-[568px]"
                                /> */}

                                {/* <div className="generating rounded-xl aspect-video dark:bg-zinc-950 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
                                    <GeneratingView />
                                    <QueueView />
                                </div> */}
                                {/* <button
                                    //   onClick={() => setShowPopup(true)}
                                    className="intro-play-btn absolute left-1/2 top-1/2 inline-flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-2xl text-body lg:h-[90px] lg:w-[90px]"
                                >
                                    <FeatherIcon icon="play" size={32} />
                                </button> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
