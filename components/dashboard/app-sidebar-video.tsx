"use client";

import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useContext, useState } from "react";
import { toast } from "sonner";
import { ModalContext } from "@/components/modals/providers";
import { GenerateButton } from "@/components/shared/generate-button";
import { PromptsForm } from "@/components/dashboard/prompts-form";
import { AspectRatioForm } from "@/components/dashboard/aspect-ratio-form";
import { VideoDurationForm } from "@/components/dashboard/duration-form";
import { QuailtySettingForm } from "@/components/dashboard/quality-form";
import { SpeedForm } from "@/components/dashboard/speed-form";
import { StyleForm } from "@/components/dashboard/style-form";
import { PrivateModeForm } from "@/components/dashboard/public-form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ImageUploadForm } from "@/components/dashboard/image-upload-form";
import { CreationTabs } from "@/components/dashboard/creation-tabs";
import { usePathname } from "next/navigation";
import type { ICreation } from "@/hooks/use-creation-video";

export function AppSidebarVideo({
    use,
    creation,
}: {
    use: string;
    creation: ICreation;
}) {
    const { data: session } = useSession();
    const user: any = session?.user;
    const t = useTranslations(use || "Home");
    const pathname = usePathname();
    const image_to_video = pathname.includes("/create/video/image-to-video")

    const links = [
        {
            href: "/create/video/text-to-video",
            label: "Text To Video",
            selected: !pathname.includes("image-to-video"),
        },
        {
            href: "/create/video/image-to-video",
            label: "Image To Video",
            selected: pathname.includes("image-to-video"),
        },
    ];
    const { setShowSignInModal } = useContext(ModalContext);

    const handleGeneration = async () => {
        if (!creation.prompt) {
            toast.error("Please enter prompt!");
            return;
        }
        if (image_to_video && !creation.imageSrc) {
            toast.error("Please upload an image!");
            return;
        }
        if (!user) {
            setShowSignInModal(true);
            return false;
        }
        if (user.credits < creation.cost) {
            toast.error("No enough Credits, Please upgrade your payment plan!");
            // setOpenUpgrade(true);
            return false;
        }
        if (!user.subscribed && creation.model.upgrade) {
            toast.error("Please upgrade your payment plan!");
            // setOpenUpgrade(true)
            return
        }

        await creation.handleSubmit({
            prompt: creation.prompt,
            image_url: creation.imageSrc,
            modelId: creation.model.id,
            model: creation.getModelAPI(pathname),
            aspect_ratio: creation.ratios.find((item) => item.selected)?.value,
            duration: creation.durations.find((item) => item.selected)?.value,
            resolution: creation.quailtys.find((item) => item.selected)?.value,
            style: creation.styles.find((item) => item.selected)?.value,
            speed: creation.speeds.find((item) => item.selected)?.value,
            isPublic: !creation.privateMode,
            image_to_video: image_to_video
        });

        // toast.error("server error");

        // mock generator start
        // setTimeout(() => {
        // setGeneration({
        //     ...generation,
        //     loading: false,
        //     // generated: {
        //     //     video: {
        //     //         url: "https://fal.media/files/zebra/GScPi-7ma3Fn8r1O1on4z_output_1729631871.mp4",
        //     //     },
        //     // },

        //     generated: null,
        //     error: new Error("This is a error!")
        // });
        // }, 3000);
        // mock generator end
    };

    return (
        <>
            <ScrollArea className="px-3 flex-1">
                <CreationTabs links={links} />
                {pathname.includes("/create/video/image-to-video") && (
                    <ImageUploadForm
                        title={t("create.video.form.ImageUpload.title")}
                        placeholder={t("create.video.form.ImageUpload.placeholder")}
                        description={t("create.video.form.ImageUpload.description")}
                        imageSrc={creation.imageSrc}
                        handleImageSrcChange={creation.handleImageSrcChange}
                    />
                )}
                <PromptsForm
                    title={t("create.video.form.prompts.title")}
                    prompt={creation.prompt}
                    handlePrompt={creation.handlePrompt}
                />
                {creation.model.ratios.length > 0 && (
                    <AspectRatioForm
                        title={t("create.video.form.aspectRatio.title")}
                        ratios={creation.ratios}
                        handleRatioChange={creation.handleRatioChange}
                    />
                )}
                {creation.model.times.length > 0 && (
                    <VideoDurationForm
                        key="duration"
                        title={t("create.video.form.duration.title")}
                        durations={creation.durations}
                        handleDurationChange={creation.handleDurationChange}
                    />
                )}
                {creation.model.resolutions.length > 0 && (
                    <QuailtySettingForm
                        key="resolution"
                        title={t("create.video.form.resolution.title")}
                        tips={t("create.video.form.resolution.tips")}
                        quailtys={creation.quailtys}
                        handleQuailtyChange={creation.handleQuailtyChange}
                    />
                )}
                {creation.model.styles.length > 0 && (
                    <StyleForm
                        key="style"
                        title={t("create.video.form.style.title")}
                        tips={t("create.video.form.style.tips")}
                        styles={creation.styles}
                        handleStyleChange={creation.handleStyleChange}
                    />
                )}
                {creation.model.speed.length > 0 && (
                    <SpeedForm
                        title={t("create.video.form.speed.title")}
                        tips={t("create.video.form.speed.tips")}
                        speeds={creation.speeds}
                        handleSpeedChange={creation.handleSpeedChange}
                    />
                )}
                <PrivateModeForm
                    title={t("create.video.form.privateMode.title")}
                    tips={t("create.video.form.privateMode.tips")}
                    premiumTips={t("create.video.form.privateMode.premiumTips")}
                    privateMode={creation.privateMode}
                    handlePrivateModeChange={creation.handlePrivateModeChange}
                />
            </ScrollArea>
            <div className="p-4 sticky bottom-0 left-0 right-0 z-2 border-t border-muted bg-card">
                <GenerateButton
                    loading={creation.generation.loading}
                    icon={true}
                    onClick={handleGeneration}
                    className="w-full h-10 rounded-full mx-auto"
                    credits={creation.cost}
                >
                    {t("create.video.form.button")}
                </GenerateButton>
            </div>
        </>
    );
}
