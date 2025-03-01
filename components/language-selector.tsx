"use client";

import { useMemo, useOptimistic, useState } from "react";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

import { CheckCirclFillIcon, ChevronDownIcon } from "@/components/shared/icons";

export type Language = { lang: string; label: string; hrefLang: string };

export function LanguageSelector({
    languages,
    language,
    className,
    onLanguageChange,
}: {
    languages: Language[];
    language: Language;
    onLanguageChange: (lang: Language) => void;
} & React.ComponentProps<typeof Button>) {
    const [open, setOpen] = useState(false);
    // const [optimisticLang, setOptimisticLang] = useOptimistic(defaultLang);

    const selectedLang = useMemo(
        () => languages.find((item) => item.lang === language.lang),
        [language.lang, languages]
    );

    return (
        <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger
                asChild
                className={cn(
                    "w-fit data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
                    className
                )}
            >
                <Button
                    variant="ghost"
                    className="md:px-2 md:h-[34px] focus:outline-none focus:border-none"
                >
                    {/* <div className="flex justify-start items-center size-4 [&_svg]:size-4">
                        <AIModelIcon model={selectModel || models[0]} />
                    </div> */}
                    <span className="text-sm">{selectedLang?.label}</span>
                    <ChevronDownIcon />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="start"
                className="min-w-[300px] max-h-[50vh] overflow-y-auto"
            >
                {languages.map((item) => {
                    return (
                        <DropdownMenuItem
                            key={item.lang}
                            onSelect={() => {
                                onLanguageChange(item);
                                setOpen(false);
                            }}
                            className="gap-4 group/item flex flex-row justify-between items-center cursor-pointer focus:outline-none focus:border-none"
                            data-active={item.lang === language.lang}
                        >
                            <div className="flex items-center py-1 gap-2">
                                {/* <div className="flex justify-start items-center w-4 h-4">
                                    <AIModelIcon model={model} />
                                </div> */}
                                <span className="text-sm">{item.label}</span>
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
