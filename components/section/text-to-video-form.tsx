"use client";

import { useContext, useState } from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { videoPrompts } from "@/config/prompts";
import { GenerateButton } from "@/components/shared/generate-button";
import { ModelSelector } from "@/components/model-selector";
import { IGeneration, usePrediction } from "@/hooks/use-fal";
import { useSession } from "next-auth/react";
import { ModalContext } from "@/components/modals/providers";
import { toast } from "sonner";
import { DEFAULT_MODEL, Model, models } from "@/config/models-video";
import { useRouter } from "next/navigation";
import queryStringify from "qs-stringify";
import { Button } from "../ui/button";

interface FormProps {
    use?: string;
    name?: string;
    reverse?: boolean;
}

export function TextToVideoForm({ use, name }: FormProps) {
    const { data: session } = useSession();
    const user: any = session?.user;
    const t = useTranslations(use || "Home");
    const [prompt, setPrompt] = useState("");
    const [model, setModel] = useState<Model>(DEFAULT_MODEL);
    const router = useRouter();

    const handleModelChange = (model: Model) => {
        setModel(model);
    };
    const { setShowSignInModal } = useContext(ModalContext);
    const [generation, setGeneration] = useState(false);

    const handlePrompt = async (e: any) => {
        setPrompt(e.target.value);
    };

    const handleGeneration = async () => {
        if (!prompt) {
            toast.error("Please enter prompt!");
            return;
        }
        if (!user) {
            setShowSignInModal(true);
            return false;
        }
        // if (user.credits <= 0) {
        //     setOpenUpgrade(true);
        //     return false;
        // }
        // if (!user.subscribed) {
        //     setOpenUpgrade(true)
        //     return
        // }
        setGeneration(true);

        const params = new URLSearchParams();
        params.set("prompt", prompt);
        params.set("modelId", model.id);

        router.push(`/create/video/text-to-video?${params.toString()}`);

        setTimeout(() => {
            setGeneration(false);
        }, 8000);
        // mock generator start
        // setTimeout(() => {
        //     // setGeneration({
        //     //     ...generation,
        //     //     loading: false,
        //     //     // generated: {
        //     //     //     video: {
        //     //     //         url: "https://fal.media/files/zebra/GScPi-7ma3Fn8r1O1on4z_output_1729631871.mp4",
        //     //     //     },
        //     //     // },

        //     //     generated: null,
        //     //     error: new Error("This is a error!")
        //     // });
        //     setGeneration(false)
        // }, 3000);
        // mock generator end
    };

    return (
        <MaxWidthWrapper className="py-12">
            <Card className="w-full max-w-7xl mx-auto">
                <CardHeader className="flex-row justify-between space-y-0">
                    <div className="flex flex-col">
                        <CardTitle></CardTitle>
                        <CardDescription className="flex items-center gap-x-2"></CardDescription>
                    </div>
                </CardHeader>
                <CardContent className="gap-5 flex flex-col">
                    <Label
                        htmlFor="form"
                        className="flex items-center justify-between"
                    >
                        <span>{t(`${name}.title`)}</span>

                        {/* <ModelSelector
                            models={models}
                            model={model}
                            onModelChange={handleModelChange}
                        /> */}
                    </Label>
                    <Textarea
                        id="form"
                        rows={5}
                        placeholder={t(`${name}.placeholder`)}
                        className="bg-background rounded-xl !mt-3 border-primary/50"
                        value={prompt}
                        onInput={handlePrompt}
                    />
                    <div className="flex gap-3 items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="text-muted-foreground text-sm font-medium">
                                {t(`${name}.ideas`)}:
                            </div>{" "}
                            {videoPrompts.map((item) => (
                                <Badge
                                    key={item.title}
                                    className="py-2 px-3 cursor-pointer rounded-full"
                                    variant="secondary"
                                    onClick={() => setPrompt(item.description)}
                                >
                                    {item.title}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-center items-center">
                    <GenerateButton
                        loading={generation}
                        icon={true}
                        onClick={handleGeneration}
                        className="w-[260px] h-[46px] rounded-full mx-auto mt-4 group-hover:bg-opacity-50"
                    >
                        {t(`${name}.button`)}
                    </GenerateButton>
                </CardFooter>
            </Card>

            {/* <div className="mt-4 p-3 max-w-4xl mx-auto flex flex-col justify-center gap-1 rounded-xl bg-neutral-100 dark:bg-neutral-700">
                <div className="text-sm">
                    The <span className="text-orange-500">Goku</span> model has
                    not been released yet, but you can explore and experience
                    other available models first.
                </div>
            </div> */}
        </MaxWidthWrapper>
    );
}
