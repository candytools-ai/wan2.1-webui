import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { FormHeader } from "@/components/dashboard/form-header";

interface FormParams {
    title: string;
    tips?: string;
    quailtys: any[];
    handleQuailtyChange: any;
}

export function QuailtySettingForm({
    title,
    tips,
    quailtys,
    handleQuailtyChange,
}: FormParams) {

    return (
        <>
            <div className="flex flex-col gap-y-1.5 pb-5 relative">
                <FormHeader title={title} tips={tips} />
                <RadioGroup
                    className={cn(
                        "grid items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground/70",
                        `grid-cols-${quailtys.length}`
                    )}
                    value={quailtys.find((item) => item.selected)?.value}
                    onValueChange={handleQuailtyChange}
                >
                    {quailtys.map((item) => (
                        <Label
                            key={item.value}
                            data-state={item.selected ? "active" : "inactive"}
                            className={cn(
                                "flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                                `data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow cursor-pointer`,
                                item.disabled
                                    ? "cursor-not-allowed opacity-50"
                                    : ""
                            )}
                        >
                            <RadioGroupItem
                                id={`${item.value}`}
                                value={item.value}
                                disabled={item.disabled}
                                className="peer sr-only after:absolute after:inset-0"
                            />
                            <span>{item.value}</span>
                        </Label>
                    ))}
                </RadioGroup>
            </div>
        </>
    );
}
