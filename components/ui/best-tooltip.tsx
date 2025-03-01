"use client";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";

interface BestTooltipProps {
    children: React.ReactNode;
}

export function BestTooltip({ children }: BestTooltipProps) {
    return (
        <TooltipProvider delayDuration={0}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Info className="size-4 text-muted-foreground/70" />
                </TooltipTrigger>
                <TooltipContent className="max-w-[220px] break-words px-2 py-1 text-xs bg-foreground dark:bg-background">
                    {children}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
