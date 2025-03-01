/* eslint-disable @next/next/no-img-element */

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { FormHeader } from "@/components/dashboard/form-header";

interface FormParams {
    title: string;
    tips?: string;
    styles: any[];
    handleStyleChange: any;
}

export function StyleForm({
    title,
    tips,
    styles,
    handleStyleChange,
}: FormParams) {
    return (
        <>
            <div className="flex flex-col gap-y-1.5 pb-5">
                <FormHeader title={title} tips={tips} />
                <RadioGroup
                    key="RadioGroup"
                    className="grid items-center justify-center grid-cols-3 gap-3"
                    value={styles.find((item) => item.selected)?.value}
                    onValueChange={handleStyleChange}
                >
                    {styles.map((item) => (
                        <Label key={item.value} className="cursor-pointer">
                            <RadioGroupItem
                                key="RadioGroup"
                                id={`${item.value}`}
                                value={item.value}
                                className="peer sr-only after:absolute after:inset-0"
                            />
                            <div
                                className={cn(
                                    "rounded-xl overflow-hidden",
                                    item.selected
                                        ? "border-2 border-primary"
                                        : ""
                                )}
                            >
                                <img
                                    alt={`${item.label} Style`}
                                    className="object-cover w-full h-full"
                                    src={item.src}
                                />
                            </div>
                            <div
                                className={cn(
                                    "text-xs font-semibold text-center mt-1 h-8 break-words line-clamp-2",
                                    item.selected
                                        ? "text-foreground"
                                        : "text-muted-foreground"
                                )}
                            >
                                {item.label}
                            </div>
                        </Label>
                    ))}
                </RadioGroup>
            </div>
        </>
    );
}
