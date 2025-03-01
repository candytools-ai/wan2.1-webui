"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Download, Heart, Maximize } from "lucide-react";
import { Button } from "../ui/button";
import { ButtonLoading } from "../ui/button-loading";
import { onDownload } from "@/lib/utils";
import { toast } from "sonner";

export interface CreationVideoToolsParams {
    use: string;
    // creation: ICreation;
    config: {
        download?: boolean;
        fullscreen?: boolean;
        like?: boolean;
    };
    generated: any;
    videoRef: any;
}

export default function CreationVideoTools({
    use,
    config,
    generated,
    videoRef,
}: // creation,
CreationVideoToolsParams) {
    // const t = useTranslations(use || "Home");
    const { data: session } = useSession();
    const user: any = session?.user;
    const [downLoading, setDownLoading] = useState(false);

    const handleDownload = () => {
        setDownLoading(true);
        onDownload(generated.url, () => setDownLoading(false));
    };

    const handleFullScreen = async () => {
        await videoRef?.current
            ?.requestFullscreen()
            .catch((err: any) => toast.error(err.message));
    };

    return (
        <>
            <div className="flex flex-wrap items-center justify-center p-3 gap-3">
                {config.download && (
                    <div className="flex items-center gap-2">
                        <ButtonLoading
                            variant="outline"
                            size="sm"
                            className="rounded-full"
                            loading={downLoading}
                            onClick={handleDownload}
                        >
                            <Download />
                            Download
                        </ButtonLoading>
                    </div>
                )}
                {config.fullscreen && (
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            className="rounded-full"
                            onClick={handleFullScreen}
                        >
                            <Maximize />
                            Full screen
                        </Button>
                    </div>
                )}
            </div>
        </>
    );
}
