"use client";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { CrownIcon } from "@/components/shared/icons";

interface PremiumTooltipProps {
    children: React.ReactNode;
}

export function PremiumTooltip({ children }: PremiumTooltipProps) {
    return (
        <TooltipProvider delayDuration={0}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div>
                        <CrownIcon className="size-5" />
                    </div>
                </TooltipTrigger>
                <TooltipContent className="max-w-[220px] break-words px-2 py-1 text-xs bg-foreground dark:bg-background">
                    {children}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
