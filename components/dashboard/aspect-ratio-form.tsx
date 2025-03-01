import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FormHeader } from "@/components/dashboard/form-header";
import { cn } from "@/lib/utils";

interface FormParams {
    title: string;
    tips?: string;
    ratios: any[];
    handleRatioChange: any;
}

function calculateSize(aspectRatio: string) {
    const [h, v]: string[] = aspectRatio.split(":");
    const w_ratio = Number(h);
    const h_ratio = Number(v);
    if (w_ratio > h_ratio) {
        return {
            width: "20px",
            height: `${(20 * h_ratio) / w_ratio}px`,
        };
    } else if (w_ratio < h_ratio) {
        return {
            width: `${(20 * w_ratio) / h_ratio}px`,
            height: "20px",
        };
    } else {
        return {
            width: "20px",
            height: "20px",
        };
    }
}

export function AspectRatioForm({
    title,
    tips,
    ratios,
    handleRatioChange,
}: FormParams) {

    return (
        <>
            <div className="flex flex-col gap-y-1.5 pb-5">
                <FormHeader title={title} tips={tips} />
                <RadioGroup
                    className="grid grid-cols-4 gap-2"
                    value={ratios.find((item) => item.selected)?.value}
                    onValueChange={handleRatioChange}
                >
                    {ratios.map((item) => (
                        <label
                            key={item.value}
                            className={cn(
                                "relative flex cursor-pointer flex-col items-center gap-3 rounded-lg border border-input px-2 py-3 text-center shadow-sm shadow-black/5 outline-offset-2 transition-colors has-[[data-state=checked]]:border-ring has-[[data-state=checked]]:bg-accent has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-ring/70",
                                "cursor-pointer pl-2",
                                item.disabled
                                    ? "cursor-not-allowed opacity-50"
                                    : ""
                            )}
                        >
                            <RadioGroupItem
                                id={item.value}
                                value={item.value}
                                disabled={item.disabled}
                                className="sr-only after:absolute after:inset-0"
                            />
                            <div className="size-7 flex items-center justify-center">
                                <div
                                    className={
                                        "rounded-sm border-2 border-muted-foreground text-muted-foreground"
                                    }
                                    style={calculateSize(item.value)}
                                ></div>
                            </div>
                            <p className="text-xs font-medium leading-none text-foreground">
                                {item.value}
                            </p>
                        </label>
                    ))}
                </RadioGroup>
            </div>
        </>
    );
}
