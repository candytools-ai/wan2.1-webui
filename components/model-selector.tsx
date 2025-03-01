"use client";

import { startTransition, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

import {
    CheckCirclFillIcon,
    ChevronDownIcon,
    Flash,
} from "@/components/shared/icons";
import { AIModelIcon } from "@/components/shared/ai-model-icon";
import { useSession } from "next-auth/react";
import { Model } from "@/config/models-video";

export function ModelSelector({
    models,
    model,
    className,
    onModelChange,
}: {
    models: Model[];
    model: Model;
    onModelChange: (model: Model) => void;
} & React.ComponentProps<typeof Button>) {
    const [open, setOpen] = useState(false);
    const selectedModel = model;
    const { data: session } = useSession();
    const user: any = session?.user;

    return (
        <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger
                asChild
                className={cn(
                    "w-fit data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
                    className,
                    "!outline-none"
                )}
            >
                <button
                    // type="button"
                    className={cn(
                        "px-3 py-1.5 text-xs font-medium rounded-full",
                        "border transition-all duration-200",
                        "border-black/10 dark:border-white/10 bg-white dark:bg-gray-900 hover:bg-black/5 dark:hover:bg-white/5",
                        "flex-shrink-0"
                    )}
                >
                    <div className="flex items-center gap-1.5">
                        <div className="size-4">
                            <AIModelIcon model={selectedModel} />
                        </div>
                        <span className="text-black/70 dark:text-white/70 whitespace-nowrap">
                            {selectedModel.label}
                        </span>
                    </div>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="start"
                className="min-w-[300px] max-h-[50vh] overflow-y-auto"
            >
                {models.map((model) => {
                    return (
                        <DropdownMenuItem
                            key={model.id}
                            onSelect={() => {
                                onModelChange(model);
                                setOpen(false);
                            }}
                            className="gap-4 group/item flex flex-row justify-between items-center cursor-pointer focus:outline-none focus:border-none focus:ring-0"
                            disabled={!user?.subscribed && model.upgrade}
                            data-active={model.id === selectedModel.id}
                        >
                            <div className="flex flex-col justify-start gap-1">
                                <div className="flex items-center py-1 gap-2">
                                    <div className="flex justify-start items-center w-4 h-4">
                                        <AIModelIcon model={model} />
                                    </div>
                                    <span className="text-sm">
                                        {model.label}
                                    </span>
                                    {model.upgrade && (
                                        <div
                                            className="inline-flex items-center justify-center px-1.5 text-xs font-normal text-orange-600 rounded-full"
                                            style={{
                                                lineHeight: "16px",
                                            }}
                                        >
                                            Upgrade to Pro
                                        </div>
                                    )}
                                </div>
                                {model.description && (
                                    <div className="gap-1 text-xs text-muted-foreground max-w-[260px] line-clamp-2">
                                        {model.description}
                                    </div>
                                )}
                            </div>
                            <div className="text-primary opacity-0 group-data-[active=true]/item:opacity-100">
                                <CheckCirclFillIcon />
                            </div>
                        </DropdownMenuItem>
                    );
                })}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
