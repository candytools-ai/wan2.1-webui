import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FormHeader } from "@/components/dashboard/form-header";
import { cn } from "@/lib/utils";

interface FormParams {
    title: string;
    tips?: string;
    durations: any[];
    handleDurationChange: any;
}

export function VideoDurationForm({
    title,
    tips,
    durations,
    handleDurationChange,
}: FormParams) {
    return (
        <>
            <div className="flex flex-row items-center justify-between gap-y-1.5 pb-5">
                <FormHeader title={title} tips={tips} />
                <RadioGroup
                    className="flex flex-wrap gap-4"
                    value={
                        durations.find((item) => item.selected)?.value
                    }
                    onValueChange={handleDurationChange}
                >
                    {durations.map((item) => (
                        <div key={item.value}>
                            <div className="flex items-center cursor-pointer">
                                <RadioGroupItem
                                    id={`duration-${item.value}`}
                                    value={item.value}
                                    disabled={item.disabled}
                                />
                                <Label
                                    htmlFor={`duration-${item.value}`}
                                    className={cn(
                                        "cursor-pointer pl-2",
                                        item.disabled
                                            ? "cursor-not-allowed opacity-50"
                                            : ""
                                    )}
                                >
                                    {item.value}s
                                </Label>
                            </div>
                        </div>
                    ))}
                </RadioGroup>
            </div>
        </>
    );
}
