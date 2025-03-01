import { Label } from "@/components/ui/label";
import { BestTooltip } from "@/components/ui/best-tooltip";

export interface FormHeaderParams {
    title: string;
    tips?: string;
}

export function FormHeader({ title, tips }: FormHeaderParams) {
    return (
        <Label className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <span className="text-sm font-satoshi font-semibold">
                    {title}
                </span>
                {tips && <BestTooltip>{tips}</BestTooltip>}
            </div>
        </Label>
    );
}
