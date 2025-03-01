"use client";

import { Model } from "@/config/models-video";
import { Card, CardContent } from "@/components/ui/card";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { AIModelIcon } from "@/components/shared/ai-model-icon";

export function CardModel({ model }: { model: Model }) {
    return (
        <TooltipProvider delayDuration={0}>
            <Card key={model.id}>
                <CardContent className="p-0">
                    <a className="flex justify-start space-x-4 p-6" href={`/chat/${model.path}`}>
                        <div className="size-10">
                            <AIModelIcon model={model} />
                        </div>
                        <div className="flex-1 space-y-1">
                            <h4 className="text-sm font-semibold">
                                {model.label}
                            </h4>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <p className="text-sm line-clamp-2">
                                        {model.description}
                                    </p>
                                </TooltipTrigger>
                                <TooltipContent className="max-w-sm">
                                    {model.description}
                                </TooltipContent>
                            </Tooltip>
                            {/* <div className="flex items-center pt-2">
                                <span className="text-xs text-muted-foreground">
                                    By Chooat
                                </span>
                            </div> */}
                        </div>
                    </a>
                </CardContent>
            </Card>
        </TooltipProvider>
    );
}
