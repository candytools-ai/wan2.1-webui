import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { FormHeader } from "@/components/dashboard/form-header";

interface FormParams {
    title: string;
    tips?: string;
    speeds: any[];
    handleSpeedChange: any;
}

export function SpeedForm({
    title,
    tips,
    speeds,
    handleSpeedChange,
}: FormParams) {
    return (
        <>
            <div className="flex flex-col gap-y-1.5 pb-5">
                <FormHeader title={title} tips={tips} />
                <RadioGroup
                    className={cn("gap-2")}
                    value={speeds.find((item) => item.selected)?.value}
                    onValueChange={handleSpeedChange}
                >
                    {speeds.map((item) => (
                        <div
                            key={item.value}
                            className="relative flex w-full items-start gap-2 rounded-lg border border-input p-4 shadow-sm shadow-black/5 has-[[data-state=checked]]:border-ring"
                        >
                            <RadioGroupItem
                                value={item.value}
                                id={`${item.value}-radio`}
                                disabled={item.disabled}
                                className="order-1 after:absolute after:inset-0"
                            />
                            <div className="flex grow items-center gap-3">
                                <div className="w-8 h-8 rounded-full flex items-center justify-center text-primary bg-primary">
                                    {item.icon}
                                </div>
                                <div className="grid grow flex-1 gap-2">
                                    <Label htmlFor={`${item.value}-radio`}>
                                        {item.label}
                                    </Label>
                                    <p
                                        id={`${item.value}-description`}
                                        className="text-xs text-muted-foreground"
                                    >
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </RadioGroup>
            </div>
        </>
    );
}
